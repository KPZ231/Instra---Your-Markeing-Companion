'use client'

import { forwardRef } from 'react'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

/**
 * Reusable Textarea component styled with project CSS variables.
 * Supports label, error message, and all standard textarea attributes.
 *
 * @param label - Optional label text above the textarea
 * @param error - Optional error message shown below
 *
 * @example
 * <Textarea name="content" label="Post content" rows={4} maxLength={2200} />
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const fieldId = id ?? props.name

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={fieldId}
            className="font-mono text-[11px] tracking-[0.1em] uppercase mb-1.5 block"
            style={{ color: 'var(--color-on-surface-variant)' }}
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={fieldId}
          className={`w-full rounded-sm border px-3 py-2.5 text-sm font-sans bg-transparent outline-none transition-colors resize-none ${className}`}
          style={{
            background: 'var(--color-surface-container-lowest)',
            borderColor: error ? 'rgba(255,75,75,0.6)' : 'rgba(255,255,255,0.2)',
            color: 'var(--color-primary)',
          }}
          {...props}
        />
        {error && (
          <p className="font-mono text-[10px] mt-1" style={{ color: '#ffb4ab' }}>
            {error}
          </p>
        )}
      </div>
    )
  },
)

Textarea.displayName = 'Textarea'
