import { useCallback, useSyncExternalStore } from 'react'

export type Theme = 'light' | 'dark'

const listeners = new Set<() => void>()

function subscribe(onChange: () => void): () => void {
  listeners.add(onChange)
  return () => listeners.delete(onChange)
}

const read = (): Theme => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')

/**
 * Day or night. The initial value is set before first paint by an inline script in index.html,
 * so this only reads and changes it. Storage can be blocked or throw; the toggle must still work.
 */
export function useTheme(): { theme: Theme; toggle: () => void } {
  const theme = useSyncExternalStore(subscribe, read, () => 'light' as Theme)

  const toggle = useCallback(() => {
    const next: Theme = read() === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem('theme', next)
    } catch {
      // Storage unavailable (private window, blocked site data). The choice just won't persist.
    }
    listeners.forEach((listener) => listener())
  }, [])

  return { theme, toggle }
}
