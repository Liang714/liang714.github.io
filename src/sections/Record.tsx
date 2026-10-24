import { ButtonLink } from '../components/ButtonLink.tsx'
import { Reveal } from '../components/Reveal.tsx'
import { record } from '../content/record.ts'

/** The home page shows the five newest rows and the education row; the full table has its own page. */
const shown = [...record.slice(0, 5), ...record.slice(-1)]

export function Record() {
  return (
    <section id="record" className="sec record" aria-labelledby="record-title" tabIndex={-1}>
      <h2 id="record-title" className="record__title">
        Record
      </h2>
      <div className="record__main">
        <ol className="entries">
          {shown.map((entry) => (
            <Reveal as="li" key={entry.rev}>
              <p className="when">{entry.date || 'Education'}</p>
              <h3>{entry.title}</h3>
              <p>{entry.detail}</p>
            </Reveal>
          ))}
        </ol>
        <p className="record__more">
          <ButtonLink variant="text" to="/record/">
            Full record, {record.length} entries
          </ButtonLink>
        </p>
      </div>
    </section>
  )
}
