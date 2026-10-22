import type { Repo } from '../content/types.ts'
import { Pictogram } from './Pictogram.tsx'

/** States plainly whether the code can be read. A private repository is never dressed up as open source. */
export function RepoLine({ repo }: { repo: Repo }) {
  if (repo.visibility === 'public' && repo.url) {
    return (
      <span className="repo-line">
        <Pictogram name="branch" size={20} />
        <a href={repo.url} target="_blank" rel="noopener noreferrer">
          Public repository
        </a>
      </span>
    )
  }
  if (repo.visibility === 'unpublished') {
    return (
      <span className="repo-line">
        <Pictogram name="document" size={20} />
        Not published yet
      </span>
    )
  }
  return (
    <span className="repo-line">
      <Pictogram name="lock" size={20} />
      Private repository
    </span>
  )
}
