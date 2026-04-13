import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Header.css'

const navItems = [
  { to: '/', label: 'Úvod' },
  { to: '/pomniky', label: 'Pomníky' },
  { to: '/sochy', label: 'Sochy' },
  { to: '/restaurovani', label: 'Restaurování' },
  { to: '/o-firme', label: 'O firmě' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo">
          <span className="logo-icon">
            <img src="/soska-logo.png" alt="" className="logo-icon-img" />
          </span>
          <div className="logo-text">
            <span className="logo-name">Bartoloměj Štěrba</span>
            <span className="logo-sub">kamenosochařství</span>
          </div>
        </Link>

        <button
          className={`hamburger ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
              end={item.to === '/'}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
