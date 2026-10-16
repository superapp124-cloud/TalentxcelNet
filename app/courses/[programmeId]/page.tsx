import { Metadata } from 'next'
import Link from 'next/link'
import { getCurriculum } from '@/lib/lms/course-service'
import { CheckCircle2, Circle, Clock, ArrowRight, PlayCircle, BookOpen } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Course Syllabus',
  robots: { index: false },
}

export default async function CourseOverviewPage({
  params,
}: {
  params: Promise<{ programmeId: string }>
}) {
  const { programmeId } = await params
  const curriculum = getCurriculum(programmeId)

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="border-b bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <Badge variant="outline" className="mb-2">
                Enrolled Course
              </Badge>
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {curriculum.title}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Follow your structured learning path. Complete all modules and assessments to qualify for your certificate.
              </p>
            </div>
            <Link href={`/courses/${programmeId}/lessons/${curriculum.modules[0]?.lessons[0]?.id ?? 'les-101'}`}>
              <Button size="lg" className="gap-2">
                <PlayCircle className="h-5 w-5" /> Continue Learning
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {curriculum.modules.map((module) => (
          <Card key={module.id} className="border shadow-xs">
            <CardHeader className="bg-muted/30 border-b pb-4">
              <CardTitle className="text-lg font-bold">{module.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{module.description}</p>
            </CardHeader>
            <CardContent className="p-0 divide-y">
              {module.lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="flex items-center justify-between p-4 hover:bg-muted/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Circle className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <h4 className="font-semibold text-sm text-foreground">{lesson.title}</h4>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                        <span className="capitalize">{lesson.lessonType} lesson</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {lesson.durationMinutes} mins
                        </span>
                      </div>
                    </div>
                  </div>
                  <Link href={`/courses/${programmeId}/lessons/${lesson.id}`}>
                    <Button variant="ghost" size="sm" className="gap-1 text-xs">
                      Start <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
