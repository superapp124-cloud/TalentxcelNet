/**
 * Living Skill Graph Service
 * Data-driven skill intelligence system with prerequisite DAGs,
 * competency states, and assessment-backed verification.
 */

export type CompetencyStatus = 'not_started' | 'learning' | 'demonstrated' | 'verified'

export interface SkillNode {
  id: string
  title: string
  category: 'Foundation' | 'Data Systems' | 'AI & LLMs' | 'Supervised Systems' | 'Production & CI/CD'
  tier: 1 | 2 | 3 | 4
  description: string
  prerequisites: string[] // Array of skill IDs
  status: CompetencyStatus
  modules: string[]
  projects: string[]
  verificationCriteria: {
    quizRequirement: string
    projectRequirement: string
    minPassingScore: number
  }
  evidence?: {
    quizScore?: number
    testsPassed?: number
    totalTests?: number
    rubricScore?: number
    verifiedAt?: string
    credentialNumber?: string
  }
  nextRecommendedStep: string
}

export const AI_DEVELOPMENT_SKILL_GRAPH: SkillNode[] = [
  {
    id: 'skill-py-arch',
    title: 'Clean Architecture & Python Boundaries',
    category: 'Foundation',
    tier: 1,
    description: 'Separation of concerns, asynchronous runtimes, type safety with typing/mypy, and secure client-server boundaries.',
    prerequisites: [],
    status: 'verified',
    modules: ['Module 1: Foundations of Modern Software & Python'],
    projects: ['Architectural Boundary Scaffold'],
    verificationCriteria: {
      quizRequirement: 'Module 1 Knowledge Check',
      projectRequirement: 'Clean boundary unit test suite with 100% assertion pass',
      minPassingScore: 80,
    },
    evidence: {
      quizScore: 100,
      testsPassed: 8,
      totalTests: 8,
      rubricScore: 95,
      verifiedAt: '2026-10-10',
      credentialNumber: 'TXCERT-2026-DEMO01',
    },
    nextRecommendedStep: 'Prerequisites fulfilled. Ready for advanced vector indexing.',
  },
  {
    id: 'skill-rel-rls',
    title: 'PostgreSQL Relational Modeling & RLS',
    category: 'Data Systems',
    tier: 1,
    description: 'Relational database schema design, migration management, and Row Level Security isolation policies for multi-tenant SaaS.',
    prerequisites: ['skill-py-arch'],
    status: 'verified',
    modules: ['Module 1: Foundations of Modern Software & Python'],
    projects: ['Multi-Tenant RLS Policy Harness'],
    verificationCriteria: {
      quizRequirement: 'RLS & Database Security Assessment',
      projectRequirement: 'Automated tenant leakage penetration test suite',
      minPassingScore: 80,
    },
    evidence: {
      quizScore: 90,
      testsPassed: 6,
      totalTests: 6,
      rubricScore: 92,
      verifiedAt: '2026-10-12',
      credentialNumber: 'TXCERT-2026-DEMO01',
    },
    nextRecommendedStep: 'Row level security certified. Proceed to pgvector index optimization.',
  },
  {
    id: 'skill-vec-emb',
    title: 'High-Dimensional Vector Embeddings',
    category: 'AI & LLMs',
    tier: 2,
    description: 'Chunking strategies, tokenization, cosine similarity metrics, and semantic embedding generation.',
    prerequisites: ['skill-py-arch'],
    status: 'demonstrated',
    modules: ['Module 2: Practical AI Development & RAG Systems'],
    projects: ['Enterprise Grounded Knowledge Retrieval Engine'],
    verificationCriteria: {
      quizRequirement: 'Vector Search & Embeddings Quiz',
      projectRequirement: 'Chunk overlap and similarity threshold validation test',
      minPassingScore: 75,
    },
    evidence: {
      quizScore: 85,
      testsPassed: 5,
      totalTests: 5,
      rubricScore: 88,
    },
    nextRecommendedStep: 'Pass capstone rubric evaluation to achieve verified credential status.',
  },
  {
    id: 'skill-pg-vector',
    title: 'PostgreSQL pgvector Optimization',
    category: 'Data Systems',
    tier: 2,
    description: 'HNSW and IVFFlat index tuning, distance operators (<=>, <#>, <+>), and query latency benchmarking (<150ms).',
    prerequisites: ['skill-rel-rls', 'skill-vec-emb'],
    status: 'learning',
    modules: ['Module 2: Practical AI Development & RAG Systems'],
    projects: ['Enterprise Grounded Knowledge Retrieval Engine'],
    verificationCriteria: {
      quizRequirement: 'pgvector Index Diagnostics',
      projectRequirement: 'Latency benchmark test suite with HNSW index configuration',
      minPassingScore: 80,
    },
    evidence: {
      quizScore: 65,
      testsPassed: 3,
      totalTests: 5,
    },
    nextRecommendedStep: 'Review Lesson 2.1 on HNSW parameters to bridge diagnostic quiz gap.',
  },
  {
    id: 'skill-rag-pipe',
    title: 'Multi-Tenant RAG Pipelines',
    category: 'AI & LLMs',
    tier: 3,
    description: 'Context retrieval, grounding with citation injection, hallucination suppression, and evaluation against ground truth.',
    prerequisites: ['skill-pg-vector'],
    status: 'learning',
    modules: ['Module 2: Practical AI Development & RAG Systems'],
    projects: ['Enterprise Grounded Knowledge Retrieval Engine'],
    verificationCriteria: {
      quizRequirement: 'RAG Architecture & Grounding Quiz',
      projectRequirement: 'Full end-to-end question answering pipeline with citation verification',
      minPassingScore: 80,
    },
    evidence: {
      quizScore: 70,
      testsPassed: 2,
      totalTests: 4,
    },
    nextRecommendedStep: 'Complete Task 4 of the Enterprise RAG project to verify security filter.',
  },
  {
    id: 'skill-sup-agents',
    title: 'Supervised AI Agents & Bounded Loops',
    category: 'Supervised Systems',
    tier: 3,
    description: 'Tool-calling agents with strict Zod schema validation, bounded loop budgets, and human supervisor escalation.',
    prerequisites: ['skill-rag-pipe'],
    status: 'not_started',
    modules: ['Module 2.2: Building Supervised Tool-Calling AI Agents'],
    projects: ['Autonomous Customer Support Dispatcher'],
    verificationCriteria: {
      quizRequirement: 'Agent Security & Bounded Execution Quiz',
      projectRequirement: 'Safe execution loop test with simulated runaways rejected by guardrail',
      minPassingScore: 85,
    },
    nextRecommendedStep: 'Unlock by completing pgvector and RAG pipeline verifications.',
  },
  {
    id: 'skill-prod-cicd',
    title: 'Production Containerization & Automated CI/CD',
    category: 'Production & CI/CD',
    tier: 4,
    description: 'Docker multi-stage builds, GitHub Actions pipeline automation, zero-downtime deployment, and Playwright E2E verification.',
    prerequisites: ['skill-sup-agents'],
    status: 'not_started',
    modules: ['Module 5: Capstone Project & Production Deployment'],
    projects: ['Production AI Platform Deployment'],
    verificationCriteria: {
      quizRequirement: 'Production Reliability & Security Audit',
      projectRequirement: 'End-to-end automated CI/CD workflow pass with zero lint or security warnings',
      minPassingScore: 90,
    },
    nextRecommendedStep: 'Final programme capstone milestone.',
  },
]

export const PROGRAMME_SKILL_GRAPHS: Record<string, SkillNode[]> = {
  'ai-development': AI_DEVELOPMENT_SKILL_GRAPH,
}

export function getSkillGraph(programmeSlug = 'ai-development'): SkillNode[] {
  return PROGRAMME_SKILL_GRAPHS[programmeSlug] ?? AI_DEVELOPMENT_SKILL_GRAPH
}

export function calculateGraphMetrics(skills: SkillNode[]) {
  const total = skills.length
  const verified = skills.filter((s) => s.status === 'verified').length
  const demonstrated = skills.filter((s) => s.status === 'demonstrated').length
  const learning = skills.filter((s) => s.status === 'learning').length
  const notStarted = skills.filter((s) => s.status === 'not_started').length

  const masteryPercentage = total > 0 ? Math.round(((verified + demonstrated * 0.7) / total) * 100) : 0

  return {
    total,
    verified,
    demonstrated,
    learning,
    notStarted,
    masteryPercentage,
  }
}
