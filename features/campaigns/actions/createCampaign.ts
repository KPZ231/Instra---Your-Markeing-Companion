'use server'

import { verifySession } from '@/lib/auth/dal'
import { rateLimit, RateLimitError } from '@/lib/rate-limit'
import { invalidatePrefix } from '@/lib/cache'
import { createCampaign as dbCreateCampaign } from '@/lib/api/campaigns'
import { computeFirstRunAt } from '../lib/scheduling'
import { CreateCampaignSchema, type CreateCampaignInput } from '../validation'

export interface CreateCampaignState {
  success?: boolean
  campaignId?: string
  errors?: { _form?: string[]; [field: string]: string[] | undefined }
}

/**
 * Server Action: creates a new campaign for the authenticated user.
 * Rate-limited to 10 creates/hour per user (reuses createPost preset).
 *
 * @param state - Previous action state (from useActionState)
 * @param input - Campaign creation input
 * @returns CreateCampaignState
 *
 * @example
 * await createCampaign({}, { name: 'Launch', actionType: 'WEBHOOK', payload: { url: '...' }, intervalMinutes: 60, totalRuns: 5 })
 */
export async function createCampaign(
  state: CreateCampaignState,
  input: CreateCampaignInput,
): Promise<CreateCampaignState> {
  const { user } = await verifySession()

  try {
    await rateLimit('createPost', (ip) => `${ip}:${user.id}:campaigns`)
  } catch (error) {
    if (error instanceof RateLimitError) {
      return { errors: { _form: [error.message] } }
    }
    throw error
  }

  const parsed = CreateCampaignSchema.safeParse(input)
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors as CreateCampaignState['errors'] }
  }

  const campaign = await dbCreateCampaign({
    userId: user.id,
    name: parsed.data.name,
    actionType: parsed.data.actionType,
    payload: parsed.data.payload,
    intervalMinutes: parsed.data.intervalMinutes,
    totalRuns: parsed.data.totalRuns,
    nextRunAt: computeFirstRunAt(parsed.data.startAt),
  })

  await invalidatePrefix('db', 'campaigns')

  return { success: true, campaignId: campaign.id }
}
