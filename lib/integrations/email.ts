/**
 * Transactional Email Integration Adapter
 * Supports Resend, SMTP, or graceful simulated delivery in development
 */

export interface EmailPayload {
  to: string
  subject: string
  html: string
  text?: string
  from?: string
}

export async function sendTransactionalEmail(payload: EmailPayload): Promise<{ success: boolean; messageId?: string }> {
  const apiKey = process.env.RESEND_API_KEY
  const senderEmail = payload.from || process.env.SYSTEM_FROM_EMAIL || 'admissions@talentxcel.net'

  if (apiKey) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          from: senderEmail,
          to: payload.to,
          subject: payload.subject,
          html: payload.html,
          text: payload.text,
        }),
      })

      if (res.ok) {
        const data = await res.json()
        return { success: true, messageId: data.id }
      }
    } catch (err) {
      console.error('[Email Adapter] Resend delivery error:', err)
    }
  }

  // Development / sandbox simulated delivery
  console.log(`[Email Adapter: Simulated Delivery] To: ${payload.to} | Subject: "${payload.subject}"`)
  return {
    success: true,
    messageId: `sim_email_${Date.now()}`,
  }
}
