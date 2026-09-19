import ProductCard from './ProductCard'

// variant: "editorial" (asymmetric homepage layout), "catalogue" (collections page), "related" (3-up)
export default function ProductGrid({ products, variant = 'editorial', reveal = true }) {
  return (
    <div className={`pgrid pgrid--${variant}`}>
      {products.map((p) => (
        <ProductCard key={p.slug} product={p} reveal={reveal} />
      ))}
    </div>
  )
}
