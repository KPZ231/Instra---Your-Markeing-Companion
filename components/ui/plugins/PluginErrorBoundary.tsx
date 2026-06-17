'use client'

import { Component, type ReactNode } from 'react'
import { logPluginAction } from '@/lib/plugins/audit'

interface PluginErrorBoundaryProps {
  children: ReactNode
  /** Optional plugin ID for audit logging */
  pluginId?: string
  /** Optional user ID for audit logging */
  userId?: string
}

interface PluginErrorBoundaryState {
  hasError: boolean
}

/**
 * Catches render-time exceptions thrown while rendering a plugin's block
 * tree so one broken plugin widget cannot crash the surrounding page.
 * When `pluginId` is provided, render errors are written to the audit log.
 *
 * @example
 * <PluginErrorBoundary pluginId="my-plugin" userId={userId}>
 *   <SomePluginWidget />
 * </PluginErrorBoundary>
 */
export class PluginErrorBoundary extends Component<PluginErrorBoundaryProps, PluginErrorBoundaryState> {
  state: PluginErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    const { pluginId, userId } = this.props
    if (pluginId) {
      try {
        // Fire-and-forget: class lifecycle cannot be async
        logPluginAction(pluginId, userId ?? null, 'widget.render.error', {
          error: error.message,
          componentStack: info.componentStack,
        })
      } catch {
        // Suppress audit errors to avoid masking the original render failure
      }
    }
  }

  render() {
    if (this.state.hasError) {
      return <p className="text-sm text-accent-bone/60">This widget failed to render.</p>
    }
    return this.props.children
  }
}
