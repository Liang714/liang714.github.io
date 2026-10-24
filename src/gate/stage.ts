import type { Gsap } from '../lib/gsap.ts'
import { APPROVED_SAID, DECLINED_SAID, SILENCE_SAID, demoRulings } from '../playground/demo.ts'
import type { DemoRuling } from '../playground/demo.ts'

/** What the controller needs to tell the page. The page owns the words and the buttons; this owns the tokens. */
export interface StageView {
  /** The line under the gate. `announce` asks screen readers to read it out; automatic play stays silent. */
  say(text: string, announce: boolean): void
  /** Show or hide the Approve and Decline buttons. */
  asking(open: boolean): void
  autoplaying(active: boolean): void
  sendable(enabled: boolean): void
}

export interface StageElements {
  lane: HTMLElement
  gate: HTMLElement
  layer: HTMLElement
}

export interface Stage {
  start(): void
  send(): void
  approve(): void
  decline(): void
  pause(): void
  destroy(): void
}

type Choice = 'approve' | 'decline' | 'timeout' | 'cancel'

export const INTRO_TEXT = 'The model proposes an action. The gate rules on it.'
const REDUCED_TEXT = 'The model proposes an action. Press Send an action to see the gate rule on it.'
const AUTOPLAY_ENDED = 'Press Send an action to try another.'
const PAUSED = 'Paused. Press Send an action to try one yourself.'
const AUTOPLAY_COUNT = 4

/**
 * The first-screen demo: requests drift toward a gate and the project's own rule engine rules on each.
 * Allowed requests pass, denied ones bounce back, and held ones wait for the visitor. A few play on
 * their own and then stop; the visitor can pause them or take over. Under reduced motion nothing
 * travels: each ruling simply appears.
 */
