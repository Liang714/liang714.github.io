import { Link, useParams } from 'react-router-dom'
import { ButtonLink } from '../components/ButtonLink.tsx'
import { CautionList } from '../components/CautionList.tsx'
import { Diagram } from '../components/Diagram.tsx'
import { PageHead } from '../components/PageHead.tsx'
import { RepoLine } from '../components/RepoLine.tsx'
import { ResultTable } from '../components/ResultTable.tsx'
import { TagList } from '../components/Tag.tsx'
import { site } from '../config/site.ts'
import { findCaseStudy, nextCaseStudy } from '../content/projects/index.ts'
import { usePageMeta } from '../hooks/usePageMeta.ts'
import NotFound from './NotFound.tsx'

const toc = [
  { id: 'problem', label: 'The problem' },
  { id: 'built', label: 'What is in it' },
  { id: 'architecture', label: 'How it fits together' },
  { id: 'evaluation', label: 'How it was checked' },
  { id: 'lessons', label: 'What broke' },
  { id: 'not-built', label: 'Not built yet' },
] as const

export default function CaseStudyPage() {
  const { slug } = useParams()
  const study = findCaseStudy(slug)
  usePageMeta(
    study ? `${study.title} case study | ${site.name}` : `Page not found | ${site.name}`,
    study ? study.summary : 'This page does not exist.',
  )
  if (!study) return <NotFound />

  const next = nextCaseStudy(study.slug)
  const provenance =
    study.repo.visibility === 'unpublished'
      ? 'This project is not under version control yet, so authorship is not recorded in git.'
      : 'Every commit in the repository is made under one author identity (the GitHub account Liang714).'

  return (
    <article className="page case" aria-labelledby="case-title">
      <PageHead title={study.title} titleId="case-title" lead={study.headline} back={{ to: '/work/', label: 'All work' }}>
        <div className="case__result">
          <p>
            <strong>Measured.</strong> {study.result.text}
          </p>
          <p className="case__caveat">
            <span className="caution-list__mark" aria-hidden="true" />
            <span>{study.result.caveat}</span>
          </p>
        </div>
        <dl className="case__facts">
          <div>
            <dt>When</dt>
            <dd>{study.period}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>{study.status}</dd>
          </div>
          <div>
            <dt>Code</dt>
            <dd>
              <RepoLine repo={study.repo} />
            </dd>
          </div>
          <div>
            <dt>Built with</dt>
            <dd>{study.stack.join(', ')}</dd>
          </div>
        </dl>
        <TagList tags={study.tags} label="Status at a glance" />
      </PageHead>

      <div className="case__layout">
        <nav className="case__toc" aria-label="On this page">
          <ol>
            {toc.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.label}</a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="case__body">
          <section id="problem" aria-labelledby="problem-title" tabIndex={-1}>
            <h2 id="problem-title">The problem</h2>
            {study.problem.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>

          <section id="built" aria-labelledby="built-title" tabIndex={-1}>
            <h2 id="built-title">What is in it</h2>
            <ul className="mark-list">
              {study.built.map((item) => (
                <li key={item}>
                  <span className="mark mark--solid" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <dl className="fact-list">
              {study.facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section id="architecture" aria-labelledby="architecture-title" tabIndex={-1}>
            <h2 id="architecture-title">How it fits together</h2>
            <Diagram spec={study.diagram} />
            <h3>Decisions and trade-offs</h3>
            <dl className="notes">
              {study.decisions.map((decision) => (
                <div key={decision.title}>
                  <dt>{decision.title}</dt>
                  <dd>{decision.body}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section id="evaluation" aria-labelledby="evaluation-title" tabIndex={-1}>
            <h2 id="evaluation-title">How it was checked</h2>
            <p>{study.evaluation.method}</p>
            {study.evaluation.tables.map((table) => (
              <ResultTable key={table.caption} table={table} />
            ))}
            <h3>Limits of this evidence</h3>
            <CautionList items={study.evaluation.limits} label={`Limits of the evidence for ${study.title}`} />
          </section>

          <section id="lessons" aria-labelledby="lessons-title" tabIndex={-1}>
            <h2 id="lessons-title">What broke, and what it taught</h2>
            <dl className="notes">
              {study.lessons.map((lesson) => (
                <div key={lesson.title}>
                  <dt>{lesson.title}</dt>
                  <dd>{lesson.body}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section id="not-built" aria-labelledby="not-built-title" tabIndex={-1}>
            <h2 id="not-built-title">Not built yet</h2>
            <p>Stated plainly so nobody has to guess where the edges are.</p>
            <ul className="mark-list">
              {study.notBuilt.map((item) => (
                <li key={item}>
                  <span className="mark mark--ring" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <aside className="provenance" aria-label="Provenance">
            <h2>Provenance</h2>
            <p>{provenance}</p>
            <p>{site.aiAssistance}</p>
          </aside>

          {study.slug === 'computer-agent' && (
            <p className="case__gate">
              <Link to="/gate/">Send your own requests through the gates</Link>, with the same rules, in your browser.
            </p>
          )}

          <nav className="case__next" aria-label="Next case study">
            <p>Next case study</p>
            <ButtonLink to={`/work/${next.slug}/`}>{next.title}</ButtonLink>
          </nav>
        </div>
      </div>
    </article>
  )
}
