import { describe, it, expect, vi, beforeEach } from 'vitest'
import request from 'supertest'
import app from '../app.js'
import prisma from '../lib/prisma.js'
import { createToken } from '../utils/jwt.js'

const mockUser = {
  id: 1,
  username: 'testuser1',
  email: 'test@example.com',
  password: 'hashed',
  role: 'USER',
  createdAt: new Date(),
  updatedAt: new Date(),
  userInfo: [{ id: 1, firstName: 'Test', lastName: 'User', profileImage: null }],
}

function makeAuthHeader() {
  const token = createToken({ id: 1 })
  return `Bearer ${token}`
}

function mockAuthUser() {
  prisma.user.findFirst.mockResolvedValue(mockUser)
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('GET /api/users/history', () => {
  it('returns an array of all completed readings — not just the first', async () => {
    mockAuthUser()

    const readings = [
      { id: 1, status: 'COMPLETED', deckOrder: [{ id: 1, isReversed: false }], spread: {}, readCards: [], aiInterpretation: null, savedReading: null, userInfo: { firstName: 'Test', lastName: 'User', profileImage: null } },
      { id: 2, status: 'COMPLETED', deckOrder: [{ id: 2, isReversed: true }], spread: {}, readCards: [], aiInterpretation: null, savedReading: null, userInfo: { firstName: 'Test', lastName: 'User', profileImage: null } },
      { id: 3, status: 'COMPLETED', deckOrder: [{ id: 3, isReversed: false }], spread: {}, readCards: [], aiInterpretation: null, savedReading: null, userInfo: { firstName: 'Test', lastName: 'User', profileImage: null } },
    ]
    prisma.reading.findMany.mockResolvedValue(readings)

    const res = await request(app)
      .get('/api/users/history')
      .set('Authorization', makeAuthHeader())

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(Array.isArray(res.body.data)).toBe(true)
    expect(res.body.data.length).toBe(3)
  })

  it('strips deckOrder from every reading in the response', async () => {
    mockAuthUser()

    prisma.reading.findMany.mockResolvedValue([
      { id: 1, status: 'COMPLETED', deckOrder: [{ id: 1, isReversed: false }], spread: {}, readCards: [], aiInterpretation: null, savedReading: null, userInfo: { firstName: 'Test', lastName: 'User', profileImage: null } },
    ])

    const res = await request(app)
      .get('/api/users/history')
      .set('Authorization', makeAuthHeader())

    expect(res.status).toBe(200)
    expect(res.body.data[0].deckOrder).toBeUndefined()
  })

  it('returns empty array when user has no completed readings', async () => {
    mockAuthUser()
    prisma.reading.findMany.mockResolvedValue([])

    const res = await request(app)
      .get('/api/users/history')
      .set('Authorization', makeAuthHeader())

    expect(res.status).toBe(200)
    expect(Array.isArray(res.body.data)).toBe(true)
    expect(res.body.data.length).toBe(0)
  })

  it('returns 401 when no token is provided', async () => {
    const res = await request(app).get('/api/users/history')
    expect(res.status).toBe(401)
  })
})
