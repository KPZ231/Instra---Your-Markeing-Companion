import type { WidgetSlot } from '@prisma/client'

export const WIDGET_SLOT_CAPABILITY: Record<WidgetSlot, string> = {
  DASHBOARD_TOP: 'widgets:dashboard:top',
  DASHBOARD_SIDEBAR: 'widgets:dashboard:sidebar',
  DASHBOARD_BOTTOM: 'widgets:dashboard:bottom',
  SETTINGS_GENERAL: 'widgets:settings:general',
  SETTINGS_ADVANCED: 'widgets:settings:advanced',
  HEADER_ACTIONS: 'widgets:header:actions',
  PROFILE_MENU: 'widgets:profile:menu',
}

export const PLUGIN_CAPABILITIES = [
  ...Object.values(WIDGET_SLOT_CAPABILITY),
  'routes:register',
  'menu:register',
  'events:emit',
  'events:listen',
  'storage:kv',
] as const

export type PluginCapability = (typeof PLUGIN_CAPABILITIES)[number]

/** Max time (ms) a single plugin export call may run before being aborted. */
export const SANDBOX_TIMEOUT_MS = 500

/** Max time (ms) the vm is allowed to spend on synchronous module evaluation. */
export const SANDBOX_COMPILE_TIMEOUT_MS = 100
