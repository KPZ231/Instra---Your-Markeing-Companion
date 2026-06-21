import { z } from 'zod'

export const PublishPostPayloadSchema = z.object({
  postIds: z.array(z.string().min(1)).min(1, 'Select at least one post'),
})

export const WebhookPayloadSchema = z.object({
  // Scheme validation at creation time; DNS-based SSRF check happens again at execution time.
  url: z
    .string()
    .url()
    .refine(
      (u) => {
        try {
          const { protocol } = new URL(u)
          return protocol === 'http:' || protocol === 'https:'
        } catch {
          return false
        }
      },
      { message: 'Webhook URL must use http or https' },
    ),
  method: z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']).default('POST'),
  body: z.string().optional(),
})

/**
 * Schema for creating a new campaign.
 * payload is validated against the actionType-specific sub-schema.
 */
export const CreateCampaignSchema = z
  .object({
    name: z.string().min(1).max(100),
    actionType: z.enum(['PUBLISH_POST', 'WEBHOOK']),
    payload: z.record(z.string(), z.unknown()),
    intervalMinutes: z.number().int().min(1),
    totalRuns: z.number().int().min(1).max(10_000),
    startAt: z.date().optional(), // defaults to now()
  })
  .refine(
    (data) =>
      data.actionType !== 'PUBLISH_POST' ||
      PublishPostPayloadSchema.safeParse(data.payload).success,
    'PUBLISH_POST requires at least one postId',
  )
  .refine(
    (data) =>
      data.actionType !== 'WEBHOOK' ||
      WebhookPayloadSchema.safeParse(data.payload).success,
    'WEBHOOK requires a valid http/https url',
  )

export type CreateCampaignInput = z.infer<typeof CreateCampaignSchema>

export const SetStatusSchema = z.object({
  id: z.string().min(1),
  status: z.enum(['ACTIVE', 'PAUSED', 'COMPLETED', 'FAILED']),
})

export const DeleteCampaignSchema = z.object({
  id: z.string().min(1),
})

/**
 * Schedules a single post for a specific future time.
 * Creates a one-shot PUBLISH_POST campaign under the hood.
 */
export const SchedulePostSchema = z.object({
  postId: z.string().min(1, 'Post ID is required'),
  scheduledAt: z
    .date()
    .refine((d) => d.getTime() > Date.now(), { message: 'scheduledAt must be in the future' }),
})

export type SchedulePostInput = z.infer<typeof SchedulePostSchema>

/**
 * Reschedules an existing one-shot PUBLISH_POST campaign to a new time.
 */
export const ReschedulePostSchema = z.object({
  campaignId: z.string().min(1, 'Campaign ID is required'),
  scheduledAt: z
    .date()
    .refine((d) => d.getTime() > Date.now(), { message: 'scheduledAt must be in the future' }),
})

export type ReschedulePostInput = z.infer<typeof ReschedulePostSchema>
