import { Link } from 'react-router-dom'
import { site } from '../config/site.ts'
import { Pictogram } from './Pictogram.tsx'

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="site-footer__grid">
          <div>
            <p className="site-footer__name">{site.name}</p>
            <p className="site-footer__role">
              {site.identity.split(' | ').map((part, index) => (
                <span key={part}>
                  {index > 0 && (
                    <span className="site-footer__sep" aria-hidden="true">
                      ·
                    </span>
                  )}
                  {part}
                </span>
              ))}
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="site-footer__links">
              {site.nav.map((item) => (
                <li key={item.id}>
                  <Link to={{ pathname: '/', hash: `#${item.id}` }}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="site-footer__links" aria-label="Elsewhere">
            <li>
              <a href={site.github} target="_blank" rel="noopener noreferrer">
                <Pictogram name="branch" size={22} />
                GitHub
              </a>
            </li>
            {site.linkedin && (
              <li>
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
                  <Pictogram name="external" size={22} />
                  LinkedIn
                </a>
              </li>
            )}
            {site.email && (
              <li>
                <a href={`mailto:${site.email}`}>
                  <Pictogram name="mail" size={22} />
                  Email
                </a>
              </li>
            )}
          </ul>
        </div>

        <p className="site-footer__small">
          © {year} {site.name}. Built with React, TypeScript and Vite. Figures come from project documents and result
          files, printed beside their limits.
        </p>
      </div>
    </footer>
  )
}
