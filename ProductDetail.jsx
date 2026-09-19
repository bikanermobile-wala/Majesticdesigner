import { Link, Navigate, useParams } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid'
import Button, { WhatsAppCta } from '../components/Button'
import { getProduct, products } from '../data/products'
import { usePageMeta } from '../hooks/usePageMeta'

export default function ProductDetail() {
  const { slug } = useParams()
  const product = getProduct(slug)
  usePageMeta(
    product ? `${product.name} | Majestic Designer, Surat` : 'Majestic Designer',
    product ? `${product.name} — ${product.summary} Majestic Designer, Surat.` : undefined,
  )

  if (!product) return <Navigate to="/collections" replace />

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3)
  const message = `Hello Majestic Designer, I would like to enquire about ${product.name}.`

  return (
    <>
      <section className="pd">
        <div className="pd__inner wrap">
          <Link to="/collections" className="pd__back">← BACK TO COLLECTIONS</Link>
          <div className="pd__grid">
            <div className="pd__media" data-reveal="image">
              <img src={product.image} alt={`${product.name} — ${product.category} by Majestic Designer, Surat`} decoding="async" fetchpriority="high" />
            </div>
            <div className="pd__info">
              <p className="pd__cat">{product.category}</p>
              <h1 className="h-display h-xl pd__name">{product.name}</h1>
              <p className="pd__price">{product.price}</p>
              <div className="pd__desc">
                {product.description.map((t) => (
                  <p key={t} className="lead">{t}</p>
                ))}
              </div>
              <div className="pd__actions">
                <Button to="/contact" state={{ product: product.name }} variant="solid">Book an Appointment</Button>
                <WhatsAppCta message={message} variant="ghost">Enquire on WhatsApp</WhatsAppCta>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="related section wrap" aria-labelledby="related-title">
        <h2 id="related-title" className="h-display h-lg" data-reveal="text">FROM THE MAJESTIC EDIT</h2>
        <ProductGrid products={related} variant="related" />
      </section>
    </>
  )
}
