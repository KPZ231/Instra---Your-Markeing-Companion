/**
 * Content scoring engine.
 * Evaluates a post against all configured heuristic rules and produces a 0–100 score.
 */

import type { ContentScore } from '../types'
import { SCORING_RULES, evaluateRules, type ScoringInput } from './rules'

export type { ScoringInput }

const PENALTY_MAP = new Map(SCORING_RULES.map((r) => [r.key, r.penalty]))

/**
 * Computes the content quality score for a single post.
 * Score starts at 100 and each triggered rule deducts its penalty value.
 * Returns issues sorted by priority (highest first).
 *
 * @param post - Minimal post data to evaluate
 * @returns ContentScore with a 0–100 score and ordered issue list
 *
 * @example
 * const score = scoreContent({
 *   content: 'Hello world',
 *   platforms: ['INSTAGRAM'],
 *   mediaCount: 1,
 *   likeCount: 5,
 *   publishHour: 10,
 *   ageDays: 3,
 * })
 * // => { score: 75, issues: [{ key: 'no_hashtags', priority: 7 }] }
 */
export function scoreContent(post: ScoringInput): ContentScore {
  const issues = evaluateRules(post)
  const totalPenalty = issues.reduce((sum, issue) => sum + (PENALTY_MAP.get(issue.key) ?? 0), 0)
  const score = Math.max(0, 100 - totalPenalty)
  return { score, issues }
}
