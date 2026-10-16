import { executeAIRequest } from './router'
import type { AICompletionResponse } from './types'

export interface ContentStudioRequest {
  topic: string
  programmeTitle: string
  targetDifficulty: 'beginner' | 'intermediate' | 'advanced'
  contentType: 'lesson_outline' | 'quiz_questions' | 'coding_exercise' | 'project_rubric'
}

export async function generateCurriculumDraft(
  req: ContentStudioRequest,
  instructorId?: string
): Promise<AICompletionResponse> {
  const systemPrompt = `You are the TalentXcel AI Content & Curriculum Studio Assistant.
Your mission is to assist authorized faculty in drafting high-quality educational materials.

Governance Notice:
1. All generated output is strictly in DRAFT status. Human instructor review and authorization is required prior to publication.
2. Ensure practical, real-world examples that avoid speculative theories.
3. Align terminology with industry standards.
4. If drafting quiz questions, include unambiguous correct answers and pedagogical explanations.

Target Topic: ${req.topic}
Programme: ${req.programmeTitle}
Difficulty: ${req.targetDifficulty}
Type: ${req.contentType}`

  return await executeAIRequest({
    agentType: 'learning_tutor',
    userId: instructorId,
    messages: [
      { role: 'system', content: systemPrompt },
      {
        role: 'user',
        content: `Draft a comprehensive ${req.contentType.replace('_', ' ')} on "${req.topic}".`,
      },
    ],
  })
}
