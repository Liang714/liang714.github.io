import { initPage } from './shared.js'

// The route rail: a stop for each section and a marker that travels with the scroll.
const rail = document.querySelector('.route')
const marker = document.querySelector('.route__marker')
const stops = [...document.querySelectorAll('main > section')]

function layoutRail() {
  if (!rail) return
  rail.querySelectorAll('.route__stop').forEach((node) => node.remove())
  const total = document.documentElement.scrollHeight - innerHeight
  for (const section of stops) {
    const stop = document.createElement('i')
    stop.className = 'route__stop'
    stop.style.top = `${Math.min(100, (section.offsetTop / Math.max(total, 1)) * 100)}%`
    rail.appendChild(stop)
  }
}

initPage({
  onScroll: ({ progress }) => {
    if (marker) marker.style.top = `${progress * 100}%`
  },
})
layoutRail()
addEventListener('resize', layoutRail)
document.fonts?.ready.then(layoutRail)
