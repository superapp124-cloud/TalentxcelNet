import type { AICompletionRequest, AICompletionResponse, AIProvider } from './types'
import { retrieveGroundedChunks } from './rag-service'

// In-memory token tracker per user (reset daily)
const tokenUsageMap = new Map<string, { tokens: number; resetAt: number }>()

function checkAndTrackUsage(userId = 'anonymous', tokensToAdd = 50): { allowed: boolean; remaining: number } {
  const dailyLimit = parseInt(process.env.AI_DAILY_TOKEN_LIMIT || '50000', 10)
  const now = Date.now()
  const entry = tokenUsageMap.get(userId)

  if (!entry || now > entry.resetAt) {
    tokenUsageMap.set(userId, { tokens: tokensToAdd, resetAt: now + 24 * 60 * 60 * 1000 })
    return { allowed: true, remaining: dailyLimit - tokensToAdd }
  }

  if (entry.tokens + tokensToAdd > dailyLimit && dailyLimit > 0) {
    return { allowed: false, remaining: 0 }
  }

  entry.tokens += tokensToAdd
  return { allowed: true, remaining: dailyLimit - entry.tokens }
}

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
  const userText = lastUserMsg?.content ?? ''

  if (lastUserMsg) {
    const safetyCheck = sanitizePrompt(userText)
    if (!safetyCheck.isSafe) {
      return {
        content:
          "I cannot process instructions intended to alter my educational guidelines. How can I assist you with your course curriculum today?",
        provider: 'mock',
        model: 'safety-filter-v1',
        tokensUsed: { prompt: 10, completion: 20, total: 30 },
        latencyMs: Date.now() - startTime,
        isFallback: true,
        canEscalate: false,
      }
    }
  }

  // 2. Budget and usage enforcement
  const usageCheck = checkAndTrackUsage(request.userId, 100)
  if (!usageCheck.allowed) {
    return {
      content:
        "Daily AI usage limit reached for this session. Please return tomorrow or escalate to a human mentor during scheduled office hours.",
      provider: 'mock',
      model: 'usage-limiter-v1',
      tokensUsed: { prompt: 0, completion: 0, total: 0 },
      latencyMs: Date.now() - startTime,
      isFallback: true,
      canEscalate: true,
    }
  }

  const primaryProvider = (process.env.AI_PRIMARY_PROVIDER as AIProvider) || 'openai'
  const relevantChunks = retrieveGroundedChunks(userText, 3)

  // 3. OpenAI provider attempt
  if ((primaryProvider === 'openai' || !primaryProvider) && process.env.OPENAI_API_KEY) {
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
          sources: relevantChunks.map((c) => ({ title: c.title, category: c.category })),
          canEscalate: true,
        }
      }
    } catch {
      // Fallback gracefully
    }
  }

  // 4. Google Gemini provider attempt
  if (process.env.GOOGLE_AI_API_KEY) {
    try {
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GOOGLE_AI_API_KEY}`
      const promptText = request.messages.map((m) => `${m.role.toUpperCase()}: ${m.content}`).join('\n\n')
      const res = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }],
          generationConfig: {
            temperature: request.temperature ?? 0.3,
            maxOutputTokens: request.maxTokens ?? 1000,
          },
        }),
      })

      if (res.ok) {
        const data = await res.json()
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text
        if (text) {
          return {
            content: text,
            provider: 'google',
            model: 'gemini-1.5-flash',
            tokensUsed: { prompt: 150, completion: 200, total: 350 },
            latencyMs: Date.now() - startTime,
            isFallback: false,
            sources: relevantChunks.map((c) => ({ title: c.title, category: c.category })),
            canEscalate: true,
          }
        }
      }
    } catch {
      // Fallback gracefully
    }
  }

  // 5. Fallback deterministic generator grounded with RAG
  return generateDeterministicFallback(request, startTime, userText, relevantChunks)
}

function generateDeterministicFallback(
  request: AICompletionRequest,
  startTime: number,
  userQuery: string,
  chunks: Array<{ id: string; title: string; category: string; content: string }>
): AICompletionResponse {
  const queryLower = userQuery.toLowerCase()
  let content = ''
  const sources = chunks.map((c) => ({ title: c.title, category: c.category }))
  let suggestedActions: string[] = []

  if (request.agentType === 'coding_mentor') {
    content =
      "### TalentXcel AI Coding Mentor Review\n\n" +
      "1. **Architecture & Boundaries**: Your code establishes clean function boundaries. Ensure you keep credentials and DB connection strings strictly on the server side.\n" +
      "2. **Data Model Validation**: Validate all untrusted inputs with Zod schemas to reject unexpected shapes before database operations.\n" +
      "3. **Performance & Isolation**: When performing vector similarity searches in pgvector, apply `WHERE tenant_id = ?` filters prior to sorting by cosine distance.\n" +
      "4. **Verification Step**: Run the automated test runner in your project workspace to verify assertion criteria.\n\n" +
      "> *Source reference: Curriculum Module 2 — Practical AI Development & pgvector Optimization.*"
    suggestedActions = ['Run test suite', 'Check edge case with empty array', 'Ask for hint on tenant filter']
  } else if (request.agentType === 'learning_tutor') {
    if (queryLower.includes('hint #1') || queryLower.includes('hint 1') || (queryLower.includes('hint') && !queryLower.includes('2') && !queryLower.includes('3'))) {
      content =
        "💡 **Socratic Hint #1 (Conceptual Clue)**:\n\n" +
        "Before writing implementation code, identify the core system boundary: what inputs are received, what security policy applies, and what output structure is required.\n\n" +
        "In our curriculum architecture, state transitions must always be authenticated and idempotent. How can you split this task into an input validation phase and an execution phase?"
      suggestedActions = ['Request Hint #2', 'Explain with real code example', 'Ask question on schema']
    } else if (queryLower.includes('hint #2') || queryLower.includes('hint 2')) {
      content =
        "💡 **Socratic Hint #2 (Decomposition)**:\n\n" +
        "Consider using a two-step pipeline:\n" +
        "1. **Validation & Filtering**: Use a Zod schema to validate types, then inject tenant security filters (`tenant_id = user.id`).\n" +
        "2. **Execution**: Pass the sanitized payload to PostgreSQL pgvector using the `<=>` cosine distance operator.\n\n" +
        "What edge cases should you handle if the query returns zero matching vectors?"
      suggestedActions = ['Request Hint #3', 'Show full solution', 'Run tests now']
    } else if (queryLower.includes('hint #3') || queryLower.includes('hint 3')) {
      content =
        "💡 **Socratic Hint #3 (Scaffolding)**:\n\n" +
        "Here is the structural skeleton for your handler:\n" +
        "```typescript\n" +
        "const results = await supabase.rpc('match_documents', {\n" +
        "  query_embedding: embedding,\n" +
        "  match_threshold: 0.78,\n" +
        "  match_count: 5,\n" +
        "  filter_tenant_id: tenantId\n" +
        "})\n" +
        "```\n" +
        "Now connect this to your response formatter with appropriate error boundaries."
      suggestedActions = ['Run test suite', 'Explain match_threshold', 'Ask for mentor review']
    } else if (chunks.length > 0) {
      const topChunk = chunks[0]
      content =
        `### Grounded Curriculum Explanation: ${topChunk.title}\n\n` +
        `${topChunk.content}\n\n` +
        "**Key takeaway**: Practical implementation focuses on reproducible engineering boundaries rather than memorizing syntax.\n\n" +
        "> *Retrieved from verified TalentXcel Knowledge Base. Ask a follow-up or request a progressive hint.*"
      suggestedActions = ['Give me a hint for this task', 'Show code structure', 'Escalate to mentor']
    } else {
      content =
        "I'm your **TalentXcel Super AI Tutor**. I'm here to guide you through your curriculum concepts step-by-step.\n\n" +
        "Would you like a progressive hint to solve your current task, or a conceptual explanation of the underlying theory?"
      suggestedActions = ['Get Hint #1', 'Explain vector search', 'View project requirements']
    }
  } else if (request.agentType === 'admissions_assistant' || !request.agentType) {
    if (queryLower.includes('free') || queryLower.includes('diagnostic') || queryLower.includes('practice') || queryLower.includes('test')) {
      content =
        "### 🎯 Free Diagnostic Practice at TalentXcel\n\n" +
        "You can take **5 verified syllabus questions per subject completely free** with zero registration, login, or payment details required!\n\n" +
        "- **Instant Scoring & Hints**: Immediate server evaluation, step-by-step formula derivations, and Socratic hints.\n" +
        "- **Supported Boards**: CBSE, ICSE/CISCE, and IB standards for Classes 4–12.\n" +
        "- **Subjects Covered**: Mathematics, Science (Physics, Chemistry, Biology), English, Hindi, Social Science, and Logical Reasoning.\n" +
        "- **Competitive Entrances**: Sample diagnostic mocks available for JEE, NEET, CUET, UPSC, State PSC, SSC, Banking, and GATE.\n\n" +
        "👉 *Ready to begin? Just click **Start Free Practice** on our home page or visit `/assessment`!*"
      suggestedActions = ['Start Class 4 Free Test', 'View Competitive Entrance Mocks', 'How does scoring work?']
    } else if (queryLower.includes('fee') || queryLower.includes('price') || queryLower.includes('plan') || queryLower.includes('cost') || queryLower.includes('pricing') || queryLower.includes('refund')) {
      content =
        "### 💳 Transparent & Flexible Pricing\n\n" +
        "At TalentXcel, we believe in radical pricing transparency without lock-ins:\n\n" +
        "1. **Assessment Chapter Packs**: Start from just **₹20** for individual chapter mocks, up to ₹299–₹999 for multi-subject entrance suites.\n" +
        "2. **Skill Studio Tracks**: Hands-on project workshops across AI, Robotics, and Coding from **₹999/mo** (All-Access Studio at ₹1,999/mo).\n" +
        "3. **Academic Class Passes**: Full textbook lessons, numerical guides, and chapter tests from **₹1,999/mo**.\n\n" +
        "All purchases include our **14-day hassle-free refund policy** and secure checkout powered by Razorpay. View all options at `/plans`."
      suggestedActions = ['Compare all plans', 'Try ₹20 chapter pack', 'What is the refund policy?']
    } else if (queryLower.includes('skill') || queryLower.includes('coding') || queryLower.includes('ai') || queryLower.includes('robot')) {
      content =
        "### 🚀 Practical Skill Studio (Domain 2)\n\n" +
        "We teach real-world skills by building functional capstones! Our 8 active tracks include:\n\n" +
        "- **AI & Machine Learning**: Build custom LLM agents, vector search, and neural pipelines.\n" +
        "- **Python & Web Coding**: Full-stack web, algorithms, and APIs.\n" +
        "- **Robotics & IoT**: Embedded systems, sensors, and microcontrollers.\n" +
        "- **Product & UI/UX Design**: Design systems, wireframing, and Figma prototypes.\n" +
        "- **Debate & Communication**: Structured rhetoric, logic, and public discourse.\n" +
        "- **Financial Literacy**: Smart budgeting, compound interest, and investment math.\n\n" +
        "Every learner graduates with a verifiable portfolio! Explore tracks under `/skills`."
      suggestedActions = ['Explore AI Track', 'Explore Coding Track', 'View sample capstones']
    } else if (queryLower.includes('academic') || queryLower.includes('class') || queryLower.includes('cbse') || queryLower.includes('icse') || queryLower.includes('ib') || queryLower.includes('board')) {
      content =
        "### 📚 Calm, Board-Aligned Academic Learning (Domain 3)\n\n" +
        "Our academic curriculum is 100% aligned with verified textbooks (NCERT for CBSE, CISCE/ICSE, and IB) for **Classes 4 through 12**:\n\n" +
        "- **Mathematics**: Algebra, Calculus, Geometry, Trigonometry, and Probability.\n" +
        "- **Sciences**: Physics, Chemistry, and Biology broken into bite-sized concepts.\n" +
        "- **Languages & Humanities**: English Grammar & Literature, Hindi Vyakaran, and Social Sciences (History, Civics, Geography, Economics).\n" +
        "- **Step-by-Step Numerical Walkthroughs**: We show derivations and worked examples so students truly understand *why* a formula works.\n\n" +
        "Visit `/academic` to browse chapters for your grade!"
      suggestedActions = ['Browse Class 10 CBSE', 'Browse Class 12 STEM', 'Try Class 4 Diagnostic']
    } else if (queryLower.includes('jee') || queryLower.includes('neet') || queryLower.includes('cuet') || queryLower.includes('upsc') || queryLower.includes('entrance') || queryLower.includes('competitive')) {
      content =
        "### 🏆 Competitive Entrance Mock Pipelines\n\n" +
        "TalentXcel offers verified diagnostic mocks matching real national and state exam standards:\n\n" +
        "- **JEE (Main & Advanced)**: Rotational dynamics, coordinate geometry, thermodynamics, organic reaction mechanisms.\n" +
        "- **NEET (UG Medical)**: Molecular basis of inheritance, human physiology, chemical bonding.\n" +
        "- **CUET**: General test, numerical aptitude, verbal reasoning, and domain subjects.\n" +
        "- **UPSC Civil Services & State PSC**: Polity (Articles, amendments), Indian Economy, Modern History, and CSAT logical reasoning.\n" +
        "- **SSC, Banking (IBPS/SBI) & GATE**: Quantitative aptitude, computer networks, data structures, and reasoning.\n\n" +
        "Take a sample entrance mock under `/assessment` (Competitive Entrances tab)!"
      suggestedActions = ['Try JEE Mock', 'Try NEET Mock', 'Try UPSC Mock']
    } else if (queryLower.includes('hi') || queryLower.includes('hello') || queryLower.includes('hey') || queryLower.includes('who are you')) {
      content =
        "Hello! 👋 I'm **TalentXcel AI**, your friendly personal learning guide.\n\n" +
        "I'm here to help you with anything on the platform:\n" +
        "- 🎯 **Free Diagnostic Practice**: Take 5 free questions per subject (no login needed)\n" +
        "- 📚 **Classes 4–12 Curriculum**: Board-aligned lessons across CBSE, ICSE, and IB\n" +
        "- 🚀 **Skill Development**: Hands-on tracks in AI, Coding, Robotics, and Design\n" +
        "- 🏆 **Competitive Entrances**: JEE, NEET, CUET, UPSC, and Banking mocks\n" +
        "- 💡 **Homework & Concept Help**: Ask me any academic question and I'll explain it step-by-step!\n\n" +
        "What can I help you explore today?"
      suggestedActions = ['Start Free Practice', 'How does the platform work?', 'View Pricing Plans']
    } else {
      content =
        `Thank you for asking! I'm here to support your learning journey on TalentXcel.\n\n` +
        `TalentXcel unifies **Diagnostic Assessments** (Domain 1), **Hands-on Skills** (Domain 2), and **Academic Lessons** (Domain 3) into a single 4-step loop (Diagnose → Learn → Build → Master).\n\n` +
        `Whether you're looking for our free 5-question diagnostics, curriculum maps for Classes 4–12, competitive entrance mocks (JEE, NEET, UPSC), or transparent pricing starting from ₹20, I'm happy to guide you!\n\n` +
        `Would you like to try a free practice test or explore our syllabus for a specific grade?`
      suggestedActions = ['Start Free Practice Test', 'Explore Class 4-12 Curriculum', 'View Transparent Pricing']
    }
  } else {
    content =
      "Welcome to TalentXcel! I can help you understand our curriculum, diagnostics, and project requirements. What would you like to know?"
    suggestedActions = ['Start Free Practice', 'View syllabus', 'Check fees and plans']
  }

  return {
    content,
    provider: 'mock',
    model: 'talentxcel-deterministic-v1',
    tokensUsed: { prompt: 50, completion: 150, total: 200 },
    latencyMs: Date.now() - startTime,
    isFallback: true,
    sources,
    confidence: 0.95,
    suggestedActions,
    canEscalate: true,
  }
}
