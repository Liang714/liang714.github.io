import { record } from '../content/record.ts'

export function Record() {
  return (
    <section id="record" className="band band--alt" aria-labelledby="record-title" tabIndex={-1}>
      <div className="wrap">
        <header className="section-head section-head--split">
          <h2 id="record-title">Record of revisions</h2>
          <p className="section-head__lead">
            Education and independent projects, newest first. Project dates come from commit history or file dates, so
            each row can be checked against its source.
          </p>
        </header>

        <table className="revisions">
          <caption className="visually-hidden">Revisions, newest first</caption>
          <thead>
            <tr>
              <th scope="col">Rev</th>
              <th scope="col">Date</th>
              <th scope="col">Entry</th>
              <th scope="col">Source</th>
            </tr>
          </thead>
          <tbody>
            {record.map((entry) => (
              <tr key={entry.rev}>
                <th scope="row" className="revisions__rev">
                  {entry.rev}
                </th>
                <td className="revisions__date" data-label="Date">
                  {entry.date || '—'}
                </td>
                <td className="revisions__entry" data-label="Entry">
                  <strong>{entry.title}</strong>
                  <span>{entry.detail}</span>
                </td>
                <td className="revisions__source" data-label="Source">
                  {entry.source}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
