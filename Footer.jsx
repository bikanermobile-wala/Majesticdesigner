import { Link, useLocation } from 'react-router-dom'
import { config, isFilled, whatsappLink } from '../data/config'
import Button from './Button'

const links = [
  ['Home', '/'],
  ['About', '/about'],
  ['Collections', '/collections'],
  ['Services', '/services'],
  ['Lookbook', '/lookbook'],
  ['Videos', '/videos'],
  ['Contact', '/contact'],
]

export default function Footer() {
  const { pathname } = useLocation()
  const wa = whatsappLink()

  return (
    <footer className="footer">
      {pathname !== '/contact' && (
        <section className="footer__cta wrap" aria-labelledby="footer-cta">
          <h2 id="footer-cta" className="h-display h-lg">BOOK AN APPOINTMENT</h2>
          <div className="footer__cta-side">
            <p className="lead">Private consultations at Majestic Designer, Surat.</p>
            <Button to="/contact" variant="solid" arrow>Request an appointment</Button>
          </div>
        </section>
      )}

      <div className="footer__main wrap">
        <div className="footer__brand">
          <p className="footer__wordmark">MAJESTIC DESIGNER</p>
          <p className="footer__tag">Crafting Elegance. Defining Your Style.</p>
        </div>

        <nav className="footer__col" aria-label="Footer">
          <h3 className="footer__h">Explore</h3>
          <ul>
            {links.map(([label, to]) => (
              <li key={to}><Link to={to}>{label}</Link></li>
            ))}
          </ul>
        </nav>

        <div className="footer__col">
          <h3 className="footer__h">Connect</h3>
          <ul>
            <li>{isFilled(config.instagram) ? <a href={config.instagram} target="_blank" rel="noopener noreferrer">Instagram</a> : <Link to="/contact">Instagram</Link>}</li>
            <li>{wa ? <a href={wa} target="_blank" rel="noopener noreferrer">WhatsApp</a> : <Link to="/contact">WhatsApp</Link>}</li>
          </ul>
          <h3 className="footer__h footer__h--gap">Location</h3>
          <p>Surat, Gujarat, India</p>
        </div>
      </div>

      <p className="footer__legal wrap">© 2026 Majestic Designer. All Rights Reserved.</p>
    </footer>
  )
}
