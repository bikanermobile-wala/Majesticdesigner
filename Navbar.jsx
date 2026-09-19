import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const links = [
  ['Home', '/'],
  ['About', '/about'],
  ['Collections', '/collections'],
  ['Services', '/services'],
  ['Lookbook', '/lookbook'],
  ['Videos', '/videos'],
  ['Contact', '/contact'],
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
        <div className="nav__inner">
          <Link to="/" className="nav__brand" aria-label="Majestic Designer — home">
            MAJESTIC DESIGNER
          </Link>

          <nav className="nav__links" aria-label="Primary">
            {links.map(([label, to]) => (
              <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `nav__link ${isActive ? 'is-active' : ''}`}>
                {label}
              </NavLink>
            ))}
          </nav>

          <Link to="/contact" className="btn btn--ghost nav__cta">
            <span className="btn__label">Book an appointment</span>
          </Link>

          <button
            type="button"
            className={`burger ${open ? 'is-open' : ''}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div id="mobile-menu" className={`menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <nav className="menu__inner" aria-label="Mobile">
          {links.map(([label, to], i) => (
            <NavLink key={to} to={to} end={to === '/'} className="menu__link" style={{ '--i': i }}>
              {label}
            </NavLink>
          ))}
          <Link to="/contact" className="btn btn--solid menu__cta" style={{ '--i': links.length }}>
            <span className="btn__label">Book an appointment</span>
          </Link>
          <p className="menu__loc" style={{ '--i': links.length + 1 }}>Surat, Gujarat, India</p>
        </nav>
      </div>
    </>
  )
}
