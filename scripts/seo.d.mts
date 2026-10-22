export interface RouteMeta {
  path: string
  title: string
  description: string
  kind: 'home' | 'case' | '404'
}

export function siteUrl(): string
export function routeTable(): RouteMeta[]
export const notFoundRoute: RouteMeta
export function renderSeoBlock(route: RouteMeta): string
