import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('server-only', () => ({}))

const mockFetch = vi.fn()
global.fetch = mockFetch

const { publishToFacebook, publishToInstagram } = await import('../meta')

describe('publishToFacebook', () => {
  beforeEach(() => vi.clearAllMocks())

  it('returns post ID on text-only success', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 'fb-post-123' }),
    })
    const id = await publishToFacebook('page-1', 'token', { content: 'Hello', media: [] })
    expect(id).toBe('fb-post-123')
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/page-1/feed'),
      expect.objectContaining({ method: 'POST' }),
    )
  })

  it('throws on API error', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: { message: 'Invalid token' } }),
    })
    await expect(publishToFacebook('page-1', 'bad', { content: 'Hi', media: [] })).rejects.toThrow(
      'Invalid token',
    )
  })
})

describe('publishToInstagram', () => {
  beforeEach(() => vi.clearAllMocks())

  it('creates media container and publishes', async () => {
    mockFetch
      .mockResolvedValueOnce({ ok: true, json: async () => ({ id: 'container-1' }) }) // create container
      .mockResolvedValueOnce({ ok: true, json: async () => ({ id: 'ig-post-1' }) })   // publish
    const id = await publishToInstagram('ig-1', 'token', {
      content: 'Test',
      media: [{ url: 'https://example.com/img.jpg', mimeType: 'image/jpeg', order: 0 }],
    })
    expect(id).toBe('ig-post-1')
  })
})