export function createStage(gsap: Gsap, el: StageElements, view: StageView, options: { reduced: boolean }): Stage {
  const rulings = demoRulings()
  const tokens = new Set<HTMLElement>()
  let cursor = 0
  let manual = false
  let autoplayLeft = AUTOPLAY_COUNT
  let destroyed = false
  let heroVisible = true
  let timer = 0
  let settle: ((choice: Choice) => void) | null = null

  const next = (): DemoRuling => rulings[cursor++ % rulings.length] as DemoRuling

  const make = (ruling: DemoRuling): HTMLElement => {
    const token = document.createElement('div')
    token.className = 'tok'
    token.append(ruling.tool)
    if (ruling.target) {
      const detail = document.createElement('span')
      detail.textContent = ruling.target
      token.append(detail)
    }
    el.layer.append(token)
    tokens.add(token)
    return token
  }

  const remove = (token: HTMLElement): void => {
    gsap.killTweensOf(token)
    token.remove()
    tokens.delete(token)
  }

  const geometry = (token: HTMLElement) => {
    const center = el.gate.offsetLeft
    const half = el.gate.offsetWidth / 2
    return {
      start: -token.offsetWidth - 24,
      stop: center - half - token.offsetWidth - 10,
      past: center + half + 24,
      exit: el.lane.clientWidth + 40,
    }
  }

  const fly = (token: HTMLElement, to: number, speed = 280, ease = 'none') =>
    new Promise<void>((resolve) => {
      const distance = Math.abs(to - Number(gsap.getProperty(token, 'x')))
      gsap.to(token, { x: to, duration: Math.max(0.05, distance / speed), ease, onComplete: resolve })
    })

  const fade = (token: HTMLElement, delay = 0) =>
    new Promise<void>((resolve) => {
      gsap.to(token, { opacity: 0, duration: 0.5, delay, onComplete: resolve })
    })

  /** Waits for the visitor. While it waits, "Send an action" is off unless `blocking` is false. */
  const decision = (ms: number, blocking = true) =>
    new Promise<Choice>((resolve) => {
      view.asking(true)
      if (blocking) view.sendable(false)
      const timeout = window.setTimeout(() => finish('timeout'), ms)
      function finish(choice: Choice): void {
        window.clearTimeout(timeout)
        settle = null
        view.asking(false)
        view.sendable(true)
        resolve(choice)
      }
      settle = finish
    })

  async function propose(ruling: DemoRuling, user: boolean): Promise<void> {
    const token = make(ruling)
    const g = geometry(token)
    gsap.set(token, { x: g.start })
    if (user) view.say('Proposed. On its way to the gate.', true)
    await fly(token, g.stop)
    if (destroyed) return

    if (ruling.verdict === 'allow') {
      view.say(ruling.said, user)
      await fly(token, g.exit, 340, 'power1.in')
    } else if (ruling.verdict === 'deny') {
      token.classList.add('is-deny')
      view.say(ruling.said, user)
      await fly(token, g.stop - 90, 420, 'power3.out')
      await fade(token, 1.4)
    } else {
      token.classList.add('is-ask')
      view.say(ruling.said, user)
      const choice = await decision(user ? 12000 : 6000)
      if (destroyed) return
      token.classList.remove('is-ask')
      if (choice === 'approve') {
        view.say(APPROVED_SAID, true)
        await fly(token, g.exit, 340, 'power1.in')
      } else {
        token.classList.add('is-deny')
        view.say(choice === 'timeout' ? SILENCE_SAID : DECLINED_SAID, choice !== 'timeout' || user)
        await fly(token, g.stop - 90, 420, 'power3.out')
        await fade(token, 1.2)
      }
    }
    if (!destroyed) remove(token)
  }

  /** Reduced motion: no travel, the ruling just appears where it would have ended up. */
  function appear(ruling: DemoRuling, user: boolean): void {
    for (const token of [...tokens]) remove(token)
    const token = make(ruling)
    const g = geometry(token)
    if (ruling.verdict === 'allow') {
      gsap.set(token, { x: g.past })
      view.say(ruling.said, user)
    } else if (ruling.verdict === 'deny') {
      token.classList.add('is-deny')
      gsap.set(token, { x: g.stop - 90 })
      view.say(ruling.said, user)
    } else {
      token.classList.add('is-ask')
      gsap.set(token, { x: g.stop })
      view.say(ruling.said, user)
      void decision(60000, false).then((choice) => {
        if (destroyed || choice === 'cancel') return
        token.classList.remove('is-ask')
        if (choice === 'approve') {
          gsap.set(token, { x: g.past })
          view.say(APPROVED_SAID, true)
        } else {
          token.classList.add('is-deny')
          gsap.set(token, { x: g.stop - 90 })
          view.say(DECLINED_SAID, true)
        }
      })
    }
  }

  function stopAutoplay(): void {
    window.clearTimeout(timer)
    manual = true
    view.autoplaying(false)
  }

  function autoplay(): void {
    window.clearTimeout(timer)
    if (destroyed || options.reduced || manual) return
    if (autoplayLeft <= 0) {
      view.autoplaying(false)
      view.say(AUTOPLAY_ENDED, false)
      return
    }
    if (settle || !heroVisible || document.hidden) {
      timer = window.setTimeout(autoplay, 1200)
      return
    }
    autoplayLeft -= 1
    void propose(next(), false).then(() => {
      if (!destroyed) timer = window.setTimeout(autoplay, 1400)
    })
  }

  const observer =
    typeof IntersectionObserver === 'undefined'
      ? undefined
      : new IntersectionObserver(
          ([entry]) => {
            heroVisible = entry?.isIntersecting ?? true
          },
          { threshold: 0.2 },
        )
  const section = el.lane.closest('section')
  if (observer && section) observer.observe(section)

  return {
    start() {
      if (options.reduced) {
        view.autoplaying(false)
        appear(rulings.find((ruling) => ruling.verdict === 'ask') ?? (rulings[0] as DemoRuling), false)
        view.say(REDUCED_TEXT, false)
        return
      }
      view.autoplaying(true)
      timer = window.setTimeout(autoplay, 1300)
    },
    send() {
      stopAutoplay()
      if (options.reduced) {
        // Nothing travels, so a held request never blocks the next one: it is simply replaced.
        settle?.('cancel')
        appear(next(), true)
        return
      }
      if (settle) return
      void propose(next(), true)
    },
    approve() {
      settle?.('approve')
    },
    decline() {
      settle?.('decline')
    },
    pause() {
      stopAutoplay()
      view.say(PAUSED, true)
    },
    destroy() {
      destroyed = true
      window.clearTimeout(timer)
      observer?.disconnect()
      for (const token of [...tokens]) remove(token)
    },
  }
}
