'use client'

import { useEffect, useRef } from 'react'

interface ConfirmDialogProps {
  open: boolean
  title: string
  description: string
  confirmLabel: string
  onConfirm: () => void
  onClose: () => void
  isPending?: boolean
  /** If provided, user must type this exact string before confirming */
  requireText?: string
  requireTextValue?: string
  onRequireTextChange?: (value: string) => void
  requireTextPlaceholder?: string
  requireTextLabel?: string
}

/**
 * Accessible confirmation dialog with optional text-confirmation field.
 * Uses role="dialog", Escape key to close, and autoFocus on open.
 * @param open - Whether the dialog is visible
 * @param title - Dialog heading
 * @param description - Explanatory text
 * @param confirmLabel - Label for the confirm button (destructive)
 * @param onConfirm - Called when user confirms
 * @param onClose - Called to close the dialog
 * @param isPending - Disables buttons while action is processing
 * @param requireText - If set, user must type this string before confirm is enabled
 * @param requireTextValue - Current value of the require-text input
 * @param onRequireTextChange - Callback for require-text input changes
 * @param requireTextPlaceholder - Placeholder for the require-text input
 * @param requireTextLabel - Label for the require-text input
 * @example
 * <ConfirmDialog
 *   open={isOpen}
 *   title="Delete Account"
 *   description="This cannot be undone."
 *   confirmLabel="Delete"
 *   onConfirm={handleDelete}
 *   onClose={() => setIsOpen(false)}
 *   requireText="my-username"
 *   requireTextValue={confirmValue}
 *   onRequireTextChange={setConfirmValue}
 * />
 */
export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  onConfirm,
  onClose,
  isPending = false,
  requireText,
  requireTextValue = '',
  onRequireTextChange,
  requireTextPlaceholder,
  requireTextLabel,
}: ConfirmDialogProps) {
  const firstFocusableRef = useRef<HTMLButtonElement | HTMLInputElement | null>(null)

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    if (firstFocusableRef.current) {
      firstFocusableRef.current.focus()
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  const isConfirmDisabled =
    isPending || (requireText !== undefined && requireTextValue !== requireText)

  return (
    <>
      {/* Scrim */}
      <div
        className="fixed inset-0 z-40"
        style={{ background: 'rgba(0,0,0,0.6)' }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
      >
        <div
          className="w-full max-w-md rounded-sm p-6 space-y-4"
          style={{
            background: '#121212',
            border: '1px solid rgba(232,227,217,0.2)',
          }}
        >
          <h2
            id="confirm-dialog-title"
            className="font-mono text-sm font-bold uppercase tracking-[0.1em]"
            style={{ color: 'var(--color-on-surface)' }}
          >
            {title}
          </h2>

          <p
            id="confirm-dialog-description"
            className="text-sm leading-relaxed"
            style={{ color: 'var(--color-on-surface-variant)' }}
          >
            {description}
          </p>

          {requireText !== undefined && (
            <div className="space-y-1.5">
              {requireTextLabel && (
                <label
                  htmlFor="confirm-dialog-input"
                  className="block font-mono text-xs uppercase tracking-[0.08em]"
                  style={{ color: 'var(--color-on-surface-variant)' }}
                >
                  {requireTextLabel}
                </label>
              )}
              <input
                id="confirm-dialog-input"
                ref={firstFocusableRef as React.RefObject<HTMLInputElement>}
                type="text"
                value={requireTextValue}
                onChange={(e) => onRequireTextChange?.(e.target.value)}
                placeholder={requireTextPlaceholder}
                disabled={isPending}
                className="w-full rounded-sm border px-3 py-2 text-sm bg-transparent outline-none focus:ring-1 disabled:opacity-50"
                style={{
                  borderColor: 'rgba(255,255,255,0.15)',
                  color: 'var(--color-on-surface)',
                  caretColor: 'var(--color-primary)',
                }}
                autoComplete="off"
              />
            </div>
          )}

          <div className="flex gap-3 pt-2 justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="btn btn-secondary"
              ref={requireText === undefined ? (firstFocusableRef as React.RefObject<HTMLButtonElement>) : undefined}
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={onConfirm}
              disabled={isConfirmDisabled}
              className="font-mono text-xs uppercase tracking-[0.08em] px-4 py-2 rounded-sm border transition-opacity disabled:opacity-40"
              style={{
                color: '#ffb4ab',
                borderColor: '#ffb4ab',
                background: 'transparent',
              }}
            >
              {isPending ? '...' : confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
