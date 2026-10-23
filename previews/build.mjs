// Writes the preview pages. Run: node previews/build.mjs
import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { renderA } from './a.mjs'
import { data } from './content.mjs'

const dir = fileURLToPath(new URL('./', import.meta.url))
const pages = { 'a.html': renderA }

try {
  const { renderB } = await import('./b.mjs')
  pages['b.html'] = renderB
} catch {
  // preview B not written yet
}
try {
  const { renderC } = await import('./c.mjs')
  pages['c.html'] = renderC
} catch {
  // preview C not written yet
}

for (const [file, render] of Object.entries(pages)) {
  await writeFile(`${dir}${file}`, render(data))
  console.log('wrote previews/' + file)
}
