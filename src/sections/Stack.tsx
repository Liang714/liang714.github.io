import { ButtonLink } from '../components/ButtonLink.tsx'
import { Reveal } from '../components/Reveal.tsx'
import { evidenceLabel, stackGroups } from '../content/stack.ts'
import type { Evidence } from '../content/types.ts'

const legend: readonly Evidence[] = ['used', 'building', 'earlier']

/** Every group is open: the section exists to be read, not clicked. Where each one was used is a page away. */
export function Stack() {
  return (
    <section id="stack" className="sec stack" aria-labelledby="stack-title" tabIndex={-1}>
      <div className="stack__side">
        <h2 id="stack-title" className="stack__word">
          Stack
        </h2>
        <Reveal as="p" className="stack__lead">
          What I use, marked by whether a project here shows it.
        </Reveal>
        <ul className="legend" aria-label="Legend">
          {legend.map((key) => (
            <li key={key}>
              <span className={`mark mark--${key}`} aria-hidden="true" />
              {evidenceLabel[key]}
            </li>
          ))}
        </ul>
      </div>
      <Reveal className="stack__main">
        <div className="stack__groups">
          {stackGroups.map((group) => (
            <section key={group.title} className="group" aria-labelledby={`group-${group.title}`}>
              <h3 id={`group-${group.title}`}>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item.name}>
                    <span className={`mark mark--${item.evidence}`} aria-hidden="true" />
                    <span>{item.name}</span>
                    <span className="group__ev">{evidenceLabel[item.evidence]}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <p className="stack__more">
          <ButtonLink variant="text" to="/stack/">
            Where each one was used
          </ButtonLink>
        </p>
      </Reveal>
    </section>
  )
}
