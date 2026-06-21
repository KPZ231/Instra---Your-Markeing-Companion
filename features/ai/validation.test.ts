import { describe, it, expect } from 'vitest'
import { GenerateCaptionSchema } from './validation'

describe('GenerateCaptionSchema', () => {
  it('accepts valid input', () => {
    const result = GenerateCaptionSchema.safeParse({ prompt: 'morning coffee', language: 'en' })
    expect(result.success).toBe(true)
  })

  it('rejects empty prompt', () => {
    const result = GenerateCaptionSchema.safeParse({ prompt: '', language: 'en' })
    expect(result.success).toBe(false)
  })

  it('rejects prompt over 500 chars', () => {
    const result = GenerateCaptionSchema.safeParse({ prompt: 'a'.repeat(501), language: 'pl' })
    expect(result.success).toBe(false)
  })

  it('rejects unsupported language', () => {
    const result = GenerateCaptionSchema.safeParse({ prompt: 'hello', language: 'de' })
    expect(result.success).toBe(false)
  })

  it('accepts pl language', () => {
    const result = GenerateCaptionSchema.safeParse({ prompt: 'kawa z rana', language: 'pl' })
    expect(result.success).toBe(true)
  })
})
