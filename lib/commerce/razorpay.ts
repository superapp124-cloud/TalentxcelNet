import crypto from 'crypto'

export interface RazorpayOrderPayload {
  amount: number // in smallest currency unit (paise)
  currency: string
  receipt: string
  notes?: Record<string, string>
}

export async function createRazorpayOrder(payload: RazorpayOrderPayload) {
  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET

  // If credentials are unavailable, return a sandbox simulated order
  if (!keyId || !keySecret || process.env.PAYMENT_MODE === 'sandbox_mock') {
    return {
      id: `order_mock_${Date.now()}`,
      entity: 'order',
      amount: payload.amount,
      amount_paid: 0,
      amount_due: payload.amount,
      currency: payload.currency,
      receipt: payload.receipt,
      status: 'created',
      attempts: 0,
      notes: payload.notes ?? {},
      created_at: Math.floor(Date.now() / 1000),
      isMock: true,
    }
  }

  const authHeader = Buffer.from(`${keyId}:${keySecret}`).toString('base64')

  const res = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${authHeader}`,
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`Razorpay API Error: ${errorText}`)
  }

  return await res.json()
}

export function verifyWebhookSignature(
  webhookBody: string,
  receivedSignature: string,
  secret: string
): boolean {
  if (!receivedSignature || !secret) return false
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(webhookBody)
    .digest('hex')

  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature),
    Buffer.from(receivedSignature)
  )
}
