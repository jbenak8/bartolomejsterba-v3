# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## Antispam kontaktního formuláře

Formulář podporuje Cloudflare Turnstile (výchozí) a Google reCAPTCHA v3 (Score based).
Pro přepnutí nastavte stejný provider na frontendu v `VITE_CAPTCHA_PROVIDER`
(`turnstile`, `recaptcha` nebo `none`) a na serveru v `captcha_provider`
v `public/api/config.php`. Pro reCAPTCHA vyplňte `VITE_RECAPTCHA_SITE_KEY` a
serverový `recaptcha_secret`; klíč musí být vytvořen jako reCAPTCHA v3 a musí
obsahovat domény webu. Skóre se ověřuje proti `recaptcha_min_score` (výchozí 0.5).
Google badge musí zůstat na webu viditelný. Pro Turnstile použijte
`VITE_TURNSTILE_SITE_KEY` a `turnstile_secret`. Hodnota `none` CAPTCHA vypne,
proto ji používejte jen pokud je to záměrné.

Pro diagnostiku nastavte v serverovém `public/api/config.php` hodnotu `'debug' => true`;
selhání CAPTCHA se zapíše do PHP error logu a bezpečné detaily se vrátí u chyb `captcha_failed` a `mail_failed`. Po diagnostice režim vraťte na `false`.

Pokud diagnostika ukazuje `curl_errno` 60 nebo chybu ověření certifikátu, nahrajte oficiální Mozilla CA bundle jako `public/api/cacert.pem` na server do složky `api/`. Endpoint jej automaticky použije pro cURL i streamové HTTPS požadavky; případně lze jinou cestu nastavit v `config.php` pomocí `ca_bundle`. Ověřování TLS zůstává zapnuté.
