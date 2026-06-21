'use client'

import { useTranslation } from 'react-i18next'
import type { CampaignStatus } from '@prisma/client'

const STATUS_COLORS: Record<CampaignStatus, string> = {
  ACTIVE: 'var(--color-success-green)',
  PAUSED: 'var(--color-outline)',
  COMPLETED: 'var(--color-on-surface-variant)',
  FAILED: '#ffb4ab',
}

const STATUS_SYMBOLS: Record<CampaignStatus, string> = {
  ACTIVE: '▶',
  PAUSED: '⏸',
  COMPLETED: '✓',
  FAILED: '✗',
}

interface CampaignStatusBadgeProps {
  status: CampaignStatus
}

/**
 * Badge showing campaign status with symbol + label (not color alone).
 *
 * @param status - Campaign status value
 * @example
 * <CampaignStatusBadge status="ACTIVE" />
 */
export function CampaignStatusBadge({ status }: CampaignStatusBadgeProps) {
  const { t } = useTranslation('common')
  const color = STATUS_COLORS[status] ?? 'var(--color-outline)'
  const symbol = STATUS_SYMBOLS[status] ?? '·'

  return (
    <span
      className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.08em] px-1.5 py-0.5 rounded-sm"
      style={{
        color,
        background: 'var(--color-surface-container)',
        border: `1px solid ${color}`,
      }}
    >
      <span aria-hidden="true">{symbol}</span>
      {t(`campaigns.status.${status.toLowerCase()}`)}
    </span>
  )
}
