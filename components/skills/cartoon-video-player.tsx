'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  Trophy,
  Zap,
  Award,
  Clock,
  Maximize2,
  CheckCircle2,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { ClassSkillTrackMeta } from '@/packages/core/src'

interface CartoonVideoPlayerProps {
  track: ClassSkillTrackMeta
  autoPlay?: boolean
  onComplete?: () => void
}

// --- SYNTHESIZED CARTOON AUDIO ENGINE (100% native, zero external dependencies) ---
function playCartoonSound(type: 'alarm' | 'whoosh' | 'pop' | 'click' | 'ding' | 'fanfare' | 'bounce') {
  if (typeof window === 'undefined') return
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!AudioContextClass) return
    const ctx = new AudioContextClass()
    const now = ctx.currentTime

    if (type === 'alarm') {
      // Fast rapid ringing bell
      for (let i = 0; i < 4; i++) {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'square'
        osc.frequency.setValueAtTime(880 + (i % 2) * 220, now + i * 0.08)
        gain.gain.setValueAtTime(0.08, now + i * 0.08)
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.06)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(now + i * 0.08)
        osc.stop(now + i * 0.08 + 0.06)
      }
    } else if (type === 'whoosh') {
      // Wind whoosh pitch glide
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(200, now)
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.15)
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.3)
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
      osc.frequency.setValueAtTime(700, now)
      osc.frequency.exponentialRampToValueAtTime(250, now + 0.09)
      gain.gain.setValueAtTime(0.15, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.12)
    } else if (type === 'click') {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(1200, now)
      gain.gain.setValueAtTime(0.1, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.05)
    } else if (type === 'ding') {
      // Cash register / success bell
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(1318.51, now) // E6
      gain.gain.setValueAtTime(0.18, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.6)
    } else if (type === 'fanfare') {
      // Triumphant cartoon brass notes
      const chords = [523.25, 659.25, 783.99, 1046.5] // C5, E5, G5, C6
      chords.forEach((freq, idx) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'triangle'
        osc.frequency.value = freq
        const start = now + idx * 0.08
        gain.gain.setValueAtTime(0.14, start)
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.4)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(start)
        osc.stop(start + 0.4)
      })
    } else if (type === 'bounce') {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(300, now)
      osc.frequency.linearRampToValueAtTime(600, now + 0.1)
      osc.frequency.linearRampToValueAtTime(350, now + 0.2)
      gain.gain.setValueAtTime(0.12, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.25)
    }
  } catch {
    // Ignore autoplay restriction
  }
}

