'use client'

import React, { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { UniversalGameScreen } from '@/components/game-engine/universal-game-screen'
import type { SubjectCode } from '@/lib/game-engine/types'

function GamePageContent() {
  const searchParams = useSearchParams()
  const subjectParam = (searchParams.get('subject') as SubjectCode) || 'math'
  const chapterParam = searchParams.get('chapter') || 'integers'

  return (
    <UniversalGameScreen
      initialSubjectCode={subjectParam}
      initialChapterSlug={chapterParam}
    />
  )
}

export default function GamePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#070b14] text-white flex flex-col items-center justify-center p-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 animate-pulse flex items-center justify-center text-white font-black text-lg mb-3">
            TX
          </div>
          <p className="text-xs text-slate-400 font-bold">Loading Game Arena...</p>
        </div>
      }
    >
      <GamePageContent />
    </Suspense>
  )
}
