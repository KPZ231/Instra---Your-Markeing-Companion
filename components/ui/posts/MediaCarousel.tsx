'use client'

import { useState } from 'react'
import Image from 'next/image'

interface MediaItem {
  id: string
  url: string
  mimeType: string
  order: number
}

interface MediaCarouselProps {
  /** Ordered array of media items to display */
  items: MediaItem[]
}

/**
 * Image carousel for displaying post media in a PostCard.
 * Shows navigation arrows and dot indicators when there are multiple images.
 * Supports keyboard navigation via disabled state on boundary buttons.
 *
 * @param items - Ordered array of media items to display
 *
 * @example
 * <MediaCarousel items={post.media} />
 */
export function MediaCarousel({ items }: MediaCarouselProps) {
  const [index, setIndex] = useState(0)

  if (items.length === 0) return null

  const current = items[index]
  const hasPrev = index > 0
  const hasNext = index < items.length - 1

  return (
    <div className="relative w-full aspect-square overflow-hidden rounded-sm bg-[var(--surface-container)]">
      <Image
        src={current.url}
        alt={`Media ${index + 1} of ${items.length}`}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 600px"
      />

      {items.length > 1 && (
        <>
          {/* Previous button */}
          <button
            type="button"
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={!hasPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center text-lg leading-none disabled:opacity-30 transition-opacity hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            aria-label="Previous image"
          >
            ‹
          </button>

          {/* Next button */}
          <button
            type="button"
            onClick={() => setIndex((i) => Math.min(items.length - 1, i + 1))}
            disabled={!hasNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center text-lg leading-none disabled:opacity-30 transition-opacity hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            aria-label="Next image"
          >
            ›
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1" role="tablist" aria-label="Image navigation">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                onClick={() => setIndex(i)}
                className={`w-1.5 h-1.5 rounded-full transition-opacity bg-white ${i === index ? 'opacity-100' : 'opacity-40'}`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
