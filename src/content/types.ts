/** Shared content types. Pure data shapes: no React, so build scripts can import the content too. */

export type Tone = 'neutral' | 'green' | 'yellow' | 'blue' | 'red'

export type PictogramName =
  // gates
  | 'resolve'
  | 'permission'
  | 'risk'
  | 'approval'
  | 'budget'
  | 'execute'
  // projects
  | 'agent'
  | 'quest'
  | 'join'
  | 'tune'
  | 'translate'
  | 'assistant'
  // interface
  | 'arrow'
  | 'external'
  | 'lock'
  | 'mail'
  | 'branch'
  | 'document'
  | 'sun'
  | 'moon'
  | 'menu'
  | 'close'

export type Side = 'l' | 'r' | 't' | 'b'

export interface DiagramNode {
  readonly id: string
  readonly x: number
  readonly y: number
  readonly w: number
  readonly h: number
  readonly title: string
  readonly sub?: string
  readonly tone?: Tone
  readonly dashed?: boolean
}

export interface DiagramEdge {
  readonly from: string
  readonly to: string
  readonly fromSide: Side
  readonly toSide: Side
  readonly label?: string
  readonly dashed?: boolean
}

export interface DiagramGroup {
  readonly x: number
  readonly y: number
  readonly w: number
  readonly h: number
  readonly label: string
}

export interface DiagramSpec {
  readonly width: number
  readonly height: number
  readonly caption: string
  readonly nodes: readonly DiagramNode[]
  readonly edges: readonly DiagramEdge[]
  readonly groups?: readonly DiagramGroup[]
  /** The same diagram as an ordered list, for screen readers and anyone who prefers text. */
  readonly textAlternative: readonly string[]
}

export interface Fact {
  readonly label: string
  readonly value: string
}

export interface Tag {
  readonly label: string
  readonly tone: Tone
}

export interface ResultTable {
  readonly caption: string
  readonly columns: readonly string[]
  readonly rows: readonly (readonly string[])[]
}

export interface Note {
  readonly title: string
  readonly body: string
}

export interface Repo {
  readonly visibility: 'private' | 'public' | 'unpublished'
  readonly url?: string
}

interface ProjectBase {
  readonly slug: string
  readonly title: string
  readonly pictogram: PictogramName
  readonly period: string
  readonly summary: string
  readonly status: string
  readonly repo: Repo
  readonly stack: readonly string[]
}

export interface CaseStudy extends ProjectBase {
  readonly kind: 'case-study'
  readonly headline: string
  readonly tags: readonly Tag[]
  /** One measured result to lead with, and the caveat that must travel with it. */
  readonly result: { readonly text: string; readonly caveat: string }
  readonly problem: readonly string[]
  readonly built: readonly string[]
  readonly facts: readonly Fact[]
  readonly diagram: DiagramSpec
  readonly decisions: readonly Note[]
  readonly evaluation: {
    readonly method: string
    readonly tables: readonly ResultTable[]
    readonly limits: readonly string[]
  }
  readonly lessons: readonly Note[]
  readonly notBuilt: readonly string[]
}

export interface LabProject extends ProjectBase {
  readonly kind: 'lab'
  readonly question: string
  readonly exists: readonly string[]
  readonly pending: readonly string[]
  readonly table?: ResultTable
  readonly limits: readonly string[]
  readonly learned?: string
}

export type Project = CaseStudy | LabProject

export type Evidence = 'used' | 'building' | 'earlier'

export interface StackItem {
  readonly name: string
  readonly evidence: Evidence
  readonly where: string
}

export interface StackGroup {
  readonly title: string
  readonly items: readonly StackItem[]
}

export interface RecordEntry {
  readonly rev: string
  readonly date: string
  readonly title: string
  readonly detail: string
  readonly source: string
}
