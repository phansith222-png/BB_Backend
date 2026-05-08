import { describe, it, expect, vi, beforeEach } from 'vitest'
import { askGemini } from '../utils/ai.js'

const mockGenerateContent = vi.fn()

vi.mock('@google/genai', () => ({
  GoogleGenAI: function() {
    return {
      models: { generateContent: mockGenerateContent },
    }
  },
}))

const sampleCards = [{ name: 'The Fool', isReversed: false, meaning: 'new beginnings' }]

beforeEach(() => {
  vi.clearAllMocks()
})

describe('askGemini', () => {
  it('returns parsed interpretation on valid Gemini JSON response', async () => {
    const payload = { summary: 'Good energy', detail: 'Full detail here', mood_score: 75 }
    mockGenerateContent.mockResolvedValue({ text: JSON.stringify(payload) })

    const result = await askGemini('GENERAL', 'test question', sampleCards)

    expect(result.mood_score).toBe(75)
    expect(result.summary).toBe('Good energy')
    expect(result.detail).toBe('Full detail here')
  })

  it('returns fallback object when Gemini returns malformed JSON', async () => {
    mockGenerateContent.mockResolvedValue({ text: 'this is not valid json at all' })

    const result = await askGemini('LOVE', 'test', sampleCards)

    expect(result.mood_score).toBe(0)
    expect(typeof result.summary).toBe('string')
    expect(result.summary.length).toBeGreaterThan(0)
  })

  it('returns fallback object when Gemini response is wrapped in markdown code block', async () => {
    mockGenerateContent.mockResolvedValue({ text: '```json\nnot json\n```' })

    const result = await askGemini('CAREER', 'test', sampleCards)

    expect(result.mood_score).toBe(0)
  })

  it('handles Gemini API errors by throwing (caller catches via try-catch)', async () => {
    mockGenerateContent.mockRejectedValue(new Error('API quota exceeded'))

    await expect(askGemini('GENERAL', 'test', sampleCards)).rejects.toThrow('API quota exceeded')
  })
})
