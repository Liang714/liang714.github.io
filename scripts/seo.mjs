// Route metadata shared by the dev server and the production build.
// Imports the site's own content (TypeScript, erasable syntax only) so titles and descriptions
// can never drift from what the pages say. Runs natively on Node 22.18+ and inside Vite's config loader.
import { site } from '../src/config/site.ts'
import { caseStudies } from '../src/content/projects/index.ts'

export function siteUrl() {
  const raw = process.env.SITE_URL || site.url
  return raw.endsWith('/') ? raw : `${raw}/`
}

/** Fit a description into a search snippet: whole sentences, at most `max` characters. */
function clip(text, max = 158) {
  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g) ?? [text]
  let out = ''
  for (const sentence of sentences) {
    if ((out + sentence).trim().length > max) break
    out += sentence
  }
  return (out || text.slice(0, max - 1) + '…').trim()
}

export function routeTable() {
  return [
    { path: '', title: site.title, description: site.description, kind: 'home' },
    ...caseStudies.map((study) => ({
      path: `work/${study.slug}/`,
      title: `${study.title} case study | ${site.name}`,
      description: clip(study.summary),
      kind: 'case',
    })),
  ]
}

export const notFoundRoute = {
  path: '404.html',
  title: `Page not found | ${site.name}`,
  description: 'This page does not exist.',
  kind: '404',
}

const escapeAttr = (value) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const escapeText = (value) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;')

export function renderSeoBlock(route) {
  const base = siteUrl()
  const url = new URL(route.path, base).href
  const image = new URL('og-image.png', base).href
  const indexable = route.kind !== '404'
  const title = escapeAttr(route.title)
  const description = escapeAttr(route.description)
  const lines = [
    `<title>${escapeText(route.title)}</title>`,
    `<meta name="description" content="${description}" />`,
    indexable ? `<link rel="canonical" href="${url}" />` : '<meta name="robots" content="noindex" />',
    `<meta property="og:site_name" content="${escapeAttr(site.name)}" />`,
    `<meta property="og:type" content="${route.kind === 'case' ? 'article' : 'website'}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    `<meta property="og:image:alt" content="${escapeAttr(`${site.name}, ${site.role}`)}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${image}" />`,
  ]
  if (route.kind === 'home') {
    const person = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: site.name,
      jobTitle: site.role,
      url: base,
      sameAs: [site.github, site.linkedin].filter(Boolean),
    }
    lines.push(`<script type="application/ld+json">${JSON.stringify(person).replace(/</g, '\\u003c')}</script>`)
  }
  return lines.map((line) => `    ${line}`).join('\n')
}
