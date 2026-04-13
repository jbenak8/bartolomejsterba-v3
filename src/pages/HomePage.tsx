import { Link } from 'react-router-dom'
import {
  HeadstoneIcon,
  SculptureIcon,
  RestorationIcon,
  StarIcon,
  PaletteIcon,
  MountainIcon,
  HandshakeIcon,
} from '../components/Icons'
import './HomePage.css'

const services = [
  {
    icon: <HeadstoneIcon size={56} />,
    title: 'Pomníky',
    desc: 'Důstojné a elegantní pomníky z přírodního kamene na míru. Každý náhrobek je jedinečným dílem, které ctí památku vašich blízkých.',
    link: '/pomniky',
  },
  {
    icon: <SculptureIcon size={56} />,
    title: 'Sochy',
    desc: 'Originální sochařská díla z kamene, pískovce i dřeva. Od monumentálních soch po drobné figurky do interiéru i exteriéru.',
    link: '/sochy',
  },
  {
    icon: <RestorationIcon size={56} />,
    title: 'Restaurování',
    desc: 'Odborná restaurace historických památek, soch a uměleckých děl s maximální úctou k originálu a jeho autenticitě.',
    link: '/restaurovani',
  },
]

const features = [
  { icon: <StarIcon size={44} />, title: 'Tradice a zkušenosti', desc: 'Dlouholeté působení v oboru kamenosochařství' },
  { icon: <PaletteIcon size={44} />, title: 'Individuální přístup', desc: 'Každé dílo tvoříme podle přání zákazníka' },
  { icon: <MountainIcon size={44} />, title: 'Přírodní materiály', desc: 'Pracujeme s kvalitním přírodním kamenem' },
  { icon: <HandshakeIcon size={44} />, title: 'Osobní jednání', desc: 'Vždy se domluvíme na nejlepším řešení' },
]

export default function HomePage() {
  return (
    <div className="home">
      <section className="hero">
        <video className="hero-video" autoPlay muted loop playsInline>
          <source src="/images/hero-video.mov" type="video/quicktime" />
        </video>
        <div className="hero-overlay" />
        <div className="container hero-content">
          <span className="hero-badge">Kamenosochařství s tradicí</span>
          <h1 className="hero-title">
            Bartoloměj Štěrba
          </h1>
          <p className="hero-subtitle">
            Tvoříme z kamene díla, která přetrvají staletí. Pomníky, sochy
            a restaurátorské práce s důrazem na kvalitu a řemeslnou preciznost.
          </p>
          <div className="hero-actions">
            <Link to="/o-firme" className="btn btn-primary">Kontaktujte nás</Link>
            <Link to="/pomniky" className="btn btn-outline">Naše práce</Link>
          </div>
        </div>
      </section>

      <section className="section services-section">
        <div className="container">
          <h2 className="section-title">Naše služby</h2>
          <hr className="section-divider" />
          <p className="section-subtitle">
            Nabízíme komplexní kamenosochařské služby od návrhu až po realizaci
          </p>
          <div className="services-grid">
            {services.map((s) => (
              <Link to={s.link} key={s.title} className="service-card">
                <span className="service-icon">{s.icon}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <span className="service-link">Zjistit více →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-preview">
        <div className="container about-preview-inner">
          <div className="about-preview-text">
            <h2>O naší dílně</h2>
            <hr className="section-divider" style={{ margin: '16px 0 24px' }} />
            <p>
              Kamenosochařství Bartoloměj Štěrba je rodinná dílna s dlouholetou
              tradicí. Specializujeme se na výrobu pomníků, tvorbu soch a odborné
              restaurování historických památek.
            </p>
            <p>
              Každé dílo přistupujeme s maximální péčí a respektem k materiálu.
              Používáme převážně přírodní kámen — pískovec, mramor, žulu a další
              materiály, jejichž autenticita a odolnost vůči povětrnostním
              podmínkám je nezpochybnitelná.
            </p>
            <Link to="/o-firme" className="btn btn-secondary">Více o firmě</Link>
          </div>
          <div className="about-preview-visual">
            <div className="about-visual-card">
              <div className="about-visual-icon">✦</div>
              <div className="about-visual-text">
                <span className="about-visual-number">20+</span>
                <span>let zkušeností</span>
              </div>
            </div>
            <div className="about-visual-card">
              <div className="about-visual-icon">◆</div>
              <div className="about-visual-text">
                <span className="about-visual-number">500+</span>
                <span>realizovaných děl</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section features-section">
        <div className="container">
          <h2 className="section-title">Proč si vybrat nás</h2>
          <hr className="section-divider" />
          <div className="features-grid">
            {features.map((f) => (
              <div key={f.title} className="feature-card">
                <span className="feature-icon">{f.icon}</span>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
