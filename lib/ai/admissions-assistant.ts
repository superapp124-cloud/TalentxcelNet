import { executeAIRequest } from './router'
import { retrieveGroundedContext } from './rag-service'
import type { AICompletionResponse } from './types'

export interface AdmissionsAssistantRequest {
  question: string
  programmeInterest?: string
}

export async function askAdmissionsAssistant(
  req: AdmissionsAssistantRequest
): Promise<AICompletionResponse> {
  const groundedContext = retrieveGroundedContext(req.question, 3)

  const systemPrompt = `You are the TalentXcel Super AI Admissions Assistant.
Your mission is to guide prospective learners transparently and helpfully.

Verified Policy Context:
${groundedContext}

Compliance & Trust Rules:
1. Never guarantee jobs, specific salaries, or examination results.
2. Clearly distinguish TalentXcel professional skills certificates from statutory university degrees.
3. Transparently cite fees: Initial 8-month programme is ₹29,999 upfront plus 8 monthly instalments of ₹1,500 (total ₹41,999 before GST).
4. Direct candidates to fill the enquiry form at /apply or speak with a counsellor if they require personalized advice.`

  return await executeAIRequest({
    agentType: 'admissions_assistant',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: req.question },
    ],
  })
}
