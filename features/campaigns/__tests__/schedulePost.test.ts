import { describe, it, expect } from 'vitest'
import { SchedulePostSchema, ReschedulePostSchema } from '../validation'

const futureDate = new Date(Date.now() + 60_000)
const pastDate = new Date(Date.now() - 60_000)

describe('SchedulePostSchema', () => {
  it('accepts valid postId and future scheduledAt', () => {
    const result = SchedulePostSchema.safeParse({ postId: 'clx123', scheduledAt: futureDate })
    expect(result.success).toBe(true)
  })

  it('rejects empty postId', () => {
    const result = SchedulePostSchema.safeParse({ postId: '', scheduledAt: futureDate })
    expect(result.success).toBe(false)
  })

  it('rejects past scheduledAt', () => {
    const result = SchedulePostSchema.safeParse({ postId: 'clx123', scheduledAt: pastDate })
    expect(result.success).toBe(false)
    expect(JSON.stringify(result.error?.issues)).toContain('future')
  })

  it('rejects missing scheduledAt', () => {
    const result = SchedulePostSchema.safeParse({ postId: 'clx123' })
    expect(result.success).toBe(false)
  })
})

describe('ReschedulePostSchema', () => {
  it('accepts valid campaignId and future scheduledAt', () => {
    const result = ReschedulePostSchema.safeParse({ campaignId: 'clx456', scheduledAt: futureDate })
    expect(result.success).toBe(true)
  })

  it('rejects past scheduledAt', () => {
    const result = ReschedulePostSchema.safeParse({ campaignId: 'clx456', scheduledAt: pastDate })
    expect(result.success).toBe(false)
    expect(JSON.stringify(result.error?.issues)).toContain('future')
  })

  it('rejects empty campaignId', () => {
    const result = ReschedulePostSchema.safeParse({ campaignId: '', scheduledAt: futureDate })
    expect(result.success).toBe(false)
  })
})
