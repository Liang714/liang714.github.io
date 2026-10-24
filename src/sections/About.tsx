import { ButtonLink } from '../components/ButtonLink.tsx'
import { Reveal } from '../components/Reveal.tsx'
import { background, backgroundLead, facts } from '../content/home.ts'

export function About() {
  return (
    <section id="about" className="sec about" aria-labelledby="about-title" tabIndex={-1}>
      <div className="about__side">
        <h2 id="about-title" className="side-title">
          About
        </h2>
        <dl className="facts">
          <div>
            <dt>Education</dt>
            <dd>{facts.education}</dd>
          </div>
          <div>
            <dt>Studied in</dt>
            <dd>{facts.studiedIn.join(', ')}</dd>
          </div>
          <div>
            <dt>Now</dt>
            <dd>{facts.now}</dd>
          </div>
        </dl>
      </div>
      <Reveal className="about__main">
        <p className="statement">
          <strong>{backgroundLead}</strong>
          {background.slice(backgroundLead.length)}
        </p>
        <ButtonLink variant="text" to="/about/">
          More about me
        </ButtonLink>
      </Reveal>
    </section>
  )
}
