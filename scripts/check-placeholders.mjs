// Lists what the owner still has to fill in or confirm before the site is final.
// Usage: npm run content:check            (report only)
//        npm run content:check -- --strict (exit 1 if anything is outstanding, for CI gates)
import { site } from '../src/config/site.ts'

const empty = [
  ['email', 'Contact email. Shown in the hero, contact section and footer once set.'],
  ['linkedin', 'LinkedIn URL. Hidden until set.'],
  ['resume', 'Résumé file name inside /public (for example "resume.pdf"). Download hidden until set.'],
  ['portrait', 'Optional portrait inside /public. About shows none until set.'],
]

const unconfirmed = {
  fullName: 'Confirm the display name shown in the bar, the footer and the share image.',
  aboutCopy: 'The background statement on the home page and the About page was drafted for you. Read it and edit anything that is not true to you.',
  aiAssistanceWording: 'The line about AI coding assistants appears on the About page and every case study. Approve or reword it.',
  educationDates: 'The education row has no dates. Add them in src/content/record.ts.',
  projectDescriptions: 'Project descriptions were written from the repositories. Confirm your role and the claims.',
}

const lines = []
for (const [key, why] of empty) {
  if (!site[key]) lines.push(`  missing    site.${key}: ${why}`)
}
for (const [key, why] of Object.entries(unconfirmed)) {
  if (!site.confirmed[key]) lines.push(`  unconfirmed confirmed.${key}: ${why}`)
}

if (lines.length === 0) {
  console.log('content:check: nothing outstanding.')
} else {
  console.log(`content:check: ${lines.length} item(s) outstanding in src/config/site.ts\n${lines.join('\n')}`)
  if (process.argv.includes('--strict')) process.exit(1)
}
