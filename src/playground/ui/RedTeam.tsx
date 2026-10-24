import { useId, useState } from 'react'
import { TRUST } from '../types.ts'
import type { TrustName } from '../types.ts'
import { attemptTamper, promoteTo } from '../provenance.ts'
import type { LedgerRow } from '../types.ts'

const LEVELS = Object.keys(TRUST) as TrustName[]

/** Two attacks on the guarantees themselves: rewrite the log, and talk content up the trust lattice. */
export function RedTeam({ rows }: { rows: readonly LedgerRow[] | undefined }) {
  const base = useId()
  const [message, setMessage] = useState<string>('')
  const [from, setFrom] = useState<TrustName>('EXTERNAL_CONTENT')
  const [to, setTo] = useState<TrustName>('USER_INSTRUCTION')
  const target = rows && rows.length > 2 ? 3 : 1

  const tamper = (kind: 'update' | 'delete') => {
    const attempt = attemptTamper(kind, target)
    setMessage(`sqlite> ${attempt.sql}\nError: ${attempt.error}`)
  }

  const promote = () => {
    const result = promoteTo(from, to)
    setMessage(
      result.ok
        ? `${from} -> ${to}: allowed. Trust was lowered or kept, never raised.`
        : `>>> Tagged(text, ${from}).promote_to(${to})\n${result.error}`,
    )
  }

  return (
    <div className="panel">
      <h2 className="panel__title">Try to break the guarantees</h2>
      <p>
        Two things the design promises by construction, not by convention. Both attempts are simulated and both are refused.
      </p>

      <div className="redteam">
        <div className="redteam__block">
          <h3>Rewrite history</h3>
          <p className="redteam__text">The log is append-only because the database refuses to update or delete rows.</p>
          <div className="btn-row">
            <button type="button" className="btn-quiet" onClick={() => tamper('update')}>
              Edit row {target}
            </button>
            <button type="button" className="btn-quiet" onClick={() => tamper('delete')}>
              Delete row {target}
            </button>
          </div>
        </div>

        <div className="redteam__block">
          <h3>Raise a file’s trust</h3>
          <p className="redteam__text">Trust can only be lowered. Pick a starting level and a level to claim.</p>
          <div className="redteam__selects">
            <div className="field">
              <label htmlFor={`${base}-from`}>Content starts as</label>
              <select
                id={`${base}-from`}
                className="input"
                value={from}
                onChange={(event) => setFrom(event.target.value as TrustName)}
              >
                {LEVELS.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor={`${base}-to`}>and claims to be</label>
              <select
                id={`${base}-to`}
                className="input"
                value={to}
                onChange={(event) => setTo(event.target.value as TrustName)}
              >
                {LEVELS.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button type="button" className="btn-quiet" onClick={promote}>
            Try it
          </button>
        </div>
      </div>

      <pre className="code code--console" role="status" aria-live="polite">
        {message || 'Nothing attempted yet.'}
      </pre>
    </div>
  )
}
