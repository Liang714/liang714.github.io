import { Link } from 'react-router-dom'
import { ButtonLink } from '../components/ButtonLink.tsx'
import { PageHead } from '../components/PageHead.tsx'
import { site } from '../config/site.ts'
import { background, facts, interests } from '../content/home.ts'
import { usePageMeta } from '../hooks/usePageMeta.ts'

const rules = [
  {
    title: 'Define the load path.',
    body: 'Every action an agent takes should travel a path you can name. In my computer-use agent that path is six gates in a fixed order, and the model sits outside it.',
    link: { to: '/work/computer-agent/', label: 'See the broker' },
  },
  {
    title: 'State the factor of safety.',
    body: 'Say how much margin there is and where it ends. Each result on this site sits beside its sample size and its limits, and a result that is not significant says so.',
    link: { to: '/work/robin/', label: 'See a null result' },
  },
  {
    title: 'Keep the record.',
    body: 'An append-only log, a results file with the negative findings left in, a benchmark that prints its own coverage gaps. If it cannot be checked later, it is not finished.',
  },
  {
    title: 'Say how it was made.',
    body: site.aiAssistance,
  },
] as const

const description = `${site.name}: a student moving a civil engineer's habit of asking what has to hold into AI systems.`

export default function AboutPage() {
  usePageMeta(`About | ${site.name}`, description)
  return (
    <section className="page about-page" aria-labelledby="about-page-title">
      <PageHead title="About" titleId="about-page-title" lead={background} back={{ to: '/#about', label: 'Back to the home page' }} />

      <div className="about-page__grid">
        <div className="prose">
          <h2>Trained to ask what has to hold.</h2>
          <p>
            I studied civil engineering at National Taiwan University. The training leaves one habit: before anything is
            built, you ask what must be true for it to stand, and how you will know. Loads, margins and inspection
            records are how structures earn trust.
          </p>
          <p>
            I carried that habit into software and machine learning. I work in Python and C++, reach for SQL constantly,
            and use PyTorch, TensorFlow, scikit-learn, OpenCV, NumPy and Pandas. I’m drawn to LLM agents, computer vision
            and multimodal systems, and most of all to finishing them: the evaluation, the failure modes, the part that
            has to work on a bad day.
          </p>
          <p>
            I have studied in Malaysia, Taiwan and South Korea, and one of my current experiments asks how a personalised
            LLM judge behaves when a user’s history is in Korean, Chinese or Malay.
          </p>
          {site.portrait && (
            <img
              className="about-page__portrait"
              src={`${import.meta.env.BASE_URL}${site.portrait}`}
              alt={site.portraitAlt}
              width={320}
              height={400}
              loading="lazy"
              decoding="async"
            />
          )}
        </div>

        <aside className="about-page__side">
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
            <div>
              <dt>Interests</dt>
              <dd>{interests.map((interest) => interest.name).join(', ')}</dd>
            </div>
          </dl>
          <p className="about-page__links">
            <ButtonLink variant="text" href={`mailto:${site.email}`}>
              {site.email}
            </ButtonLink>
            <ButtonLink variant="text" href={site.github}>
              GitHub
            </ButtonLink>
            {site.linkedin && (
              <ButtonLink variant="text" href={site.linkedin}>
                LinkedIn
              </ButtonLink>
            )}
          </p>
        </aside>
      </div>

      <section className="rules" aria-labelledby="rules-title">
        <h2 id="rules-title">How I work</h2>
        <ul>
          {rules.map((rule) => (
            <li key={rule.title}>
              <h3>{rule.title}</h3>
              <p>{rule.body}</p>
              {'link' in rule && <Link to={rule.link.to}>{rule.link.label}</Link>}
            </li>
          ))}
        </ul>
      </section>
    </section>
  )
}
