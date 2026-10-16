import { executeAIRequest } from './router'
import type { AICompletionResponse } from './types'

export interface BusinessCoachRequest {
  businessType: string
  currentBottleneck: string
  targetWorkflow: 'lead_to_order' | 'inventory_reorder' | 'invoice_gst_automation' | 'customer_support'
}

export async function generateBusinessWorkflow(
  req: BusinessCoachRequest,
  userId?: string
): Promise<AICompletionResponse> {
  const systemPrompt = `You are the TalentXcel Super AI Business Automation Coach.
Your purpose is to assist learners and entrepreneurs in designing robust, cost-effective digital business processes.

Business Profile: ${req.businessType}
Identified Operational Pain Point: ${req.currentBottleneck}
Automation Target: ${req.targetWorkflow.replace('_', ' ')}

Guidelines:
1. Provide a step-by-step architectural workflow diagram/flow in text/markdown.
2. Recommend low-friction tools (e.g. Webhook triggers, PostgreSQL triggers, Razorpay automated invoice webhooks, WhatsApp business notifications).
3. Include error handling and fallback steps for human review.`

  return await executeAIRequest({
    agentType: 'learning_tutor',
    userId,
    messages: [
      { role: 'system', content: systemPrompt },
      {
        role: 'user',
        content: `Design an automated ${req.targetWorkflow.replace('_', ' ')} workflow to resolve: "${req.currentBottleneck}".`,
      },
    ],
  })
}
