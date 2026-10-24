import { Outlet } from 'react-router-dom'
import { RouteEffects } from './RouteEffects.tsx'
import { SiteFooter } from './SiteFooter.tsx'
import { SiteHeader } from './SiteHeader.tsx'
import { SmoothScroll } from './SmoothScroll.tsx'

export function Layout() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <SiteFooter />
      <RouteEffects />
      <SmoothScroll />
    </>
  )
}
