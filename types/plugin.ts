import type { WidgetSlot } from '@prisma/client'
import type { UIBlock } from '@/lib/plugins/blocks'
import type { PluginManifest } from '@/lib/plugins/manifest'

export type WidgetHandler = () => UIBlock[] | Promise<UIBlock[]>
export type RouteHandler = () => UIBlock[] | Promise<UIBlock[]>

export interface MenuItemRegistration {
  label: string
  path: string
}

export interface PluginContext {
  registerWidget(slot: WidgetSlot, handler: WidgetHandler): void
  registerRoute(path: string, handler: RouteHandler): void
  registerMenuItem(item: MenuItemRegistration): void
  on(event: string, listener: (payload: unknown) => void): void
  off(event: string, listener: (payload: unknown) => void): void
  emit(event: string, payload: unknown): void
  api: {
    storage: {
      get(key: string): Promise<unknown>
      set(key: string, value: unknown): Promise<void>
    }
  }
  logger: {
    info(message: string): void
    error(message: string): void
  }
}

export interface InstraPlugin {
  init(context: PluginContext): void | Promise<void>
  destroy?(): void | Promise<void>
}

export type { PluginManifest }
