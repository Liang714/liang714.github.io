import { site } from '../config/site.ts'
import { usePageMeta } from '../hooks/usePageMeta.ts'
import { About } from '../sections/About.tsx'
import { Contact } from '../sections/Contact.tsx'
import { Hero } from '../sections/Hero.tsx'
import { Interests } from '../sections/Interests.tsx'
import { Record } from '../sections/Record.tsx'
import { Stack } from '../sections/Stack.tsx'
import { Work } from '../sections/Work.tsx'

export default function Home() {
  usePageMeta(site.title, site.description)
  return (
    <>
      <Hero />
      <About />
      <Interests />
      <Work />
      <Stack />
      <Record />
      <Contact />
    </>
  )
}
