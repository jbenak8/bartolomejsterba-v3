<?php
declare(strict_types=1);

/**
 * Endpoint kontaktního formuláře.
 *
 * Ochrana proti spamu (vrstvy):
 *  1. Kontrola metody, Content-Type a Origin/Referer (CSRF / cizí weby)
 *  2. Honeypot pole (roboti ho vyplní, lidé ho nevidí)
 *  3. Časová kontrola (formulář odeslaný dříve než za pár sekund je robot)
 *  4. CAPTCHA (Cloudflare Turnstile nebo Google reCAPTCHA v3) – ověření tokenu na serveru
 *  5. Rate limit podle IP
 *  6. Validace vstupu, limit odkazů, ochrana proti header injection
 */

$config = require_once __DIR__ . '/config.php';
$diag = [];

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function respond(int $status, array $data): never
{
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE);
    exit;
}

function fail(int $status, string $code, string $message): never
{
    $response = ['ok' => false, 'error' => $code, 'message' => $message];
    if (($GLOBALS['config']['debug'] ?? false) === true) {
        $response['debug'] = $GLOBALS['diag'];
    }
    respond($status, $response);
}

function diag(string $key, mixed $value): void
{
    $GLOBALS['diag'][$key] = $value;
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

function resolveCaBundle(): string
{
    $configuredCaBundle = $GLOBALS['config']['ca_bundle'] ?? null;
    if (is_string($configuredCaBundle) && $configuredCaBundle !== '' && is_file($configuredCaBundle)) {
        return $configuredCaBundle;
    }

    $defaultCaBundle = __DIR__ . '/cacert.pem';
    if (is_file($defaultCaBundle)) {
        return $defaultCaBundle;
    }

    return '';
}

function requestViaCurl(string $url, string $payload, string $caBundle, bool &$requestStarted): ?string
{
    $ch = curl_init($url);
    if ($ch === false) {
        diag('transport_error', 'curl_init failed');
        return null;
    }
    $requestStarted = true;

    $curlOptions = [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $payload,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 8,
    ];
    if ($caBundle !== '') {
        $curlOptions[CURLOPT_CAINFO] = $caBundle;
    }
    curl_setopt_array($ch, $curlOptions);
    $result = curl_exec($ch);
    $httpStatus = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    $curlErrno = curl_errno($ch);
    curl_close($ch);
    diag('http_status', $httpStatus);
    if ($curlErrno !== 0) {
        diag('curl_errno', $curlErrno);
        diag('curl_error', $curlError);
    }

    return is_string($result) ? $result : null;
}

function requestViaStream(string $url, string $payload, string $caBundle): ?string
{
    error_clear_last();
    $contextOptions = [
        'http' => [
            'method' => 'POST',
            'header' => 'Content-Type: application/x-www-form-urlencoded',
            'content' => $payload,
            'timeout' => 8,
        ],
    ];
    if ($caBundle !== '') {
        $contextOptions['ssl'] = ['cafile' => $caBundle];
    }
    $result = @file_get_contents($url, false, stream_context_create($contextOptions));
    $httpStatus = 0;
    if (isset($http_response_header[0]) && preg_match('/\s(\d{3})\s/', $http_response_header[0], $matches)) {
        $httpStatus = (int)$matches[1];
    }
    diag('http_status', $httpStatus);
    if (!is_string($result)) {
        $lastError = error_get_last();
        if ($lastError !== null) {
            diag('transport_error', $lastError['message'] ?? 'Request failed');
        }
    }

    return is_string($result) ? $result : null;
}

function decodeProviderResponse(?string $result, bool $requestStarted): ?array
{
    if (!$requestStarted) {
        return null;
    }
    if (!is_string($result)) {
        diag('response', null);
        return null;
    }
    diag('response', substr($result, 0, 1000));
    $data = json_decode($result, true);
    if (!is_array($data)) {
        diag('json_error', json_last_error_msg());
        $data = null;
    }

    return $data;
}

function postForm(string $url, array $fields): ?array
{
    $payload = http_build_query($fields);
    $caBundle = resolveCaBundle();
    diag('ca_bundle', $caBundle !== '' ? basename($caBundle) : 'system');
    $requestStarted = !function_exists('curl_init');

    if (function_exists('curl_init')) {
        diag('transport', 'curl');
        $result = requestViaCurl($url, $payload, $caBundle, $requestStarted);
    } else {
        diag('transport', 'file_get_contents');
        $result = requestViaStream($url, $payload, $caBundle);
    }

    return decodeProviderResponse($result, $requestStarted);
}

function checkTokenAndSecret(string $secret, string $token, int $maxLength): ?string
{
    $failure = null;
    if ($token === '') {
        $failure = 'empty_token';
    } elseif (strlen($token) > $maxLength) {
        $failure = 'token_too_long';
    } elseif ($secret === '') {
        $failure = 'missing_secret';
    }

    return $failure;
}

function verifyTurnstile(string $secret, string $token, string $ip): bool
{
    $failure = checkTokenAndSecret($secret, $token, 2048);
    $data = null;
    if ($failure === null) {
        $data = postForm('https://challenges.cloudflare.com/turnstile/v0/siteverify', [
            'secret' => $secret,
            'response' => $token,
            'remoteip' => $ip,
        ]);
    }
    if (is_array($data)) {
        diag('captcha_hostname', $data['hostname'] ?? null);
    }
    if ($failure === null && (!is_array($data) || ($data['success'] ?? false) !== true)) {
        $failure = is_array($data) ? 'provider_rejected' : 'invalid_provider_response';
    }
    if ($failure !== null) {
        diag('verification_failure', $failure);
        if ($failure === 'provider_rejected') {
            diag('provider_error_codes', $data['error-codes'] ?? []);
        }
    }

    return $failure === null;
}

function evaluateRecaptchaResponse(array $data, string $action, float $minScore): ?string
{
    $failure = null;
    if (($data['success'] ?? false) !== true) {
        $failure = 'provider_rejected';
    } elseif (($data['action'] ?? '') !== $action) {
        $failure = 'action_mismatch';
    } elseif (!isset($data['score']) || !is_numeric($data['score'])) {
        $failure = 'missing_score';
    } else {
        $score = (float)$data['score'];
        diag('captcha_score', $score);
        if ($score < $minScore) {
            $failure = 'score_below_minimum';
        }
    }

    if ($failure !== null) {
        diag('verification_failure', $failure);
        if ($failure === 'provider_rejected') {
            diag('provider_error_codes', $data['error-codes'] ?? []);
        } elseif ($failure === 'action_mismatch') {
            diag('received_action', $data['action'] ?? null);
        }
    }

    return $failure;
}

function verifyRecaptcha(string $secret, string $token, string $ip, string $action, float $minScore): bool
{
    $failure = checkTokenAndSecret($secret, $token, 4096);
    $data = null;
    if ($failure === null) {
        $data = postForm('https://www.google.com/recaptcha/api/siteverify', [
            'secret' => $secret,
            'response' => $token,
            'remoteip' => $ip,
        ]);
        if (is_array($data)) {
            diag('captcha_hostname', $data['hostname'] ?? null);
            $failure = evaluateRecaptchaResponse($data, $action, $minScore);
        } else {
            $failure = 'invalid_provider_response';
            diag('verification_failure', $failure);
        }
    } else {
        diag('verification_failure', $failure);
    }

    return $failure === null;
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
    if (isset($parts['scheme'], $parts['host'])) {
        $portSuffix = isset($parts['port']) ? ':' . $parts['port'] : '';
        $origin = $parts['scheme'] . '://' . $parts['host'] . $portSuffix;
    }
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

// 4) CAPTCHA provider je určen výhradně konfigurací serveru.
$captchaProvider = $config['captcha_provider'] ?? 'turnstile';
if (!in_array($captchaProvider, ['turnstile', 'recaptcha', 'none'], true)) {
    $captchaProvider = 'turnstile';
}
diag('captcha_provider', $captchaProvider);
$tokenValue = $input['captchaToken'] ?? $input['turnstileToken'] ?? '';
$token = is_string($tokenValue) ? $tokenValue : '';
diag('captcha_token_length', strlen($token));
$minScore = (float)($config['recaptcha_min_score'] ?? 0.5);
if ($captchaProvider === 'recaptcha') {
    diag('captcha_min_score', $minScore);
}
$captchaValid = match ($captchaProvider) {
    'recaptcha' => verifyRecaptcha(
        (string)($config['recaptcha_secret'] ?? ''),
        $token,
        $ip,
        'contact',
        $minScore
    ),
    'none' => true,
    default => verifyTurnstile((string)($config['turnstile_secret'] ?? ''), $token, $ip),
};
if (!$captchaValid) {
    error_log('contact.php captcha_failed: ' . json_encode($GLOBALS['diag'], JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE));
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
    diag('mail_error', error_get_last());
    error_log('contact.php mail_failed: ' . json_encode($GLOBALS['diag'], JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE));
    fail(500, 'mail_failed', 'Zprávu se nepodařilo odeslat. Zavolejte nám prosím nebo napište na e-mail.');
}

respond(200, ['ok' => true]);
