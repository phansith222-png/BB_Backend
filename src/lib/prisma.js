import "dotenv/config";
import { PrismaClient } from '../generated/prisma/index.js'
import { PrismaPg } from '@prisma/adapter-pg'

const dbUrl = new URL(process.env.DATABASE_URL)
dbUrl.searchParams.set('uselibpqcompat', 'true')

const adapter = new PrismaPg(dbUrl.toString())
const prisma = new PrismaClient({ adapter })

export default prisma