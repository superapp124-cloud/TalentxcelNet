import { executeAIRequest } from './router'
import type { CodeReviewRequest, AICompletionResponse } from './types'

export async function reviewStudentCode(
  req: CodeReviewRequest,
  userId?: string
): Promise<AICompletionResponse> {
  const systemPrompt = `You are the TalentXcel Academy AI Coding Mentor.
Language: ${req.language}
Problem Statement: ${req.problemDescription ?? 'Course Exercise'}
Evaluation Rubric: ${req.exerciseRubric ?? 'Standard Clean Code & Correctness'}

Instructions:
1. Explain any syntax errors or logical bugs clearly.
2. Provide guidance without writing the entire final answer for the student.
3. Suggest best practices for edge-case handling, performance, and security.
4. Point out what the learner did well to foster confidence.`

  return await executeAIRequest({
    agentType: 'coding_mentor',
    userId,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Please review my code:\n\`\`\`${req.language}\n${req.code}\n\`\`\`` },
    ],
  })
}
