import { headers } from 'next/headers'

/**
 * Extracts the caller's IP from Next.js request headers.
 * Priority: x-forwarded-for (Vercel/proxy) → x-real-ip → "unknown".
 */
export async function getIp(): Promise<string> {
  const headersList = await headers()
  const forwarded = headersList.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return headersList.get('x-real-ip') ?? 'unknown'
}
