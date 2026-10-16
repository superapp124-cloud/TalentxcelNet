import { Metadata } from 'next'
import { getCurriculum } from '@/lib/lms/course-service'
import { CoursePlayer } from '@/components/academy/course-player'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Lesson Player — TalentXcel Academy',
  robots: { index: false },
}

export default async function LessonPlayerPage({
  params,
}: {
  params: Promise<{ programmeId: string; lessonId: string }>
}) {
  const { programmeId, lessonId } = await params
  const curriculum = getCurriculum(programmeId)

  // Find lesson across all modules
  let currentLesson = null
  for (const mod of curriculum.modules) {
    const found = mod.lessons.find((l) => l.id === lessonId)
    if (found) {
      currentLesson = found
      break
    }
  }

  // Fallback to first lesson if not found
  if (!currentLesson) {
    currentLesson = curriculum.modules[0]?.lessons[0]
  }

  if (!currentLesson) {
    notFound()
  }

  return (
    <CoursePlayer
      programmeSlug={programmeId}
      lesson={currentLesson}
    />
  )
}
