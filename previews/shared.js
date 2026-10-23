// Behaviour shared by every preview: inertia scrolling, eased anchor jumps, the current-section marker,
// and reveal-on-scroll. Everything honours prefers-reduced-motion.
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

const ease = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches

export function initPage({ offset = 0, onScroll } = {}) {
  const lenis = reduced ? null : new Lenis({ autoRaf: true, lerp: 0.09, smoothWheel: true })

  // Eased jumps for in-page links; focus moves to the target so keyboard users land there.
  document.addEventListener('click', (event) => {
    const link = event.target.closest?.('a[href^="#"]')
    if (!link) return
    const hash = link.getAttribute('href')
    const target = hash && hash.length > 1 ? document.querySelector(hash) : null
    if (!target) return
    event.preventDefault()
    const land = () => {
      history.replaceState(null, '', hash)
      target.setAttribute('tabindex', '-1')
      target.focus({ preventScroll: true })
    }
    if (lenis) lenis.scrollTo(target, { offset, duration: 1.2, easing: ease, onComplete: land })
    else {
      target.scrollIntoView()
      land()
    }
  })

  // The section being read, for the nav.
  const links = [...document.querySelectorAll('a[data-nav]')]
  const sections = links.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean)
  if ('IntersectionObserver' in window) {
    const visible = new Set()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) (entry.isIntersecting ? visible.add(entry.target.id) : visible.delete(entry.target.id))
        const current = sections.find((section) => visible.has(section.id))
        for (const link of links) {
          if (current && link.getAttribute('href') === `#${current.id}`) link.setAttribute('aria-current', 'true')
          else link.removeAttribute('aria-current')
        }
      },
      { rootMargin: '-35% 0px -55% 0px' },
    )
    sections.forEach((section) => observer.observe(section))
  }

  // Reveal by position, not by intersection: a jump past a section must not leave it hidden.
  let pending = [...document.querySelectorAll('[data-reveal]')]
  const reveal = () => {
    pending = pending.filter((node) => {
      if (reduced || node.getBoundingClientRect().top < innerHeight * 0.92) {
        node.classList.add('in')
        return false
      }
      return true
    })
  }
  let frame = 0
  const schedule = () => {
    if (frame) return
    frame = requestAnimationFrame(() => {
      frame = 0
      reveal()
    })
  }
  addEventListener('resize', schedule)
  addEventListener('scroll', schedule, { passive: true })
  reveal()

  const emit = () => {
    const limit = document.documentElement.scrollHeight - innerHeight
    const progress = limit > 0 ? Math.min(1, Math.max(0, scrollY / limit)) : 0
    document.documentElement.style.setProperty('--progress', progress.toFixed(4))
    onScroll?.({ scroll: scrollY, limit, progress })
  }
  if (lenis) lenis.on('scroll', emit)
  addEventListener('scroll', emit, { passive: true })
  addEventListener('resize', emit)
  emit()

  return { lenis, reduced }
}
