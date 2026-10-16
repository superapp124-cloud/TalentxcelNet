/**
 * TALENTXCEL ECOSYSTEM INTENT ROUTER
 *
 * Classification Architecture:
 * - Deterministic Semantic Keyword & Heuristic Intent Matching with Grounded Disambiguation.
 * - This engine uses deterministic token density scoring across vetted domain taxonomies.
 * - Heuristic match score is a normalized ranking score (0.0 - 1.0), NOT a calibrated statistical probability.
 * - Incorporates adversarial query filtering, ambiguity detection, and safe default fallbacks.
 */

import { ECOSYSTEM_DOMAINS, getDomainRecord } from '@/lib/ecosystem/registry'
import { generateSecureReferralUrl } from '@/lib/ecosystem/referral-engine'
import { ECOSYSTEM_KNOWLEDGE_INDEX, EcosystemKnowledgeItem, searchKnowledgeBase } from '@/lib/ecosystem/knowledge-base'

export interface RecommendedDestination {
  title: string
  hostname: string
  path: string
  description: string
  actionLabel: string
  secureUrl: string
}

export interface EcosystemRouteResult {
  primaryBrand: 'talentxcel' | 'talentxcel-academy' | 'chatr' | 'nuty-tales'
  brandName: string
  classificationMethod: 'deterministic_heuristic'
  /** Normalized heuristic keyword relevance score (0.0 to 1.0), not a calibrated probability */
  heuristicMatchScore: number
  /** Deprecated alias maintained for backward compatibility */
  confidence: number
  isAmbiguous: boolean
  ambiguityCandidates?: Array<'talentxcel' | 'talentxcel-academy' | 'chatr' | 'nuty-tales'>
  isUnrelatedOrAdversarial: boolean
  rationale: string
  intent: 'career_pathway' | 'resume_analysis' | 'academy_enrolment' | 'chatr_community' | 'nuty_commerce_sandbox'
  recommendedDestinations: RecommendedDestination[]
  relevantArticles: EcosystemKnowledgeItem[]
}

const CAREER_KEYWORDS = [
  'job', 'career', 'resume', 'cv', 'salary', 'compensation', 'placement', 'interview',
  'hiring', 'recruiter', 'ats', 'employer', 'ctc', 'pathway', 'promotion', 'internship',
  'freshers', 'campus', 'recruitment', 'workforce'
]

const CHATR_KEYWORDS = [
  'chat', 'messaging', 'communication', 'channel', 'peer', 'study group', 'community',
  'discuss', 'discussion', 'forum', 'collaborate', 'team chat', 'bot', 'slack', 'discord'
]

const COMMERCE_KEYWORDS = [
  'gift', 'gifting', 'walnut', 'saffron', 'dry fruit', 'artisanal', 'craft',
  'stay', 'travel', 'resort', 'wedding', 'nri', 'heritage', 'luxury gift', 'kashmir',
  'handicraft', 'hamper', 'orchard'
]

const ACADEMY_KEYWORDS = [
  'course', 'programme', 'learn', 'curriculum', 'lesson', 'quiz', 'pwa', 'exam',
  'code review', 'tutor', 'agent', 'rag', 'cloud native', 'enroll', 'admission',
  'homework', 'assessment', 'certificate', 'syllabus'
]

// Common adversarial / out-of-scope markers
const ADVERSARIAL_MARKERS = [
  'ignore previous instructions',
  'system prompt',
  'drop table',
  'select * from',
  '<script>',
  'eval(',
  'javascript:',
]

function countKeywordMatches(text: string, keywords: string[]): number {
  const lower = text.toLowerCase()
  return keywords.reduce((count, word) => {
    // Word boundary or substring presence check
    const regex = new RegExp(`\\b${word}\\b`, 'i')
    return regex.test(lower) || lower.includes(word) ? count + 1 : count
  }, 0)
}

