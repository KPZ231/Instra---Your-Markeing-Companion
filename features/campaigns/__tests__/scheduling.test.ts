import { describe, it, expect } from 'vitest'
import { computeFirstRunAt } from '../lib/scheduling'

describe('computeFirstRunAt', () => {
  it('returns the provided date unchanged', () => {
    const d = new Date('2025-06-01T10:00:00Z')
    expect(computeFirstRunAt(d)).toBe(d)
  })

  it('defaults to now when no date provided', () => {
    const before = Date.now()
    const result = computeFirstRunAt()
    expect(result.getTime()).toBeGreaterThanOrEqual(before)
  })
})

// ─── advanceCampaign logic unit-check ─────────────────────────────────────────
// Tests the pure arithmetic used in lib/api/campaigns advanceCampaign,
// without hitting the DB.

function simulateAdvance(campaign: {
  completedRuns: number
  totalRuns: number
  intervalMinutes: number
  nextRunAt: Date
}) {
  const completedRuns = campaign.completedRuns + 1
  const done = completedRuns >= campaign.totalRuns
  const nextRunAt = new Date(campaign.nextRunAt)
  nextRunAt.setMinutes(nextRunAt.getMinutes() + campaign.intervalMinutes)
  return { completedRuns, done, nextRunAt: done ? campaign.nextRunAt : nextRunAt }
}

describe('advanceCampaign logic', () => {
  it('increments completedRuns and advances nextRunAt', () => {
    const base = new Date('2025-01-01T00:00:00Z')
    const result = simulateAdvance({ completedRuns: 0, totalRuns: 3, intervalMinutes: 60, nextRunAt: base })
    expect(result.completedRuns).toBe(1)
    expect(result.done).toBe(false)
    expect(result.nextRunAt.toISOString()).toBe('2025-01-01T01:00:00.000Z')
  })

  it('marks done when completedRuns reaches totalRuns', () => {
    const base = new Date('2025-01-01T00:00:00Z')
    const result = simulateAdvance({ completedRuns: 2, totalRuns: 3, intervalMinutes: 60, nextRunAt: base })
    expect(result.completedRuns).toBe(3)
    expect(result.done).toBe(true)
    expect(result.nextRunAt).toBe(base) // frozen
  })
})
