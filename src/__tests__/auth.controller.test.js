import { describe, it, expect, vi, beforeEach } from 'vitest'
import request from 'supertest'
import app from '../app.js'
import prisma from '../lib/prisma.js'

const validRegisterBody = {
  identity: 'test@example.com',
  username: 'testuser1',
  password: 'password123',
  confirmPassword: 'password123',
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('POST /api/auth/register', () => {
  it('returns 201 with user data on valid input', async () => {
    prisma.user.findUnique.mockResolvedValue(null)
    prisma.user.findFirst.mockResolvedValueOnce(null)
    prisma.user.create.mockResolvedValue({
      id: 1,
      username: 'testuser1',
      email: 'test@example.com',
      userInfo: [{ id: 1, firstName: 'New', lastName: 'User' }],
    })

    const res = await request(app)
      .post('/api/auth/register')
      .send(validRegisterBody)

    expect(res.status).toBe(201)
    expect(res.body.success).toBe(true)
    expect(res.body.message).toBe('Register Successful')
    expect(res.body.data).toBeDefined()
  })

  it('returns 400 when username is already taken', async () => {
    prisma.user.findUnique.mockResolvedValue({ id: 1, username: 'testuser1' })

    const res = await request(app)
      .post('/api/auth/register')
      .send(validRegisterBody)

    expect(res.status).toBe(400)
    expect(res.body.message).toMatch(/already taken/i)
  })

  it('returns 409 when email is already registered', async () => {
    prisma.user.findUnique.mockResolvedValue(null)
    prisma.user.findFirst.mockResolvedValueOnce({ id: 2, email: 'test@example.com' })

    const res = await request(app)
      .post('/api/auth/register')
      .send(validRegisterBody)

    expect(res.status).toBe(409)
  })

  it('returns 400 on missing required fields (Zod)', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'testuser1' })

    expect(res.status).toBe(400)
  })

  it('returns 400 when passwords do not match', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ ...validRegisterBody, confirmPassword: 'wrong' })

    expect(res.status).toBe(400)
  })

  it('returns structured error response (not crash) when DB throws', async () => {
    prisma.user.findUnique.mockRejectedValue(new Error('DB connection error'))

    const res = await request(app)
      .post('/api/auth/register')
      .send(validRegisterBody)

    expect(res.status).toBe(500)
    expect(res.body).toBeDefined()
  })
})

describe('POST /api/auth/login', () => {
  const validUser = {
    id: 1,
    username: 'testuser1',
    password: '$2b$08$hashedpassword',
    userInfo: [{ id: 1, firstName: 'Test', lastName: 'User' }],
  }

  it('returns 401 on unknown username', async () => {
    prisma.user.findFirst.mockResolvedValue(null)

    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser1', password: 'password123' })

    expect(res.status).toBe(401)
  })

  it('returns 400 on missing fields (Zod)', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'short' })

    expect(res.status).toBe(400)
  })
})
