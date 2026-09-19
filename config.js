// Central business configuration. Edit the values below.
// Anything still in [BRACKETS] is treated as "not filled in yet".
export const config = {
  brandName: 'Majestic Designer',
  tagline: 'Crafting Elegance. Defining Your Style.',
  location: 'Surat, Gujarat, India',

  phone: '[ADD PHONE NUMBER]',           // e.g. '+91 98XXX XXXXX'
  whatsapp: '[ADD WHATSAPP NUMBER]',     // digits with country code, e.g. '919800000000'
  email: '[ADD EMAIL]',
  instagram: '[ADD INSTAGRAM URL]',      // e.g. 'https://www.instagram.com/yourhandle'
  openingHours: '[ADD OPENING HOURS]',
  googleMapsUrl: '[ADD GOOGLE MAPS EMBED URL]', // Google Maps > Share > Embed a map > copy the src="..." URL

  // Optional: a Formspree / Getform style endpoint so the appointment form posts directly.
  formEndpoint: '',
}

export const isFilled = (value) => Boolean(value) && !/^\s*\[ADD/i.test(value)

export const whatsappDigits = () => (isFilled(config.whatsapp) ? config.whatsapp.replace(/\D/g, '') : '')

// Returns a wa.me link, or null when the number has not been added yet.
export const whatsappLink = (text = '') => {
  const digits = whatsappDigits()
  if (digits.length < 8) return null
  return `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ''}`
}
