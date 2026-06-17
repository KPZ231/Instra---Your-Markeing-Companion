import { describe, it, expect, vi, beforeEach } from 'vitest'

const { pluginCreate, versionCreate, versionUpdate, versionFindMany } = vi.hoisted(() => ({
  pluginCreate: vi.fn(),
  versionCreate: vi.fn(),
  versionUpdate: vi.fn(),
  versionFindMany: vi.fn(),
}))

vi.mock('@/lib/prisma', () => ({
  prisma: {
    plugin: { create: pluginCreate },
    pluginVersion: { create: versionCreate, update: versionUpdate, findMany: versionFindMany },
  },
}))

import { createPlugin, submitVersionForReview, approveVersion, rejectVersion, listApprovedPlugins } from './registry'

beforeEach(() => {
  pluginCreate.mockReset()
  versionCreate.mockReset()
  versionUpdate.mockReset()
  versionFindMany.mockReset()
})

describe('plugin registry', () => {
  it('creates a plugin with its first DRAFT version', async () => {
    pluginCreate.mockResolvedValue({ id: 'plugin-1', slug: 'my-plugin' })
    versionCreate.mockResolvedValue({ id: 'v1', status: 'DRAFT' })
    const result = await createPlugin({
      slug: 'my-plugin',
      name: 'My Plugin',
      description: 'desc',
      authorId: 'user-1',
      manifest: { version: '1.0.0' } as never,
      bundleStorageKey: 'plugins/my-plugin/1.0.0/bundle.js',
    })
    expect(pluginCreate).toHaveBeenCalled()
    expect(versionCreate).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.objectContaining({ status: 'DRAFT', version: '1.0.0' }) }),
    )
    expect(result.version.status).toBe('DRAFT')
  })

  it('moves a version from DRAFT to PENDING_REVIEW', async () => {
    versionUpdate.mockResolvedValue({ status: 'PENDING_REVIEW' })
    await submitVersionForReview('v1')
    expect(versionUpdate).toHaveBeenCalledWith({
      where: { id: 'v1' },
      data: { status: 'PENDING_REVIEW' },
    })
  })

  it('approves a version with the reviewer id', async () => {
    versionUpdate.mockResolvedValue({ status: 'APPROVED' })
    await approveVersion('v1', 'admin-1')
    expect(versionUpdate).toHaveBeenCalledWith({
      where: { id: 'v1' },
      data: expect.objectContaining({ status: 'APPROVED', reviewedById: 'admin-1' }),
    })
  })

  it('rejects a version with a reason', async () => {
    versionUpdate.mockResolvedValue({ status: 'REJECTED' })
    await rejectVersion('v1', 'admin-1', 'unsafe code')
    expect(versionUpdate).toHaveBeenCalledWith({
      where: { id: 'v1' },
      data: expect.objectContaining({ status: 'REJECTED', rejectionReason: 'unsafe code' }),
    })
  })

  it('lists only APPROVED versions', async () => {
    versionFindMany.mockResolvedValue([])
    await listApprovedPlugins()
    expect(versionFindMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { status: 'APPROVED' } }),
    )
  })
})
