import { describeTarget, evaluate } from './engine.ts'
import { SCENARIOS, buildProposal, configFor, findScenario } from './scenarios.ts'
import type { RiskLevel, StageResult } from './types.ts'

/** What the first-screen demo does with a request. The words come from the rule engine's own verdict. */
export type Verdict = 'allow' | 'ask' | 'deny'

export interface DemoRuling {
  readonly id: string
  /** The request in plain words, short enough to sit on a phone beside the gate. */
  readonly label: string
  readonly tool: string
  readonly target: string
  readonly verdict: Verdict
  readonly risk: RiskLevel | undefined
  /** What the line under the gate says when the request arrives. */
  readonly said: string
  readonly stages: readonly StageResult[]
}

/** The order the demo sends them in: one of each verdict first, then the harder ones. */
export const DEMO_ORDER = ['list', 'traversal', 'rename', 'unknown-tool', 'delete-bulk'] as const

const LABEL: Record<(typeof DEMO_ORDER)[number], string> = {
  list: 'List the inbox',
  traversal: 'Read a system file',
  rename: 'Rename an invoice',
  'unknown-tool': 'Run a shell command',
  'delete-bulk': 'Delete 12 drafts',
}

const SAID: Record<(typeof DEMO_ORDER)[number], string> = {
  list: 'Allowed. Low risk and inside the workspace, so it runs without interrupting anyone.',
  traversal: 'Denied. That path leaves the workspace, so nothing is read.',
  rename: 'Held. A move changes files, so a person decides first.',
  'unknown-tool': 'Denied. The agent can only name tools that exist, and there is no shell.',
  'delete-bulk': 'Held. Deleting 12 files counts as critical risk, so a person decides first.',
}

export const APPROVED_SAID = 'Approved by you. It runs.'
export const DECLINED_SAID = 'Declined by you. Nothing ran.'
export const SILENCE_SAID = 'No answer, so it is treated as declined. Nothing ran.'

const VERDICT = { executed: 'allow', 'awaiting-approval': 'ask', blocked: 'deny', declined: 'deny' } as const

function shortTarget(id: string, target: string): string {
  if (target.startsWith('(')) return ''
  if (id === 'delete-bulk') return 'drafts, 12 files'
  return target.length > 30 ? `${target.slice(0, 29)}…` : target
}

let cache: readonly DemoRuling[] | undefined

/** Runs each demo request through the real engine once. Pure and cheap, so it is safe to call from render. */
export function demoRulings(): readonly DemoRuling[] {
  cache ??= DEMO_ORDER.map((id) => {
    const scenario = findScenario(id)
    const proposal = buildProposal(scenario)
    const trace = evaluate({ config: configFor(scenario), proposal, goal: scenario.goal })
    return {
      id,
      label: LABEL[id],
      tool: proposal.tool,
      target: shortTarget(id, describeTarget(proposal.arguments)),
      verdict: VERDICT[trace.outcome.kind],
      risk: trace.risk,
      said: SAID[id],
      stages: trace.stages,
    }
  })
  return cache
}

export function demoRuling(id: (typeof DEMO_ORDER)[number]): DemoRuling {
  const found = demoRulings().find((ruling) => ruling.id === id)
  if (!found) throw new Error(`No demo ruling for ${id}`)
  return found
}

/** Used by tests to confirm every demo id is a real scenario. */
export const SCENARIO_IDS: readonly string[] = SCENARIOS.map((scenario) => scenario.id)
