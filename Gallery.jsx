import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import FilterBar from './FilterBar'

function Lightbox({ items, index, onClose, onIndex }) {
  const item = items[index]
  const touchX = useRef(null)
  const closeRef = useRef(null)

  const go = useCallback((d) => onIndex((index + d + items.length) % items.length), [index, items.length, onIndex])

  useEffect(() => {
    closeRef.current?.focus()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, onClose])

  return (
    <div
      className="lb"
      role="dialog"
      aria-modal="true"
      aria-label="Lookbook image viewer"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
        touchX.current = null
      }}
    >
      <button type="button" className="lb__backdrop" aria-label="Close" onClick={onClose} tabIndex={-1} />
      <button ref={closeRef} type="button" className="lb__close" onClick={onClose} aria-label="Close viewer">
        <span /><span />
      </button>

      <figure className="lb__figure" key={item.id}>
        <img src={item.image} alt={item.alt} />
        <figcaption>
          <span>{item.caption}</span>
          <span className="lb__count">{index + 1} / {items.length}</span>
        </figcaption>
      </figure>

      {items.length > 1 && (
        <>
          <button type="button" className="lb__nav lb__nav--prev" onClick={() => go(-1)} aria-label="Previous image">←</button>
          <button type="button" className="lb__nav lb__nav--next" onClick={() => go(1)} aria-label="Next image">→</button>
        </>
      )}
    </div>
  )
}

export default function Gallery({ items, filters }) {
  const [filter, setFilter] = useState('all')
  const [active, setActive] = useState(null)
  const filtered = useMemo(() => (filter === 'all' ? items : items.filter((i) => i.tags.includes(filter))), [items, filter])

  return (
    <section className="gallery section wrap" aria-label="Lookbook gallery">
      <FilterBar
        options={filters}
        value={filter}
        label="Filter lookbook"
        onChange={(k) => {
          setFilter(k)
          setActive(null)
        }}
      />

      <div className="masonry" key={filter}>
        {filtered.map((item, i) => (
          <figure key={item.id} className="masonry__item" style={{ '--i': i }}>
            <button type="button" className="masonry__btn" onClick={() => setActive(i)} aria-label={`View ${item.caption} full screen`}>
              <span className="masonry__media" style={{ aspectRatio: item.ratio }}>
                <img src={item.image} alt={item.alt} loading="lazy" decoding="async" />
              </span>
              <figcaption className="masonry__cap">{item.caption}</figcaption>
            </button>
          </figure>
        ))}
      </div>

      {active !== null && <Lightbox items={filtered} index={active} onClose={() => setActive(null)} onIndex={setActive} />}
    </section>
  )
}
