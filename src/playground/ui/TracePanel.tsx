import { forwardRef } from 'react'
import { CodeBlock } from '../../components/CodeBlock.tsx'
import { StateSign } from '../../components/StateSign.tsx'
import { describeApproval } from '../engine.ts'
import { fence } from '../provenance.ts'
import { summarize } from '../summary.ts'
import { STAGES } from '../types.ts'
import type { Trace } from '../types.ts'
import { trustName } from '../provenance.ts'

interface TracePanelProps {
  trace: Trace | undefined
  revealed: number
  waiting: boolean
  finished: boolean
  onDecide: (granted: boolean) => void
}

/** The readable version of the gate row: what each gate decided, in order, and why. */
export const TracePanel = forwardRef<HTMLButtonElement, TracePanelProps>(function TracePanel(
  { trace, revealed, waiting, finished, onDecide },
  approveRef,
) {
  if (!trace) {
    return (
      <div className="sign panel trace">
        <h3 className="panel__title">What each gate decided</h3>
        <p>Press “Send through the gates”. Each gate will report here, in order, with its reason.</p>
      </div>
    )
  }

  const outcome = trace.outcome
  const output = outcome.output
  return (
    <div className="sign panel trace">
      <h3 className="panel__title">What each gate decided</h3>
      <ol className="trace__list" aria-live="polite">
        {trace.stages.slice(0, revealed).map((stage, index) => (
          <li key={stage.id} className="trace__row">
            <StateSign kind={stage.sign} size={30} />
            <div>
              <p className="trace__head">
                <span>
                  Gate {index + 1} · {STAGES[index]?.label}
                </span>
                <span className="trace__tag">{stage.tag}</span>
                <code className="trace__source">{STAGES[index]?.source}</code>
              </p>
              <p className="trace__headline">{stage.headline}</p>
              {stage.detail && <p className="trace__detail">{stage.detail}</p>}
            </div>
          </li>
        ))}
      </ol>

      {waiting && trace.approvalRequest && (
        <div className="approval" role="group" aria-label="Approval request">
          <h4>A person has to decide</h4>
          <CodeBlock label="What the approval prompt tells the person">{describeApproval(trace.approvalRequest)}</CodeBlock>
          <div className="btn-row">
            <button ref={approveRef} type="button" className="chip-btn chip-btn--blue" onClick={() => onDecide(true)}>
              Approve
            </button>
            <button type="button" className="chip-btn chip-btn--plain" onClick={() => onDecide(false)}>
              Decline
            </button>
          </div>
        </div>
      )}

      {finished && (
        <div className="outcome">
          <h4>{summarize(trace)}</h4>
          {outcome.effects.length > 0 && (
            <ul className="outcome__effects">
              {outcome.effects.slice(0, 6).map((effect) => (
                <li key={effect}>
                  <code>{effect}</code>
                </li>
              ))}
              {outcome.effects.length > 6 && <li>and {outcome.effects.length - 6} more</li>}
            </ul>
          )}
          {output !== undefined && outcome.outputTrust !== undefined && (
            <div>
              <p className="panel__label">What the planner would receive back</p>
              <CodeBlock variant="fence" label="Tool output as the planner would receive it, fenced">
                {fence(output, trustName(outcome.outputTrust))}
              </CodeBlock>
            </div>
          )}
        </div>
      )}
    </div>
  )
})
