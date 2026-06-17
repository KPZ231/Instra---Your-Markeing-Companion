import { z } from 'zod'

export const MAX_POST_LENGTH = 2200
export const MAX_POST_MEDIA = 10

/**
 * Schema for creating a new post.
 * Either content or at least one media item must be present.
 */
export const CreatePostSchema = z
  .object({
    content: z.string().max(MAX_POST_LENGTH, `Content must be at most ${MAX_POST_LENGTH} characters`).optional(),
    mediaCount: z.coerce.number().int().min(0).max(MAX_POST_MEDIA),
  })
  .refine(
    (data) => (data.content && data.content.trim().length > 0) || data.mediaCount > 0,
    { message: 'Post must have content or at least one image', path: ['_form'] },
  )

/**
 * Schema for updating an existing post.
 */
export const UpdatePostSchema = z
  .object({
    postId: z.string().min(1, 'Post ID is required'),
    content: z.string().max(MAX_POST_LENGTH, `Content must be at most ${MAX_POST_LENGTH} characters`).optional(),
    mediaCount: z.coerce.number().int().min(0).max(MAX_POST_MEDIA),
  })
  .refine(
    (data) => (data.content && data.content.trim().length > 0) || data.mediaCount > 0,
    { message: 'Post must have content or at least one image', path: ['_form'] },
  )
