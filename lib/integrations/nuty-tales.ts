/**
 * Nuty Tales Commerce Ecosystem Integration Adapter Contract
 * Section 15: Integrations & Future Ecosystem Expansion
 */

export interface NutyTalesOrderSyncPayload {
  learnerId: string
  programmeSlug: string
  commercialPlan: 'full' | 'instalment'
  grossAmount: number
  currency: string
  hardwareIncluded: boolean
}

export interface NutyTalesSyncResponse {
  synced: boolean
  syncId: string
  timestamp: string
  isSimulated: boolean
}

export async function syncOrderToNutyTales(
  payload: NutyTalesOrderSyncPayload
): Promise<NutyTalesSyncResponse> {
  const apiKey = process.env.NUTY_TALES_API_KEY
  const endpoint = process.env.NUTY_TALES_ENDPOINT

  if (apiKey && endpoint) {
    try {
      const res = await fetch(`${endpoint}/api/v1/orders/sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        const data = await res.json()
        return {
          synced: true,
          syncId: data.syncId,
          timestamp: new Date().toISOString(),
          isSimulated: false,
        }
      }
    } catch (err) {
      console.warn('[Nuty Tales Adapter] Sync warning (falling back to contract simulation):', err)
    }
  }

  // Contract simulation for development
  return {
    synced: true,
    syncId: `nuty_sync_${Date.now()}`,
    timestamp: new Date().toISOString(),
    isSimulated: true,
  }
}
