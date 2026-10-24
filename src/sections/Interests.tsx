import { LitText } from '../components/LitText.tsx'
import { Reveal } from '../components/Reveal.tsx'
import { interests } from '../content/home.ts'

export function Interests() {
  return (
    <section className="sec lit" aria-labelledby="interests-title">
      <Reveal as="h2" className="lit__lead">
        <span id="interests-title">Right now I’m drawn to</span>
      </Reveal>
      <ul className="lit__list">
        {interests.map((interest) => (
          <li key={interest.name}>
            <LitText className="lit__name">{interest.name}</LitText>
            <span className="lit__note">{interest.note}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
