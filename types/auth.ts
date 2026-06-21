import type { DefaultSession } from 'next-auth'
import { UserRole } from '@prisma/client'

export { UserRole }

export type SessionUser = {
  id: string
  role: UserRole
} & DefaultSession['user']

declare module 'next-auth' {
  interface Session {
    user: SessionUser
  }

  interface User {
    role?: UserRole
  }
}
