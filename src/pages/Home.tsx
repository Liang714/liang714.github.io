import { useState } from 'react'
import { site } from '../config/site.ts'
import { usePageMeta } from '../hooks/usePageMeta.ts'
import { About } from '../sections/About.tsx'
import { Contact } from '../sections/Contact.tsx'
import { GateDemo } from '../sections/GateDemo.tsx'
import { Hero } from '../sections/Hero.tsx'
import { Record } from '../sections/Record.tsx'
import { Stack } from '../sections/Stack.tsx'
import { Work } from '../sections/Work.tsx'

/** The request the hero sends through the gates on first load: it shows four of the five sign shapes at once. */
const FIRST_SCENARIO = 'delete-bulk'

export default function Home() {
  const [scenarioId, setScenarioId] = useState(FIRST_SCENARIO)
  usePageMeta(site.title, site.description)

  return (
    <>
      <Hero scenarioId={scenarioId} onScenarioChange={setScenarioId} />
      <Work />
      <GateDemo scenarioId={scenarioId} onScenarioChange={setScenarioId} />
      <About />
      <Stack />
      <Record />
      <Contact />
    </>
  )
}
