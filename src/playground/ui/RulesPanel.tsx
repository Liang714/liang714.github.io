import { useId } from 'react'
import type { Capability, Permission } from '../types.ts'

interface RulesPanelProps {
  permissions: Readonly<Record<Capability, Permission>>
  onPermission: (capability: Capability, value: Permission) => void
  maxActions: number
  onMaxActions: (value: number) => void
  actionsUsed: number
  onActionsUsed: (value: number) => void
  onReset: () => void
}

const CAPABILITIES: readonly { id: Capability; label: string }[] = [
  { id: 'filesystem_read', label: 'Read' },
  { id: 'filesystem_write', label: 'Write (mkdir, copy, move)' },
  { id: 'filesystem_delete', label: 'Delete' },
]

const PERMISSIONS: readonly Permission[] = ['denied', 'ask', 'allowed']

const clamp = (value: number, min: number, max: number): number =>
  Number.isNaN(value) ? min : Math.min(Math.max(Math.trunc(value), min), max)

/** The rules an operator controls. Everything else, risk included, is computed and cannot be set from here. */
export function RulesPanel(props: RulesPanelProps) {
  const base = useId()
  return (
    <details className="sign panel rules" open>
      <summary className="rules__summary">
        <h3 className="panel__title">Change the rules</h3>
        <span className="rules__hint">Permissions and budget are the only dials. Risk is computed.</span>
      </summary>

      <div className="rules__grid">
        {CAPABILITIES.map((capability) => (
          <div className="field" key={capability.id}>
            <label htmlFor={`${base}-${capability.id}`}>{capability.label}</label>
            <select
              id={`${base}-${capability.id}`}
              className="input"
              value={props.permissions[capability.id]}
              onChange={(event) => props.onPermission(capability.id, event.target.value as Permission)}
            >
              {PERMISSIONS.map((permission) => (
                <option key={permission} value={permission}>
                  {permission.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        ))}

        <div className="field">
          <label htmlFor={`${base}-max`}>Action budget</label>
          <input
            id={`${base}-max`}
            className="input"
            type="number"
            min={1}
            max={25}
            value={props.maxActions}
            onChange={(event) => props.onMaxActions(clamp(event.target.valueAsNumber, 1, 25))}
          />
        </div>

        <div className="field">
          <label htmlFor={`${base}-used`}>Actions already used</label>
          <input
            id={`${base}-used`}
            className="input"
            type="number"
            min={0}
            max={25}
            value={props.actionsUsed}
            onChange={(event) => props.onActionsUsed(clamp(event.target.valueAsNumber, 0, 25))}
          />
        </div>
      </div>

      <button type="button" className="chip-btn chip-btn--plain" onClick={props.onReset}>
        Reset rules for this request
      </button>
    </details>
  )
}
