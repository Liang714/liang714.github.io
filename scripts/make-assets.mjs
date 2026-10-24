// Generates the social-share image (public/og-image.png) and the touch icon
// (public/apple-touch-icon.png). Run with `npm run assets` after changing the site name or identity.
// Text is converted to vector paths with the site's own font, then rasterised, so the output is
// deterministic and needs no browser.
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import opentype from 'opentype.js'
import sharp from 'sharp'
import { site } from '../src/config/site.ts'

const root = fileURLToPath(new URL('../', import.meta.url))
const fontFile = (weight) => `${root}node_modules/@fontsource/chivo/files/chivo-latin-${weight}-normal.woff`

const toBuffer = async (file) => {
  const data = await readFile(file)
  return data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength)
}
const black = opentype.parse(await toBuffer(fontFile(900)))
const bold = opentype.parse(await toBuffer(fontFile(700)))

const BG = '#17181a'
const INK = '#eff0f1'
const ACCENT = '#ff4a1f'
const MUTED = '#a8abb0'

// Lay glyphs out one by one with the font's own advances and kerning. opentype.js's text shaper stops
// on some of Chivo's substitution tables, and plain Latin needs none of them.
function layout(font, value, x, y, size, spacing = 0) {
  const scale = size / font.unitsPerEm
  let cursor = x
  let previous = null
  const commands = []
  for (const char of value) {
    const glyph = font.charToGlyph(char)
    if (previous) cursor += font.getKerningValue(previous, glyph) * scale
    commands.push(...glyph.getPath(cursor, y, size).commands)
    cursor += glyph.advanceWidth * scale + spacing
    previous = glyph
  }
  return { commands, width: cursor - x - spacing }
}

// Serialise glyph outlines ourselves: plain absolute commands, fixed precision, no optimiser.
const n = (value) => (Math.round(value * 100) / 100).toString()
const pathData = (commands) =>
  commands
    .map((c) => {
      switch (c.type) {
        case 'M':
        case 'L':
          return `${c.type}${n(c.x)} ${n(c.y)}`
        case 'C':
          return `C${n(c.x1)} ${n(c.y1)} ${n(c.x2)} ${n(c.y2)} ${n(c.x)} ${n(c.y)}`
        case 'Q':
          return `Q${n(c.x1)} ${n(c.y1)} ${n(c.x)} ${n(c.y)}`
        default:
          return 'Z'
      }
    })
    .join('')

const text = (font, value, x, y, size, fill, spacing = 0) =>
  `<path d="${pathData(layout(font, value, x, y, size, spacing).commands)}" fill="${fill}"/>`

const widthOf = (font, value, size, spacing = 0) => layout(font, value, 0, 0, size, spacing).width

// The name, as wide as the card allows: the same idea as the first screen.
const word = site.shortName.toUpperCase()
const margin = 60
const wordSize = Math.floor((1200 - 2 * margin) / (widthOf(black, word, 100, -3) / 100))
const wordX = margin

const sentence = `${site.name}. AI engineer, currently a student.`

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${BG}"/>
  <rect x="${margin}" y="${margin}" width="150" height="16" fill="${ACCENT}"/>
  ${text(bold, sentence, margin, 150, 34, INK, -0.3)}
  ${text(bold, 'Agents with safety gates. Honest evaluation.', margin, 196, 26, MUTED, -0.2)}
  ${text(black, word, wordX, 600, wordSize, INK, -wordSize * 0.03)}
</svg>`

await sharp(Buffer.from(ogSvg)).png({ compressionLevel: 9 }).toFile(`${root}public/og-image.png`)

const favicon = await readFile(`${root}public/favicon.svg`)
await sharp(favicon, { density: 600 }).resize(180, 180).png({ compressionLevel: 9 }).toFile(`${root}public/apple-touch-icon.png`)

await writeFile(`${root}scripts/.og-preview.svg`, ogSvg)
console.log('assets: wrote public/og-image.png (1200x630) and public/apple-touch-icon.png (180x180)')
