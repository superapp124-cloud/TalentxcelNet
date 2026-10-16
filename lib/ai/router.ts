import type { AICompletionRequest, AICompletionResponse, AIProvider, PromptMessage } from './types'

// Prompt Injection Detection Patterns
const SUSPICIOUS_PATTERNS = [
  /ignore previous instructions/i,
  /disregard system prompt/i,
  /you are now in developer mode/i,
  /reveal your secret prompt/i,
  /bypass security/i,
  /system prompt override/i,
]

export function sanitizePrompt(input: string): { isSafe: boolean; sanitized: string } {
  for (const pattern of SUSPICIOUS_PATTERNS) {
    if (pattern.test(input)) {
      return {
        isSafe: false,
        sanitized: 'Query flagged: System boundary preservation active.',
      }
    }
  }
  return { isSafe: true, sanitized: input.trim() }
}

export async function executeAIRequest(
  request: AICompletionRequest
): Promise<AICompletionResponse> {
  const startTime = Date.now()

  // 1. Sanitize user messages
  const lastUserMsg = [...request.messages].reverse().find((m) => m.role === 'user')
  if (lastUserMsg) {
    const safetyCheck = sanitizePrompt(lastUserMsg.content)
    if (!safetyCheck.isSafe) {
      return {
        content:
          "I cannot process instructions intended to alter my educational guidelines. How can I assist you with your course curriculum today?",
        provider: 'mock',
        model: 'safety-filter-v1',
        tokensUsed: { prompt: 10, completion: 20, total: 30 },
        latencyMs: Date.now() - startTime,
        isFallback: true,
      }
    }
  }

  const primaryProvider = (process.env.AI_PRIMARY_PROVIDER as AIProvider) || 'openai'

  // 2. OpenAI provider attempt
  if (primaryProvider === 'openai' && process.env.OPENAI_API_KEY) {
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: request.messages,
          temperature: request.temperature ?? 0.3,
          max_tokens: request.maxTokens ?? 1000,
        }),
      })

      if (res.ok) {
        const data = await res.json()
        const content = data.choices[0]?.message?.content ?? ''
        const usage = data.usage ?? { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 }
        return {
          content,
          provider: 'openai',
          model: 'gpt-4o-mini',
          tokensUsed: {
            prompt: usage.prompt_tokens,
            completion: usage.completion_tokens,
            total: usage.total_tokens,
          },
          latencyMs: Date.now() - startTime,
          isFallback: false,
        }
      }
    } catch {
      // Fallback gracefully
    }
  }

  // 3. Fallback deterministic generator
  return generateDeterministicFallback(request, startTime)
}

function generateDeterministicFallback(
  request: AICompletionRequest,
  startTime: number
): AICompletionResponse {
  const lastQuery =
    [...request.messages].reverse().find((m) => m.role === 'user')?.content.toLowerCase() ?? ''

  let content = ''

  if (request.agentType === 'coding_mentor') {
    content =
      "### TalentXcel AI Coding Mentor Review\n\n" +
      "1. **Code Structure Analysis**: Your solution addresses the core logic. Ensure variable naming follows clean code standards.\n" +
      "2. **Error Prevention**: Check boundary conditions, null inputs, and asynchronous resolution.\n" +
      "3. **Suggested Next Step**: Run automated unit tests using `pnpm test` to verify your test assertions.\n\n" +
      "> *Note: AI running in verified deterministic mode.*"
  } else if (request.agentType === 'learning_tutor') {
    if (lastQuery.includes('hint')) {
      content =
        "💡 **Step 1 Hint**: Break the problem down into its input, transformation, and output steps. What is the expected return type for this module's exercise?"
    } else {
      content =
        "I'm your **TalentXcel Super AI Tutor**. I'm here to guide you through your curriculum concepts step-by-step.\n\n" +
        "Would you like a progressive hint to solve this problem, or a conceptual explanation of the underlying theory?"
    }
  } else {
    content =
      "Welcome to TalentXcel Academy! I can help you understand our curriculum, admissions criteria, and project requirements. What would you like to know?"
  }

  return {
    content,
    provider: 'mock',
    model: 'talentxcel-deterministic-v1',
    tokensUsed: { prompt: 50, completion: 150, total: 200 },
    latencyMs: Date.now() - startTime,
    isFallback: true,
  }
}
