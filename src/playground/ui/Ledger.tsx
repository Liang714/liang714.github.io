import { trustName } from '../provenance.ts'
import type { LedgerRow } from '../types.ts'

/** The audit trail the original writes to SQLite. Payload fields are abbreviated; timestamps are omitted. */
export function Ledger({ rows }: { rows: readonly LedgerRow[] | undefined }) {
  return (
    <div className="panel">
      <h2 className="panel__title">The audit log</h2>
      {rows === undefined ? (
        <p>The ledger fills as the gates open. Nothing in it can be edited afterwards.</p>
      ) : (
        // A scrollable region must be focusable so keyboard users can scroll it.
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        <div className="table-wrap" role="region" aria-label="Audit log rows" tabIndex={0}>
          <table className="results ledger">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Event</th>
                <th scope="col">Trust</th>
                <th scope="col">Payload</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.seq}>
                  <td>{row.seq}</td>
                  <th scope="row">
                    <code>{row.kind}</code>
                  </th>
                  <td>
                    <code>{trustName(row.trust)}</code>
                  </td>
                  <td>
                    <code>{JSON.stringify(row.payload)}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
