import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowIcon } from './Icon.tsx'

interface PageHeadProps {
  title: string
  titleId: string
  lead?: ReactNode
  back?: { to: string; label: string }
  children?: ReactNode
}

/** The top of every detail page: a way back, the page's one h1 set large, and one plain sentence. */
export function PageHead({ title, titleId, lead, back, children }: PageHeadProps) {
  return (
    <header className="page-head">
      {back && (
        <nav aria-label="Breadcrumb">
          <Link className="back-link" to={back.to}>
            <ArrowIcon size={16} className="back-link__icon" />
            {back.label}
          </Link>
        </nav>
      )}
      <h1 id={titleId}>{title}</h1>
      {lead && <p className="page-head__lead">{lead}</p>}
      {children}
    </header>
  )
}
