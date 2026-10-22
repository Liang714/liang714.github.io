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
const fontFile = (weight) =>
  `${root}node_modules/@fontsource/barlow-condensed/files/barlow-condensed-latin-${weight}-normal.woff`

const toBuffer = async (file) => {
  const data = await readFile(file)
  return data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength)
}
const heavy = opentype.parse(await toBuffer(fontFile(800)))
const bold = opentype.parse(await toBuffer(fontFile(700)))

const INK = '#0c0f10'
const SHEET = '#f3f6f4'
const FACE = '#fbfcfb'

// opentype.js takes letter-spacing as a fraction of the font size, so convert from pixels.
const em = (spacing, size) => spacing / size

// Serialise glyph outlines ourselves: plain absolute commands, fixed precision, no optimiser.
const n = (value) => (Math.round(value * 100) / 100).toString()
const pathData = (path) =>
  path.commands
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

const text = (font, value, x, y, size, fill, spacing = 0) => {
  const path = font.getPath(value, x, y, size, { letterSpacing: em(spacing, size) })
  return `<path d="${pathData(path)}" fill="${fill}"/>`
}

const widthOf = (font, value, size, spacing = 0) =>
  font.getAdvanceWidth(value, size, { letterSpacing: em(spacing, size) })

// The four verdict shapes, drawn centred on (cx, cy) at roughly 56 units.
const shapes = {
  permitted: (cx, cy) =>
    `<rect x="${cx - 26}" y="${cy - 26}" width="52" height="52" rx="10" fill="#0e7a55"/>` +
    `<path d="M${cx - 15} ${cy + 1}l10 10 20-23" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>`,
  caution: (cx, cy) =>
    `<path d="M${cx} ${cy - 28}L${cx + 29} ${cy + 24}H${cx - 29}z" fill="#ffc20e" stroke="${INK}" stroke-width="4.5" stroke-linejoin="round"/>` +
    `<path d="M${cx} ${cy - 8}v15" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><circle cx="${cx}" cy="${cy + 15}" r="3.2" fill="${INK}"/>`,
  approval: (cx, cy) =>
    `<circle cx="${cx}" cy="${cy}" r="27" fill="#0a59b5"/><circle cx="${cx}" cy="${cy - 8}" r="7" fill="#fff"/>` +
    `<path d="M${cx - 15} ${cy + 17}c0-9 6-14 15-14s15 5 15 14z" fill="#fff"/>`,
  idle: (cx, cy) =>
    `<circle cx="${cx}" cy="${cy}" r="22" fill="none" stroke="#55616a" stroke-width="3" stroke-dasharray="2 7" stroke-linecap="round" opacity="0.6"/>`,
}

const gates = [
  ['RESOLVE', 'permitted'],
  ['PERMISSION', 'permitted'],
  ['RISK', 'caution'],
  ['APPROVAL', 'approval'],
  ['BUDGET', 'idle'],
  ['EXECUTE', 'idle'],
]

const gateSigns = gates
  .map(([label, state], index) => {
    const x = 60 + index * 184
    return [
      `<rect x="${x + 69}" y="408" width="8" height="30" fill="${INK}"/>`,
      `<rect x="${x}" y="436" width="160" height="150" rx="16" fill="${FACE}" stroke="#d3dad7" stroke-width="1.5"/>`,
      `<rect x="${x + 8}" y="444" width="144" height="134" rx="10" fill="none" stroke="${INK}" stroke-width="2.5"/>`,
      `<rect x="${x + 20}" y="458" width="26" height="26" rx="6" fill="${INK}"/>`,
      text(heavy, String(index + 1), x + 27.5, 479, 22, SHEET),
      text(bold, label, x + 56, 478, 18, INK, 0.6),
      shapes[state](x + 80, 540),
    ].join('')
  })
  .join('')

const plateLabel = `${site.name.toUpperCase()} / ${site.role.toUpperCase()}`
const plateWidth = widthOf(bold, plateLabel, 24, 1.6) + 36

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${SHEET}"/>
  <rect x="60" y="40" width="1080" height="14" rx="3" fill="${INK}"/>
  <rect x="170" y="54" width="9" height="30" fill="${INK}"/><rect x="1021" y="54" width="9" height="30" fill="${INK}"/>
  <rect x="60" y="84" width="1080" height="296" rx="24" fill="${FACE}" stroke="#d3dad7" stroke-width="1.5"/>
  <rect x="73" y="97" width="1054" height="270" rx="16" fill="none" stroke="${INK}" stroke-width="3.5"/>
  ${text(heavy, 'Intelligent systems,', 112, 217, 104, INK, -1)}
  ${text(heavy, 'built to be checked.', 112, 313, 104, INK, -1)}
  <rect x="${1100 - plateWidth}" y="354" width="${plateWidth}" height="40" rx="7" fill="${INK}"/>
  ${text(bold, plateLabel, 1100 - plateWidth + 18, 382, 24, SHEET, 1.6)}
  <rect x="60" y="400" width="1080" height="14" rx="3" fill="${INK}"/>
  ${gateSigns}
</svg>`

await sharp(Buffer.from(ogSvg)).png({ compressionLevel: 9 }).toFile(`${root}public/og-image.png`)

const favicon = await readFile(`${root}public/favicon.svg`)
await sharp(favicon, { density: 600 }).resize(180, 180).png({ compressionLevel: 9 }).toFile(`${root}public/apple-touch-icon.png`)

await writeFile(`${root}scripts/.og-preview.svg`, ogSvg)
console.log('assets: wrote public/og-image.png (1200x630) and public/apple-touch-icon.png (180x180)')
