import { describe, expect, it } from 'vitest'
import { routeTable } from '../../scripts/seo.mjs'
import { site } from '../config/site.ts'
import { ROBIN_RESULT, homeProjects, interests } from './home.ts'
import { caseStudies } from './projects/index.ts'
import { record } from './record.ts'
import { stackGroups } from './stack.ts'

describe('home page content', () => {
  it('shows exactly the case studies, in the same order', () => {
    expect(homeProjects.map((project) => project.slug)).toEqual(caseStudies.map((study) => study.slug))
  })

  it("draws Robin's exhibit from the numbers in the case study", () => {
    const robin = caseStudies.find((study) => study.slug === 'robin')
    const text = robin?.result.text ?? ''
    const { baseline, best, queries } = ROBIN_RESULT
    expect(text).toContain(`${best.mean} ± ${best.spread}`)
    expect(text).toContain(`${baseline.mean} ± ${baseline.spread}`)
    expect(text).toContain(`${queries} unseen queries`)
  })

  it('pairs every interest with the work that backs it', () => {
    expect(new Set(interests.map((interest) => interest.name)).size).toBe(interests.length)
    for (const interest of interests) expect(interest.note.length).toBeGreaterThan(3)
  })

  it('keeps the sections the nav points to', () => {
    expect(site.nav.map((item) => item.id)).toEqual(['work', 'stack', 'record', 'contact'])
  })

  it('has a record row for every item the home page links to', () => {
    expect(record.length).toBeGreaterThanOrEqual(6)
    expect(stackGroups.length).toBeGreaterThanOrEqual(6)
  })
})

describe('route table', () => {
  const routes = routeTable()

  it('lists every page the app can show', () => {
    const paths = routes.map((route) => route.path)
    for (const path of ['', 'work/', 'about/', 'stack/', 'record/', 'gate/']) expect(paths).toContain(path)
    for (const study of caseStudies) expect(paths).toContain(`work/${study.slug}/`)
  })

  it('gives every page its own title and a snippet-sized description', () => {
    expect(new Set(routes.map((route) => route.title)).size).toBe(routes.length)
    for (const route of routes) {
      expect(route.description.length).toBeGreaterThan(20)
      expect(route.description.length).toBeLessThanOrEqual(260)
    }
  })

  it('names the lazy chunk of every page that has one', () => {
    for (const route of routes) {
      if (route.kind === 'page' || route.kind === 'case') expect(route.chunk).toMatch(/Page$/)
    }
  })
})
