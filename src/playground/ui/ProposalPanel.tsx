import { useId } from 'react'
import { CodeBlock } from '../../components/CodeBlock.tsx'
import type { Scenario } from '../scenarios.ts'
import type { ActionProposal } from '../types.ts'

interface ProposalPanelProps {
  scenario: Scenario
  proposal: ActionProposal
  editValue: string
  onEdit: (value: string) => void
  fooled: boolean
  onFooled: (value: boolean) => void
  /** The file the planner read, already wrapped in the untrusted fence. */
  fencedObservation?: string
}

function formatProposal(proposal: ActionProposal): string {
  const args = JSON.stringify(proposal.arguments, null, 2)
  return `${proposal.tool}(${args})`
}

export function ProposalPanel({
  scenario,
  proposal,
  editValue,
  onEdit,
  fooled,
  onFooled,
  fencedObservation,
}: ProposalPanelProps) {
  const editId = useId()
  const fooledId = useId()
  return (
    <div className="sign panel">
      <h3 className="panel__title">The proposal</h3>

      <dl className="panel__facts">
        <div>
          <dt>Goal</dt>
          <dd>{scenario.goal}</dd>
        </div>
        <div>
          <dt>Came from</dt>
          <dd>
            {scenario.origin === 'file'
              ? 'A file the agent read. Its text is data, never instructions.'
              : 'The person using the agent.'}
          </dd>
        </div>
      </dl>

      {fencedObservation !== undefined && (
        <div>
          <p className="panel__label">What the planner is shown, fenced as untrusted</p>
          <CodeBlock variant="fence" label="File contents as the planner receives them, fenced as untrusted data">
            {fencedObservation}
          </CodeBlock>
        </div>
      )}

      {scenario.benignProposal && (
        <div className="field field--check">
          <input id={fooledId} type="checkbox" checked={fooled} onChange={(event) => onFooled(event.target.checked)} />
          <label htmlFor={fooledId}>
            Planner obeys the file (worst case)
            <span className="field__hint">
              In the recorded benchmark the planner never did. This forces it, to show what the gates do next.
            </span>
          </label>
        </div>
      )}

      <div>
        <p className="panel__label">What the planner proposes</p>
        <CodeBlock label="The action the planner proposes: a tool name and its arguments">
          {formatProposal(proposal)}
        </CodeBlock>
        <p className="panel__intent">
          Stated intent: <em>{proposal.intent}</em>
        </p>
      </div>

      {scenario.editable && (
        <div className="field">
          <label htmlFor={editId}>{scenario.editable.label}</label>
          <input
            id={editId}
            className="input"
            type="text"
            value={editValue}
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            onChange={(event) => onEdit(event.target.value)}
          />
          <span className="field__hint">Edit it and send it again. Try ~/, ../ or a name that does not exist.</span>
        </div>
      )}
    </div>
  )
}
