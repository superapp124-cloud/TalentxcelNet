import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BookOpen, Calendar, Clock, ArrowRight, Sparkles, Code2, Stethoscope, Briefcase, GraduationCap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog & Educational Resources — TalentXcel Academy',
  description: 'Practical guides, architectural blueprints, and career insights across AI development, healthcare technology, digitization, and foundational education.',
}

const articles = [
  {
    slug: 'building-resilient-ai-agents',
    title: 'Building Resilient AI Agents with Grounded System Boundaries',
    category: 'AI Engineering',
    categoryIcon: Code2,
    readTime: '6 min read',
    publishedAt: '15 Oct 2026',
    excerpt: 'Explore deterministic routing, prompt-injection defense, and Socratic scaffolding for enterprise educational agents.',
    highlight: true,
  },
  {
    slug: 'digital-health-interoperability-abdm',
    title: 'Understanding Digital Health Standards: FHIR, ABDM, and Health Informatics',
    category: 'Healthcare Tech',
    categoryIcon: Stethoscope,
    readTime: '8 min read',
    publishedAt: '12 Oct 2026',
    excerpt: 'A comprehensive technical overview of healthcare interoperability protocols, patient consent management, and data security.',
    highlight: false,
  },
  {
    slug: 'msme-digitization-automated-workflows',
    title: 'Automating the Small Enterprise: From Invoicing to Customer CRM',
    category: 'Digitization',
    categoryIcon: Briefcase,
    readTime: '5 min read',
    publishedAt: '08 Oct 2026',
    excerpt: 'Practical playbooks for Indian small businesses to digitize inventory, streamline GST invoicing, and automate order reconciliation.',
    highlight: false,
  },
  {
    slug: 'computational-thinking-middle-school',
    title: 'Transitioning from Class 8 to 9: Why Early Computational Thinking Matters',
    category: 'School Foundation',
    categoryIcon: GraduationCap,
    readTime: '7 min read',
    publishedAt: '03 Oct 2026',
    excerpt: 'A guide for parents and educators on nurturing problem-solving stamina, structured logic, and healthy digital habits in teenagers.',
    highlight: false,
  },
  {
    slug: 'offline-first-pwa-architecture',
    title: 'Architecting Offline-First Progressive Web Apps with IndexedDB & Service Workers',
    category: 'Software Architecture',
    categoryIcon: Sparkles,
    readTime: '10 min read',
    publishedAt: '28 Sep 2026',
    excerpt: 'Technical deep-dive on designing sync queues, conflict resolution, and cached media storage for low-bandwidth learners in Tier 2/3 locations.',
    highlight: false,
  },
]

export default function BlogPage() {
  return (
    <div className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="outline" className="border-primary/30 text-primary">
            Knowledge Base & Engineering Insights
          </Badge>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Blog & Educational Resources
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            Curated blueprints, practical case studies, and engineering deep-dives written by TalentXcel mentors and industry faculty.
          </p>
        </div>

        {/* Featured Article */}
        {articles.filter((a) => a.highlight).map((article) => {
          const Icon = article.categoryIcon
          return (
            <div
              key={article.slug}
              className="rounded-3xl border border-white/[0.08] bg-linear-to-b from-white/[0.03] to-white/[0.01] p-8 sm:p-12 relative overflow-hidden backdrop-blur-md"
            >
              <div className="max-w-3xl space-y-4">
                <div className="flex items-center gap-3">
                  <Badge variant="default" className="gap-1.5 py-1 px-3 text-xs">
                    <Icon className="h-3.5 w-3.5" />
                    {article.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {article.readTime}
                  </span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{article.publishedAt}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
                  {article.title}
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="pt-2">
                  <Link href={`/blog/${article.slug}`}>
                    <Button className="gap-2">
                      Read Full Blueprint <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )
        })}

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.filter((a) => !a.highlight).map((article) => {
            const Icon = article.categoryIcon
            return (
              <Card key={article.slug} className="border border-white/[0.08] hover:border-primary/40 transition-all flex flex-col justify-between">
                <CardHeader className="space-y-3 pb-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="gap-1.5 text-xs">
                      <Icon className="h-3 w-3 text-primary" />
                      {article.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {article.readTime}
                    </span>
                  </div>
                  <CardTitle className="text-lg font-bold leading-snug hover:text-primary transition-colors">
                    <Link href={`/blog/${article.slug}`}>
                      {article.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-0">
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between border-t border-white/[0.06] pt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {article.publishedAt}
                    </span>
                    <Link href={`/blog/${article.slug}`} className="text-primary font-semibold flex items-center gap-1 hover:underline">
                      Read article <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
