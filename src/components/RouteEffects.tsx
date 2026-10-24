import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollToTarget } from '../lib/scroll.ts'

/**
 * Client-side navigation does not move scroll or focus on its own. After a route or hash change,
 * scroll to the target and move focus there, so keyboard and screen-reader users land in the right place.
 * The first load jumps; later moves glide.
 */
export function RouteEffects() {
  const { pathname, hash, key } = useLocation()
  const first = useRef(true)

  useEffect(() => {
    const isFirst = first.current
    first.current = false

    const frame = window.requestAnimationFrame(() => {
      if (hash) {
        const target = document.getElementById(decodeURIComponent(hash.slice(1)))
        if (target) {
          scrollToTarget(target, { immediate: isFirst })
          target.focus({ preventScroll: true })
          return
        }
      }
      if (isFirst) return
      scrollToTarget(0, { immediate: true })
      document.getElementById('main')?.focus({ preventScroll: true })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [pathname, hash, key])

  return null
}
