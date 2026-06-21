'use client'

import { useState } from 'react'
import { Check, Search, FileText } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { UserPostOption } from '@/lib/api/posts'

interface PostSelectorProps {
  posts: UserPostOption[]
  selected: string[]
  onChange: (ids: string[]) => void
  disabled?: boolean
}

const PLATFORM_COLORS: Record<string, string> = {
  twitter: 'rgba(29,161,242,0.18)',
  x: 'rgba(255,255,255,0.10)',
  instagram: 'rgba(193,53,132,0.18)',
  facebook: 'rgba(66,103,178,0.18)',
  linkedin: 'rgba(0,119,181,0.18)',
  tiktok: 'rgba(255,0,80,0.14)',
}

function getPlatformStyle(p: string) {
  return PLATFORM_COLORS[p.toLowerCase()] ?? 'rgba(255,255,255,0.08)'
}

function formatDate(d: Date) {
  return new Date(d).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

/**
 * Multi-select post picker for PUBLISH_POST campaign action.
 * Shows search when >4 posts. Renders platform chips + date per row.
 *
 * @param posts    - All user posts to select from
 * @param selected - Currently selected post IDs
 * @param onChange - Called with updated ID array on toggle
 * @param disabled - Disables all interaction during form submission
 *
 * @example
 * <PostSelector posts={posts} selected={postIds} onChange={setPostIds} />
 */
export function PostSelector({ posts, selected, onChange, disabled }: PostSelectorProps) {
  const { t } = useTranslation('common')
  const [query, setQuery] = useState('')

  function toggle(id: string) {
    onChange(selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id])
  }

  if (posts.length === 0) {
    return (
      <div
        className="flex flex-col items-center gap-3 py-8 px-4 rounded-sm border text-center"
        style={{ borderColor: 'rgba(255,255,255,0.10)', borderStyle: 'dashed' }}
      >
        <FileText size={28} style={{ color: 'var(--color-outline)' }} strokeWidth={1.25} />
        <p className="text-sm leading-relaxed" style={{ color: 'var(--color-on-surface-variant)' }}>
          {t('campaigns.field.posts_empty')}
        </p>
        <a
          href="/dashboard/posts/new"
          className="font-mono text-xs uppercase tracking-[0.08em] underline underline-offset-4"
          style={{ color: 'var(--color-accent-bone)' }}
        >
          {t('nav.create_post', 'Create a post')}
        </a>
      </div>
    )
  }

  const showSearch = posts.length > 4
  const filtered = showSearch && query.trim()
    ? posts.filter((p) => {
        const q = query.toLowerCase()
        return (
          p.content?.toLowerCase().includes(q) ||
          p.platforms.some((pl) => pl.toLowerCase().includes(q))
        )
      })
    : posts

  return (
    <div>
      {/* Search */}
      {showSearch && (
        <div
          className="flex items-center gap-2 px-3 border rounded-sm rounded-b-none mb-0 -mb-px"
          style={{
            borderColor: 'rgba(255,255,255,0.15)',
            background: 'var(--color-surface-container-low)',
          }}
        >
          <Search size={13} style={{ color: 'var(--color-outline)', flexShrink: 0 }} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('campaigns.field.posts_search')}
            disabled={disabled}
            className="w-full py-2.5 text-sm bg-transparent outline-none disabled:opacity-40"
            style={{ color: 'var(--color-on-surface)', caretColor: 'var(--color-primary)' }}
            autoComplete="off"
          />
        </div>
      )}

      {/* List */}
      <div
        className="rounded-sm border overflow-y-auto"
        style={{
          borderColor: 'rgba(255,255,255,0.15)',
          maxHeight: '15rem',
          borderTopLeftRadius: showSearch ? 0 : undefined,
          borderTopRightRadius: showSearch ? 0 : undefined,
        }}
      >
        {filtered.length === 0 ? (
          <div className="py-6 text-center">
            <p className="text-xs" style={{ color: 'var(--color-outline)' }}>
              {t('campaigns.field.posts_no_results')}
            </p>
          </div>
        ) : (
          <ul role="listbox" aria-multiselectable="true" aria-label={t('campaigns.field.posts')}>
            {filtered.map((post, idx) => {
              const isChecked = selected.includes(post.id)
              const content = post.content?.trim()
              const snippet = content
                ? content.length > 90 ? content.slice(0, 90) + '…' : content
                : t('campaigns.field.no_content')

              return (
                <li
                  key={post.id}
                  role="option"
                  aria-selected={isChecked}
                  className={idx > 0 ? 'border-t' : ''}
                  style={{ borderColor: 'rgba(255,255,255,0.07)' }}
                >
                  <label
                    className="flex items-start gap-3 px-3 py-3 cursor-pointer select-none transition-colors min-h-[52px]"
                    style={{
                      background: isChecked ? 'rgba(232,227,217,0.05)' : 'transparent',
                      borderLeft: isChecked
                        ? '2px solid var(--color-accent-bone)'
                        : '2px solid transparent',
                    }}
                  >
                    {/* Hidden native checkbox for a11y */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggle(post.id)}
                      disabled={disabled}
                      className="sr-only"
                    />

                    {/* Visual checkbox */}
                    <span
                      className="mt-0.5 shrink-0 flex items-center justify-center rounded-[3px] border transition-colors"
                      style={{
                        width: 16,
                        height: 16,
                        borderColor: isChecked ? 'var(--color-accent-bone)' : 'rgba(255,255,255,0.25)',
                        background: isChecked ? 'var(--color-accent-bone)' : 'transparent',
                      }}
                      aria-hidden
                    >
                      {isChecked && (
                        <Check
                          size={10}
                          strokeWidth={3}
                          style={{ color: 'var(--color-surface-container-lowest)' }}
                        />
                      )}
                    </span>

                    {/* Content */}
                    <span className="min-w-0 flex-1">
                      <span
                        className="block text-sm leading-snug line-clamp-2"
                        style={{
                          color: isChecked
                            ? 'var(--color-on-surface)'
                            : 'var(--color-on-surface-variant)',
                        }}
                      >
                        {snippet}
                      </span>

                      {/* Platform chips + date */}
                      {(post.platforms.length > 0 || true) && (
                        <span className="flex items-center gap-1.5 flex-wrap mt-1.5">
                          {post.platforms.map((p) => (
                            <span
                              key={p}
                              className="font-mono text-[9px] uppercase tracking-[0.07em] px-1.5 py-0.5 rounded-[2px]"
                              style={{
                                background: getPlatformStyle(p),
                                color: 'var(--color-on-surface-variant)',
                                border: '1px solid rgba(255,255,255,0.08)',
                              }}
                            >
                              {p}
                            </span>
                          ))}
                          <span
                            className="font-mono text-[9px] tabular-nums ml-auto shrink-0"
                            style={{ color: 'var(--color-outline)' }}
                          >
                            {formatDate(post.createdAt)}
                          </span>
                        </span>
                      )}
                    </span>
                  </label>
                </li>
              )
            })}
          </ul>
        )}
      </div>

      {/* Selected count strip */}
      {selected.length > 0 && (
        <div
          className="flex items-center gap-1.5 mt-2"
          aria-live="polite"
          aria-atomic="true"
        >
          <Check size={11} strokeWidth={2.5} style={{ color: 'var(--color-accent-bone)' }} />
          <span className="font-mono text-[11px] tabular-nums" style={{ color: 'var(--color-accent-bone)' }}>
            {selected.length === 1
              ? t('campaigns.field.posts_selected', { count: 1 })
              : t('campaigns.field.posts_selected_plural', { count: selected.length })}
          </span>
        </div>
      )}
    </div>
  )
}
