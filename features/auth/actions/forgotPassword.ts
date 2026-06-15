'use server'

import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { createPasswordResetToken } from '@/lib/auth/resetToken'
import { sendMail } from '@/lib/email/mailer'
import { buildResetPasswordEmail, buildResetPasswordText } from '@/lib/email/templates/resetPassword'
import { rateLimit, RateLimitError } from '@/lib/rate-limit'
import type { AuthActionState } from '../types'

const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .refine((v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 'Enter a valid email address'),
})

/**
 * Server Action: validates the submitted email, checks it exists in the DB,
 * generates a reset token, and sends the reset link via Google SMTP.
 * @param state - Previous action state (from useActionState)
 * @param formData - Form field: email
 */
export async function forgotPassword(
  state: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const raw = { email: formData.get('email') as string }

  const parsed = ForgotPasswordSchema.safeParse(raw)
  if (!parsed.success) {
    return { errors: { email: parsed.error.flatten().fieldErrors.email } }
  }

  const { email } = parsed.data

  try {
    // Key combines IP + email so each account gets its own per-IP limit,
    // preventing targeted account lockout via a single compromised IP.
    await rateLimit('forgotPassword', (ip) => `${ip}:${email}`)
  } catch (error) {
    if (error instanceof RateLimitError) {
      return { errors: { _form: [error.message] } }
    }
    throw error
  }

  // Constant-time baseline: always wait at least 500 ms so timing doesn't
  // reveal whether an account exists (user enumeration via response time).
  const minDelay = new Promise<void>((resolve) => setTimeout(resolve, 500))

  const user = await prisma.user.findUnique({ where: { email } })

  if (user) {
    const rawToken = await createPasswordResetToken(email)
    const baseUrl = process.env.AUTH_URL ?? 'http://localhost:3000'
    const resetUrl = `${baseUrl}/reset-password?token=${rawToken}`

    await sendMail({
      to: email,
      subject: 'Reset your Instra password',
      html: buildResetPasswordEmail({ resetUrl }),
      text: buildResetPasswordText(resetUrl),
    })
  }

  await minDelay
  return { success: true }
}
