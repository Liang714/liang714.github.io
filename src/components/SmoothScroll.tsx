import 'lenis/dist/lenis.css'
import { useEffect } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion.ts'
import { loadGsap } from '../lib/gsap.ts'
import { setSmoothScroller } from '../lib/scroll.ts'

/**
 * Inertia scrolling for the whole site. It is switched off for visitors who ask for less motion, and
 * the page works the same without it: only the easing of wheel and anchor movement changes.
 */
export function SmoothScroll() {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    let stop: (() => void) | undefined
    let cancelled = false

    // Both libraries load after the page has painted; until then the browser's own scrolling is used.
    void Promise.all([loadGsap(), import('lenis')]).then(([gsap, { default: Lenis }]) => {
      if (cancelled) return
      const lenis = new Lenis({ lerp: 0.09, smoothWheel: true, autoRaf: false })
      const tick = (time: number) => lenis.raf(time * 1000)
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)
      setSmoothScroller(lenis)
      stop = () => {
        setSmoothScroller(null)
        gsap.ticker.remove(tick)
        lenis.destroy()
      }
    })

    return () => {
      cancelled = true
      stop?.()
    }
  }, [reduced])

  return null
}
