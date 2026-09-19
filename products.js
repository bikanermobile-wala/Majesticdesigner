import { images } from './images'

export const categories = [
  'Signature Designer Wear',
  'Wedding Edit',
  'Occasion Wear',
  'Contemporary Collection',
  'Custom Creations',
]

// To add a product, copy one block, change the values and add a new image in images.js.
export const products = [
  {
    slug: 'the-majestic-noir',
    name: 'The Majestic Noir',
    category: 'Signature Designer Wear',
    image: images.product1,
    ratio: '4 / 5',
    price: 'Price on Request',
    summary: 'A study in quiet confidence and considered presentation.',
    description: [
      'The Majestic Noir is presented as a study in restraint — a look built on proportion, presence and quiet confidence.',
      'Every Majestic creation is shown with an uncompromising attention to detail. Visit us to experience it in person.',
    ],
    lookbookTags: ['signature'],
  },
  {
    slug: 'the-royal-elan',
    name: 'The Royal Élan',
    category: 'Wedding Edit',
    image: images.product2,
    ratio: '3 / 4',
    price: 'Price on Request',
    summary: 'Celebratory designer wear with a distinctly regal spirit.',
    description: [
      'The Royal Élan carries the spirit of celebration — designer wear conceived for moments that deserve to be remembered.',
      'Speak with our team to explore how this look can be personalised around your occasion.',
    ],
    lookbookTags: ['wedding'],
  },
  {
    slug: 'the-imperial-edit',
    name: 'The Imperial Edit',
    category: 'Occasion Wear',
    image: images.product3,
    ratio: '4 / 5',
    price: 'Price on Request',
    summary: 'A confident, contemporary expression of occasion dressing.',
    description: [
      'The Imperial Edit brings a confident, contemporary point of view to occasion dressing.',
      'Book an appointment to view this look and discuss styling for your event.',
    ],
    lookbookTags: ['occasion'],
  },
  {
    slug: 'the-majestic-signature',
    name: 'The Majestic Signature',
    category: 'Contemporary Collection',
    image: images.product4,
    ratio: '5 / 6',
    price: 'Price on Request',
    summary: 'The house point of view, expressed in a single look.',
    description: [
      'The Majestic Signature expresses the house point of view — contemporary, polished and personal.',
      'Enquire to learn more or to arrange a private viewing at our Surat studio.',
    ],
    lookbookTags: ['signature', 'editorial'],
  },
]

export const getProduct = (slug) => products.find((p) => p.slug === slug)

// Lookbook uses the four supplied products plus the supplied campaign image.
export const lookbook = [
  {
    id: 'lb-hero',
    image: images.hero,
    caption: 'Majestic Designer Editorial',
    alt: 'Majestic Designer editorial campaign image, luxury designer wear from Surat',
    ratio: '4 / 5',
    tags: ['editorial'],
  },
  ...products.map((p) => ({
    id: `lb-${p.slug}`,
    image: p.image,
    caption: p.name,
    alt: `${p.name} — designer wear by Majestic Designer, Surat`,
    ratio: p.ratio,
    tags: p.lookbookTags,
  })),
]

export const lookbookFilters = [
  { key: 'all', label: 'All' },
  { key: 'signature', label: 'Signature' },
  { key: 'occasion', label: 'Occasion' },
  { key: 'wedding', label: 'Wedding' },
  { key: 'editorial', label: 'Editorial' },
]
