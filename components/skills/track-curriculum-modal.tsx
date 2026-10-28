'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Clock,
  Volume2,
  VolumeX,
  Trophy,
  Award,
  Zap,
  Printer,
  RefreshCw,
  Briefcase,
  Play,
  Pause,
  RotateCcw,
  BookOpen,
  AlertCircle,
  Maximize,
  Youtube,
  User,
  Edit3,
  ExternalLink,
  Plus,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { ClassSkillTrackMeta } from '@/packages/core/src'
import { SmartBackpackLab } from '@/components/skills/smart-backpack-lab'
import { loadBackpackAttempt, type BackpackAttemptState } from '@/lib/lms/backpack-attempt-store'

interface TrackCurriculumModalProps {
  track: ClassSkillTrackMeta | null
  isOpen: boolean
  onClose: () => void
  onOpenWorkshop?: (projectId: string) => void
  onEnrollTrack?: (productId: string) => void
}

// --- WEB AUDIO SYNTHESIZER (100% offline, zero-latency feedback) ---
function playKidSound(type: 'chime' | 'success' | 'step' | 'pop' | 'cash') {
  if (typeof window === 'undefined') return
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!AudioContextClass) return
    const ctx = new AudioContextClass()
    const now = ctx.currentTime

    if (type === 'chime') {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(523.25, now)
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.15)
      gain.gain.setValueAtTime(0.15, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.4)
    } else if (type === 'step') {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(440, now)
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.12)
      gain.gain.setValueAtTime(0.12, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.3)
    } else if (type === 'pop') {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(800, now)
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.08)
      gain.gain.setValueAtTime(0.1, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.15)
    } else if (type === 'cash') {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(987.77, now)
      osc.frequency.setValueAtTime(1318.51, now + 0.08)
      gain.gain.setValueAtTime(0.18, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.35)
    } else if (type === 'success') {
      const notes = [523.25, 659.25, 783.99, 1046.5]
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'triangle'
        osc.frequency.value = freq
        const start = now + idx * 0.09
        gain.gain.setValueAtTime(0.15, start)
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(start)
        osc.stop(start + 0.35)
      })
    }
  } catch {
    // Graceful fallback
  }
}

// Maps category to authentic Pixar-style cartoon scene
function getTrackCartoonScene(category: string): string {
  switch (category) {
    case 'life_communication':
      return '/images/cartoons/communication.jpg'
    case 'life_independence':
      return '/images/cartoons/independence.jpg'
    case 'life_money_management':
      return '/images/cartoons/money.jpg'
    case 'life_safety_health':
      return '/images/cartoons/safety.jpg'
    case 'life_social_teamwork':
    case 'life_citizenship_community':
      return '/images/cartoons/teamwork.jpg'
    case 'life_critical_thinking':
    case 'life_study_skills':
    default:
      return '/images/cartoons/independence.jpg'
  }
}

// Maps category to authentic 1080p Pixar-style animated motion video MP4
function getTrackMotionVideo(category: string): string {
  switch (category) {
    case 'life_communication':
      return '/videos/communication.mp4'
    case 'life_independence':
      return '/videos/independence.mp4'
    case 'life_money_management':
      return '/videos/money-management.mp4'
    case 'life_safety_health':
      return '/videos/safety.mp4'
    case 'life_social_teamwork':
    case 'life_citizenship_community':
      return '/videos/teamwork.mp4'
    case 'life_critical_thinking':
    case 'life_study_skills':
    default:
      return '/videos/independence.mp4'
  }
}

function getScenarioStudentName(scenario?: string, classNumber?: number): string {
  if (!scenario) return classNumber && classNumber >= 6 ? 'Riya' : 'Aarav'
  const firstWord = scenario.trim().split(/\s+/)[0].replace(/[^a-zA-Z]/g, '')
  if (firstWord && /^[A-Z][a-zA-Z]{2,}$/.test(firstWord)) {
    return firstWord
  }
  return classNumber && classNumber >= 6 ? 'Riya' : 'Aarav'
}

// Verified open-web educational cartoon video library for kids (Fixies, Dr. Binocs / Peekaboo Kidz, Ubongo Kids, Dr. Panda, Rainbow Kiddies)
export interface EducationalVideoOption {
  id: string
  title: string
  channel: string
  durationText: string
  badge: string
}

export const CURATED_CATEGORY_VIDEOS: Record<string, EducationalVideoOption[]> = {
  life_independence: [
    {
      id: '9KKRVuQxvcc',
      title: 'How to Organize Your Backpack · A Lesson with The Fixies',
      channel: 'The Fixies Animation for Kids',
      durationText: '5 mins',
      badge: 'Backpack Organizing',
    },
    {
      id: 'l2GdFobEcbI',
      title: 'What If We Stop Bathing? Daily Hygiene & Routines',
      channel: 'The Dr. Binocs Show · Peekaboo Kidz',
      durationText: '6 mins',
      badge: 'Daily Routines',
    },
    {
      id: 'tsgyWIsYvxs',
      title: 'Food Pyramid: Fueling Your Body for School Focus',
      channel: 'The Dr. Binocs Show · Peekaboo Kidz',
      durationText: '5 mins',
      badge: 'Nutrition & Energy',
    },
  ],
  life_money_management: [
    {
      id: 'EQDezn1ZVl0',
      title: 'What Are Needs vs Wants? Budgeting & Money Lessons',
      channel: 'Ubongo Kids Official',
      durationText: '7 mins',
      badge: 'Needs vs Wants',
    },
    {
      id: '9KKRVuQxvcc',
      title: 'Protecting School Supplies & Valuing Belongings',
      channel: 'The Fixies Animation for Kids',
      durationText: '5 mins',
      badge: 'Belongings Care',
    },
  ],
  life_communication: [
    {
      id: 'Pu6J_n6CgEA',
      title: 'Moon Forgot Her Homework? Active Listening Skills & School Focus',
      channel: 'Rainbow Kiddies - Stories for Kids',
      durationText: '6 mins',
      badge: 'Active Listening',
    },
    {
      id: 'LC3Ri4uTPe8',
      title: 'Speaking Clearly & Sharing Ideas in Class',
      channel: 'The Fixies Animation for Kids',
      durationText: '6 mins',
      badge: 'Speaking Confidence',
    },
  ],
  life_safety_health: [
    {
      id: 'F4gH5xn_BpE',
      title: 'First Aid For Kids! Medical Rescue & Cut Care',
      channel: 'Dr. Panda TotoTime Official',
      durationText: '8 mins',
      badge: 'First Aid & Cuts',
    },
    {
      id: 'tsgyWIsYvxs',
      title: 'Food Pyramid: Balanced Eating & Playground Energy',
      channel: 'The Dr. Binocs Show · Peekaboo Kidz',
      durationText: '5 mins',
      badge: 'Health & Vitality',
    },
    {
      id: 'l2GdFobEcbI',
      title: 'Personal Hygiene & Germ Defense for School',
      channel: 'The Dr. Binocs Show · Peekaboo Kidz',
      durationText: '6 mins',
      badge: 'Hygiene Habits',
    },
  ],
  life_social_teamwork: [
    {
      id: 'LC3Ri4uTPe8',
      title: 'Teamwork & Working Together to Solve Problems',
      channel: 'The Fixies Animation for Kids',
      durationText: '6 mins',
      badge: 'Team Problem Solving',
    },
    {
      id: 'EQDezn1ZVl0',
      title: 'Resolving Conflicts & Fair Play with Friends',
      channel: 'Ubongo Kids Official',
      durationText: '7 mins',
      badge: 'Collaboration',
    },
  ],
  life_critical_thinking: [
    {
      id: 'EQDezn1ZVl0',
      title: 'Critical Thinking: Making Smart Decisions Under Pressure',
      channel: 'Ubongo Kids Official',
      durationText: '7 mins',
      badge: 'Smart Decisions',
    },
    {
      id: '9KKRVuQxvcc',
      title: 'Diagnosing the Problem Step-by-Step',
      channel: 'The Fixies Animation for Kids',
      durationText: '5 mins',
      badge: 'Step-by-Step Logic',
    },
  ],
  life_study_skills: [
    {
      id: '9KKRVuQxvcc',
      title: 'How to Organize Your Backpack & Timetable',
      channel: 'The Fixies Animation for Kids',
      durationText: '5 mins',
      badge: 'Timetable Mastery',
    },
    {
      id: 'Pu6J_n6CgEA',
      title: 'Focus, Homework Routine & Active School Habits',
      channel: 'Rainbow Kiddies - Stories for Kids',
      durationText: '6 mins',
      badge: 'Homework Habits',
    },
  ],
}

