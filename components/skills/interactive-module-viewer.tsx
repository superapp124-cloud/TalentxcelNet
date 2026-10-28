'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  FastForward,
  Rewind,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  Trophy,
  ArrowRight,
  Layers,
  Clock,
  Eye,
  Check,
  ChevronRight,
  Lightbulb,
  AlertTriangle,
  FileCheck,
  Video,
  Image as ImageIcon,
  MousePointerClick,
  Upload,
  Link as LinkIcon,
  ExternalLink,
  FileVideo,
  ShieldCheck,
  Building2,
  ScrollText,
  FileText,
  PlayCircle,
  FolderUp,
  Smile,
  Mic,
  MessageCircle,
  Award,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { LifeSkillCurriculumModule } from '@/packages/core/src'
import {
  IN_HOUSE_VIDEO_PRESETS,
  getInstitutionalVideoForModule,
  DEFAULT_SAMPLE_MP4_URL,
} from '@/packages/core/src/skills-engine/institutional-videos'

interface InteractiveModuleViewerProps {
  module: LifeSkillCurriculumModule
  onClose?: () => void
}

type VideoStudioTab = 'animated_story' | 'custom_mp4' | 'teleprompter'

// --- WEB AUDIO SYNTHESIZER (0 external files, 100% offline) ---
function playKidSound(type: 'chime' | 'success' | 'step' | 'pop') {
  if (typeof window === 'undefined') return
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!AudioContextClass) return
    const ctx = new AudioContextClass()
    const now = ctx.currentTime

    if (type === 'chime') {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(523.25, now) // C5
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.15) // G5
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
      osc.frequency.setValueAtTime(440, now) // A4
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.12) // E5
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
    } else if (type === 'success') {
      const notes = [523.25, 659.25, 783.99, 1046.5] // C5, E5, G5, C6
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
    // Ignore audio context autoplay restriction gracefully
  }
}

