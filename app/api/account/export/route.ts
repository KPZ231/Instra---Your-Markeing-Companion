import { NextResponse } from 'next/server'
import { verifySession } from '@/lib/auth/dal'
import { prisma } from '@/lib/prisma'
import { getConnectedAccounts } from '@/lib/api/socialAccounts'

/**
 * GET /api/account/export
 * Returns a full JSON export of the authenticated user's data:
 * profile, posts (with likes and media metadata), and connected social accounts.
 * The response is served as a downloadable JSON file.
 */
export async function GET(): Promise<NextResponse> {
  try {
    const { user } = await verifySession()

    const [profile, posts, connectedAccounts] = await Promise.all([
      prisma.user.findUnique({
        where: { id: user.id },
        select: {
          id: true,
          email: true,
          name: true,
          username: true,
          image: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.post.findMany({
        where: { authorId: user.id },
        select: {
          id: true,
          content: true,
          platforms: true,
          createdAt: true,
          updatedAt: true,
          likes: { select: { id: true } },
          media: { select: { id: true, mimeType: true, createdAt: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      getConnectedAccounts(user.id),
    ])

    const exportData = {
      exportedAt: new Date().toISOString(),
      profile,
      posts,
      socialAccounts: connectedAccounts,
    }

    return NextResponse.json(exportData, {
      headers: {
        'Content-Disposition': 'attachment; filename="instra-account-export.json"',
      },
    })
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}
