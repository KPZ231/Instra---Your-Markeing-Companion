import type { WidgetSlot } from '@prisma/client'
import type { UIBlock } from './blocks'
import { getUserInstallations } from './installations'
import { downloadBundle } from './storage'
import { loadPluginModule, callPluginExport } from './sandbox'
import { createPluginContext } from './context'
import { logPluginAction } from './audit'
import { SANDBOX_TIMEOUT_MS } from './config'
import type { PluginContext } from '@/types/plugin'

const ERROR_BLOCK: UIBlock = { type: 'text', value: 'This widget failed to load.' }

/**
 * Renders all blocks contributed by a user's installed, enabled plugins for
 * a single widget slot. Each plugin runs in its own sandbox; a failure in
 * one plugin yields an error block for that plugin only and never affects
 * the others.
 * @param userId - User whose installations to render
 * @param slot - Widget slot being rendered (e.g. "DASHBOARD_TOP")
 * @returns Flat array of UIBlocks for the given slot
 * @example const blocks = await renderWidgetsForUser(userId, "DASHBOARD_TOP")
 */
export async function renderWidgetsForUser(userId: string, slot: WidgetSlot): Promise<UIBlock[]> {
  const installations = await getUserInstallations(userId)
  const blocks: UIBlock[] = []

  for (const installation of installations) {
    const manifest = installation.pluginVersion.manifest as { permissions: string[] }
    try {
      const code = await downloadBundle(installation.pluginVersion.bundleStorageKey)
      const { exports } = loadPluginModule(code)
      const { context, registrations } = createPluginContext({
        pluginId: installation.pluginId,
        userId,
        capabilities: manifest.permissions,
      })
      await callPluginExport<void>(exports, 'init', [context as PluginContext], SANDBOX_TIMEOUT_MS)

      const handler = registrations.widgets.get(slot)
      if (!handler) continue

      const result = await Promise.race([
        Promise.resolve(handler()),
        new Promise<UIBlock[]>((_, reject) =>
          setTimeout(() => reject(new Error('widget handler timed out')), SANDBOX_TIMEOUT_MS),
        ),
      ])
      blocks.push(...result)
    } catch (error) {
      blocks.push(ERROR_BLOCK)
      await logPluginAction(installation.pluginId, userId, 'widget.error', {
        slot,
        message: error instanceof Error ? error.message : String(error),
      })
    }
  }

  return blocks
}
