'use client'

import React, { useState, useEffect } from 'react'
import {
  CheckCircle2,
  Download,
  BookOpen,
  ArrowLeft,
  ArrowRight,
  Code2,
  FileText,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { saveLessonOffline, getOfflineLesson } from '@/lib/offline/indexed-db'
import { queueOfflineProgress } from '@/lib/offline/sync-queue'
import { AITutorDrawer } from '@/components/academy/ai-tutor-drawer'
import { QuizRunner } from '@/components/academy/quiz-runner'
import { OfflineIndicator } from '@/components/offline/offline-indicator'
import { Logo } from '@/components/brand/logo'
import Link from 'next/link'

interface LessonProps {
  programmeSlug: string
  lesson: {
    id: string
    title: string
    description: string
    lessonType: 'video' | 'text' | 'code' | 'quiz' | 'project'
    durationMinutes: number
    contentBody?: string
  }
}

export function CoursePlayer({ programmeSlug, lesson }: LessonProps) {
  const [completed, setCompleted] = useState(false)
  const [isDownloaded, setIsDownloaded] = useState(false)
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    // Check if lesson is cached in IndexedDB
    getOfflineLesson(lesson.id).then((cached) => {
      if (cached) setIsDownloaded(true)
    })
  }, [lesson.id])

  const handleDownload = async () => {
    setDownloading(true)
    try {
      await saveLessonOffline({
        lessonId: lesson.id,
        programmeSlug,
        title: lesson.title,
        content: lesson.contentBody ?? lesson.description,
      })
      setIsDownloaded(true)
    } finally {
      setDownloading(false)
    }
  }

  const handleComplete = async () => {
    setCompleted(true)
    // Send to API or queue if offline
    if (navigator.onLine) {
      try {
        await fetch('/api/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lessonId: lesson.id, completed: true }),
        })
      } catch {
        await queueOfflineProgress(lesson.id, true)
      }
    } else {
      await queueOfflineProgress(lesson.id, true)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <OfflineIndicator />
      {/* Top Header */}
      <div className="border-b bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo size="sm" variant="emblem" href="/" />
            <Link
              href={`/courses/${programmeSlug}`}
              className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Syllabus
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              disabled={isDownloaded || downloading}
              className="gap-1.5 text-xs"
            >
              <Download className="h-3.5 w-3.5" />
              {isDownloaded ? 'Downloaded (Offline Ready)' : downloading ? 'Saving...' : 'Download for Offline'}
            </Button>
            <Button
              variant={completed ? 'secondary' : 'default'}
              size="sm"
              onClick={handleComplete}
              className="gap-1.5 text-xs"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              {completed ? 'Completed' : 'Mark as Complete'}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Viewport */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="capitalize">
                {lesson.lessonType} lesson
              </Badge>
              <span className="text-xs text-muted-foreground">
                Est. time: {lesson.durationMinutes} mins
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {lesson.title}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">{lesson.description}</p>
          </div>
        </div>

        {/* Dynamic Lesson Body */}
        {lesson.lessonType === 'quiz' ? (
          <QuizRunner onComplete={() => setCompleted(true)} />
        ) : (
          <div className="rounded-xl border bg-card p-6 sm:p-8 prose dark:prose-invert max-w-none">
            {lesson.contentBody ? (
              <div className="whitespace-pre-wrap font-sans text-sm sm:text-base leading-relaxed">
                {lesson.contentBody}
              </div>
            ) : (
              <p className="text-muted-foreground">
                Lesson content loaded from verified curriculum records.
              </p>
            )}
          </div>
        )}

        {/* Navigation Footer */}
        <div className="flex items-center justify-between border-t pt-6">
          <Link href={`/courses/${programmeSlug}`}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous Lesson
            </Button>
          </Link>
          <Link href={`/courses/${programmeSlug}`}>
            <Button size="sm">
              Next Lesson <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Floating AI Tutor Drawer */}
      <AITutorDrawer courseContext={`${programmeSlug}: ${lesson.title}`} />
    </div>
  )
}
