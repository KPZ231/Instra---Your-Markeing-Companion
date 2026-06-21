import 'server-only'

import { generateText } from 'ai'
import { createOpenRouter } from '@openrouter/ai-sdk-provider'

// ponytail: single-function core — no provider registry/abstraction.
// Upgrade path: add a registry only when a 2nd model or streaming is needed.

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY ?? '',
})

const DEFAULT_MODEL = 'openai/gpt-oss-120b:free'

interface GenerateCaptionInput {
  /** User's topic / draft text to turn into a caption. Max 500 chars. */
  prompt: string
  /** Output language — matches app i18n locales. */
  language: 'pl' | 'en'
}

/**
 * Generates a single social-media caption via OpenRouter.
 * Model is configurable via the OPENROUTER_MODEL env var (default: gpt-oss-120b:free).
 *
 * @param input - { prompt, language }
 * @returns Trimmed caption string
 *
 * @example
 * const text = await generateCaption({ prompt: 'morning coffee ritual', language: 'en' })
 * // → "There's nothing like that first sip. ☕ #MorningVibes"
 */
export async function generateCaption({ prompt, language }: GenerateCaptionInput): Promise<string> {
  const model = process.env.OPENROUTER_MODEL ?? DEFAULT_MODEL
  const langLabel = language === 'pl' ? 'Polish' : 'English'

  const { text } = await generateText({
    model: openrouter(model),
    system: `You are a social-media copywriter. Write exactly one caption in ${langLabel}. No preamble, no explanation, no quotes — just the caption text.`,
    prompt,
    maxOutputTokens: 200,
  })

  return text.trim()
}
