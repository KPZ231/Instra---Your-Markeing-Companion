import { describe, it, expect } from 'vitest'
import { PLUGIN_CAPABILITIES, WIDGET_SLOT_CAPABILITY, SANDBOX_TIMEOUT_MS } from './config'

describe('plugin config', () => {
  it('maps every WidgetSlot to a capability string', () => {
    expect(WIDGET_SLOT_CAPABILITY.DASHBOARD_TOP).toBe('widgets:dashboard:top')
    expect(WIDGET_SLOT_CAPABILITY.PROFILE_MENU).toBe('widgets:profile:menu')
  })

  it('includes core non-widget capabilities', () => {
    expect(PLUGIN_CAPABILITIES).toContain('routes:register')
    expect(PLUGIN_CAPABILITIES).toContain('storage:kv')
  })

  it('defines a positive sandbox timeout', () => {
    expect(SANDBOX_TIMEOUT_MS).toBeGreaterThan(0)
  })
})
