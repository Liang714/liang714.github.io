export interface RouteMeta {
  path: string
  title: string
  description: string
  kind: 'home' | 'page' | 'case' | '404'
  /** The lazy chunk this route loads, so the build can fetch it early. */
  chunk?: string
}

export function siteUrl(): string
export function routeTable(): RouteMeta[]
export const notFoundRoute: RouteMeta
export function renderSeoBlock(route: RouteMeta): string
