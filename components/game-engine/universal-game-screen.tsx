'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  GameSubjectConfig,
  GameChapterConfig,
  GameChallenge,
  SubjectCode,
  PowerupInventory,
} from '@/lib/game-engine/types'
import { UNIVERSAL_GAME_SUBJECTS } from '@/lib/game-engine/curriculum-catalog'
import { soundEngine } from '@/lib/game-engine/sound-engine'
import { GameHeader } from './game-header'
import { GameEnvironment } from './game-environment'
import { QuestionCard } from './question-card'
import { PowerupsBar } from './powerups-bar'
import { SocraticCompanionModal } from './socratic-companion-modal'
import { GameVictoryModal } from './game-victory-modal'
import { GameOverModal } from './game-over-modal'

interface UniversalGameScreenProps {
  initialSubjectCode?: SubjectCode
  initialChapterSlug?: string
  onClose?: () => void
}

export function UniversalGameScreen({
  initialSubjectCode = 'math',
  initialChapterSlug = 'integers',
  onClose,
}: UniversalGameScreenProps) {
  const router = useRouter()

  // 1. Subject & Chapter Resolution
  const [selectedSubjectCode, setSelectedSubjectCode] = useState<SubjectCode>(initialSubjectCode)
  const currentSubject =
    UNIVERSAL_GAME_SUBJECTS.find((s) => s.code === selectedSubjectCode) ||
    UNIVERSAL_GAME_SUBJECTS[0]

  const [selectedChapterSlug, setSelectedChapterSlug] = useState<string>(initialChapterSlug)
  const currentChapter =
    currentSubject.chapters.find((c) => c.slug === selectedChapterSlug) ||
    currentSubject.chapters[0]

  // 2. Gameplay Telemetry State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null)
  const [eliminatedOptionIds, setEliminatedOptionIds] = useState<string[]>([])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  // 3. XP, Hearts, Streaks & Powerups State
  const [xp, setXp] = useState(240)
  const [hearts, setHearts] = useState(4)
  const [currentStreak, setCurrentStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)
  const [powerups, setPowerups] = useState<PowerupInventory>({
    hint: 3,
    fiftyFifty: 1,
    skip: 1,
    secondChance: 1,
    doubleXp: 1,
  })

  // 4. Modals State
  const [companionModalOpen, setCompanionModalOpen] = useState(false)
  const [companionMode, setCompanionMode] = useState<'hint' | 'solution' | 'gadget_action'>('hint')
  const [victoryModalOpen, setVictoryModalOpen] = useState(false)
  const [gameOverModalOpen, setGameOverModalOpen] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  // Current Challenge
  const totalQuestions = currentChapter.challenges.length
  const currentChallenge = currentChapter.challenges[currentQuestionIndex] || currentChapter.challenges[0]

  // Reset challenge state on chapter or question change
  useEffect(() => {
    setSelectedOptionId(null)
    setEliminatedOptionIds([])
    setIsSubmitted(false)
    setIsCorrect(null)
  }, [currentQuestionIndex, selectedChapterSlug, selectedSubjectCode])

  // Update sound mute status
  useEffect(() => {
    setIsMuted(soundEngine.getMuted())
  }, [])

  // ==========================================================================
  // ACTION HANDLERS
  // ==========================================================================

  // Answer Submission
  const handleSubmitAnswer = () => {
    if (!selectedOptionId || isSubmitted) return

    const correct = selectedOptionId === currentChallenge.correctOptionId
    setIsSubmitted(true)
    setIsCorrect(correct)

    if (correct) {
      soundEngine.playCorrect()
      const newStreak = currentStreak + 1
      setCurrentStreak(newStreak)
      if (newStreak > maxStreak) setMaxStreak(newStreak)

      // Calculate XP with streak multiplier
      const multiplier = newStreak >= 5 ? 2.0 : newStreak >= 3 ? 1.5 : 1.0
      const earnedXp = Math.round(currentChallenge.marks * multiplier)
      setXp((prev) => prev + earnedXp)

      if (newStreak >= 3) {
        soundEngine.playStreak()
      }
    } else {
      soundEngine.playIncorrect()
      setCurrentStreak(0)
      const newHearts = Math.max(0, hearts - 1)
      setHearts(newHearts)

      if (newHearts <= 0) {
        setTimeout(() => {
          setGameOverModalOpen(true)
        }, 800)
      }
    }
  }

  // Next Question or Chapter Victory
  const handleNextChallenge = () => {
    if (currentQuestionIndex + 1 < totalQuestions) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      soundEngine.playCorrect()
      setVictoryModalOpen(true)
    }
  }

  // Power-up: 50:50 (Eliminates 2 wrong options)
  const handleUse5050 = () => {
    if (powerups.fiftyFifty <= 0 || isSubmitted) return
    setPowerups((prev) => ({ ...prev, fiftyFifty: prev.fiftyFifty - 1 }))

    const wrongOptions = currentChallenge.options
      .filter((opt) => opt.id !== currentChallenge.correctOptionId)
      .map((opt) => opt.id)

    // Pick 2 wrong options to eliminate
    const toEliminate = wrongOptions.slice(0, 2)
    setEliminatedOptionIds(toEliminate)
  }

  // Power-up: Skip
  const handleUseSkip = () => {
    if (powerups.skip <= 0 || isSubmitted) return
    setPowerups((prev) => ({ ...prev, skip: prev.skip - 1 }))
    handleNextChallenge()
  }

  // Power-up: Hint
  const handleUseHint = () => {
    if (powerups.hint <= 0) return
    setPowerups((prev) => ({ ...prev, hint: Math.max(0, prev.hint - 1) }))
    setCompanionMode('hint')
    setCompanionModalOpen(true)
  }

  // Subject Special Action (e.g. Run Code, Learn, Map View, Grammar Tip)
  const handleSubjectGadgetAction = () => {
    soundEngine.playTap()
    setCompanionMode('gadget_action')
    setCompanionModalOpen(true)
  }

  // Exit handler
  const handleExit = () => {
    if (onClose) {
      onClose()
    } else {
      router.push('/dashboard')
    }
  }

  // Switch Subject
  const handleSelectSubject = (code: SubjectCode) => {
    soundEngine.playTap()
    setSelectedSubjectCode(code)
    const targetSubj = UNIVERSAL_GAME_SUBJECTS.find((s) => s.code === code)
    if (targetSubj && targetSubj.chapters.length > 0) {
      setSelectedChapterSlug(targetSubj.chapters[0].slug)
    }
    setCurrentQuestionIndex(0)
  }

  return (
    <div className="min-h-screen bg-[#070b14] text-white flex flex-col justify-between selection:bg-blue-500 selection:text-white">
      {/* 1. Universal Top Header */}
      <GameHeader
        subject={currentSubject}
        chapter={currentChapter}
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={totalQuestions}
        xp={xp}
        hearts={hearts}
        maxHearts={4}
        streak={currentStreak}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(soundEngine.toggleMute())}
        onExit={handleExit}
      />

      {/* 2. Main Gameplay Container (Mobile-First Frame) */}
      <main className="flex-1 w-full max-w-lg mx-auto px-3.5 py-2.5 sm:py-4 flex flex-col justify-between gap-3 sm:gap-4">
        {/* Subject Quick Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {UNIVERSAL_GAME_SUBJECTS.map((s) => {
            const isActive = s.code === selectedSubjectCode
            return (
              <button
                key={s.code}
                type="button"
                onClick={() => handleSelectSubject(s.code)}
                className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30 ring-1 ring-white/40'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                }`}
              >
                {s.title}
              </button>
            )
          })}
        </div>

        {/* Dynamic Chapter Visual Environment */}
        <GameEnvironment chapter={currentChapter} challenge={currentChallenge} />

        {/* Interactive Question Challenge Card */}
        <QuestionCard
          challenge={currentChallenge}
          selectedOptionId={selectedOptionId}
          eliminatedOptionIds={eliminatedOptionIds}
          isSubmitted={isSubmitted}
          onSelectOption={(optionId) => setSelectedOptionId(optionId)}
        />

        {/* Powerups & Primary Action Bar */}
        <PowerupsBar
          subjectCode={currentSubject.code}
          powerups={powerups}
          isSubmitted={isSubmitted}
          hasSelectedOption={Boolean(selectedOptionId)}
          accentGradient={currentChapter.accentGradient}
          onUseHint={handleUseHint}
          onUse5050={handleUse5050}
          onUseSkip={handleUseSkip}
          onSubjectGadgetAction={handleSubjectGadgetAction}
          onSubmit={handleSubmitAnswer}
          onNext={handleNextChallenge}
        />
      </main>

      {/* 3. Socratic AI Learning Companion Modal */}
      <SocraticCompanionModal
        isOpen={companionModalOpen}
        challenge={currentChallenge}
        mode={companionMode}
        onClose={() => setCompanionModalOpen(false)}
      />

      {/* 4. Victory Level Complete Modal */}
      <GameVictoryModal
        isOpen={victoryModalOpen}
        subject={currentSubject}
        chapter={currentChapter}
        totalXp={xp}
        accuracyPercentage={100}
        streakMax={maxStreak}
        onPlayNext={() => {
          setVictoryModalOpen(false)
          // Cycle to next subject
          const currentIndex = UNIVERSAL_GAME_SUBJECTS.findIndex(
            (s) => s.code === selectedSubjectCode
          )
          const nextIndex = (currentIndex + 1) % UNIVERSAL_GAME_SUBJECTS.length
          handleSelectSubject(UNIVERSAL_GAME_SUBJECTS[nextIndex].code)
        }}
        onReplay={() => {
          setVictoryModalOpen(false)
          setCurrentQuestionIndex(0)
        }}
        onHome={handleExit}
      />

      {/* 5. Game Over (Hearts Exhausted) Modal */}
      <GameOverModal
        isOpen={gameOverModalOpen}
        subject={currentSubject}
        chapter={currentChapter}
        onRevive={() => {
          setHearts(4)
          setGameOverModalOpen(false)
          soundEngine.playCorrect()
        }}
        onReplay={() => {
          setHearts(4)
          setCurrentQuestionIndex(0)
          setGameOverModalOpen(false)
        }}
        onHome={handleExit}
      />
    </div>
  )
}
