'use server'

import { verifySession } from '@/lib/auth/dal'
import { invalidatePrefix } from '@/lib/cache'
import { getCampaign, setStatus } from '@/lib/api/campaigns'

export interface ResumeCampaignState {
  success?: boolean
  errors?: { _form?: string[] }
}

/**
 * Server Action: resumes a PAUSED campaign owned by the authenticated user.
 *
 * @param state      - Previous action state
 * @param campaignId - Campaign to resume
 * @returns ResumeCampaignState
 *
 * @example
 * await resumeCampaign({}, 'clx...')
 */
export async function resumeCampaign(
  state: ResumeCampaignState,
  campaignId: string,
): Promise<ResumeCampaignState> {
  const { user } = await verifySession()

  const campaign = await getCampaign(campaignId)
  if (!campaign) return { errors: { _form: ['Campaign not found'] } }
  if (campaign.userId !== user.id) return { errors: { _form: ['Not authorized'] } }
  if (campaign.status !== 'PAUSED') return { errors: { _form: ['Campaign is not paused'] } }

  await setStatus(campaignId, 'ACTIVE')
  await invalidatePrefix('db', 'campaigns')

  return { success: true }
}
