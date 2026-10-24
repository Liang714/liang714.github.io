import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ButtonLink } from '../components/ButtonLink.tsx'
import { homeProjects } from '../content/home.ts'
import type { HomeProject } from '../content/home.ts'
import { caseStudies } from '../content/projects/index.ts'
import type { CaseStudy } from '../content/types.ts'
import { useMediaQuery } from '../hooks/useMediaQuery.ts'
import { AgentExhibit, QuestExhibit, RobinExhibit } from './work/exhibits.tsx'

/** Below this width the held square has no room for its words, so each project is a card in a plain list. */
const STACKED = '(max-width: 900px)'

const studyOf = (project: HomeProject): CaseStudy | undefined => caseStudies.find((study) => study.slug === project.slug)

function Exhibit({ slug, current }: { slug: string; current: boolean }) {
  if (slug === 'computer-agent') return <AgentExhibit current={current} />
  if (slug === 'sidequest') return <QuestExhibit current={current} />
  return <RobinExhibit current={current} />
}

/** What the project is, in a line. */
function Summary({ project }: { project: HomeProject }) {
  return (
    <>
      <p className="fact__kind">{project.kind}</p>
      <p>{project.line}</p>
    </>
  )
}

/** The result and the limit that travels with it, taken word for word from the case study. */
function Evidence({ project }: { project: HomeProject }) {
  const study = studyOf(project)
  return (
    <>
      <p className="fact__kind">{project.status}</p>
      {study && (
        <>
          <p>
            <strong>Measured.</strong> {study.result.text}
          </p>
          <p className="fact__limit">
            <span className="caution-list__mark" aria-hidden="true" />
            <span>
              <strong>Limit.</strong> {study.result.caveat}
            </span>
          </p>
        </>
      )}
    </>
  )
}

const caseLink = (project: HomeProject) => `/work/${project.slug}/`
const ariaTitle = (project: HomeProject) => `${studyOf(project)?.title ?? project.name}, case study`

export function Work() {
  const stacked = useMediaQuery(STACKED)
  return (
    <section id="work" className="sec work" aria-labelledby="work-title" tabIndex={-1}>
      <h2 id="work-title" className="work__title">
        Work
      </h2>
      {stacked ? <Cards /> : <Pinned />}
      <p className="work__more">
        <ButtonLink variant="text" to="/work/">
          All work, with the lab notes
        </ButtonLink>
      </p>
    </section>
  )
}

/**
 * Wide screens: three names pass a square that holds still in the middle of the screen. The name
 * crossing the middle owns the square, which shows that project's picture; its facts sit either side.
 */
function Pinned() {
  const [current, setCurrent] = useState(homeProjects[0]?.slug ?? '')
  const names = useRef<HTMLUListElement | null>(null)

  useEffect(() => {
    const list = names.current
    if (!list || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const slug = (entry.target as HTMLElement).dataset.slug
          if (entry.isIntersecting && slug) setCurrent(slug)
        }
      },
      { rootMargin: '-50% 0px -50% 0px' },
    )
    list.querySelectorAll('[data-slug]').forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="work__list">
      <div className="held">
        <div className="held__frame">
          {homeProjects.map((project) => (
            <Exhibit key={project.slug} slug={project.slug} current={current === project.slug} />
          ))}
        </div>
        <div className="held__facts">
          {homeProjects.map((project) => {
            const isCurrent = current === project.slug
            return (
              <div key={project.slug} className="facts-pair">
                <div className={`fact fact--l${isCurrent ? ' is-current' : ''}`}>
                  <Summary project={project} />
                  <p>
                    <ButtonLink variant="text" to={caseLink(project)}>
                      Read the case study
                    </ButtonLink>
                  </p>
                </div>
                <div className={`fact fact--r${isCurrent ? ' is-current' : ''}`}>
                  <Evidence project={project} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <ul ref={names} className="names">
        {homeProjects.map((project) => (
          <li key={project.slug} className={`name${current === project.slug ? ' is-current' : ''}`} data-slug={project.slug}>
            <Link to={caseLink(project)} aria-label={ariaTitle(project)}>
              {project.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Narrow screens: name, picture, then the words, one project at a time. Nothing is pinned, so nothing is cut off. */
function Cards() {
  return (
    <ul className="cards">
      {homeProjects.map((project) => (
        <li key={project.slug} className="card">
          <h3 className="card__name">
            <Link to={caseLink(project)} aria-label={ariaTitle(project)}>
              {project.name}
            </Link>
          </h3>
          <div className="card__frame">
            <Exhibit slug={project.slug} current />
          </div>
          <div className="card__facts">
            <Summary project={project} />
            <Evidence project={project} />
            <p>
              <ButtonLink variant="text" to={caseLink(project)}>
                Read the case study
              </ButtonLink>
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}
