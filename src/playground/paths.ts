import { AgentError } from './errors.ts'

export type VNode =
  | { readonly type: 'dir' }
  | { readonly type: 'file'; readonly content: string }
  | { readonly type: 'symlink'; readonly target: string }

/** A tiny virtual filesystem: absolute path to node. Never touches the visitor's machine. */
export type Vfs = Map<string, VNode>

export interface WorkspaceConfig {
  readonly roots: readonly string[]
  readonly trash: string
  readonly home: string
}

const MAX_SYMLINK_HOPS = 16

/** Python-style repr for a short string, so error messages read like the original's. */
export function pyRepr(value: string): string {
  return `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
}

export function expandUser(path: string, home: string): string {
  if (path === '~') return home
  if (path.startsWith('~/')) return `${home}${path.slice(1)}`
  return path
}

/**
 * Resolve `..`, `.` and symlinks the way a real filesystem does: component by component, so a
 * symlink in the middle of a path is followed before a later `..` is applied.
 */
export function physicalResolve(path: string, fs: Vfs): string {
  let resolved: string[] = []
  let queue = path.split('/').filter(Boolean)
  let hops = 0

  while (queue.length > 0) {
    const part = queue[0]
    queue = queue.slice(1)
    if (part === undefined || part === '.') continue
    if (part === '..') {
      resolved = resolved.slice(0, -1)
      continue
    }
    const node = fs.get(`/${[...resolved, part].join('/')}`)
    if (node?.type === 'symlink') {
      hops += 1
      if (hops > MAX_SYMLINK_HOPS) {
        throw new AgentError('ToolExecutionError', `too many levels of symbolic links: ${path}`)
      }
      if (node.target.startsWith('/')) resolved = []
      queue = [...node.target.split('/').filter(Boolean), ...queue]
      continue
    }
    resolved = [...resolved, part]
  }
  return `/${resolved.join('/')}`
}

/**
 * The only place paths become real. Normalise, expand, resolve symlinks, then enforce containment.
 * In the original this runs inside the tool, at the execute stage, after approval and budget.
 */
export class Workspace {
  readonly roots: readonly string[]
  readonly trash: string
  readonly home: string
  readonly fs: Vfs

  constructor(config: WorkspaceConfig, fs: Vfs) {
    this.roots = config.roots
    this.trash = config.trash
    this.home = config.home
    this.fs = fs
  }

  resolve(raw: string): string {
    const normalised = raw.normalize('NFKC')
    if (normalised !== raw && (normalised.includes('../') || normalised.includes('..\\'))) {
      throw new AgentError('ScopeViolation', `path uses confusable characters: ${pyRepr(raw)}`)
    }

    let candidate = expandUser(normalised, this.home)
    if (!candidate.startsWith('/')) {
      // Relative paths are workspace-relative, never process-relative.
      candidate = `${this.roots[0] ?? ''}/${candidate}`
    }
    const resolved = physicalResolve(candidate, this.fs)

    if (!this.contains(resolved)) {
      throw new AgentError(
        'ScopeViolation',
        `path escapes workspace: ${pyRepr(raw)} resolved to ${resolved}`,
      )
    }
    return resolved
  }

  contains(path: string): boolean {
    return [...this.roots, this.trash].some((root) => path === root || path.startsWith(`${root}/`))
  }
}
