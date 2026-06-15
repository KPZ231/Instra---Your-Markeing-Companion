/** Thrown by rateLimit() when the caller exceeds the configured sliding-window quota. */
export class RateLimitError extends Error {
  readonly retryAfter: number

  constructor(retryAfter: number) {
    super('Too many requests. Please try again later.')
    this.name = 'RateLimitError'
    this.retryAfter = retryAfter
  }
}
