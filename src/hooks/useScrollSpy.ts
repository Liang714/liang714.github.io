import { useEffect, useState } from 'react'

/** Which of these section ids is currently crossing the middle of the viewport. */
export function useScrollSpy(ids: readonly string[], enabled: boolean): string | undefined {
  const [active, setActive] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (!enabled || typeof IntersectionObserver === 'undefined') return
    const visible = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }
        setActive(ids.find((id) => visible.has(id)))
      },
      { rootMargin: '-30% 0px -60% 0px' },
    )
    for (const id of ids) {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    }
    return () => observer.disconnect()
  }, [ids, enabled])

  return enabled ? active : undefined
}
