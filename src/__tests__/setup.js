import { vi } from 'vitest'

process.env.JWT_SECRET = 'test-secret-key'
process.env.NODE_ENV = 'test'

vi.mock('../lib/prisma.js', () => ({
  default: {
    user: {
      findFirst: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
    },
    userInfo: {
      findFirst: vi.fn(),
    },
    reading: {
      findMany: vi.fn(),
      findFirst: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
    savedReading: {
      upsert: vi.fn(),
      findMany: vi.fn(),
      findFirst: vi.fn(),
      delete: vi.fn(),
    },
    card: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
    },
    readCard: {
      deleteMany: vi.fn(),
      create: vi.fn(),
    },
    aiInterpretation: {
      upsert: vi.fn(),
    },
    spread: {
      findMany: vi.fn(),
      findFirst: vi.fn(),
      findUnique: vi.fn(),
    },
  },
}))
