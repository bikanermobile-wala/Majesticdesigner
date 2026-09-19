import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Scroll-driven reveals for a page. Mark elements with:
//   data-reveal="image"  -> curtain-style image reveal
//   data-reveal="text"   -> soft fade/rise
//   data-parallax="7"    -> subtle parallax (element must be taller than its parent)
export function useMotion(scopeRef, deps = []) {
  useLayoutEffect(() => {
    if (prefersReducedMotion() || !scopeRef.current) return undefined

    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-reveal="image"]').forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(0 0 100% 0)' },
          {
            clipPath: 'inset(0 0 0% 0)',
            duration: 1.4,
            ease: 'power3.inOut',
            clearProps: 'clipPath',
            scrollTrigger: { trigger: el, start: 'top 92%', once: true },
          },
        )
      })

      gsap.utils.toArray('[data-reveal="text"]').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 36,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        })
      })

      gsap.utils.toArray('[data-parallax]').forEach((el) => {
        const speed = parseFloat(el.dataset.parallax) || 7
        gsap.fromTo(
          el,
          { yPercent: -speed },
          {
            yPercent: speed,
            ease: 'none',
            scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      })
    }, scopeRef)

    const raf = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => {
      cancelAnimationFrame(raf)
      ctx.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
