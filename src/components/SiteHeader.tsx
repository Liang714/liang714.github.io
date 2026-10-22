import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { site } from '../config/site.ts'
import { useScrollSpy } from '../hooks/useScrollSpy.ts'
import { useTheme } from '../hooks/useTheme.ts'
import { LogoMark } from './LogoMark.tsx'
import { Pictogram } from './Pictogram.tsx'

const sectionIds = site.nav.map((item) => item.id)

/** The sticky sign band. The followed destination stays highlighted as the page scrolls. */
export function SiteHeader() {
  const { pathname } = useLocation()
  const onHome = pathname === '/'
  const active = useScrollSpy(sectionIds, onHome)
  const { theme, toggle } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement | null>(null)

  // Escape closes the open menu and hands focus back to the button that opened it.
  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButton.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  const links = site.nav.map((item) => (
    <li key={item.id}>
      <Link
        className="sign-band__link"
        to={{ pathname: '/', hash: `#${item.id}` }}
        aria-current={active === item.id ? 'true' : undefined}
        onClick={() => setMenuOpen(false)}
      >
        {item.label}
        {menuOpen && <Pictogram name="arrow" size={20} />}
      </Link>
    </li>
  ))

  return (
    <header className="sign-band">
      <div className="wrap sign-band__inner">
        <Link className="brand" to="/" onClick={() => setMenuOpen(false)}>
          <LogoMark />
          <span className="brand__full">{site.name}</span>
          <span className="brand__short">{site.shortName}</span>
          <span className="brand__role">{site.role}</span>
        </Link>

        <nav className="sign-band__nav" aria-label="Primary">
          <ul className="sign-band__list">{links}</ul>
        </nav>

        <div className="sign-band__tools">
          <button type="button" className="band-btn" aria-pressed={theme === 'dark'} onClick={toggle}>
            <Pictogram name={theme === 'dark' ? 'moon' : 'sun'} size={20} />
            <span>{theme === 'dark' ? 'Night' : 'Day'}</span>
            <span className="visually-hidden">theme. Press to switch.</span>
          </button>
          <button
            ref={menuButton}
            type="button"
            className="band-btn sign-band__menu-btn"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Pictogram name={menuOpen ? 'close' : 'menu'} size={20} />
            <span>Menu</span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-nav" className="sign-band__panel" aria-label="Primary">
          <div className="wrap">
            <ul>{links}</ul>
          </div>
        </nav>
      )}
    </header>
  )
}
