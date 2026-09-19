import { useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { prefersReducedMotion, useMotion } from '../hooks/useMotion'

// Wraps every route: ink curtain wipe + fade, then wires up scroll reveals.
export default function PageTransition({ children }) {
  const pageRef = useRef(null)
  const curtainRef = useRef(null)
  const firstRender = useRef(true)
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
    if (firstRender.current) {
      firstRender.current = false
      return undefined
    }
    if (prefersReducedMotion()) return undefined

    const ctx = gsap.context(() => {
      gsap.fromTo(pageRef.current, { opacity: 0 }, { opacity: 1, duration: 0.9, ease: 'power2.out', clearProps: 'opacity' })
      gsap.fromTo(
        curtainRef.current,
        { yPercent: 0, autoAlpha: 1 },
        { yPercent: -100, duration: 0.95, ease: 'power4.inOut', onComplete: () => gsap.set(curtainRef.current, { autoAlpha: 0 }) },
      )
    })
    return () => ctx.revert()
  }, [pathname])

  useMotion(pageRef, [pathname])

  return (
    <>
      <div ref={curtainRef} className="curtain" aria-hidden="true" />
      <main id="main" ref={pageRef} className="page">
        {children}
      </main>
    </>
  )
}
