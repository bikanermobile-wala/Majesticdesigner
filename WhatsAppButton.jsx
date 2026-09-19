import { Link } from 'react-router-dom'
import { whatsappLink } from '../data/config'

const Icon = () => (
  <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true" fill="currentColor">
    <path d="M16.04 3C9.4 3 4 8.36 4 14.95c0 2.1.56 4.15 1.62 5.95L4 29l8.28-2.13a12.1 12.1 0 0 0 3.76.6C22.68 27.47 28 22.1 28 15.5 28 8.9 22.68 3 16.04 3Zm0 22.4c-1.2 0-2.38-.3-3.42-.87l-.5-.27-4.9 1.26 1.3-4.75-.3-.5a9.8 9.8 0 0 1-1.5-5.2c0-5.43 4.5-9.85 10.03-9.85 5.53 0 9.9 4.52 9.9 9.98 0 5.46-4.15 9.2-10.6 9.2Zm5.73-7.34c-.31-.16-1.86-.92-2.14-1.02-.29-.1-.5-.16-.7.16-.2.3-.8 1.02-.98 1.23-.18.2-.36.23-.67.08-.31-.16-1.3-.48-2.48-1.53-.9-.8-1.52-1.8-1.7-2.1-.18-.3-.02-.47.14-.62.14-.14.31-.36.46-.54.16-.18.2-.3.31-.5.1-.2.05-.4-.03-.55-.08-.16-.7-1.7-.96-2.3-.25-.6-.5-.52-.7-.53h-.6c-.2 0-.52.08-.8.4-.27.3-1.05 1.03-1.05 2.5 0 1.47 1.08 2.9 1.23 3.1.15.2 2.1 3.2 5.1 4.5.7.3 1.27.5 1.7.62.72.23 1.37.2 1.88.12.57-.08 1.86-.76 2.12-1.5.26-.74.26-1.37.18-1.5-.08-.13-.29-.2-.6-.36Z" />
  </svg>
)

export default function WhatsAppButton() {
  const link = whatsappLink('Hello Majestic Designer, I would like to know more about your designer wear.')
  const inner = (
    <>
      <span className="wa__tip">Chat with Majestic Designer</span>
      <Icon />
    </>
  )
  return link ? (
    <a className="wa" href={link} target="_blank" rel="noopener noreferrer" aria-label="Chat with Majestic Designer on WhatsApp">
      {inner}
    </a>
  ) : (
    <Link className="wa" to="/contact" aria-label="Chat with Majestic Designer — contact page">
      {inner}
    </Link>
  )
}
