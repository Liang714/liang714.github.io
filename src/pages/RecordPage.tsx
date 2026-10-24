import { PageHead } from '../components/PageHead.tsx'
import { site } from '../config/site.ts'
import { record } from '../content/record.ts'
import { usePageMeta } from '../hooks/usePageMeta.ts'

const description =
  'Education and independent projects, newest first. Project dates come from commit history or file dates, so each row can be checked against its source.'

export default function RecordPage() {
  usePageMeta(`Record | ${site.name}`, description)
  return (
    <section className="page page--paper record-page" aria-labelledby="record-page-title">
      <PageHead title="Record" titleId="record-page-title" lead={description} back={{ to: '/#record', label: 'Back to the home page' }} />

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
                {entry.date || 'Education'}
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
    </section>
  )
}
