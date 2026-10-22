import type { ResultTable as ResultTableData } from '../content/types.ts'

/** A results table. Scrolls sideways on a narrow screen instead of squeezing, and stays keyboard-reachable. */
export function ResultTable({ table }: { table: ResultTableData }) {
  return (
    // A scrollable region must be focusable so keyboard users can scroll it.
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    <div className="table-wrap" role="region" aria-label={table.caption} tabIndex={0}>
      <table className="results">
        <caption>{table.caption}</caption>
        <thead>
          <tr>
            {table.columns.map((column) => (
              <th key={column} scope="col">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row) => (
            <tr key={row.join('|')}>
              {row.map((cell, index) =>
                index === 0 ? (
                  <th key={`${cell}-${index}`} scope="row">
                    {cell}
                  </th>
                ) : (
                  <td key={`${cell}-${index}`}>{cell}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
