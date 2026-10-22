import type { SignKind } from '../playground/types.ts'

interface StateSignProps {
  kind: SignKind
  size?: number
  className?: string
}

/**
 * The four verdict shapes, in the grammar of safety signage:
 * green rounded square = permitted, blue disc = a human decision, yellow triangle = caution,
 * red ring and slash = blocked. "na" and "idle" are neutral. Shape differs as well as colour.
 */
export function StateSign({ kind, size = 56, className }: StateSignProps) {
  return (
    <svg
      className={['state-sign', `state-sign--${kind}`, className].filter(Boolean).join(' ')}
      viewBox="0 0 56 56"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
    >
      {kind === 'permitted' && (
        <>
          <rect className="state-sign__fill" x="4" y="4" width="48" height="48" rx="9" />
          <path className="state-sign__mark" d="M15 29l9 9 17-20" />
        </>
      )}
      {kind === 'approval' && (
        <>
          <circle className="state-sign__fill" cx="28" cy="28" r="24" />
          <circle className="state-sign__mark-fill" cx="28" cy="20" r="6" />
          <path className="state-sign__mark-fill" d="M15 42c0-8 5-13 13-13s13 5 13 13z" />
        </>
      )}
      {kind === 'caution' && (
        <>
          <path className="state-sign__fill" d="M28 5L52 48H4z" />
          <path className="state-sign__mark" d="M28 20v14" />
          <circle className="state-sign__mark-fill" cx="28" cy="41" r="2.8" />
        </>
      )}
      {kind === 'blocked' && (
        <>
          <circle className="state-sign__face" cx="28" cy="28" r="22" />
          <circle className="state-sign__ring" cx="28" cy="28" r="22" />
          <path className="state-sign__slash" d="M13 13l30 30" />
        </>
      )}
      {kind === 'na' && (
        <>
          <rect className="state-sign__outline" x="6" y="6" width="44" height="44" rx="9" />
          <path className="state-sign__dash" d="M19 28h18" />
        </>
      )}
      {kind === 'idle' && <circle className="state-sign__dots" cx="28" cy="28" r="19" />}
    </svg>
  )
}

/** A very small version used inside tags and diagram nodes. */
export function SignGlyph({ tone }: { tone: 'green' | 'yellow' | 'blue' | 'red' | 'neutral' }) {
  const kind: SignKind =
    tone === 'green' ? 'permitted' : tone === 'yellow' ? 'caution' : tone === 'blue' ? 'approval' : tone === 'red' ? 'blocked' : 'na'
  return <StateSign kind={kind} size={18} />
}
