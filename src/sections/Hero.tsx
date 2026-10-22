import { useEffect, useEffectEvent, useMemo, useState } from 'react'
import { ButtonLink } from '../components/ButtonLink.tsx'
import { GateRow } from '../components/GateRow.tsx'
import { Pictogram } from '../components/Pictogram.tsx'
import { SignTag } from '../components/SignTag.tsx'
import { site } from '../config/site.ts'
import { useReducedMotion } from '../hooks/useReducedMotion.ts'
import { HERO_SCENARIO_IDS, buildProposal, configFor, findScenario } from '../playground/scenarios.ts'
import { summarize } from '../playground/summary.ts'
import { useGateRunner } from '../playground/useGateRunner.ts'

interface HeroProps {
  scenarioId: string
  onScenarioChange: (id: string) => void
}

export function Hero({ scenarioId, onScenarioChange }: HeroProps) {
  const [interacted, setInteracted] = useState(false)

  return (
    <section className="hero" aria-labelledby="hero-title" tabIndex={-1}>
      <div className="wrap">
        <div className="gantry hero__top">
          <div className="gantry__beam" aria-hidden="true" />
          <span className="gantry__rod gantry__rod--l" aria-hidden="true" />
          <span className="gantry__rod gantry__rod--r" aria-hidden="true" />
          <div className="sign hero__panel hang">
            <h1 id="hero-title">Intelligent systems, built to be checked.</h1>
            <p className="hero__statement">
              I’m {site.name}, {site.roleSentence} who came to software through civil engineering. I design and build
              agent systems and applied-AI products the way structures get built: define the load path, set the safety
              factor, keep the record.
            </p>
            <div className="hero__actions">
              <div className="btn-row">
                <ButtonLink to="/#work">Explore my work</ButtonLink>
                <ButtonLink variant="secondary" to="/#contact">
                  Get in touch
                </ButtonLink>
              </div>
              <ul className="hero__links" aria-label="Find me elsewhere">
                <li>
                  <a href={site.github} target="_blank" rel="noopener noreferrer">
                    <Pictogram name="branch" size={20} />
                    GitHub
                  </a>
                </li>
                {site.linkedin && (
                  <li>
                    <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
                      <Pictogram name="external" size={20} />
                      LinkedIn
                    </a>
                  </li>
                )}
                {site.email && (
                  <li>
                    <a href={`mailto:${site.email}`}>
                      <Pictogram name="mail" size={20} />
                      {site.email}
                    </a>
                  </li>
                )}
              </ul>
            </div>
            <p className="strap hero__plate">
              {site.name} <span aria-hidden="true">/</span> {site.role}
            </p>
          </div>
        </div>

        <div className="gantry hero__bottom">
          <div className="gantry__beam" aria-hidden="true" />
          <span className="gantry__rod gantry__rod--l" aria-hidden="true" />
          <span className="gantry__rod gantry__rod--r" aria-hidden="true" />

          <HeroGates key={scenarioId} scenarioId={scenarioId} delay={interacted ? 160 : 1200} />

          <div className="hero__controls">
            <div className="hero__ask">
              <p className="hero__ask-title" id="hero-ask">
                Send a request through the six gates
              </p>
              <SignTag tone="yellow">Simulation of my agent’s safety broker. No model runs here.</SignTag>
            </div>
            <ul className="hero__chips" aria-labelledby="hero-ask">
              {HERO_SCENARIO_IDS.map((id) => {
                const scenario = findScenario(id)
                return (
                  <li key={id}>
                    <button
                      type="button"
                      className="chip-btn"
                      aria-pressed={id === scenarioId}
                      onClick={() => {
                        setInteracted(true)
                        onScenarioChange(id)
                      }}
                    >
                      {scenario.title}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <a className="hero__scroll" href="#work">
          <Pictogram name="arrow" size={20} className="hero__scroll-icon" />
          <span>Selected work below</span>
        </a>
      </div>
    </section>
  )
}

function HeroGates({ scenarioId, delay }: { scenarioId: string; delay: number }) {
  const scenario = findScenario(scenarioId)
  const config = useMemo(() => configFor(scenario), [scenario])
  const proposal = useMemo(() => buildProposal(scenario), [scenario])
  const runner = useGateRunner({ config, proposal, goal: scenario.goal }, 330)
  const reduced = useReducedMotion()

  // Send the request through once the signs have hung into place.
  const start = useEffectEvent(() => runner.run())
  useEffect(() => {
    const id = window.setTimeout(() => start(), reduced ? 0 : delay)
    return () => window.clearTimeout(id)
  }, [delay, reduced])

  const { trace } = runner
  const done = runner.waiting || runner.finished
  const verdict = trace && done ? summarize(trace) : `Sending: ${scenario.goal}`

  return (
    <>
      <GateRow stages={trace?.stages} revealed={runner.revealed} variant="hero" />
      <div className="hero-verdict">
        <p className="hero-verdict__text" role="status" aria-live="polite">
          <strong>{scenario.title}.</strong> {verdict}
        </p>
        {runner.waiting && (
          <div className="hero-verdict__actions">
            <button type="button" className="chip-btn chip-btn--blue" onClick={() => runner.decide(true)}>
              Approve
            </button>
            <button type="button" className="chip-btn chip-btn--plain" onClick={() => runner.decide(false)}>
              Decline
            </button>
          </div>
        )}
        {runner.finished && (
          <button type="button" className="chip-btn chip-btn--plain" onClick={runner.run}>
            Run again
          </button>
        )}
        <a className="hero-verdict__more" href="#gate-demo">
          Open the full demo
        </a>
      </div>
    </>
  )
}
