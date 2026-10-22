/** A letter L inside a sign border: the whole identity is a sign. Same shape as the favicon. */
export function LogoMark({ size = 30 }: { size?: number }) {
  return (
    <svg className="logo-mark" viewBox="0 0 32 32" width={size} height={size} aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="7" fill="#f3f6f4" />
      <rect x="3.5" y="3.5" width="25" height="25" rx="4" fill="none" stroke="#0c0f10" strokeWidth="2" />
      <path d="M11.5 8.5v14h9.5" fill="none" stroke="#0c0f10" strokeWidth="4.2" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  )
}
