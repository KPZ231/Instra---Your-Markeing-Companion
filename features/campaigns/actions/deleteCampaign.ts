'use server'

import { verifySession } from '@/lib/auth/dal'
import { invalidatePrefix } from '@/lib/cache'
import { getCampaign, deleteCampaign as dbDeleteCampaign } from '@/lib/api/campaigns'

export interface DeleteCampaignState {
  success?: boolean
  errors?: { _form?: string[] }
}

/**
 * Server Action: permanently deletes a campaign and its run history.
 * Only the owner can delete their campaign.
 *
 * @param state      - Previous action state
 * @param campaignId - Campaign to delete
 * @returns DeleteCampaignState
 *
 * @example
 * await deleteCampaign({}, 'clx...')
 */
export async function deleteCampaign(
  state: DeleteCampaignState,
  campaignId: string,
): Promise<DeleteCampaignState> {
  const { user } = await verifySession()

  const campaign = await getCampaign(campaignId)
  if (!campaign) return { errors: { _form: ['Campaign not found'] } }
  if (campaign.userId !== user.id) return { errors: { _form: ['Not authorized'] } }

  await dbDeleteCampaign(campaignId)
  await invalidatePrefix('db', 'campaigns')
  await invalidatePrefix('db', 'calendar')

  return { success: true }
}
