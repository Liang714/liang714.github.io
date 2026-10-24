import type Lenis from 'lenis'

/**
 * One place that knows how the page scrolls. Smooth scrolling (Lenis) is optional: under reduced
 * motion, or before it has started, every call falls back to the browser's own scrolling.
 */
let lenis: Lenis | null = null

export function setSmoothScroller(instance: Lenis | null): void {
  lenis = instance
}

const easeOutExpo = (t: number): number => Math.min(1, 1.001 - Math.pow(2, -10 * t))

interface ScrollOptions {
  /** Jump with no travel (route changes, first load). */
  immediate?: boolean
}

/** Scroll to an element or a position. Sticky-header clearance comes from `scroll-padding-top` in CSS. */
export function scrollToTarget(target: Element | number, { immediate = false }: ScrollOptions = {}): void {
  if (lenis) {
    // A new page may be taller than the last; Lenis would otherwise clamp to the old height.
    lenis.resize()
    lenis.scrollTo(target, { immediate, duration: 1.2, easing: easeOutExpo })
    return
  }
  if (typeof target === 'number') window.scrollTo({ top: target, behavior: 'auto' })
  else target.scrollIntoView({ behavior: 'auto', block: 'start' })
}

/* ───── a single animation-frame scroll feed, shared by everything that reacts to scroll position ───── */

const listeners = new Set<() => void>()
let frame = 0

function flush(): void {
  frame = 0
  listeners.forEach((listener) => listener())
}

function schedule(): void {
  if (frame === 0) frame = window.requestAnimationFrame(flush)
}

/** Call `listener` once per frame while the page scrolls or resizes, and once now. Returns the unsubscribe. */
export function onScrollFrame(listener: () => void): () => void {
  if (listeners.size === 0) {
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
  }
  listeners.add(listener)
  listener()
  return () => {
    listeners.delete(listener)
    if (listeners.size === 0) {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      window.cancelAnimationFrame(frame)
      frame = 0
    }
  }
}
