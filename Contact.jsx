import { useLocation } from 'react-router-dom'
import PageHero from '../components/PageHero'
import AppointmentForm from '../components/AppointmentForm'
import { WhatsAppCta } from '../components/Button'
import { config, isFilled, whatsappLink } from '../data/config'
import { usePageMeta } from '../hooks/usePageMeta'

function Detail({ label, value, href }) {
  return (
    <div className="detail">
      <dt>{label}</dt>
      <dd>{isFilled(value) && href ? <a href={href} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{value}</a> : value}</dd>
    </div>
  )
}

export default function Contact() {
  usePageMeta(
    'Contact | Majestic Designer, Surat',
    'Book an appointment with Majestic Designer, Surat, Gujarat — designer wear, styling and private consultations.',
  )
  const { state } = useLocation()
  const product = state && state.product
  const defaultMessage = product ? `I would like to book an appointment regarding ${product}.` : ''
  const wa = whatsappLink('Hello Majestic Designer, I would like to book an appointment.')

  return (
    <>
      <PageHero title="BEGIN YOUR MAJESTIC JOURNEY" lead="Surat, Gujarat, India" />

      <section className="contact section wrap">
        <div className="contact__info" data-reveal="text">
          <dl>
            <Detail label="Phone" value={config.phone} href={`tel:${config.phone.replace(/[^\d+]/g, '')}`} />
            <Detail label="WhatsApp" value={config.whatsapp} href={wa} />
            <Detail label="Email" value={config.email} href={`mailto:${config.email}`} />
            <Detail label="Instagram" value={config.instagram} href={config.instagram} />
            <Detail label="Opening Hours" value={config.openingHours} />
            <Detail label="Location" value={config.location} />
          </dl>
          <WhatsAppCta variant="dark" message="Hello Majestic Designer, I would like to book an appointment.">Chat on WhatsApp</WhatsAppCta>
        </div>

        <div className="contact__form" data-reveal="text">
          <AppointmentForm defaultMessage={defaultMessage} />
        </div>
      </section>

      <section className="map wrap" aria-label="Map">
        {isFilled(config.googleMapsUrl) ? (
          <iframe
            className="map__frame"
            title="Majestic Designer location, Surat"
            src={config.googleMapsUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : (
          <div className="map__placeholder">
            <p className="lead">Google Maps placeholder</p>
            <p>Add the map embed URL as googleMapsUrl in src/data/config.js.</p>
          </div>
        )}
      </section>
    </>
  )
}
