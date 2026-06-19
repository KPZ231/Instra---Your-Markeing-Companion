'use server'

import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth/dal'
import { rateLimit, RateLimitError } from '@/lib/rate-limit'
import { invalidatePrefix } from '@/lib/cache'

const RecordMetricsSchema = z.object({
  postId:      z.string().min(1),
  impressions: z.number().int().min(0).default(0),
  reach:       z.number().int().min(0).default(0),
  views:       z.number().int().min(0).default(0),
  clicks:      z.number().int().min(0).default(0),
  shares:      z.number().int().min(0).default(0),
  comments:    z.number().int().min(0).default(0),
  platform:    z.enum(['FACEBOOK', 'INSTAGRAM', 'LINKEDIN']).optional(),
})

export type RecordMetricsInput = z.infer<typeof RecordMetricsSchema>

export interface RecordMetricsState {
  success?: boolean
  errors?: { _form?: string[]; [field: string]: string[] | undefined }
}

/**
 * Server Action: records a metric snapshot for one of the user's posts.
 * Used to feed real engagement data into the analytics system.
 * Rate-limited to 60 calls/hour per user.
 *
 * @param state - Previous action state (from useActionState)
 * @param input - Metric values + postId
 * @returns RecordMetricsState
 *
 * @example
 * await recordMetrics({}, { postId: 'clx...', impressions: 500, reach: 400, views: 300 })
 */
export async function recordMetrics(
  state: RecordMetricsState,
  input: RecordMetricsInput,
): Promise<RecordMetricsState> {
  const { user } = await verifySession()

  try {
    await rateLimit('recordMetrics', (ip) => `${ip}:${user.id}`)
  } catch (error) {
    if (error instanceof RateLimitError) {
      return { errors: { _form: [error.message] } }
    }
    throw error
  }

  const parsed = RecordMetricsSchema.safeParse(input)
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors as RecordMetricsState['errors'] }
  }

  // Verify post ownership
  const post = await prisma.post.findUnique({
    where: { id: parsed.data.postId },
    select: { authorId: true },
  })

  if (!post) return { errors: { _form: ['Post not found'] } }
  if (post.authorId !== user.id) return { errors: { _form: ['Not authorized'] } }

  await prisma.postMetricSnapshot.create({
    data: {
      postId:      parsed.data.postId,
      platform:    parsed.data.platform ?? null,
      impressions: parsed.data.impressions,
      reach:       parsed.data.reach,
      views:       parsed.data.views,
      clicks:      parsed.data.clicks,
      shares:      parsed.data.shares,
      comments:    parsed.data.comments,
    },
  })

  await invalidatePrefix('db', 'analytics')

  return { success: true }
}
