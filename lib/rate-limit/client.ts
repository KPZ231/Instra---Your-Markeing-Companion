import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import type { Duration } from '@upstash/ratelimit'

let redis: Redis | null = null

/** Returns (and lazily creates) the shared Redis connection. */
function getRedis(): Redis {
  if (!redis) {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  }
  return redis
}

const limiters = new Map<string, Ratelimit>()

/**
 * Returns a cached Ratelimit instance for the given action key, limit, and window.
 * Each (key, limit, window) triple gets its own Redis namespace so actions never
 * share counters even when they target the same IP.
 * @param key    - Action name used as the Redis key prefix (e.g. "login")
 * @param limit  - Max requests per window
 * @param window - Sliding-window duration
 */
export function getLimiter(key: string, limit: number, window: Duration): Ratelimit {
  const cacheKey = `${key}:${limit}:${window}`

  if (!limiters.has(cacheKey)) {
    limiters.set(
      cacheKey,
      new Ratelimit({
        redis: getRedis(),
        limiter: Ratelimit.slidingWindow(limit, window),
        prefix: `instra:rl:${key}`,
        analytics: true,
      }),
    )
  }

  return limiters.get(cacheKey)!
}
