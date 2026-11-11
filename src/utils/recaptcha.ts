interface ReCaptchaApi {
  ready: (callback: () => void) => void
  execute: (siteKey: string, options: { action: string }) => Promise<string>
}

declare global {
  interface Window {
    grecaptcha?: ReCaptchaApi
  }
}

export const RECAPTCHA_ACTION = 'contact'

let scriptPromise: Promise<ReCaptchaApi> | null = null

function waitUntilReady(api: ReCaptchaApi): Promise<ReCaptchaApi> {
  return new Promise((resolve, reject) => {
    try {
      api.ready(() => {
        const readyApi = window.grecaptcha
        if (readyApi && typeof readyApi.execute === 'function') {
          resolve(readyApi)
        } else {
          scriptPromise = null
          reject(new Error('reCAPTCHA nenačtena'))
        }
      })
    } catch (error) {
      scriptPromise = null
      reject(error)
    }
  })
}

function loadApi(siteKey: string): Promise<ReCaptchaApi> {
  if (!siteKey) return Promise.reject(new Error('Chybí reCAPTCHA site key'))

  const existingApi = window.grecaptcha
  if (existingApi) return waitUntilReady(existingApi)
  if (scriptPromise) return scriptPromise

  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}&hl=cs`
    script.async = true
    script.onload = () => {
      const api = window.grecaptcha
      if (api) {
        void waitUntilReady(api).then(resolve, reject)
      } else {
        scriptPromise = null
        reject(new Error('reCAPTCHA nenačtena'))
      }
    }
    script.onerror = () => {
      scriptPromise = null
      reject(new Error('reCAPTCHA nenačtena'))
    }
    document.head.appendChild(script)
  })

  return scriptPromise
}

export async function loadRecaptcha(siteKey: string): Promise<void> {
  await loadApi(siteKey)
}

export async function executeRecaptcha(siteKey: string, action: string): Promise<string | null> {
  try {
    const api = await loadApi(siteKey)
    const token = await api.execute(siteKey, { action })
    return typeof token === 'string' && token !== '' ? token : null
  } catch {
    return null
  }
}