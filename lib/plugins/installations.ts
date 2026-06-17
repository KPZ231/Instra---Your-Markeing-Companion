import { prisma } from '@/lib/prisma'
import { PluginReviewStatus } from '@prisma/client'
import { logPluginAction } from '@/lib/plugins/audit'
import semver from 'semver'

/**
 * Installs a specific approved plugin version for a user.
 * Throws if the version does not exist, is not APPROVED, or is already installed.
 * @param userId - The user performing the installation
 * @param pluginVersionId - The specific approved version to install
 * @returns The created PluginInstallation record
 */
export async function installPlugin(userId: string, pluginId: string, pluginVersionId: string) {
  const version = await prisma.pluginVersion.findUnique({ where: { id: pluginVersionId } })
  if (!version) throw new Error(`Plugin version "${pluginVersionId}" not found`)
  if (version.status !== PluginReviewStatus.APPROVED)
    throw new Error(`Plugin version "${pluginVersionId}" is not approved`)

  const existing = await prisma.pluginInstallation.findUnique({
    where: { userId_pluginId: { userId, pluginId: version.pluginId } },
  })
  if (existing) throw new Error(`Plugin "${version.pluginId}" is already installed`)

  const result = await prisma.pluginInstallation.create({
    data: { userId, pluginId: version.pluginId, pluginVersionId, enabled: true },
  })
  await logPluginAction(version.pluginId, userId, 'install', { pluginVersionId })
  return result
}

/**
 * Removes a user's installation of a plugin entirely.
 * @param userId - The user uninstalling the plugin
 * @param pluginId - The plugin to uninstall
 * @returns Prisma batch result
 */
export async function uninstallPlugin(userId: string, pluginId: string) {
  const result = await prisma.pluginInstallation.deleteMany({ where: { userId, pluginId } })
  await logPluginAction(pluginId, userId, 'uninstall', {})
  return result
}

/**
 * Enables or disables an installed plugin without uninstalling it.
 * @param userId - The user toggling the plugin
 * @param pluginId - The plugin to toggle
 * @param enabled - Whether to enable or disable
 * @returns The updated PluginInstallation record
 */
export async function togglePlugin(userId: string, pluginId: string, enabled: boolean) {
  const result = await prisma.pluginInstallation.update({
    where: { userId_pluginId: { userId, pluginId } },
    data: { enabled },
  })
  await logPluginAction(pluginId, userId, 'toggle', { enabled })
  return result
}

/**
 * Lists a user's enabled installations, with version and manifest, for rendering.
 * @param userId - The user whose installations to fetch
 * @returns Array of PluginInstallation records with pluginVersion and plugin included
 */
export async function getUserInstallations(userId: string) {
  return prisma.pluginInstallation.findMany({
    where: { userId, enabled: true },
    include: { pluginVersion: true, plugin: true },
  })
}

/**
 * Checks whether a newer APPROVED version exists for a plugin than the one
 * a user currently has installed. Uses semver comparison to determine "newer".
 * @param pluginId - The plugin to check
 * @param currentVersion - The version string currently installed
 * @returns The newest available PluginVersion if one exists, or null
 */
export async function getAvailableUpdate(pluginId: string, currentVersion: string) {
  const candidates = await prisma.pluginVersion.findMany({
    where: { pluginId, status: PluginReviewStatus.APPROVED },
  })

  const newer = candidates.filter(
    (c) => semver.valid(c.version) && semver.gt(c.version, currentVersion),
  )

  if (newer.length === 0) return null

  return newer.reduce((best, c) => (semver.gt(c.version, best.version) ? c : best))
}
