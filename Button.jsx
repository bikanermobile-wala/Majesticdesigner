import { Link } from 'react-router-dom'
import { whatsappLink } from '../data/config'

// Internal links use `to`, external links use `href`.
export default function Button({ to, href, variant = 'solid', arrow = false, className = '', children, ...rest }) {
  const cls = `btn btn--${variant} ${className}`.trim()
  const inner = (
    <>
      <span className="btn__label">{children}</span>
      {arrow && (
        <span className="btn__arrow" aria-hidden="true">
          →
        </span>
      )}
    </>
  )
  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {inner}
      </Link>
    )
  }
  const external = href && href.startsWith('http')
  return (
    <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
      {inner}
    </a>
  )
}

// Opens WhatsApp when a number is configured, otherwise sends visitors to the contact page.
export function WhatsAppCta({ message = '', variant = 'ghost', className = '', children = 'Enquire on WhatsApp' }) {
  const link = whatsappLink(message)
  return link ? (
    <Button href={link} variant={variant} className={className}>
      {children}
    </Button>
  ) : (
    <Button to="/contact" variant={variant} className={className}>
      {children}
    </Button>
  )
}