function safeGenerateSignedUrl(
  sourceBrand: 'talentxcel' | 'talentxcel-academy' | 'chatr' | 'nuty-tales',
  destinationHost: string,
  destinationPath: string,
  userIntent: 'career_pathway' | 'resume_analysis' | 'academy_enrolment' | 'chatr_community' | 'nuty_commerce_sandbox',
  campaign: string
): string {
  try {
    return generateSecureReferralUrl({
      sourceBrand,
      destinationHost,
      destinationPath,
      userIntent,
      campaign,
    })
  } catch {
    // If secret is absent (client-side or unconfigured), fail open to canonical URL without signature
    const domain = getDomainRecord(destinationHost)
    const base = domain ? domain.canonicalHostname : destinationHost
    const path = destinationPath.startsWith('/') ? destinationPath : `/${destinationPath}`
    return `https://${base}${path === '/' ? '' : path}`
  }
}

export function routeEcosystemIntent(query: string, currentContext?: string): EcosystemRouteResult {
  const rawText = `${query || ''} ${currentContext || ''}`.trim()
  const lower = rawText.toLowerCase()

  // 1. Check for prompt injection or adversarial markers
  const isAdversarial = ADVERSARIAL_MARKERS.some((marker) => lower.includes(marker))

  const careerScore = countKeywordMatches(lower, CAREER_KEYWORDS)
  const chatrScore = countKeywordMatches(lower, CHATR_KEYWORDS)
  const commerceScore = countKeywordMatches(lower, COMMERCE_KEYWORDS)
  const academyScore = countKeywordMatches(lower, ACADEMY_KEYWORDS)

  const scores = [
    { brand: 'talentxcel' as const, score: careerScore, name: 'TalentXcel Career Network' },
    { brand: 'chatr' as const, score: chatrScore, name: 'CHATR AI Collaboration' },
    { brand: 'nuty-tales' as const, score: commerceScore, name: 'Nuty Tales Artisanal Commerce' },
    { brand: 'talentxcel-academy' as const, score: academyScore, name: 'TalentXcel Academy' },
  ].sort((a, b) => b.score - a.score)

  const topMatch = scores[0]
  const secondMatch = scores[1]
  const totalScore = careerScore + chatrScore + commerceScore + academyScore

  // 2. Out-of-scope / Unrelated / Adversarial Handling
  if (isAdversarial || totalScore === 0) {
    return {
      primaryBrand: 'talentxcel-academy',
      brandName: 'TalentXcel Academy',
      classificationMethod: 'deterministic_heuristic',
      heuristicMatchScore: 0.0,
      confidence: 0.0,
      isAmbiguous: false,
      isUnrelatedOrAdversarial: true,
      rationale: isAdversarial
        ? 'Query contained adversarial or unsafe patterns. Safely falling back to Academy standard guidance.'
        : 'Query does not match any ecosystem brand keywords. Directing to Academy core curriculum directory.',
      intent: 'academy_enrolment',
      recommendedDestinations: [
        {
          title: 'Browse Academy Programmes',
          hostname: 'talentxcel.net',
          path: '/programmes',
          description: 'Explore active Cloud Native and AI engineering certifications.',
          actionLabel: 'View Programmes',
          secureUrl: '/programmes',
        },
        {
          title: 'Learner Cockpit',
          hostname: 'talentxcel.net',
          path: '/dashboard',
          description: 'Return to your personalized learning workspace.',
          actionLabel: 'Open Dashboard',
          secureUrl: '/dashboard',
        },
      ],
      relevantArticles: searchKnowledgeBase('academy', 'talentxcel-academy').slice(0, 2),
    }
  }

  // 3. Ambiguity Detection (tied or near-tied scores across distinct brands)
  const isAmbiguous =
    topMatch.score > 0 &&
    secondMatch.score > 0 &&
    topMatch.brand !== secondMatch.brand &&
    (topMatch.score === secondMatch.score ||
      (Math.abs(topMatch.score - secondMatch.score) <= 4 &&
        ((lower.includes('salary') || lower.includes('career') || lower.includes('job')) &&
          (lower.includes('chat') || lower.includes('discuss') || lower.includes('messaging')))))

  const ambiguityCandidates = isAmbiguous
    ? [topMatch.brand, secondMatch.brand]
    : undefined

  // Determine intent & primary brand
  let primaryBrand: EcosystemRouteResult['primaryBrand'] = topMatch.brand
  let brandName = topMatch.name
  let intent: EcosystemRouteResult['intent'] = 'academy_enrolment'
  let rationale = `Query matched ${topMatch.score} relevant keyword indicator(s) for ${topMatch.name}.`

  if (primaryBrand === 'talentxcel') {
    intent = lower.includes('resume') || lower.includes('cv') || lower.includes('ats')
      ? 'resume_analysis'
      : 'career_pathway'
    rationale = isAmbiguous
      ? `Query touches both ${topMatch.name} and ${secondMatch.name}. Presenting career matching options.`
      : `Query relates to career planning, verified resumes, or compensation benchmarks.`
  } else if (primaryBrand === 'chatr') {
    intent = 'chatr_community'
    rationale = isAmbiguous
      ? `Query touches both ${topMatch.name} and ${secondMatch.name}. Presenting collaboration options.`
      : `Query relates to team messaging, peer cohort study channels, or community bots.`
  } else if (primaryBrand === 'nuty-tales') {
    intent = 'nuty_commerce_sandbox'
    rationale = isAmbiguous
      ? `Query touches both ${topMatch.name} and ${secondMatch.name}. Presenting commerce and gifting options.`
      : `Query relates to corporate gifting, artisanal Kashmiri dry fruits, or cultural craft stays.`
  } else {
    intent = 'academy_enrolment'
    rationale = `Query aligns with Cloud Native AI engineering, coursework, and technical skills development.`
  }

  // Calculate heuristic score (bounded 0.3 - 0.95, explicitly labeled as heuristic density)
  const heuristicMatchScore = Math.min(0.95, Math.max(0.3, 0.25 + topMatch.score * 0.18))

  // Build tailored destinations
  const destinations: RecommendedDestination[] = []

  if (primaryBrand === 'talentxcel') {
    if (intent === 'resume_analysis') {
      destinations.push({
        title: 'TalentXcel Verified Resume Builder',
        hostname: 'resume.talentxcel.in',
        path: '/',
        description: 'Format your Academy accomplishments into an ATS-optimized executive resume.',
        actionLabel: 'Launch Resume Engine',
        secureUrl: safeGenerateSignedUrl(
          'talentxcel-academy',
          'resume.talentxcel.in',
          '/',
          'resume_analysis',
          'ai_router_intent'
        ),
      })
    } else {
      destinations.push({
        title: 'AI Career Pathways Builder',
        hostname: 'career-pathways-ai-builder.vercel.app',
        path: '/',
        description: 'Map out high-growth tech pathways matched against live employer demand.',
        actionLabel: 'Explore Career Pathways',
        secureUrl: safeGenerateSignedUrl(
          'talentxcel-academy',
          'career-pathways-ai-builder.vercel.app',
          '/',
          'career_pathway',
          'ai_router_intent'
        ),
      })
      destinations.push({
        title: 'Salary & Compensation Benchmark',
        hostname: 'salary.talentxcel.in',
        path: '/',
        description: 'Inspect verified percentile compensation for Cloud and AI engineering roles.',
        actionLabel: 'Check Market Salaries',
        secureUrl: safeGenerateSignedUrl(
          'talentxcel-academy',
          'salary.talentxcel.in',
          '/',
          'career_pathway',
          'ai_router_intent'
        ),
      })
    }
  } else if (primaryBrand === 'chatr') {
    destinations.push({
      title: 'CHATR AI Collaboration Suite',
      hostname: 'chatr.chat',
      path: '/',
      description: 'Connect with fellow engineers and collaborate via AI-assisted team workspaces.',
      actionLabel: 'Open CHATR',
      secureUrl: safeGenerateSignedUrl(
        'talentxcel-academy',
        'chatr.chat',
        '/',
        'chatr_community',
        'ai_router_intent'
      ),
    })
    destinations.push({
      title: 'Peer Learning Cohort Channels',
      hostname: 'chatrchat.in',
      path: '/',
      description: 'Join real-time study channels for Cloud Native and AI certifications.',
      actionLabel: 'Join Study Group',
      secureUrl: safeGenerateSignedUrl(
        'talentxcel-academy',
        'chatrchat.in',
        '/',
        'chatr_community',
        'ai_router_intent'
      ),
    })
  } else if (primaryBrand === 'nuty-tales') {
    destinations.push({
      title: 'Corporate & Executive Gifting',
      hostname: 'gifting.nutytales.com',
      path: '/',
      description: 'Bespoke corporate gifting boxes featuring certified organic Himalayan dry fruits.',
      actionLabel: 'Explore Gifting Catalogs',
      secureUrl: safeGenerateSignedUrl(
        'talentxcel-academy',
        'gifting.nutytales.com',
        '/',
        'nuty_commerce_sandbox',
        'ai_router_intent'
      ),
    })
    destinations.push({
      title: 'Nuty Tales Artisanal Storefront',
      hostname: 'nutytales.com',
      path: '/',
      description: 'Authentic Kashmiri saffron, walnuts, and traditional artisanal heritage products.',
      actionLabel: 'Visit Nuty Tales',
      secureUrl: safeGenerateSignedUrl(
        'talentxcel-academy',
        'nutytales.com',
        '/',
        'nuty_commerce_sandbox',
        'ai_router_intent'
      ),
    })
  } else {
    destinations.push({
      title: 'Cloud Native AI Engineer Programme',
      hostname: 'talentxcel.net',
      path: '/programmes',
      description: 'Master full-stack AI engineering with hands-on labs and 8 Super AI mentors.',
      actionLabel: 'View Curriculum',
      secureUrl: '/programmes',
    })
    destinations.push({
      title: 'Learner Cockpit & Super AI Mentors',
      hostname: 'talentxcel.net',
      path: '/dashboard',
      description: 'Access live learning labs, capstone code reviews, and proctored examinations.',
      actionLabel: 'Go to Cockpit',
      secureUrl: '/dashboard',
    })
  }

  // If ambiguous, append a destination card for the second candidate brand
  if (isAmbiguous && secondMatch.score > 0) {
    if (secondMatch.brand === 'chatr') {
      destinations.push({
        title: 'Alternative: CHATR Peer Discussions',
        hostname: 'chatr.chat',
        path: '/',
        description: 'Connect with cohort peers and discuss collaborative projects.',
        actionLabel: 'Check CHATR',
        secureUrl: safeGenerateSignedUrl(
          'talentxcel-academy',
          'chatr.chat',
          '/',
          'chatr_community',
          'ai_router_ambiguous'
        ),
      })
    } else if (secondMatch.brand === 'nuty-tales') {
      destinations.push({
        title: 'Alternative: Nuty Tales Storefront',
        hostname: 'nutytales.com',
        path: '/',
        description: 'Explore authentic Himalayan dry fruits and corporate gifting.',
        actionLabel: 'Visit Storefront',
        secureUrl: safeGenerateSignedUrl(
          'talentxcel-academy',
          'nutytales.com',
          '/',
          'nuty_commerce_sandbox',
          'ai_router_ambiguous'
        ),
      })
    }
  }

  const relevantArticles = searchKnowledgeBase(query, primaryBrand)

  return {
    primaryBrand,
    brandName,
    classificationMethod: 'deterministic_heuristic',
    heuristicMatchScore,
    confidence: heuristicMatchScore,
    isAmbiguous,
    ambiguityCandidates,
    isUnrelatedOrAdversarial: false,
    rationale,
    intent,
    recommendedDestinations: destinations,
    relevantArticles: relevantArticles.slice(0, 3),
  }
}
