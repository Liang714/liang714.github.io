import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { onScrollFrame } from '../lib/scroll.ts'

/**
 * Text that brightens as it crosses the middle of the screen and dims as it leaves, so a long list
 * reads one line at a time. The dim state stays above the contrast floor for large type.
 */
export function LitText({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null)

  useEffect(
    () =>
      onScrollFrame(() => {
        const node = ref.current
        if (!node) return
        const box = node.getBoundingClientRect()
        const distance = Math.abs(box.top + box.height / 2 - window.innerHeight * 0.5) / (window.innerHeight * 0.3)
        node.style.setProperty('--lit', Math.min(1, Math.max(0, 1 - distance)).toFixed(3))
      }),
    [],
  )

  return (
    <span ref={ref} className={['lit-text', className].filter(Boolean).join(' ')}>
      {children}
    </span>
  )
}
