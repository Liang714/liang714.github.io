import { STAGES } from '../types.ts'
import type { StageResult } from '../types.ts'

interface GateRailProps {
  stages: readonly StageResult[] | undefined
  /** How many gates have been shown so far. */
  revealed: number
}

/** The six gates in a row. Each reports with a word and a shape, so state never depends on colour. */
export function GateRail({ stages, revealed }: GateRailProps) {
  return (
    <ol className="rail" aria-label="The six gates, in order">
      {STAGES.map((meta, index) => {
        const stage = stages?.[index]
        const shown = stage !== undefined && index < revealed
        const status = shown ? stage.status : 'idle'
        return (
          <li key={meta.id} className={`rail__gate st st--${status}`}>
            <span className="st__mark" aria-hidden="true" />
            <span className="rail__label">{meta.label}</span>
            <span className="rail__tag">{shown ? stage.tag : 'Waiting'}</span>
          </li>
        )
      })}
    </ol>
  )
}
