import { Link } from 'react-router-dom'
import { ButtonLink } from '../components/ButtonLink.tsx'
import { CautionList } from '../components/CautionList.tsx'
import { HazardStripe } from '../components/HazardStripe.tsx'
import { Pictogram } from '../components/Pictogram.tsx'
import { RepoLine } from '../components/RepoLine.tsx'
import { Reveal } from '../components/Reveal.tsx'
import { ResultTable } from '../components/ResultTable.tsx'
import { SignGlyph, StateSign } from '../components/StateSign.tsx'
import { SignTag, SignTagList } from '../components/SignTag.tsx'
import { caseStudies, labProjects } from '../content/projects/index.ts'
import type { CaseStudy, LabProject } from '../content/types.ts'

export function Work() {
  const [flagship, ...others] = caseStudies
  return (
    <section id="work" className="band" aria-labelledby="work-title" tabIndex={-1}>
      <div className="wrap">
        <header className="section-head section-head--split">
          <h2 id="work-title">Selected work</h2>
          <p className="section-head__lead">
            Three projects with enough detail to check. Each case study prints its sample sizes, its caveats and what is
            not built yet right beside the results.
          </p>
        </header>

        {flagship && (
          <Reveal>
            <CaseCard study={flagship} featured />
          </Reveal>
        )}

        <div className="work-pair">
          {others.map((study, index) => (
            <Reveal key={study.slug} delay={index * 90}>
              <CaseCard study={study} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <LabBoard />
        </Reveal>
      </div>
    </section>
  )
}

function CaseCard({ study, featured = false }: { study: CaseStudy; featured?: boolean }) {
  return (
    <article className={`sign case-card${featured ? ' case-card--featured' : ''}`}>
      <div className="case-card__plate" aria-hidden="true">
        <Pictogram name={study.pictogram} size={featured ? 64 : 48} />
      </div>
      <div className="case-card__body">
        <h3>
          <Link to={`/work/${study.slug}/`}>{study.title}</Link>
        </h3>
        <p className="case-card__headline">{study.headline}</p>
        <p className="case-card__summary">{study.summary}</p>
        <div className="case-card__result">
          <p>
            <strong>Measured.</strong> {study.result.text}
          </p>
          <p className="case-card__caveat">
            <StateSign kind="caution" size={20} />
            <span>{study.result.caveat}</span>
          </p>
        </div>
        <SignTagList tags={study.tags} label={`Status of ${study.title}`} />
        <dl className="case-card__meta">
          <div>
            <dt>When</dt>
            <dd>{study.period}</dd>
          </div>
          <div>
            <dt>Code</dt>
            <dd>
              <RepoLine repo={study.repo} />
            </dd>
          </div>
        </dl>
        <ButtonLink to={`/work/${study.slug}/`}>Read the case study</ButtonLink>
      </div>
    </article>
  )
}

function LabBoard() {
  return (
    <div className="sign lab">
      <HazardStripe />
      <div className="lab__inner">
        <div className="lab__head">
          <h3>In progress</h3>
          <p>
            Not finished, and labelled that way. Each row says what exists, what does not, and what the numbers can and
            cannot support.
          </p>
        </div>
        <ul className="lab__list">
          {labProjects.map((project) => (
            <li key={project.slug}>
              <LabRow project={project} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function LabRow({ project }: { project: LabProject }) {
  return (
    <details className="lab-row">
      <summary className="lab-row__summary">
        <span className="lab-row__icon" aria-hidden="true">
          <Pictogram name={project.pictogram} size={30} />
        </span>
        <span className="lab-row__title">{project.title}</span>
        <span className="lab-row__status">
          <SignTag tone="yellow">{project.status}</SignTag>
        </span>
        <span className="lab-row__period">{project.period}</span>
        <Pictogram name="arrow" size={22} className="lab-row__chevron" />
      </summary>

      <div className="lab-row__body">
        <p className="lab-row__question">{project.question}</p>

        <div className="lab-row__cols">
          <div>
            <h4>What exists</h4>
            <ul className="mark-list">
              {project.exists.map((item) => (
                <li key={item}>
                  <SignGlyph tone="green" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Still to do</h4>
            <ul className="mark-list">
              {project.pending.map((item) => (
                <li key={item}>
                  <SignGlyph tone="neutral" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {project.table && <ResultTable table={project.table} />}

        <div>
          <h4>Limits of this evidence</h4>
          <CautionList items={project.limits} label={`Limits for ${project.title}`} />
        </div>

        {project.learned && (
          <p>
            <strong>What running it taught me.</strong> {project.learned}
          </p>
        )}

        <p className="lab-row__meta">
          <RepoLine repo={project.repo} />
          <span>{project.stack.join(' · ')}</span>
        </p>
      </div>
    </details>
  )
}
