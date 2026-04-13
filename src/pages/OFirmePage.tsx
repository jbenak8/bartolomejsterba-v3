import { useState, type FormEvent } from 'react'
import './PageStyles.css'

export default function OFirmePage() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
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
                  <p>Česká republika</p>
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
                  <p>Po–Pá: 8:00 – 17:00<br />So: po domluvě</p>
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
                    <input type="text" id="name" name="name" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <input type="email" id="email" name="email" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Telefon</label>
                    <input type="tel" id="phone" name="phone" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Zpráva</label>
                    <textarea id="message" name="message" required />
                  </div>
                  <button type="submit" className="form-submit">
                    Odeslat zprávu
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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2560000!2d15.4729!3d49.8175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b939c0970798b%3A0x400af0f66164090!2zxIxlc2vDoSByZXB1Ymxpa2E!5e0!3m2!1scs!2scz!4v1"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </div>
  )
}
