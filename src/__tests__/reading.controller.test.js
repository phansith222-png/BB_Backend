import { describe, it, expect, vi, beforeEach } from 'vitest'
import request from 'supertest'
import app from '../app.js'
import prisma from '../lib/prisma.js'

beforeEach(() => {
  vi.clearAllMocks()
})

// Reading endpoints use optionalAuth — no token needed to test validation
describe('POST /api/readings/init — Zod validation', () => {
  it('returns 400 when spreadId is missing', async () => {
    const res = await request(app)
      .post('/api/readings/init')
      .send({ question: 'What lies ahead?' })

    expect(res.status).toBe(400)
  })

  it('returns 400 when spreadId is not a number', async () => {
    const res = await request(app)
      .post('/api/readings/init')
      .send({ spreadId: 'abc', question: 'test' })

    expect(res.status).toBe(400)
  })

  it('proceeds past validation with valid input', async () => {
    prisma.spread.findFirst.mockResolvedValue({ id: 1, name: 'General', cardCount: 3 })
    prisma.reading.create.mockResolvedValue({ id: 1, status: 'PENDING', spreadId: 1, question: 'test', isDaily: false })

    const res = await request(app)
      .post('/api/readings/init')
      .send({ spreadId: 1, question: 'test question' })

    expect(res.status).not.toBe(400)
  })
})

describe('POST /api/readings/shuffle — Zod validation', () => {
  it('returns 400 when readingId is missing', async () => {
    const res = await request(app)
      .post('/api/readings/shuffle')
      .send({ allowReversed: false })

    expect(res.status).toBe(400)
  })

  it('returns 400 when readingId is not a positive integer', async () => {
    const res = await request(app)
      .post('/api/readings/shuffle')
      .send({ readingId: -1 })

    expect(res.status).toBe(400)
  })
})

describe('POST /api/readings/cut — Zod validation', () => {
  it('returns 400 when readingId is missing', async () => {
    const res = await request(app)
      .post('/api/readings/cut')
      .send({ position: 5 })

    expect(res.status).toBe(400)
  })

  it('returns 400 when position is missing', async () => {
    const res = await request(app)
      .post('/api/readings/cut')
      .send({ readingId: 1 })

    expect(res.status).toBe(400)
  })
})

describe('POST /api/readings/pick — Zod validation', () => {
  it('returns 400 when selectId is not an array', async () => {
    const res = await request(app)
      .post('/api/readings/pick')
      .send({ readingId: 1, selectId: 'not-array' })

    expect(res.status).toBe(400)
  })

  it('returns 400 when selectId is an empty array', async () => {
    const res = await request(app)
      .post('/api/readings/pick')
      .send({ readingId: 1, selectId: [] })

    expect(res.status).toBe(400)
  })
})

describe('POST /api/readings/ai-interpret — Zod validation', () => {
  it('returns 400 when spreadType is an invalid enum value', async () => {
    const res = await request(app)
      .post('/api/readings/ai-interpret')
      .send({ readingId: 1, spreadType: 'INVALID', card: [{ id: 1, name: 'The Fool' }] })

    expect(res.status).toBe(400)
  })

  it('returns 400 when card array is empty', async () => {
    const res = await request(app)
      .post('/api/readings/ai-interpret')
      .send({ readingId: 1, spreadType: 'GENERAL', card: [] })

    expect(res.status).toBe(400)
  })

  it('returns 400 when readingId is missing', async () => {
    const res = await request(app)
      .post('/api/readings/ai-interpret')
      .send({ spreadType: 'GENERAL', card: [{ id: 1, name: 'The Fool' }] })

    expect(res.status).toBe(400)
  })
})
