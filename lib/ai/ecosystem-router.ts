import { ECOSYSTEM_DOMAINS, getDomainRecord } from '@/lib/ecosystem/registry'
import { generateSecureReferralUrl, CrossBrandReferralParams } from '@/lib/ecosystem/referral-engine'
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
  confidence: number
  rationale: string
  intent: 'career_pathway' | 'resume_analysis' | 'academy_enrolment' | 'chatr_community' | 'nuty_commerce_sandbox'
  recommendedDestinations: RecommendedDestination[]
  relevantArticles: EcosystemKnowledgeItem[]
}

const CAREER_KEYWORDS = [
  'job', 'career', 'resume', 'cv', 'salary', 'compensation', 'placement', 'interview',
  'hiring', 'recruiter', 'ats', 'employer', 'ctc', 'pathway', 'promotion', 'internship'
]

const CHATR_KEYWORDS = [
  'chat', 'messaging', 'communication', 'channel', 'peer', 'study group', 'community',
  'discuss', 'discussion', 'forum', 'collaborate', 'team chat', 'bot'
]

const COMMERCE_KEYWORDS = [
  'gift', 'gifting', 'walnut', 'saffron', 'dry fruit', 'artisanal', 'craft',
  'stay', 'travel', 'resort', 'wedding', 'nri', 'heritage', 'luxury gift', 'kashmir'
]

const ACADEMY_KEYWORDS = [
  'course', 'programme', 'learn', 'curriculum', 'lesson', 'quiz', 'pwa', 'exam',
  'code review', 'tutor', 'agent', 'rag', 'cloud native', 'enroll', 'admission'
]

function countKeywordMatches(text: string, keywords: string[]): number {
  const lower = text.toLowerCase()
  return keywords.reduce((count, word) => {
    return lower.includes(word) ? count + 1 : count
  }, 0)
}

