import type { ReactNode } from 'react'
import type { PictogramName } from '../content/types.ts'

/**
 * One authored pictogram set on a 48-unit grid, one heavy stroke, round joins.
 * Drawn for this site; no third-party icon pack.
 */
const glyphs: Record<PictogramName, ReactNode> = {
  // gates
  resolve: (
    <>
      <circle cx="21" cy="21" r="12" />
      <path d="M30 30l11 11" />
      <path d="M16 21h10M21 16v10" />
    </>
  ),
  permission: (
    <>
      <rect x="10" y="22" width="28" height="19" rx="4" />
      <path d="M16 22v-6a8 8 0 0 1 16 0v6" />
      <circle cx="24" cy="31" r="2.5" fill="currentColor" />
    </>
  ),
  risk: (
    <>
      <path d="M7 37a17 17 0 0 1 34 0" />
      <path d="M24 37l9-13" />
      <circle cx="24" cy="37" r="3" fill="currentColor" />
      <path d="M12 26l3 2M24 17v3M36 26l-3 2" />
    </>
  ),
  approval: (
    <>
      <circle cx="19" cy="14" r="6" />
      <path d="M6 39c0-8 5-13 13-13 3 0 5 .6 7 1.8" />
      <path d="M28 33l5 5 10-11" />
    </>
  ),
  budget: (
    <>
      <circle cx="24" cy="28" r="14" />
      <path d="M19 8h10M24 8v6" />
      <path d="M24 28v-8M24 28l6 4" />
    </>
  ),
  execute: <path d="M27 5L11 27h12l-3 16 17-23H25z" fill="currentColor" />,
  // projects
  agent: (
    <>
      <path d="M24 5l16 6v11c0 10-7 17-16 21C15 39 8 32 8 22V11z" />
      <path d="M16 24l6 6 11-12" />
    </>
  ),
  quest: (
    <>
      <path d="M24 43S11 31 11 20a13 13 0 0 1 26 0c0 11-13 23-13 23z" />
      <circle cx="24" cy="20" r="5" />
    </>
  ),
  join: (
    <>
      <circle cx="24" cy="9" r="5" />
      <circle cx="10" cy="38" r="5" />
      <circle cx="38" cy="38" r="5" />
      <path d="M21.5 13.5L12 33.5M26.5 13.5L36 33.5M15.5 38h17" />
    </>
  ),
  tune: (
    <>
      <path d="M18 6h12M20 6v14L8.5 38a3.5 3.5 0 0 0 3 5.5h25a3.5 3.5 0 0 0 3-5.5L28 20V6" />
      <path d="M14 32h20" />
    </>
  ),
  translate: (
    <>
      <circle cx="24" cy="24" r="17" />
      <ellipse cx="24" cy="24" rx="7.5" ry="17" />
      <path d="M7 24h34" />
    </>
  ),
  assistant: (
    <>
      <path d="M7 9h34v24H23l-9 9v-9H7z" />
      <path d="M16 19h16M16 25h9" />
    </>
  ),
  // interface
  arrow: <path d="M6 24h34M27 11l13 13-13 13" />,
  external: <path d="M19 10H9v29h29V29M28 8h12v12M40 8L22 26" />,
  lock: (
    <>
      <rect x="10" y="22" width="28" height="19" rx="4" />
      <path d="M16 22v-6a8 8 0 0 1 16 0v6" />
    </>
  ),
  mail: (
    <>
      <rect x="6" y="11" width="36" height="26" rx="3" />
      <path d="M7 14l17 13 17-13" />
    </>
  ),
  branch: (
    <>
      <circle cx="14" cy="10" r="4.5" />
      <circle cx="14" cy="38" r="4.5" />
      <circle cx="35" cy="18" r="4.5" />
      <path d="M14 14.5v19M35 22.5c0 8-12 6-20 11" />
    </>
  ),
  document: (
    <>
      <path d="M12 5h17l9 9v29H12z" />
      <path d="M29 5v9h9M18 25h14M18 33h14" />
    </>
  ),
  sun: (
    <>
      <circle cx="24" cy="24" r="8" />
      <path d="M24 5v5M24 38v5M5 24h5M38 24h5M10.6 10.6l3.5 3.5M33.9 33.9l3.5 3.5M10.6 37.4l3.5-3.5M33.9 14.1l3.5-3.5" />
    </>
  ),
  moon: <path d="M39 29A17 17 0 1 1 19 9a13 13 0 0 0 20 20z" />,
  menu: <path d="M8 14h32M8 24h32M8 34h32" />,
  close: <path d="M11 11l26 26M37 11L11 37" />,
}

interface PictogramProps {
  name: PictogramName
  size?: number
  /** Provide a title only when the pictogram carries meaning by itself. Otherwise it is decorative. */
  title?: string
  className?: string
}

export function Pictogram({ name, size = 24, title, className }: PictogramProps) {
  return (
    <svg
      className={['pictogram', className].filter(Boolean).join(' ')}
      viewBox="0 0 48 48"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {glyphs[name]}
    </svg>
  )
}
