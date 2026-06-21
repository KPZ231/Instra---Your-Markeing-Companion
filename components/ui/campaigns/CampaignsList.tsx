'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import type { Campaign, CampaignRun, CampaignStatus } from '@prisma/client'
import { CampaignRow } from './CampaignRow'

type CampaignWithRuns = Campaign & { runs: CampaignRun[] }

interface CampaignsListProps {
  campaigns: CampaignWithRuns[]
}

const FILTER_OPTIONS: Array<CampaignStatus | 'ALL'> = [
  'ALL',
  'ACTIVE',
  'PAUSED',
  'COMPLETED',
  'FAILED',
]

/**
 * Filtered list of campaigns with status chips.
 * Manages its own filter state; each CampaignRow manages its own history toggle.
 *
 * @param campaigns - Array of Campaign rows with pre-fetched runs
 * @example
 * <CampaignsList campaigns={campaigns} />
 */
export function CampaignsList({ campaigns }: CampaignsListProps) {
  const { t } = useTranslation('common')
  const [filter, setFilter] = useState<CampaignStatus | 'ALL'>('ALL')

  const filtered =
    filter === 'ALL' ? campaigns : campaigns.filter((c) => c.status === filter)

  if (campaigns.length === 0) {
    return (
      <div
        className="rounded-sm border flex flex-col items-center justify-center py-16 gap-4"
        style={{ borderColor: 'rgba(255,255,255,0.06)', borderStyle: 'dashed' }}
      >
        <p
          className="font-mono text-xs tracking-[0.1em] uppercase"
          style={{ color: 'var(--color-on-surface-variant)' }}
        >
          {t('campaigns.page.empty')}
        </p>
        <Link
          href="/dashboard/campaigns/new"
          className="font-mono text-xs uppercase tracking-[0.08em] px-4 py-2 rounded-sm border transition-opacity hover:opacity-80 min-h-[44px] flex items-center"
          style={{
            borderColor: 'rgba(232,227,217,0.3)',
            color: 'var(--color-accent-bone)',
          }}
        >
          {t('campaigns.page.new')}
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Filter chips */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter campaigns">
        {FILTER_OPTIONS.map((opt) => {
          const isActive = filter === opt
          const labelKey =
            opt === 'ALL' ? 'campaigns.filter.all' : `campaigns.filter.${opt.toLowerCase()}`

          return (
            <button
              key={opt}
              type="button"
              onClick={() => setFilter(opt)}
              className="font-mono text-[10px] uppercase tracking-[0.08em] px-3 py-1.5 rounded-sm border transition-opacity min-h-[36px]"
              style={{
                borderColor: isActive
                  ? 'var(--color-accent-bone)'
                  : 'rgba(255,255,255,0.12)',
                color: isActive
                  ? 'var(--color-accent-bone)'
                  : 'var(--color-on-surface-variant)',
                background: isActive
                  ? 'rgba(232,227,217,0.06)'
                  : 'transparent',
              }}
              aria-pressed={isActive}
            >
              {t(labelKey)} {opt !== 'ALL' && `(${campaigns.filter((c) => c.status === opt).length})`}
            </button>
          )
        })}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <p
          className="font-mono text-xs tracking-[0.08em] py-8 text-center"
          style={{ color: 'var(--color-on-surface-variant)' }}
        >
          {t('campaigns.page.empty')}
        </p>
      ) : (
        <div className="space-y-3">
          {filtered.map((campaign) => (
            <CampaignRow
              key={campaign.id}
              campaign={campaign}
              runs={campaign.runs}
            />
          ))}
        </div>
      )}
    </div>
  )
}
