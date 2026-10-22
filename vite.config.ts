import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import { renderSeoBlock, routeTable } from './scripts/seo.mjs'

/** `/` for a user site, `/repo-name/` for a project site. Set BASE_PATH in CI. */
function normalizeBase(value: string | undefined): string {
  if (!value || value === '/') return '/'
  const trimmed = value.replace(/^\/+|\/+$/g, '')
  return `/${trimmed}/`
}

/** In dev and preview, give index.html the same head the production build writes for "/". */
function seoForHome(): Plugin {
  return {
    name: 'seo-for-home',
    transformIndexHtml(html) {
      const home = routeTable()[0]
      if (!home) return html
      return html.replace(
        /<!--seo:start-->[\s\S]*?<!--seo:end-->/,
        `<!--seo:start-->\n${renderSeoBlock(home)}\n    <!--seo:end-->`,
      )
    },
  }
}

export default defineConfig({
  base: normalizeBase(process.env.BASE_PATH),
  plugins: [react(), seoForHome()],
  build: { target: 'es2022', sourcemap: false },
})