export function TrackCurriculumModal({
  track,
  isOpen,
  onClose,
  onOpenWorkshop,
  onEnrollTrack,
}: TrackCurriculumModalProps) {
  // --- STRICT HOOK DECLARATIONS AT TOP ---
  const [activeTab, setActiveTab] = useState<'video' | 'practice' | 'simulator' | 'certificate' | 'workshop'>('video')
  const [explanationSubTab, setExplanationSubTab] = useState<'explanation' | 'hint' | 'keypoint'>('explanation')
  
  // Dynamic student name matching logged-in learner or persistent localStorage state
  const [studentName, setStudentName] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('talentxcel_student_name')
      if (saved && saved.trim()) return saved.trim()
    }
    return 'Arshid Wani'
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('talentxcel_student_name')
      if (saved && saved.trim()) {
        setStudentName(saved.trim())
      }
    }
  }, [isOpen])

  const handleUpdateStudentName = (newName: string) => {
    setStudentName(newName)
    if (typeof window !== 'undefined') {
      localStorage.setItem('talentxcel_student_name', newName)
    }
  }

  const studentFirstName = studentName.trim().split(/\s+/)[0] || 'Learner'
  const [earnedXP, setEarnedXP] = useState<number>(45)

  // Smart Backpack Pilot: Attempt persistence & Parent observation state
  const [backpackAttempt, setBackpackAttempt] = useState<BackpackAttemptState | null>(null)
  const [parentObsDays, setParentObsDays] = useState<number>(5)
  const [parentObsStatus, setParentObsStatus] = useState<string | null>(null)
  const [isRecordingObs, setIsRecordingObs] = useState<boolean>(false)

  // Hydrate backpack attempt state on open or tab switch
  useEffect(() => {
    if (typeof window !== 'undefined' && track?.category === 'life_independence') {
      const { state } = loadBackpackAttempt()
      setBackpackAttempt(state)
    }
  }, [isOpen, activeTab, track?.category])

  // Record parent home observation
  const handleRecordParentObservation = async () => {
    if (!backpackAttempt?.certificateId) return
    setIsRecordingObs(true)
    try {
      const res = await fetch('/api/skills/backpack/parent-observe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          certificateId: backpackAttempt.certificateId,
          observedDaysCount: parentObsDays,
          parentNotes: `Parent verified ${parentObsDays} days of independent evening bag packing.`,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setParentObsStatus(`Recorded: ${parentObsDays} days home practice verified!`)
        playKidSound('success')
      } else {
        setParentObsStatus(`Note: ${data.message || data.error}`)
      }
    } catch {
      setParentObsStatus('Failed to record home observation.')
    } finally {
      setIsRecordingObs(false)
    }
  }

  // Video Source Toggle: YouTube Animated Lesson (Default) vs 3D TalentXcel Studio
  const [videoSourceMode, setVideoSourceMode] = useState<'youtube' | 'motion'>('youtube')
  
  // Available video episodes for current track category
  const categoryVideos = track?.category && CURATED_CATEGORY_VIDEOS[track.category]
    ? CURATED_CATEGORY_VIDEOS[track.category]
    : CURATED_CATEGORY_VIDEOS['life_independence']

  const [selectedYtVideo, setSelectedYtVideo] = useState<EducationalVideoOption>(categoryVideos[0])
  const [customYtInput, setCustomYtInput] = useState<string>('')
  const [isCustomInputOpen, setIsCustomInputOpen] = useState<boolean>(false)

  // Sync selected video when track category changes
  useEffect(() => {
    if (track?.category && CURATED_CATEGORY_VIDEOS[track.category]) {
      setSelectedYtVideo(CURATED_CATEGORY_VIDEOS[track.category][0])
    }
  }, [track?.id, track?.category])

  // Animated Cartoon Cinema Timeline State
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [videoDuration, setVideoDuration] = useState<number>(35)
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false)
  const [isMuted, setIsMuted] = useState<boolean>(false)
  const [autoVoiceNarration, setAutoVoiceNarration] = useState<boolean>(true)
  const [hasEnded, setHasEnded] = useState<boolean>(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const lastSoundTriggerRef = useRef<number>(-1)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  // Simulator Specific States
  const [packedItems, setPackedItems] = useState<string[]>(['math_book', 'water_bottle'])
  const [selectedCoins, setSelectedCoins] = useState<number[]>([20, 10])
  const [chosenRoleplayOption, setChosenRoleplayOption] = useState<string | null>(null)

  // Voice Guidance State
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false)
  const [voiceRate, setVoiceRate] = useState<number>(1.0)
  const [voiceCharacter, setVoiceCharacter] = useState<'maya' | 'rohan'>('maya')
  const [subtitleText, setSubtitleText] = useState<string>('')

  // Practice Test State (matching Image 2)
  const [completedSteps, setCompletedSteps] = useState<number[]>([0, 1])
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null)
  const [hasCheckedAnswer, setHasCheckedAnswer] = useState<boolean>(false)

  // Determine current cartoon act (Act 1: 0-33%, Act 2: 33-66%, Act 3: 66-100%)
  const effectiveDuration = videoDuration > 0 ? videoDuration : 35
  const currentAct = currentTime < effectiveDuration / 3 ? 1 : currentTime < (effectiveDuration * 2) / 3 ? 2 : 3

  // Clean up speech synthesis & ticker
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isOpen])

  // Reset states when closed or when track changes
  useEffect(() => {
    if (!isOpen) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
      if (timerRef.current) clearInterval(timerRef.current)
      setIsSpeaking(false)
      setIsVideoPlaying(false)
      setCurrentTime(0)
      setHasEnded(false)
      setSubtitleText('')
      if (videoRef.current) {
        videoRef.current.pause()
        videoRef.current.currentTime = 0
      }
    }
  }, [isOpen, track?.id])

  // Spoken voice engine
  const speakText = (text: string) => {
    if (isMuted || typeof window === 'undefined' || !('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    setIsSpeaking(true)
    setSubtitleText(text)

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = voiceRate
    utterance.pitch = voiceCharacter === 'maya' ? 1.2 : 0.95

    const voices = window.speechSynthesis.getVoices()
    const matchVoice = voices.find(
      (v) =>
        v.lang.includes('en-IN') ||
        v.lang.includes('en-GB') ||
        v.lang.includes('en-US') ||
        v.lang.startsWith('en')
    )
    if (matchVoice) utterance.voice = matchVoice

    utterance.onend = () => {
      setIsSpeaking(false)
    }
    utterance.onerror = () => {
      setIsSpeaking(false)
    }

    window.speechSynthesis.speak(utterance)
  }

  const stopVoice = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    setIsSpeaking(false)
  }

  // Synchronize chapter sound effects and subtitles based on currentTime
  useEffect(() => {
    if (!track) return
    const sec = Math.floor(currentTime)
    if (sec !== lastSoundTriggerRef.current) {
      lastSoundTriggerRef.current = sec
      if (sec === 1) {
        playKidSound('chime')
        if (autoVoiceNarration && isVideoPlaying && !isMuted) {
          speakText(`${studentFirstName}'s Challenge: ${track.realLifeScenario}`)
        }
      }
      if (sec === Math.floor(videoDuration / 3)) {
        playKidSound('step')
        if (autoVoiceNarration && isVideoPlaying && !isMuted) {
          speakText(`5 Action Steps: ${track.workedExample.steps[0]}`)
        }
      }
      if (sec === Math.floor((videoDuration * 2) / 3)) {
        playKidSound('step')
        if (autoVoiceNarration && isVideoPlaying && !isMuted) {
          speakText(`Victory Rule: ${track.workedExample.takeaway}`)
        }
      }
    }

    if (currentAct === 1) {
      setSubtitleText(`${studentFirstName}'s Challenge: ${track.realLifeScenario}`)
    } else if (currentAct === 2) {
      setSubtitleText(`5 Action Steps: ${track.workedExample.steps[0]}`)
    } else {
      setSubtitleText(`Victory Achieved: ${track.workedExample.takeaway}`)
    }
  }, [currentTime, currentAct, track, videoDuration, autoVoiceNarration, isVideoPlaying, isMuted, studentFirstName])

  if (!isOpen || !track) return null

  // Play / Pause toggle
  const togglePlay = () => {
    if (hasEnded) {
      if (videoRef.current) {
        videoRef.current.currentTime = 0
        videoRef.current.muted = isMuted
        videoRef.current.volume = 1.0
        videoRef.current.play().catch(() => {})
      }
      setCurrentTime(0)
      setHasEnded(false)
      setIsVideoPlaying(true)
      playKidSound('chime')
      return
    }

    if (isVideoPlaying) {
      if (videoRef.current) {
        videoRef.current.pause()
      }
      setIsVideoPlaying(false)
      stopVoice()
    } else {
      if (videoRef.current) {
        videoRef.current.muted = isMuted
        videoRef.current.volume = 1.0
        videoRef.current.play().catch(() => {})
      }
      setIsVideoPlaying(true)
      playKidSound('pop')
    }
  }

  const restartStory = () => {
    stopVoice()
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.muted = isMuted
      videoRef.current.volume = 1.0
      videoRef.current.play().catch(() => {})
    }
    setCurrentTime(0)
    setHasEnded(false)
    setIsVideoPlaying(true)
    playKidSound('chime')
  }

  // Simulator Handlers
  const togglePackItem = (id: string, weightKg: number) => {
    playKidSound('pop')
    if (packedItems.includes(id)) {
      setPackedItems(packedItems.filter((i) => i !== id))
    } else {
      const updated = [...packedItems, id]
      setPackedItems(updated)
      if (updated.length === 4) {
        setEarnedXP((prev) => Math.min(150, prev + 25))
        setTimeout(() => playKidSound('success'), 200)
      }
    }
  }

  const toggleCoin = (value: number) => {
    playKidSound('cash')
    const updated = [...selectedCoins, value]
    setSelectedCoins(updated)
    const currentTotal = updated.reduce((a, b) => a + b, 0)
    if (currentTotal === 35) {
      setEarnedXP((prev) => Math.min(150, prev + 30))
      setTimeout(() => playKidSound('success'), 200)
    }
  }

  const clearCoins = () => {
    playKidSound('pop')
    setSelectedCoins([])
  }

  const toggleStep = (idx: number) => {
    playKidSound('step')
    if (completedSteps.includes(idx)) {
      setCompletedSteps(completedSteps.filter((s) => s !== idx))
    } else {
      const nextSteps = [...completedSteps, idx]
      setCompletedSteps(nextSteps)
      setEarnedXP((prev) => Math.min(150, prev + 15))
      if (nextSteps.length === track.workedExample.steps.length) {
        setTimeout(() => playKidSound('success'), 200)
      }
    }
  }

  const handleSelectOption = (optId: string) => {
    setSelectedOptionId(optId)
    setHasCheckedAnswer(true)
    const isOptCorrect = optId === track.assessment.correctOptionId

    if (isOptCorrect) {
      setEarnedXP((prev) => Math.min(150, prev + 50))
      playKidSound('success')
      speakText(`Correct! ${track.assessment.reasoningFeedback}`)
    } else {
      playKidSound('pop')
      speakText(`Good try! Let's check why: ${track.assessment.reasoningFeedback}`)
    }
  }

  const formatTime = (secs: number) => {
    const s = Math.floor(secs % 60)
    const m = Math.floor(secs / 60)
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  const isCorrect = selectedOptionId === track.assessment.correctOptionId
  const cartoonScene = getTrackCartoonScene(track.category)
  const motionVideoUrl = getTrackMotionVideo(track.category)

  // Calculate pack simulator total weight
  const BACKPACK_ITEMS = [
    { id: 'math_book', name: "Tomorrow's Textbooks (Math & Science)", icon: '📚', weight: 0.8, required: true },
    { id: 'pencil_box', name: 'Sharpened Pencil Box & Scale', icon: '✏️', weight: 0.3, required: true },
    { id: 'water_bottle', name: 'Clean Filled Water Bottle (750ml)', icon: '💧', weight: 0.7, required: true },
    { id: 'lunch_box', name: 'Healthy Packed Lunch Box', icon: '🥪', weight: 0.5, required: true },
    { id: 'comic_book', name: 'Thick Comic Book (Not on Timetable)', icon: '🎮', weight: 0.6, required: false },
    { id: 'heavy_encyclopedia', name: 'Heavy Unused Hardcover Encyclopedia', icon: '🧱', weight: 1.6, required: false },
  ]

  const totalBagWeight = packedItems.reduce((acc, id) => {
    const item = BACKPACK_ITEMS.find((b) => b.id === id)
    return acc + (item?.weight || 0)
  }, 0)

  const requiredPackedCount = packedItems.filter((id) =>
    BACKPACK_ITEMS.find((b) => b.id === id && b.required)
  ).length

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[95vh] flex flex-col font-sans">
        
        {/* ============================================================== */}
        {/* 1. TALENTXCEL BRAND HEADER (MATCHING IMAGE 2 DESIGN SYSTEM)     */}
        {/* ============================================================== */}
        <div className="px-5 py-3.5 bg-white border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-black text-slate-900 tracking-tight">
                Talent<span className="text-blue-600">Xcel</span>
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <span className="text-slate-300">|</span>
              <span className="hover:text-slate-700">Class {track.classNumber} Life Skills</span>
              <span className="text-slate-300">&gt;</span>
              <span className="text-slate-800 font-semibold truncate max-w-xs">{track.classSpecificTitle}</span>
            </div>
          </div>

          {/* Indicators matching Image 2 */}
          <div className="flex items-center gap-2 sm:gap-2.5 self-end sm:self-center flex-wrap">
            {/* Dynamic Learner Profile Pill */}
            <div className="px-3 py-1 bg-blue-50 border border-blue-200 rounded-full flex items-center gap-1.5 text-xs text-blue-900 shadow-2xs group hover:border-blue-400 transition-colors">
              <User className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="text-slate-500 font-medium hidden md:inline">Learner:</span>
              <input
                type="text"
                value={studentName}
                onChange={(e) => handleUpdateStudentName(e.target.value)}
                className="bg-transparent font-bold text-xs text-blue-950 focus:outline-none border-b border-dashed border-blue-400 hover:border-blue-600 focus:border-blue-600 max-w-[110px] sm:max-w-[140px] px-0.5"
                placeholder="Student Name"
                title="Click to edit learner name for certificates"
              />
              <Edit3 className="w-3 h-3 text-blue-400 group-hover:text-blue-600 shrink-0" />
            </div>

            <div className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-full flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-700 shadow-2xs">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span>08:24</span>
            </div>

            <div className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-xs font-bold text-slate-700 shadow-2xs">
              <span>Question 1 / 5</span>
            </div>

            <div className="px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-full flex items-center gap-1 text-xs font-bold text-amber-900 shadow-2xs">
              <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span>{earnedXP} XP</span>
            </div>

            <button
              onClick={() => {
                stopVoice()
                onClose()
              }}
              className="px-3.5 py-1 rounded-full border border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors shadow-2xs ml-1"
            >
              Exit
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 2. TALENTXCEL SEGMENTED TABS                                   */}
        {/* ============================================================== */}
        <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs font-bold shrink-0">
          <button
            onClick={() => {
              setActiveTab('video')
              playKidSound('pop')
            }}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap shadow-2xs ${
              activeTab === 'video'
                ? 'bg-blue-600 text-white font-black shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span>🎬</span>
            <span>Animated Cartoon Video</span>
            <Badge className="bg-amber-400 text-slate-950 text-[9px] py-0 px-1 font-black ml-0.5">
              3D Story
            </Badge>
          </button>

          <button
            onClick={() => {
              setActiveTab('practice')
              playKidSound('pop')
            }}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap shadow-2xs ${
              activeTab === 'practice'
                ? 'bg-blue-600 text-white font-black shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span>📝</span>
            <span>Practice Test &amp; Steps</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('simulator')
              playKidSound('pop')
            }}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap shadow-2xs ${
              activeTab === 'simulator'
                ? 'bg-blue-600 text-white font-black shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span>🎮</span>
            <span>Hands-On Game</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('certificate')
              playKidSound('pop')
            }}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap shadow-2xs ${
              activeTab === 'certificate'
                ? 'bg-blue-600 text-white font-black shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span>🏆</span>
            <span>Certificate &amp; Fridge Mission</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('workshop')
              playKidSound('pop')
            }}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap shadow-2xs ${
              activeTab === 'workshop'
                ? 'bg-blue-600 text-white font-black shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-indigo-500" />
            <span>Capstone Project</span>
          </button>
        </div>

        {/* ============================================================== */}
        {/* 3. TAB BODY CONTENT                                            */}
        {/* ============================================================== */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 bg-slate-50/50">

          {/* ------------------------------------------------------------ */}
          {/* ------------------------------------------------------------ */}
          {/* TAB 1: 🎬 ANIMATED CARTOON LESSON (CLEAN YOUTUBE-STYLE)      */}
          {/* ------------------------------------------------------------ */}
          {activeTab === 'video' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* TOP BAR: TRACK TITLE & PLAYER SOURCE SWITCHER */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-1.5">
                      <span>🎬</span>
                      <span>{track.classSpecificTitle}</span>
                    </span>
                    <Badge className="bg-blue-100 text-blue-700 font-extrabold text-[11px] px-2.5 py-0.5 border-0">
                      Class {track.classNumber}
                    </Badge>
                    <Badge className="bg-emerald-100 text-emerald-700 font-extrabold text-[11px] px-2 py-0.5 border-0 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                      <span>3D Animated Story</span>
                    </Badge>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {videoSourceMode === 'motion'
                      ? 'TalentXcel 3D Animated Motion Film · High-Definition Pixar Style'
                      : `Streaming: ${selectedYtVideo.title} (${selectedYtVideo.channel})`}
                  </p>
                </div>

                {/* Switcher Pill: YouTube Animated Lesson vs 3D TalentXcel Studio */}
                <div className="flex items-center gap-1 p-1 bg-slate-200/80 rounded-xl self-start sm:self-auto shrink-0 shadow-inner">
                  <button
                    onClick={() => {
                      setVideoSourceMode('youtube')
                      setIsVideoPlaying(false)
                      if (videoRef.current) videoRef.current.pause()
                      playKidSound('pop')
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      videoSourceMode === 'youtube'
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'text-slate-700 hover:text-slate-950 hover:bg-slate-300/50'
                    }`}
                  >
                    <Youtube className="w-3.5 h-3.5 fill-current" />
                    <span>📺 YouTube Animated Lesson</span>
                  </button>

                  <button
                    onClick={() => {
                      setVideoSourceMode('motion')
                      playKidSound('pop')
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      videoSourceMode === 'motion'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-700 hover:text-slate-950 hover:bg-slate-300/50'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 fill-current" />
                    <span>🎬 3D TalentXcel Studio</span>
                  </button>
                </div>
              </div>

              {/* 4-STEP MASTERY LEARNING JOURNEY */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold">
                <button
                  onClick={() => {
                    setActiveTab('video')
                    playKidSound('pop')
                  }}
                  className="p-2.5 rounded-xl border bg-blue-600 text-white border-blue-700 shadow-xs flex items-center gap-2 text-left"
                >
                  <span className="w-5 h-5 rounded-full bg-white/20 text-center leading-5 text-[10px] font-black shrink-0">1</span>
                  <div className="truncate">
                    <span className="block text-[10px] text-blue-200 uppercase font-black">Step 1</span>
                    <span className="truncate">🎬 Active Cartoon</span>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('simulator')
                    playKidSound('pop')
                  }}
                  className="p-2.5 rounded-xl border bg-white hover:bg-slate-50 border-slate-200 text-slate-800 shadow-2xs flex items-center gap-2 text-left hover:border-blue-300 transition-all"
                >
                  <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 text-center leading-5 text-[10px] font-black shrink-0">2</span>
                  <div className="truncate">
                    <span className="block text-[10px] text-amber-600 uppercase font-black">Step 2</span>
                    <span className="truncate">🎮 Live Simulator Lab</span>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('practice')
                    playKidSound('pop')
                  }}
                  className="p-2.5 rounded-xl border bg-white hover:bg-slate-50 border-slate-200 text-slate-800 shadow-2xs flex items-center gap-2 text-left hover:border-blue-300 transition-all"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-900 text-center leading-5 text-[10px] font-black shrink-0">3</span>
                  <div className="truncate">
                    <span className="block text-[10px] text-emerald-600 uppercase font-black">Step 3</span>
                    <span className="truncate">📝 Socratic Decision</span>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('certificate')
                    playKidSound('pop')
                  }}
                  className="p-2.5 rounded-xl border bg-white hover:bg-slate-50 border-slate-200 text-slate-800 shadow-2xs flex items-center gap-2 text-left hover:border-blue-300 transition-all"
                >
                  <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-900 text-center leading-5 text-[10px] font-black shrink-0">4</span>
                  <div className="truncate">
                    <span className="block text-[10px] text-purple-600 uppercase font-black">Step 4</span>
                    <span className="truncate">🏆 Official Credential</span>
                  </div>
                </button>
              </div>

              {/* WHY TALENTXCEL BEATS FREE YOUTUBE - PARENT & SCHOOL VALUE STRIP */}
              <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white rounded-2xl p-3.5 sm:p-4 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border border-slate-800">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge className="bg-amber-400 text-slate-950 font-black text-[10px] px-2 py-0.2">
                      WHY SUBSCRIBE VS FREE YOUTUBE
                    </Badge>
                    <span className="text-xs font-bold text-blue-200">
                      Active Mastery vs Passive Screen Time
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    YouTube is passive video with distracting ads. TalentXcel combines cartoons with real digital simulators, home fridge contracts &amp; school-accredited certificates.
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap text-[10px] font-bold shrink-0">
                  <span className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-lg text-emerald-300 border border-white/10">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" /> 100% Ad &amp; Brainrot Free
                  </span>
                  <span className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-lg text-amber-200 border border-white/10">
                    <Zap className="w-3 h-3 text-amber-400" /> Hands-On Game Lab
                  </span>
                  <span className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-lg text-blue-200 border border-white/10">
                    <Award className="w-3 h-3 text-blue-400" /> CBSE Portfolio Certificate
                  </span>
                </div>
              </div>

              {/* VIDEO PLAYER CONTAINER (100% CLEAN, ZERO OVERLAYS) */}
              <div className="relative aspect-video rounded-3xl overflow-hidden bg-black border-2 border-slate-300 shadow-2xl">
                {videoSourceMode === 'youtube' ? (
                  /* --- 100% UNRESTRICTED YOUTUBE ANIMATED CARTOON PLAYER --- */
                  <iframe
                    key={selectedYtVideo.id}
                    src={`https://www.youtube.com/embed/${selectedYtVideo.id}?rel=0&modestbranding=1&controls=1`}
                    title={selectedYtVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : (
                  /* --- TALENTXCEL 3D MOTION VIDEO PLAYER (CLEAN, NO CLUTTER) --- */
                  <div className="relative w-full h-full group bg-black flex flex-col justify-between">
                    <video
                      ref={videoRef}
                      key={motionVideoUrl}
                      src={motionVideoUrl}
                      playsInline
                      preload="auto"
                      muted={isMuted}
                      onTimeUpdate={() => {
                        if (videoRef.current) {
                          const t = videoRef.current.currentTime
                          setCurrentTime(t)
                          if (videoRef.current.duration && !isNaN(videoRef.current.duration)) {
                            setVideoDuration(videoRef.current.duration)
                          }
                        }
                      }}
                      onLoadedMetadata={() => {
                        if (videoRef.current?.duration && !isNaN(videoRef.current.duration)) {
                          setVideoDuration(videoRef.current.duration)
                        }
                      }}
                      onPlay={() => setIsVideoPlaying(true)}
                      onPause={() => setIsVideoPlaying(false)}
                      onEnded={() => {
                        setIsVideoPlaying(false)
                        setHasEnded(true)
                        setEarnedXP((xp) => Math.min(150, xp + 50))
                        playKidSound('success')
                      }}
                      className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Floating Unmute Alert if Muted */}
                    {isMuted && isVideoPlaying && (
                      <button
                        onClick={() => {
                          setIsMuted(false)
                          if (videoRef.current) {
                            videoRef.current.muted = false
                            videoRef.current.volume = 1.0
                          }
                          playKidSound('pop')
                        }}
                        className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black shadow-lg flex items-center gap-1.5 animate-bounce border border-amber-300 cursor-pointer"
                      >
                        <VolumeX className="w-3.5 h-3.5 text-slate-950" />
                        <span>Sound is Muted · Click to Unmute Voice</span>
                      </button>
                    )}

                    {/* Centered Minimal Play Button when Paused (YouTube Style) */}
                    {!isVideoPlaying && !hasEnded && (
                      <div
                        onClick={togglePlay}
                        className="absolute inset-0 z-20 bg-black/30 backdrop-blur-2xs flex items-center justify-center cursor-pointer transition-all hover:bg-black/20"
                      >
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-2xl transition-transform transform hover:scale-110 active:scale-95 border-2 border-white/80">
                          <Play className="w-8 h-8 fill-white ml-1" />
                        </div>
                      </div>
                    )}

                    {/* Minimal YouTube-Style Bottom Bar */}
                    <div className="relative z-10 mt-auto p-3 bg-gradient-to-t from-black/95 via-black/70 to-transparent space-y-1.5">
                      {/* Scrubber */}
                      <div
                        onClick={(e) => {
                          if (!videoRef.current) return
                          const rect = e.currentTarget.getBoundingClientRect()
                          const clickPos = (e.clientX - rect.left) / rect.width
                          const maxDur = videoDuration || 35
                          const targetTime = Math.min(maxDur, Math.max(0, clickPos * maxDur))
                          videoRef.current.currentTime = targetTime
                          setCurrentTime(targetTime)
                          setHasEnded(false)
                          playKidSound('pop')
                        }}
                        className="w-full h-2 bg-white/30 rounded-full overflow-hidden cursor-pointer relative hover:h-2.5 transition-all"
                      >
                        <div
                          className="h-full bg-red-600 transition-all rounded-full"
                          style={{ width: `${(currentTime / (videoDuration || 1)) * 100}%` }}
                        />
                      </div>

                      {/* Controls Row */}
                      <div className="flex items-center justify-between text-white text-xs pt-1">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={togglePlay}
                            className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all"
                            title={isVideoPlaying ? 'Pause' : 'Play'}
                          >
                            {isVideoPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
                          </button>

                          <button
                            onClick={restartStory}
                            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                            title="Replay from start"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </button>

                          <span className="font-mono text-[11px] text-slate-300 ml-1">
                            {formatTime(currentTime)} / {formatTime(videoDuration)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              const nextAuto = !autoVoiceNarration
                              setAutoVoiceNarration(nextAuto)
                              if (!nextAuto) stopVoice()
                              playKidSound('pop')
                            }}
                            className={`px-2 py-1 rounded-md text-[10px] font-bold border transition-colors flex items-center gap-1 ${
                              autoVoiceNarration
                                ? 'bg-blue-600/80 border-blue-400 text-white'
                                : 'bg-white/10 border-white/20 text-slate-300'
                            }`}
                            title="Auto-narrate lesson story steps aloud"
                          >
                            <span>🎙️ Narration: {autoVoiceNarration ? 'ON' : 'OFF'}</span>
                          </button>

                          <button
                            onClick={() => {
                              const nextMuted = !isMuted
                              setIsMuted(nextMuted)
                              if (videoRef.current) {
                                videoRef.current.muted = nextMuted
                                videoRef.current.volume = 1.0
                              }
                              if (!nextMuted) stopVoice()
                            }}
                            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                            title={isMuted ? 'Unmute' : 'Mute'}
                          >
                            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                          </button>

                          <button
                            onClick={() => {
                              if (!videoRef.current) return
                              if (document.fullscreenElement) {
                                document.exitFullscreen().catch(() => {})
                              } else {
                                videoRef.current.requestFullscreen().catch(() => {})
                              }
                            }}
                            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                            title="Fullscreen"
                          >
                            <Maximize className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* EPISODE SELECTOR & OPEN-WEB VIDEO LIBRARY */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                      <span>📺</span> Curated Open-Web Cartoon Lessons
                    </span>
                    <Badge className="bg-rose-100 text-rose-700 font-bold text-[10px] px-2 py-0.2 border-0">
                      {categoryVideos.length} Episodes
                    </Badge>
                  </div>
                  <button
                    onClick={() => setIsCustomInputOpen(!isCustomInputOpen)}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 self-start sm:self-auto"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{isCustomInputOpen ? 'Close Link Box' : 'Load Any YouTube Video Link'}</span>
                  </button>
                </div>

                {/* Custom Video Link Input Drawer */}
                {isCustomInputOpen && (
                  <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200 space-y-2 animate-in fade-in duration-150">
                    <div className="text-[11px] font-bold text-blue-900">
                      Paste any educational YouTube link or video ID:
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={customYtInput}
                        onChange={(e) => setCustomYtInput(e.target.value)}
                        placeholder="e.g. https://www.youtube.com/watch?v=9KKRVuQxvcc or 9KKRVuQxvcc"
                        className="flex-1 text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                      />
                      <Button
                        size="sm"
                        onClick={() => {
                          if (!customYtInput.trim()) return
                          let videoId = customYtInput.trim()
                          if (videoId.includes('v=')) {
                            videoId = videoId.split('v=')[1].split('&')[0]
                          } else if (videoId.includes('youtu.be/')) {
                            videoId = videoId.split('youtu.be/')[1].split('?')[0]
                          }
                          setSelectedYtVideo({
                            id: videoId,
                            title: 'Custom Educational Lesson',
                            channel: 'YouTube Creator',
                            durationText: 'Custom',
                            badge: 'Custom Video'
                          })
                          setVideoSourceMode('youtube')
                          playKidSound('success')
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-8 px-4 rounded-lg"
                      >
                        Play Now
                      </Button>
                    </div>
                  </div>
                )}

                {/* Episode Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {categoryVideos.map((ep) => {
                    const isSelected = videoSourceMode === 'youtube' && selectedYtVideo.id === ep.id
                    return (
                      <button
                        key={ep.id}
                        onClick={() => {
                          setSelectedYtVideo(ep)
                          setVideoSourceMode('youtube')
                          playKidSound('pop')
                        }}
                        className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between gap-2 shadow-2xs ${
                          isSelected
                            ? 'bg-rose-50/80 border-rose-400 ring-2 ring-rose-400'
                            : 'bg-slate-50/80 hover:bg-white border-slate-200'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center justify-between gap-1">
                            <Badge className={`text-[9px] px-1.5 py-0 font-bold border-0 ${
                              isSelected ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-700'
                            }`}>
                              {ep.badge}
                            </Badge>
                            <span className="text-[10px] font-mono font-semibold text-slate-500">
                              {ep.durationText}
                            </span>
                          </div>
                          <p className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">
                            {ep.title}
                          </p>
                        </div>
                        <div className="text-[10px] font-semibold text-slate-500 flex items-center justify-between pt-1 border-t border-slate-200/60">
                          <span className="truncate">{ep.channel}</span>
                          {isSelected && <span className="text-rose-600 font-extrabold">▶ Playing</span>}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* YOUTUBE-STYLE LESSON HUB (BELOW THE PLAYER) */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-5">
                {/* 1. STUDENT CHALLENGE & SCENARIO CARD */}
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
                      <span>🎒</span> {studentFirstName}&apos;s Real-Life Challenge
                    </span>
                    <Badge className="bg-amber-400 text-slate-950 font-black text-[11px] px-2.5 py-0.5">
                      +50 XP
                    </Badge>
                  </div>
                  <p className="text-sm font-bold text-slate-900 leading-relaxed">
                    &quot;{track.realLifeScenario}&quot;
                  </p>
                </div>

                {/* 2. COACH MAYA'S 5 ACTION STEPS (NUMBERED INTERACTIVE CHECKLIST) */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black uppercase text-blue-700 tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                      <span>Coach Maya&apos;s 5 Action Steps for {studentFirstName}</span>
                    </h4>
                    <span className="text-[11px] font-semibold text-slate-400">Class {track.classNumber} Life Skills</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {track.workedExample.steps.map((step, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200 transition-all flex items-start gap-3 text-xs text-slate-800"
                      >
                        <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                          {idx + 1}
                        </span>
                        <span className="font-semibold leading-relaxed pt-0.5">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. KEY TAKEAWAY & VICTORY RULE */}
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-start gap-3">
                  <Award className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="space-y-0.5 text-xs">
                    <div className="font-black text-emerald-800 uppercase tracking-wide">
                      ⭐ Life-Skill Victory Rule
                    </div>
                    <p className="font-bold text-sm leading-snug">{track.workedExample.takeaway}</p>
                  </div>
                </div>

                {/* 4. SPOKEN AUDIO COACH STATION */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center text-lg shrink-0">
                        🎙️
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">
                          Spoken Audio Coach · {voiceCharacter === 'maya' ? 'Coach Maya' : 'Coach Rohan'}
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          Listen to spoken step-by-step guidance aloud with voice synthesis.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setVoiceCharacter(voiceCharacter === 'maya' ? 'rohan' : 'maya')}
                        className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold"
                      >
                        {voiceCharacter === 'maya' ? 'Maya (Female)' : 'Rohan (Male)'}
                      </button>

                      <Button
                        size="sm"
                        onClick={() => {
                          if (isSpeaking) {
                            stopVoice()
                          } else {
                            speakText(`Welcome to ${track.classSpecificTitle}! Here is ${studentFirstName}'s challenge: ${track.realLifeScenario}. Follow the 5 practical checkpoints to solve it with confidence. ${track.workedExample.takeaway}`)
                          }
                        }}
                        className={`text-xs font-bold rounded-xl h-8 px-3 flex items-center gap-1.5 ${
                          isSpeaking
                            ? 'bg-rose-600 hover:bg-rose-700 text-white'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                      >
                        {isSpeaking ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5" />
                            <span>Pause Voice</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Play Voice</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-200/60">
                    <span>Playback Speed:</span>
                    <div className="flex items-center gap-1">
                      {[0.9, 1.0, 1.2].map((r) => (
                        <button
                          key={r}
                          onClick={() => setVoiceRate(r)}
                          className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                            voiceRate === r ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {r}x
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ======================================================== */}
              {/* INTERACTIVE SOCRATIC DECISION CHECKPOINT (DIRECT ON TAB 1) */}
              {/* ======================================================== */}
              <div className="bg-white rounded-2xl border-2 border-blue-400 p-5 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center text-sm font-black shadow-xs">
                      ⚡
                    </span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-black text-slate-900">
                        Interactive Socratic Decision Checkpoint · Active Learning
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Solve this real-life decision for {studentFirstName} to earn practical XP:
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-amber-400 text-slate-950 font-black text-[11px] px-2.5 py-0.5 self-start sm:self-auto">
                    +25 XP Checkpoint
                  </Badge>
                </div>

                <div className="p-3.5 bg-blue-50/70 rounded-xl border border-blue-100 text-xs sm:text-sm font-bold text-blue-950 leading-relaxed">
                  &quot;{track.assessment.question}&quot;
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {track.assessment.options.map((opt, idx) => {
                    const letter = ['A', 'B', 'C', 'D'][idx] || String.fromCharCode(65 + idx)
                    const isSelected = selectedOptionId === opt.id
                    const isOptCorrect = opt.id === track.assessment.correctOptionId
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectOption(opt.id)}
                        className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all flex items-start gap-2.5 shadow-2xs ${
                          hasCheckedAnswer && isSelected
                            ? isOptCorrect
                              ? 'bg-emerald-50 border-emerald-400 text-emerald-950 ring-2 ring-emerald-300'
                              : 'bg-rose-50 border-rose-400 text-rose-950 ring-2 ring-rose-300'
                            : 'bg-slate-50 hover:bg-blue-50/50 hover:border-blue-300 border-slate-200 text-slate-800'
                        }`}
                      >
                        <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                          {letter}
                        </span>
                        <span className="leading-snug pt-0.5">{opt.text}</span>
                      </button>
                    )
                  })}
                </div>

                {hasCheckedAnswer && (
                  <div className={`p-3.5 rounded-xl border text-xs font-bold flex items-start gap-2.5 animate-in fade-in ${
                    isCorrect ? 'bg-emerald-50 text-emerald-950 border-emerald-300' : 'bg-amber-50 text-amber-950 border-amber-300'
                  }`}>
                    <span className="text-lg">{isCorrect ? '🎉' : '💡'}</span>
                    <div className="space-y-0.5">
                      <div className="font-black text-sm">{isCorrect ? 'Splendid Decision!' : 'Good Reflection!'}</div>
                      <p className="font-medium text-slate-700 leading-relaxed">{track.assessment.reasoningFeedback}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* ======================================================== */}
              {/* THREE HIGH-VALUE ACTION CTAS (PROVING EDTECH VALUE)      */}
              {/* ======================================================== */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => {
                    setActiveTab('simulator')
                    playKidSound('pop')
                  }}
                  className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md hover:scale-101 active:scale-99 transition-all text-left flex flex-col justify-between gap-3 group"
                >
                  <div className="space-y-1">
                    <span className="text-2xl block group-hover:scale-110 transition-transform">🎮</span>
                    <h5 className="font-black text-xs sm:text-sm">
                      {track.category === 'life_independence' ? 'Live Bag Weight Lab' : 'Hands-On Simulator'}
                    </h5>
                    <p className="text-[11px] text-blue-100 leading-snug">
                      Touch, test and balance on real digital simulators.
                    </p>
                  </div>
                  <div className="text-[11px] font-bold text-amber-300 flex items-center gap-1">
                    <span>Launch Game Lab (+50 XP) ➔</span>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('certificate')
                    playKidSound('pop')
                  }}
                  className="p-4 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md hover:scale-101 active:scale-99 transition-all text-left flex flex-col justify-between gap-3 group"
                >
                  <div className="space-y-1">
                    <span className="text-2xl block group-hover:scale-110 transition-transform">🏆</span>
                    <h5 className="font-black text-xs sm:text-sm">
                      Official Certificate
                    </h5>
                    <p className="text-[11px] text-amber-100 leading-snug">
                      Accredited credential awarded to {studentFirstName} with QR verification.
                    </p>
                  </div>
                  <div className="text-[11px] font-bold text-white flex items-center gap-1">
                    <span>View &amp; Print PDF ➔</span>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('certificate')
                    playKidSound('pop')
                  }}
                  className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white shadow-md hover:scale-101 active:scale-99 transition-all text-left flex flex-col justify-between gap-3 group"
                >
                  <div className="space-y-1">
                    <span className="text-2xl block group-hover:scale-110 transition-transform">📋</span>
                    <h5 className="font-black text-xs sm:text-sm">
                      Home Refrigerator Card
                    </h5>
                    <p className="text-[11px] text-emerald-100 leading-snug">
                      Printable weekend habit checklist for parents at home.
                    </p>
                  </div>
                  <div className="text-[11px] font-bold text-white flex items-center gap-1">
                    <span>Print Home Contract ➔</span>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------ */}
          {/* TAB 2: 📝 PRACTICE TEST (EXACT IMAGE 2 TWO-COLUMN LAYOUT)    */}
          {/* ------------------------------------------------------------ */}
          {activeTab === 'practice' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-in fade-in duration-200">
              {/* ======================================================== */}
              {/* LEFT COLUMN: QUESTION CARD (lg:col-span-7)               */}
              {/* ======================================================== */}
              <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Question 1
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1 leading-snug">
                    {track.assessment.question}
                  </h3>
                </div>

                {/* Options List (A, B, C, D pills matching Image 2) */}
                <div className="space-y-3">
                  {track.assessment.options.map((opt, idx) => {
                    const letter = ['A', 'B', 'C', 'D'][idx] || String.fromCharCode(65 + idx)
                    const isSelected = selectedOptionId === opt.id
                    const isCorrectOpt = opt.isCorrect

                    let cardStyle = 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60 text-slate-800'
                    let circleStyle = 'border-slate-300 bg-slate-100 text-slate-700'

                    if (hasCheckedAnswer) {
                      if (isCorrectOpt) {
                        cardStyle = 'border-emerald-500 bg-emerald-50/70 ring-2 ring-emerald-500/20 text-emerald-950 font-medium'
                        circleStyle = 'border-emerald-500 bg-emerald-500 text-white font-bold'
                      } else if (isSelected && !isCorrectOpt) {
                        cardStyle = 'border-rose-400 bg-rose-50/70 ring-2 ring-rose-400/20 text-rose-950 font-medium'
                        circleStyle = 'border-rose-400 bg-rose-500 text-white font-bold'
                      }
                    } else if (isSelected) {
                      cardStyle = 'border-blue-500 bg-blue-50/70 ring-2 ring-blue-500/20 text-blue-950 font-medium'
                      circleStyle = 'border-blue-500 bg-blue-600 text-white font-bold'
                    }

                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectOption(opt.id)}
                        className={`w-full p-4 rounded-xl border text-left transition-all flex items-center gap-3.5 shadow-2xs ${cardStyle}`}
                      >
                        <span className={`w-8 h-8 rounded-full border flex items-center justify-center font-bold text-xs shrink-0 ${circleStyle}`}>
                          {letter}
                        </span>
                        <span className="text-sm font-medium leading-relaxed flex-1">
                          {opt.text}
                        </span>
                      </button>
                    )
                  })}
                </div>

                {/* Green Feedback Banner when Answered (matching Image 2) */}
                {hasCheckedAnswer && (
                  <div
                    className={`p-4 rounded-xl border space-y-1 animate-in fade-in ${
                      isCorrect
                        ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                        : 'bg-amber-50/80 border-amber-300 text-amber-950'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-xs">
                      <CheckCircle2 className={`w-4 h-4 ${isCorrect ? 'text-emerald-600' : 'text-amber-600'}`} />
                      <span className={isCorrect ? 'text-emerald-700' : 'text-amber-800'}>
                        {isCorrect ? 'Correct!' : 'Good try! Practical takeaway:'}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed font-medium">
                      {track.assessment.reasoningFeedback}
                    </p>
                  </div>
                )}

                {/* Bottom Navigation Buttons (matching Image 2) */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <Button
                    variant="outline"
                    onClick={() => {
                      playKidSound('pop')
                      setActiveTab('video')
                    }}
                    className="rounded-full px-5 py-2 text-xs font-semibold text-slate-700 border-slate-300 hover:bg-slate-50 shadow-2xs"
                  >
                    Previous
                  </Button>

                  <Button
                    onClick={() => {
                      playKidSound('step')
                      setActiveTab('simulator')
                    }}
                    className="rounded-full px-6 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
                  >
                    Next ➔
                  </Button>
                </div>
              </div>

              {/* ======================================================== */}
              {/* RIGHT COLUMN: EXPLANATION CARD (lg:col-span-5)           */}
              {/* ======================================================== */}
              <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
                {/* Sub-tabs: Explanation | Hint | Key Point */}
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <button
                    onClick={() => setExplanationSubTab('explanation')}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                      explanationSubTab === 'explanation'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Explanation
                  </button>
                  <button
                    onClick={() => setExplanationSubTab('hint')}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                      explanationSubTab === 'hint'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Hint
                  </button>
                  <button
                    onClick={() => setExplanationSubTab('keypoint')}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                      explanationSubTab === 'keypoint'
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Key Point
                  </button>
                </div>

                {/* Explanation Tab Body */}
                {explanationSubTab === 'explanation' && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Step by step explanation</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {track.whyItMatters}
                      </p>
                    </div>

                    {/* 5 Practical Worked Steps */}
                    <div className="space-y-2.5">
                      {track.workedExample.steps.map((st, i) => (
                        <div
                          key={i}
                          onClick={() => toggleStep(i)}
                          className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 transition-all cursor-pointer ${
                            completedSteps.includes(i)
                              ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 font-medium'
                              : 'bg-slate-50/60 border-slate-200 text-slate-700 hover:bg-slate-100/60'
                          }`}
                        >
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 ${
                            completedSteps.includes(i) ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'
                          }`}>
                            {completedSteps.includes(i) ? '✓' : i + 1}
                          </span>
                          <span className="leading-relaxed flex-1">{st}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Hint Tab Body */}
                {explanationSubTab === 'hint' && (
                  <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-2 text-xs text-blue-950">
                    <span className="font-bold block">💡 Practical Hint:</span>
                    <p className="leading-relaxed">
                      Before jumping to decisions, always verify the core checklist: {track.workedExample.takeaway}
                    </p>
                  </div>
                )}

                {/* Key Point Card (The exact yellow lightbulb card from Image 2!) */}
                <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200 space-y-1.5 shadow-2xs">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-amber-900">
                    <span>💡</span>
                    <span>Key Point</span>
                  </div>
                  <p className="text-xs font-medium text-amber-950 leading-relaxed">
                    {track.workedExample.takeaway}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------ */}
          {/* TAB 3: 🎮 HANDS-ON GAME (PRACTICAL SIMULATORS)               */}
          {/* ------------------------------------------------------------ */}
          {activeTab === 'simulator' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                      Real-Life Practical Challenge
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    Solve {studentFirstName}&apos;s Challenge with Hands-On Practice
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                    &quot;{track.realLifeScenario}&quot;
                  </p>
                </div>

                <div className="shrink-0 bg-blue-50 border border-blue-200 p-3 rounded-xl text-center">
                  <span className="text-[10px] uppercase font-bold text-blue-700 block">Reward</span>
                  <span className="text-base font-black text-blue-900 flex items-center justify-center gap-1">
                    <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span>+50 XP</span>
                  </span>
                </div>
              </div>

              {/* SIMULATOR A: INDEPENDENCE & ROUTINE (SMART BACKPACK LAB PILOT) */}
              {track.category === 'life_independence' && (
                <SmartBackpackLab
                  learnerName={studentName}
                  onComplete={(score) => {
                    setEarnedXP((prev) => Math.min(150, prev + score))
                    const { state } = loadBackpackAttempt()
                    setBackpackAttempt(state)
                  }}
                />
              )}

              {/* SIMULATOR B: MONEY MANAGEMENT (RUPEE CASH REGISTER) */}
              {track.category === 'life_money_management' && (
                <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 space-y-6 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">🪙</span>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900">
                          Interactive Rupee (₹) Cash Register &amp; Change Counter
                        </h4>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Purchase total is ₹65. The customer hands you a ₹100 note. Tap coins and notes to return exact change (₹35)!
                      </p>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-2xl flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Change Required</span>
                        <span className="text-base font-black text-blue-600">₹35.00</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <span className="text-xs font-bold text-slate-700 block">
                      Tap Currency to Place on the Counter:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                      {[
                        { label: '₹50 Note', value: 50, color: 'bg-cyan-50 border-cyan-400 text-cyan-900' },
                        { label: '₹20 Note', value: 20, color: 'bg-amber-50 border-amber-400 text-amber-900' },
                        { label: '₹10 Note', value: 10, color: 'bg-orange-50 border-orange-400 text-orange-900' },
                        { label: '₹5 Coin', value: 5, color: 'bg-emerald-50 border-emerald-400 text-emerald-900' },
                        { label: '₹2 Coin', value: 2, color: 'bg-slate-100 border-slate-400 text-slate-900' },
                      ].map((curr) => (
                        <button
                          key={curr.label}
                          onClick={() => toggleCoin(curr.value)}
                          className={`p-3 rounded-2xl border-2 font-bold text-xs text-center hover:scale-102 active:scale-98 transition-all shadow-2xs ${curr.color}`}
                        >
                          <span className="block text-base">💵</span>
                          <span>+ {curr.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">
                        Change Tray on Counter:
                      </span>
                      <button
                        onClick={clearCoins}
                        className="text-xs font-semibold text-rose-600 hover:underline flex items-center gap-1"
                      >
                        <RefreshCw className="w-3 h-3" /> Reset Tray
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 min-h-12 p-2 bg-white rounded-xl border border-dashed border-slate-300">
                      {selectedCoins.length === 0 ? (
                        <span className="text-xs text-slate-400 italic">No notes or coins on the counter yet. Tap currency above!</span>
                      ) : (
                        selectedCoins.map((val, idx) => (
                          <Badge key={idx} className="bg-blue-600 text-white font-bold text-xs py-1 px-2.5 shadow-2xs">
                            ₹{val}
                          </Badge>
                        ))
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs">
                      <span className="font-bold text-slate-600">Total Counted:</span>
                      <span className={`text-base font-black ${selectedCoins.reduce((a, b) => a + b, 0) === 35 ? 'text-emerald-600' : 'text-slate-900'}`}>
                        ₹{selectedCoins.reduce((a, b) => a + b, 0)} {selectedCoins.reduce((a, b) => a + b, 0) === 35 && '✓ (Exact Match!)'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* SIMULATOR C: GENERAL PRACTICAL DECISION LAB */}
              {track.category !== 'life_independence' && track.category !== 'life_money_management' && (
                <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 space-y-5 shadow-xs">
                  <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                    <span className="text-2xl">🌟</span>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900">
                        Interactive Practical Decision Lab
                      </h4>
                      <p className="text-xs text-slate-500">
                        {track.classSpecificTitle} · Practical Application Simulator
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-blue-600">
                      Scenario Prompt:
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed">
                      &quot;{track.realLifeScenario}&quot;
                    </p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-700 block">
                      Choose Your Real-Life Action Response:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        onClick={() => {
                          setChosenRoleplayOption('recommended')
                          setEarnedXP((prev) => Math.min(150, prev + 40))
                          playKidSound('success')
                        }}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                          chosenRoleplayOption === 'recommended'
                            ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-400 text-emerald-950 font-bold'
                            : 'border-slate-200 bg-white hover:border-blue-400 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold mb-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Recommended Action:</span>
                        </div>
                        <p className="text-xs leading-relaxed">
                          {track.workedExample.steps[0]} and {track.workedExample.steps[1]}
                        </p>
                      </button>

                      <button
                        onClick={() => {
                          setChosenRoleplayOption('reactive')
                          playKidSound('pop')
                        }}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                          chosenRoleplayOption === 'reactive'
                            ? 'border-rose-400 bg-rose-50 ring-2 ring-rose-400 text-rose-950 font-bold'
                            : 'border-slate-200 bg-white hover:border-blue-400 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 text-xs text-rose-600 font-bold mb-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>Impulsive / Passive Reaction:</span>
                        </div>
                        <p className="text-xs leading-relaxed">
                          Ignore preparation, wait until the last minute, or panic without following a checklist.
                        </p>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ------------------------------------------------------------ */}
          {/* TAB 4: 🏆 CERTIFICATE & HOME MISSION                         */}
          {/* ------------------------------------------------------------ */}
          {activeTab === 'certificate' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* SMART BACKPACK LAB PILOT: DYNAMIC ASSESSMENT RECORD */}
              {track.category === 'life_independence' ? (
                backpackAttempt && backpackAttempt.status === 'completed' && backpackAttempt.rubricScores ? (
                  /* --- 1. VERIFIED COMPLETED CREDENTIAL --- */
                  <div className="space-y-6">
                    <div className="relative rounded-3xl p-6 sm:p-8 bg-amber-50/50 border-4 border-amber-300 shadow-xl text-slate-900 space-y-5 text-center overflow-hidden">
                      <div className="space-y-1">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold uppercase tracking-widest border border-amber-300">
                          <Award className="w-3.5 h-3.5 text-amber-600" />
                          <span>Official TalentXcel Accredited Credential</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black font-serif tracking-tight text-slate-950 pt-1">
                          CERTIFICATE OF PRACTICAL INDEPENDENCE
                        </h3>
                        <p className="text-xs text-slate-600 italic">
                          Awarded under TalentXcel Life-Skills Framework · Class 4
                        </p>
                      </div>

                      <div className="py-2 space-y-1 border-y border-amber-200 max-w-lg mx-auto">
                        <span className="text-[11px] text-slate-500 uppercase tracking-wider block">
                          This certifies that
                        </span>
                        <input
                          type="text"
                          value={studentName}
                          onChange={(e) => handleUpdateStudentName(e.target.value)}
                          className="text-lg sm:text-xl font-bold font-serif text-blue-950 text-center bg-transparent border-b-2 border-blue-400 focus:outline-none w-full max-w-xs"
                          title="Edit Student Name for Certificate"
                        />
                        <p className="text-xs text-slate-700 leading-relaxed font-medium pt-1">
                          has successfully demonstrated validated practical competency in{' '}
                          <span className="font-bold text-slate-950">&quot;{track.classSpecificTitle}&quot;</span> (Class {track.classNumber}).
                        </p>
                      </div>

                      {/* Dynamic Credential Identifier and Rubric Total */}
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 text-xs text-slate-500 max-w-lg mx-auto">
                        <div className="text-left font-mono">
                          <span className="block text-[10px] text-slate-400">CREDENTIAL ID:</span>
                          <span className="font-bold text-slate-800 text-xs sm:text-sm">
                            {backpackAttempt.certificateId || `TX-C4-M01-${track.id.slice(-4).toUpperCase()}`}
                          </span>
                        </div>

                        <div className="w-14 h-14 rounded-full bg-amber-300 border-2 border-amber-500 shadow-md flex flex-col items-center justify-center text-center p-1">
                          <Trophy className="w-5 h-5 text-amber-900" />
                          <span className="text-[7px] font-black uppercase text-amber-950">VERIFIED</span>
                        </div>

                        <div className="text-right font-mono">
                          <span className="block text-[10px] text-slate-400">RUBRIC SCORE:</span>
                          <span className="font-black text-emerald-600 text-base sm:text-lg">
                            {backpackAttempt.rubricScores.totalScore} / 100
                          </span>
                        </div>
                      </div>

                      {/* 4 Rubric Sub-scores Breakdown */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-lg mx-auto text-left pt-2">
                        <div className="p-2.5 rounded-xl bg-white border border-amber-200 text-center">
                          <span className="text-[10px] font-bold text-slate-500 block">Timetable</span>
                          <span className="text-xs font-black font-mono text-slate-900">
                            {backpackAttempt.rubricScores.timetableAccuracy} / 40
                          </span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-white border border-amber-200 text-center">
                          <span className="text-[10px] font-bold text-slate-500 block">Weight Band</span>
                          <span className="text-xs font-black font-mono text-slate-900">
                            {backpackAttempt.rubricScores.weightBand} / 20
                          </span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-white border border-amber-200 text-center">
                          <span className="text-[10px] font-bold text-slate-500 block">Placement</span>
                          <span className="text-xs font-black font-mono text-slate-900">
                            {backpackAttempt.rubricScores.placement} / 15
                          </span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-white border border-amber-200 text-center">
                          <span className="text-[10px] font-bold text-slate-500 block">Reflection</span>
                          <span className="text-xs font-black font-mono text-slate-900">
                            {backpackAttempt.rubricScores.reasoning} / 25
                          </span>
                        </div>
                      </div>

                      {/* Paediatric Educational Benchmark Notice */}
                      <div className="p-3 bg-amber-100/70 rounded-2xl border border-amber-300/80 text-[11px] text-amber-950 text-left max-w-lg mx-auto">
                        <span className="font-bold block">⚖️ Educational Guidance Benchmark:</span>
                        <span>
                          The 10% benchmark is a provisional educational guideline for an average Class 4 student (~32 kg).
                          Individual clinical tolerance may vary. This simulator does not provide a medical safety warranty.
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                        <Button
                          onClick={() => {
                            playKidSound('success')
                            if (typeof window !== 'undefined') window.print()
                          }}
                          className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs h-9 px-5 rounded-xl shadow-md flex items-center gap-2"
                        >
                          <Printer className="w-4 h-4" />
                          <span>Print Official Certificate PDF</span>
                        </Button>

                        {backpackAttempt.certificateId && (
                          <a
                            href={backpackAttempt.verificationUrl || `/verify/${backpackAttempt.certificateId}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs font-bold hover:bg-slate-50 shadow-xs"
                          >
                            <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
                            <span>Verify QR Record</span>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Parent Home Practice Verification Station */}
                    <div className="p-5 bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-200 rounded-3xl space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">🏡</span>
                          <div>
                            <h4 className="text-sm font-bold text-slate-900">Parent-Reported Home Practice Log</h4>
                            <p className="text-[11px] text-slate-500">
                              Verify evening school bag packing routine at home (separate from simulation score).
                            </p>
                          </div>
                        </div>
                        <Badge className="bg-sky-600 text-white text-[10px] font-bold">Parent Verification</Badge>
                      </div>

                      <div className="p-4 bg-white rounded-2xl border border-sky-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <span className="text-xs font-bold text-slate-800 block">
                            How many consecutive days did your child pack their bag before 8 PM?
                          </span>
                          <div className="flex items-center gap-2">
                            {[1, 3, 5, 7].map((days) => (
                              <button
                                key={days}
                                onClick={() => setParentObsDays(days)}
                                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                                  parentObsDays === days
                                    ? 'bg-sky-600 text-white shadow-xs'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                }`}
                              >
                                {days} {days === 1 ? 'Day' : 'Days'}
                              </button>
                            ))}
                          </div>
                        </div>

                        <Button
                          onClick={handleRecordParentObservation}
                          disabled={isRecordingObs}
                          size="sm"
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shrink-0"
                        >
                          {isRecordingObs ? 'Saving...' : 'Confirm Home Practice'}
                        </Button>
                      </div>

                      {parentObsStatus && (
                        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs font-semibold rounded-xl flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{parentObsStatus}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  /* --- 2. IN-PROGRESS / UNFINISHED ATTEMPT GATE --- */
                  <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-300 text-center space-y-4 max-w-lg mx-auto">
                    <div className="w-16 h-16 rounded-3xl bg-sky-100 text-sky-700 flex items-center justify-center text-3xl mx-auto shadow-inner">
                      🎒
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-lg font-bold text-slate-900">Simulation Assessment In Progress</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        To earn your official Class 4 credential and dynamic rubric breakdown, complete the interactive Smart Backpack Lab in Step 2.
                      </p>
                    </div>

                    <div className="p-3.5 bg-white rounded-2xl border border-slate-200 text-xs text-slate-500">
                      <span>Current status: </span>
                      <span className="font-bold text-amber-600">
                        {backpackAttempt?.packedItemIds?.length
                          ? `${backpackAttempt.packedItemIds.length} items packed · Needs reflection & parent consent`
                          : 'Not yet started'}
                      </span>
                    </div>

                    <Button
                      onClick={() => {
                        setActiveTab('simulator')
                        playKidSound('pop')
                      }}
                      className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs h-9 px-6 rounded-xl shadow-xs"
                    >
                      <span>Launch Live Backpack Lab ➔</span>
                    </Button>
                  </div>
                )
              ) : (
                /* --- 3. OTHER TRACKS STANDARD CERTIFICATE --- */
                <div className="relative rounded-3xl p-6 sm:p-8 bg-amber-50/50 border-4 border-amber-300 shadow-xl text-slate-900 space-y-5 text-center overflow-hidden">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold uppercase tracking-widest border border-amber-300">
                      <Award className="w-3.5 h-3.5 text-amber-600" />
                      <span>Official TalentXcel Accredited Credential</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black font-serif tracking-tight text-slate-950 pt-1">
                      CERTIFICATE OF PRACTICAL COMPETENCY
                    </h3>
                    <p className="text-xs text-slate-600 italic">
                      Awarded under TalentXcel Life-Skills Framework
                    </p>
                  </div>

                  <div className="py-2 space-y-1 border-y border-amber-200 max-w-lg mx-auto">
                    <span className="text-[11px] text-slate-500 uppercase tracking-wider block">
                      This certifies that
                    </span>
                    <input
                      type="text"
                      value={studentName}
                      onChange={(e) => handleUpdateStudentName(e.target.value)}
                      className="text-lg sm:text-xl font-bold font-serif text-blue-950 text-center bg-transparent border-b-2 border-blue-400 focus:outline-none w-full max-w-xs"
                      title="Edit Student Name for Certificate"
                    />
                    <p className="text-xs text-slate-700 leading-relaxed font-medium pt-1">
                      has successfully demonstrated practical competency in{' '}
                      <span className="font-bold text-slate-950">&quot;{track.classSpecificTitle}&quot;</span> (Class {track.classNumber}).
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 text-xs text-slate-500 max-w-lg mx-auto">
                    <div className="text-left font-mono">
                      <span className="block text-[10px] text-slate-400">CREDENTIAL ID:</span>
                      <span className="font-bold text-slate-800">TX-LS-{track.classNumber}-{track.id.slice(-4).toUpperCase()}</span>
                    </div>

                    <div className="w-14 h-14 rounded-full bg-amber-300 border-2 border-amber-500 shadow-md flex flex-col items-center justify-center text-center p-1">
                      <Trophy className="w-5 h-5 text-amber-900" />
                      <span className="text-[7px] font-black uppercase text-amber-950">VERIFIED</span>
                    </div>

                    <div className="text-right font-mono">
                      <span className="block text-[10px] text-slate-400">RUBRIC SCORE:</span>
                      <span className="font-black text-emerald-600 text-sm">95 / 100</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      playKidSound('success')
                      if (typeof window !== 'undefined') window.print()
                    }}
                    className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs h-9 px-5 rounded-xl shadow-md flex items-center gap-2 mx-auto"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Official Certificate PDF</span>
                  </Button>
                </div>
              )}

              {/* Weekly Refrigerator Mission Card for Parents */}
              <div className="bg-blue-50/70 border-2 border-dashed border-blue-300 rounded-3xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">📋</span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-blue-950">
                        Printable Weekend Refrigerator Mission Card
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Put this on the fridge! Parents verify practical independence at home.
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-blue-600 text-white font-bold text-[10px]">
                    Home Contract
                  </Badge>
                </div>

                <div className="space-y-2 bg-white p-4 rounded-2xl border border-blue-100 text-xs text-slate-700">
                  <div className="font-bold text-slate-900 mb-1">
                    Family Mission: {track.practicalActivity.title}
                  </div>
                  {track.practicalActivity.instructions.map((inst, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <input type="checkbox" className="mt-0.5 rounded text-blue-600" />
                      <span>{inst}</span>
                    </div>
                  ))}
                  <div className="pt-2 text-[11px] text-blue-900 font-semibold border-t border-slate-100">
                    Safe Parent Check: {track.practicalActivity.safeCheckNote}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------ */}
          {/* TAB 5: 💼 CAPSTONE WORKSHOP                                  */}
          {/* ------------------------------------------------------------ */}
          {activeTab === 'workshop' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="p-6 rounded-3xl bg-blue-900 text-white space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <Badge className="bg-blue-800 text-blue-200 border-0 text-xs font-bold">
                    Class {track.classNumber} Capstone Project
                  </Badge>
                  <span className="text-xs font-bold text-blue-200">
                    {track.capstoneProject.estimatedHours} Hours Real-World Practice
                  </span>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {track.capstoneProject.title}
                  </h3>
                  <p className="text-xs text-blue-100 leading-relaxed mt-1">
                    {track.capstoneProject.brief}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-blue-800">
                  <span className="text-xs font-bold text-blue-200 block">Deliverables Expected:</span>
                  <ul className="space-y-1 text-xs text-blue-100">
                    {track.capstoneProject.deliverables.map((deliv, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-blue-800">
                  <span className="text-[11px] text-blue-200">
                    Includes {track.capstoneProject.rubricCriteria.length} evaluation rubrics
                  </span>
                  <Button
                    onClick={() => {
                      onClose()
                      if (onOpenWorkshop) onOpenWorkshop(track.capstoneProject.id)
                    }}
                    className="bg-white hover:bg-slate-100 text-blue-950 font-bold text-xs h-9 px-5 rounded-xl shadow-md flex items-center gap-2"
                  >
                    <span>Launch Practical Workshop</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ============================================================== */}
        {/* 4. MODAL FOOTER                                                */}
        {/* ============================================================== */}
        <div className="px-5 py-3.5 bg-white border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Full Class {track.classNumber} Life Skills Pass · ₹999/month (Cancel Anytime)</span>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <Button
              onClick={() => {
                stopVoice()
                onClose()
              }}
              variant="outline"
              size="sm"
              className="text-xs font-semibold h-8.5 rounded-xl border-slate-300 hover:bg-slate-50"
            >
              Close Studio
            </Button>
            <Button
              onClick={() => {
                stopVoice()
                onClose()
                if (onEnrollTrack) onEnrollTrack('prod_skill_monthly_999')
              }}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-8.5 px-4 rounded-xl flex items-center gap-1.5 shadow-xs"
            >
              <span>Unlock Full Track • ₹999/mo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
