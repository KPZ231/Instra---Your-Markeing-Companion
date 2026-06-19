'use client'

import { useActionState } from 'react'
import { useTranslation } from 'react-i18next'
import { changeUsername } from '@/features/users/actions/changeUsername'

interface ChangeUsernameState {
  errors?: { username?: string[]; _form?: string[] }
  success?: boolean
  remaining?: number
}

interface ChangeUsernameFormProps {
  /** The user's current username, or null if not set */
  initialUsername: string | null
  /** How many username changes remain this calendar year */
  initialRemaining: number
}

/**
 * Form for changing the authenticated user's username.
 * Enforces a limit of 3 changes per year and shows remaining count.
 * @param initialUsername - Current username (null if unset)
 * @param initialRemaining - Remaining changes allowed this year
 * @example
 * <ChangeUsernameForm initialUsername="jane" initialRemaining={2} />
 */
export function ChangeUsernameForm({ initialUsername, initialRemaining }: ChangeUsernameFormProps) {
  const { t } = useTranslation('common')

  const [state, formAction, isPending] = useActionState<ChangeUsernameState, FormData>(
    changeUsername,
    { remaining: initialRemaining }
  )

  const remaining = state.remaining ?? initialRemaining
  const isLimitReached = remaining === 0

  return (
    <section className="space-y-4">
      <h2
        className="font-mono text-xs font-bold uppercase tracking-[0.1em]"
        style={{ color: 'var(--color-on-surface)' }}
      >
        {t('account.username.section_title')}
      </h2>

      <form action={formAction} className="space-y-3">
        <div className="space-y-1.5">
          <label
            htmlFor="username"
            className="block font-mono text-xs uppercase tracking-[0.08em]"
            style={{ color: 'var(--color-on-surface-variant)' }}
          >
            {t('account.username.label')}
          </label>

          <input
            id="username"
            name="username"
            type="text"
            defaultValue={initialUsername ?? ''}
            disabled={isLimitReached || isPending}
            className="w-full rounded-sm border px-3 py-2 text-sm bg-transparent outline-none focus:ring-1 disabled:opacity-40"
            style={{
              borderColor: 'rgba(255,255,255,0.15)',
              color: 'var(--color-on-surface)',
              caretColor: 'var(--color-primary)',
            }}
            autoComplete="username"
          />

          {/* Field error */}
          {state.errors?.username?.map((err) => (
            <p key={err} className="text-xs" style={{ color: 'var(--color-error)' }}>
              {err}
            </p>
          ))}

          {/* Limit reached message */}
          {isLimitReached ? (
            <p className="text-xs" style={{ color: 'var(--color-error)' }}>
              {t('account.username.limit_reached')}
            </p>
          ) : (
            <p className="text-xs" style={{ color: 'var(--color-on-surface-variant)' }}>
              {t('account.username.helper', { remaining })}
            </p>
          )}
        </div>

        {/* Form-level error */}
        {state.errors?._form?.map((err) => (
          <p key={err} className="text-xs" style={{ color: 'var(--color-error)' }}>
            {err}
          </p>
        ))}

        {/* Success message */}
        {state.success && (
          <p className="text-xs" style={{ color: '#a8d5a2' }}>
            {t('account.username.success')}
          </p>
        )}

        <button
          type="submit"
          disabled={isLimitReached || isPending}
          className="btn btn-primary disabled:opacity-40"
        >
          {isPending ? '...' : t('account.username.save')}
        </button>
      </form>
    </section>
  )
}
