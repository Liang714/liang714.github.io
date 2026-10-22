import { StateSign } from './StateSign.tsx'

/** Limits travel with results: each caveat gets the yellow caution triangle, never just a footnote. */
export function CautionList({ items, label }: { items: readonly string[]; label: string }) {
  return (
    <ul className="caution-list" aria-label={label}>
      {items.map((item) => (
        <li key={item}>
          <StateSign kind="caution" size={22} />
          <p>{item}</p>
        </li>
      ))}
    </ul>
  )
}
