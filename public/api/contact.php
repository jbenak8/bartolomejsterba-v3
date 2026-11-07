<?php
declare(strict_types=1);

/**
 * Endpoint kontaktního formuláře.
 *
 * Ochrana proti spamu (vrstvy):
 *  1. Kontrola metody, Content-Type a Origin/Referer (CSRF / cizí weby)
 *  2. Honeypot pole (roboti ho vyplní, lidé ho nevidí)
 *  3. Časová kontrola (formulář odeslaný dříve než za pár sekund je robot)
 *  4. Cloudflare Turnstile – ověření tokenu na serveru
 *  5. Rate limit podle IP
 *  6. Validace vstupu, limit odkazů, ochrana proti header injection
 */

$config = require __DIR__ . '/config.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function respond(int $status, array $data): never
{
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function fail(int $status, string $code, string $message): never
{
    respond($status, ['ok' => false, 'error' => $code, 'message' => $message]);
}

function clientIp(): string
{
    // Za Cloudflare proxy použijte CF-Connecting-IP, jinak REMOTE_ADDR.
    $ip = $_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['REMOTE_ADDR'] ?? '';
    return filter_var($ip, FILTER_VALIDATE_IP) ? $ip : '0.0.0.0';
}

function cleanLine(string $value): string
{
    // Odstraní CR/LF a řídicí znaky (header injection).
    return trim(preg_replace('/[\x00-\x1F\x7F]+/u', ' ', $value) ?? '');
}

function cleanText(string $value): string
{
    $value = str_replace("\r\n", "\n", $value);
    return trim(preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value) ?? '');
}

function rateLimited(string $ip, int $max, int $windowSeconds): bool
{
    $file = sys_get_temp_dir() . '/contact_rl_' . hash('sha256', $ip) . '.json';
    $now = time();
    $hits = [];

    $fh = fopen($file, 'c+');
    if ($fh === false) {
        return false;
    }
    flock($fh, LOCK_EX);
    $raw = stream_get_contents($fh);
    $decoded = $raw ? json_decode($raw, true) : [];
    if (is_array($decoded)) {
        $hits = array_values(array_filter($decoded, static fn($t) => is_int($t) && $t > $now - $windowSeconds));
    }

    $limited = count($hits) >= $max;
    if (!$limited) {
        $hits[] = $now;
    }

    ftruncate($fh, 0);
    rewind($fh);
    fwrite($fh, json_encode($hits));
    flock($fh, LOCK_UN);
    fclose($fh);

    return $limited;
}

function verifyTurnstile(string $secret, string $token, string $ip): bool
{
    if ($token === '' || strlen($token) > 2048) {
        return false;
    }

    $payload = http_build_query([
        'secret' => $secret,
        'response' => $token,
        'remoteip' => $ip,
    ]);
    $url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $payload,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 8,
        ]);
        $result = curl_exec($ch);
        curl_close($ch);
    } else {
        $result = @file_get_contents($url, false, stream_context_create([
            'http' => [
                'method' => 'POST',
                'header' => 'Content-Type: application/x-www-form-urlencoded',
                'content' => $payload,
                'timeout' => 8,
            ],
        ]));
    }

    if (!is_string($result)) {
        return false;
    }
    $data = json_decode($result, true);
    return is_array($data) && ($data['success'] ?? false) === true;
}

// 1) Metoda a původ požadavku
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    fail(405, 'method_not_allowed', 'Metoda není povolena.');
}

$allowedOrigins = $config['allowed_origins'] ?? [];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin === '' && !empty($_SERVER['HTTP_REFERER'])) {
    $parts = parse_url($_SERVER['HTTP_REFERER']);
    $origin = isset($parts['scheme'], $parts['host'])
        ? $parts['scheme'] . '://' . $parts['host'] . (isset($parts['port']) ? ':' . $parts['port'] : '')
        : '';
}
if ($allowedOrigins && !in_array($origin, $allowedOrigins, true)) {
    fail(403, 'forbidden_origin', 'Požadavek byl zamítnut.');
}

if (stripos($_SERVER['CONTENT_TYPE'] ?? '', 'application/json') !== 0) {
    fail(415, 'unsupported_media_type', 'Neplatný formát požadavku.');
}

$raw = file_get_contents('php://input', false, null, 0, 20000);
$input = is_string($raw) ? json_decode($raw, true) : null;
if (!is_array($input)) {
    fail(400, 'bad_request', 'Neplatný požadavek.');
}

$ip = clientIp();

// 2) Honeypot – bota tiše „odbavíme“ jako úspěch
if (!empty($input['website'])) {
    respond(200, ['ok' => true]);
}

// 3) Časová kontrola
$elapsedMs = isset($input['elapsed']) ? (int)$input['elapsed'] : 0;
if ($elapsedMs < (int)($config['min_fill_seconds'] ?? 3) * 1000) {
    respond(200, ['ok' => true]);
}

// 5) Rate limit
if (rateLimited($ip, (int)($config['rate_limit_max'] ?? 3), (int)($config['rate_limit_window'] ?? 600))) {
    fail(429, 'rate_limited', 'Odesíláte příliš mnoho zpráv. Zkuste to prosím později.');
}

// 4) Turnstile
$token = is_string($input['turnstileToken'] ?? null) ? $input['turnstileToken'] : '';
if (!verifyTurnstile((string)$config['turnstile_secret'], $token, $ip)) {
    fail(400, 'captcha_failed', 'Ověření proti robotům se nezdařilo. Zkuste to prosím znovu.');
}

// 6) Validace
$name = cleanLine((string)($input['name'] ?? ''));
$email = cleanLine((string)($input['email'] ?? ''));
$phone = cleanLine((string)($input['phone'] ?? ''));
$message = cleanText((string)($input['message'] ?? ''));

if ($name === '' || mb_strlen($name) > 100) {
    fail(422, 'invalid_name', 'Vyplňte prosím jméno.');
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 150) {
    fail(422, 'invalid_email', 'Zadejte prosím platný e-mail.');
}
if (mb_strlen($phone) > 30 || ($phone !== '' && !preg_match('/^[0-9+()\s\-]{5,30}$/', $phone))) {
    fail(422, 'invalid_phone', 'Zadejte prosím platné telefonní číslo.');
}
if (mb_strlen($message) < 5 || mb_strlen($message) > 5000) {
    fail(422, 'invalid_message', 'Zpráva musí mít 5 až 5000 znaků.');
}
if (preg_match_all('~https?://|www\.~i', $message) > (int)($config['max_links'] ?? 2)) {
    fail(422, 'too_many_links', 'Zpráva obsahuje příliš mnoho odkazů.');
}

// Odeslání e-mailu
$subject = '=?UTF-8?B?' . base64_encode('Zpráva z webu – ' . $name) . '?=';
$body = "Jméno: {$name}\nE-mail: {$email}\nTelefon: " . ($phone !== '' ? $phone : '-') . "\nIP: {$ip}\n\n{$message}\n";

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'From: ' . $config['mail_from'],
    'Reply-To: ' . $email,
    'X-Mailer: bartolomejsterba-contact-form',
];

$sent = mail((string)$config['mail_to'], $subject, $body, implode("\r\n", $headers));
if (!$sent) {
    error_log('contact.php: mail() selhalo');
    fail(500, 'mail_failed', 'Zprávu se nepodařilo odeslat. Zavolejte nám prosím nebo napište na e-mail.');
}

respond(200, ['ok' => true]);
