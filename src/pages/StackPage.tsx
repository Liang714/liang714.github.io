import { PageHead } from '../components/PageHead.tsx'
import { site } from '../config/site.ts'
import { evidenceLabel, stackGroups } from '../content/stack.ts'
import { usePageMeta } from '../hooks/usePageMeta.ts'

const description =
  'A schedule, not a skill meter. Each entry says where the technology was actually used, so there are no percentages to take on trust.'

export default function StackPage() {
  usePageMeta(`Stack | ${site.name}`, description)
  return (
    <section className="page page--blue stack-page" aria-labelledby="stack-page-title">
      <PageHead title="Stack" titleId="stack-page-title" lead={description} back={{ to: '/#stack', label: 'Back to the home page' }}>
        <ul className="legend" aria-label="Legend">
          {(Object.keys(evidenceLabel) as (keyof typeof evidenceLabel)[]).map((key) => (
            <li key={key}>
              <span className={`mark mark--${key}`} aria-hidden="true" />
              {evidenceLabel[key]}
            </li>
          ))}
        </ul>
      </PageHead>

      <div className="stack-page__groups">
        {stackGroups.map((group) => (
          <section key={group.title} aria-labelledby={`stack-${group.title}`}>
            <h2 id={`stack-${group.title}`}>{group.title}</h2>
            <ul>
              {group.items.map((item) => (
                <li key={item.name}>
                  <span className={`mark mark--${item.evidence}`} aria-hidden="true" />
                  <span className="stack-page__name">{item.name}</span>
                  <span className="stack-page__ev">{evidenceLabel[item.evidence]}</span>
                  <span className="stack-page__where">{item.where}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </section>
  )
}
