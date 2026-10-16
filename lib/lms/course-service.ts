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
}

export function getCurriculum(programmeSlug: string) {
  return PROGRAMME_CURRICULUM[programmeSlug] ?? PROGRAMME_CURRICULUM['ai-development']
}
