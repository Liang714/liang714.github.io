import { ButtonLink } from '../components/ButtonLink.tsx'
import { PageHead } from '../components/PageHead.tsx'
import { site } from '../config/site.ts'
import { usePageMeta } from '../hooks/usePageMeta.ts'

export default function NotFound() {
  usePageMeta(`Page not found | ${site.name}`, 'This page does not exist.')
  return (
    <section className="page" aria-labelledby="nf-title">
      <PageHead
        title="No such page."
        titleId="nf-title"
        lead="That address did not lead anywhere on this site. It may have moved, or the link may have been mistyped."
      />
      <p className="page__actions">
        <ButtonLink to="/">Back to the start</ButtonLink>
        <ButtonLink variant="text" to="/#work">
          See the work
        </ButtonLink>
      </p>
    </section>
  )
}
