import { Link } from 'react-router-dom'
import { CautionList } from '../components/CautionList.tsx'
import { PageHead } from '../components/PageHead.tsx'
import { RepoLine } from '../components/RepoLine.tsx'
import { ResultTable } from '../components/ResultTable.tsx'
import { Tag, TagList } from '../components/Tag.tsx'
import { site } from '../config/site.ts'
import { caseStudies, labProjects } from '../content/projects/index.ts'
import type { LabProject } from '../content/types.ts'
import { usePageMeta } from '../hooks/usePageMeta.ts'

const description =
  'Three case studies and three projects in progress, each with its sample sizes, its caveats and what is not built yet printed beside the results.'

export default function WorkIndexPage() {
  usePageMeta(`Work | ${site.name}`, description)
  return (
    <section className="page work-index" aria-labelledby="work-index-title">
      <PageHead title="Work" titleId="work-index-title" lead={description} back={{ to: '/#work', label: 'Back to the home page' }} />

      <ul className="case-list">
        {caseStudies.map((study) => (
          <li key={study.slug} className="case-row">
            <h2>
              <Link to={`/work/${study.slug}/`}>{study.title}</Link>
            </h2>
            <p className="case-row__headline">{study.headline}</p>
            <p>
              <strong>Measured.</strong> {study.result.text}
            </p>
            <p className="case-row__caveat">
              <span className="caution-list__mark" aria-hidden="true" />
              <span>{study.result.caveat}</span>
            </p>
            <TagList tags={study.tags} label={`Status of ${study.title}`} />
            <p className="case-row__meta">
              {study.period} · <RepoLine repo={study.repo} />
            </p>
          </li>
        ))}
      </ul>

      <section className="lab" aria-labelledby="lab-title">
        <h2 id="lab-title">In progress</h2>
        <p className="lab__lead">
          Not finished, and labelled that way. Each entry says what exists, what does not, and what the numbers can and
          cannot support.
        </p>
        <ul>
          {labProjects.map((project) => (
            <li key={project.slug}>
              <LabEntry project={project} />
            </li>
          ))}
        </ul>
      </section>
    </section>
  )
}

function LabEntry({ project }: { project: LabProject }) {
  return (
    <details className="lab-entry">
      <summary>
        <span className="lab-entry__title">{project.title}</span>
        <span className="lab-entry__period">{project.period}</span>
        <span className="acc__plus" aria-hidden="true" />
      </summary>
      <div className="lab-entry__body">
        <p className="lab-entry__status">
          <Tag tone="yellow">{project.status}</Tag>
        </p>
        <p className="lab-entry__question">{project.question}</p>

        <div className="lab-entry__cols">
          <div>
            <h3>What exists</h3>
            <ul className="mark-list">
              {project.exists.map((item) => (
                <li key={item}>
                  <span className="mark mark--solid" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Still to do</h3>
            <ul className="mark-list">
              {project.pending.map((item) => (
                <li key={item}>
                  <span className="mark mark--ring" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {project.table && <ResultTable table={project.table} />}

        <h3>Limits of this evidence</h3>
        <CautionList items={project.limits} label={`Limits for ${project.title}`} />

        {project.learned && (
          <p>
            <strong>What running it taught me.</strong> {project.learned}
          </p>
        )}

        <p className="lab-entry__meta">
          <RepoLine repo={project.repo} />
          <span>{project.stack.join(', ')}</span>
        </p>
      </div>
    </details>
  )
}