export function InteractiveModuleViewer({ module, onClose }: InteractiveModuleViewerProps) {
  const [activeTab, setActiveTab] = useState<'video' | 'visuals' | 'simulator' | 'steps' | 'quiz'>('video')
  const [videoStudioTab, setVideoStudioTab] = useState<VideoStudioTab>('animated_story')

  // --- ANIMATED STORY & REAL VOICE SYNTHESIS ENGINE ---
  const [activeSceneIndex, setActiveSceneIndex] = useState<number>(0)
  const [isVoiceSpeaking, setIsVoiceSpeaking] = useState<boolean>(false)
  const [voiceRate, setVoiceRate] = useState<number>(1.0)
  const [voiceCharacter, setVoiceCharacter] = useState<'maya' | 'rohan'>('maya')
  const [subtitleText, setSubtitleText] = useState<string>('')

  // Build 3 vibrant child-friendly story scenes for this module
  const storyScenes = [
    {
      sceneNumber: 1,
      badge: 'Scene 1 · The Everyday Challenge',
      title: 'Facing the Situation',
      avatarEmoji: module.category === 'life_communication' ? '🗣️' : module.category === 'life_money_management' ? '🪙' : module.category === 'life_safety_health' ? '⛑️' : '🎒',
      characterName: 'Aarav (Student)',
      characterMood: 'Hesitant but Curious',
      storyText: module.openingScenario,
      voiceDialogue: `Let's see what happened: ${module.openingScenario}`,
      coachAdvice: 'Notice how Aarav feels right now. Taking a deep breath and following a system makes all the difference!',
      actionPrompt: 'Let\'s Help Learn the 5 Practical Steps! ➜',
    },
    {
      sceneNumber: 2,
      badge: 'Scene 2 · 5 Magic Steps',
      title: 'The Practical Action Plan',
      avatarEmoji: '🌟',
      characterName: 'Coach ' + (voiceCharacter === 'maya' ? 'Maya' : 'Rohan'),
      characterMood: 'Super Confident & Ready',
      storyText: `Here is the step-by-step method to master ${module.title}. Follow these 5 practical steps!`,
      voiceDialogue: `Here are your five action checkpoints to master this skill! Step 1: ${module.stepByStep[0] || 'Start with preparation'}. Step 2: ${module.stepByStep[1] || 'Stay focused'}. Step 3: ${module.stepByStep[2] || 'Execute carefully'}. Step 4: ${module.stepByStep[3] || 'Check details'}. Step 5: ${module.stepByStep[4] || 'Finish with confidence'}.`,
      coachAdvice: 'Try practicing these steps in your head or with a friend right now!',
      actionPrompt: 'See the Real-Life Victory Outcome! ➜',
    },
    {
      sceneNumber: 3,
      badge: 'Scene 3 · Life-Skill Victory!',
      title: 'Mastery & Confidence Achieved',
      avatarEmoji: '🏆',
      characterName: 'Super Achiever',
      characterMood: 'Proud & Fully Prepared',
      storyText: `${module.summaryTakeaway} Practical Challenge: ${module.videoContent.practicalChallengeRecap}`,
      voiceDialogue: `Incredible job! You unlocked mastery for ${module.title}. Here is your golden takeaway: ${module.summaryTakeaway}. Try this practical challenge today!`,
      coachAdvice: 'Share this skill with a classmate or family member today to lock it in forever.',
      actionPrompt: 'Restart Animated Story ↺',
    },
  ]

  const currentStoryScene = storyScenes[activeSceneIndex] || storyScenes[0]

  // Speak aloud function using Web Speech API
  const speakSceneAloud = (textToSpeak: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return

    window.speechSynthesis.cancel()
    setIsVoiceSpeaking(true)
    setSubtitleText(textToSpeak)
    playKidSound('chime')

    const utterance = new SpeechSynthesisUtterance(textToSpeak)
    utterance.rate = voiceRate
    utterance.pitch = voiceCharacter === 'maya' ? 1.2 : 0.95 // Maya is bright and friendly, Rohan is grounded

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
      setIsVoiceSpeaking(false)
      playKidSound('step')
    }

    utterance.onerror = () => {
      setIsVoiceSpeaking(false)
    }

    window.speechSynthesis.speak(utterance)
  }

  const stopVoice = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    setIsVoiceSpeaking(false)
  }

  const handleNextScene = () => {
    stopVoice()
    const nextIdx = (activeSceneIndex + 1) % 3
    setActiveSceneIndex(nextIdx)
    playKidSound('pop')
    if (nextIdx === 2) {
      setTimeout(() => playKidSound('success'), 300)
    }
  }

  const handleJumpToScene = (idx: number) => {
    stopVoice()
    setActiveSceneIndex(idx)
    playKidSound('step')
    if (idx === 2) {
      setTimeout(() => playKidSound('success'), 300)
    }
  }

  // Auto-play voice on initial mount or when scene changes if user requested
  const handlePlayVoiceForCurrentScene = () => {
    if (isVoiceSpeaking) {
      stopVoice()
    } else {
      speakSceneAloud(currentStoryScene.voiceDialogue)
    }
  }

  // --- NATIVE IN-HOUSE VIDEO ENGINE (For custom MP4 files) ---
  const defaultPreset = getInstitutionalVideoForModule(module)
  const [selectedPresetId, setSelectedPresetId] = useState<string>(defaultPreset.id)
  const activePreset = IN_HOUSE_VIDEO_PRESETS.find((p) => p.id === selectedPresetId) || defaultPreset
  const [activeVideoUrl, setActiveVideoUrl] = useState<string>(
    module.videoContent.videoUrl || activePreset.mp4Url || DEFAULT_SAMPLE_MP4_URL
  )
  const [videoDisplayName, setVideoDisplayName] = useState<string>(
    activePreset.title || 'In-House Demonstration Video'
  )
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoElementRef = useRef<HTMLVideoElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const localBlobUrl = URL.createObjectURL(file)
    setActiveVideoUrl(localBlobUrl)
    setVideoDisplayName(`Custom File: ${file.name}`)
    setVideoStudioTab('custom_mp4')
    playKidSound('chime')

    if (videoElementRef.current) {
      videoElementRef.current.load()
      videoElementRef.current.play().catch(() => {})
    }
  }

  // --- HANDS-ON SIMULATOR STATE ---
  const [selectedDecision, setSelectedDecision] = useState<number | null>(null)
  const [simulatorPackedItems, setSimulatorPackedItems] = useState<string[]>([])

  const interactiveItems = [
    { id: 'item_1', name: "Tomorrow's Timetable Check", category: 'required', icon: '📅' },
    { id: 'item_2', name: 'Required Textbooks (Math & Science)', category: 'required', icon: '📚' },
    { id: 'item_3', name: 'Sharpened Pencils & Eraser Box', category: 'required', icon: '✏️' },
    { id: 'item_4', name: 'Clean Filled Water Bottle', category: 'required', icon: '💧' },
    { id: 'item_5', name: 'Comic Book / Toys', category: 'distraction', icon: '🎮' },
    { id: 'item_6', name: 'Heavy Unnecessary Book (History)', category: 'distraction', icon: '🧱' },
  ]

  const togglePackItem = (id: string) => {
    playKidSound('pop')
    if (simulatorPackedItems.includes(id)) {
      setSimulatorPackedItems(simulatorPackedItems.filter((i) => i !== id))
    } else {
      const nextPacked = [...simulatorPackedItems, id]
      setSimulatorPackedItems(nextPacked)
      if (nextPacked.length === 4) {
        setTimeout(() => playKidSound('success'), 200)
      }
    }
  }

  const requiredCount = interactiveItems.filter((i) => i.category === 'required').length
  const correctPackedCount = simulatorPackedItems.filter((id) =>
    interactiveItems.find((item) => item.id === id && item.category === 'required')
  ).length
  const wrongPackedCount = simulatorPackedItems.filter((id) =>
    interactiveItems.find((item) => item.id === id && item.category === 'distraction')
  ).length

  // Step checkboxes state
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const toggleStepCompleted = (idx: number) => {
    playKidSound('step')
    if (completedSteps.includes(idx)) {
      setCompletedSteps(completedSteps.filter((s) => s !== idx))
    } else {
      const updated = [...completedSteps, idx]
      setCompletedSteps(updated)
      if (updated.length === module.stepByStep.length) {
        setTimeout(() => playKidSound('success'), 300)
      }
    }
  }

  // --- QUIZ STATE ---
  const [quizSelectedOption, setQuizSelectedOption] = useState<string | null>(null)
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false)

  // Clean up speech synthesis when component unmounts
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  return (
    <div className="flex flex-col h-full bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-2xl">
      {/* Top Media Header */}
      <div className="p-4 bg-neutral-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-neutral-800 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 via-pink-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shrink-0 text-xl">
            {currentStoryScene.avatarEmoji}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <Badge className="bg-blue-500/20 text-blue-300 border border-blue-500/40 text-[10px] font-mono">
                {module.id}
              </Badge>
              <Badge variant="outline" className="text-neutral-300 border-neutral-700 text-[10px]">
                Class {module.classNumber} · Month {module.month}
              </Badge>
              <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] flex items-center gap-1 font-semibold">
                <Volume2 className="w-3 h-3 text-emerald-400 animate-pulse" /> Animated Video &amp; Voice Active
              </Badge>
            </div>
            <h2 className="text-sm sm:text-base font-extrabold text-white tracking-tight mt-1 truncate max-w-xl">
              {module.title}
            </h2>
          </div>
        </div>

        {/* Tab Navigation Pill - Clean flex-wrap with ZERO scrollbars */}
        <div className="flex flex-wrap items-center gap-1 bg-neutral-800/90 p-1 rounded-xl border border-neutral-700/80 text-xs">
          <button
            onClick={() => {
              setActiveTab('video')
              playKidSound('pop')
            }}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'video' ? 'bg-indigo-600 text-white shadow-md' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Video className="w-3.5 h-3.5" /> Video &amp; Voice Studio
          </button>
          <button
            onClick={() => {
              setActiveTab('visuals')
              playKidSound('pop')
            }}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'visuals' ? 'bg-primary text-white shadow-md' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" /> Visual Aids ({module.instructionalVisuals.length + 1})
          </button>
          <button
            onClick={() => {
              setActiveTab('simulator')
              playKidSound('pop')
            }}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'simulator' ? 'bg-emerald-600 text-white shadow-md' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <MousePointerClick className="w-3.5 h-3.5" /> Hands-On Game
          </button>
          <button
            onClick={() => {
              setActiveTab('steps')
              playKidSound('pop')
            }}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'steps' ? 'bg-primary text-white shadow-md' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Visual Steps
          </button>
          <button
            onClick={() => {
              setActiveTab('quiz')
              playKidSound('pop')
            }}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'quiz' ? 'bg-amber-600 text-white shadow-md' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" /> Quick Quiz
          </button>
        </div>
      </div>

      {/* Main Body Viewport */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-neutral-50 dark:bg-neutral-950">
        {/* ============================================================== */}
        {/* TAB 1: KIDS ANIMATED VIDEO & SPOKEN VOICE ENGINE                */}
        {/* ============================================================== */}
        {activeTab === 'video' && (
          <div className="max-w-4xl mx-auto space-y-5">
            {/* Studio Mode Selector (Animated Story vs Custom MP4) */}
            <div className="bg-white dark:bg-neutral-900 p-2.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex items-center gap-1.5 bg-neutral-100 dark:bg-neutral-800/80 p-1 rounded-xl text-xs font-bold">
                <button
                  onClick={() => {
                    setVideoStudioTab('animated_story')
                    playKidSound('pop')
                  }}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                    videoStudioTab === 'animated_story'
                      ? 'bg-gradient-to-r from-pink-600 to-indigo-600 text-white shadow-sm'
                      : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>🌟 Animated Story &amp; Voice Narration</span>
                  <Badge className="bg-white/20 text-white text-[9px] py-0 px-1 border-0">
                    Kids Love It!
                  </Badge>
                </button>

                <button
                  onClick={() => {
                    setVideoStudioTab('custom_mp4')
                    stopVoice()
                    playKidSound('pop')
                  }}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                    videoStudioTab === 'custom_mp4'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900'
                  }`}
                >
                  <FileVideo className="w-3.5 h-3.5" />
                  <span>Custom MP4 Video</span>
                </button>
              </div>

              {/* Voice Character & Speed Controls */}
              {videoStudioTab === 'animated_story' && (
                <div className="flex items-center gap-2 text-xs">
                  {/* Voice avatar toggle */}
                  <div className="flex items-center bg-neutral-100 dark:bg-neutral-800 rounded-lg p-0.5 border border-neutral-200 dark:border-neutral-700">
                    <button
                      onClick={() => {
                        setVoiceCharacter('maya')
                        playKidSound('pop')
                      }}
                      className={`px-2 py-1 rounded text-xs font-bold transition-all ${
                        voiceCharacter === 'maya' ? 'bg-pink-500 text-white shadow-xs' : 'text-neutral-500'
                      }`}
                    >
                      👧 Maya
                    </button>
                    <button
                      onClick={() => {
                        setVoiceCharacter('rohan')
                        playKidSound('pop')
                      }}
                      className={`px-2 py-1 rounded text-xs font-bold transition-all ${
                        voiceCharacter === 'rohan' ? 'bg-blue-600 text-white shadow-xs' : 'text-neutral-500'
                      }`}
                    >
                      👦 Rohan
                    </button>
                  </div>

                  {/* Voice Speed */}
                  <select
                    value={voiceRate}
                    onChange={(e) => setVoiceRate(parseFloat(e.target.value))}
                    className="text-xs font-bold bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg px-2 py-1 text-neutral-800 dark:text-neutral-200 outline-none cursor-pointer"
                  >
                    <option value={0.85}>🐢 Gentle (0.85x)</option>
                    <option value={1.0}>⚡ Normal (1.0x)</option>
                    <option value={1.15}>🚀 Energetic (1.15x)</option>
                  </select>
                </div>
              )}

              {videoStudioTab === 'custom_mp4' && (
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="video/mp4,video/webm"
                    className="hidden"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="h-8 text-xs font-bold flex items-center gap-1.5 border-dashed border-indigo-400 text-indigo-600 dark:text-indigo-400"
                  >
                    <FolderUp className="w-3.5 h-3.5" />
                    <span>Upload Your MP4</span>
                  </Button>
                </div>
              )}
            </div>

            {/* ============================================================== */}
            {/* VIEW A: INTERACTIVE ANIMATED STORY & REAL VOICE (KIDS' DELIGHT) */}
            {/* ============================================================== */}
            {videoStudioTab === 'animated_story' && (
              <div className="space-y-4">
                {/* 16:9 Living Animated Story Stage */}
                <div className="relative aspect-video rounded-3xl overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 border-2 border-indigo-500/30 shadow-2xl flex flex-col justify-between p-5 sm:p-7 relative group">
                  {/* Decorative Background Elements */}
                  <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-pink-500/15 blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />

                  {/* Stage Top Bar */}
                  <div className="relative z-10 flex items-center justify-between text-white text-xs">
                    <div className="flex items-center gap-2">
                      <span className="flex h-3 w-3 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                      </span>
                      <span className="font-black tracking-wider text-xs uppercase bg-white/10 px-2.5 py-1 rounded-full backdrop-blur-md">
                        {currentStoryScene.badge}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isVoiceSpeaking ? (
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-bold text-xs animate-pulse">
                          <Volume2 className="w-4 h-4" />
                          <span>Speaking Now...</span>
                        </div>
                      ) : (
                        <div className="text-neutral-400 text-xs font-mono">
                          Scene {activeSceneIndex + 1} of 3
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Stage Center Graphic & Action */}
                  <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-2xl mx-auto space-y-4 my-auto">
                    {/* Scene 1: The Dilemma Character */}
                    {activeSceneIndex === 0 && (
                      <div className="space-y-3 animate-in fade-in zoom-in duration-300 flex flex-col items-center">
                        <div className="relative">
                          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-amber-400 to-rose-500 p-1 shadow-2xl flex items-center justify-center text-5xl transform hover:scale-105 transition-transform animate-bounce">
                            {currentStoryScene.avatarEmoji}
                          </div>
                          <div className="absolute -bottom-2 bg-slate-900 border border-amber-400 text-amber-300 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                            {currentStoryScene.characterMood}
                          </div>
                        </div>

                        {/* Speech Bubble */}
                        <div className="bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md text-neutral-900 dark:text-white p-4 sm:p-5 rounded-2xl border-2 border-indigo-400/50 shadow-2xl max-w-xl text-left relative">
                          <div className="text-xs font-black uppercase text-indigo-600 dark:text-indigo-400 mb-1 flex items-center gap-1.5">
                            <Smile className="w-3.5 h-3.5" />
                            <span>{currentStoryScene.characterName}&apos;s Real-Life Dilemma:</span>
                          </div>
                          <p className="text-xs sm:text-sm font-semibold leading-relaxed">
                            &quot;{module.openingScenario}&quot;
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Scene 2: 5 Practical Action Steps */}
                    {activeSceneIndex === 1 && (
                      <div className="space-y-3 animate-in fade-in zoom-in duration-300 w-full">
                        <div className="text-center space-y-1">
                          <div className="inline-block px-3 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-black uppercase">
                            5 Action Checkpoints for Success
                          </div>
                          <h3 className="text-base sm:text-lg font-black text-white">
                            Follow These 5 Moves Calmly:
                          </h3>
                        </div>

                        {/* Interactive Step Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left max-w-xl mx-auto">
                          {module.stepByStep.slice(0, 4).map((step, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                speakSceneAloud(`Step ${idx + 1}: ${step}`)
                              }}
                              className="p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all flex items-start gap-2.5 text-left group/card"
                            >
                              <div className="w-6 h-6 rounded-lg bg-indigo-500 text-white font-black flex items-center justify-center shrink-0 text-xs shadow-sm group-hover/card:scale-110 transition-transform">
                                {idx + 1}
                              </div>
                              <div className="text-xs text-white font-medium line-clamp-2 leading-snug">
                                {step}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Scene 3: Mastery Confetti Celebration */}
                    {activeSceneIndex === 2 && (
                      <div className="space-y-3 animate-in fade-in zoom-in duration-300 flex flex-col items-center">
                        <div className="relative">
                          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 flex items-center justify-center text-5xl shadow-2xl animate-pulse">
                            🏆
                          </div>
                          <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white text-[11px] font-black px-2 py-0.5 rounded-full shadow-lg">
                            +50 XP
                          </div>
                        </div>

                        <div className="bg-emerald-950/80 border-2 border-emerald-400/60 p-4 rounded-2xl text-center max-w-lg backdrop-blur-md">
                          <div className="font-black text-emerald-300 text-sm uppercase tracking-wider mb-1">
                            🎉 Life-Skill Unlocked: Full Mastery!
                          </div>
                          <p className="text-xs sm:text-sm text-emerald-100 font-semibold leading-relaxed">
                            {module.summaryTakeaway}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Stage Bottom Voice & Scene Control Bar */}
                  <div className="relative z-10 pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 bg-black/60 backdrop-blur-md -mx-5 -mb-5 p-4 border-t border-white/10">
                    {/* Play Voice Button */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handlePlayVoiceForCurrentScene}
                        className={`px-4 py-2 rounded-xl font-black text-xs flex items-center gap-2 shadow-xl transform active:scale-95 transition-all ${
                          isVoiceSpeaking
                            ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                            : 'bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white'
                        }`}
                      >
                        {isVoiceSpeaking ? (
                          <>
                            <Pause className="w-4 h-4" /> <span>Pause Voice</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-4 h-4" /> <span>▶ Listen &amp; Watch Story</span>
                          </>
                        )}
                      </button>

                      <span className="text-neutral-400 text-xs hidden sm:inline">
                        Spoken by Coach {voiceCharacter === 'maya' ? 'Maya' : 'Rohan'}
                      </span>
                    </div>

                    {/* Scene Navigation Buttons */}
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={handleNextScene}
                        className="h-8 text-xs font-bold flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white border-0"
                      >
                        <span>{currentStoryScene.actionPrompt}</span>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Clickable 3 Scene Chapter Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {storyScenes.map((s, idx) => {
                    const isSelected = activeSceneIndex === idx

                    return (
                      <button
                        key={s.sceneNumber}
                        onClick={() => handleJumpToScene(idx)}
                        className={`p-3.5 rounded-2xl border text-left transition-all ${
                          isSelected
                            ? 'border-indigo-500 bg-indigo-50/60 dark:bg-indigo-950/40 ring-2 ring-indigo-500/30 shadow-md'
                            : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-300'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <span className={`font-black uppercase tracking-wider ${isSelected ? 'text-indigo-600 dark:text-indigo-400' : 'text-neutral-500'}`}>
                            Scene {s.sceneNumber}
                          </span>
                          <span className="text-lg">{s.avatarEmoji}</span>
                        </div>
                        <div className="font-extrabold text-xs text-neutral-900 dark:text-white">
                          {s.title}
                        </div>
                        <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2">
                          {s.coachAdvice}
                        </p>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* VIEW B: CUSTOM MP4 VIDEO UPLOAD / DIRECT PLAYBACK               */}
            {/* ============================================================== */}
            {videoStudioTab === 'custom_mp4' && (
              <div className="space-y-4">
                <div className="relative aspect-video rounded-3xl overflow-hidden bg-black border border-neutral-800 shadow-2xl">
                  <video
                    ref={videoElementRef}
                    src={activeVideoUrl}
                    poster={module.heroVisual.url}
                    controls
                    playsInline
                    className="w-full h-full object-contain bg-black"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-neutral-900 dark:text-white text-sm">
                      {videoDisplayName}
                    </h4>
                    <p className="text-neutral-500 mt-0.5">
                      Upload your own class recordings or practical demonstration MP4 files anytime.
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="h-8 text-xs font-bold"
                  >
                    <Upload className="w-3.5 h-3.5 mr-1" /> Choose File
                  </Button>
                </div>
              </div>
            )}

            {/* Practical Challenge Recap */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-800 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-xs text-blue-950 dark:text-blue-200">
                  Real-World Practical Challenge:
                </h4>
                <p className="text-xs text-blue-800 dark:text-blue-300 mt-0.5 leading-relaxed font-medium">
                  {module.videoContent.practicalChallengeRecap}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: VISUAL TEACHING AIDS STUDIO                              */}
        {/* ============================================================== */}
        {activeTab === 'visuals' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-md">
              <div className="p-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5" />
                  <h3 className="font-bold text-sm">Visual Teaching Model: Core Skill Anatomy</h3>
                </div>
                <Badge className="bg-white/20 text-white border-0 text-[10px] font-mono">
                  Interactive Visual Map
                </Badge>
              </div>

              <div className="p-6 bg-slate-50 dark:bg-neutral-950 flex flex-col items-center justify-center border-b border-neutral-200 dark:border-neutral-800">
                <div className="w-full max-w-lg aspect-16/9 bg-white dark:bg-neutral-900 rounded-xl border-2 border-indigo-200 dark:border-indigo-900 p-6 flex flex-col items-center justify-between shadow-inner relative overflow-hidden">
                  <div className="text-center space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                      Domain: {module.categoryLabel}
                    </span>
                    <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                      {module.title}
                    </h4>
                  </div>

                  <div className="flex items-center justify-center gap-4 py-4">
                    <div className="w-20 h-20 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 border-2 border-indigo-400 flex flex-col items-center justify-center text-center p-2 shadow-md">
                      <span className="text-2xl">📋</span>
                      <span className="text-[9px] font-bold text-indigo-900 dark:text-indigo-300 mt-1">Check Daily</span>
                    </div>

                    <ArrowRight className="w-5 h-5 text-indigo-400" />

                    <div className="w-24 h-24 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 border-2 border-emerald-400 flex flex-col items-center justify-center text-center p-2 shadow-lg">
                      <span className="text-3xl">🎒</span>
                      <span className="text-[10px] font-black text-emerald-900 dark:text-emerald-300 mt-1">Pack In Order</span>
                    </div>

                    <ArrowRight className="w-5 h-5 text-indigo-400" />

                    <div className="w-20 h-20 rounded-2xl bg-blue-100 dark:bg-blue-950/60 border-2 border-blue-400 flex flex-col items-center justify-center text-center p-2 shadow-md">
                      <span className="text-2xl">✨</span>
                      <span className="text-[9px] font-bold text-blue-900 dark:text-blue-300 mt-1">Ready to Go</span>
                    </div>
                  </div>

                  <div className="text-center px-4">
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-medium italic">
                      &quot;{module.heroVisual.description}&quot;
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Diagrams */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {module.instructionalVisuals.map((vis, i) => (
                <div
                  key={vis.id}
                  className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-5 space-y-3 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="font-bold capitalize text-xs">
                      {vis.diagramType} Diagram
                    </Badge>
                    <span className="text-[10px] font-mono text-neutral-400">Fig. {i + 1}</span>
                  </div>

                  <h4 className="font-bold text-sm text-neutral-900 dark:text-white">
                    {vis.title}
                  </h4>

                  <div className="h-40 rounded-xl bg-slate-100 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 p-4 flex flex-col items-center justify-center text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold text-lg">
                      {i === 0 ? '🔄' : '✅'}
                    </div>
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {vis.title}
                    </div>
                    <div className="text-[11px] text-slate-500 italic max-w-xs line-clamp-2">
                      &quot;{vis.caption}&quot;
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: HANDS-ON INTERACTIVE GAME (KIDS LOVE IT)                 */}
        {/* ============================================================== */}
        {activeTab === 'simulator' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 space-y-6 shadow-md">
              <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-4">
                <div>
                  <Badge className="bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                    Interactive Hands-On Game
                  </Badge>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-1">
                    Simulate: {module.practicalActivity.title}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Click items on the desk to pack or verify them for tomorrow.
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-neutral-400 uppercase">Items Packed</div>
                  <div className="text-xl font-black text-emerald-600">
                    {correctPackedCount} / {requiredCount}
                  </div>
                </div>
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {interactiveItems.map((item) => {
                  const isPacked = simulatorPackedItems.includes(item.id)
                  const isDistraction = item.category === 'distraction'

                  return (
                    <button
                      key={item.id}
                      onClick={() => togglePackItem(item.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between h-24 ${
                        isPacked
                          ? isDistraction
                            ? 'border-rose-400 bg-rose-50 dark:bg-rose-950/30 ring-2 ring-rose-400/40'
                            : 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 ring-2 ring-emerald-500/40'
                          : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 hover:border-neutral-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-2xl">{item.icon}</span>
                        {isPacked ? (
                          isDistraction ? (
                            <XCircle className="w-4 h-4 text-rose-600" />
                          ) : (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          )
                        ) : (
                          <span className="w-4 h-4 rounded-full border border-neutral-300 dark:border-neutral-700" />
                        )}
                      </div>

                      <div className="font-bold text-xs text-neutral-900 dark:text-white leading-tight">
                        {item.name}
                      </div>
                    </button>
                  )
                })}
              </div>

              {correctPackedCount === requiredCount && wrongPackedCount === 0 && (
                <div className="p-4 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 flex items-center justify-between animate-in zoom-in duration-300">
                  <div className="flex items-center gap-3">
                    <Trophy className="w-7 h-7 text-emerald-600 shrink-0" />
                    <div>
                      <div className="font-black text-sm">Flawless! 100% Prepared</div>
                      <div className="text-xs">
                        All essential items are packed with zero heavy distractions.
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-emerald-600 text-white font-bold text-xs">
                    +50 XP Earned
                  </Badge>
                </div>
              )}

              {/* Guided Scenario Decision Tree */}
              <div className="space-y-3 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                <div className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Interactive Decision Dilemma:
                </div>

                <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-xs italic">
                  &quot;{module.scenarioPractice.guidedScenario.context}&quot;
                </div>

                <div className="space-y-2">
                  {module.scenarioPractice.guidedScenario.choiceOptions.map((choice, idx) => {
                    const isSelected = selectedDecision === idx

                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedDecision(idx)
                          if (choice.isOptimal) {
                            playKidSound('success')
                          } else {
                            playKidSound('pop')
                          }
                        }}
                        className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-start justify-between gap-3 ${
                          isSelected
                            ? choice.isOptimal
                              ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 ring-2 ring-emerald-500/30'
                              : 'border-rose-400 bg-rose-50 dark:bg-rose-950/40 ring-2 ring-rose-400/30'
                            : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 hover:bg-neutral-50'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                            <span>{choice.option}</span>
                            {isSelected && choice.isOptimal && (
                              <Badge className="bg-emerald-600 text-white text-[9px]">Optimal Move</Badge>
                            )}
                          </div>
                          {isSelected && (
                            <div className="text-[11px] text-neutral-600 dark:text-neutral-400 font-medium">
                              <strong>Why:</strong> {choice.reason}
                            </div>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: VISUAL STEP PROGRESSION & CHECKLIST                      */}
        {/* ============================================================== */}
        {activeTab === 'steps' && (
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Step-by-Step Procedure ({module.stepByStep.length} Action Checkpoints)
              </div>
              <Badge variant="outline" className="text-xs font-mono">
                {completedSteps.length} of {module.stepByStep.length} Completed
              </Badge>
            </div>

            <div className="space-y-3">
              {module.stepByStep.map((stepText, idx) => {
                const isChecked = completedSteps.includes(idx)

                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border transition-all flex items-start gap-4 ${
                      isChecked
                        ? 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20'
                        : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-primary/50'
                    }`}
                  >
                    <button
                      onClick={() => toggleStepCompleted(idx)}
                      className={`w-9 h-9 rounded-xl font-black flex items-center justify-center shrink-0 shadow-sm text-sm transition-colors cursor-pointer ${
                        isChecked
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gradient-to-br from-indigo-500 to-blue-600 text-white'
                      }`}
                    >
                      {isChecked ? <Check className="w-5 h-5" /> : idx + 1}
                    </button>
                    <div className="space-y-1 flex-1">
                      <div
                        className={`text-xs font-bold leading-relaxed ${
                          isChecked
                            ? 'text-emerald-950 dark:text-emerald-200 line-through opacity-80'
                            : 'text-neutral-900 dark:text-white'
                        }`}
                      >
                        {stepText}
                      </div>
                    </div>

                    <button
                      onClick={() => speakSceneAloud(`Step ${idx + 1}: ${stepText}`)}
                      className="p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-indigo-600 transition-colors"
                      title="Read aloud"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 5: QUICK INTERACTIVE QUIZ                                  */}
        {/* ============================================================== */}
        {activeTab === 'quiz' && (
          <div className="max-w-2xl mx-auto space-y-5">
            <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 space-y-5 shadow-md">
              <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
                <Badge className="bg-amber-100 text-amber-800 font-bold text-[10px]">
                  Knowledge Check
                </Badge>
                <button
                  onClick={() => speakSceneAloud(`Question: ${module.assessment.question}. Context: ${module.assessment.contextScenario}`)}
                  className="text-xs text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1 hover:underline"
                >
                  <Volume2 className="w-3.5 h-3.5" /> Read Question
                </button>
              </div>

              <div className="space-y-1">
                <h3 className="font-bold text-sm sm:text-base text-neutral-900 dark:text-white">
                  {module.assessment.question}
                </h3>
                <p className="text-xs text-neutral-500 italic">
                  Context: {module.assessment.contextScenario}
                </p>
              </div>

              <div className="space-y-2.5">
                {module.assessment.options.map((opt) => {
                  const isSelected = quizSelectedOption === opt.id

                  return (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setQuizSelectedOption(opt.id)
                        setQuizSubmitted(true)
                        if (opt.isCorrect) {
                          playKidSound('success')
                        } else {
                          playKidSound('pop')
                        }
                      }}
                      className={`w-full p-3.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between gap-3 ${
                        isSelected
                          ? opt.isCorrect
                            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 ring-2 ring-emerald-500/30'
                            : 'border-rose-400 bg-rose-50 dark:bg-rose-950/40 ring-2 ring-rose-400/30'
                          : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 hover:bg-neutral-50'
                      }`}
                    >
                      <span className="font-medium text-neutral-900 dark:text-white">{opt.text}</span>
                      {isSelected && (
                        opt.isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        ) : (
                          <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                        )
                      )}
                    </button>
                  )
                })}
              </div>

              {quizSubmitted && quizSelectedOption && (
                <div
                  className={`p-4 rounded-xl border text-xs leading-relaxed animate-in fade-in duration-200 ${
                    module.assessment.options.find((o) => o.id === quizSelectedOption)?.isCorrect
                      ? 'bg-emerald-100 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                      : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900 text-rose-900 dark:text-rose-200'
                  }`}
                >
                  <div className="font-bold mb-1 flex items-center gap-1.5">
                    {module.assessment.options.find((o) => o.id === quizSelectedOption)?.isCorrect ? (
                      <>
                        <Trophy className="w-4 h-4 text-emerald-600" /> Full Marks!
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-4 h-4 text-rose-500" /> Hint:
                      </>
                    )}
                  </div>
                  <div>
                    {module.assessment.options.find((o) => o.id === quizSelectedOption)?.feedback}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="p-3.5 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs shrink-0">
        <div className="flex items-center gap-2">
          <Badge className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-[10px] border border-emerald-300 dark:border-emerald-700">
            Interactive Voice Engine Active
          </Badge>
          <span className="text-neutral-500 text-[11px] hidden sm:inline">
            TalentXcel Real-Life Skills · Engaging Kids with Audio, Visuals &amp; Interactive Stories
          </span>
        </div>
        {onClose && (
          <Button size="sm" onClick={onClose} className="h-8 text-xs font-bold">
            Close Viewer
          </Button>
        )}
      </div>
    </div>
  )
}
