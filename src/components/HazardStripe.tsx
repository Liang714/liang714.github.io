/** Diagonal yellow-and-black barrier stripe: the marker for work that is not finished. Authored as an SVG pattern. */
export function HazardStripe() {
  return (
    <svg className="hazard" width="100%" height="14" aria-hidden="true" focusable="false">
      <defs>
        <pattern id="hazard-pattern" width="28" height="14" patternUnits="userSpaceOnUse" patternTransform="skewX(-35)">
          <rect width="14" height="14" fill="#ffc20e" />
          <rect x="14" width="14" height="14" fill="#0c0f10" />
        </pattern>
      </defs>
      <rect width="100%" height="14" fill="url(#hazard-pattern)" />
    </svg>
  )
}
