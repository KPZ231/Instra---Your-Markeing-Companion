import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

/**
 * Records a single plugin-related action for audit purposes.
 * @param pluginId - Plugin the action relates to
 * @param userId - Acting user, or null for system actions
 * @param action - Short machine-readable action name (e.g. "install", "widget.render")
 * @param metadata - Optional structured context for the entry
 * @example await logPluginAction(pluginId, userId, "install")
 */
export async function logPluginAction(
  pluginId: string,
  userId: string | null,
  action: string,
  metadata?: Record<string, unknown>,
): Promise<void> {
  await prisma.pluginAuditLog.create({
    data: { pluginId, userId, action, metadata: (metadata ?? Prisma.JsonNull) as Prisma.NullableJsonNullValueInput | Prisma.InputJsonValue },
  })
}

/**
 * Lists the most recent audit log entries for a plugin.
 * @param pluginId - Plugin to fetch entries for
 * @example const entries = await listPluginAuditLog(pluginId)
 */
export async function listPluginAuditLog(pluginId: string) {
  return prisma.pluginAuditLog.findMany({
    where: { pluginId },
    orderBy: { createdAt: 'desc' },
    take: 100,
  })
}
