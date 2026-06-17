'use client'

import { Component, type ReactNode } from 'react'

interface PluginErrorBoundaryProps {
  children: ReactNode
}

interface PluginErrorBoundaryState {
  hasError: boolean
}

/**
 * Catches render-time exceptions thrown while rendering a plugin's block
 * tree so one broken plugin widget cannot crash the surrounding page.
 *
 * @example
 * <PluginErrorBoundary>
 *   <SomePluginWidget />
 * </PluginErrorBoundary>
 */
export class PluginErrorBoundary extends Component<PluginErrorBoundaryProps, PluginErrorBoundaryState> {
  state: PluginErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return <p className="text-sm text-bone/60">This widget failed to render.</p>
    }
    return this.props.children
  }
}
