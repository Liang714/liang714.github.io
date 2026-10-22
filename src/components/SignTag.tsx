import type { Tone } from '../content/types.ts'
import { SignGlyph } from './StateSign.tsx'

interface SignTagProps {
  tone: Tone
  children: string
}

/** A short statement with its verdict shape beside it, so meaning never rides on colour alone. */
export function SignTag({ tone, children }: SignTagProps) {
  return (
    <span className={`sign-tag sign-tag--${tone}`}>
      <SignGlyph tone={tone} />
      <span>{children}</span>
    </span>
  )
}

export function SignTagList({ tags, label }: { tags: readonly { label: string; tone: Tone }[]; label: string }) {
  return (
    <ul className="sign-tag-list" aria-label={label}>
      {tags.map((tag) => (
        <li key={tag.label}>
          <SignTag tone={tag.tone}>{tag.label}</SignTag>
        </li>
      ))}
    </ul>
  )
}
