import React from 'react'
import { Metadata } from 'next'
import { FactorialCalculatorClient } from '@/components/tools/combination-permutation-calculators'

export const metadata: Metadata = {
  title: 'Factorial Calculator — n! Value for Any n (0! to 1000!) | TalentXcel',
  description:
    'Free online Factorial Calculator. Instantly compute 5!=120, 10!=3628800, or any n! value. Essential for permutations, combinations, and Class 11-12 Maths probability.',
  keywords: [
    'factorial calculator',
    'n factorial calculator',
    '5 factorial value',
    '10 factorial',
    'factorial of 100',
    'n! calculator online',
    'factorial formula',
    'factorial class 11',
    'factorial maths',
  ],
  alternates: {
    canonical: 'https://talentxcel.net/tools/factorial-calculator',
  },
  openGraph: {
    title: 'Factorial Calculator — Compute n! Instantly',
    description:
      'Calculate 5!, 10!, 100!, or any n! instantly. Free tool for Class 11-12 Maths, JEE, and NDA probability preparation.',
    url: 'https://talentxcel.net/tools/factorial-calculator',
    type: 'website',
  },
}

export default function FactorialCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Factorial Calculator n!',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'All',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
    description: 'Free online factorial calculator that instantly computes n! for any non-negative integer n.',
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is 5 factorial?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '5! = 120. It is calculated as 5 × 4 × 3 × 2 × 1 = 120.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is 10 factorial?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '10! = 3,628,800. It is calculated as 10 × 9 × 8 × 7 × 6 × 5 × 4 × 3 × 2 × 1.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is 0 factorial?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '0! = 1. This is defined by convention and is essential for the combination and permutation formulas to work correctly.',
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <FactorialCalculatorClient />
    </>
  )
}
