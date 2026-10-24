import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { site } from '../config/site.ts'
import { useFitName } from '../hooks/useFitName.ts'
import { scrollToTarget } from '../lib/scroll.ts'

/** The name returns at full width and is cropped by the bottom edge. */
export function SiteFooter() {
  const year = new Date().getFullYear()
  const box = useRef<HTMLParagraphElement | null>(null)
  const word = useRef<HTMLSpanElement | null>(null)
  useFitName(box, word, false)

  return (
    <footer className="foot">
      <div className="foot__row">
        <p>
          © {year} <span translate="no">{site.name}</span>
        </p>
        <button type="button" className="foot__top" onClick={() => scrollToTarget(0)}>
          Back to top
        </button>
      </div>
      <nav className="foot__nav" aria-label="Footer">
        <ul>
          <li>
            <Link to="/about/">About</Link>
          </li>
          <li>
            <Link to="/work/">Work</Link>
          </li>
          <li>
            <Link to="/stack/">Stack</Link>
          </li>
          <li>
            <Link to="/record/">Record</Link>
          </li>
          <li>
            <Link to="/gate/">The gate, in full</Link>
          </li>
          <li>
            <a href={site.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
          {site.linkedin && (
            <li>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
          )}
        </ul>
      </nav>
      <p ref={box} className="foot__word" aria-hidden="true" translate="no">
        <span ref={word}>{site.shortName}</span>
      </p>
    </footer>
  )
}
