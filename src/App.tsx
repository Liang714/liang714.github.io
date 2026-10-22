import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout.tsx'
import Home from './pages/Home.tsx'
import NotFound from './pages/NotFound.tsx'

// Case studies are the heavy pages (diagrams, tables); the home page does not need them to paint.
const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage.tsx'))

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="work/:slug"
          element={
            <Suspense
              fallback={
                // Reserve the page's height so the footer does not jump down when the content arrives.
                <p className="wrap route-loading" role="status">
                  Loading the case study…
                </p>
              }
            >
              <CaseStudyPage />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
