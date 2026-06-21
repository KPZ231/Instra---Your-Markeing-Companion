/**
 * Computes the first execution time for a new campaign.
 *
 * @param startAt - Desired first run time (defaults to now)
 * @returns Date for nextRunAt
 *
 * @example
 * const firstRun = computeFirstRunAt() // now
 * const firstRun = computeFirstRunAt(new Date('2025-01-01T09:00:00Z'))
 */
export function computeFirstRunAt(startAt?: Date): Date {
  return startAt ?? new Date()
}
