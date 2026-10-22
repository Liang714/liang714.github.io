import { ButtonLink } from '../components/ButtonLink.tsx'
import { StateSign } from '../components/StateSign.tsx'
import { usePageMeta } from '../hooks/usePageMeta.ts'
import { site } from '../config/site.ts'

export default function NotFound() {
  usePageMeta(`Page not found | ${site.name}`, 'This page does not exist.')
  return (
    <section className="band" aria-labelledby="nf-title">
      <div className="wrap not-found">
        <div className="sign not-found__sign">
          <StateSign kind="blocked" size={88} />
          <h1 id="nf-title">No such route.</h1>
          <p>
            That address did not resolve to anything on this site. It may have moved, or the link may have been
            mistyped.
          </p>
          <div className="btn-row">
            <ButtonLink to="/">Back to the start</ButtonLink>
            <ButtonLink variant="secondary" to="/#work">
              See the work
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  )
}
