import React from 'react'
import { Metadata } from 'next'
import { PermutationCalculatorClient } from '@/components/tools/combination-permutation-calculators'

export const metadata: Metadata = {
  title: 'Permutation Calculator nPr — 5P3, 4P2, Any nPr Value | TalentXcel',
  description:
    'Free online Permutation Calculator (nPr). Instantly find 5P3=60, 4P2=12, and any P(n,r) value with formula steps. Used in Class 11-12 Maths, JEE, and NDA probability chapters.',
  keywords: [
    '5p3 value',
    'permutation calculator',
    'nPr calculator',
    'nPr formula',
    'permutation formula class 11',
    'nPr online calculator',
    '4p2 value',
    '6p3 value',
    'permutation class 12',
    'ordered arrangement calculator',
  ],
  alternates: {
    canonical: 'https://talentxcel.net/tools/permutation-calculator',
  },
  openGraph: {
    title: 'Permutation Calculator nPr — Instant P(n,r) Value with Steps',
    description:
      'Calculate 5P3, 4P2, or any nPr permutation instantly. Free tool for Class 11-12 Maths and JEE preparation.',
    url: 'https://talentxcel.net/tools/permutation-calculator',
    type: 'website',
  },
}

export default function PermutationCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Permutation Calculator nPr',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'All',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
    description:
      'Free online permutation calculator that computes P(n,r) — the number of ordered arrangements of r items chosen from n.',
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is 5P3 value?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '5P3 = 60. It is calculated as 5! / (5-3)! = 120 / 2 = 60. There are 60 ordered ways to arrange 3 of 5 items.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the permutation formula?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'P(n, r) = n! / (n − r)!. This counts ordered arrangements of r items selected from n distinct items.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between permutation and combination?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In permutations (nPr), the order of selection matters. In combinations (nCr), order does not matter. So nPr = nCr × r!.',
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <PermutationCalculatorClient />
    </>
  )
}
