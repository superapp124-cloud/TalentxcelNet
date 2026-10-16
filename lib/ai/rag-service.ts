/**
 * Grounded RAG & Knowledge Retrieval Service
 * Bridges Super AI agents with verified curriculum and policy knowledge bases
 */

export interface KnowledgeChunk {
  id: string
  title: string
  category: 'curriculum' | 'admissions' | 'fees' | 'hardware' | 'pedagogy'
  content: string
  tags: string[]
}

export const VERIFIED_KNOWLEDGE_BASE: KnowledgeChunk[] = [
  {
    id: 'kb-curr-ai-01',
    title: 'AI Development & Automation Syllabus Overview',
    category: 'curriculum',
    tags: ['ai', 'python', 'rag', 'automation', '8-months'],
    content:
      'Programme A is an 8-month intensive track covering Python, software boundaries, LLM fine-tuning, retrieval-augmented generation (pgvector), tool-calling agents, Docker containers, and end-to-end portfolio projects.',
  },
  {
    id: 'kb-curr-hc-01',
    title: 'Healthcare Technology Curriculum & Boundaries',
    category: 'curriculum',
    tags: ['healthcare', 'fhir', 'abdm', 'ehr', 'privacy'],
    content:
      'Programme B focuses on health informatics, HL7 FHIR REST protocols, India Ayushman Bharat Digital Mission (ABDM) consent architecture, and ethical data handling under DPDP Act 2023. Notice: This is a software technology qualification, not a medical or clinical license.',
  },
  {
    id: 'kb-curr-ent-01',
    title: 'Entrepreneurship & Small-Business Digitization Syllabus',
    category: 'curriculum',
    tags: ['msme', 'storefront', 'razorpay', 'crm', 'automation'],
    content:
      'Programme C equips entrepreneurs and MSME professionals to build modern digital storefronts, integrate Razorpay payment gateways, automate GST-compliant invoicing, and establish automated customer CRM workflows.',
  },
  {
    id: 'kb-curr-sch-01',
    title: 'School Foundation Programme (Class 8 to 9 Progression)',
    category: 'curriculum',
    tags: ['school', 'class-8-9', 'mathematics', 'computational-thinking'],
    content:
      'Programme D is an 8-month foundation course for students transitioning from Class 8 into Class 9. Focus areas include mathematical reasoning, algebraic decomposition, computational thinking with Python, and safe study habits under guardian supervision.',
  },
  {
    id: 'kb-fees-01',
    title: 'Transparent Tuition & Instalment Plan Structure',
    category: 'fees',
    tags: ['fees', 'pricing', 'emi', 'instalment', 'upfront'],
    content:
      'The flagship 8-month programme tuition is structured as ₹29,999 upfront plus 8 monthly instalments of ₹1,500 (total ₹41,999 before applicable GST). A 14-day cooling-off refund policy applies prior to course milestone delivery.',
  },
  {
    id: 'kb-hw-01',
    title: 'Student Hardware Policy & Specifications',
    category: 'hardware',
    tags: ['laptop', 'hardware', 'warranty', 'delivery'],
    content:
      'Eligible programmes include a development laptop equipped with minimum 16GB memory and high-speed NVMe storage with a 3-year OEM on-site warranty. Dispatched within 7-14 business days following verified payment settlement.',
  },
  {
    id: 'kb-curr-rag-02',
    title: 'Enterprise pgvector Indexing & Performance',
    category: 'curriculum',
    tags: ['pgvector', 'hnsw', 'ivfflat', 'indexing', 'similarity', 'cosine'],
    content:
      'In PostgreSQL pgvector, HNSW (Hierarchical Navigable Small World) indexes deliver lower query latency than IVFFlat for high-dimensional embeddings (1536d). Always enforce WHERE tenant_id = x prior to vector similarity calculations to ensure data isolation.',
  },
  {
    id: 'kb-curr-agent-02',
    title: 'Supervised AI Agents & Bounded Loops',
    category: 'curriculum',
    tags: ['agents', 'loops', 'zod', 'guardrails', 'tools'],
    content:
      'Autonomous agents in enterprise environments must execute within bounded iteration budgets (max 5 tool calls). Schemas for every tool argument must be validated with Zod, and irreversible side effects require human supervisor approval.',
  },
  {
    id: 'kb-pedagogy-01',
    title: 'TalentXcel Socratic Tutoring & Rubric Evaluation',
    category: 'pedagogy',
    tags: ['socratic', 'pedagogy', 'hints', 'rubric', 'assessment'],
    content:
      'Super AI delivers progressive Socratic hints (Hint 1 conceptual clue, Hint 2 decomposition, Hint 3 code scaffolding). Full solutions are withheld until the learner demonstrates independent problem decomposition. Project submissions are scored against 4 rubric dimensions: Architectural Soundness, Security, Test Coverage, and Code Quality.',
  },
]

export function retrieveGroundedChunks(query: string, maxResults = 3): KnowledgeChunk[] {
  const terms = query.toLowerCase().split(/\s+/).filter((t) => t.length > 2)

  const scored = VERIFIED_KNOWLEDGE_BASE.map((chunk) => {
    let score = 0
    const textToMatch = `${chunk.title} ${chunk.content} ${chunk.tags.join(' ')}`.toLowerCase()
    for (const term of terms) {
      if (textToMatch.includes(term)) {
        score += 1
      }
    }
    return { chunk, score }
  })

  scored.sort((a, b) => b.score - a.score)

  return scored.filter((s) => s.score > 0).slice(0, maxResults).map((s) => s.chunk)
}

export function retrieveGroundedContext(query: string, maxResults = 3): string {
  const topChunks = retrieveGroundedChunks(query, maxResults)

  if (topChunks.length === 0) {
    return 'General TalentXcel Academy educational framework and verified policies.'
  }

  return topChunks
    .map((chunk) => `[Source: ${chunk.title}]\n${chunk.content}`)
    .join('\n\n')
}
