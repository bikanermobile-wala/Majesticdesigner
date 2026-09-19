import { Link } from 'react-router-dom'

export default function ProductCard({ product, reveal = true, priority = false }) {
  return (
    <article className="pcard">
      <Link to={`/collections/${product.slug}`} className="pcard__link">
        <div className="pcard__media" style={{ aspectRatio: product.ratio }} {...(reveal ? { 'data-reveal': 'image' } : {})}>
          <img
            className="pcard__img"
            src={product.image}
            alt={`${product.name} — ${product.category} by Majestic Designer, Surat`}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
          />
        </div>
        <div className="pcard__meta">
          <h3 className="pcard__name"><span>{product.name}</span></h3>
          <p className="pcard__cat">{product.category}</p>
          <p className="pcard__price">{product.price}</p>
          <span className="pcard__cta">
            <span>VIEW DETAILS</span>
            <span className="pcard__arrow" aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </article>
  )
}
