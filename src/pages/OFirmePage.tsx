import { useEffect, useRef, useState, type SubmitEvent } from 'react'
import Turnstile from '../components/Turnstile'
import {
  CAPTCHA_PROVIDER,
  CAPTCHA_SITE_KEY,
  RECAPTCHA_SITE_KEY,
  sendContact,
} from '../utils/contact'
import { executeRecaptcha, loadRecaptcha, RECAPTCHA_ACTION } from '../utils/recaptcha'
import './PageStyles.css'

export default function OFirmePage() {
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [resetSignal, setResetSignal] = useState(0)
  const startedAt = useRef(0)

  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

  useEffect(() => {
    if (CAPTCHA_PROVIDER === 'recaptcha') {
      void loadRecaptcha(RECAPTCHA_SITE_KEY).catch(() => undefined)
    }
  }, [])

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (sending) return

    if (CAPTCHA_PROVIDER === 'turnstile' && !token) {
      setError('Potvrďte prosím, že nejste robot.')
      return
    }

    const form = e.currentTarget
    const data = new FormData(form)
    const field = (key: string) => {
      const value = data.get(key)
      return typeof value === 'string' ? value : ''
    }

    setSending(true)
    setError(null)
    try {
      let captchaToken = token ?? ''
      if (CAPTCHA_PROVIDER === 'recaptcha') {
        const recaptchaToken = await executeRecaptcha(RECAPTCHA_SITE_KEY, RECAPTCHA_ACTION)
        if (!recaptchaToken) {
          throw new Error('Ověření proti robotům se nezdařilo. Zkuste to prosím znovu.')
        }
        captchaToken = recaptchaToken
      }

      await sendContact({
        name: field('name'),
        email: field('email'),
        phone: field('phone'),
        message: field('message'),
        website: field('website'),
        elapsed: Date.now() - startedAt.current,
        captchaToken,
        captchaProvider: CAPTCHA_PROVIDER,
        turnstileToken: captchaToken,
      })
      setSent(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Zprávu se nepodařilo odeslat.')
      setResetSignal((n) => n + 1)
    } finally {
      setSending(false)
    }
  }

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <h1>O firmě</h1>
          <hr className="section-divider" />
          <p>
            Rodinná kamenosochařská dílna s dlouholetou tradicí a vášní
            pro řemeslnou dokonalost.
          </p>
        </div>
      </section>

      <section className="page-content">
        <div className="container">
          <div className="content-grid">
            <div>
              <h2>Naše historie</h2>
              <p>
                Kamenosochařství Bartoloměje Štěrby ml. a Jany Š. Rejmanové
                je rodinná dílna, která navazuje na bohatou tradici
                kamenosochařského řemesla. Naše práce spojuje umělecký cit
                s technickou precizností.
              </p>
              <p>
                Specializujeme se na tři hlavní oblasti — výrobu pomníků
                a náhrobků, tvorbu sochařských děl a odborné restaurování
                historických památek. Ke každé zakázce přistupujeme individuálně
                s maximální péčí a respektem k materiálu.
              </p>
              <p>
                Pracujeme převážně s přírodním kamenem — pískovcem, žulou,
                mramorem a opukou. Využíváme také dřevo pro sochařskou tvorbu.
                Naše díla najdete po celé České republice.
              </p>
            </div>
            <div>
              <div className="content-block">
                <h3>Naše hodnoty</h3>
                <p>
                  <strong>Kvalita</strong> — Každé dílo musí splňovat nejvyšší
                  standardy řemeslného zpracování.
                </p>
                <p>
                  <strong>Tradice</strong> — Ctíme tradiční postupy a techniky
                  kamenosochařského řemesla.
                </p>
                <p>
                  <strong>Respekt</strong> — K materiálu, k zákazníkovi
                  i k historickým dílům přistupujeme s úctou.
                </p>
                <p>
                  <strong>Individualita</strong> — Každé dílo je originál
                  vytvořený na míru.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Kontaktní informace</h2>
              <div className="contact-detail">
                <div className="contact-detail-icon">📍</div>
                <div>
                  <h4>Adresa</h4>
                  <p>Kozojedy 157<br />331 41 Kozojedy<br />Česká republika</p>
                </div>
              </div>
              <div className="contact-detail">
                <div className="contact-detail-icon">📞</div>
                <div>
                  <h4>Telefon</h4>
                  <p>Bartoloměj: +420 604 739 562<br/>Jana: +420 604 325 396</p>
                </div>
              </div>
              <div className="contact-detail">
                <div className="contact-detail-icon">📧</div>
                <div>
                  <h4>E-mail</h4>
                  <p>info@bartolomejsterba.cz</p>
                </div>
              </div>
              <div className="contact-detail">
                <div className="contact-detail-icon">🌐</div>
                <div>
                  <h4>Web</h4>
                  <p>www.bartolomejsterba.cz</p>
                </div>
              </div>
              <div className="contact-detail">
                <div className="contact-detail-icon">🕐</div>
                <div>
                  <h4>Otevírací doba</h4>
                  <p>Po předchozí, nejlépe telefonické, domluvě</p>
                  <p>Před vaší návštěvou nám prosím zavolejte. Můžeme být totiž v terénu.</p>
                </div>
              </div>
            </div>

            <div className="contact-form">
              <h2>Napište nám</h2>
              {sent ? (
                <div className="highlight-box">
                  <p>✅ Děkujeme za vaši zprávu! Ozveme se vám co nejdříve.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Jméno a příjmení</label>
                    <input type="text" id="name" name="name" maxLength={100} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <input type="email" id="email" name="email" maxLength={150} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Telefon</label>
                    <input type="tel" id="phone" name="phone" maxLength={30} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Zpráva</label>
                    <textarea id="message" name="message" minLength={5} maxLength={5000} required />
                  </div>

                  {/* Honeypot – pro lidi neviditelné, roboti ho vyplní */}
                  <div className="form-hp" aria-hidden="true">
                    <label htmlFor="website">Web</label>
                    <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
                  </div>

                  {CAPTCHA_SITE_KEY && CAPTCHA_PROVIDER === 'turnstile' && (
                    <Turnstile
                      siteKey={CAPTCHA_SITE_KEY}
                      onToken={setToken}
                      resetSignal={resetSignal}
                    />
                  )}

                  {error && (
                    <p className="form-error" role="alert">{error}</p>
                  )}

                  <button type="submit" className="form-submit" disabled={sending}>
                    {sending ? 'Odesílám…' : 'Odeslat zprávu'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="map-section">
        <div className="map-container">
          <iframe
            title="Mapa"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2568.3787893751605!2d13.540541312002516!3d49.92923337137845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470a59cb7a034573%3A0x76b2e672bfb01499!2zQmFydG9sb23Em2ogxaB0xJtyYmE!5e0!3m2!1scs!2scz!4v1789293596071!5m2!1scs!2scz"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </div>
  )
}
