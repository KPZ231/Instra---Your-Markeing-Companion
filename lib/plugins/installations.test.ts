import { describe, it, expect, vi, beforeEach } from 'vitest'

const {
  create,
  findUnique,
  deleteMany,
  update,
  findMany,
  versionFindUnique,
  versionFindMany,
} = vi.hoisted(() => ({
  create: vi.fn(),
  findUnique: vi.fn(),
  deleteMany: vi.fn(),
  update: vi.fn(),
  findMany: vi.fn(),
  versionFindUnique: vi.fn(),
  versionFindMany: vi.fn(),
}))

vi.mock('@/lib/prisma', () => ({
  prisma: {
    pluginInstallation: { create, findUnique, deleteMany, update, findMany },
    pluginVersion: { findUnique: versionFindUnique, findMany: versionFindMany },
  },
}))

vi.mock('@/lib/plugins/audit', () => ({
  logPluginAction: vi.fn(),
}))

import { installPlugin, uninstallPlugin, togglePlugin, getUserInstallations, getAvailableUpdate } from './installations'

beforeEach(() => {
  create.mockReset()
  findUnique.mockReset()
  deleteMany.mockReset()
  update.mockReset()
  findMany.mockReset()
  versionFindUnique.mockReset()
  versionFindMany.mockReset()
})

describe('plugin installations', () => {
  it('installs a specific approved version for a user', async () => {
    versionFindUnique.mockResolvedValue({ id: 'version-1', pluginId: 'plugin-1', status: 'APPROVED' })
    findUnique.mockResolvedValue(null)
    create.mockResolvedValue({ id: 'inst-1' })

    await installPlugin('user-1', 'plugin-1', 'version-1')

    expect(create).toHaveBeenCalledWith({
      data: { userId: 'user-1', pluginId: 'plugin-1', pluginVersionId: 'version-1', enabled: true },
    })
  })

  it('throws when version is not APPROVED', async () => {
    versionFindUnique.mockResolvedValue({ id: 'version-1', pluginId: 'plugin-1', status: 'PENDING' })

    await expect(installPlugin('user-1', 'plugin-1', 'version-1')).rejects.toThrow(
      'is not approved',
    )
    expect(create).not.toHaveBeenCalled()
  })

  it('throws when plugin is already installed', async () => {
    versionFindUnique.mockResolvedValue({ id: 'version-1', pluginId: 'plugin-1', status: 'APPROVED' })
    findUnique.mockResolvedValue({ id: 'inst-existing' })

    await expect(installPlugin('user-1', 'plugin-1', 'version-1')).rejects.toThrow(
      'already installed',
    )
    expect(create).not.toHaveBeenCalled()
  })

  it('uninstalls by deleting the installation row', async () => {
    deleteMany.mockResolvedValue({ count: 1 })
    await uninstallPlugin('user-1', 'plugin-1')
    expect(deleteMany).toHaveBeenCalledWith({ where: { userId: 'user-1', pluginId: 'plugin-1' } })
  })

  it('toggles enabled state', async () => {
    update.mockResolvedValue({})
    await togglePlugin('user-1', 'plugin-1', false)
    expect(update).toHaveBeenCalledWith({
      where: { userId_pluginId: { userId: 'user-1', pluginId: 'plugin-1' } },
      data: { enabled: false },
    })
  })

  it('lists enabled installations for rendering', async () => {
    findMany.mockResolvedValue([])
    await getUserInstallations('user-1')
    expect(findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { userId: 'user-1', enabled: true } }),
    )
  })

  it('reports an available update when a newer approved version exists', async () => {
    versionFindMany.mockResolvedValue([
      { id: 'version-2', version: '1.1.0', status: 'APPROVED' },
      { id: 'version-3', version: '1.2.0', status: 'APPROVED' },
    ])
    const result = await getAvailableUpdate('plugin-1', '1.0.0')
    expect(result?.version).toBe('1.2.0')
  })

  it('returns null when no version is actually newer (semver)', async () => {
    versionFindMany.mockResolvedValue([
      { id: 'version-old', version: '0.9.0', status: 'APPROVED' },
    ])
    const result = await getAvailableUpdate('plugin-1', '1.0.0')
    expect(result).toBeNull()
  })
})
