import { prisma } from '@/lib/prisma'
import type { PluginManifest } from './manifest'

/**
 * Registers a brand-new plugin together with its first version (DRAFT).
 * @param input - Plugin creation parameters
 * @param input.slug - Unique URL-safe identifier for the plugin
 * @param input.name - Human-readable plugin name
 * @param input.description - Plugin description
 * @param input.authorId - User ID of the plugin author
 * @param input.manifest - Parsed plugin manifest
 * @param input.bundleStorageKey - Storage key pointing to the uploaded bundle
 * @returns Object containing the created plugin and its first version
 * @example
 * const { plugin, version } = await createPlugin({ slug: 'my-plugin', name: 'My Plugin', ... })
 */
export async function createPlugin(input: {
  slug: string
  name: string
  description: string
  authorId: string
  manifest: PluginManifest
  bundleStorageKey: string
}) {
  const plugin = await prisma.plugin.create({
    data: {
      slug: input.slug,
      name: input.name,
      description: input.description,
      authorId: input.authorId,
    },
  })
  const version = await prisma.pluginVersion.create({
    data: {
      pluginId: plugin.id,
      version: input.manifest.version,
      status: 'DRAFT',
      manifest: input.manifest,
      bundleStorageKey: input.bundleStorageKey,
    },
  })
  return { plugin, version }
}

/**
 * Moves a plugin version from DRAFT to PENDING_REVIEW, triggering the review workflow.
 * @param versionId - ID of the plugin version to submit
 * @returns Updated plugin version record
 */
export async function submitVersionForReview(versionId: string) {
  return prisma.pluginVersion.update({ where: { id: versionId }, data: { status: 'PENDING_REVIEW' } })
}

/**
 * Approves a pending plugin version, recording the reviewing admin and timestamp.
 * @param versionId - ID of the plugin version to approve
 * @param reviewerId - User ID of the admin approving the version
 * @returns Updated plugin version record
 */
export async function approveVersion(versionId: string, reviewerId: string) {
  return prisma.pluginVersion.update({
    where: { id: versionId },
    data: { status: 'APPROVED', reviewedById: reviewerId, reviewedAt: new Date(), rejectionReason: null },
  })
}

/**
 * Rejects a pending plugin version with a human-readable reason.
 * @param versionId - ID of the plugin version to reject
 * @param reviewerId - User ID of the admin rejecting the version
 * @param reason - Human-readable explanation for the rejection
 * @returns Updated plugin version record
 */
export async function rejectVersion(versionId: string, reviewerId: string, reason: string) {
  return prisma.pluginVersion.update({
    where: { id: versionId },
    data: { status: 'REJECTED', reviewedById: reviewerId, reviewedAt: new Date(), rejectionReason: reason },
  })
}

/**
 * Lists all approved plugin versions, newest first, for the install browser.
 * @returns Array of approved plugin versions with their parent plugin included
 */
export async function listApprovedPlugins() {
  return prisma.pluginVersion.findMany({
    where: { status: 'APPROVED' },
    orderBy: { createdAt: 'desc' },
    include: { plugin: true },
  })
}
