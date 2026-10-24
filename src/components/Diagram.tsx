import { useId } from 'react'
import type { DiagramEdge, DiagramNode, DiagramSpec, Side } from '../content/types.ts'

interface Point {
  x: number
  y: number
}

function anchor(node: DiagramNode, side: Side): Point {
  switch (side) {
    case 'l':
      return { x: node.x, y: node.y + node.h / 2 }
    case 'r':
      return { x: node.x + node.w, y: node.y + node.h / 2 }
    case 't':
      return { x: node.x + node.w / 2, y: node.y }
    case 'b':
      return { x: node.x + node.w / 2, y: node.y + node.h }
  }
}

/** Orthogonal routing: straight when aligned, one elbow across mixed axes, a mid-point jog otherwise. */
function route(from: DiagramNode, to: DiagramNode, edge: DiagramEdge): Point[] {
  const a = anchor(from, edge.fromSide)
  const b = anchor(to, edge.toSide)
  const horizontalFrom = edge.fromSide === 'l' || edge.fromSide === 'r'
  const horizontalTo = edge.toSide === 'l' || edge.toSide === 'r'

  if (horizontalFrom && horizontalTo) {
    if (a.y === b.y) return [a, b]
    const mid = (a.x + b.x) / 2
    return [a, { x: mid, y: a.y }, { x: mid, y: b.y }, b]
  }
  if (!horizontalFrom && !horizontalTo) {
    if (a.x === b.x) return [a, b]
    const mid = (a.y + b.y) / 2
    return [a, { x: a.x, y: mid }, { x: b.x, y: mid }, b]
  }
  return horizontalFrom ? [a, { x: b.x, y: a.y }, b] : [a, { x: a.x, y: b.y }, b]
}

function wrapLines(text: string, maxChars: number): string[] {
  const lines: string[] = []
  let line = ''
  for (const word of text.split(' ')) {
    if (line && `${line} ${word}`.length > maxChars) {
      lines.push(line)
      line = word
    } else {
      line = line ? `${line} ${word}` : word
    }
  }
  if (line) lines.push(line)
  return lines
}

function labelPosition(points: Point[]): Point {
  let best = { length: -1, mid: points[0] ?? { x: 0, y: 0 } }
  for (let i = 0; i < points.length - 1; i += 1) {
    const p = points[i]
    const q = points[i + 1]
    if (!p || !q) continue
    const length = Math.abs(p.x - q.x) + Math.abs(p.y - q.y)
    if (length > best.length) best = { length, mid: { x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 } }
  }
  return best.mid
}

const TITLE_LINE = 20
const SUB_LINE = 16

function NodeBox({ node }: { node: DiagramNode }) {
  const titleLines = wrapLines(node.title, Math.floor((node.w - 24) / 8.4))
  const subLines = node.sub ? wrapLines(node.sub, Math.floor((node.w - 24) / 6.3)) : []
  const block = titleLines.length * TITLE_LINE + (subLines.length ? 4 + subLines.length * SUB_LINE : 0)
  const top = node.y + (node.h - block) / 2
  return (
    <g className={`dg-node dg-node--${node.tone ?? 'neutral'}${node.dashed ? ' dg-node--dashed' : ''}`}>
      <rect x={node.x} y={node.y} width={node.w} height={node.h} />
      <text className="dg-title" x={node.x + 12} y={top + 15}>
        {titleLines.map((line, index) => (
          <tspan key={line} x={node.x + 12} dy={index === 0 ? 0 : TITLE_LINE}>
            {line}
          </tspan>
        ))}
      </text>
      {subLines.length > 0 && (
        <text className="dg-sub" x={node.x + 12} y={top + titleLines.length * TITLE_LINE + 4 + 12}>
          {subLines.map((line, index) => (
            <tspan key={line} x={node.x + 12} dy={index === 0 ? 0 : SUB_LINE}>
              {line}
            </tspan>
          ))}
        </text>
      )}
      {node.tone && node.tone !== 'neutral' && (
        <rect className="dg-mark" x={node.x + node.w - 22} y={node.y + 10} width={10} height={10} />
      )}
    </g>
  )
}

export function Diagram({ spec }: { spec: DiagramSpec }) {
  const uid = useId()
  const markerId = `${uid}-arrow`
  const nodes = new Map(spec.nodes.map((node) => [node.id, node]))

  return (
    <figure className="diagram">
      {/* A scrollable region must be focusable so keyboard users can scroll it. */}
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
      <div className="diagram__scroll" role="region" aria-label={`Diagram: ${spec.caption}`} tabIndex={0}>
        <svg
          className="diagram__svg"
          viewBox={`0 0 ${spec.width} ${spec.height}`}
          width={spec.width}
          height={spec.height}
          role="img"
          aria-label={spec.caption}
        >
          <defs>
            <marker id={markerId} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="9" markerHeight="9" orient="auto-start-reverse">
              <path className="dg-arrowhead" d="M0 0L10 5L0 10z" />
            </marker>
          </defs>

          {spec.groups?.map((group) => (
            <g className="dg-group" key={group.label}>
              <rect x={group.x} y={group.y} width={group.w} height={group.h} />
              <text x={group.x + 14} y={group.y + 20}>
                {group.label}
              </text>
            </g>
          ))}

          {spec.edges.map((edge) => {
            const from = nodes.get(edge.from)
            const to = nodes.get(edge.to)
            if (!from || !to) return null
            const points = route(from, to, edge)
            const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x} ${p.y}`).join(' ')
            const label = edge.label ? labelPosition(points) : undefined
            return (
              <g key={`${edge.from}-${edge.to}`} className={`dg-edge${edge.dashed ? ' dg-edge--dashed' : ''}`}>
                <path d={d} markerEnd={`url(#${markerId})`} />
                {label && edge.label && (
                  <text className="dg-edge-label" x={label.x} y={label.y - 7} textAnchor="middle">
                    {edge.label}
                  </text>
                )}
              </g>
            )
          })}

          {spec.nodes.map((node) => (
            <NodeBox key={node.id} node={node} />
          ))}
        </svg>
      </div>
      <figcaption>{spec.caption}</figcaption>
      <details className="diagram__text">
        <summary>Read this diagram as text</summary>
        <ol>
          {spec.textAlternative.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ol>
      </details>
    </figure>
  )
}
