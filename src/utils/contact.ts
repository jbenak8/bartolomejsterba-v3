export interface ContactPayload {
  name: string
  email: string
  phone: string
  message: string
  website: string // honeypot
  elapsed: number // ms od zobrazení formuláře
  captchaToken: string
  captchaProvider: 'turnstile' | 'recaptcha' | 'none'
  turnstileToken: string
}

export const CONTACT_ENDPOINT: string =
  import.meta.env.VITE_CONTACT_ENDPOINT ?? '/api/contact.php'

const configuredCaptchaProvider = import.meta.env.VITE_CAPTCHA_PROVIDER

export const CAPTCHA_PROVIDER: 'turnstile' | 'recaptcha' | 'none' =
  configuredCaptchaProvider === 'recaptcha' || configuredCaptchaProvider === 'none'
    ? configuredCaptchaProvider
    : 'turnstile'

export const TURNSTILE_SITE_KEY: string = import.meta.env.VITE_TURNSTILE_SITE_KEY ?? ''
export const RECAPTCHA_SITE_KEY: string = import.meta.env.VITE_RECAPTCHA_SITE_KEY ?? ''
const SITE_KEYS: Record<typeof CAPTCHA_PROVIDER, string> = {
  turnstile: TURNSTILE_SITE_KEY,
  recaptcha: RECAPTCHA_SITE_KEY,
  none: '',
}
export const CAPTCHA_SITE_KEY: string = SITE_KEYS[CAPTCHA_PROVIDER]

const GENERIC_ERROR =
  'Zprávu se nepodařilo odeslat. Zkuste to prosím znovu, nebo nám zavolejte či napište e-mail.'

export async function sendContact(payload: ContactPayload): Promise<void> {
  let response: Response
  try {
    response = await fetch(CONTACT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch {
    throw new Error(GENERIC_ERROR)
  }

  let data: { ok?: boolean; message?: string } | null = null
  try {
    data = await response.json()
  } catch {
    data = null
  }

  if (!response.ok || !data?.ok) {
    throw new Error(data?.message ?? GENERIC_ERROR)
  }
}
