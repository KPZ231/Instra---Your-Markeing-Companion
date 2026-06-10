/**
 * Generates a cryptographically random 6-digit verification code (100000–999999).
 * Uses the Web Crypto API for cryptographic randomness.
 * @returns 6-digit numeric code as a string
 * @example
 * const code = generateVerificationCode() // e.g. "481203"
 */
export function generateVerificationCode(): string {
  const array = new Uint32Array(1)
  crypto.getRandomValues(array)
  const code = 100000 + (array[0] % 900000)
  return String(code)
}
