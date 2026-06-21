import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/lib/prisma', () => {
  const mockCreate = vi.fn()
  const mockFindMany = vi.fn()
  return {
    prisma: {
      pluginAuditLog: {
        create: mockCreate,
        findMany: mockFindMany,
      },
    },
  }
})

import { logPluginAction, listPluginAuditLog } from './audit'
import { prisma } from '@/lib/prisma'

beforeEach(() => {
  vi.clearAllMocks()
})

describe('plugin audit log', () => {
  it('records an action with optional metadata', async () => {
    const create = vi.mocked(prisma.pluginAuditLog.create)
    create.mockResolvedValue({ id: 'x', pluginId: 'plugin-1', userId: 'user-1', action: 'widget.render', metadata: null, createdAt: new Date() })
    await logPluginAction('plugin-1', 'user-1', 'widget.render', { slot: 'DASHBOARD_TOP' })
    expect(create).toHaveBeenCalledWith({
      data: { pluginId: 'plugin-1', userId: 'user-1', action: 'widget.render', metadata: { slot: 'DASHBOARD_TOP' } },
    })
  })

  it('lists entries for a plugin ordered by newest first', async () => {
    const findMany = vi.mocked(prisma.pluginAuditLog.findMany)
    findMany.mockResolvedValue([{ id: 'x', pluginId: 'plugin-1', userId: null, action: 'install', metadata: null, createdAt: new Date() }])
    const entries = await listPluginAuditLog('plugin-1')
    expect(findMany).toHaveBeenCalledWith({
      where: { pluginId: 'plugin-1' },
      orderBy: { createdAt: 'desc' },
      take: 100,
    })
    expect(entries).toEqual([{ action: 'install' }])
  })
})
