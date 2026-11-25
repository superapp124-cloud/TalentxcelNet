import React from 'react'
import { Metadata } from 'next'
import { CombinationCalculatorClient } from '@/components/tools/combination-permutation-calculators'

export const metadata: Metadata = {
  title: 'Combination Calculator nCr — 5C3, 10C2, Any nCr Value | TalentXcel',
  description:
    'Free online Combination Calculator (nCr). Instantly find 5C3=10, 10C2=45, and any C(n,r) value with formula steps. Used in Class 11-12 Maths, JEE Main, NDA probability chapters.',
  keywords: [
    '5c3 value',
    'combination calculator',
    'nCr calculator',
    '10c2 value',
    'C(n,r) formula',
    'combination formula class 11',
    'nCr online calculator',
    '5c3 combination',
    '4c2 value',
    '6c3 value',
    'nCr maths',
    'combination class 12',
  ],
  alternates: {
    canonical: 'https://talentxcel.net/tools/combination-calculator',
  },
  openGraph: {
    title: 'Combination Calculator nCr — Instant C(n,r) Value with Steps',
    description:
      'Calculate 5C3, 10C2, or any nCr combination instantly. Free tool for Class 11-12 Maths and JEE preparation.',
    url: 'https://talentxcel.net/tools/combination-calculator',
    type: 'website',
  },
}

export default function CombinationCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Combination Calculator nCr',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'All',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
    description:
      'Free online combination calculator that computes C(n,r) — the number of ways to choose r items from n without regard to order.',
    featureList: [
      'Instant nCr calculation',
      'Formula steps shown',
      'Popular combinations reference table',
      'WhatsApp share',
    ],
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is 5C3 value?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '5C3 = 10. It is calculated as 5! / (3! × 2!) = 120 / (6 × 2) = 10. There are 10 ways to choose 3 items from 5.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is 10C2 value?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '10C2 = 45. It is calculated as 10! / (2! × 8!) = (10 × 9) / 2 = 45.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the combination formula?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'C(n, r) = n! / [r! × (n − r)!]. This counts the number of ways to select r items from n distinct items where order does not matter.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is 4C2 value?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '4C2 = 6. Calculated as 4! / (2! × 2!) = 24 / 4 = 6.',
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <CombinationCalculatorClient />
    </>
  )
}
