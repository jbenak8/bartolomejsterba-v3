import { useEffect, useRef } from 'react'

interface ReCaptchaApi {
  render: (
    el: HTMLElement,
    options: {
      sitekey: string
      callback: (token: string) => void
      'expired-callback': () => void
      'error-callback': () => void
    },
  ) => number
  reset: (widgetId?: number) => void
}

declare global {
  interface Window {
    grecaptcha?: ReCaptchaApi
  }
}

const SCRIPT_SRC = 'https://www.google.com/recaptcha/api.js?render=explicit&hl=cs'

let scriptPromise: Promise<ReCaptchaApi> | null = null

function loadScript(): Promise<ReCaptchaApi> {
  if (window.grecaptcha) return Promise.resolve(window.grecaptcha)
  scriptPromise ??= new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = SCRIPT_SRC
    script.async = true
    script.onload = () => {
      if (window.grecaptcha) {
        resolve(window.grecaptcha)
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

interface ReCaptchaProps {
  siteKey: string
  onToken: (token: string | null) => void
  resetSignal: number
}

export default function ReCaptcha({ siteKey, onToken, resetSignal }: Readonly<ReCaptchaProps>) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<number | null>(null)
  const onTokenRef = useRef(onToken)

  useEffect(() => {
    onTokenRef.current = onToken
  }, [onToken])

  useEffect(() => {
    const container = containerRef.current
    let cancelled = false
    loadScript()
      .then((api) => {
        if (cancelled || !container) return
        widgetIdRef.current = api.render(container, {
          sitekey: siteKey,
          callback: (token) => onTokenRef.current(token),
          'expired-callback': () => onTokenRef.current(null),
          'error-callback': () => onTokenRef.current(null),
        })
      })
      .catch(() => onTokenRef.current(null))

    return () => {
      cancelled = true
      if (widgetIdRef.current !== null && window.grecaptcha) {
        window.grecaptcha.reset(widgetIdRef.current)
        widgetIdRef.current = null
      }
      container?.replaceChildren()
    }
  }, [siteKey])

  useEffect(() => {
    if (resetSignal > 0 && widgetIdRef.current !== null && window.grecaptcha) {
      window.grecaptcha.reset(widgetIdRef.current)
      onTokenRef.current(null)
    }
  }, [resetSignal])

  return <div ref={containerRef} className="recaptcha-box" />
}