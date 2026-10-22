/**
 * Everything personal lives here. Edit this file, run `npm run content:check`, rebuild.
 *
 * Empty strings are placeholders: the site hides links that have no value, and the check script
 * lists what is still missing. Nothing here is invented; unconfirmed items are flagged below.
 */

export interface NavItem {
  readonly id: string
  readonly label: string
}

export interface SiteConfig {
  /** Full display name, used in titles, the footer, the share image and structured data. */
  readonly name: string
  /** Short form for the narrow phone header only, where the full name would not fit. */
  readonly shortName: string
  readonly role: string
  /** The role as it reads mid-sentence, with the right capitalisation: "an AI engineer". */
  readonly roleSentence: string
  readonly identity: string
  readonly title: string
  readonly description: string
  /** Canonical origin. CI overrides this with the real Pages URL through SITE_URL. */
  readonly url: string
  readonly email: string
  readonly github: string
  readonly linkedin: string
  /** File name inside /public, e.g. "resume.pdf". Leave empty until the file exists. */
  readonly resume: string
  /** Optional portrait inside /public, e.g. "portrait.jpg". Leave empty to show none. */
  readonly portrait: string
  /** Short alt text for the portrait. */
  readonly portraitAlt: string
  readonly aiAssistance: string
  readonly nav: readonly NavItem[]
  /** Flip each to true once you have read and approved the wording. `content:check` lists the rest. */
  readonly confirmed: {
    readonly fullName: boolean
    readonly aboutCopy: boolean
    readonly aiAssistanceWording: boolean
    readonly educationDates: boolean
    readonly projectDescriptions: boolean
  }
}

export const site: SiteConfig = {
  name: 'Erh Fwu Liang',
  shortName: 'Liang',
  role: 'AI Engineer',
  roleSentence: 'an AI engineer',
  identity: 'Software Engineer | Applied AI | Intelligent Systems',
  title: 'Erh Fwu Liang — AI Engineer',
  description:
    'Erh Fwu Liang is an AI engineer building gated, auditable agent systems and applied-AI products. Case studies, an interactive safety-gate simulator, and the evidence and limits behind each claim.',
  url: 'https://liang714.github.io/',
  email: 'erhfwuliang@live.com',
  github: 'https://github.com/Liang714',
  linkedin: 'https://www.linkedin.com/in/liang714',
  resume: '',
  portrait: '',
  portraitAlt: '',
  aiAssistance:
    'My projects are built with AI coding assistants. The repositories carry the design notes, specs and test history behind the work.',
  nav: [
    { id: 'work', label: 'Work' },
    { id: 'gate-demo', label: 'Gate demo' },
    { id: 'about', label: 'About' },
    { id: 'stack', label: 'Stack' },
    { id: 'record', label: 'Record' },
    { id: 'contact', label: 'Contact' },
  ],
  confirmed: {
    fullName: true,
    aboutCopy: false,
    aiAssistanceWording: false,
    educationDates: false,
    projectDescriptions: false,
  },
}
