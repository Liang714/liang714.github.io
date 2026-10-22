import { Link } from 'react-router-dom'
import { Pictogram } from '../components/Pictogram.tsx'
import { Reveal } from '../components/Reveal.tsx'
import { site } from '../config/site.ts'
import type { PictogramName } from '../content/types.ts'

interface Rule {
  pictogram: PictogramName
  title: string
  body: string
  link?: { to: string; label: string }
}

const rules: readonly Rule[] = [
  {
    pictogram: 'resolve',
    title: 'Define the load path.',
    body: 'Every action an agent takes should travel a path you can name. In my computer-use agent that path is six gates in a fixed order, and the model sits outside it.',
    link: { to: '/work/computer-agent/', label: 'See the broker' },
  },
  {
    pictogram: 'risk',
    title: 'State the factor of safety.',
    body: 'Say how much margin there is and where it ends. Each result on this site sits beside its sample size and its limits, and a result that is not significant says so.',
    link: { to: '/work/robin/', label: 'See a null result' },
  },
  {
    pictogram: 'document',
    title: 'Keep the record.',
    body: 'An append-only log, a results file with the negative findings left in, a benchmark that prints its own coverage gaps. If it cannot be checked later, it is not finished.',
  },
  {
    pictogram: 'assistant',
    title: 'Say how it was made.',
    body: site.aiAssistance,
  },
]

export function About() {
  return (
    <section id="about" className="band band--alt" aria-labelledby="about-title" tabIndex={-1}>
      <div className="wrap about">
        <Reveal className="about__story">
          <h2 id="about-title">Trained to ask what has to hold.</h2>
          <div className="about__text">
            <p>
              I studied civil engineering at National Taiwan University. The training leaves one habit: before anything
              is built, you ask what must be true for it to stand, and how you will know. Loads, margins and inspection
              records are how structures earn trust.
            </p>
            <p>
              I carried that habit into software and machine learning. I work in Python and C++, reach for SQL
              constantly, and use PyTorch, TensorFlow, scikit-learn, OpenCV, NumPy and Pandas. I’m drawn to LLM agents,
              computer vision and multimodal systems, and most of all to finishing them: the evaluation, the failure
              modes, the part that has to work on a bad day.
            </p>
            <p>
              I have studied and worked across Malaysia, Taiwan and South Korea, and one of my current experiments asks
              how a personalised LLM judge behaves when a user’s history is in Korean, Chinese or Malay.
            </p>
          </div>
          {site.portrait && (
            <img
              className="about__portrait"
              src={`${import.meta.env.BASE_URL}${site.portrait}`}
              alt={site.portraitAlt}
              width={320}
              height={400}
              loading="lazy"
              decoding="async"
            />
          )}
        </Reveal>

        <Reveal className="about__rules" delay={90}>
          <h3>How I work</h3>
          <ul className="rule-list">
            {rules.map((rule) => (
              <li key={rule.title} className="rule">
                <span className="rule__icon" aria-hidden="true">
                  <Pictogram name={rule.pictogram} size={30} />
                </span>
                <div>
                  <h4>{rule.title}</h4>
                  <p>{rule.body}</p>
                  {rule.link && <Link to={rule.link.to}>{rule.link.label}</Link>}
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
