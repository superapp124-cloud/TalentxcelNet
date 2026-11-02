'use client'

import React, { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { UniversalGameScreen } from '@/components/game-engine/universal-game-screen'
import { TalentXcelEmblem } from '@/components/brand/logo'
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
        <div className="min-h-screen bg-[#070b14] text-white flex flex-col items-center justify-center p-4 select-none">
          <TalentXcelEmblem
            pixelSize={48}
            className="h-12 w-12 text-white animate-pulse mb-3"
          />
          <span className="font-semibold text-xl tracking-tight text-white font-sans leading-none inline-flex items-baseline mb-2">
            talent<span className="font-extrabold text-[#0080FF]">X</span>cel
          </span>
          <p className="text-xs text-slate-400 font-bold">Loading Game Arena...</p>
        </div>
      }
    >
      <GamePageContent />
    </Suspense>
  )
}
