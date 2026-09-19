import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { images } from '../data/images'
import { prefersReducedMotion } from '../hooks/useMotion'
import Button from './Button'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const root = useRef(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo('.hero__img', { scale: 1.25 }, { scale: 1.02, duration: 3, ease: 'power2.out' }, 0)
        .fromTo('.hero__shade', { opacity: 1 }, { opacity: 0, duration: 1.4, ease: 'power1.inOut' }, 0)
        .fromTo('.hero__line-inner', { yPercent: 115 }, { yPercent: 0, duration: 1.5, stagger: 0.16 }, 0.45)
        .fromTo('.hero__fade', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1.1, stagger: 0.14 }, 1.05)
        .fromTo('.hero__cta > *', { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 1, stagger: 0.16 }, 1.35)
        .fromTo('.hero__scroll', { opacity: 0 }, { opacity: 1, duration: 1.2 }, 1.9)

      gsap.to('.hero__media', {
        yPercent: 5,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" ref={root} aria-label="Majestic Designer">
      <div className="hero__media">
        <img
          className="hero__img"
          src={images.hero}
          alt="Majestic Designer — luxury designer wear from Surat, Gujarat"
          fetchpriority="high"
          decoding="async"
        />
      </div>
      <div className="hero__overlay" />
      <div className="hero__shade" aria-hidden="true" />

      <div className="hero__content wrap">
        <p className="hero__meta hero__fade">Luxury Designer Wear • Custom Creations • Surat</p>
        <h1 className="hero__title" aria-label="Majestic Designer">
          <span className="hero__line" aria-hidden="true"><span className="hero__line-inner">MAJESTIC</span></span>
          <span className="hero__line" aria-hidden="true"><span className="hero__line-inner">DESIGNER</span></span>
        </h1>
        <p className="hero__tagline lead hero__fade">Crafting Elegance. Defining Your Style.</p>
        <div className="hero__cta">
          <Button to="/collections" variant="solid">Explore Collection</Button>
          <Button to="/contact" variant="ghost">Book an Appointment</Button>
        </div>
      </div>

      <p className="hero__scroll" aria-hidden="true">SCROLL TO DISCOVER ↓</p>
    </section>
  )
}
