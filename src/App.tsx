import { Suspense, lazy } from 'react'
import type { ReactNode } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout.tsx'
import Home from './pages/Home.tsx'
import NotFound from './pages/NotFound.tsx'

// Detail pages carry the heavy parts (diagrams, tables, the simulator); the home page does not need them to paint.
const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage.tsx'))
const WorkIndexPage = lazy(() => import('./pages/WorkIndexPage.tsx'))
const AboutPage = lazy(() => import('./pages/AboutPage.tsx'))
const StackPage = lazy(() => import('./pages/StackPage.tsx'))
const RecordPage = lazy(() => import('./pages/RecordPage.tsx'))
const GatePage = lazy(() => import('./pages/GatePage.tsx'))

function Later({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        // Reserve the page's height so the footer does not jump down when the content arrives.
        <p className="route-loading" role="status">
          Loading…
        </p>
      }
    >
      {children}
    </Suspense>
  )
}

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="work" element={<Later><WorkIndexPage /></Later>} />
        <Route path="work/:slug" element={<Later><CaseStudyPage /></Later>} />
        <Route path="about" element={<Later><AboutPage /></Later>} />
        <Route path="stack" element={<Later><StackPage /></Later>} />
        <Route path="record" element={<Later><RecordPage /></Later>} />
        <Route path="gate" element={<Later><GatePage /></Later>} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
