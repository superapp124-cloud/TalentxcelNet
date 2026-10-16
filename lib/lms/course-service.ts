export interface CourseModule {
  id: string
  title: string
  description: string
  position: number
  lessons: CourseLesson[]
}

export interface CourseLesson {
  id: string
  title: string
  description: string
  lessonType: 'video' | 'text' | 'code' | 'quiz' | 'project'
  durationMinutes: number
  position: number
  isCompleted?: boolean
  contentBody?: string
  contentUrl?: string
}

// Curriculum data for Programmes A, B, C, D
export const PROGRAMME_CURRICULUM: Record<string, { title: string; modules: CourseModule[] }> = {
  'ai-development': {
    title: 'AI Development & Automation',
    modules: [
      {
        id: 'mod-1',
        title: 'Module 1: Foundations of Modern Software & Python',
        description: 'Clean coding, asynchronous runtime, modular architecture, and git workflows.',
        position: 1,
        lessons: [
          {
            id: 'les-101',
            title: '1.1 Architecture of Production Web Applications',
            description: 'Client-server boundaries, REST APIs, and event-driven backends.',
            lessonType: 'text',
            durationMinutes: 45,
            position: 1,
            contentBody:
              '# Architecture of Production Web Applications\n\nModern software development requires a firm understanding of system boundaries, state management, and asynchronous data flows.\n\n### Key Concepts\n- **Client-Server Boundaries**: Keep secrets on the server. Never expose service credentials in client bundles.\n- **Idempotency**: Ensure state transformations can be retried safely without unintended side effects.\n- **Stateless Services**: Scale web servers horizontally by externalizing session state into databases and signed cookies.',
          },
          {
            id: 'les-102',
            title: '1.2 Advanced Python & Data Structures for AI',
            description: 'Typing, generators, decorators, and high-performance NumPy/Pandas foundations.',
            lessonType: 'code',
            durationMinutes: 60,
            position: 2,
            contentBody:
              '# Python Data Structures for AI\n\n```python\nfrom typing import List, Dict, Any\nimport time\n\ndef time_execution(func):\n    def wrapper(*args, **kwargs):\n        start = time.perf_counter()\n        result = func(*args, **kwargs)\n        print(f"{func.__name__} took {time.perf_counter() - start:.4f}s")\n        return result\n    return wrapper\n\n@time_execution\ndef process_batch(items: List[Dict[str, Any]]) -> List[str]:\n    return [item["title"].strip().upper() for item in items if "title" in item]\n```',
          },
          {
            id: 'les-103',
            title: '1.3 Module 1 Knowledge Check & Quiz',
            description: 'Evaluate core comprehension of software boundaries and typing.',
            lessonType: 'quiz',
            durationMinutes: 20,
            position: 3,
          },
        ],
      },
      {
        id: 'mod-2',
        title: 'Module 2: Practical AI Development & RAG Systems',
        description: 'Embeddings, vector indexing (pgvector), chunking, prompt engineering, and reranking.',
        position: 2,
        lessons: [
          {
            id: 'les-201',
            title: '2.1 Vector Search & Retrieval Foundations',
            description: 'High-dimensional embeddings, cosine similarity, and chunking trade-offs.',
            lessonType: 'text',
            durationMinutes: 50,
            position: 1,
            contentBody:
              '# Retrieval-Augmented Generation (RAG)\n\nRetrieval-augmented generation grounds language models on authenticated, up-to-date domain documents.\n\n### The RAG Pipeline\n1. **Document Ingestion & Chunking**: Chunk size between 500-1000 tokens with 10% overlap.\n2. **Vector Indexing**: Generate embeddings and index using PostgreSQL pgvector (`ivfflat` or `hnsw`).\n3. **Tenant Security Filter**: Always apply SQL WHERE tenant_id/user_id constraints BEFORE semantic search!\n4. **Context Injection**: Feed only the relevant top-K passages into the prompt.',
          },
          {
            id: 'les-202',
            title: '2.2 Building Supervised Tool-Calling AI Agents',
            description: 'Structured outputs with Zod, bounded loops, and human-in-the-loop safeguards.',
            lessonType: 'code',
            durationMinutes: 75,
            position: 2,
            contentBody:
              '# Supervised Agent Execution Loop\n\nEnsure tool execution is strictly validated against an explicit whitelist and never loops indefinitely without bounds.',
          },
        ],
      },
    ],
  },
  'healthcare-tech': {
    title: 'Healthcare Technology',
    modules: [
      {
        id: 'hc-mod-1',
        title: 'Module 1: Foundations of Health Informatics & Clinical Systems',
        description: 'Electronic health records, clinical terminology, and secure hospital workflows.',
        position: 1,
        lessons: [
          {
            id: 'hc-101',
            title: '1.1 Architecture of Health Information Systems (HIS)',
            description: 'Patient demographics, clinical records, and electronic health record boundaries.',
            lessonType: 'text',
            durationMinutes: 45,
            position: 1,
            contentBody:
              '# Architecture of Health Information Systems\n\nHealthcare software engineering demands distinct reliability, auditability, and safety boundaries.\n\n### Clinical Workflows\n- **EHR vs EMR**: Understanding the shift from siloed electronic medical records to interoperable electronic health records.\n- **Data Integrity**: Auditable event logs for every read and update to patient diagnostic records.\n- **Regulatory Boundaries**: Healthcare technology products assist workflows; they do not replace clinical physician judgment.',
          },
          {
            id: 'hc-102',
            title: '1.2 HL7 FHIR Protocols & Data Exchange APIs',
            description: 'Working with Fast Healthcare Interoperability Resources (FHIR) JSON schemas.',
            lessonType: 'code',
            durationMinutes: 60,
            position: 2,
            contentBody:
              '# Working with HL7 FHIR Resources\n\n```json\n{\n  "resourceType": "Patient",\n  "id": "tx-pat-8842",\n  "active": true,\n  "name": [{\n    "use": "official",\n    "family": "Verma",\n    "given": ["Rohan"]\n  }],\n  "gender": "male",\n  "birthDate": "1994-06-15"\n}\n```\n\nFHIR allows standardized clinical exchange between hospital management systems, laboratories, and patient apps.',
          },
          {
            id: 'hc-103',
            title: '1.3 Health Informatics Quiz & Knowledge Assessment',
            description: 'Evaluate comprehension of FHIR resources and patient data confidentiality.',
            lessonType: 'quiz',
            durationMinutes: 20,
            position: 3,
          },
        ],
      },
      {
        id: 'hc-mod-2',
        title: 'Module 2: Ayushman Bharat Digital Mission (ABDM) & Health AI',
        description: 'ABHA IDs, Consent Managers, privacy compliance under DPDP Act 2023, and ethical AI.',
        position: 2,
        lessons: [
          {
            id: 'hc-201',
            title: '2.1 India’s ABDM Architecture & Consent Management',
            description: 'Implementing token-based consent flows and secure longitudinal health data sharing.',
            lessonType: 'text',
            durationMinutes: 50,
            position: 1,
            contentBody:
              '# India ABDM Ecosystem\n\nABDM establishes an open digital health infrastructure across India.\n\n### Key Ecosystem Entities\n- **Health Information User (HIU)**: Applications requesting access to patient health records.\n- **Health Information Provider (HIP)**: Hospitals and diagnostic labs holding patient records.\n- **Consent Manager**: Architectural intermediary securing explicit, revocable patient permission prior to data transmission.',
          },
        ],
      },
    ],
  },
  'entrepreneurship': {
    title: 'Entrepreneurship & Small-Business Digitization',
    modules: [
      {
        id: 'ent-mod-1',
        title: 'Module 1: Digital Storefronts & Cloud Commerce',
        description: 'Product catalogs, order pipelines, payment gateways, and automated invoice delivery.',
        position: 1,
        lessons: [
          {
            id: 'ent-101',
            title: '1.1 Modern Digital Storefront Architecture',
            description: 'Customer ordering journeys, product catalogs, and conversion funnel optimization.',
            lessonType: 'text',
            durationMinutes: 40,
            position: 1,
            contentBody:
              '# Building Digital Storefronts for Small Enterprises\n\nDigitization begins by removing friction from the purchase transaction.\n\n### Fundamentals of Digital Commerce\n- **Inventory Synchronization**: Real-time stock counts preventing customer over-ordering.\n- **Checkout Optimization**: Minimal fields with automated PIN code validation and mobile OTPs.\n- **Multi-Channel Distribution**: Integrating website storefronts with direct messaging channels.',
          },
          {
            id: 'ent-102',
            title: '1.2 Payment Gateways, Webhooks & GST Automated Invoicing',
            description: 'Implementing Razorpay UPI integrations and compliant tax calculation.',
            lessonType: 'code',
            durationMinutes: 55,
            position: 2,
            contentBody:
              '# Automated Invoicing & Payment Webhooks\n\nPayment confirmation must be handled asynchronously via signed webhooks to guarantee zero dropped orders even when customer browsers disconnect.',
          },
        ],
      },
      {
        id: 'ent-mod-2',
        title: 'Module 2: Customer CRM & Operational Automation',
        description: 'Lead tracking, customer lifetime value, and automated repeat-order campaigns.',
        position: 2,
        lessons: [
          {
            id: 'ent-201',
            title: '2.1 Small Enterprise CRM & Pipeline Automation',
            description: 'Setting up persistent customer tracking, lead scoring, and automated follow-ups.',
            lessonType: 'text',
            durationMinutes: 45,
            position: 1,
            contentBody:
              '# Customer Relationship Management for MSMEs\n\nA small enterprise grows predictably when customer interactions are tracked systematically.\n\n### Core Workflows\n- **Lead Ingestion**: Capturing inquiries from web forms, WhatsApp, and telephone into a centralized database.\n- **Automated Service Reminders**: Timely notifications for subscription renewals and reorders.\n- **Delinquency Recovery**: Automated polite reminders for outstanding invoices.',
          },
        ],
      },
    ],
  },
  'school-foundation': {
    title: 'School Foundation (Class 8 → 9)',
    modules: [
      {
        id: 'sch-mod-1',
        title: 'Module 1: Analytical Reasoning & Mathematical Foundations',
        description: 'Algebraic decomposition, logical thinking, and structured problem-solving stamina.',
        position: 1,
        lessons: [
          {
            id: 'sch-101',
            title: '1.1 Mathematical Logic & Problem Decomposition',
            description: 'Breaking down multi-step word problems and understanding mathematical proof concepts.',
            lessonType: 'text',
            durationMinutes: 40,
            position: 1,
            contentBody:
              '# The Transition from Class 8 to 9\n\nClass 9 mathematics shifts from rote memorization to abstract algebraic relationships and geometric proof structures.\n\n### Core Analytical Principles\n- **Decomposition**: Step 1 is always identifying the known values and what unknown target is sought.\n- **Variable Mapping**: Translating real-world relationships into algebraic equations.\n- **Verification**: Back-substituting solutions into original conditions to test validity.',
          },
          {
            id: 'sch-102',
            title: '1.2 Computational Thinking & Algorithmic Problem Solving',
            description: 'Pattern recognition, sorting sequences, and flowchart logic.',
            lessonType: 'code',
            durationMinutes: 45,
            position: 2,
            contentBody:
              '# Algorithmic Thinking for Young Innovators\n\n```python\n# Finding prime factors systematically\ndef find_prime_factors(number):\n    factors = []\n    divisor = 2\n    while number > 1:\n        while number % divisor == 0:\n            factors.append(divisor)\n            number //= divisor\n        divisor += 1\n    return factors\n\nprint(find_prime_factors(84))  # [2, 2, 3, 7]\n```',
          },
          {
            id: 'sch-103',
            title: '1.3 Foundations Knowledge Check & Diagnostic Quiz',
            description: 'Evaluate mastery of fractions, algebraic notation, and deductive logic.',
            lessonType: 'quiz',
            durationMinutes: 20,
            position: 3,
          },
        ],
      },
    ],
  },
}

export function getCurriculum(programmeSlug: string) {
  return PROGRAMME_CURRICULUM[programmeSlug] ?? PROGRAMME_CURRICULUM['ai-development']
}

