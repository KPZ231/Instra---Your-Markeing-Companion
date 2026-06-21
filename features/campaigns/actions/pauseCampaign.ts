'use server'

import { verifySession } from '@/lib/auth/dal'
import { invalidatePrefix } from '@/lib/cache'
import { getCampaign, setStatus } from '@/lib/api/campaigns'

export interface PauseCampaignState {
  success?: boolean
  errors?: { _form?: string[] }
}

/**
 * Server Action: pauses an ACTIVE campaign owned by the authenticated user.
 *
 * @param state      - Previous action state
 * @param campaignId - Campaign to pause
 * @returns PauseCampaignState
 *
 * @example
 * await pauseCampaign({}, 'clx...')
 */
export async function pauseCampaign(
  state: PauseCampaignState,
  campaignId: string,
): Promise<PauseCampaignState> {
  const { user } = await verifySession()

  const campaign = await getCampaign(campaignId)
  if (!campaign) return { errors: { _form: ['Campaign not found'] } }
  if (campaign.userId !== user.id) return { errors: { _form: ['Not authorized'] } }
  if (campaign.status !== 'ACTIVE') return { errors: { _form: ['Campaign is not active'] } }

  await setStatus(campaignId, 'PAUSED')
  await invalidatePrefix('db', 'campaigns')

  return { success: true }
}
