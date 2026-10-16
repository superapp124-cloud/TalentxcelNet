import { executeAIRequest } from './router'
import type { TutorExplanationRequest, AICompletionResponse } from './types'

export async function askAITutor(
  req: TutorExplanationRequest,
  userId?: string
): Promise<AICompletionResponse> {
  const modeInstruction =
    req.mode === 'hint'
      ? `Give ONLY Hint #${req.hintStep ?? 1}. Do not reveal the full solution. Guide the student to think independently.`
      : 'Provide a thorough conceptual explanation with clear code examples where applicable.'

  const systemPrompt = `You are the TalentXcel Academy AI Learning Tutor.
Curriculum Context: ${req.courseContext}
Difficulty Level: ${req.difficultyLevel ?? 'intermediate'}
Mode: ${modeInstruction}

Rules:
1. Always base answers on verified curriculum materials.
2. Never claim TalentXcel is a government/university accredited qualification.
3. If the question involves dangerous, illegal, or unethical instructions, politely refuse and redirect to academic learning.
4. Keep explanations structured, empowering, and concise.`

  return await executeAIRequest({
    agentType: 'learning_tutor',
    userId,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: req.question },
    ],
  })
}
