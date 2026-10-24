import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowIcon, ExternalIcon } from './Icon.tsx'

type Variant = 'primary' | 'text'

interface ButtonLinkProps {
  /** `primary` is the one orange action on a screen; `text` is an underlined link with an arrow. */
  variant?: Variant
  children: ReactNode
  /** In-app route, optionally with a hash: "/#work" or "/work/robin/". */
  to?: string
  /** Absolute URL, mailto: or a file path. */
  href?: string
  download?: boolean
  className?: string
}

const isExternal = (href: string): boolean => /^https?:\/\//.test(href)

export function ButtonLink({ variant = 'primary', children, to, href, download, className }: ButtonLinkProps) {
  const external = href !== undefined && isExternal(href)
  const classes = [variant === 'primary' ? 'btn' : 'textlink', className].filter(Boolean).join(' ')
  const inner = (
    <>
      <span>{children}</span>
      {external ? <ExternalIcon size={variant === 'primary' ? 20 : 16} /> : <ArrowIcon size={variant === 'primary' ? 20 : 16} />}
    </>
  )

  if (to !== undefined) {
    return (
      <Link className={classes} to={to}>
        {inner}
      </Link>
    )
  }
  return (
    <a
      className={classes}
      href={href}
      download={download}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {inner}
    </a>
  )
}
