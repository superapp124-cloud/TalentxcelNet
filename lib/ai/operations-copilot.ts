import { executeAIRequest } from './router'
import type { AICompletionResponse } from './types'

export interface OperationsCopilotRequest {
  totalLeads: number
  counsellingCompleted: number
  paidEnrolments: number
  grossBookingValue: number
  collectedCash: number
  activeSupportTickets: number
}

export async function generateOperationsSummary(
  req: OperationsCopilotRequest,
  adminUserId?: string
): Promise<AICompletionResponse> {
  const leadToEnrolmentConversion =
    req.totalLeads > 0 ? ((req.paidEnrolments / req.totalLeads) * 100).toFixed(1) : '0'

  const cashCollectionRatio =
    req.grossBookingValue > 0 ? ((req.collectedCash / req.grossBookingValue) * 100).toFixed(1) : '0'

  const systemPrompt = `You are the TalentXcel Super AI Operations Copilot.
Your purpose is to provide senior operations and admissions leadership with clear, data-driven executive summaries.

Current Platform Telemetry:
- Total Admissions Inquiries: ${req.totalLeads}
- Completed Counselling Calls: ${req.counsellingCompleted}
- Confirmed Enrolments: ${req.paidEnrolments} (Conversion: ${leadToEnrolmentConversion}%)
- Gross Booking Value: ₹${req.grossBookingValue.toLocaleString('en-IN')}
- Net Collected Cash: ₹${req.collectedCash.toLocaleString('en-IN')} (Cash realization: ${cashCollectionRatio}%)
- Active Support Tickets: ${req.activeSupportTickets}

Provide a structured briefing:
1. Executive Health Assessment (Green / Amber / Red indicators).
2. Admissions Funnel Velocity & Bottleneck Analysis.
3. Unit Economics & Cashflow Realization Insight.
4. Top 3 Actionable Recommendations for Staff Operations.`

  return await executeAIRequest({
    agentType: 'learning_tutor',
    userId: adminUserId,
    messages: [
      { role: 'system', content: systemPrompt },
      {
        role: 'user',
        content: 'Generate the daily operations and admissions executive summary.',
      },
    ],
  })
}
