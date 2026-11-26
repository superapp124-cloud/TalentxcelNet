import { getActiveEntitlements } from '@/lib/commerce/entitlements'
import { ALL_COMMERCIAL_PRODUCTS } from '@/packages/core/src/data/product-catalog'
import type { LearnerEntitlement, ProductDomain } from '@/packages/core/src/types'

export interface EnrichedEntitlement extends LearnerEntitlement {
  productTitle: string
  productTagline: string
  inclusions: string[]
  features: string[]
  targetGradeLevel?: number
}

export interface UserEntitlementSummary {
  entitlements: EnrichedEntitlement[]
  activeDomains: ProductDomain[]
  isPaidCustomer: boolean
}

/**
 * Loads and deduplicates active paid entitlements for an authenticated user
 * across both `userId` and `email`, enriched with commercial product metadata.
 */
export async function getUserActiveEntitlements(
  userId: string,
  email?: string | null
): Promise<UserEntitlementSummary> {
  const [byId, byEmail] = await Promise.all([
    getActiveEntitlements(userId),
    email ? getActiveEntitlements(email) : Promise.resolve([]),
  ])

  const seenIds = new Set<string>()
  const merged: LearnerEntitlement[] = []

  for (const ent of [...byId, ...byEmail]) {
    if (seenIds.has(ent.id)) continue
    seenIds.add(ent.id)
    merged.push(ent)
  }

  const enriched: EnrichedEntitlement[] = merged.map((ent) => {
    const product = ALL_COMMERCIAL_PRODUCTS[ent.productId]
    return {
      ...ent,
      productTitle: product?.title || ent.productId,
      productTagline: product?.tagline || 'Active TalentXcel service',
      inclusions: product?.inclusions || [],
      features: product?.features || [],
      targetGradeLevel: product?.targetGradeLevel,
    }
  })

  const activeDomains = Array.from(new Set(enriched.map((e) => e.domain)))

  return {
    entitlements: enriched,
    activeDomains,
    isPaidCustomer: enriched.length > 0,
  }
}
