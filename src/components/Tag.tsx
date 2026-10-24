import type { Tone } from '../content/types.ts'

/** What a tone looks like: a shape beside the words, so meaning never rides on colour alone. */
const shapeFor: Record<Tone, string> = {
  green: 'solid',
  yellow: 'ring',
  blue: 'ask',
  red: 'stop',
  neutral: 'dash',
}

export function Tag({ tone, children }: { tone: Tone; children: string }) {
  return (
    <span className={`tag tag--${shapeFor[tone]}`}>
      <span className="tag__mark" aria-hidden="true" />
      <span>{children}</span>
    </span>
  )
}

export function TagList({ tags, label }: { tags: readonly { label: string; tone: Tone }[]; label: string }) {
  return (
    <ul className="tag-list" aria-label={label}>
      {tags.map((tag) => (
        <li key={tag.label}>
          <Tag tone={tag.tone}>{tag.label}</Tag>
        </li>
      ))}
    </ul>
  )
}
