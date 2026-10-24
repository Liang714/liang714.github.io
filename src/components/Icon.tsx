interface IconProps {
  size?: number
  className?: string
}

const base = {
  viewBox: '0 0 48 48',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
} as const

/** Three drawn icons, one stroke weight. Always decorative: the text beside them carries the meaning. */
export function ArrowIcon({ size = 20, className }: IconProps) {
  return (
    <svg {...base} width={size} height={size} className={className}>
      <path d="M6 24h34M27 11l13 13-13 13" />
    </svg>
  )
}

export function ExternalIcon({ size = 16, className }: IconProps) {
  return (
    <svg {...base} width={size} height={size} className={className}>
      <path d="M19 10H9v29h29V29M28 8h12v12M40 8L22 26" />
    </svg>
  )
}
