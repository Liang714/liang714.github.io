import { Reveal } from '../components/Reveal.tsx'
import { ArrowIcon } from '../components/Icon.tsx'
import { site } from '../config/site.ts'

const display = (url: string): string => url.replace(/^https?:\/\/(www\.)?/, '')

/** Rows set as display type, alternating two flat tones. Every row is a link; nothing needs a form. */
export function Contact() {
  const resume = site.resume ? `${import.meta.env.BASE_URL}${site.resume}` : ''
  return (
    <section id="contact" className="sec contact" aria-labelledby="contact-title" tabIndex={-1}>
      <Reveal className="crow crow--hello">
        <h2 id="contact-title">Say hello</h2>
        {site.email ? (
          <a className="round" href={`mailto:${site.email}`} aria-label={`Email ${site.name}`}>
            <ArrowIcon size={32} />
          </a>
        ) : (
          <a className="round" href={site.github} aria-label="Find me on GitHub">
            <ArrowIcon size={32} />
          </a>
        )}
      </Reveal>
      {site.email && (
        <Reveal as="p" className="crow">
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </Reveal>
      )}
      <Reveal as="p" className="crow">
        <a href={site.github} target="_blank" rel="noopener noreferrer">
          {display(site.github)}
        </a>
      </Reveal>
      {site.linkedin && (
        <Reveal as="p" className="crow">
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
            {display(site.linkedin)}
          </a>
        </Reveal>
      )}
      {resume && (
        <Reveal as="p" className="crow">
          <a href={resume} download>
            Résumé (PDF)
          </a>
        </Reveal>
      )}
    </section>
  )
}
