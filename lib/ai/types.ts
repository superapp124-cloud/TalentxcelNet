export type AIProvider = 'openai' | 'google' | 'anthropic' | 'mock'

export type AIAgentType =
  | 'learning_tutor'
  | 'coding_mentor'
  | 'admissions_assistant'
  | 'curriculum_studio'
  | 'operations_copilot'

export interface PromptMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface AICompletionRequest {
  agentType: AIAgentType
  messages: PromptMessage[]
  temperature?: number
  maxTokens?: number
  userId?: string
  programmeId?: string
  contextData?: Record<string, unknown>
}

export interface AICompletionResponse {
  content: string
  provider: AIProvider
  model: string
  tokensUsed: {
    prompt: number
    completion: number
    total: number
  }
  latencyMs: number
  isFallback: boolean
  escalatedToHuman?: boolean
  sources?: Array<{ title: string; category: string }>
  confidence?: number
  suggestedActions?: string[]
  canEscalate?: boolean
}

export interface TutorExplanationRequest {
  question: string
  courseContext: string
  projectContext?: string
  difficultyLevel?: 'beginner' | 'intermediate' | 'advanced'
  mode?: 'hint' | 'full_solution'
  hintStep?: number
}

export interface CodeReviewRequest {
  code: string
  language: string
  exerciseRubric?: string
  problemDescription?: string
}
