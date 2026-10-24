import { ROBIN_RESULT } from '../../content/home.ts'
import { demoRuling } from '../../playground/demo.ts'
import { STAGES } from '../../playground/types.ts'
import type { StageStatus } from '../../playground/types.ts'

interface ExhibitProps {
  current: boolean
}

const cls = (current: boolean, name: string): string => `ex ex--${name}${current ? ' is-current' : ''}`
const sentence = (word: string): string => word.charAt(0) + word.slice(1).toLowerCase()

/** Marks that carry state by shape and word, never by colour alone. */
const markFor: Record<StageStatus, string> = {
  pass: 'st st--pass',
  warn: 'st st--warn',
  wait: 'st st--wait',
  block: 'st st--block',
  idle: 'st st--idle',
  skipped: 'st st--skipped',
}

/** A real ruling from the project's rule engine: twelve files proposed for deletion, held for a person. */
export function AgentExhibit({ current }: ExhibitProps) {
  const ruling = demoRuling('delete-bulk')
  return (
    <figure
      className={cls(current, 'agent')}
      data-ui
      role="img"
      aria-label="A simulated ruling: a request to delete 12 files is held for a person, and nothing has run."
    >
      <div className="ex__top">
        <p className="ex__title">The model proposed</p>
        <p className="ex__code">
          {ruling.tool}
          <br />
          {ruling.target}
        </p>
      </div>
      <div className="ex__bottom">
        <ol className="ex__stages">
          {ruling.stages.map((stage, index) => (
            <li key={stage.id} className={markFor[stage.status]}>
              <span className="st__mark" aria-hidden="true" />
              <span className="st__name">{STAGES[index]?.label ?? stage.id}</span>
              <span className="st__tag">{sentence(stage.tag)}</span>
            </li>
          ))}
        </ol>
        <p className="ex__verdict">Held. Nothing has run.</p>
        <figcaption className="ex__note">Simulated with the project’s own rules</figcaption>
      </div>
    </figure>
  )
}

/** An example screen, labelled as an example: the app drafts, a person approves. */
export function QuestExhibit({ current }: ExhibitProps) {
  return (
    <figure
      className={cls(current, 'quest')}
      data-ui
      role="img"
      aria-label="An example screen: the app drafts a quest and a person approves or changes it."
    >
      <div className="ex__top">
        <p className="ex__title">Drafted for you</p>
        <p className="ex__big">Sunset walk to the river market</p>
        <p className="ex__code">45&nbsp;minutes, free, outdoors</p>
      </div>
      <div className="ex__bottom">
        <p className="ex__buttons">
          <span className="ex__btn ex__btn--solid">Approve</span>
          <span className="ex__btn">Change</span>
        </p>
        <figcaption className="ex__note">Example content. A local model drafts, a person approves.</figcaption>
      </div>
    </figure>
  )
}

const SCALE = 20 // viewBox units per query: 15 queries fill the 300-unit chart

/** The result and its limit, drawn together: the gap is about one standard deviation, so it is not significant. */
export function RobinExhibit({ current }: ExhibitProps) {
  const { baseline, best, queries } = ROBIN_RESULT
  const bar = (mean: number, spread: number, y: number, name: string) => (
    <g className={`cb cb--${name}`}>
      <rect x={0} y={y} width={mean * SCALE} height={22} />
      <path
        d={`M${(mean - spread) * SCALE} ${y + 11}h${2 * spread * SCALE}M${(mean - spread) * SCALE} ${y + 4}v14M${(mean + spread) * SCALE} ${y + 4}v14`}
      />
    </g>
  )
  return (
    <figure
      className={cls(current, 'robin')}
      data-ui
      role="img"
      aria-label={`A results chart: regressions out of ${queries} unseen queries, ${baseline.mean} plus or minus ${baseline.spread} for the baseline against ${best.mean} plus or minus ${best.spread} for the best variant. Not statistically significant.`}
    >
      <div className="ex__top">
        <p className="ex__title">Regressions out of {queries} unseen queries</p>
        <p className="ex__rows">
          <span>Baseline</span>
          <b>
            {baseline.mean} ± {baseline.spread}
          </b>
        </p>
        <p className="ex__rows">
          <span>Best variant</span>
          <b>
            {best.mean} ± {best.spread}
          </b>
        </p>
      </div>
      <div className="ex__bottom">
        <svg className="ex__chart" viewBox="0 0 300 56" aria-hidden="true" focusable="false">
          {bar(baseline.mean, baseline.spread, 2, 'base')}
          {bar(best.mean, best.spread, 32, 'best')}
        </svg>
        <p className="ex__verdict">Not significant: one standard deviation, three seeds.</p>
      </div>
    </figure>
  )
}
