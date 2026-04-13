import { RockIcon, MarbleIcon, SandstoneIcon } from '../components/Icons'
import './PageStyles.css'

const materials = [
  { icon: <RockIcon size={44} />, name: 'Žula', desc: 'Mimořádně odolná a trvanlivá, ideální pro venkovní pomníky' },
  { icon: <MarbleIcon size={44} />, name: 'Mramor', desc: 'Elegantní a vznešený materiál pro reprezentativní náhrobky' },
  { icon: <SandstoneIcon size={44} />, name: 'Pískovec', desc: 'Tradiční materiál s teplým vzhledem a snadnou opracovatelností' },
]

const galleryImages = [
  { src: 'https://www.bartolomejsterba.cz/galerie/pomniky/1.jpg', alt: 'Pomník z přírodního kamene' },
  { src: 'https://www.bartolomejsterba.cz/galerie/pomniky/5.jpg', alt: 'Žulový pomník' },
  { src: 'https://www.bartolomejsterba.cz/galerie/pomniky/6.jpg', alt: 'Mramorový náhrobek' },
  { src: 'https://www.bartolomejsterba.cz/galerie/pomniky/7.jpg', alt: 'Pomník s křížem' },
  { src: 'https://www.bartolomejsterba.cz/galerie/pomniky/11.jpg', alt: 'Moderní pomník' },
  { src: 'https://www.bartolomejsterba.cz/galerie/pomniky/13.jpg', alt: 'Pomník z pískovce' },
  { src: 'https://www.bartolomejsterba.cz/galerie/pomniky/15.jpg', alt: 'Dvojitý pomník' },
  { src: 'https://www.bartolomejsterba.cz/galerie/pomniky/18.jpg', alt: 'Pomník se zlatým nápisem' },
  { src: 'https://www.bartolomejsterba.cz/galerie/pomniky/20.jpg', alt: 'Elegantní náhrobek' },
]

export default function PomnikyPage() {
  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <h1>Pomníky a náhrobky</h1>
          <hr className="section-divider" />
          <p>
            Důstojné a elegantní pomníky z přírodního kamene, které ctí památku
            vašich blízkých a přetrvají generace.
          </p>
        </div>
      </section>

      <section className="page-content">
        <div className="container">
          <div className="content-grid">
            <div>
              <h2>Pomníky na míru</h2>
              <p>
                Pomníky odjakživa patřily k důstojnému způsobu uctění památky
                zesnulých, ať už šlo o drobnou pamětní desku na malém hrobě
                nebo velkolepou hrobku.
              </p>
              <p>
                Při výběru materiálu nejsou žádné hranice. Je však třeba brát
                v úvahu vhodnost zvoleného materiálu do daného prostředí, aby
                pomník mohl být elegantní a důstojnou vzpomínkou na osobu,
                kterou chcete uctít.
              </p>
              <p>
                Pro tento účel doporučujeme přírodní kameny, protože jejich
                autenticita a odolnost vůči povětrnostním podmínkám je
                nezpochybnitelná. Pomník může být tvarován dle vašeho výběru
                a může být doplněn různými detaily včetně zlatého či stříbrného
                nápisu.
              </p>
            </div>
            <div>
              <div className="highlight-box">
                <p>
                  „Vzorové typy pomníků jsou vždy k dispozici v našem ateliéru.
                  Můžete se jimi inspirovat. Jsme také ochotni vyrobit pomníky
                  na přání zákazníka, ať už se jedná o tvar, zpracování nebo
                  materiál."
                </p>
              </div>
              <div className="highlight-box" style={{ marginTop: '16px' }}>
                <p>
                  „Na pomníky z etických důvodů neumisťujeme naši reklamu."
                </p>
              </div>
            </div>
          </div>

          <h2 style={{ marginTop: '48px' }}>Materiály</h2>
          <div className="info-cards">
            {materials.map((m) => (
              <div key={m.name} className="info-card">
                <span className="info-card-icon">{m.icon}</span>
                <h3>{m.name}</h3>
                <p>{m.desc}</p>
              </div>
            ))}
          </div>

          <h2 style={{ marginTop: '48px' }}>Ukázky prací</h2>
          <div className="gallery-grid">
            {galleryImages.map((img) => (
              <div key={img.src} className="gallery-item gallery-item--real">
                <img src={img.src} alt={img.alt} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
