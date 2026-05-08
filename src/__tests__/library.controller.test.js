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

beforeEach(() => {
  vi.clearAllMocks()
  prisma.user.findFirst.mockResolvedValue(mockUser)
})

describe('GET /api/cards', () => {
  it('returns 200 with all cards', async () => {
    prisma.card.findMany.mockResolvedValue([
      { id: 1, name: 'The Fool', img_url: 'ar00.jpg' },
      { id: 2, name: 'The Magician', img_url: 'ar01.jpg' },
    ])

    const res = await request(app)
      .get('/api/cards')
      .set('Authorization', makeAuthHeader())

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(Array.isArray(res.body.data)).toBe(true)
    expect(res.body.data.length).toBe(2)
  })

  it('returns 401 without a token', async () => {
    const res = await request(app).get('/api/cards')
    expect(res.status).toBe(401)
  })
})

describe('GET /api/cards/:id', () => {
  it('returns 200 with card data when found', async () => {
    prisma.card.findUnique.mockResolvedValue({ id: 1, name: 'The Fool', img_url: 'ar00.jpg' })

    const res = await request(app)
      .get('/api/cards/1')
      .set('Authorization', makeAuthHeader())

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.data.name).toBe('The Fool')
  })

  it('returns 404 when card ID does not exist', async () => {
    prisma.card.findUnique.mockResolvedValue(null)

    const res = await request(app)
      .get('/api/cards/99999')
      .set('Authorization', makeAuthHeader())

    expect(res.status).toBe(404)
  })
})
