import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { site } from '../config/site.ts'
import { useScrollSpy } from '../hooks/useScrollSpy.ts'
import { onScrollFrame } from '../lib/scroll.ts'

const sectionIds = site.nav.map((item) => item.id)

/** Which nav item a detail page belongs to, so the bar still says where you are off the home page. */
function sectionOf(pathname: string): string | undefined {
  if (pathname.startsWith('/work')) return 'work'
  if (pathname.startsWith('/stack')) return 'stack'
  if (pathname.startsWith('/record')) return 'record'
  return undefined
}

/** Transparent over the first screen, solid once the page has moved. */
export function SiteHeader() {
  const { pathname } = useLocation()
  const onHome = pathname === '/'
  const spied = useScrollSpy(sectionIds, onHome)
  const active = onHome ? spied : sectionOf(pathname)
  const [solid, setSolid] = useState(false)

  useEffect(() => onScrollFrame(() => setSolid(window.scrollY > 24)), [])

  return (
    <header className={`bar${solid ? ' is-solid' : ''}`}>
      <Link className="bar__brand" to="/" translate="no">
        <span className="bar__full">{site.name}</span>
        <span className="bar__short">{site.shortName}</span>
      </Link>
      <nav aria-label="Primary">
        <ul>
          {site.nav.map((item) => (
            <li key={item.id}>
              <Link to={{ pathname: '/', hash: `#${item.id}` }} aria-current={active === item.id ? 'true' : undefined}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
