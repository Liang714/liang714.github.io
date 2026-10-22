import { useEffect, useRef, useState } from 'react'
import type { ElementType, ReactNode } from 'react'

interface RevealProps {
  as?: ElementType
  className?: string
  children: ReactNode
  /** Extra delay in ms, used to stagger siblings. */
  delay?: number
}

/**
 * Signs hang into place the first time they come within reach of the viewport. Content is visible
 * by default: the hidden state exists only when JavaScript has marked the document, and never under
 * reduced motion or in print.
 *
 * This watches scroll position rather than using an IntersectionObserver on purpose. An anchor jump
 * (the nav, a hash link) skips straight over sections, and an observer only reports sections that
 * cross the viewport, so skipped ones would stay invisible. A position check reveals anything at or
 * above the fold, however the visitor got there.
 */
export function Reveal({ as: Tag = 'div', className, children, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    let frame = 0
    const cleanup = () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
    const check = () => {
      frame = 0
      if (node.getBoundingClientRect().top < window.innerHeight * 0.92) {
        setVisible(true)
        cleanup()
      }
    }
    function schedule() {
      if (frame === 0) frame = window.requestAnimationFrame(check)
    }

    check()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return cleanup
  }, [])

  return (
    <Tag
      ref={ref}
      className={['reveal', visible && 'is-visible', className].filter(Boolean).join(' ')}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
