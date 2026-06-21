'use server'

import { verifySession } from '@/lib/auth/dal'
import { invalidatePrefix } from '@/lib/cache'
import { getCampaign, updateNextRunAt } from '@/lib/api/campaigns'
import { ReschedulePostSchema, type ReschedulePostInput } from '../validation'

export interface ReschedulePostState {
  success?: boolean
  errors?: { _form?: string[]; [field: string]: string[] | undefined }
}

/**
 * Server Action: moves a scheduled post to a new time.
 * Only works on one-shot PUBLISH_POST campaigns that have not yet run (completedRuns === 0).
 *
 * @param state - Previous action state (from useActionState)
 * @param input - { campaignId, scheduledAt }
 * @returns ReschedulePostState
 *
 * @example
 * await reschedulePost({}, { campaignId: 'clx...', scheduledAt: new Date('2026-07-02T09:00:00Z') })
 */
export async function reschedulePost(
  state: ReschedulePostState,
  input: ReschedulePostInput,
): Promise<ReschedulePostState> {
  const { user } = await verifySession()

  const parsed = ReschedulePostSchema.safeParse(input)
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors as ReschedulePostState['errors'] }
  }

  const campaign = await getCampaign(parsed.data.campaignId)
  if (!campaign) return { errors: { _form: ['Campaign not found'] } }
  if (campaign.userId !== user.id) return { errors: { _form: ['Not authorized'] } }
  if (campaign.actionType !== 'PUBLISH_POST') {
    return { errors: { _form: ['Can only reschedule PUBLISH_POST campaigns'] } }
  }
  if (campaign.completedRuns > 0) {
    return { errors: { _form: ['Post has already been published'] } }
  }
  if (campaign.status !== 'ACTIVE' && campaign.status !== 'PAUSED') {
    return { errors: { _form: ['Campaign is not reschedulable in its current status'] } }
  }

  await updateNextRunAt(parsed.data.campaignId, parsed.data.scheduledAt)
  await invalidatePrefix('db', 'campaigns')
  await invalidatePrefix('db', 'calendar')

  return { success: true }
}
