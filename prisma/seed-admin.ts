/**
 * Seed: tworzy lub promuje admin@instra.site do roli ADMIN.
 * Uruchom: npx prisma db seed
 * lub: npx dotenv -e .env -- npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed-admin.ts
 */
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient, UserRole } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL ?? '' })
const prisma = new PrismaClient({ adapter })

const EMAIL = process.env.ADMIN_SEED_EMAIL
const PASSWORD = process.env.ADMIN_SEED_PASSWORD
if (!EMAIL || !PASSWORD) {
  throw new Error('Set ADMIN_SEED_EMAIL and ADMIN_SEED_PASSWORD env variables before running this script')
}

async function main() {
  const existing = await prisma.user.findUnique({
    where: { email: EMAIL },
    select: { id: true, email: true, role: true },
  })

  if (existing) {
    console.log(`Znaleziono: ${existing.email} | rola: ${existing.role}`)
    if (existing.role !== UserRole.ADMIN) {
      await prisma.user.update({
        where: { email: EMAIL },
        data: { role: UserRole.ADMIN },
      })
      console.log('✅ Zaktualizowano rolę na ADMIN')
    } else {
      console.log('✅ Już jest ADMIN')
    }
  } else {
    const passwordHash = await bcrypt.hash(PASSWORD, 12)
    const user = await prisma.user.create({
      data: {
        email: EMAIL,
        name: 'Admin',
        role: UserRole.ADMIN,
        passwordHash,
      },
    })
    console.log(`✅ Utworzono admina: ${user.email}`)
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
