import { useCallback, useState } from 'react'
import PageHero from '../components/PageHero'
import VideoModal from '../components/VideoModal'
import { videos } from '../data/videos'
import { usePageMeta } from '../hooks/usePageMeta'

export default function Videos() {
  usePageMeta('Films | Majestic Designer, Surat', 'The Majestic Films — a cinematic glimpse into the Majestic Designer experience.')
  const [active, setActive] = useState(null)
  const close = useCallback(() => setActive(null), [])

  return (
    <>
      <PageHero title="THE MAJESTIC FILMS" />

      <section className="films section wrap" aria-label="Films">
        <div className="films__grid">
          {videos.map((v) => (
            <article key={v.id} className="film">
              <button type="button" className="film__btn" onClick={() => setActive(v)} aria-label={`Play ${v.title} full screen`}>
                <span className="film__media" data-reveal="image">
                  <img src={v.poster} alt={`${v.title} — Majestic Designer film`} loading="lazy" decoding="async" />
                  <span className="film__play" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="26" height="26"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
                  </span>
                </span>
              </button>
              <div className="film__meta" data-reveal="text">
                <h2 className="h-display h-md">{v.title}</h2>
                <p className="lead">“{v.description}”</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {active && <VideoModal video={active} onClose={close} />}
    </>
  )
}
