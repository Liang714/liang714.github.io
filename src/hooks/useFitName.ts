import { useEffect } from 'react'
import type { RefObject } from 'react'

/** The one place that writes the size, so the effect below only reads layout. */
function setSize(element: HTMLElement, value: string): void {
  element.style.fontSize = value
}

/**
 * Sets a heading's font size so the name inside it spans the page's width, measured on the real
 * glyphs (so it holds in any font that loads). `capToHeight` also stops it from swallowing a short screen.
 */
export function useFitName(
  box: RefObject<HTMLElement | null>,
  word: RefObject<HTMLElement | null>,
  capToHeight: boolean,
): void {
  useEffect(() => {
    const container = box.current
    const text = word.current
    if (!container || !text) return

    const fit = () => {
      const padding = parseFloat(getComputedStyle(container).paddingLeft) || 0
      const available = container.clientWidth - 2 * padding
      setSize(container, '100px')
      const at100 = text.getBoundingClientRect().width
      if (!at100) {
        setSize(container, '')
        return
      }
      const fitted = (100 * available) / at100
      setSize(container, `${(capToHeight ? Math.min(fitted, window.innerHeight * 0.44) : fitted).toFixed(1)}px`)
    }

    fit()
    void document.fonts.ready.then(fit)
    window.addEventListener('resize', fit)
    return () => {
      window.removeEventListener('resize', fit)
      setSize(container, '')
    }
  }, [box, word, capToHeight])
}
