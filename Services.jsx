import PageHero from '../components/PageHero'
import Button from '../components/Button'
import { images } from '../data/images'
import { usePageMeta } from '../hooks/usePageMeta'

const services = [
  {
    title: 'BESPOKE DESIGN',
    text: 'Personalized designer creations developed around individual style and occasion.',
    image: images.product1,
    alt: 'Bespoke designer creation by Majestic Designer, Surat',
    ratio: '4 / 5',
    position: 'center top',
  },
  {
    title: 'PERSONAL STYLING',
    text: 'Guidance on creating a complete, refined look for important occasions.',
    image: images.product2,
    alt: 'Personal styling with Majestic Designer, Surat',
    ratio: '3 / 4',
    position: 'center 30%',
  },
  {
    title: 'CUSTOM FITTING',
    text: 'A considered fitting experience focused on comfort, proportion and presentation.',
    image: images.product3,
    alt: 'Custom fitting experience at Majestic Designer, Surat',
    ratio: '1 / 1',
    position: 'center 25%',
  },
  {
    title: 'OCCASION CONSULTATION',
    text: 'Personalized consultation for weddings, celebrations and special events.',
    image: images.product4,
    alt: 'Occasion consultation at Majestic Designer, Surat',
    ratio: '5 / 6',
    position: 'center 20%',
  },
]

export default function Services() {
  usePageMeta(
    'Services | Majestic Designer, Surat',
    'Bespoke design, personal styling, custom fitting and occasion consultation from Majestic Designer, Surat, Gujarat.',
  )

  return (
    <>
      <PageHero title="SERVICES" lead="Personal attention, from the first idea to the final fitting." />

      {services.map((s, i) => (
        <section key={s.title} className={`service section wrap ${i % 2 ? 'service--flip' : ''}`}>
          <div className="service__media" data-reveal="image" style={{ aspectRatio: s.ratio }}>
            <img src={s.image} alt={s.alt} style={{ objectPosition: s.position }} loading="lazy" decoding="async" />
          </div>
          <div className="service__text" data-reveal="text">
            <h2 className="h-display h-lg">{s.title}</h2>
            <p className="lead">{s.text}</p>
          </div>
        </section>
      ))}

      <section className="service-cta section wrap">
        <Button to="/contact" variant="dark" arrow>Book a private consultation</Button>
      </section>
    </>
  )
}
