import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="footer-logo">
              <span className="logo-icon">
                <img src="/soska-logo.png" alt="" className="logo-icon-img" />
              </span>
              <div>
                <div className="footer-logo-name">Bartoloměj Štěrba</div>
                <div className="footer-logo-sub">kamenosochařství</div>
              </div>
            </div>
            <p className="footer-desc">
              Tradiční kamenosochařské řemeslo s důrazem na kvalitu, preciznost
              a úctu k materiálu. Působíme v oboru již řadu let.
            </p>
          </div>

          <div className="footer-col">
            <h4>Navigace</h4>
            <ul>
              <li><Link to="/">Úvod</Link></li>
              <li><Link to="/pomniky">Pomníky</Link></li>
              <li><Link to="/sochy">Sochy</Link></li>
              <li><Link to="/restaurovani">Restaurování</Link></li>
              <li><Link to="/o-firme">O firmě</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Kontakt</h4>
            <ul className="footer-contact">
              <li>
                <span className="footer-icon">📍</span>
                Česká republika
              </li>
              <li>
                <span className="footer-icon">📧</span>
                <a href="mailto:info@bartolomejsterba.cz">info@bartolomejsterba.cz</a>
              </li>
              <li>
                <span className="footer-icon">🌐</span>
                <a href="https://www.bartolomejsterba.cz" target="_blank" rel="noopener noreferrer">
                  www.bartolomejsterba.cz
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Kamenosochařství Bartoloměj Štěrba. Všechna práva vyhrazena.</p>
        </div>
      </div>
    </footer>
  )
}
