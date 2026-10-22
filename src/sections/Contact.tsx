import { ButtonLink } from '../components/ButtonLink.tsx'
import { Pictogram } from '../components/Pictogram.tsx'
import { Reveal } from '../components/Reveal.tsx'
import { site } from '../config/site.ts'

export function Contact() {
  const resumeHref = site.resume ? `${import.meta.env.BASE_URL}${site.resume}` : ''
  return (
    <section id="contact" className="band contact" aria-labelledby="contact-title" tabIndex={-1}>
      <div className="wrap">
        <Reveal className="gantry">
          <div className="gantry__beam" aria-hidden="true" />
          <span className="gantry__rod gantry__rod--l" aria-hidden="true" />
          <span className="gantry__rod gantry__rod--r" aria-hidden="true" />
          <div className="sign contact__sign">
            <h2 id="contact-title">If you build intelligent systems and care how they fail, I’d like to hear about it.</h2>

            <div className="btn-row">
              {site.email ? (
                <ButtonLink href={`mailto:${site.email}`}>Email me</ButtonLink>
              ) : (
                <ButtonLink href={site.github}>Find me on GitHub</ButtonLink>
              )}
              {site.email && (
                <ButtonLink variant="secondary" href={site.github}>
                  GitHub
                </ButtonLink>
              )}
              {site.linkedin && (
                <ButtonLink variant="secondary" href={site.linkedin}>
                  LinkedIn
                </ButtonLink>
              )}
              {resumeHref && (
                <ButtonLink variant="secondary" href={resumeHref} download>
                  Résumé
                </ButtonLink>
              )}
            </div>

            {site.email && (
              <p className="contact__address">
                <Pictogram name="mail" size={22} />
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
