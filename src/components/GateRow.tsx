import type { CSSProperties } from 'react'
import { STAGES } from '../playground/types.ts'
import type { StageResult } from '../playground/types.ts'
import { Pictogram } from './Pictogram.tsx'
import { StateSign } from './StateSign.tsx'

interface GateRowProps {
  stages: readonly StageResult[] | undefined
  /** How many gates have been shown so far; the rest stay blank. */
  revealed: number
  variant: 'hero' | 'demo'
}

/** Six signs hung from a beam. Each flips to its verdict as the proposal reaches it. */
export function GateRow({ stages, revealed, variant }: GateRowProps) {
  return (
    <ol className={`gates gates--${variant}`} aria-label="The six gates a proposal passes through">
      {STAGES.map((meta, index) => {
        const stage = stages?.[index]
        const shown = stage !== undefined && index < revealed
        const sign = shown ? stage.sign : 'idle'
        const tag = shown ? stage.tag : '—'
        return (
          <li className="gate sign" key={meta.id} data-state={sign} style={{ '--i': index } as CSSProperties}>
            <div className="gate__head">
              <span className="gate__num" aria-hidden="true">
                {meta.gate}
              </span>
              <span className="gate__name">{meta.label}</span>
            </div>
            <Pictogram name={meta.id} size={34} className="gate__glyph" />
            <div className="gate__state" data-flip={shown ? 'on' : 'off'} key={`${sign}-${tag}`}>
              <StateSign kind={sign} size={variant === 'hero' ? 50 : 58} />
              <span className="gate__tag">{tag}</span>
            </div>
            <span className="visually-hidden">
              Gate {meta.gate}, {meta.label}: {shown ? `${stage.tag}. ${stage.headline}` : 'not reached yet'}
            </span>
          </li>
        )
      })}
    </ol>
  )
}
