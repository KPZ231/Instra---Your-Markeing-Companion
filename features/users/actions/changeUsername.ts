'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth/dal'
import { rateLimit, RateLimitError } from '@/lib/rate-limit'
import { ChangeUsernameSchema, MAX_USERNAME_CHANGES_PER_YEAR } from '../validation'
import type { ChangeUsernameState } from './types'

/**
 * Server Action: changes the authenticated user's username.
 * Enforces rate limiting, yearly change cap (3/year), and uniqueness.
 * Logs each change to UsernameChange for audit purposes.
 *
 * @param state    - Previous action state (from useActionState)
 * @param formData - Fields: username (string)
 * @returns ChangeUsernameState with field errors, or success + remaining changes
 *
 * @example
 * const [state, action] = useActionState(changeUsername, {})
 */
export async function changeUsername(
  state: ChangeUsernameState,
  formData: FormData,
): Promise<ChangeUsernameState> {
  const { user } = await verifySession()

  try {
    await rateLimit('changeUsername', (ip) => `${ip}:${user.id}`)
  } catch (error) {
    if (error instanceof RateLimitError) {
      return { errors: { _form: [error.message] } }
    }
    throw error
  }

  const parsed = ChangeUsernameSchema.safeParse({ username: formData.get('username') })
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors as ChangeUsernameState['errors'] }
  }

  const count = await prisma.usernameChange.count({
    where: {
      userId: user.id,
      createdAt: { gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) },
    },
  })

  if (count >= MAX_USERNAME_CHANGES_PER_YEAR) {
    return { errors: { username: ['You have reached the limit of 3 username changes per year'] } }
  }

  const existingUser = await prisma.user.findFirst({
    where: { username: parsed.data.username, NOT: { id: user.id } },
  })

  if (existingUser) {
    return { errors: { username: ['This username is already taken'] } }
  }

  const currentUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { username: true },
  })

  await prisma.$transaction([
    prisma.user.update({
      where: { id: user.id },
      data: { username: parsed.data.username },
    }),
    prisma.usernameChange.create({
      data: {
        userId: user.id,
        oldUsername: currentUser?.username ?? null,
        newUsername: parsed.data.username,
      },
    }),
  ])

  revalidatePath('/dashboard/settings')
  revalidatePath('/dashboard/profile')

  return { success: true, remaining: MAX_USERNAME_CHANGES_PER_YEAR - (count + 1) }
}
