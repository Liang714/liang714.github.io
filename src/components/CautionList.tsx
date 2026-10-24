/** Limits travel with results: each caveat gets its own marked line, never a footnote. */
export function CautionList({ items, label }: { items: readonly string[]; label: string }) {
  return (
    <ul className="caution-list" aria-label={label}>
      {items.map((item) => (
        <li key={item}>
          <span className="caution-list__mark" aria-hidden="true" />
          <p>{item}</p>
        </li>
      ))}
    </ul>
  )
}
