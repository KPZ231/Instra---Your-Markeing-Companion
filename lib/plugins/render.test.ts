import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('./installations', () => ({ getUserInstallations: vi.fn() }))
vi.mock('./storage', () => ({ downloadBundle: vi.fn() }))
vi.mock('./audit', () => ({ logPluginAction: vi.fn() }))

import { getUserInstallations } from './installations'
import { downloadBundle } from './storage'
import { logPluginAction } from './audit'
import { renderWidgetsForUser } from './render'

beforeEach(() => {
  vi.mocked(getUserInstallations).mockReset()
  vi.mocked(downloadBundle).mockReset()
  vi.mocked(logPluginAction).mockReset()
})

describe('renderWidgetsForUser', () => {
  it('returns blocks from a plugin registered for the requested slot', async () => {
    vi.mocked(getUserInstallations).mockResolvedValue([
      {
        pluginId: 'plugin-1',
        plugin: { id: 'plugin-1' },
        pluginVersion: {
          manifest: { permissions: ['widgets:dashboard:top'] },
          bundleStorageKey: 'key-1',
        },
      },
    ] as never)
    vi.mocked(downloadBundle).mockResolvedValue(`
      module.exports = {
        init: (ctx) => ctx.registerWidget('DASHBOARD_TOP', () => [{ type: 'text', value: 'hi' }]),
      }
    `)

    const blocks = await renderWidgetsForUser('user-1', 'DASHBOARD_TOP')
    expect(blocks).toEqual([{ type: 'text', value: 'hi' }])
  })

  it('isolates a throwing plugin into an error block instead of failing the whole render', async () => {
    vi.mocked(getUserInstallations).mockResolvedValue([
      {
        pluginId: 'plugin-1',
        plugin: { id: 'plugin-1' },
        pluginVersion: {
          manifest: { permissions: ['widgets:dashboard:top'] },
          bundleStorageKey: 'key-1',
        },
      },
    ] as never)
    vi.mocked(downloadBundle).mockResolvedValue(`
      module.exports = { init: () => { throw new Error('boom') } }
    `)

    const blocks = await renderWidgetsForUser('user-1', 'DASHBOARD_TOP')
    expect(blocks).toEqual([{ type: 'text', value: 'This widget failed to load.' }])
    expect(logPluginAction).toHaveBeenCalledWith('plugin-1', 'user-1', 'widget.error', expect.anything())
  })

  it('returns no blocks when no installed plugin registers the slot', async () => {
    vi.mocked(getUserInstallations).mockResolvedValue([])
    const blocks = await renderWidgetsForUser('user-1', 'DASHBOARD_TOP')
    expect(blocks).toEqual([])
  })
})
