import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion.ts'
import { loadGsap } from '../lib/gsap.ts'
import type { Verdict } from '../playground/demo.ts'
import { INTRO_TEXT, createStage } from './stage.ts'
import type { Stage } from './stage.ts'

/** Connects the first-screen demo to React: refs for the lane, and the state the buttons and the line need. */
export function useGateStage() {
  const lane = useRef<HTMLDivElement | null>(null)
  const gate = useRef<HTMLDivElement | null>(null)
  const layer = useRef<HTMLDivElement | null>(null)
  const stage = useRef<Stage | null>(null)
  const reduced = useReducedMotion()

  const [read, setRead] = useState({ text: INTRO_TEXT, announce: false })
  const [asking, setAsking] = useState(false)
  const [autoplaying, setAutoplaying] = useState(false)
  const [sendable, setSendable] = useState(true)
  // `count` changes with every ruling, so the word on the gate is a new element each time and its entrance replays.
  const [verdict, setVerdict] = useState<{ value: Verdict | null; count: number }>({ value: null, count: 0 })

  useEffect(() => {
    const elements = { lane: lane.current, gate: gate.current, layer: layer.current }
    if (!elements.lane || !elements.gate || !elements.layer) return
    let cancelled = false
    void loadGsap().then((gsap) => {
      if (cancelled || !elements.lane || !elements.gate || !elements.layer) return
      const controller = createStage(
        gsap,
        { lane: elements.lane, gate: elements.gate, layer: elements.layer },
        {
          say: (text, announce) => setRead({ text, announce }),
          asking: setAsking,
          autoplaying: setAutoplaying,
          sendable: setSendable,
          verdict: (value) => setVerdict((previous) => ({ value, count: previous.count + 1 })),
        },
        { reduced },
      )
      stage.current = controller
      controller.start()
    })
    return () => {
      cancelled = true
      stage.current?.destroy()
      stage.current = null
    }
  }, [reduced])

  return {
    lane,
    gate,
    layer,
    read,
    asking,
    autoplaying,
    sendable,
    verdict,
    send: useCallback(() => stage.current?.send(), []),
    approve: useCallback(() => stage.current?.approve(), []),
    decline: useCallback(() => stage.current?.decline(), []),
    pause: useCallback(() => stage.current?.pause(), []),
  }
}
