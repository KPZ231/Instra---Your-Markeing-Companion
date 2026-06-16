import { z } from 'zod'
import { PLUGIN_CAPABILITIES } from './config'

const SEMVER_RE = /^\d+\.\d+\.\d+$/

export const manifestSchema = z.object({
  name: z.string().min(1).max(80),
  version: z.string().regex(SEMVER_RE, 'version must be semver (x.y.z)'),
  description: z.string().min(1).max(300),
  author: z.string().min(1).max(120),
  permissions: z.array(z.enum(PLUGIN_CAPABILITIES)).max(PLUGIN_CAPABILITIES.length),
  main: z.string().min(1),
  locales: z.record(z.string(), z.record(z.string(), z.string())).optional(),
})

export type PluginManifest = z.infer<typeof manifestSchema>

/**
 * Validates raw JSON against the plugin manifest schema.
 * @param raw - Parsed JSON content of a plugin's manifest.json
 * @returns Zod safeParse result with either `data` or `error`
 * @example parseManifest(JSON.parse(rawJson))
 */
export function parseManifest(raw: unknown) {
  return manifestSchema.safeParse(raw)
}
