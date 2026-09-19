import { useMemo, useState } from 'react'
import PageHero from '../components/PageHero'
import FilterBar from '../components/FilterBar'
import ProductGrid from '../components/ProductGrid'
import Button from '../components/Button'
import { categories, products } from '../data/products'
import { usePageMeta } from '../hooks/usePageMeta'

const options = [{ key: 'all', label: 'All' }, ...categories.map((c) => ({ key: c, label: c }))]

export default function Collections() {
  usePageMeta(
    'Collections | Majestic Designer, Surat',
    'Explore designer wear, occasion fashion and custom creations from Majestic Designer, Surat, Gujarat.',
  )
  const [filter, setFilter] = useState('all')
  const shown = useMemo(() => (filter === 'all' ? products : products.filter((p) => p.category === filter)), [filter])

  return (
    <>
      <PageHero title="COLLECTIONS" lead="A curated catalogue of designer wear from Majestic Designer, Surat." />

      <section className="catalogue section wrap" aria-label="Collection catalogue">
        <FilterBar options={options} value={filter} onChange={setFilter} label="Filter by category" />

        {shown.length > 0 ? (
          <div key={filter} className="fade-in">
            <ProductGrid products={shown} variant="catalogue" reveal={false} />
          </div>
        ) : (
          <div key={filter} className="catalogue__empty fade-in">
            <p className="lead">
              {filter === 'Custom Creations'
                ? 'Custom creations are developed by appointment, around your style and occasion.'
                : 'Pieces for this category will be added here soon.'}
            </p>
            <Button to="/contact" variant="dark" arrow>Book a private consultation</Button>
          </div>
        )}
      </section>
    </>
  )
}
