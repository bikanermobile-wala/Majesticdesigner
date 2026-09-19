import { useEffect, useState } from 'react'
import { config, isFilled, whatsappLink } from '../data/config'

const occasions = ['Wedding', 'Engagement', 'Reception', 'Sangeet / Mehendi', 'Festive celebration', 'Custom creation', 'Other']

export default function AppointmentForm({ defaultMessage = '' }) {
  const [values, setValues] = useState({ name: '', phone: '', email: '', occasion: '', date: '', message: defaultMessage })
  const [status, setStatus] = useState({ type: 'idle', text: '' })

  useEffect(() => {
    if (defaultMessage) setValues((v) => ({ ...v, message: v.message || defaultMessage }))
  }, [defaultMessage])

  const set = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }))

  const summary = () =>
    [
      'Appointment request — Majestic Designer',
      `Name: ${values.name}`,
      `Phone: ${values.phone}`,
      values.email && `Email: ${values.email}`,
      values.occasion && `Occasion: ${values.occasion}`,
      values.date && `Preferred date: ${values.date}`,
      values.message && `Message: ${values.message}`,
    ]
      .filter(Boolean)
      .join('\n')

  const onSubmit = async (e) => {
    e.preventDefault()
    const text = summary()

    if (isFilled(config.formEndpoint)) {
      setStatus({ type: 'busy', text: 'Sending your request…' })
      try {
        const res = await fetch(config.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(values),
        })
        if (!res.ok) throw new Error('Request failed')
        setStatus({ type: 'ok', text: 'Thank you. Your appointment request has been received.' })
        setValues({ name: '', phone: '', email: '', occasion: '', date: '', message: '' })
      } catch {
        setStatus({ type: 'error', text: 'Your request could not be sent. Please try again or chat with us on WhatsApp.' })
      }
      return
    }

    const wa = whatsappLink(text)
    if (wa) {
      window.open(wa, '_blank', 'noopener,noreferrer')
      setStatus({ type: 'ok', text: 'Your request is ready in WhatsApp. Press send there to complete it.' })
      return
    }

    if (isFilled(config.email)) {
      window.location.href = `mailto:${config.email}?subject=${encodeURIComponent('Appointment request')}&body=${encodeURIComponent(text)}`
      setStatus({ type: 'ok', text: 'Your request is ready in your email app. Press send there to complete it.' })
      return
    }

    setStatus({
      type: 'error',
      text: 'Appointment requests are not connected yet. Add the WhatsApp number, email or form endpoint in src/data/config.js.',
    })
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate={false}>
      <div className="form__row">
        <label className="field">
          <span>Name</span>
          <input type="text" name="name" autoComplete="name" required value={values.name} onChange={set('name')} />
        </label>
        <label className="field">
          <span>Phone</span>
          <input type="tel" name="phone" autoComplete="tel" required value={values.phone} onChange={set('phone')} />
        </label>
      </div>
      <div className="form__row">
        <label className="field">
          <span>Email</span>
          <input type="email" name="email" autoComplete="email" value={values.email} onChange={set('email')} />
        </label>
        <label className="field">
          <span>Occasion</span>
          <select name="occasion" value={values.occasion} onChange={set('occasion')}>
            <option value="">Select an occasion</option>
            {occasions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="field">
        <span>Preferred Date</span>
        <input type="date" name="date" value={values.date} onChange={set('date')} />
      </label>
      <label className="field">
        <span>Message</span>
        <textarea name="message" rows="4" value={values.message} onChange={set('message')} />
      </label>

      <button type="submit" className="btn btn--solid form__submit" disabled={status.type === 'busy'}>
        <span className="btn__label">Request an Appointment</span>
      </button>
      <p className={`form__status form__status--${status.type}`} role="status" aria-live="polite">{status.text}</p>
    </form>
  )
}
