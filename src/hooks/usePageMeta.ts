import { useEffect } from 'react'

/**
 * Keep the document title and description right during client-side navigation. The static HTML
 * written at build time already carries the correct values for a direct visit or a crawler.
 */
export function usePageMeta(title: string, description: string): void {
  useEffect(() => {
    document.title = title
    document
      .querySelector<HTMLMetaElement>('meta[name="description"]')
      ?.setAttribute('content', description)
  }, [title, description])
}
