import { useCallback, useEffect, useMemo, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion.ts'
import { evaluate } from './engine.ts'
import type { ActionProposal, SimConfig, Trace } from './types.ts'

interface RunState {
  readonly token: string
  readonly decision: boolean | undefined
  readonly revealed: number
}

export interface GateRunner {
  readonly trace: Trace | undefined
  /** How many gates have been shown so far. */
  readonly revealed: number
  readonly started: boolean
  /** Paused at gate 4, waiting for a human. */
  readonly waiting: boolean
  readonly finished: boolean
  run: () => void
  reset: () => void
  decide: (granted: boolean) => void
}

interface RunnerInput {
  readonly config: SimConfig
  readonly proposal: ActionProposal
  readonly goal: string
}

/**
 * Reveals a trace one gate at a time, pauses at the approval gate until a person decides, and
 * discards the run if the proposal, rules or goal change underneath it. Under reduced motion the
 * whole sequence appears at once.
 */
export function useGateRunner({ config, proposal, goal }: RunnerInput, stepMs = 380): GateRunner {
  const reduced = useReducedMotion()
  const token = useMemo(() => JSON.stringify([config, proposal, goal]), [config, proposal, goal])
  const [state, setState] = useState<RunState | null>(null)
  const current = state !== null && state.token === token ? state : null
  const decision = current?.decision
  const started = current !== null

  const trace = useMemo(
    () => (started ? evaluate({ config, proposal, goal, approval: decision }) : undefined),
    [started, config, proposal, goal, decision],
  )

  const firstIdle = trace ? trace.stages.findIndex((stage) => stage.status === 'idle') : 0
  const limit = trace ? (firstIdle === -1 ? trace.stages.length : firstIdle) : 0
  const revealed = current?.revealed ?? 0

  useEffect(() => {
    if (!started || revealed >= limit) return
    const id = window.setTimeout(
      () =>
        setState((prev) =>
          prev !== null && prev.token === token && prev.revealed < limit
            ? { ...prev, revealed: reduced ? limit : prev.revealed + 1 }
            : prev,
        ),
      reduced ? 0 : stepMs,
    )
    return () => window.clearTimeout(id)
  }, [started, revealed, limit, reduced, stepMs, token])

  const run = useCallback(() => setState({ token, decision: undefined, revealed: 0 }), [token])
  const reset = useCallback(() => setState(null), [])
  const decide = useCallback(
    (granted: boolean) =>
      setState((prev) => (prev !== null && prev.token === token ? { ...prev, decision: granted } : prev)),
    [token],
  )

  const atEnd = started && revealed >= limit
  return {
    trace,
    revealed,
    started,
    waiting: atEnd && trace?.outcome.kind === 'awaiting-approval',
    finished: atEnd && trace !== undefined && trace.outcome.kind !== 'awaiting-approval',
    run,
    reset,
    decide,
  }
}
