import { PROGRAMME_UNIVERSE, ProgrammeFamily, getProgrammeBySlug } from '@/lib/lms/programme-universe'

export interface LearningStageRoadmapItem {
  stageNumber: number
  stageName: 'LEARN' | 'PRACTISE' | 'BUILD' | 'GET FEEDBACK' | 'SHOWCASE & GROW'
  title: string
  detail: string
  deliverable: string
  estimatedDuration: string
  icon: string
}

export interface AmbitionNavigationResult {
  query: string
  targetAmbition: string
  matchedProgramme: ProgrammeFamily
  confidenceScore: number
  superAiMessage: string
  personalizedRoadmap: LearningStageRoadmapItem[]
  firstGuidedProject: {
    title: string
    description: string
    deliverable: string
    workspaceHref: string
  }
  missingFoundations: string[]
  immediateNextAction: {
    label: string
    href: string
    actionType: 'workspace' | 'syllabus' | 'apply'
  }
  relevantEcosystemTools: Array<{
    brand: 'talentxcel' | 'chatr' | 'nuty-tales'
    title: string
    url: string
    description: string
  }>
}

/** Intent detection patterns for the 20-family catalogue */
const INTENT_RULES: Array<{
  keywords: string[]
  slug: string
  headline: string
  aiSummary: string
}> = [
  {
    keywords: ['ai', 'developer', 'python', 'rag', 'agent', 'machine learning', 'artificial intelligence', 'automation', 'llm', 'coding'],
    slug: 'ai-development',
    headline: 'AI Software Developer & Automation Engineer',
    aiSummary:
      'Super AI has mapped your ambition to our Flagship AI Development and Automation Programme. You will learn Python concurrency, pgvector semantic retrieval, and build autonomous agents verified by safe sandbox tests.',
  },
  {
    keywords: ['neet', 'doctor', 'medical', 'mbbs', 'biology', 'botany', 'zoology', 'neet-ug'],
    slug: 'class-11-neet-jee',
    headline: 'Medical Competitive Entrance (NEET-UG)',
    aiSummary:
      'Super AI has identified your goal to clear NEET-UG. Your path begins with comprehensive NCERT-aligned vector mechanics, organic chemistry reaction mechanisms, and timed negative-marking CBT diagnostic simulations.',
  },
  {
    keywords: ['jee', 'iit', 'engineering entrance', 'jee main', 'jee advanced', 'calculus'],
    slug: 'class-11-neet-jee',
    headline: 'Engineering Competitive Entrance (JEE Main / Advanced)',
    aiSummary:
      'Super AI has identified your goal for IIT / NIT entrance. We structure your journey around classical mechanics, coordinate geometry, calculus, and high-velocity problem solving under exam pressures.',
  },
  {
    keywords: ['class 9', 'class 8', 'school', 'foundation', '8th to 9th', 'cbse 9', 'ninth grade'],
    slug: 'class-9-foundation',
    headline: 'Class 9 STEM & Analytical Foundation',
    aiSummary:
      'Super AI recommends our 8-month Class 9 Foundation Programme. It bridges middle school with high school rigor across Physics, Chemistry, Mathematics, and competitive reasoning.',
  },
  {
    keywords: ['class 10', 'board', '10th', 'matric', 'cbse 10', 'tenth'],
    slug: 'class-10-advanced',
    headline: 'Class 10 Board Distinction & Early Entrances',
    aiSummary:
      'Super AI has mapped your goal to Class 10 Advanced Preparation. We focus on 100% board accuracy, chapter drills, and early competitive foundations.',
  },
  {
    keywords: ['healthcare', 'hospital', 'his', 'health tech', 'health informatics', 'emr', 'fhir', 'medical records'],
    slug: 'healthcare-tech',
    headline: 'Digital Health Informatics & Hospital Technology',
    aiSummary:
      'Super AI recommends Healthcare Technology and Administration. You will master Hospital Information Systems (HIS), EMR/EHR workflows, and HL7 FHIR standards for national digital health networks.',
  },
  {
    keywords: ['business', 'start a business', 'startup', 'entrepreneur', 'e-commerce', 'ecommerce', 'selling', 'online store'],
    slug: 'entrepreneurship-digital-business',
    headline: 'Digital Business & Startup Creation',
    aiSummary:
      'Super AI has identified your entrepreneurial ambition. We guide you from problem validation to setting up digital operations, payments, and customer acquisition funnels.',
  },
  {
    keywords: ['civil services', 'ias', 'upsc', 'kas', 'ips', 'collector', 'governance', 'current affairs'],
    slug: 'civil-services-ias',
    headline: 'Civil Services (IAS / State Administrative Services)',
    aiSummary:
      'Super AI has structured your Civil Services roadmap. We emphasize constitutional governance, economic development analysis, and daily evaluated mains answer-writing drills.',
  },
  {
    keywords: ['law', 'clat', 'lawyer', 'advocate', 'legal', 'judiciary', 'ailet'],
    slug: 'law-entrance-legal',
    headline: 'Law Entrance (CLAT / Legal Studies)',
    aiSummary:
      'Super AI has mapped your goal to Law Entrance and Legal Studies. You will build rapid passage dissection skills and critical deductive legal reasoning.',
  },
  {
    keywords: ['government exam', 'ssc', 'jkssb', 'state exam', 'police exam', 'banking', 'ibps', 'clerk'],
    slug: 'state-selection-government-exams',
    headline: 'State SSB & Government Recruitment Examinations',
    aiSummary:
      'Super AI has configured your path for State Selection Boards and Government Examinations with configurable regional syllabus modules and speed arithmetic.',
  },
  {
    keywords: ['data', 'data science', 'analytics', 'tableau', 'bi', 'statistics', 'sql'],
    slug: 'data-science-analytics',
    headline: 'Data Science, SQL & Analytics',
    aiSummary:
      'Super AI has mapped your goal to Data Science and Analytics. You will write advanced SQL queries, clean datasets with Pandas, and construct executive business dashboards.',
  },
  {
    keywords: ['web', 'web development', 'frontend', 'backend', 'full stack', 'react', 'next.js', 'javascript', 'website'],
    slug: 'web-development-product-engineering',
    headline: 'Full-Stack Web & Product Engineering',
    aiSummary:
      'Super AI has routed your ambition to Web Development and Product Engineering. You will build modern React/Next.js interfaces, secure serverless APIs, and deploy production web products.',
  },
  {
    keywords: ['cloud', 'devops', 'cybersecurity', 'docker', 'kubernetes', 'aws', 'linux', 'security'],
    slug: 'cloud-devops-cybersecurity',
    headline: 'Cloud Architecture, DevOps & Cybersecurity',
    aiSummary:
      'Super AI has targeted Cloud, DevOps and Cybersecurity. You will provision infrastructure with Terraform, orchestrate containers in Kubernetes, and audit defensive systems.',
  },
  {
    keywords: ['marketing', 'seo', 'ads', 'google ads', 'social media', 'traffic', 'brand'],
    slug: 'digital-marketing-seo',
    headline: 'Digital Marketing, SEO & Performance Growth',
    aiSummary:
      'Super AI has routed your goal to Digital Marketing and SEO. Master search ranking algorithms, conversion funnels, and performance marketing campaigns.',
  },
  {
    keywords: ['finance', 'accounting', 'spreadsheet', 'excel', 'valuation', 'financial model'],
    slug: 'finance-business-operations',
    headline: 'Financial Modeling & Business Operations',
    aiSummary:
      'Super AI has configured Finance and Business Operations. Build dynamic three-statement models, analyze corporate P&L, and master business spreadsheets.',
  },
  {
    keywords: ['hr', 'recruitment', 'talent', 'hiring', 'recruiter', 'sourcing'],
    slug: 'hr-recruitment-technology',
    headline: 'HR & Modern Recruitment Technology',
    aiSummary:
      'Super AI has routed your interest to HR and Recruitment Technology. Learn talent pipeline architecture, Boolean sourcing, and modern Applicant Tracking Systems.',
  },
  {
    keywords: ['english', 'speak english', 'interview', 'resume', 'communication', 'soft skills', 'fluency'],
    slug: 'communication-employability',
    headline: 'Professional Communication & Interview Mastery',
    aiSummary:
      'Super AI has targeted Communication and Employability. Practice executive spoken English, build an ATS-scoring resume, and master behavioral interview techniques.',
  },
  {
    keywords: ['agriculture', 'farming', 'agritech', 'horticulture', 'orchard', 'apple', 'saffron', 'cold chain'],
    slug: 'agriculture-agritech',
    headline: 'Smart Agriculture & AgriTech Systems',
    aiSummary:
      'Super AI has connected you to Agriculture and AgriTech. Discover precision soil moisture sensing, controlled atmosphere cold-storage, and digital supply chain integrity.',
  },
  {
    keywords: ['freelance', 'freelancing', 'clients', 'remote work', 'upwork', 'gig'],
    slug: 'entrepreneurship-freelancing',
    headline: 'Freelancing & Independent Client Acquisition',
    aiSummary:
      'Super AI has structured your Freelancing path. Convert your marketable abilities into high-ticket client proposals and sustainable remote contracts.',
  },
  {
    keywords: ['computer basics', 'digital beginner', 'learn computer', 'digital literacy', 'start computer'],
    slug: 'digital-foundations-career-acceleration',
    headline: 'Digital Foundations & Everyday Productivity',
    aiSummary:
      'Super AI has selected Digital Foundations and Career Acceleration. Build absolute digital confidence from typing to cloud navigation and safe everyday AI usage.',
  },
]

