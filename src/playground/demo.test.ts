import { describe, expect, it } from 'vitest'
import { DEMO_ORDER, SCENARIO_IDS, demoRulings } from './demo.ts'

const expected = {
  list: 'allow',
  traversal: 'deny',
  rename: 'ask',
  'unknown-tool': 'deny',
  'delete-bulk': 'ask',
} as const

describe('first-screen demo rulings', () => {
  const rulings = demoRulings()

  it('uses only real scenarios', () => {
    for (const id of DEMO_ORDER) expect(SCENARIO_IDS).toContain(id)
    expect(rulings.map((ruling) => ruling.id)).toEqual([...DEMO_ORDER])
  })

  it('gets every verdict from the rule engine, not from the copy', () => {
    for (const ruling of rulings) expect(ruling.verdict).toBe(expected[ruling.id as keyof typeof expected])
  })

  it('says what the engine decided', () => {
    const lead = { allow: 'Allowed.', deny: 'Denied.', ask: 'Held.' } as const
    for (const ruling of rulings) expect(ruling.said.startsWith(lead[ruling.verdict])).toBe(true)
  })

  it('shows the stage that stopped each denied or held request', () => {
    for (const ruling of rulings) {
      const statuses = ruling.stages.map((stage) => stage.status)
      if (ruling.verdict === 'deny') expect(statuses).toContain('block')
      if (ruling.verdict === 'ask') expect(statuses).toContain('wait')
      if (ruling.verdict === 'allow') expect(statuses.every((status) => status === 'pass')).toBe(true)
    }
  })

  it('labels every request in short plain words that fit beside the gate on a phone', () => {
    for (const ruling of rulings) {
      expect(ruling.label.length).toBeGreaterThan(5)
      expect(ruling.label.length).toBeLessThanOrEqual(22)
      expect(ruling.label).not.toMatch(/[./_]/)
    }
  })

  it('keeps the bulk-delete claim true: twelve files reach critical risk', () => {
    const bulk = rulings.find((ruling) => ruling.id === 'delete-bulk')
    expect(bulk?.risk).toBe('critical')
    expect(bulk?.said).toContain('12 files')
  })
})