export function routeEcosystemIntent(query: string, currentContext?: string): EcosystemRouteResult {
  const combinedText = `${query} ${currentContext || ''}`.toLowerCase()

  const careerScore = countKeywordMatches(combinedText, CAREER_KEYWORDS)
  const chatrScore = countKeywordMatches(combinedText, CHATR_KEYWORDS)
  const commerceScore = countKeywordMatches(combinedText, COMMERCE_KEYWORDS)
  const academyScore = countKeywordMatches(combinedText, ACADEMY_KEYWORDS)

  // Default to academy if equal or low score
  let primaryBrand: 'talentxcel' | 'talentxcel-academy' | 'chatr' | 'nuty-tales' = 'talentxcel-academy'
  let brandName = 'TalentXcel Academy'
  let intent: EcosystemRouteResult['intent'] = 'academy_enrolment'
  let rationale = 'Query aligns with AI engineering learning, course curriculum, and technical skill development.'
  let maxScore = Math.max(careerScore, chatrScore, commerceScore, academyScore)

  if (careerScore > academyScore && careerScore >= chatrScore && careerScore >= commerceScore) {
    primaryBrand = 'talentxcel'
    brandName = 'TalentXcel Career Network'
    intent = combinedText.includes('resume') || combinedText.includes('cv') || combinedText.includes('ats')
      ? 'resume_analysis'
      : 'career_pathway'
    rationale = 'Query relates to career planning, salary intelligence, verified resumes, or job placement.'
  } else if (chatrScore > academyScore && chatrScore >= careerScore && chatrScore >= commerceScore) {
    primaryBrand = 'chatr'
    brandName = 'CHATR AI Collaboration'
    intent = 'chatr_community'
    rationale = 'Query relates to team communication, real-time messaging, or peer study communities.'
  } else if (commerceScore > academyScore && commerceScore >= careerScore && commerceScore >= chatrScore) {
    primaryBrand = 'nuty-tales'
    brandName = 'Nuty Tales Artisanal Commerce'
    intent = 'nuty_commerce_sandbox'
    rationale = 'Query relates to corporate gifting, organic artisanal goods, cultural stays, or heritage commerce.'
  }

  const confidence = Math.min(1.0, 0.4 + (maxScore * 0.15))

  // Build destinations tailored to intent
  const destinations: RecommendedDestination[] = []

  if (primaryBrand === 'talentxcel') {
    if (intent === 'resume_analysis') {
      destinations.push({
        title: 'TalentXcel Verified Resume Builder',
        hostname: 'resume.talentxcel.in',
        path: '/',
        description: 'Format your Academy accomplishments into an ATS-optimized executive resume.',
        actionLabel: 'Launch Resume Engine',
        secureUrl: generateSecureReferralUrl({
          sourceBrand: 'talentxcel-academy',
          destinationHost: 'resume.talentxcel.in',
          userIntent: 'resume_analysis',
          campaign: 'ai_router_intent',
        }),
      })
    } else {
      destinations.push({
        title: 'AI Career Pathways Builder',
        hostname: 'career-pathways-ai-builder.vercel.app',
        path: '/',
        description: 'Map out high-growth tech pathways matched against live employer demand.',
        actionLabel: 'Explore Career Pathways',
        secureUrl: generateSecureReferralUrl({
          sourceBrand: 'talentxcel-academy',
          destinationHost: 'career-pathways-ai-builder.vercel.app',
          userIntent: 'career_pathway',
          campaign: 'ai_router_intent',
        }),
      })
      destinations.push({
        title: 'Salary & Compensation Benchmark',
        hostname: 'salary.talentxcel.in',
        path: '/',
        description: 'Inspect verified percentile compensation for Cloud and AI engineering roles.',
        actionLabel: 'Check Market Salaries',
        secureUrl: generateSecureReferralUrl({
          sourceBrand: 'talentxcel-academy',
          destinationHost: 'salary.talentxcel.in',
          userIntent: 'career_pathway',
          campaign: 'ai_router_intent',
        }),
      })
    }
  } else if (primaryBrand === 'chatr') {
    destinations.push({
      title: 'CHATR AI Collaboration Suite',
      hostname: 'chatr.chat',
      path: '/',
      description: 'Connect with fellow engineers and collaborate via AI-assisted team workspaces.',
      actionLabel: 'Open CHATR',
      secureUrl: generateSecureReferralUrl({
        sourceBrand: 'talentxcel-academy',
        destinationHost: 'chatr.chat',
        userIntent: 'chatr_community',
        campaign: 'ai_router_intent',
      }),
    })
    destinations.push({
      title: 'Peer Learning Cohort Channels',
      hostname: 'chatrchat.in',
      path: '/',
      description: 'Join real-time study channels for Cloud Native and AI certifications.',
      actionLabel: 'Join Study Group',
      secureUrl: generateSecureReferralUrl({
        sourceBrand: 'talentxcel-academy',
        destinationHost: 'chatrchat.in',
        userIntent: 'chatr_community',
        campaign: 'ai_router_intent',
      }),
    })
  } else if (primaryBrand === 'nuty-tales') {
    destinations.push({
      title: 'Corporate & Executive Gifting',
      hostname: 'gifting.nutytales.com',
      path: '/',
      description: 'Bespoke corporate gifting boxes featuring certified organic Himalayan dry fruits.',
      actionLabel: 'Explore Gifting Catalogs',
      secureUrl: generateSecureReferralUrl({
        sourceBrand: 'talentxcel-academy',
        destinationHost: 'gifting.nutytales.com',
        userIntent: 'nuty_commerce_sandbox',
        campaign: 'ai_router_intent',
      }),
    })
    destinations.push({
      title: 'Nuty Tales Artisanal Storefront',
      hostname: 'nutytales.com',
      path: '/',
      description: 'Authentic Kashmiri saffron, walnuts, and traditional artisanal heritage products.',
      actionLabel: 'Visit Nuty Tales',
      secureUrl: generateSecureReferralUrl({
        sourceBrand: 'talentxcel-academy',
        destinationHost: 'nutytales.com',
        userIntent: 'nuty_commerce_sandbox',
        campaign: 'ai_router_intent',
      }),
    })
  } else {
    destinations.push({
      title: 'Cloud Native AI Engineer Programme',
      hostname: 'talentxcel.net',
      path: '/programmes/cloud-native-ai',
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

  // Fetch relevant knowledge items
  const relevantArticles = searchKnowledgeBase(query, primaryBrand)

  return {
    primaryBrand,
    brandName,
    confidence,
    rationale,
    intent,
    recommendedDestinations: destinations,
    relevantArticles: relevantArticles.slice(0, 3),
  }
}