/**
 * Resolves a natural-language ambition query into a structured 5-stage personalized journey.
 */
export function resolveAmbitionQuery(rawQuery: string): AmbitionNavigationResult {
  const query = (rawQuery || '').trim().toLowerCase()

  // Match intent rules
  let bestMatch = INTENT_RULES[0]
  let maxScore = 0

  for (const rule of INTENT_RULES) {
    let score = 0
    for (const kw of rule.keywords) {
      if (query.includes(kw)) {
        score += kw.length > 4 ? 3 : 2
      }
    }
    if (score > maxScore) {
      maxScore = score
      bestMatch = rule
    }
  }

  // Retrieve programme details
  const programme = getProgrammeBySlug(bestMatch.slug) || PROGRAMME_UNIVERSE[7] // fallback to AI Dev
  const confidenceScore = maxScore > 0 ? Math.min(0.98, 0.65 + maxScore * 0.05) : 0.6

  // Formulate 5-Stage personalized roadmap
  const roadmap: LearningStageRoadmapItem[] = [
    {
      stageNumber: 1,
      stageName: 'LEARN',
      title: `Curriculum Foundations in ${programme.shortTitle}`,
      detail: `Master core theoretical principles and architectural patterns through grounded lessons guided by your Socratic Super AI tutor.`,
      deliverable: `${programme.coreModules.length} comprehensive modules completed with milestone conceptual reviews.`,
      estimatedDuration: `${Math.round(programme.durationMonths * 0.3)} months`,
      icon: 'BookOpen',
    },
    {
      stageNumber: 2,
      stageName: 'PRACTISE',
      title: 'Interactive Diagnostics & Knowledge Checks',
      detail: 'Solve adaptive practice problem sets. Receive progressive hint disclosures without giving away final answers.',
      deliverable: '100% verified competency criteria in prerequisite living skill graph nodes.',
      estimatedDuration: `${Math.round(programme.durationMonths * 0.2)} months`,
      icon: 'CheckCircle2',
    },
    {
      stageNumber: 3,
      stageName: 'BUILD',
      title: `Hands-on Project: ${programme.handsOnProjects[0]?.title || 'Cap-stone Implementation'}`,
      detail: programme.handsOnProjects[0]?.description || 'Build and deploy a real application in an isolated sandbox.',
      deliverable: programme.handsOnProjects[0]?.deliverable || 'Working repository tested with automated sandboxed evaluation.',
      estimatedDuration: `${Math.round(programme.durationMonths * 0.3)} months`,
      icon: 'Code2',
    },
    {
      stageNumber: 4,
      stageName: 'GET FEEDBACK',
      title: 'Multi-Dimensional Rubric Scoring & Mentor Review',
      detail: 'Receive objective 4-dimension scoring (Architecture, Security, Test Coverage, Code Quality) and mentor escalation when needed.',
      deliverable: 'Formal rubric feedback report and immutable versioned commit history.',
      estimatedDuration: `${Math.round(programme.durationMonths * 0.1)} months`,
      icon: 'TrendingUp',
    },
    {
      stageNumber: 5,
      stageName: 'SHOWCASE & GROW',
      title: 'Living Skill Graph Verification & Real-World Opportunities',
      detail: 'Add demonstrated competency to your cryptographic digital portfolio and unlock verified career, community, or business pathways.',
      deliverable: 'Platform-verified digital badge and direct referral to industry ecosystem partners.',
      estimatedDuration: `${Math.round(programme.durationMonths * 0.1)} months`,
      icon: 'Award',
    },
  ]

  // First project workspace target
  const firstProject = {
    title: programme.handsOnProjects[0]?.title || 'Flagship Capstone Project',
    description: programme.handsOnProjects[0]?.description || 'Guided practical implementation.',
    deliverable: programme.handsOnProjects[0]?.deliverable || 'Verified code artifact.',
    workspaceHref: programme.slug === 'ai-development' ? '/projects/rag-engine' : `/programmes/${programme.slug}`,
  }

  // Next action logic
  const immediateNextAction = programme.isApprovedForEnrolment
    ? {
        label: `Start ${programme.shortTitle} Workspace →`,
        href: programme.slug === 'ai-development' ? '/projects/rag-engine' : `/programmes/${programme.slug}`,
        actionType: 'workspace' as const,
      }
    : {
        label: `Review ${programme.shortTitle} Syllabus →`,
        href: `/programmes/${programme.slug}`,
        actionType: 'syllabus' as const,
      }

  // Ecosystem integrations
  const ecosystemTools: AmbitionNavigationResult['relevantEcosystemTools'] = []

  if (programme.category === 'technology' || programme.category === 'healthcare_business') {
    ecosystemTools.push({
      brand: 'talentxcel',
      title: 'TalentXcel Verified Career Network',
      url: 'https://careers.talentxcel.in',
      description: 'Connect with verified hiring employers using your demonstrated skill graph evidence.',
    })
  }

  ecosystemTools.push({
    brand: 'chatr',
    title: `CHATR ${programme.shortTitle} Cohort Channel`,
    url: 'https://chatrchat.in',
    description: 'Join real-time peer discussion channels and collaborative study sessions with cohort learners.',
  })

  if (programme.slug.includes('business') || programme.slug.includes('agritech') || programme.slug.includes('freelancing')) {
    ecosystemTools.push({
      brand: 'nuty-tales',
      title: 'Nuty Tales Commerce & Supply Sandbox',
      url: 'https://nutytales.com',
      description: 'Experiment with genuine e-commerce inventory, artisan craft logistics, and cold-chain distribution.',
    })
  }

  return {
    query: rawQuery,
    targetAmbition: bestMatch.headline,
    matchedProgramme: programme,
    confidenceScore,
    superAiMessage: bestMatch.aiSummary,
    personalizedRoadmap: roadmap,
    firstGuidedProject: firstProject,
    missingFoundations: programme.prerequisites,
    immediateNextAction,
    relevantEcosystemTools: ecosystemTools,
  }
}
