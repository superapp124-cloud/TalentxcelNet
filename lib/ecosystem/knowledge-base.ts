export type KnowledgeEvidenceStatus =
  | 'verified_live'
  | 'curriculum_roadmap'
  | 'partner_documented'
  | 'unverified'

export type KnowledgeApprovalStatus =
  | 'approved'
  | 'provisional'
  | 'under_review'

export interface EcosystemKnowledgeItem {
  id: string
  title: string
  brandSlug: 'talentxcel' | 'talentxcel-academy' | 'chatr' | 'nuty-tales'
  brandName: string
  summary: string
  content: string
  sourceDomain: string
  publicUrl: string
  owner: string
  evidenceStatus: KnowledgeEvidenceStatus
  lastReviewedAt: string
  approvalStatus: KnowledgeApprovalStatus
  verificationNotes?: string
  disclaimers?: string[]
  tags: string[]
  targetAudience: string[]
  relevantIntents: string[]
}

export const ECOSYSTEM_KNOWLEDGE_INDEX: EcosystemKnowledgeItem[] = [
  // --- TALENTXCEL ACADEMY ---
  {
    id: 'kb-txa-01',
    title: 'Cloud Native AI Engineer Certification Programme',
    brandSlug: 'talentxcel-academy',
    brandName: 'TalentXcel Academy',
    summary: 'A 24-week rigorous curriculum roadmap featuring supervised Super AI mentorship, micro-internships, and real cloud deployment capstones.',
    content: 'TalentXcel Academy provides deep full-stack AI engineering curriculum spanning Next.js, Supabase, LLM orchestration, vector databases, and enterprise architecture. Learners build capstone projects with specialized AI tutor support.',
    sourceDomain: 'talentxcel.net',
    publicUrl: 'https://talentxcel.net/programmes',
    owner: 'Academic Director (Academy)',
    evidenceStatus: 'curriculum_roadmap',
    lastReviewedAt: '2026-10-16T20:00:00Z',
    approvalStatus: 'approved',
    verificationNotes: 'Curriculum structure verified in production codebase; student outcome statistics require ongoing tracking.',
    disclaimers: [
      'Platform-issued milestone certificate; not an accredited statutory university degree or regulated professional qualification.',
      'Programme duration is an estimated curriculum roadmap subject to individual learner pace and cohort scheduling.',
    ],
    tags: ['education', 'ai-engineering', 'certification', 'cloud-native', 'curriculum', 'agents'],
    targetAudience: ['Learners', 'Engineers', 'Career Switchers'],
    relevantIntents: ['academy_enrolment', 'career_pathway'],
  },
  {
    id: 'kb-txa-02',
    title: 'Super AI 8-Agent Mentorship Architecture',
    brandSlug: 'talentxcel-academy',
    brandName: 'TalentXcel Academy',
    summary: 'Specialized agentic AI team providing code review, security audits, personalized tutoring, and career coaching.',
    content: 'The platform integrates 8 dedicated agent personas: Platform Architect, AI Tutor, Code Reviewer, Security Auditor, Debugger, Career Coach, Examiner, and Research Assistant. Agents use Grounded RAG with strict citation thresholds.',
    sourceDomain: 'talentxcel.net',
    publicUrl: 'https://talentxcel.net/dashboard',
    owner: 'Principal AI Architect',
    evidenceStatus: 'verified_live',
    lastReviewedAt: '2026-10-16T20:00:00Z',
    approvalStatus: 'approved',
    verificationNotes: '8 agent personas implemented via prompt templates and RAG pipeline; live in learner drawer.',
    disclaimers: [
      'Grounded RAG incorporates vector cosine thresholds and citation verification, but does not provide an absolute mathematical zero-hallucination guarantee.',
      'AI agents are specialized automated assistants and do not replace licensed professional or statutory advisors.',
    ],
    tags: ['ai-agents', 'rag', 'mentorship', 'security', 'code-review'],
    targetAudience: ['Students', 'Mentors', 'Hiring Managers'],
    relevantIntents: ['academy_enrolment'],
  },
  {
    id: 'kb-txa-03',
    title: 'Offline-First PWA and Local Learning Architecture',
    brandSlug: 'talentxcel-academy',
    brandName: 'TalentXcel Academy',
    summary: 'Progressive Web App with full IndexedDB offline caching, allowing uninterrupted learning and quiz completion without internet.',
    content: 'Engineered for bandwidth-constrained environments, TalentXcel Academy stores lesson progress, interactive quizzes, and course notes locally. Changes sync automatically to Supabase when connectivity resumes.',
    sourceDomain: 'talentxcel.net',
    publicUrl: 'https://talentxcel.net',
    owner: 'Lead Frontend Engineer',
    evidenceStatus: 'verified_live',
    lastReviewedAt: '2026-10-16T20:00:00Z',
    approvalStatus: 'approved',
    verificationNotes: 'IndexedDB store and Service Worker caching verified with unit tests and Cypress/Playwright runs.',
    disclaimers: [
      'Offline capabilities require browser support for IndexedDB and CacheStorage APIs.',
    ],
    tags: ['pwa', 'offline-first', 'indexeddb', 'accessibility'],
    targetAudience: ['Learners', 'Global Students'],
    relevantIntents: ['academy_enrolment'],
  },

  // --- TALENTXCEL CAREER NETWORK ---
  {
    id: 'kb-tx-01',
    title: 'TalentXcel AI Career Pathways Builder',
    brandSlug: 'talentxcel',
    brandName: 'TalentXcel',
    summary: 'Interactive roadmap generator evaluating current skills against live hiring market demand.',
    content: 'Analyzes user resume data, identifies skill gaps for high-growth tech positions (such as AI Architect, ML Ops, and Cloud Solutions), and recommends tailored learning pathways and academy courses.',
    sourceDomain: 'career-pathways-ai-builder.vercel.app',
    publicUrl: 'https://career-pathways-ai-builder.vercel.app',
    owner: 'Careers Product Lead',
    evidenceStatus: 'verified_live',
    lastReviewedAt: '2026-10-16T20:00:00Z',
    approvalStatus: 'approved',
    verificationNotes: 'Sandbox deployment verified on Vercel at career-pathways-ai-builder.vercel.app.',
    disclaimers: [
      'Skill gap recommendations and career trajectories are indicative guidance and do not guarantee corporate hiring.',
    ],
    tags: ['careers', 'ai-pathway', 'skills-gap', 'career-growth', 'jobs'],
    targetAudience: ['Job Seekers', 'Graduates', 'Working Professionals'],
    relevantIntents: ['career_pathway'],
  },
  {
    id: 'kb-tx-02',
    title: 'TalentXcel Verified Resume Engine',
    brandSlug: 'talentxcel',
    brandName: 'TalentXcel',
    summary: 'ATS-optimized resume generator with cryptographic proof of completed coursework and verified credentials.',
    content: 'TalentXcel Resume crafts high-impact resumes tailored to corporate applicant tracking systems (ATS), embedding verified links to Academy capstones and TalentXcel Passport credentials.',
    sourceDomain: 'resume.talentxcel.in',
    publicUrl: 'https://resume.talentxcel.in',
    owner: 'Resume Product Engineering',
    evidenceStatus: 'partner_documented',
    lastReviewedAt: '2026-10-16T20:00:00Z',
    approvalStatus: 'approved',
    verificationNotes: 'Verified DNS resolution and active TLS certificate.',
    disclaimers: [
      'ATS compatibility scoring is based on standard parsing heuristics and does not guarantee interview shortlisting by third-party recruiters.',
    ],
    tags: ['resume', 'ats-optimization', 'credentials', 'hiring'],
    targetAudience: ['Job Seekers', 'Alumni'],
    relevantIntents: ['resume_analysis', 'career_pathway'],
  },
  {
    id: 'kb-tx-03',
    title: 'TalentXcel Salary Intelligence & Compensation Benchmarks',
    brandSlug: 'talentxcel',
    brandName: 'TalentXcel',
    summary: 'Percentile compensation data across tech roles, experience bands, and geographical regions.',
    content: 'Helps students and professionals evaluate competitive salaries with transparent salary ranges, variable pay breakdowns, and equity benchmark data across early-stage startups and tech firms.',
    sourceDomain: 'salary.talentxcel.in',
    publicUrl: 'https://salary.talentxcel.in',
    owner: 'Data Analytics Lead',
    evidenceStatus: 'partner_documented',
    lastReviewedAt: '2026-10-16T20:00:00Z',
    approvalStatus: 'approved',
    verificationNotes: 'Active sub-domain on talentxcel.in network.',
    disclaimers: [
      'Salary benchmarks represent aggregated industry estimates and do not represent formal offers or wage guarantees.',
    ],
    tags: ['salary', 'compensation', 'benchmarks', 'negotiation', 'insights'],
    targetAudience: ['Job Seekers', 'Employees', 'HR Teams'],
    relevantIntents: ['career_pathway'],
  },
  {
    id: 'kb-tx-04',
    title: 'TalentXcel Passport & Credential Verification',
    brandSlug: 'talentxcel',
    brandName: 'TalentXcel',
    summary: 'Verifiable digital skill credentials and micro-internship certificates for hiring partners.',
    content: 'TalentXcel Passport provides employers instant one-click cryptographic verification of candidate achievements, code repository quality, and proctored exam scores.',
    sourceDomain: 'passport.talentxcel.in',
    publicUrl: 'https://passport.talentxcel.in',
    owner: 'Credential Security Architect',
    evidenceStatus: 'partner_documented',
    lastReviewedAt: '2026-10-16T20:00:00Z',
    approvalStatus: 'approved',
    verificationNotes: 'Credential verification portal active for partner verification.',
    disclaimers: [
      'Verifies completion of Academy modules; does not replace employer background checks or statutory license checks.',
    ],
    tags: ['credentials', 'verification', 'certificates', 'talent-passport'],
    targetAudience: ['Employers', 'Graduates', 'Recruiters'],
    relevantIntents: ['career_pathway', 'resume_analysis'],
  },
  {
    id: 'kb-tx-05',
    title: 'TalentXcel Employer Talent Exchange',
    brandSlug: 'talentxcel',
    brandName: 'TalentXcel',
    summary: 'Direct hiring network matching enterprise tech companies with pre-vetted AI engineers and full-stack developers.',
    content: 'Employers post open requisitions, review candidate portfolios with verified capstone projects, and conduct streamlined interviews through the TalentXcel recruiter portal.',
    sourceDomain: 'employers.talentxcel.in',
    publicUrl: 'https://employers.talentxcel.in',
    owner: 'Talent Partnerships Lead',
    evidenceStatus: 'partner_documented',
    lastReviewedAt: '2026-10-16T20:00:00Z',
    approvalStatus: 'approved',
    verificationNotes: 'Enterprise employer portal active on network.',
    disclaimers: [
      'Candidate hiring and compensation terms are agreed directly between employers and candidates.',
    ],
    tags: ['employers', 'hiring', 'recruitment', 'talent-acquisition'],
    targetAudience: ['Corporate Recruiters', 'Hiring Managers'],
    relevantIntents: ['career_pathway'],
  },

  // --- CHATR ---
  {
    id: 'kb-chatr-01',
    title: 'CHATR Intelligent Collaboration Platform',
    brandSlug: 'chatr',
    brandName: 'CHATR',
    summary: 'Real-time messaging, multi-agent AI workspaces, and encrypted communications for modern tech teams.',
    content: 'CHATR connects learners, mentors, and developer teams with high-performance real-time messaging, audio/video channels, and AI workflow co-pilots.',
    sourceDomain: 'chatr.chat',
    publicUrl: 'https://chatr.chat',
    owner: 'CHATR Systems Lead',
    evidenceStatus: 'partner_documented',
    lastReviewedAt: '2026-10-16T20:00:00Z',
    approvalStatus: 'approved',
    verificationNotes: 'Independent production messaging platform on chatr.chat.',
    disclaimers: [
      'Operated under independent infrastructure; accounts and community rules governed by CHATR terms of service.',
    ],
    tags: ['messaging', 'collaboration', 'chat', 'enterprise-ai', 'communities'],
    targetAudience: ['Developers', 'Learners', 'Remote Teams'],
    relevantIntents: ['chatr_community'],
  },
  {
    id: 'kb-chatr-02',
    title: 'CHATR Developer Community Hub',
    brandSlug: 'chatr',
    brandName: 'CHATR',
    summary: 'Open cohort discussion channels, hackathon forums, and peer-to-peer coding study groups.',
    content: 'Learners can participate in live peer debugging sessions, study groups for Cloud AI certifications, and collaborate on open-source projects.',
    sourceDomain: 'chatrchat.in',
    publicUrl: 'https://chatrchat.in',
    owner: 'Community Operations',
    evidenceStatus: 'partner_documented',
    lastReviewedAt: '2026-10-16T20:00:00Z',
    approvalStatus: 'approved',
    verificationNotes: 'Domestic Indian community deployment.',
    disclaimers: [
      'Community forums are peer-moderated; technical advice given by community members is not official platform curriculum.',
    ],
    tags: ['community', 'peer-learning', 'hackathons', 'forums'],
    targetAudience: ['Students', 'Hackathon Participants', 'Mentors'],
    relevantIntents: ['chatr_community'],
  },

  // --- NUTY TALES ---
  {
    id: 'kb-nuty-01',
    title: 'Nuty Tales Artisanal Commerce Cloud',
    brandSlug: 'nuty-tales',
    brandName: 'Nuty Tales',
    summary: 'Direct-to-consumer digital marketplace for authentic Himalayan walnuts, saffron, organic dry fruits, and handcrafted arts.',
    content: 'Nuty Tales bridges traditional artisans and organic orchards directly with global consumers through transparent sourcing, quality certification, and digital commerce enablement.',
    sourceDomain: 'nutytales.com',
    publicUrl: 'https://nutytales.com',
    owner: 'Commerce Operations Lead',
    evidenceStatus: 'partner_documented',
    lastReviewedAt: '2026-10-16T20:00:00Z',
    approvalStatus: 'approved',
    verificationNotes: 'Active production e-commerce platform on nutytales.com.',
    disclaimers: [
      'Product batches and organic certifications are subject to seasonal harvest availability and regional agricultural inspection.',
    ],
    tags: ['commerce', 'artisanal', 'dry-fruits', 'organic', 'heritage', 'crafts'],
    targetAudience: ['Consumers', 'Connoisseurs', 'Corporate Buyers'],
    relevantIntents: ['nuty_commerce_sandbox'],
  },
  {
    id: 'kb-nuty-02',
    title: 'Nuty Tales Corporate & Festive Gifting',
    brandSlug: 'nuty-tales',
    brandName: 'Nuty Tales',
    summary: 'Customized luxury corporate gifting solutions featuring premium dry fruits, saffron gift boxes, and handwoven craft keepsakes.',
    content: 'Offers enterprises bulk customization, branded packaging, tax-compliant invoicing, and pan-India & global delivery for festive, executive, and milestone celebrations.',
    sourceDomain: 'gifting.nutytales.com',
    publicUrl: 'https://gifting.nutytales.com',
    owner: 'B2B Gifting Director',
    evidenceStatus: 'partner_documented',
    lastReviewedAt: '2026-10-16T20:00:00Z',
    approvalStatus: 'approved',
    verificationNotes: 'B2B subdomain active on nutytales.com network.',
    disclaimers: [
      'Bulk delivery lead times and custom packaging subject to minimum order quantities (MOQ).',
    ],
    tags: ['corporate-gifting', 'luxury', 'dry-fruits', 'bespoke-packaging'],
    targetAudience: ['Corporate HR', 'Enterprise Procurement', 'Founders'],
    relevantIntents: ['nuty_commerce_sandbox'],
  },
  {
    id: 'kb-nuty-03',
    title: 'Nuty Tales Heritage Stays and Craft Immersion Trails',
    brandSlug: 'nuty-tales',
    brandName: 'Nuty Tales',
    summary: 'Eco-resorts, artisan homestays, and guided heritage trails connecting travelers with master craftsmen.',
    content: 'Experience authentic Kashmiri hospitality and culture through curated craft trails, walnut orchard stays, and hands-on masterclasses in paper-mâché, pashmina weaving, and wood carving.',
    sourceDomain: 'stays.nutytales.com',
    publicUrl: 'https://stays.nutytales.com',
    owner: 'Hospitality Ops Lead',
    evidenceStatus: 'partner_documented',
    lastReviewedAt: '2026-10-16T20:00:00Z',
    approvalStatus: 'approved',
    verificationNotes: 'Hospitality booking engine on stays.nutytales.com.',
    disclaimers: [
      'Stay reservations and guided trail itineraries are subject to seasonal weather conditions and local hospitality terms.',
    ],
    tags: ['travel', 'heritage-stays', 'eco-tourism', 'cultural-trails'],
    targetAudience: ['Travelers', 'Eco-Tourists', 'Culture Enthusiasts'],
    relevantIntents: ['nuty_commerce_sandbox'],
  },
]

export function searchKnowledgeBase(query: string, filterBrand?: string): EcosystemKnowledgeItem[] {
  const q = query.toLowerCase().trim()
  if (!q && !filterBrand) return ECOSYSTEM_KNOWLEDGE_INDEX

  return ECOSYSTEM_KNOWLEDGE_INDEX.filter((item) => {
    if (filterBrand && item.brandSlug !== filterBrand) return false
    if (!q) return true

    return (
      item.title.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q) ||
      item.content.toLowerCase().includes(q) ||
      item.tags.some((t) => t.toLowerCase().includes(q)) ||
      item.targetAudience.some((a) => a.toLowerCase().includes(q))
    )
  })
}

export function getKnowledgeItemById(id: string): EcosystemKnowledgeItem | undefined {
  return ECOSYSTEM_KNOWLEDGE_INDEX.find((item) => item.id === id)
}

export function getKnowledgeByIntent(intent: string): EcosystemKnowledgeItem[] {
  return ECOSYSTEM_KNOWLEDGE_INDEX.filter((item) =>
    item.relevantIntents.includes(intent)
  )
}
