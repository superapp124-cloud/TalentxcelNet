export interface PricingTier {
  programmeSlug: string
  programmeTitle: string
  basePrice: number
  upfrontAmount: number
  monthlyAmount: number
  instalmentMonths: number
  currency: string
  taxRatePercent: number // GST e.g. 18
}

export const PROGRAMME_PRICING: Record<string, PricingTier> = {
  'ai-development': {
    programmeSlug: 'ai-development',
    programmeTitle: 'AI Development & Automation',
    basePrice: 41999,
    upfrontAmount: 29999,
    monthlyAmount: 1500,
    instalmentMonths: 8,
    currency: 'INR',
    taxRatePercent: 18,
  },
  'healthcare-tech': {
    programmeSlug: 'healthcare-tech',
    programmeTitle: 'Healthcare Technology',
    basePrice: 34999,
    upfrontAmount: 24999,
    monthlyAmount: 1250,
    instalmentMonths: 8,
    currency: 'INR',
    taxRatePercent: 18,
  },
  entrepreneurship: {
    programmeSlug: 'entrepreneurship',
    programmeTitle: 'Entrepreneurship & Small-Business Digitization',
    basePrice: 29999,
    upfrontAmount: 19999,
    monthlyAmount: 1250,
    instalmentMonths: 8,
    currency: 'INR',
    taxRatePercent: 18,
  },
  'school-foundation': {
    programmeSlug: 'school-foundation',
    programmeTitle: 'School Foundation (Class 8 → 9)',
    basePrice: 24999,
    upfrontAmount: 16999,
    monthlyAmount: 1000,
    instalmentMonths: 8,
    currency: 'INR',
    taxRatePercent: 18,
  },
}

export function calculateOrderSummary(
  programmeSlug: string,
  paymentType: 'full' | 'instalment' = 'instalment',
  couponCode?: string
) {
  const tier = PROGRAMME_PRICING[programmeSlug] ?? PROGRAMME_PRICING['ai-development']
  const subtotal = paymentType === 'full' ? tier.basePrice : tier.upfrontAmount

  // Example discount validation
  let discount = 0
  if (couponCode?.toUpperCase() === 'EARLYBIRD10') {
    discount = Math.round(subtotal * 0.1)
  }

  const taxableAmount = Math.max(0, subtotal - discount)
  const tax = Math.round((taxableAmount * tier.taxRatePercent) / 100)
  const total = taxableAmount + tax

  return {
    tier,
    paymentType,
    subtotal,
    discount,
    taxableAmount,
    tax,
    total,
    currency: tier.currency,
  }
}
