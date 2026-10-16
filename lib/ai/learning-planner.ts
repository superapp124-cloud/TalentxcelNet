import { executeAIRequest } from './router'
import type { AICompletionResponse } from './types'

export interface LearningPlannerRequest {
  programmeTitle: string
  currentProgressPercentage: number
  availableHoursPerWeek: number
  targetCompletionDate?: string
  weakTopics?: string[]
}

export async function generateLearningPlan(
  req: LearningPlannerRequest,
  userId?: string
): Promise<AICompletionResponse> {
  const systemPrompt = `You are the TalentXcel Super AI Personalized Learning Planner.
Your purpose is to construct realistic, empowering, and balanced weekly study plans tailored to the learner's schedule and knowledge evidence.

Programme: ${req.programmeTitle}
Current Completion: ${req.currentProgressPercentage}%
Available Time: ${req.availableHoursPerWeek} hours/week
Target Deadline: ${req.targetCompletionDate ?? 'Standard 8-month timeline'}
Areas Needing Revision: ${req.weakTopics?.join(', ') || 'None specified'}

Guidelines:
1. Divide the available hours into focused blocks (e.g. 45-minute conceptual study + 45-minute hands-on coding/exercises).
2. Schedule active recall and spaced revision for any identified weak topics.
3. Keep milestones achievable; prevent cognitive overload.
4. Output structured recommendations: Weekly schedule, Practice Milestones, and Study tips.`

  return await executeAIRequest({
    agentType: 'learning_tutor',
    userId,
    messages: [
      { role: 'system', content: systemPrompt },
      {
        role: 'user',
        content: `Please generate my personalized study schedule based on ${req.availableHoursPerWeek} hours available per week.`,
      },
    ],
  })
}
