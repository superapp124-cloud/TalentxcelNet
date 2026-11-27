// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { DEFAULT_GEMINI_MODEL, executeAIRequest } from '@/lib/ai/router'

describe('AI Router Gemini Fallback Remediation & Qualification', () => {
  const originalEnv = { ...process.env }

  beforeEach(() => {
    vi.restoreAllMocks()
    delete process.env.OPENAI_API_KEY
    delete process.env.GOOGLE_AI_API_KEY
    delete process.env.AI_PRIMARY_PROVIDER
    delete process.env.GEMINI_MODEL
  })

  afterEach(() => {
    process.env = { ...originalEnv }
  })

  it('uses OpenAI primary path when OPENAI_API_KEY is configured', async () => {
    process.env.OPENAI_API_KEY = 'sk-test-openai-secret-123456'
    process.env.GOOGLE_AI_API_KEY = 'AIzaSyTestDummyKey1234567890'

    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          choices: [{ message: { content: 'Socratic explanation from OpenAI.' } }],
          usage: { prompt_tokens: 40, completion_tokens: 60, total_tokens: 100 },
        }),
        { status: 200, headers: { 'content-type': 'application/json' } }
      )
    )

    const result = await executeAIRequest({
      agentType: 'learning_tutor',
      userId: 'test-openai-1',
      messages: [
        { role: 'system', content: 'You are a Socratic tutor.' },
        { role: 'user', content: 'Explain Ohm law briefly.' },
      ],
    })

    expect(fetchSpy).toHaveBeenCalledTimes(1)
    expect(String(fetchSpy.mock.calls[0]?.[0])).toBe('https://api.openai.com/v1/chat/completions')
    expect(result.provider).toBe('openai')
    expect(result.model).toBe('gpt-4o-mini')
    expect(result.isFallback).toBe(false)
    expect(result.content).toContain('OpenAI')
  })

  it('selects Gemini 3.8 Flash cleanly when OPENAI_API_KEY is absent, sending API key in header instead of URL', async () => {
    process.env.GOOGLE_AI_API_KEY = 'AIzaSyTestHeaderSecretValue9999'

    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          candidates: [
            {
              content: {
                role: 'model',
                parts: [
                  { text: 'Internal reasoning block that must not leak.', thought: true },
                  { text: 'Hint #1: Consider V = I * R across each resistor.' },
                ],
              },
            },
          ],
          usageMetadata: {
            promptTokenCount: 80,
            candidatesTokenCount: 25,
            thoughtsTokenCount: 15,
            totalTokenCount: 120,
          },
        }),
        { status: 200, headers: { 'content-type': 'application/json' } }
      )
    )

    const result = await executeAIRequest({
      agentType: 'learning_tutor',
      userId: 'test-gemini-success',
      messages: [
        { role: 'system', content: 'Guide the learner step by step.' },
        { role: 'user', content: 'How do resistors work in series?' },
      ],
    })

    expect(DEFAULT_GEMINI_MODEL).toBe('gemini-3.8-flash')
    expect(fetchSpy).toHaveBeenCalledTimes(1)
    const [calledUrl, calledInit] = fetchSpy.mock.calls[0] as [string, RequestInit]
    expect(calledUrl).toBe(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent'
    )
    expect(calledUrl).not.toContain('key=')
    expect(calledUrl).not.toContain('AIzaSy')

    const headers = calledInit.headers as Record<string, string>
    expect(headers['x-goog-api-key']).toBe('AIzaSyTestHeaderSecretValue9999')

    const sentBody = JSON.parse(String(calledInit.body))
    expect(sentBody.systemInstruction.parts[0].text).toContain('Guide the learner')
    expect(sentBody.contents.at(-1).role).toBe('user')
    expect(sentBody.generationConfig.temperature).toBeUndefined()
    expect(sentBody.generationConfig.thinkingConfig).toEqual({
      thinkingLevel: 'LOW',
      includeThoughts: false,
    })

    expect(result.provider).toBe('google')
    expect(result.model).toBe('gemini-3.8-flash')
    expect(result.isFallback).toBe(false)
    expect(result.content).toBe('Hint #1: Consider V = I * R across each resistor.')
    expect(result.content).not.toContain('Internal reasoning block')
    expect(result.tokensUsed).toEqual({ prompt: 80, completion: 40, total: 120 })
  })

  it('falls back to Gemini when OpenAI returns an error response', async () => {
    process.env.OPENAI_API_KEY = 'sk-test-openai-secret-123456'
    process.env.GOOGLE_AI_API_KEY = 'AIzaSyTestFallbackKey8888'

    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(new Response('{"error":"rate_limit"}', { status: 429 }))
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            candidates: [{ content: { parts: [{ text: 'Fallback answer from Gemini 3.8 Flash.' }] } }],
          }),
          { status: 200 }
        )
      )

    const result = await executeAIRequest({
      agentType: 'coding_mentor',
      userId: 'test-openai-to-gemini',
      messages: [{ role: 'user', content: 'Review my pgvector query.' }],
    })

    expect(fetchSpy).toHaveBeenCalledTimes(2)
    expect(result.provider).toBe('google')
    expect(result.model).toBe('gemini-3.8-flash')
    expect(result.isFallback).toBe(false)
    expect(warnSpy).toHaveBeenCalled()
  })

  it.each([
    ['HTTP 404 invalid model ID', () => Promise.resolve(new Response('{"error":{"code":404}}', { status: 404 }))],
    ['HTTP 403 permission denied', () => Promise.resolve(new Response('{"error":{"code":403}}', { status: 403 }))],
    ['HTTP 429 quota/rate exhaustion', () => Promise.resolve(new Response('{"error":{"code":429}}', { status: 429 }))],
    ['thought-only response with no answer parts', () =>
      Promise.resolve(
        new Response(
          JSON.stringify({ candidates: [{ content: { parts: [{ text: 'thinking...', thought: true }] } }] }),
          { status: 200 }
        )
      )],
    ['malformed JSON body', () => Promise.resolve(new Response('not-valid-json', { status: 200 }))],
    ['network timeout / abort error containing key', () =>
      Promise.reject(new Error('Fetch timed out for key=AIzaSySensitiveLeakCheck12345'))],
  ])('falls back gracefully to deterministic RAG on %s without leaking secrets', async (_label, impl) => {
    const fakeKey = 'AIzaSySensitiveLeakCheck12345'
    process.env.GOOGLE_AI_API_KEY = fakeKey

    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    vi.spyOn(globalThis, 'fetch').mockImplementationOnce(impl)

    const result = await executeAIRequest({
      agentType: 'learning_tutor',
      userId: `test-rag-fallback-${Math.random()}`,
      messages: [{ role: 'user', content: 'Give me Hint #1 for pgvector HNSW index.' }],
    })

    expect(result.provider).toBe('mock')
    expect(result.model).toBe('talentxcel-deterministic-v1')
    expect(result.isFallback).toBe(true)
    expect(result.content).toContain('Socratic Hint #1')
    expect(result.content).not.toContain(fakeKey)
    expect(JSON.stringify(result)).not.toContain(fakeKey)

    for (const call of warnSpy.mock.calls) {
      expect(call.join(' ')).not.toContain(fakeKey)
    }
  })

  it('handles missing GOOGLE_AI_API_KEY safely by serving deterministic RAG with zero outbound requests', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch')

    const result = await executeAIRequest({
      agentType: 'admissions_assistant',
      userId: 'test-missing-keys',
      messages: [{ role: 'user', content: 'Tell me about free diagnostic pricing plans' }],
    })

    expect(fetchSpy).not.toHaveBeenCalled()
    expect(result.provider).toBe('mock')
    expect(result.isFallback).toBe(true)
    expect(result.content.length).toBeGreaterThan(20)
  })
})
