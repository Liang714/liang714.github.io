// After `vite build`: write one real HTML file per route (so a direct visit or a crawler gets the
// right title, canonical URL and social tags without running JavaScript), plus 404.html,
// sitemap.xml, robots.txt and .nojekyll. Works under a GitHub Pages project subpath because every
// asset URL in the built shell already carries the Vite base.
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { notFoundRoute, renderSeoBlock, routeTable, siteUrl } from './seo.mjs'

const dist = fileURLToPath(new URL('../dist/', import.meta.url))
const shell = await readFile(path.join(dist, 'index.html'), 'utf8')
const SEO = /<!--seo:start-->[\s\S]*?<!--seo:end-->/

if (!SEO.test(shell)) throw new Error('dist/index.html has no <!--seo:start--> block to fill')

// Preload the fonts used above the fold so the headline does not reflow when they arrive.
// The asset URL prefix (the Vite base) is read from the built shell, so subpaths work.
const assets = await readdir(path.join(dist, 'assets'))
const prefix = shell.match(/(?:src|href)="([^"]*?)assets\/index-[^"]+\.js"/)?.[1] ?? '/'
const preloads = ['barlow-condensed-latin-700-normal', 'barlow-condensed-latin-800-normal', 'overpass-latin-wght-normal']
  .map((stem) => assets.find((file) => file.startsWith(stem) && file.endsWith('.woff2')))
  .filter(Boolean)
  .map((file) => `    <link rel="preload" href="${prefix}assets/${file}" as="font" type="font/woff2" crossorigin />`)
  .join('\n')

// Case-study pages load their own chunk; fetch it in parallel with the main bundle on those routes.
const caseChunk = assets.find((file) => file.startsWith('CaseStudyPage-') && file.endsWith('.js'))
const chunkHint = caseChunk ? `\n    <link rel="modulepreload" href="${prefix}assets/${caseChunk}" />` : ''

const withSeo = (route) =>
  shell.replace(
    SEO,
    () =>
      `<!--seo:start-->\n${renderSeoBlock(route)}\n    <!--seo:end-->\n${preloads}${route.kind === 'case' ? chunkHint : ''}`,
  )

const routes = routeTable()
for (const route of routes) {
  const file = path.join(dist, route.path, 'index.html')
  await mkdir(path.dirname(file), { recursive: true })
  await writeFile(file, withSeo(route))
}
await writeFile(path.join(dist, '404.html'), withSeo(notFoundRoute))

const base = siteUrl()
const today = new Date().toISOString().slice(0, 10)
const urls = routes
  .map((route) => `  <url>\n    <loc>${new URL(route.path, base).href}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
  .join('\n')
await writeFile(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
)
await writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap.xml', base).href}\n`)
await writeFile(path.join(dist, '.nojekyll'), '')

console.log(`postbuild: wrote ${routes.length} routes, 404.html, sitemap.xml, robots.txt for ${base}`)
