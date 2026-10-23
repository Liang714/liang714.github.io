import { initPage } from './shared.js'

// The page is a borehole log: 30 m of ground mapped onto the page height. The ruler, the gauge and the
// depth labels all use the same mapping, so every reading agrees with the tick beside it.
const TOTAL = 30
const root = document.documentElement
const ruler = document.querySelector('.ruler')
const readouts = [...document.querySelectorAll('[data-depth]')]

const height = () => root.scrollHeight
const depthAt = (y) => Math.min(TOTAL, Math.max(0, (y / height()) * TOTAL))

function layout() {
  const perMetre = height() / TOTAL
  root.style.setProperty('--m', `${perMetre}px`)
  ruler.querySelectorAll('.ruler__label').forEach((node) => node.remove())
  for (let m = 2; m < TOTAL; m += 2) {
    const label = document.createElement('span')
    label.className = 'ruler__label'
    label.textContent = m.toFixed(1)
    label.style.top = `${m * perMetre}px`
    ruler.appendChild(label)
  }
  for (const node of document.querySelectorAll('[data-depth-of]')) {
    const top = node.getBoundingClientRect().top + scrollY
    node.textContent = depthAt(top).toFixed(1)
  }
  update()
}

function update() {
  const value = depthAt(scrollY + innerHeight * 0.4).toFixed(1)
  for (const node of readouts) node.textContent = value
}

initPage({ onScroll: update })
layout()
addEventListener('resize', layout)
document.fonts?.ready.then(layout)
