'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * Section allowing the authenticated user to export all their account data as JSON.
 * Triggers a browser download by fetching /api/account/export and creating an object URL.
 * @example
 * <ExportAccountData />
 */
export function ExportAccountData() {
  const { t } = useTranslation('common')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * Fetches the export endpoint, converts the response to a Blob,
   * creates a temporary object URL, and triggers a file download.
   */
  async function handleExport() {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/account/export')

      if (!response.ok) {
        throw new Error(`Export failed: ${response.statusText}`)
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const anchor = document.createElement('a')
      anchor.href = url
      anchor.download = 'instra-account-data.json'
      document.body.appendChild(anchor)
      anchor.click()
      document.body.removeChild(anchor)
      URL.revokeObjectURL(url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="space-y-3">
      <h2
        className="font-mono text-xs font-bold uppercase tracking-[0.1em]"
        style={{ color: 'var(--color-on-surface)' }}
      >
        {t('account.export.title')}
      </h2>

      <p className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
        {t('account.export.description')}
      </p>

      {error && (
        <p className="text-xs" style={{ color: 'var(--color-error)' }}>
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={handleExport}
        disabled={isLoading}
        className="btn btn-secondary disabled:opacity-40"
      >
        {isLoading ? t('account.export.loading') : t('account.export.button')}
      </button>
    </section>
  )
}
