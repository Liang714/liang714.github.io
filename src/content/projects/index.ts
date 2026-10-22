import type { CaseStudy, Project } from '../types.ts'
import { computerAgent } from './computer-agent.ts'
import { labProjects } from './lab.ts'
import { robin } from './robin.ts'
import { sidequest } from './sidequest.ts'

/** Order matters: the first entry is the flagship. */
export const caseStudies: readonly CaseStudy[] = [computerAgent, sidequest, robin]

export const allProjects: readonly Project[] = [...caseStudies, ...labProjects]

export { labProjects }

export function findCaseStudy(slug: string | undefined): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug)
}

export function nextCaseStudy(slug: string): CaseStudy {
  const index = caseStudies.findIndex((study) => study.slug === slug)
  return caseStudies[(index + 1) % caseStudies.length] as CaseStudy
}
