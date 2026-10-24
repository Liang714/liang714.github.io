import type gsapDefault from 'gsap'

export type Gsap = typeof gsapDefault

let loading: Promise<Gsap> | undefined

/** GSAP is only needed once the page has painted, so it loads on demand instead of blocking the first screen. */
export function loadGsap(): Promise<Gsap> {
  loading ??= import('gsap').then((module) => module.default)
  return loading
}
