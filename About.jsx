import PageHero from '../components/PageHero'
import { images } from '../data/images'
import { usePageMeta } from '../hooks/usePageMeta'

const blocks = [
  {
    title: 'OUR PHILOSOPHY',
    text: 'Fashion should feel personal. Every look should reflect the individuality, confidence and character of the person wearing it.',
    image: images.product2,
    alt: 'The Royal Élan — designer wear by Majestic Designer, Surat',
    ratio: '3 / 4',
  },
  {
    title: 'OUR APPROACH',
    text: 'From the first inspiration to the final fitting, the Majestic experience is centred around detail, presentation and personal style.',
    image: images.product3,
    alt: 'The Imperial Edit — designer wear by Majestic Designer, Surat',
    ratio: '4 / 5',
  },
  {
    title: 'OUR VISION',
    text: 'To create a distinctive designer experience in Surat where elegance and contemporary fashion come together.',
    image: images.product4,
    alt: 'The Majestic Signature — designer wear by Majestic Designer, Surat',
    ratio: '5 / 6',
  },
]

export default function About() {
  usePageMeta(
    'About | Majestic Designer, Surat',
    'The story of Majestic Designer — a Surat-based fashion destination focused on refined designer wear for memorable occasions.',
  )

  return (
    <>
      <PageHero
        title="THE STORY OF MAJESTIC"
        image={images.hero}
        imageAlt="Majestic Designer editorial image, Surat, Gujarat"
        lead="“Majestic Designer is a Surat-based fashion destination focused on refined designer wear for memorable occasions. Our approach brings together contemporary aesthetics, personal expression and attention to detail.”"
      />

      {blocks.map((b, i) => (
        <section key={b.title} className={`about section wrap ${i % 2 ? 'about--flip' : ''}`}>
          <div className="about__media" data-reveal="image" style={{ aspectRatio: b.ratio }}>
            <img src={b.image} alt={b.alt} loading="lazy" decoding="async" />
          </div>
          <div className="about__text" data-reveal="text">
            <h2 className="h-display h-lg">{b.title}</h2>
            <p className="lead">“{b.text}”</p>
          </div>
        </section>
      ))}
    </>
  )
}
