<?php
// Zkopírujte jako config.php (přímo na serveru do složky api/) a vyplňte.
// Soubor config.php NEPATŘÍ do gitu – obsahuje tajný klíč.

return [
    // Tajný klíč z Cloudflare Turnstile (Dashboard -> Turnstile -> widget -> Secret key).
    // Pro vývoj lze použít testovací klíč: 1x0000000000000000000000000000000AA (vždy projde)
    'turnstile_secret' => '',

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
