import type { ErrorType } from './types.ts'

/** Base for every error the simulated agent raises deliberately. Mirrors the original's typed hierarchy. */
export class AgentError extends Error {
  readonly type: ErrorType

  constructor(type: ErrorType, message: string) {
    super(message)
    this.name = type
    this.type = type
  }
}
