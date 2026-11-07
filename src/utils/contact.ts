export interface ContactPayload {
  name: string
  email: string
  phone: string
  message: string
  website: string // honeypot
  elapsed: number // ms od zobrazení formuláře
  turnstileToken: string
}

export const CONTACT_ENDPOINT: string =
  import.meta.env.VITE_CONTACT_ENDPOINT ?? '/api/contact.php'

export const TURNSTILE_SITE_KEY: string = import.meta.env.VITE_TURNSTILE_SITE_KEY ?? ''

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
