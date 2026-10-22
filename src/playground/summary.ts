import { STAGES } from './types.ts'
import type { Trace } from './types.ts'

/** One plain sentence describing where a trace ended up. Used by the hero and the demo. */
export function summarize(trace: Trace): string {
  const { outcome } = trace
  switch (outcome.kind) {
    case 'awaiting-approval':
      return `${(trace.risk ?? 'low').toUpperCase()} risk. Held at gate 4 until a person decides.`
    case 'declined':
      return 'A person declined at gate 4. Nothing ran and nothing was retried.'
    case 'blocked': {
      const index = trace.stages.findIndex((stage) => stage.status === 'block')
      const label = STAGES[index]?.label ?? 'a gate'
      return `Stopped at gate ${index + 1}, ${label}: ${outcome.errorType ?? 'refused'}.`
    }
    case 'executed': {
      const first = outcome.effects[0]
      if (first === undefined) return 'Passed all six gates. Nothing in the workspace changed.'
      if (first.startsWith('trashed')) {
        return `Passed all six gates. ${outcome.effects.length} path(s) moved to a trash batch, not unlinked.`
      }
      return `Passed all six gates. ${first.charAt(0).toUpperCase()}${first.slice(1)}.`
    }
  }
}
