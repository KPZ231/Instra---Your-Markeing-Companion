import { describe, it, expect } from 'vitest'
import { parseManifest } from './manifest'

const validManifest = {
  name: 'My Plugin',
  version: '1.0.0',
  description: 'Does something useful',
  author: 'Jane Doe',
  permissions: ['widgets:dashboard:top', 'storage:kv'],
  main: 'dist/index.js',
  locales: { en: { greeting: 'Hello' }, pl: { greeting: 'Witaj' } },
}

describe('parseManifest', () => {
  it('parses a valid manifest', () => {
    const result = parseManifest(validManifest)
    expect(result.success).toBe(true)
  })

  it('rejects an unknown permission string', () => {
    const result = parseManifest({ ...validManifest, permissions: ['filesystem:write'] })
    expect(result.success).toBe(false)
  })

  it('rejects a non-semver version', () => {
    const result = parseManifest({ ...validManifest, version: 'latest' })
    expect(result.success).toBe(false)
  })
})
