/**
 * Types for the safety-gate simulator.
 *
 * This module family re-implements the stage order and policy rules of a private Python project
 * (the capability broker in personal-computer-agent) in TypeScript. It does not run that code and
 * no model runs here. Names mirror the original so a reader can compare them.
 */

export const TRUST = {
  EXTERNAL_CONTENT: 0,
  TOOL_OUTPUT: 1,
  MODEL_GENERATED_PLAN: 2,
  SYSTEM_POLICY: 3,
  USER_INSTRUCTION: 4,
} as const

export type TrustName = keyof typeof TRUST
export type TrustLevel = (typeof TRUST)[TrustName]

export const RISK_ORDER = ['low', 'medium', 'high', 'critical'] as const
export type RiskLevel = (typeof RISK_ORDER)[number]

export type Permission = 'denied' | 'ask' | 'allowed'
export type Capability = 'filesystem_read' | 'filesystem_write' | 'filesystem_delete'

export type ErrorType =
  | 'SchemaRejected'
  | 'PolicyViolation'
  | 'ScopeViolation'
  | 'ApprovalRefused'
  | 'BudgetExhausted'
  | 'ToolExecutionError'

/** The only thing a planner may emit: a tool name and arguments. No callables, no risk. */
export interface ActionProposal {
  readonly intent: string
  readonly tool: string
  readonly arguments: Readonly<Record<string, unknown>>
}

export type EventKind =
  | 'task_started'
  | 'observed'
  | 'model_called'
  | 'planned'
  | 'policy_checked'
  | 'risk_classified'
  | 'approval_requested'
  | 'approval_decided'
  | 'action_executed'
  | 'verified'
  | 'error'
  | 'task_finished'

export interface LedgerRow {
  readonly seq: number
  readonly kind: EventKind
  readonly payload: Readonly<Record<string, unknown>>
  readonly trust: TrustLevel
}

export interface SimConfig {
  readonly permissions: Readonly<Record<Capability, Permission>>
  readonly maxActions: number
  readonly actionsUsed: number
}

export const DEFAULT_CONFIG: SimConfig = {
  permissions: { filesystem_read: 'allowed', filesystem_write: 'ask', filesystem_delete: 'ask' },
  maxActions: 25,
  actionsUsed: 0,
}

export type StageId = 'resolve' | 'permission' | 'risk' | 'approval' | 'budget' | 'execute'

export interface StageMeta {
  readonly id: StageId
  readonly gate: number
  readonly label: string
  /** The function or check the original code uses at this stage. */
  readonly source: string
}

export const STAGES: readonly StageMeta[] = [
  { id: 'resolve', gate: 1, label: 'Resolve', source: 'registry.resolve' },
  { id: 'permission', gate: 2, label: 'Permission', source: 'permissions.require_not_denied' },
  { id: 'risk', gate: 3, label: 'Risk', source: 'risk.classify' },
  { id: 'approval', gate: 4, label: 'Approval', source: 'risk.requires_approval' },
  { id: 'budget', gate: 5, label: 'Budget', source: 'budget.charge_action' },
  { id: 'execute', gate: 6, label: 'Execute', source: 'tool.run' },
]

/**
 * How a stage looks. Colour is locked to meaning: green permitted, blue a human decision is needed,
 * yellow caution, red blocked. Red is never used for anything else.
 */
export type SignKind = 'permitted' | 'approval' | 'caution' | 'blocked' | 'na' | 'idle'

export type StageStatus = 'pass' | 'wait' | 'block' | 'warn' | 'skipped' | 'idle'

export interface StageResult {
  readonly id: StageId
  readonly status: StageStatus
  readonly sign: SignKind
  /** Short word shown on the sign, so state never depends on colour alone. */
  readonly tag: string
  readonly headline: string
  readonly detail: string
}

export interface ApprovalRequest {
  readonly intent: string
  readonly tool: string
  readonly target: string
  readonly consequence: string
  readonly reversible: boolean
  readonly reason: string
  readonly risk: RiskLevel
}

export type OutcomeKind = 'executed' | 'blocked' | 'declined' | 'awaiting-approval'

export interface Outcome {
  readonly kind: OutcomeKind
  readonly summary: string
  readonly errorType?: ErrorType
  readonly effects: readonly string[]
  /** Text a tool returned. For file reads this is untrusted (EXTERNAL_CONTENT) data. */
  readonly output?: string
  readonly outputTrust?: TrustLevel
}

export interface Trace {
  readonly stages: readonly StageResult[]
  readonly ledger: readonly LedgerRow[]
  readonly outcome: Outcome
  readonly approvalRequest?: ApprovalRequest
  readonly risk?: RiskLevel
}
