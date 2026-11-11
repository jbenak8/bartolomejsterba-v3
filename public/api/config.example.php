<?php
// Zkopírujte jako config.php (přímo na serveru do složky api/) a vyplňte.
// Soubor config.php NEPATŘÍ do gitu – obsahuje tajný klíč.

return [
    // Provider ochrany formuláře: 'turnstile', 'recaptcha' nebo 'none'.
    // Musí odpovídat VITE_CAPTCHA_PROVIDER ve frontendové konfiguraci.
    'captcha_provider' => 'turnstile',

    // Tajný klíč z Cloudflare Turnstile (Dashboard -> Turnstile -> widget -> Secret key).
    // Pro vývoj lze použít testovací klíč: 1x0000000000000000000000000000000AA (vždy projde)
    'turnstile_secret' => '',

    // Tajný klíč Google reCAPTCHA v3 (Score based).
    'recaptcha_secret' => '',
    // Minimální skóre reCAPTCHA v3 (rozsah Google: 0.0–1.0; vyšší = pravděpodobnější člověk).
    'recaptcha_min_score' => 0.5,

    // Při true vrací chybové odpovědi bezpečné diagnostické údaje; po vyřešení problému vypněte.
    'debug' => false,

    // Volitelná cesta k CA bundle; pokud není nastavena, automaticky se použije api/cacert.pem, je-li přítomen.
    'ca_bundle' => __DIR__ . '/cacert.pem',

    // Příjemce zpráv
    'mail_to' => 'info@bartolomejsterba.cz',

    // Odesílatel – MUSÍ být adresa na doméně webu (SPF/DKIM), jinak e-mail skončí ve spamu
    'mail_from' => 'Web <web@bartolomejsterba.cz>',

    // Povolené původy požadavku (prázdné pole = kontrola vypnuta)
    'allowed_origins' => [
        'https://www.bartolomejsterba.cz',
        'https://bartolomejsterba.cz',
        // 'http://localhost:5173',
    ],

    // Minimální doba vyplňování formuláře (s)
    'min_fill_seconds' => 3,

    // Max. počet zpráv z jedné IP v daném okně (s)
    'rate_limit_max' => 3,
    'rate_limit_window' => 600,

    // Max. počet odkazů ve zprávě
    'max_links' => 2,
];
