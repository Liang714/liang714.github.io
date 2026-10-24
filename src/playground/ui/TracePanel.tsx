import { forwardRef } from 'react'
import { CodeBlock } from '../../components/CodeBlock.tsx'
import { describeApproval } from '../engine.ts'
import { fence, trustName } from '../provenance.ts'
import { summarize } from '../summary.ts'
import { STAGES } from '../types.ts'
import type { Trace } from '../types.ts'

interface TracePanelProps {
  trace: Trace | undefined
  revealed: number
  waiting: boolean
  finished: boolean
  onDecide: (granted: boolean) => void
}

/** What each gate decided, in order, and why. */
export const TracePanel = forwardRef<HTMLButtonElement, TracePanelProps>(function TracePanel(
  { trace, revealed, waiting, finished, onDecide },
  approveRef,
) {
  if (!trace) {
    return (
      <div className="panel trace">
        <h2 className="panel__title">What each gate decided</h2>
        <p>Press “Send through the gates”. Each gate will report here, in order, with its reason.</p>
      </div>
    )
  }

  const outcome = trace.outcome
  const output = outcome.output
  return (
    <div className="panel trace">
      <h2 className="panel__title">What each gate decided</h2>
      <ol className="trace__list" aria-live="polite">
        {trace.stages.slice(0, revealed).map((stage, index) => (
          <li key={stage.id} className={`trace__row st st--${stage.status}`}>
            <span className="st__mark" aria-hidden="true" />
            <div>
              <p className="trace__head">
                <span>
                  Gate {index + 1}: {STAGES[index]?.label}
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
          <h3>A person has to decide</h3>
          <CodeBlock label="What the approval prompt tells the person">{describeApproval(trace.approvalRequest)}</CodeBlock>
          <div className="btn-row">
            <button ref={approveRef} type="button" className="btn-ask" onClick={() => onDecide(true)}>
              Approve
            </button>
            <button type="button" className="btn-quiet" onClick={() => onDecide(false)}>
              Decline
            </button>
          </div>
        </div>
      )}

      {finished && (
        <div className="outcome">
          <h3>{summarize(trace)}</h3>
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
