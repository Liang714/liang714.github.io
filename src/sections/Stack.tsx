import { ButtonLink } from '../components/ButtonLink.tsx'
import { Reveal } from '../components/Reveal.tsx'
import { evidenceLabel, stackGroups } from '../content/stack.ts'

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
      </div>
      <Reveal className="stack__main">
        {stackGroups.map((group, index) => (
          <details key={group.title} className="acc" open={index === 0}>
            <summary>
              <span>{group.title}</span>
              <span className="acc__plus" aria-hidden="true" />
            </summary>
            <ul>
              {group.items.map((item) => (
                <li key={item.name}>
                  <span>{item.name}</span>
                  <span className="acc__ev">{evidenceLabel[item.evidence]}</span>
                </li>
              ))}
            </ul>
          </details>
        ))}
        <p className="stack__more">
          <ButtonLink variant="text" to="/stack/">
            Where each one was used
          </ButtonLink>
        </p>
      </Reveal>
    </section>
  )
}
