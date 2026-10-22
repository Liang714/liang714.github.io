import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Client-side navigation does not move scroll or focus on its own. After a route or hash change,
 * scroll to the target and move focus there so keyboard and screen-reader users land in the right place.
 */
export function RouteEffects() {
  const { pathname, hash } = useLocation()
  const first = useRef(true)

  useEffect(() => {
    const isFirst = first.current
    first.current = false
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const behavior: ScrollBehavior = reduced ? 'auto' : 'smooth'

    const frame = window.requestAnimationFrame(() => {
      if (hash) {
        const target = document.getElementById(decodeURIComponent(hash.slice(1)))
        if (target) {
          target.scrollIntoView({ behavior: isFirst ? 'auto' : behavior, block: 'start' })
          target.focus({ preventScroll: true })
          return
        }
      }
      if (isFirst) return
      window.scrollTo({ top: 0, behavior: 'auto' })
      document.getElementById('main')?.focus({ preventScroll: true })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [pathname, hash])

  return null
}
