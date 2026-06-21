'use server'

import { verifySession } from '@/lib/auth/dal'
import { rateLimit, RateLimitError } from '@/lib/rate-limit'
import { invalidatePrefix } from '@/lib/cache'
import { createCampaign } from '@/lib/api/campaigns'
import { getPostById } from '@/lib/api/posts'
import { SchedulePostSchema, type SchedulePostInput } from '../validation'

export interface SchedulePostState {
  success?: boolean
  campaignId?: string
  errors?: { _form?: string[]; [field: string]: string[] | undefined }
}

/**
 * Server Action: schedules a post for a specific future time.
 * Creates a one-shot PUBLISH_POST campaign (totalRuns: 1) pointing at the post.
 * Rate-limited to 10/hour per user (reuses the createPost preset).
 *
 * @param state - Previous action state (from useActionState)
 * @param input - { postId, scheduledAt }
 * @returns SchedulePostState
 *
 * @example
 * await schedulePost({}, { postId: 'clx...', scheduledAt: new Date('2026-07-01T10:00:00Z') })
 */
export async function schedulePost(
  state: SchedulePostState,
  input: SchedulePostInput,
): Promise<SchedulePostState> {
  const { user } = await verifySession()

  try {
    await rateLimit('createPost', (ip) => `${ip}:${user.id}:schedule`)
  } catch (error) {
    if (error instanceof RateLimitError) {
      return { errors: { _form: [error.message] } }
    }
    throw error
  }

  const parsed = SchedulePostSchema.safeParse(input)
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors as SchedulePostState['errors'] }
  }

  // Verify the post exists and belongs to this user
  const post = await getPostById(parsed.data.postId)
  if (!post) return { errors: { _form: ['Post not found'] } }
  if (post.author.id !== user.id) return { errors: { _form: ['Not authorized'] } }

  const campaign = await createCampaign({
    userId: user.id,
    name: `Scheduled: ${parsed.data.postId}`,
    actionType: 'PUBLISH_POST',
    payload: { postId: parsed.data.postId },
    intervalMinutes: 1, // irrelevant for one-shot; required by schema
    totalRuns: 1,
    nextRunAt: parsed.data.scheduledAt,
  })

  await invalidatePrefix('db', 'campaigns')
  await invalidatePrefix('db', 'calendar')

  return { success: true, campaignId: campaign.id }
}
