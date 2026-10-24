import { useEffect, useRef } from 'react'
import { ButtonLink } from '../components/ButtonLink.tsx'
import { site } from '../config/site.ts'
import { heroLine, heroWhat } from '../content/home.ts'
import { useGateStage } from '../gate/useGateStage.ts'
import { useFitName } from '../hooks/useFitName.ts'

/** The one word shown on the gate. The line above it gives the reason. */
const VERDICT_WORD = { allow: 'Allowed', ask: 'Held', deny: 'Denied' } as const

/**
 * The name is the headline, and the gate is the picture: a visitor sends an action and watches the
 * project's own rule engine allow it, deny it, or hold it for them.
 */
export function Hero() {
  const { lane, gate, layer, read, asking, autoplaying, sendable, verdict, send: sendAction, approve: approveAction, decline, pause } = useGateStage()
  const monument = useRef<HTMLHeadingElement | null>(null)
  const word = useRef<HTMLSpanElement | null>(null)
  const send = useRef<HTMLButtonElement | null>(null)
  const approve = useRef<HTMLButtonElement | null>(null)
  const takeover = useRef(false)
  useFitName(monument, word, true)

  // When the visitor sends a request that needs them, put focus on the decision; hand it back after.
  useEffect(() => {
    if (asking && takeover.current) approve.current?.focus()
    if (!asking && takeover.current) {
      takeover.current = false
      send.current?.focus()
    }
  }, [asking])

  return (
    <section id="top" className="hero" tabIndex={-1} aria-label="Introduction">
      <div className="stage" data-ui>
        <div className="stage__top">
          <div className="hud">
            <p className="hud__read" aria-live={read.announce ? 'polite' : 'off'}>
              {read.text}
            </p>
            <p className="hud__actions">
              <button
                ref={send}
                type="button"
                className="hud__btn"
                disabled={!sendable}
                onClick={() => {
                  takeover.current = true
                  sendAction()
                }}
              >
                Send an action
              </button>
              {autoplaying && (
                <button type="button" className="hud__btn hud__btn--quiet" onClick={pause}>
                  Pause demo
                </button>
              )}
              {asking && (
                <span className="hud__ask">
                  <button ref={approve} type="button" className="hud__btn hud__btn--ask" onClick={approveAction}>
                    Approve
                  </button>
                  <button type="button" className="hud__btn hud__btn--ask" onClick={decline}>
                    Decline
                  </button>
                </span>
              )}
            </p>
          </div>
          <ButtonLink to="/#work">See my work</ButtonLink>
        </div>

        <div ref={lane} className="lane" aria-hidden="true">
          <div className="lane__floor" />
          <div ref={gate} className="gate">
            <span className="gate__post" />
            <span className="gate__post" />
            <span className="gate__beam" />
            {verdict.value ? (
              <span key={verdict.count} className={`gate__verdict gate__verdict--${verdict.value}`}>
                {VERDICT_WORD[verdict.value]}
              </span>
            ) : (
              <span className="gate__name">Safety gate</span>
            )}
          </div>
          <div ref={layer} className="lane__tokens" />
        </div>
      </div>

      <h1 ref={monument} className="monument" translate="no" aria-label={`${site.name}, ${site.role}`}>
        <span ref={word} className="monument__word">
          {site.shortName}
        </span>
      </h1>
      <div className="hero__copy">
        <p className="hero__sentence">
          {site.name}. {heroLine}
        </p>
        <p className="hero__what">{heroWhat}</p>
      </div>
    </section>
  )
}
