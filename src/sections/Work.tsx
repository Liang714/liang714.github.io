import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ButtonLink } from '../components/ButtonLink.tsx'
import { homeProjects } from '../content/home.ts'
import { caseStudies } from '../content/projects/index.ts'
import { AgentExhibit, QuestExhibit, RobinExhibit } from './work/exhibits.tsx'

/**
 * Three names pass a square that holds still in the middle of the screen. The name crossing the
 * middle owns the square: it shows that project's result and its limit, and its two facts.
 */
export function Work() {
  const first = homeProjects[0]?.slug ?? ''
  const [current, setCurrent] = useState(first)
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
    <section id="work" className="sec work" aria-labelledby="work-title" tabIndex={-1}>
      <h2 id="work-title" className="work__title">
        Work
      </h2>
      <div className="work__list">
        <div className="held">
          <div className="held__frame">
            <AgentExhibit current={current === 'computer-agent'} />
            <QuestExhibit current={current === 'sidequest'} />
            <RobinExhibit current={current === 'robin'} />
          </div>
          <div className="held__facts">
            {homeProjects.map((project) => {
              const isCurrent = current === project.slug
              return (
                <div key={project.slug} className="facts-pair">
                  <div className={`fact fact--l${isCurrent ? ' is-current' : ''}`}>
                    <p className="fact__kind">{project.kind}</p>
                    <p>{project.line}</p>
                  </div>
                  <div className={`fact fact--r${isCurrent ? ' is-current' : ''}`}>
                    <p className="fact__kind">{project.status}</p>
                    <p>
                      {project.tags.join(', ')}
                      <br />
                      {project.repo}
                    </p>
                    <p>
                      <ButtonLink variant="text" to={`/work/${project.slug}/`}>
                        Read the case study
                      </ButtonLink>
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <ul ref={names} className="names">
          {homeProjects.map((project) => {
            const study = caseStudies.find((item) => item.slug === project.slug)
            return (
              <li
                key={project.slug}
                className={`name${current === project.slug ? ' is-current' : ''}`}
                data-slug={project.slug}
              >
                <Link to={`/work/${project.slug}/`} aria-label={`${study?.title ?? project.name}, case study`}>
                  {project.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
      <p className="work__more">
        <ButtonLink variant="text" to="/work/">
          All work, with the lab notes
        </ButtonLink>
      </p>
    </section>
  )
}
