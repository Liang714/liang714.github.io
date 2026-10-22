import { SignTag } from '../components/SignTag.tsx'
import { stackGroups } from '../content/stack.ts'
import type { Evidence, Tone } from '../content/types.ts'

const evidenceLabel: Record<Evidence, { label: string; tone: Tone }> = {
  used: { label: 'Used in a project here', tone: 'green' },
  building: { label: 'Building with it now', tone: 'yellow' },
  earlier: { label: 'Earlier work', tone: 'neutral' },
}

export function Stack() {
  return (
    <section id="stack" className="band" aria-labelledby="stack-title" tabIndex={-1}>
      <div className="wrap">
        <header className="section-head section-head--split">
          <h2 id="stack-title">Technical stack</h2>
          <div className="stack__lead">
            <p className="section-head__lead">
              A schedule, not a skill meter. Each entry says where the technology was actually used, so there are no
              percentages to take on trust.
            </p>
            <ul className="sign-tag-list" aria-label="Legend">
              {(Object.keys(evidenceLabel) as Evidence[]).map((key) => (
                <li key={key}>
                  <SignTag tone={evidenceLabel[key].tone}>{evidenceLabel[key].label}</SignTag>
                </li>
              ))}
            </ul>
          </div>
        </header>

        <div className="stack__groups">
          {stackGroups.map((group) => (
            <section key={group.title} className="stack-group" aria-labelledby={`stack-${group.title}`}>
              <h3 id={`stack-${group.title}`}>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item.name} className="stack-item">
                    <span className="stack-item__name">{item.name}</span>
                    <span className="stack-item__evidence">
                      <SignTag tone={evidenceLabel[item.evidence].tone}>{evidenceLabel[item.evidence].label}</SignTag>
                    </span>
                    <span className="stack-item__where">{item.where}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}
