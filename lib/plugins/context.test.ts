import { describe, it, expect, vi } from 'vitest'

vi.mock('./kv', () => ({
  getPluginData: vi.fn().mockResolvedValue(null),
  setPluginData: vi.fn().mockResolvedValue(undefined),
}))

import { createPluginContext } from './context'

describe('createPluginContext', () => {
  it('allows registerWidget when the matching capability is granted', () => {
    const { context, registrations } = createPluginContext({
      pluginId: 'p1',
      userId: 'u1',
      capabilities: ['widgets:dashboard:top'],
    })
    context.registerWidget('DASHBOARD_TOP', () => [])
    expect(registrations.widgets.has('DASHBOARD_TOP')).toBe(true)
  })

  it('throws when registerWidget is called without the capability', () => {
    const { context } = createPluginContext({ pluginId: 'p1', userId: 'u1', capabilities: [] })
    expect(() => context.registerWidget('DASHBOARD_TOP', () => [])).toThrow('missing required capability')
  })

  it('throws when emit is called without events:emit', () => {
    const { context } = createPluginContext({ pluginId: 'p1', userId: 'u1', capabilities: ['events:listen'] })
    expect(() => context.emit('tick', {})).toThrow('missing required capability')
  })

  it('delivers emitted events to registered listeners', () => {
    const { context } = createPluginContext({
      pluginId: 'p1',
      userId: 'u1',
      capabilities: ['events:emit', 'events:listen'],
    })
    const received: unknown[] = []
    context.on('tick', (payload) => received.push(payload))
    context.emit('tick', { count: 1 })
    expect(received).toEqual([{ count: 1 }])
  })

  it('throws when api.storage.get is called without storage:kv', async () => {
    const { context } = createPluginContext({ pluginId: 'p1', userId: 'u1', capabilities: [] })
    await expect(context.api.storage.get('x')).rejects.toThrow('missing required capability')
  })
})
