// One content source for every preview, so the three designs differ only in design.
// Facts come from the site's own typed data; the short copy below is new and awaits the owner's approval.
import { site } from '../src/config/site.ts'
import { caseStudies } from '../src/content/projects/index.ts'
import { record } from '../src/content/record.ts'
import { stackGroups } from '../src/content/stack.ts'

export const esc = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const svg = (body, size = 20) =>
  `<svg viewBox="0 0 48 48" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`

export const icons = {
  arrow: (size) => svg('<path d="M6 24h34M27 11l13 13-13 13"/>', size),
  external: (size) => svg('<path d="M19 10H9v29h29V29M28 8h12v12M40 8L22 26"/>', size),
  mail: (size) => svg('<rect x="6" y="11" width="36" height="26" rx="3"/><path d="M7 14l17 13 17-13"/>', size),
  branch: (size) =>
    svg('<circle cx="14" cy="10" r="4.5"/><circle cx="14" cy="38" r="4.5"/><circle cx="35" cy="18" r="4.5"/><path d="M14 14.5v19M35 22.5c0 8-12 6-20 11"/>', size),
}

/** Short, plain wording for the home page. Detail lives on each project's own page. */
const projectCopy = {
  'computer-agent': {
    line: 'An agent where the model only proposes, and a safety broker decides what runs.',
    tags: ['Python', 'Safety gates', 'Benchmarks'],
    status: { tone: 'yellow', text: 'Pre-MVP' },
    repo: 'Private repository',
  },
  sidequest: {
    line: 'An activity-planning product where AI drafts and a person approves.',
    tags: ['Next.js', 'FastAPI', 'Local LLMs'],
    status: { tone: 'green', text: 'Web and API working' },
    repo: 'Private repository',
  },
  robin: {
    line: 'A learned query optimizer rebuilt from scratch, with the negative results left in.',
    tags: ['PyTorch', 'DuckDB', 'Reinforcement learning'],
    status: { tone: 'yellow', text: 'Small synthetic study' },
    repo: 'Not published yet',
  },
}

export const data = {
  site,
  headline: 'Intelligent systems, built to be checked.',
  background:
    'I trained as a civil engineer at National Taiwan University, where the first question is always what has to hold, and how you will know. I am now a student moving that habit into AI: agents with safety gates, honest evaluation, and products that get finished.',
  education: 'B.S. Civil Engineering, National Taiwan University',
  status: 'Currently a student',
  studiedIn: ['Malaysia', 'Taiwan', 'South Korea'],
  interests: ['Agentic AI', 'LLMs', 'Computer vision', 'Multimodal AI', 'Deep learning', 'AI-powered applications'],
  projects: caseStudies.map((study) => ({
    slug: study.slug,
    title: study.title,
    href: `/work/${study.slug}/`,
    period: study.period,
    ...projectCopy[study.slug],
  })),
  stack: stackGroups,
  // The home page shows the latest rows and the education row; the full record gets its own page.
  record: [...record.slice(0, 5), record[record.length - 1]],
  recordCount: record.length,
  links: {
    about: '/#about',
    stack: '/#stack',
    record: '/#record',
  },
}

export const evidenceText = { used: 'Used in a project', building: 'Building with it now', earlier: 'Earlier work' }
