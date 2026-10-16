import { executeAIRequest } from './router'
import type { AICompletionResponse } from './types'

export interface CareerAssistantRequest {
  projectTitle: string
  technologiesUsed: string[]
  achievedOutcome: string
  requestType: 'resume_bullets' | 'portfolio_case_study' | 'interview_talking_points'
}

export async function generateCareerArtifact(
  req: CareerAssistantRequest,
  userId?: string
): Promise<AICompletionResponse> {
  const systemPrompt = `You are the TalentXcel Super AI Career & Portfolio Assistant.
Your mission is to help learners document their practical engineering accomplishments effectively.

Integrity Policy:
1. Never fabricate work experience, employer relationships, or fictitious metrics.
2. Emphasize actual engineering decisions, architecture trade-offs, and technologies used.
3. Use active, action-oriented verbs (e.g. "Architected", "Engineered", "Implemented", "Containerized").

Project Context:
- Title: ${req.projectTitle}
- Tech Stack: ${req.technologiesUsed.join(', ')}
- Measurable Outcome: ${req.achievedOutcome}`

  return await executeAIRequest({
    agentType: 'learning_tutor',
    userId,
    messages: [
      { role: 'system', content: systemPrompt },
      {
        role: 'user',
        content: `Draft a high-impact ${req.requestType.replace('_', ' ')} based on this project.`,
      },
    ],
  })
}
