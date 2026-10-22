import { Link, useParams } from 'react-router-dom'
import { ButtonLink } from '../components/ButtonLink.tsx'
import { CautionList } from '../components/CautionList.tsx'
import { Diagram } from '../components/Diagram.tsx'
import { Pictogram } from '../components/Pictogram.tsx'
import { RepoLine } from '../components/RepoLine.tsx'
import { ResultTable } from '../components/ResultTable.tsx'
import { SignGlyph, StateSign } from '../components/StateSign.tsx'
import { SignTagList } from '../components/SignTag.tsx'
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
    <article className="case" aria-labelledby="case-title">
      <header className="case-hero">
        <div className="wrap">
          <Link className="back-link" to={{ pathname: '/', hash: '#work' }}>
            <Pictogram name="arrow" size={20} className="back-link__icon" />
            All work
          </Link>

          <div className="gantry case-hero__gantry">
            <div className="gantry__beam" aria-hidden="true" />
            <span className="gantry__rod gantry__rod--l" aria-hidden="true" />
            <span className="gantry__rod gantry__rod--r" aria-hidden="true" />
            <div className="sign case-hero__panel hang">
              <div className="case-hero__title">
                <span className="case-hero__plate" aria-hidden="true">
                  <Pictogram name={study.pictogram} size={44} />
                </span>
                <h1 id="case-title">{study.title}</h1>
              </div>
              <p className="case-hero__headline">{study.headline}</p>

              <div className="case-card__result case-hero__result">
                <p>
                  <strong>Measured.</strong> {study.result.text}
                </p>
                <p className="case-card__caveat">
                  <StateSign kind="caution" size={20} />
                  <span>{study.result.caveat}</span>
                </p>
              </div>

              <dl className="case-facts">
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
                  <dd>{study.stack.join(' · ')}</dd>
                </div>
              </dl>
              <SignTagList tags={study.tags} label="Status at a glance" />
            </div>
          </div>
        </div>
      </header>

      <div className="wrap case-layout">
        <nav className="case-toc" aria-label="On this page">
          <ol>
            {toc.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.label}</a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="case-body">
          <section id="problem" aria-labelledby="problem-title" tabIndex={-1}>
            <h2 id="problem-title">The problem</h2>
            {study.problem.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>

          <section id="built" aria-labelledby="built-title" tabIndex={-1}>
            <h2 id="built-title">What is in it</h2>
            <ul className="mark-list mark-list--body">
              {study.built.map((item) => (
                <li key={item}>
                  <SignGlyph tone="green" />
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
            <ul className="mark-list mark-list--body">
              {study.notBuilt.map((item) => (
                <li key={item}>
                  <SignGlyph tone="neutral" />
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

          <nav className="case-next" aria-label="Next case study">
            <p>Next case study</p>
            <ButtonLink to={`/work/${next.slug}/`}>{next.title}</ButtonLink>
          </nav>
        </div>
      </div>
    </article>
  )
}
