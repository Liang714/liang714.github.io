import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App.tsx'
import './styles/fonts.css'
import './styles/tokens.css'
import './styles/base.css'
import './styles/components.css'
import './styles/home.css'
import './styles/pages.css'
import './styles/gate.css'

// Content is visible without JavaScript; the hidden "rise in" state only exists once this class is set.
document.documentElement.classList.add('js-reveal')

const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || undefined
const container = document.getElementById('root')
if (!container) throw new Error('Missing #root element')

createRoot(container).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
