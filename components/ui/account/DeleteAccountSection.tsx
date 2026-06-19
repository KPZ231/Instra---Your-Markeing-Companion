'use client'

import { useActionState, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { deleteAccount } from '@/features/users/actions/deleteAccount'

interface DeleteAccountState {
  errors?: { confirm?: string[]; _form?: string[] }
  success?: boolean
}

interface DeleteAccountSectionProps {
  /** The user's current username used as the confirmation string */
  username: string | null
}

/**
 * Destructive section for permanently deleting the authenticated user's account.
 * Requires the user to type their username in a confirmation dialog before proceeding.
 * @param username - The user's current username (null if unset)
 * @example
 * <DeleteAccountSection username="jane" />
 */
export function DeleteAccountSection({ username }: DeleteAccountSectionProps) {
  const { t } = useTranslation('common')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [confirmValue, setConfirmValue] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  const [state, formAction, isPending] = useActionState<DeleteAccountState, FormData>(
    deleteAccount,
    {}
  )

  /**
   * Called when the user clicks Confirm in the dialog.
   * Submits the hidden form programmatically.
   */
  function handleConfirm() {
    formRef.current?.requestSubmit()
  }

  function handleOpenDialog() {
    setConfirmValue('')
    setIsDialogOpen(true)
  }

  function handleCloseDialog() {
    setIsDialogOpen(false)
    setConfirmValue('')
  }

  return (
    <section
      className="space-y-3 border-t pt-6 mt-6"
      style={{ borderColor: 'rgba(255,255,255,0.08)' }}
    >
      <h2
        className="font-mono text-xs font-bold uppercase tracking-[0.1em]"
        style={{ color: '#ffb4ab' }}
      >
        {t('account.delete.title')}
      </h2>

      <p className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
        {t('account.delete.warning')}
      </p>

      {/* Form-level errors */}
      {state.errors?._form?.map((err) => (
        <p key={err} className="text-xs" style={{ color: 'var(--color-error)' }}>
          {err}
        </p>
      ))}

      <button
        type="button"
        onClick={handleOpenDialog}
        disabled={isPending}
        className="font-mono text-xs uppercase tracking-[0.08em] px-4 py-2 rounded-sm border transition-opacity disabled:opacity-40"
        style={{
          color: '#ffb4ab',
          borderColor: '#ffb4ab',
          background: 'transparent',
        }}
      >
        {t('account.delete.button')}
      </button>

      {/* Hidden form that actually submits the server action */}
      <form ref={formRef} action={formAction} className="hidden">
        <input type="hidden" name="confirm" value={username ?? ''} />
      </form>

      <ConfirmDialog
        open={isDialogOpen}
        title={t('account.delete.title')}
        description={t('account.delete.warning')}
        confirmLabel={t('account.delete.confirm_action')}
        onConfirm={handleConfirm}
        onClose={handleCloseDialog}
        isPending={isPending}
        requireText={username ?? ''}
        requireTextValue={confirmValue}
        onRequireTextChange={setConfirmValue}
        requireTextLabel={t('account.delete.confirm_label')}
        requireTextPlaceholder={t('account.delete.confirm_placeholder')}
      />
    </section>
  )
}
