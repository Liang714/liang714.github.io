import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Pictogram } from './Pictogram.tsx'

type Variant = 'primary' | 'secondary' | 'quiet'

interface ButtonLinkProps {
  variant?: Variant
  children: ReactNode
  /** In-app route, optionally with a hash: "/#work" or "/work/robin/". */
  to?: string
  /** Absolute URL, mailto: or a file path. */
  href?: string
  download?: boolean
  onClick?: () => void
  className?: string
}

const isExternal = (href: string): boolean => /^https?:\/\//.test(href)

/**
 * A sign with its arrow locked to the edge it points past: label on the left,
 * a separate arrow cell flush against the right edge.
 */
export function ButtonLink({ variant = 'primary', children, to, href, download, onClick, className }: ButtonLinkProps) {
  const external = href !== undefined && isExternal(href)
  const classes = ['btn', `btn--${variant}`, className].filter(Boolean).join(' ')
  const icon = download ? 'document' : external ? 'external' : 'arrow'
  const inner = (
    <>
      <span className="btn__label">{children}</span>
      <span className="btn__arrow">
        <Pictogram name={icon} size={22} />
      </span>
    </>
  )

  if (to !== undefined) {
    return (
      <Link className={classes} to={to} onClick={onClick}>
        {inner}
      </Link>
    )
  }
  return (
    <a
      className={classes}
      href={href}
      download={download}
      onClick={onClick}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {inner}
    </a>
  )
}
