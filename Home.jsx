import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import ProductGrid from '../components/ProductGrid'
import VideoSection from '../components/VideoSection'
import Button from '../components/Button'
import { images } from '../data/images'
import { products } from '../data/products'
import { usePageMeta } from '../hooks/usePageMeta'

export default function Home() {
  usePageMeta('Majestic Designer | Luxury Designer Wear in Surat')

  return (
    <>
      <Hero />

      <section className="intro section wrap" aria-labelledby="intro-title">
        <div className="intro__text">
          <h2 id="intro-title" className="h-display h-xl" data-reveal="text">
            DESIGNED FOR YOUR MOST MAJESTIC MOMENTS
          </h2>
          <div className="intro__body" data-reveal="text">
            <p className="lead">
              “Discover refined designer wear where contemporary style meets timeless elegance. Every creation is presented with an
              uncompromising attention to detail and a distinctly Majestic point of view.”
            </p>
            <Link to="/about" className="textlink">
              <span>Our story</span>
              <span className="textlink__arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <div className="intro__media" data-reveal="image">
          <img
            src={images.product1}
            alt="The Majestic Noir — refined designer wear by Majestic Designer, Surat"
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>

      <section className="featured section wrap" aria-labelledby="edit-title">
        <header className="featured__head">
          <h2 id="edit-title" className="h-display h-xl" data-reveal="text">THE MAJESTIC EDIT</h2>
          <p className="lead" data-reveal="text">“A curated expression of modern occasion wear.”</p>
        </header>
        <ProductGrid products={products} variant="editorial" />
        <div className="featured__more">
          <Button to="/collections" variant="dark" arrow>View the full collection</Button>
        </div>
      </section>

      <VideoSection />

      <section className="statement" aria-label="Signature statement">
        <div className="statement__media">
          <img
            className="statement__img"
            data-parallax="8"
            src={images.product4}
            alt="The Majestic Signature — designer wear by Majestic Designer, Surat"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="statement__shade" aria-hidden="true" />
        <h2 className="statement__text wrap">
          <span className="statement__line" data-reveal="text">YOUR STYLE.</span>
          <span className="statement__line statement__line--mid" data-reveal="text">YOUR MOMENT.</span>
          <span className="statement__line statement__line--end" data-reveal="text">YOUR MAJESTY.</span>
        </h2>
      </section>
    </>
  )
}
