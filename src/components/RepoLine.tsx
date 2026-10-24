import type { Repo } from '../content/types.ts'
import { ExternalIcon } from './Icon.tsx'

/** States plainly whether the code can be read. A private repository is never dressed up as open source. */
export function RepoLine({ repo }: { repo: Repo }) {
  if (repo.visibility === 'public' && repo.url) {
    return (
      <a className="repo-line" href={repo.url} target="_blank" rel="noopener noreferrer">
        Public repository
        <ExternalIcon size={14} />
      </a>
    )
  }
  if (repo.visibility === 'unpublished') return <span className="repo-line">Not published yet</span>
  return <span className="repo-line">Private repository</span>
}