export function CartoonVideoPlayer({ track, autoPlay = true, onComplete }: CartoonVideoPlayerProps) {
  // Video playback timeline state
  const DURATION_SECONDS = 36 // 36 seconds cartoon short (perfect kid attention span)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [isMuted, setIsMuted] = useState<boolean>(false)
  const [hasEnded, setHasEnded] = useState<boolean>(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const lastSoundTriggerRef = useRef<number>(-1)

  // Subtitle & Speech narration state
  const [subtitle, setSubtitle] = useState<string>('')

  // Determine current chapter (0-12s: Dilemma, 12-26s: 5 Magic Steps, 26-36s: Victory!)
  const chapter = currentTime < 12 ? 1 : currentTime < 26 ? 2 : 3

  // Voice narration script
  const voiceScript = [
    {
      start: 0.5,
      end: 11.5,
      text: `Meet Aarav! He is facing a real challenge today: ${track.classSpecificTitle}. Watch what happens when things get unorganized!`,
    },
    {
      start: 12.0,
      end: 25.5,
      text: `Coach Maya to the rescue! Here are the 5 magic steps: check the timetable, sort your essentials, pack neatly, and zip it up!`,
    },
    {
      start: 26.0,
      end: 35.5,
      text: `Boom! Aarav is totally prepared and stress-free. Remember: ${track.workedExample.takeaway}! You are a champion!`,
    },
  ]

  // Speak aloud in sync with video chapters
  const speakChapter = (text: string) => {
    if (isMuted || typeof window === 'undefined' || !('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 1.05
    utterance.pitch = 1.2 // Bright, friendly cartoon coach voice
    const voices = window.speechSynthesis.getVoices()
    const match = voices.find((v) => v.lang.includes('en') || v.lang.startsWith('en'))
    if (match) utterance.voice = match
    window.speechSynthesis.speak(utterance)
  }

  // Handle Play/Pause
  const togglePlay = () => {
    if (hasEnded) {
      setCurrentTime(0)
      setHasEnded(false)
      setIsPlaying(true)
      playCartoonSound('whoosh')
      return
    }

    if (isPlaying) {
      setIsPlaying(false)
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    } else {
      setIsPlaying(true)
      playCartoonSound('click')
      const currentSegment = voiceScript.find((s) => currentTime >= s.start && currentTime < s.end)
      if (currentSegment) {
        speakChapter(currentSegment.text)
      }
    }
  }

  const restartVideo = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    setCurrentTime(0)
    setHasEnded(false)
    setIsPlaying(true)
    playCartoonSound('whoosh')
    speakChapter(voiceScript[0].text)
  }

  // Timeline interval ticker
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }

    timerRef.current = setInterval(() => {
      setCurrentTime((prev) => {
        const nextTime = Math.round((prev + 0.2) * 10) / 10

        // Synchronize Sound Effects at specific keyframes
        const sec = Math.floor(nextTime)
        if (sec !== lastSoundTriggerRef.current) {
          lastSoundTriggerRef.current = sec

          if (sec === 1) playCartoonSound('alarm')
          if (sec === 5) playCartoonSound('bounce')
          if (sec === 12) playCartoonSound('whoosh')
          if (sec === 15) playCartoonSound('click')
          if (sec === 18) playCartoonSound('pop')
          if (sec === 21) playCartoonSound('ding')
          if (sec === 26) playCartoonSound('fanfare')
          if (sec === 30) playCartoonSound('ding')
        }

        // Trigger Voice at chapter boundaries
        if (Math.abs(nextTime - 0.6) < 0.25) {
          setSubtitle(voiceScript[0].text)
          speakChapter(voiceScript[0].text)
        } else if (Math.abs(nextTime - 12.2) < 0.25) {
          setSubtitle(voiceScript[1].text)
          speakChapter(voiceScript[1].text)
        } else if (Math.abs(nextTime - 26.2) < 0.25) {
          setSubtitle(voiceScript[2].text)
          speakChapter(voiceScript[2].text)
        }

        // Finish video
        if (nextTime >= DURATION_SECONDS) {
          setIsPlaying(false)
          setHasEnded(true)
          if (onComplete) onComplete()
          return DURATION_SECONDS
        }
        return nextTime
      })
    }, 200)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPlaying, isMuted])

  // Cleanup on unmount
  useEffect(() => {
    if (autoPlay) {
      const timeout = setTimeout(() => {
        setIsPlaying(true)
        speakChapter(voiceScript[0].text)
      }, 500)
      return () => clearTimeout(timeout)
    }
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  // Format mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
    const s = Math.floor(secs % 60)
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  // Animation calculation variables
  const progressPercent = (currentTime / DURATION_SECONDS) * 100

  return (
    <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-gradient-to-b from-indigo-950 via-slate-900 to-indigo-950 border-4 border-indigo-500/40 shadow-2xl flex flex-col justify-between select-none group font-sans">
      {/* ============================================================== */}
      {/* 1. ANIMATED CARTOON SKY & BACKGROUND SCENERY                    */}
      {/* ============================================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated Sun & Rays in Chapter 2 & 3 */}
        {chapter >= 2 && (
          <div className="absolute top-4 right-12 w-24 h-24 rounded-full bg-amber-400/30 blur-2xl animate-pulse" />
        )}

        {/* Floating Clouds */}
        <div
          className="absolute top-8 left-10 w-24 h-8 bg-white/10 rounded-full blur-xs transition-transform duration-1000"
          style={{ transform: `translateX(${currentTime * 4}px)` }}
        />
        <div
          className="absolute top-16 right-20 w-36 h-10 bg-white/10 rounded-full blur-xs transition-transform duration-1000"
          style={{ transform: `translateX(-${currentTime * 3}px)` }}
        />

        {/* Confetti Explosion during Victory Chapter 3 */}
        {chapter === 3 && (
          <div className="absolute inset-0">
            {[...Array(24)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2.5 h-2.5 rounded-full animate-bounce"
                style={{
                  top: `${15 + (i * 13) % 70}%`,
                  left: `${5 + (i * 17) % 90}%`,
                  backgroundColor: ['#f59e0b', '#ec4899', '#3b82f6', '#10b981', '#8b5cf6'][i % 5],
                  animationDuration: `${0.8 + (i % 5) * 0.2}s`,
                  animationDelay: `${(i % 4) * 0.1}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* 2. VIDEO TOP OVERLAY BAR: BADGE, DURATION & CHAPTER NAME       */}
      {/* ============================================================== */}
      <div className="relative z-20 p-4 flex items-center justify-between text-white text-xs bg-gradient-to-b from-black/80 via-black/30 to-transparent">
        <div className="flex items-center gap-2">
          <Badge className="bg-gradient-to-r from-amber-400 to-pink-500 text-slate-950 font-black text-[10px] tracking-wider uppercase border-0 shadow-md flex items-center gap-1">
            <Sparkles className="w-3 h-3 fill-slate-950" />
            <span>Animated Cartoon Story</span>
          </Badge>
          <span className="font-bold text-slate-200 text-xs hidden sm:inline">
            {chapter === 1 ? 'Act 1: The Dilemma' : chapter === 2 ? 'Act 2: 5 Action Checkpoints' : 'Act 3: Victory & Mastery!'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-xl text-slate-300 font-mono text-[11px] font-bold border border-white/10">
            {formatTime(currentTime)} / {formatTime(DURATION_SECONDS)}
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. CENTER CARTOON STAGE: DYNAMIC ANIMATED CHARACTERS & PROPS   */}
      {/* ============================================================== */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-4">
        {/* ============================================================== */}
        {/* SCENE 1 (0s - 12s): THE DILEMMA & PANIC                         */}
        {/* ============================================================== */}
        {chapter === 1 && (
          <div className="flex flex-col items-center justify-center space-y-3 animate-in fade-in duration-300">
            {/* Alarm clock ringing above character */}
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-3xl shadow-lg animate-bounce">
                ⏰
              </div>
              <span className="absolute -top-2 -right-4 bg-rose-600 text-white font-black text-[9px] px-2 py-0.5 rounded-full uppercase animate-ping">
                RING!
              </span>
            </div>

            {/* Panicked Student Character */}
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-amber-400 via-rose-400 to-amber-500 p-1 shadow-2xl flex items-center justify-center text-5xl transform hover:scale-105 transition-transform animate-pulse">
                🎒
              </div>

              {/* Messy Bag with Flying Items */}
              <div className="space-y-1.5 text-left">
                <div className="bg-white/95 text-slate-900 p-3 rounded-2xl shadow-xl max-w-xs border-2 border-rose-400">
                  <div className="text-[10px] font-black uppercase text-rose-600 flex items-center gap-1">
                    <span>⚠️ Morning Panic!</span>
                  </div>
                  <p className="text-xs font-bold leading-tight mt-0.5">
                    &quot;{track.realLifeScenario}&quot;
                  </p>
                </div>
                <div className="flex items-center gap-2 text-rose-300 text-[10px] font-extrabold">
                  <span className="bg-rose-500/20 px-2 py-0.5 rounded-md border border-rose-500/30">
                    ❌ Unchecked Timetable
                  </span>
                  <span className="bg-rose-500/20 px-2 py-0.5 rounded-md border border-rose-500/30">
                    ❌ Overweight Spine Hazard
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* SCENE 2 (12s - 26s): 5 ACTION STEPS (CARTOON TRANSFORMATION)   */}
        {/* ============================================================== */}
        {chapter === 2 && (
          <div className="w-full max-w-xl mx-auto space-y-3 animate-in zoom-in-95 duration-300">
            {/* Superhero Coach Maya swoops in */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-indigo-600 flex items-center justify-center text-2xl shadow-lg animate-bounce">
                  🌟
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-pink-300 block">
                    Coach Maya&apos;s Super Action Plan
                  </span>
                  <h4 className="text-sm font-black text-white">
                    5 Steps in Motion
                  </h4>
                </div>
              </div>

              <Badge className="bg-emerald-500 text-white font-black text-xs px-2.5 py-1">
                Step {Math.min(5, Math.floor((currentTime - 12) / 2.8) + 1)} of 5
              </Badge>
            </div>

            {/* Animated Prop Cards sliding in */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {track.workedExample.steps.slice(0, 4).map((st, i) => {
                const isStepActive = (currentTime - 12) >= i * 2.8

                return (
                  <div
                    key={i}
                    className={`p-2.5 rounded-xl border text-xs font-medium flex items-center gap-2.5 transition-all duration-300 shadow-md ${
                      isStepActive
                        ? 'bg-emerald-500/20 border-emerald-400 text-white translate-x-0 opacity-100 scale-102 ring-1 ring-emerald-400'
                        : 'bg-white/5 border-white/10 text-slate-400 opacity-40'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center font-black text-[10px] shrink-0 ${
                      isStepActive ? 'bg-emerald-400 text-slate-950' : 'bg-white/20 text-white'
                    }`}>
                      {isStepActive ? '✓' : i + 1}
                    </span>
                    <span className="leading-tight text-[11px] line-clamp-2">{st}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* SCENE 3 (26s - 36s): LIFE-SKILL VICTORY & GOLDEN CELEBRATION   */}
        {/* ============================================================== */}
        {chapter === 3 && (
          <div className="flex flex-col items-center justify-center space-y-3 animate-in zoom-in duration-300 text-center">
            {/* Golden Trophy and Sparkles */}
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 p-1 shadow-2xl flex items-center justify-center text-5xl animate-bounce">
                🏆
              </div>
              <div className="absolute -top-3 -right-3 bg-pink-500 text-white font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase shadow-lg animate-pulse">
                MASTERED!
              </div>
            </div>

            <div className="bg-white/95 text-slate-900 p-3.5 sm:p-4 rounded-2xl shadow-2xl max-w-md border-2 border-emerald-400 space-y-1">
              <div className="text-[10px] font-black uppercase text-emerald-600 flex items-center justify-center gap-1">
                <Award className="w-3.5 h-3.5" />
                <span>Life-Skill Victory Achieved!</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                {track.workedExample.takeaway}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Badge className="bg-amber-400 text-slate-950 font-black text-xs px-3 py-1 shadow-md animate-pulse">
                ⭐ +150 XP Earned
              </Badge>
              <Badge className="bg-emerald-500 text-white font-black text-xs px-3 py-1 shadow-md">
                🎓 Ready for Official Certificate
              </Badge>
            </div>
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* 4. VIDEO BOTTOM OVERLAY: SUBTITLES, SCRUBBER & PLAYER CONTROLS  */}
      {/* ============================================================== */}
      <div className="relative z-20 p-4 pt-1 space-y-2.5 bg-gradient-to-t from-black via-black/85 to-transparent">
        {/* Dynamic Spoken Subtitle Bar */}
        {subtitle && (
          <div className="bg-slate-900/90 backdrop-blur-md border border-emerald-400/40 text-emerald-200 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-center shadow-lg line-clamp-1 max-w-xl mx-auto">
            🗣️ <span className="font-bold text-white">Coach Maya:</span> &quot;{subtitle}&quot;
          </div>
        )}

        {/* Draggable / Clickable Timeline Scrubber */}
        <div className="space-y-1">
          <div
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              const clickPos = (e.clientX - rect.left) / rect.width
              const targetTime = Math.min(DURATION_SECONDS, Math.max(0, clickPos * DURATION_SECONDS))
              setCurrentTime(targetTime)
              setHasEnded(false)
              playCartoonSound('click')
            }}
            className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden cursor-pointer relative group/bar hover:h-3 transition-all"
          >
            {/* Chapter Markers */}
            <div className="absolute top-0 bottom-0 left-[33.3%] w-0.5 bg-white/40" />
            <div className="absolute top-0 bottom-0 left-[72.2%] w-0.5 bg-white/40" />

            {/* Active Progress Fill */}
            <div
              className="h-full bg-gradient-to-r from-pink-500 via-amber-400 to-emerald-400 transition-all rounded-full relative"
              style={{ width: `${progressPercent}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-md transform scale-0 group-hover/bar:scale-100 transition-transform" />
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 px-0.5">
            <span className={chapter === 1 ? 'text-amber-400' : ''}>1. The Challenge (0:00)</span>
            <span className={chapter === 2 ? 'text-pink-400' : ''}>2. 5 Action Steps (0:12)</span>
            <span className={chapter === 3 ? 'text-emerald-400' : ''}>3. Victory! (0:26)</span>
          </div>
        </div>

        {/* Playback Controls Row */}
        <div className="flex items-center justify-between gap-3 text-white">
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-indigo-600 text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
            </button>

            <button
              onClick={restartVideo}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              title="Replay from start"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setIsMuted(!isMuted)
                if (!isMuted && typeof window !== 'undefined' && 'speechSynthesis' in window) {
                  window.speechSynthesis.cancel()
                }
              }}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>
          </div>

          <div className="flex items-center gap-2">
            {hasEnded ? (
              <button
                onClick={restartVideo}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs shadow-md flex items-center gap-1.5 animate-bounce"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Replay Cartoon Short</span>
              </button>
            ) : (
              <span className="text-xs font-bold text-slate-300">
                {isPlaying ? '🎬 Playing Cartoon Video' : '⏸️ Video Paused'}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
