/**
 * The short copy the one-page home shows. The long form stays on each case study and on the About,
 * Stack and Record pages; this file only holds what the home page says in a line.
 * Facts come from the typed content next to it; the wording is the owner's to approve (see site.confirmed).
 */

export interface HomeProject {
  readonly slug: string
  /** A short display form of the title, set large. The full title stays in the link's accessible name. */
  readonly name: string
  readonly kind: string
  readonly line: string
  readonly tags: readonly string[]
  readonly status: string
  readonly repo: string
}

export const homeProjects: readonly HomeProject[] = [
  {
    slug: 'computer-agent',
    name: 'Agent core',
    kind: 'Agent safety',
    line: 'An agent where the model only proposes, and a safety broker decides what runs.',
    tags: ['Python', 'Safety gates', 'Benchmarks'],
    status: 'Pre-MVP',
    repo: 'Private repository',
  },
  {
    slug: 'sidequest',
    name: 'Sidequest',
    kind: 'Product build',
    line: 'An activity-planning product where AI drafts and a person approves.',
    tags: ['Next.js', 'FastAPI', 'Local LLMs'],
    status: 'Web and API working',
    repo: 'Private repository',
  },
  {
    slug: 'robin',
    name: 'Robin',
    kind: 'Research reproduction',
    line: 'A learned query optimizer rebuilt from scratch, with the negative results left in.',
    tags: ['PyTorch', 'DuckDB', 'Reinforcement learning'],
    status: 'Small synthetic study',
    repo: 'Not published yet',
  },
]

export const heroLine = 'AI engineer, currently a student.'

/** What I do, in words anyone can follow. Every action passes the gate because the model only proposes. */
export const heroWhat = 'I build AI agents whose every action passes a safety gate, and I test them honestly.'

export const background =
  'I trained as a civil engineer at National Taiwan University, where the first question is always what has to hold, and how you will know. I am now a student moving that habit into AI: agents with safety gates, honest evaluation, and products that get finished.'

export const backgroundLead = 'I trained as a civil engineer'

export const facts = {
  education: 'B.S. Civil Engineering, National Taiwan University',
  studiedIn: ['Malaysia', 'Taiwan', 'South Korea'],
  now: 'Currently a student',
} as const

/**
 * Each interest sits beside the current, widely used technologies in that area. These are interests I follow,
 * not claims of use: the Stack page says what my projects actually use.
 */
export const interests: readonly { readonly name: string; readonly note: string }[] = [
  { name: 'Agentic AI', note: 'MCP, A2A, LangGraph' },
  { name: 'LLMs', note: 'Claude, GPT, Gemini, Qwen3' },
  { name: 'Computer vision', note: 'SAM 3, DINOv3, YOLO26' },
  { name: 'Multimodal AI', note: 'Qwen3-VL, Gemini, Whisper' },
  { name: 'Deep learning', note: 'PyTorch, JAX, vLLM' },
  { name: 'AI-powered applications', note: 'Next.js, Vercel AI SDK, pgvector' },
]

/** The numbers Robin's exhibit draws. A test checks they still match the case study's own result text. */
export const ROBIN_RESULT = {
  baseline: { mean: 10.7, spread: 2.5 },
  best: { mean: 8.3, spread: 0.5 },
  queries: 18,
} as const
