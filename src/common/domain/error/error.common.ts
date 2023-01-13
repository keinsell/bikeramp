import { ErrorResponse } from './error.response'

export abstract class DomainError {
  public readonly name: string
  public readonly message: string
  public readonly stack?: string
  public cause?: Error
  public readonly code?: string
  public readonly meta?: Record<string, unknown>

  public constructor(message: string, cause?: Error, code?: string, meta?: Record<string, unknown>) {
    this.message = message
    this.cause = cause
    this.code = code
    this.meta = meta
  }

  toJSON(): ErrorResponse {
    return {
      message: this.message,
    }
  }
}
