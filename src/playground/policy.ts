import { RISK_ORDER } from './types.ts'
import type { Permission, RiskLevel } from './types.ts'

/** A batch of this many targets or more escalates a tool's base risk by one level. */
export const BULK_THRESHOLD = 10

export function riskRank(risk: RiskLevel): number {
  return RISK_ORDER.indexOf(risk)
}

/** Total length of every list-valued argument. Strings are not lists. */
export function targetCount(args: Readonly<Record<string, unknown>>): number {
  let total = 0
  for (const value of Object.values(args)) {
    if (Array.isArray(value)) total += value.length
  }
  return total
}

export function escalate(risk: RiskLevel): RiskLevel {
  return RISK_ORDER[Math.min(riskRank(risk) + 1, RISK_ORDER.length - 1)] ?? 'critical'
}

/**
 * Deterministic risk classification. The model never supplies, influences or lowers a risk level:
 * it is derived from the resolved tool and its already-validated arguments.
 */
export function classify(baseRisk: RiskLevel, args: Readonly<Record<string, unknown>>): RiskLevel {
  return targetCount(args) >= BULK_THRESHOLD ? escalate(baseRisk) : baseRisk
}

/** HIGH and above always ask, regardless of a standing ALLOWED grant. */
export function requiresApproval(risk: RiskLevel, permission: Permission): boolean {
  if (riskRank(risk) >= riskRank('high')) return true
  return permission === 'ask'
}
