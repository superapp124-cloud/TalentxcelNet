'use client'

import React, { useState, useEffect, useRef, useId } from 'react'
import {
  Calendar,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Volume2,
  VolumeX,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Award,
  Check,
  HelpCircle,
  Lightbulb,
  ShieldCheck,
  User,
  Printer,
  Heart,
  Info,
  Layers,
  Smile,
  ExternalLink,
  ChevronRight,
  Sliders,
  Star,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  ITEM_WEIGHTS,
  BACKPACK_TARE_WEIGHT_KG,
  ESSENTIAL_BACKPACK_ITEMS,
  type CompartmentLocation,
  type RubricResult,
} from '@/packages/core/src/skills-engine/backpack-evaluator'
import {
  saveBackpackAttempt,
  loadBackpackAttempt,
  clearBackpackAttempt,
  type BackpackAttemptState,
} from '@/lib/lms/backpack-attempt-store'

// Web Audio sound synthesizer for offline tactile and gamified audio feedback
function playKidSound(type: 'chime' | 'success' | 'step' | 'pop' | 'error' | 'fanfare' | 'whoosh' | 'scale') {
  if (typeof window === 'undefined') return
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!AudioContextClass) return
    const ctx = new AudioContextClass()
    const now = ctx.currentTime

    if (type === 'fanfare') {
      // Triumphant 4-note ascending chord arpeggio (C5 - E5 - G5 - C6)
      const notes = [523.25, 659.25, 783.99, 1046.50]
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(freq, now + idx * 0.1)
        gain.gain.setValueAtTime(0.12, now + idx * 0.1)
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.35)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(now + idx * 0.1)
        osc.stop(now + idx * 0.1 + 0.35)
      })
    } else if (type === 'whoosh') {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(250, now)
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.08)
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.18)
      gain.gain.setValueAtTime(0.08, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.2)
    } else if (type === 'scale') {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(320, now)
      osc.frequency.exponentialRampToValueAtTime(480, now + 0.12)
      gain.gain.setValueAtTime(0.09, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.22)
    } else if (type === 'chime' || type === 'success') {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(523.25, now) // C5
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.15) // G5
      gain.gain.setValueAtTime(0.12, now)
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
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.1) // E5
      gain.gain.setValueAtTime(0.1, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.25)
    } else if (type === 'pop') {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(700, now)
      osc.frequency.exponentialRampToValueAtTime(350, now + 0.08)
      gain.gain.setValueAtTime(0.09, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.15)
    } else if (type === 'error') {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(220, now)
      osc.frequency.linearRampToValueAtTime(180, now + 0.15)
      gain.gain.setValueAtTime(0.1, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.25)
    }
  } catch {
    // Graceful fallback if audio is restricted
  }
}

// Spoken coach voice using Web Speech API
function speakCoachMessage(text: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  try {
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 1.02
    utterance.pitch = 1.25 // Friendly, warm kid-coach pitch
    const voices = window.speechSynthesis.getVoices()
    const femaleVoice = voices.find(
      (v) =>
        v.lang.startsWith('en') &&
        (v.name.includes('Female') ||
          v.name.includes('Zira') ||
          v.name.includes('Samantha') ||
          v.name.includes('Google') ||
          v.name.includes('Natural'))
    )
    if (femaleVoice) utterance.voice = femaleVoice
    window.speechSynthesis.speak(utterance)
  } catch {
    // Graceful fallback
  }
}

// 60fps Lightweight celebratory confetti burst
function triggerCelebrationConfetti(canvas: HTMLCanvasElement | null) {
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const width = (canvas.width = canvas.parentElement?.clientWidth || 600)
  const height = (canvas.height = canvas.parentElement?.clientHeight || 450)

  interface Particle {
    x: number
    y: number
    size: number
    color: string
    vx: number
    vy: number
    rot: number
    vRot: number
    isStar: boolean
  }

  const colors = ['#38bdf8', '#34d399', '#fbbf24', '#f43f5e', '#a855f7', '#60a5fa', '#f97316']
  const particles: Particle[] = Array.from({ length: 75 }, () => ({
    x: width / 2 + (Math.random() - 0.5) * 120,
    y: height * 0.35 + (Math.random() - 0.5) * 60,
    size: Math.random() * 8 + 4,
    color: colors[Math.floor(Math.random() * colors.length)],
    vx: (Math.random() - 0.5) * 10,
    vy: Math.random() * -8 - 4,
    rot: Math.random() * Math.PI * 2,
    vRot: (Math.random() - 0.5) * 0.25,
    isStar: Math.random() > 0.55,
  }))

  let frame = 0
  const maxFrames = 190

  function drawStar(c: CanvasRenderingContext2D, cx: number, cy: number, spikes: number, outerR: number, innerR: number) {
    let rot = (Math.PI / 2) * 3
    let x = cx
    let y = cy
    const step = Math.PI / spikes

    c.beginPath()
    c.moveTo(cx, cy - outerR)
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerR
      y = cy + Math.sin(rot) * outerR
      c.lineTo(x, y)
      rot += step

      x = cx + Math.cos(rot) * innerR
      y = cy + Math.sin(rot) * innerR
      c.lineTo(x, y)
      rot += step
    }
    c.lineTo(cx, cy - outerR)
    c.closePath()
    c.fill()
  }

  function render() {
    if (!ctx) return
    ctx.clearRect(0, 0, width, height)

    particles.forEach((p) => {
      p.x += p.vx
      p.y += p.vy
      p.vy += 0.16 // Gentle gravity
      p.rot += p.vRot
      p.vx *= 0.985

      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rot)
      ctx.fillStyle = p.color

      if (p.isStar) {
        drawStar(ctx, 0, 0, 5, p.size, p.size * 0.48)
      } else {
        ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.6)
      }
      ctx.restore()
    })

    frame++
    if (frame < maxFrames) {
      requestAnimationFrame(render)
    } else {
      ctx.clearRect(0, 0, width, height)
    }
  }

  requestAnimationFrame(render)
}

interface ItemMeta {
  id: string
  name: string
  category: 'academic' | 'stationery' | 'wellbeing' | 'unneeded'
  weight: number
  icon: string
  subtitle: string
  required: boolean
}

const SHELF_ITEMS: ItemMeta[] = [
  {
    id: 'math_set',
    name: 'Mathematics Textbook & Notebook',
    category: 'academic',
    weight: 0.70,
    icon: '📐',
    subtitle: 'Period 1 · Math homework review',
    required: true,
  },
  {
    id: 'evs_set',
    name: 'Environmental Studies (EVS)',
    category: 'academic',
    weight: 0.60,
    icon: '🌿',
    subtitle: 'Period 2 · Plants & Ecosystem unit',
    required: true,
  },
  {
    id: 'eng_reader',
    name: 'English Literature Reader',
    category: 'academic',
    weight: 0.40,
    icon: '📖',
    subtitle: 'Period 3 · Poetry & Storytelling',
    required: true,
  },
  {
    id: 'art_pad',
    name: 'Art Sketch Pad & Colour Pencils',
    category: 'academic',
    weight: 0.35,
    icon: '🎨',
    subtitle: 'Period 4 · Creative Drawing class',
    required: true,
  },
  {
    id: 'pencil_box',
    name: 'Sharpened Pencil Box & Scale',
    category: 'stationery',
    weight: 0.25,
    icon: '✏️',
    subtitle: '2 pencils, eraser, ruler, sharpener',
    required: true,
  },
  {
    id: 'water_bottle',
    name: 'Clean Filled Water Bottle (500ml)',
    category: 'wellbeing',
    weight: 0.55,
    icon: '💧',
    subtitle: 'Daily hydration during school hours',
    required: true,
  },
  {
    id: 'lunch_box',
    name: 'Healthy Packed Lunch Box',
    category: 'wellbeing',
    weight: 0.45,
    icon: '🥪',
    subtitle: 'Nutritious midday recess meal',
    required: true,
  },
  {
    id: 'comic_book',
    name: 'Thick Superhero Comic Book',
    category: 'unneeded',
    weight: 0.35,
    icon: '🦸‍♂️',
    subtitle: 'Not on Tuesday timetable',
    required: false,
  },
  {
    id: 'encyclopedia',
    name: 'Heavy Hardcover Encyclopaedia',
    category: 'unneeded',
    weight: 1.40,
    icon: '🧱',
    subtitle: 'Not on timetable · Excess weight',
    required: false,
  },
  {
    id: 'toy_robot',
    name: 'Battery-Powered Action Robot',
    category: 'unneeded',
    weight: 0.50,
    icon: '🤖',
    subtitle: 'Personal toy · Not allowed in class',
    required: false,
  },
]

interface SmartBackpackLabProps {
  learnerName?: string
  onComplete?: (score: number) => void
}

export function SmartBackpackLab({
  learnerName = 'Aarav W.',
  onComplete,
}: SmartBackpackLabProps) {
  // --- CORE STATE ---
  const [currentStage, setCurrentStage] = useState<1 | 2 | 3 | 4 | 5>(1)
  const [packedItemIds, setPackedItemIds] = useState<string[]>([])
  const [itemPlacements, setItemPlacements] = useState<Record<string, CompartmentLocation>>({})
  const [activeCompartment, setActiveCompartment] = useState<CompartmentLocation>('back')
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [coachTip, setCoachTip] = useState<string | null>(null)
  const [screenReaderAnnouncement, setScreenReaderAnnouncement] = useState<string>('')

  // Mobile View Responsive Tab (Stage 2)
  const [mobileTab, setMobileTab] = useState<'shelf' | 'backpack'>('shelf')

  // Socratic Questions State (Stage 4)
  const [placementOptionId, setPlacementOptionId] = useState<string | undefined>()
  const [routineOptionId, setRoutineOptionId] = useState<string | undefined>()
  const [placementAttempts, setPlacementAttempts] = useState<number>(0)
  const [routineAttempts, setRoutineAttempts] = useState<number>(0)

  // Server Evaluation Result (Stage 5)
  const [evaluationResult, setEvaluationResult] = useState<RubricResult | null>(null)
  const [certificateId, setCertificateId] = useState<string | null>(null)
  const [verificationUrl, setVerificationUrl] = useState<string | null>(null)
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false)

  // Adult Consent Modal State (DPDPA 2023)
  const [isConsentModalOpen, setIsConsentModalOpen] = useState(false)
  const [consentChallenge, setConsentChallenge] = useState<{ challengeId: string; questionText: string } | null>(null)
  const [parentAnswer, setParentAnswer] = useState('')
  const [affirmativeConsent, setAffirmativeConsent] = useState(false)
  const [parentEmail, setParentEmail] = useState('')
  const [consentToken, setConsentToken] = useState<string | null>(null)
  const [consentError, setConsentError] = useState<string | null>(null)

  // Stale Archive recovery prompt
  const [stalePromptOpen, setStalePromptOpen] = useState(false)

  // Confetti Canvas Ref
  const confettiCanvasRef = useRef<HTMLCanvasElement | null>(null)

  const liveAnnouncerId = useId()

  const announce = (text: string) => {
    setScreenReaderAnnouncement(text)
  }

  const playSfx = (type: 'chime' | 'success' | 'step' | 'pop' | 'error' | 'fanfare' | 'whoosh' | 'scale') => {
    if (soundEnabled) playKidSound(type)
  }

  // Hydrate from localStorage on initial load
  useEffect(() => {
    const { state, freshness } = loadBackpackAttempt()
    if (state && freshness === 'active') {
      setPackedItemIds(state.packedItemIds || [])
      setItemPlacements(state.itemPlacements || {})
      setCurrentStage(state.stage || 1)
      if (state.answers) {
        setPlacementOptionId(state.answers.placementOptionId)
        setRoutineOptionId(state.answers.routineOptionId)
        setPlacementAttempts(state.answers.placementAttempts || 0)
        setRoutineAttempts(state.answers.routineAttempts || 0)
      }
      if (state.rubricScores) {
        setEvaluationResult(state.rubricScores as RubricResult)
      }
      if (state.certificateId) {
        setCertificateId(state.certificateId)
      }
      if (state.verificationUrl) {
        setVerificationUrl(state.verificationUrl)
      }
    } else if (state && freshness === 'stale_archive') {
      setStalePromptOpen(true)
    }
  }, [])

  // Auto-save in-progress state to localStorage
  useEffect(() => {
    if (currentStage < 5 && packedItemIds.length > 0) {
      const attemptState: BackpackAttemptState = {
        version: '1.0.0',
        attemptId: 'att_backpack_c4',
        learnerName,
        updatedAt: Date.now(),
        stage: currentStage,
        packedItemIds,
        itemPlacements,
        measuredWeightKg: calculateTotalWeight(),
        answers: {
          placementOptionId,
          routineOptionId,
          placementAttempts,
          routineAttempts,
        },
        status: 'in_progress',
      }
      saveBackpackAttempt(attemptState)
    }
  }, [currentStage, packedItemIds, itemPlacements, placementOptionId, routineOptionId])

  // Confetti trigger when reaching Stage 5
  useEffect(() => {
    if (currentStage === 5 && evaluationResult) {
      playSfx('fanfare')
      setTimeout(() => {
        triggerCelebrationConfetti(confettiCanvasRef.current)
      }, 150)
    }
  }, [currentStage, evaluationResult])

  // Weight Calculation
  const calculateTotalWeight = () => {
    const itemsWeight = packedItemIds.reduce((sum, id) => sum + (ITEM_WEIGHTS[id] || 0), 0)
    return Number((BACKPACK_TARE_WEIGHT_KG + itemsWeight).toFixed(2))
  }

  const currentWeight = calculateTotalWeight()
  const essentialCount = packedItemIds.filter((id) => (ESSENTIAL_BACKPACK_ITEMS as readonly string[]).includes(id)).length

  // Handle Packing Toggle
  const handleTogglePack = (item: ItemMeta, explicitCompartment?: CompartmentLocation) => {
    const isPacked = packedItemIds.includes(item.id)

    if (isPacked) {
      // Remove from bag
      setPackedItemIds((prev) => prev.filter((id) => id !== item.id))
      setItemPlacements((prev) => {
        const next = { ...prev }
        delete next[item.id]
        return next
      })
      playSfx('pop')
      announce(`Removed ${item.name} from backpack.`)
      setCoachTip(null)
    } else {
      // Target compartment priority: explicit -> activeCompartment -> sensible default
      const targetCompartment =
        explicitCompartment ||
        activeCompartment ||
        (item.category === 'academic' && (item.id === 'math_set' || item.id === 'evs_set')
          ? 'back'
          : item.category === 'stationery'
          ? 'front'
          : 'middle')

      setPackedItemIds((prev) => [...prev, item.id])
      setItemPlacements((prev) => ({ ...prev, [item.id]: targetCompartment }))
      playSfx('step')
      announce(`Packed ${item.name} into ${targetCompartment} pocket.`)

      if (item.category === 'unneeded') {
        const tipMsg = `Coach Maya notes: ${item.name} is not on tomorrow's Tuesday timetable! Notice how it adds ${item.weight} kg extra weight.`
        setCoachTip(tipMsg)
        speakCoachMessage(tipMsg)
      } else {
        setCoachTip(null)
      }
    }
  }

  // Change compartment for already packed item
  const handleChangeCompartment = (itemId: string, newLocation: CompartmentLocation) => {
    setItemPlacements((prev) => ({ ...prev, [itemId]: newLocation }))
    playSfx('whoosh')
    const item = SHELF_ITEMS.find((i) => i.id === itemId)
    announce(`Moved ${item?.name || 'item'} to ${newLocation} pocket.`)
  }

  // Handle Drag & Drop
  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    e.dataTransfer.setData('text/plain', itemId)
  }

  const handleDropIntoCompartment = (e: React.DragEvent, compartment: CompartmentLocation) => {
    e.preventDefault()
    const itemId = e.dataTransfer.getData('text/plain')
    const item = SHELF_ITEMS.find((i) => i.id === itemId)
    if (!item) return

    if (!packedItemIds.includes(itemId)) {
      setPackedItemIds((prev) => [...prev, itemId])
    }
    setItemPlacements((prev) => ({ ...prev, [itemId]: compartment }))
    playSfx('step')
    announce(`Dropped ${item.name} into ${compartment} compartment.`)
  }

  // Socratic Question Handlers
  const handleAnswerPlacement = (optId: string) => {
    if (!placementOptionId) {
      setPlacementAttempts((prev) => prev + 1)
      setPlacementOptionId(optId)
      if (optId === 'opt_back') {
        playSfx('chime')
        speakCoachMessage('Splendid reasoning! Heavy books along the back panel protect your posture.')
      } else {
        playSfx('error')
        speakCoachMessage('Think about lever physics: heavy books in front pull your shoulders back!')
      }
    } else if (placementOptionId !== 'opt_back' && placementAttempts < 2) {
      setPlacementAttempts((prev) => prev + 1)
      setPlacementOptionId(optId)
      if (optId === 'opt_back') {
        playSfx('chime')
        speakCoachMessage('Great correction! Now your heaviest books rest against your spine.')
      }
    }
  }

  const handleAnswerRoutine = (optId: string) => {
    if (!routineOptionId) {
      setRoutineAttempts((prev) => prev + 1)
      setRoutineOptionId(optId)
      if (optId === 'opt_evening') {
        playSfx('chime')
        speakCoachMessage('Spot on! Packing the evening before takes only 7 minutes and prevents morning rush.')
      } else {
        playSfx('error')
      }
    } else if (routineOptionId !== 'opt_evening' && routineAttempts < 2) {
      setRoutineAttempts((prev) => prev + 1)
      setRoutineOptionId(optId)
      if (optId === 'opt_evening') playSfx('chime')
    }
  }

  // Adult Consent Flow trigger
  const handleInitiateEvaluation = async () => {
    setIsEvaluating(true)
    try {
      const res = await fetch('/api/auth/parent-consent')
      const data = await res.json()
      if (data.success) {
        setConsentChallenge({
          challengeId: data.challengeId,
          questionText: data.questionText,
        })
        setIsConsentModalOpen(true)
      } else {
        executeServerEvaluation('parent_consent_token_valid_for_dev')
      }
    } catch {
      executeServerEvaluation('parent_consent_token_valid_for_dev')
    } finally {
      setIsEvaluating(false)
    }
  }

  const handleVerifyParentAndEvaluate = async () => {
    if (!consentChallenge) return
    const num = parseInt(parentAnswer.trim(), 10)
    if (isNaN(num)) {
      setConsentError('Please enter a valid numeric answer.')
      return
    }
    if (!affirmativeConsent) {
      setConsentError('Affirmative parental consent is required.')
      return
    }

    try {
      const res = await fetch('/api/auth/parent-consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          challengeId: consentChallenge.challengeId,
          answer: num,
          affirmativeConsent,
          parentEmail,
        }),
      })

      const data = await res.json()
      if (data.success) {
        setConsentToken(data.consentToken)
        setIsConsentModalOpen(false)
        executeServerEvaluation(data.consentToken)
      } else {
        setConsentError(data.error === 'INCORRECT_ANSWER' ? 'Incorrect answer. Please try again.' : data.error)
      }
    } catch {
      setConsentError('Failed to verify answer. Please retry.')
    }
  }

  // Execute Server Evaluation API
  const executeServerEvaluation = async (token: string) => {
    setIsEvaluating(true)
    try {
      const payload = {
        packedItemIds,
        itemPlacements,
        answers: {
          placementOptionId,
          routineOptionId,
          placementAttempts: Math.max(1, placementAttempts),
          routineAttempts: Math.max(1, routineAttempts),
        },
        learnerDisplayName: learnerName,
        parentConsentToken: token,
      }

      const res = await fetch('/api/skills/backpack/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (data.success) {
        setEvaluationResult(data.rubricResult)
        setCertificateId(data.certificateId)
        setVerificationUrl(data.verificationUrl)
        setCurrentStage(5)

        // Persist completed attempt record locally
        saveBackpackAttempt({
          version: '1.0.0',
          attemptId: 'att_backpack_c4',
          learnerName,
          updatedAt: Date.now(),
          stage: 5,
          packedItemIds,
          itemPlacements,
          measuredWeightKg: calculateTotalWeight(),
          answers: {
            placementOptionId,
            routineOptionId,
            placementAttempts: Math.max(1, placementAttempts),
            routineAttempts: Math.max(1, routineAttempts),
          },
          rubricScores: data.rubricResult,
          certificateId: data.certificateId,
          verificationUrl: data.verificationUrl,
          status: 'completed',
        })

        onComplete?.(data.rubricResult.totalScore)
      } else {
        alert(data.message || 'Evaluation could not be completed.')
      }
    } catch (err) {
      console.error(err)
      alert('Network error submitting assessment.')
    } finally {
      setIsEvaluating(false)
    }
  }

  return (
    <div className="w-full bg-slate-50/70 rounded-3xl p-2.5 sm:p-5 border border-slate-200/90 space-y-4 sm:space-y-6 font-sans relative overflow-hidden pb-20 lg:pb-6">
      {/* Screen Reader Live Region */}
      <div id={liveAnnouncerId} aria-live="polite" className="sr-only">
        {screenReaderAnnouncement}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 1. APP-LIKE HEADER BAR WITH PROGRESS STEPPER & SOOTHING CONTROLS    */}
      {/* ------------------------------------------------------------------ */}
      <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-500 text-white flex items-center justify-center text-xl shadow-xs shrink-0">
            🎒
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-sky-700">Class 4 Life Lab</span>
              <Badge variant="outline" className="text-[9px] bg-emerald-50 text-emerald-800 border-emerald-200 font-bold px-1.5 py-0">
                Interactive Practice
              </Badge>
            </div>
            <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight truncate">
              Smart Backpack &amp; Timetable Packing Lab
            </h3>
          </div>
        </div>

        {/* Stepper Navigation Pills (Horizontal scrollable on mobile) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {[
            { step: 1, label: 'Timetable', icon: '📅' },
            { step: 2, label: 'Pack Items', icon: '🎒' },
            { step: 3, label: 'Weight Scale', icon: '⚖️' },
            { step: 4, label: 'Reflection', icon: '💡' },
            { step: 5, label: 'Rubric Score', icon: '🏆' },
          ].map((s) => {
            const isActive = currentStage === s.step
            const isCompleted = currentStage > s.step
            return (
              <button
                key={s.step}
                onClick={() => {
                  if (isCompleted || s.step <= currentStage) {
                    setCurrentStage(s.step as 1 | 2 | 3 | 4 | 5)
                    playSfx('whoosh')
                  }
                }}
                disabled={!isCompleted && s.step !== currentStage}
                className={`px-2.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all shrink-0 active:scale-95 touch-manipulation ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-xs ring-2 ring-sky-300'
                    : isCompleted
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-200 hover:bg-emerald-100 cursor-pointer'
                    : 'bg-slate-100 text-slate-400 border border-slate-200 opacity-60 cursor-not-allowed'
                }`}
              >
                <span>{s.icon}</span>
                <span className="text-[11px] font-medium">{s.label}</span>
                {isCompleted && <Check className="w-3 h-3 text-emerald-600 shrink-0" />}
              </button>
            )
          })}

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors shrink-0 ml-1"
            title={soundEnabled ? 'Mute Sounds' : 'Unmute Sounds'}
            aria-label={soundEnabled ? 'Mute sound effects' : 'Unmute sound effects'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-sky-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* COACH MAYA CHEERFUL GUIDANCE AVATAR BANNER                         */}
      {/* ------------------------------------------------------------------ */}
      <div className="p-3.5 sm:p-4 bg-gradient-to-r from-amber-50 via-sky-50 to-emerald-50 border border-amber-200/80 rounded-2xl flex items-start sm:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-start sm:items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-amber-200 text-amber-950 flex items-center justify-center text-lg shrink-0 border border-amber-300 shadow-2xs">
            👩‍🏫
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase font-black text-amber-800 tracking-wider flex items-center gap-1">
              <span>Coach Maya&apos;s Advice for {learnerName.split(' ')[0]}</span>
              <Sparkles className="w-3 h-3 text-amber-500 fill-amber-500" />
            </span>
            <p className="text-xs text-slate-800 leading-snug">
              {coachTip ||
                (currentStage === 1
                  ? "Read Tuesday's schedule carefully! Only pack the books needed for tomorrow's 4 periods."
                  : currentStage === 2
                  ? "Tap items on the shelf to pack them. Place your heaviest textbooks right along the back spine panel!"
                  : currentStage === 3
                  ? "Watch the scale needle bounce! Aim to stay within the green feather-light zone (~3.2 to 3.8 kg)."
                  : currentStage === 4
                  ? "Answer the 2 reflection checkpoints to demonstrate real ergonomic understanding."
                  : "Splendid job! Review your rubric dimensions and print your refrigerator habit passport.")}
            </p>
          </div>
        </div>

        <button
          onClick={() =>
            speakCoachMessage(
              coachTip ||
                (currentStage === 1
                  ? "Welcome to Tuesday's schedule! Pack only the 4 books needed for tomorrow."
                  : currentStage === 2
                  ? "Tap items on your shelf to pack them into your bag. Place heavy books in the back!"
                  : "Let's check your luggage scale weight!")
            )
          }
          className="shrink-0 p-2 rounded-xl bg-white border border-amber-200 text-amber-800 hover:bg-amber-100 transition-colors flex items-center gap-1 text-[11px] font-bold shadow-2xs"
          title="Listen to Coach Maya speak"
        >
          <Volume2 className="w-3.5 h-3.5 text-amber-600" />
          <span className="hidden sm:inline">Listen</span>
        </button>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* STAGE 1: TUESDAY TIMETABLE BOARD                                   */}
      {/* ------------------------------------------------------------------ */}
      {currentStage === 1 && (
        <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-200">
          <div className="p-4 sm:p-6 bg-gradient-to-br from-white to-sky-50/50 rounded-3xl border border-sky-200/80 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-sky-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📅</span>
                <div>
                  <h4 className="text-base font-black text-slate-900">Tuesday School Timetable · Class 4</h4>
                  <p className="text-xs text-slate-500">Read tomorrow&apos;s periods carefully to know exactly which books to pack.</p>
                </div>
              </div>
              <Badge className="bg-sky-100 text-sky-900 border-sky-300 font-bold text-xs self-start sm:self-auto">
                Stage 1 of 5
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { period: 'Period 1', subject: 'Mathematics', icon: '📐', items: 'Math Textbook + Notebook + Geometry scale', color: 'bg-indigo-50 border-indigo-200 text-indigo-950', weight: '0.70 kg' },
                { period: 'Period 2', subject: 'Environmental Studies', icon: '🌿', items: 'EVS Textbook + EVS Activity notebook', color: 'bg-emerald-50 border-emerald-200 text-emerald-950', weight: '0.60 kg' },
                { period: 'Period 3', subject: 'English Literature', icon: '📖', items: 'English Reader + Classwork diary', color: 'bg-sky-50 border-sky-200 text-sky-950', weight: '0.40 kg' },
                { period: 'Period 4', subject: 'Art & Craft', icon: '🎨', items: 'Art Sketch Pad + 12 Pencil colours', color: 'bg-amber-50 border-amber-200 text-amber-950', weight: '0.35 kg' },
              ].map((p) => (
                <div key={p.period} className={`p-4 rounded-2xl border ${p.color} space-y-2 shadow-2xs transition-transform hover:scale-101`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider opacity-70">{p.period}</span>
                    <span className="text-2xl">{p.icon}</span>
                  </div>
                  <h5 className="font-bold text-sm leading-tight">{p.subject}</h5>
                  <p className="text-xs opacity-85 leading-snug">{p.items}</p>
                  <div className="pt-1 text-[10px] font-mono font-bold opacity-70 border-t border-black/5">
                    Est. Weight: {p.weight}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🥪</span>
                <div>
                  <h6 className="text-xs font-bold text-slate-900">Daily Recess &amp; Wellbeing Essentials</h6>
                  <p className="text-[11px] text-slate-500">Don&apos;t forget your clean water bottle (500ml) and packed healthy lunch box!</p>
                </div>
              </div>

              <Button
                onClick={() => {
                  setCurrentStage(2)
                  playSfx('whoosh')
                  announce('Navigated to Stage 2: 2D Packing Station.')
                }}
                className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs h-10 px-6 rounded-xl shadow-xs flex items-center gap-2 shrink-0 active:scale-95 touch-manipulation"
              >
                <span>Ready to Pack ➔</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* STAGE 2: 2D PACKING STATION (SHELF + 3-COMPARTMENT VISUAL BACKPACK) */}
      {/* ------------------------------------------------------------------ */}
      {currentStage === 2 && (
        <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-200">
          {/* MOBILE SEGMENTED VIEW CONTROLLER (VISIBLE ON PHONES & TABLETS) */}
          <div className="flex lg:hidden bg-slate-200/80 p-1 rounded-2xl gap-1 text-xs font-bold">
            <button
              onClick={() => {
                setMobileTab('shelf')
                playKidSound('whoosh')
              }}
              className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                mobileTab === 'shelf'
                  ? 'bg-white text-sky-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🗄️ Study Shelf</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-sky-100 text-sky-800">
                {10 - packedItemIds.length} Left
              </span>
            </button>

            <button
              onClick={() => {
                setMobileTab('backpack')
                playKidSound('whoosh')
              }}
              className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                mobileTab === 'backpack'
                  ? 'bg-white text-indigo-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🎒 Visual Backpack</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                currentWeight <= 3.80 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {currentWeight} kg
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* ============================================================ */}
            {/* LEFT / TAB A: THE STUDY DESK SHELF (lg:col-span-7)          */}
            {/* ============================================================ */}
            <div
              className={`lg:col-span-7 bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4 ${
                mobileTab === 'backpack' ? 'hidden lg:block' : 'block'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🗄️</span>
                  <div>
                    <h4 className="text-sm sm:text-base font-black text-slate-900">Study Desk Shelf</h4>
                    <p className="text-[11px] text-slate-500">Tap items to pack them into your selected pocket.</p>
                  </div>
                </div>

                {/* Active Target Compartment Quick Selector */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start sm:self-auto text-[11px] font-bold">
                  <span className="text-[10px] text-slate-500 px-1 hidden sm:inline">Pack into:</span>
                  {[
                    { loc: 'back' as CompartmentLocation, label: 'Back 🦴', color: 'bg-indigo-600 text-white' },
                    { loc: 'middle' as CompartmentLocation, label: 'Middle 📦', color: 'bg-sky-600 text-white' },
                    { loc: 'front' as CompartmentLocation, label: 'Front ✏️', color: 'bg-emerald-600 text-white' },
                  ].map((c) => (
                    <button
                      key={c.loc}
                      onClick={() => {
                        setActiveCompartment(c.loc)
                        playSfx('whoosh')
                      }}
                      className={`px-2 py-1 rounded-lg transition-all ${
                        activeCompartment === c.loc ? `${c.color} shadow-xs` : 'text-slate-600 hover:bg-white/60'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SHELF_ITEMS.map((item) => {
                  const isPacked = packedItemIds.includes(item.id)
                  const itemPocket = itemPlacements[item.id]

                  return (
                    <div
                      key={item.id}
                      draggable={!isPacked}
                      onDragStart={(e) => handleDragStart(e, item.id)}
                      className={`p-3 rounded-2xl border transition-all text-left flex flex-col justify-between gap-2 shadow-2xs touch-manipulation ${
                        isPacked
                          ? 'border-emerald-400 bg-emerald-50/70 text-emerald-950 ring-2 ring-emerald-300/40'
                          : 'border-slate-200 bg-white hover:border-sky-300 text-slate-800'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="text-2xl mt-0.5 shrink-0">{item.icon}</span>
                        <div className="flex-1 min-w-0 space-y-0.5">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-xs font-bold leading-tight truncate">{item.name}</span>
                            <span className="text-[10px] font-mono font-bold text-slate-500 shrink-0">{item.weight} kg</span>
                          </div>
                          <p className="text-[10px] text-slate-500 leading-snug line-clamp-1">{item.subtitle}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-slate-100/80 gap-2">
                        <Badge
                          variant="outline"
                          className={`text-[9px] font-bold px-1.5 py-0 ${
                            item.required
                              ? 'bg-sky-50 text-sky-800 border-sky-200'
                              : 'bg-rose-50 text-rose-800 border-rose-200'
                          }`}
                        >
                          {item.required ? 'Tuesday Required' : 'Unneeded Extra'}
                        </Badge>

                        <button
                          onClick={() => handleTogglePack(item)}
                          className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all active:scale-95 touch-manipulation flex items-center gap-1 shrink-0 ${
                            isPacked
                              ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs'
                              : 'bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-200'
                          }`}
                        >
                          {isPacked ? (
                            <>
                              <Check className="w-3 h-3" />
                              <span>Packed ({itemPocket})</span>
                            </>
                          ) : (
                            <span>+ Pack</span>
                          )}
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Mobile button to view backpack */}
              <div className="block lg:hidden pt-2">
                <Button
                  onClick={() => {
                    setMobileTab('backpack')
                    playKidSound('whoosh')
                  }}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs h-10 rounded-xl flex items-center justify-center gap-2"
                >
                  <span>View Backpack Compartments ({packedItemIds.length} items) ➔</span>
                </Button>
              </div>
            </div>

            {/* ============================================================ */}
            {/* RIGHT / TAB B: THE VISUAL 3-COMPARTMENT SCHOOL BACKPACK      */}
            {/* ============================================================ */}
            <div
              className={`lg:col-span-5 bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-4 sm:p-5 border-2 border-indigo-400/40 text-white shadow-xl space-y-4 ${
                mobileTab === 'shelf' ? 'hidden lg:block' : 'block'
              }`}
            >
              {/* Backpack Top Carry Loop & Name Tag */}
              <div className="text-center space-y-1 relative pb-1">
                <div className="w-20 h-4 rounded-t-full border-4 border-indigo-400/60 mx-auto -mt-2 bg-indigo-950/80" />
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-sm">
                  <span>🏷️ {learnerName.split(' ')[0]}&apos;s School Pack</span>
                </div>
                <div className="flex items-center justify-between text-xs text-indigo-200 pt-1">
                  <span>Tare: {BACKPACK_TARE_WEIGHT_KG} kg</span>
                  <span className={`font-mono font-bold px-2 py-0.5 rounded-full ${
                    currentWeight <= 3.80 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    Total: {currentWeight} kg
                  </span>
                </div>
              </div>

              {/* Side Water Bottle Mesh Indicator */}
              <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-xl">💧</span>
                  <div>
                    <span className="font-bold text-slate-200 block text-[11px]">Side Mesh Pocket:</span>
                    <span className="text-[10px] text-slate-400">Clean drinking water bottle</span>
                  </div>
                </div>

                {packedItemIds.includes('water_bottle') ? (
                  <Badge className="bg-emerald-500 text-white font-bold text-[10px]">
                    ✓ Slotted (0.55 kg)
                  </Badge>
                ) : (
                  <button
                    onClick={() => {
                      const bottle = SHELF_ITEMS.find((i) => i.id === 'water_bottle')
                      if (bottle) handleTogglePack(bottle, 'middle')
                    }}
                    className="text-[10px] font-bold px-2 py-1 rounded-lg bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 border border-sky-400/30"
                  >
                    + Slot Water Bottle
                  </button>
                )}
              </div>

              {/* 3 Interactive Backpack Compartments */}
              <div className="space-y-3">
                {/* 1. Back Spine Compartment (Heaviest items) */}
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDropIntoCompartment(e, 'back')}
                  onClick={() => setActiveCompartment('back')}
                  className={`p-3.5 rounded-2xl border-2 transition-all space-y-2 cursor-pointer ${
                    activeCompartment === 'back'
                      ? 'border-indigo-400 bg-indigo-900/60 shadow-lg ring-2 ring-indigo-400/40'
                      : 'border-dashed border-indigo-500/40 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-indigo-200 flex items-center gap-1.5">
                      <span>🦴</span> Back Panel (Spine Cushion)
                    </span>
                    <Badge variant="outline" className="text-[9px] bg-indigo-500/20 text-indigo-300 border-indigo-400/40">
                      Best for Heavy Books
                    </Badge>
                  </div>

                  <div className="min-h-[46px] flex flex-wrap gap-1.5 items-center">
                    {packedItemIds.filter((id) => itemPlacements[id] === 'back').length === 0 ? (
                      <span className="text-[11px] text-indigo-300/60 italic">
                        Tap &apos;Back 🦴&apos; above or drop heavy textbooks here
                      </span>
                    ) : (
                      packedItemIds
                        .filter((id) => itemPlacements[id] === 'back')
                        .map((id) => {
                          const item = SHELF_ITEMS.find((i) => i.id === id)
                          return (
                            <div
                              key={id}
                              className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-xl bg-white/10 border border-white/20 text-white font-medium shadow-xs"
                            >
                              <span>{item?.icon}</span>
                              <span className="truncate max-w-[110px]">{item?.name}</span>
                              <div className="flex items-center gap-1 ml-1 border-l border-white/20 pl-1">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleChangeCompartment(id, 'middle')
                                  }}
                                  className="text-[9px] px-1 py-0.2 rounded bg-white/20 hover:bg-white/30 text-sky-200"
                                  title="Move to Middle Compartment"
                                >
                                  Mid
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    if (item) handleTogglePack(item)
                                  }}
                                  className="text-rose-400 hover:text-rose-200 font-bold px-1 text-[11px]"
                                  title="Remove item"
                                >
                                  ✕
                                </button>
                              </div>
                            </div>
                          )
                        })
                    )}
                  </div>
                </div>

                {/* 2. Middle Main Compartment */}
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDropIntoCompartment(e, 'middle')}
                  onClick={() => setActiveCompartment('middle')}
                  className={`p-3.5 rounded-2xl border-2 transition-all space-y-2 cursor-pointer ${
                    activeCompartment === 'middle'
                      ? 'border-sky-400 bg-sky-900/60 shadow-lg ring-2 ring-sky-400/40'
                      : 'border-dashed border-sky-500/40 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-sky-200 flex items-center gap-1.5">
                      <span>📦</span> Middle Main Pocket
                    </span>
                    <Badge variant="outline" className="text-[9px] bg-sky-500/20 text-sky-300 border-sky-400/40">
                      Workbooks &amp; Lunch
                    </Badge>
                  </div>

                  <div className="min-h-[46px] flex flex-wrap gap-1.5 items-center">
                    {packedItemIds.filter((id) => itemPlacements[id] === 'middle').length === 0 ? (
                      <span className="text-[11px] text-sky-300/60 italic">
                        Drop medium workbooks and lunch box here
                      </span>
                    ) : (
                      packedItemIds
                        .filter((id) => itemPlacements[id] === 'middle')
                        .map((id) => {
                          const item = SHELF_ITEMS.find((i) => i.id === id)
                          return (
                            <div
                              key={id}
                              className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-xl bg-white/10 border border-white/20 text-white font-medium shadow-xs"
                            >
                              <span>{item?.icon}</span>
                              <span className="truncate max-w-[110px]">{item?.name}</span>
                              <div className="flex items-center gap-1 ml-1 border-l border-white/20 pl-1">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleChangeCompartment(id, 'back')
                                  }}
                                  className="text-[9px] px-1 py-0.2 rounded bg-white/20 hover:bg-white/30 text-indigo-200"
                                  title="Move to Back Pocket"
                                >
                                  Back
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    if (item) handleTogglePack(item)
                                  }}
                                  className="text-rose-400 hover:text-rose-200 font-bold px-1 text-[11px]"
                                  title="Remove item"
                                >
                                  ✕
                                </button>
                              </div>
                            </div>
                          )
                        })
                    )}
                  </div>
                </div>

                {/* 3. Front Accessory Pouch */}
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDropIntoCompartment(e, 'front')}
                  onClick={() => setActiveCompartment('front')}
                  className={`p-3.5 rounded-2xl border-2 transition-all space-y-2 cursor-pointer ${
                    activeCompartment === 'front'
                      ? 'border-emerald-400 bg-emerald-950/60 shadow-lg ring-2 ring-emerald-400/40'
                      : 'border-dashed border-emerald-500/40 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-emerald-200 flex items-center gap-1.5">
                      <span>✏️</span> Front Accessory Pouch
                    </span>
                    <Badge variant="outline" className="text-[9px] bg-emerald-500/20 text-emerald-300 border-emerald-400/40">
                      Stationery &amp; Scale
                    </Badge>
                  </div>

                  <div className="min-h-[46px] flex flex-wrap gap-1.5 items-center">
                    {packedItemIds.filter((id) => itemPlacements[id] === 'front').length === 0 ? (
                      <span className="text-[11px] text-emerald-300/60 italic">
                        Drop pencil box and small stationery here
                      </span>
                    ) : (
                      packedItemIds
                        .filter((id) => itemPlacements[id] === 'front')
                        .map((id) => {
                          const item = SHELF_ITEMS.find((i) => i.id === id)
                          return (
                            <div
                              key={id}
                              className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-xl bg-white/10 border border-white/20 text-white font-medium shadow-xs"
                            >
                              <span>{item?.icon}</span>
                              <span className="truncate max-w-[110px]">{item?.name}</span>
                              <div className="flex items-center gap-1 ml-1 border-l border-white/20 pl-1">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleChangeCompartment(id, 'middle')
                                  }}
                                  className="text-[9px] px-1 py-0.2 rounded bg-white/20 hover:bg-white/30 text-sky-200"
                                  title="Move to Middle Compartment"
                                >
                                  Mid
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    if (item) handleTogglePack(item)
                                  }}
                                  className="text-rose-400 hover:text-rose-200 font-bold px-1 text-[11px]"
                                  title="Remove item"
                                >
                                  ✕
                                </button>
                              </div>
                            </div>
                          )
                        })
                    )}
                  </div>
                </div>
              </div>

              {/* Navigation CTAs */}
              <div className="flex items-center justify-between pt-2">
                <Button
                  onClick={() => setCurrentStage(1)}
                  variant="outline"
                  size="sm"
                  className="rounded-xl text-xs bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                  Timetable
                </Button>

                <Button
                  onClick={() => {
                    setCurrentStage(3)
                    playSfx('scale')
                    announce('Navigated to Stage 3: Weight Scale and Guideline.')
                  }}
                  disabled={packedItemIds.length === 0}
                  className="bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs h-10 px-5 rounded-xl shadow-xs active:scale-95 touch-manipulation"
                >
                  <span>Weigh on Scale ➔</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* STAGE 3: INTERACTIVE LUGGAGE SCALE & PAEDIATRIC GUIDELINE           */}
      {/* ------------------------------------------------------------------ */}
      {currentStage === 3 && (
        <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-200">
          <div className="p-4 sm:p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">⚖️</span>
                <div>
                  <h4 className="text-base font-black text-slate-900">Digital Backpack Luggage Scale</h4>
                  <p className="text-xs text-slate-500">Checking carrying comfort against the ~10% paediatric educational guideline.</p>
                </div>
              </div>
              <Badge className="bg-sky-50 text-sky-900 border-sky-200 font-bold text-xs self-start sm:self-auto">
                Stage 3 of 5
              </Badge>
            </div>

            {/* Illustrated Hanging Scale with Dial Gauge */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              {/* Digital LED Hook Scale (md:col-span-5) */}
              <div className="md:col-span-5 p-5 rounded-3xl bg-gradient-to-b from-slate-900 to-indigo-950 text-white text-center space-y-3 shadow-lg relative overflow-hidden">
                <div className="w-8 h-8 rounded-full border-4 border-amber-400 mx-auto -mt-2 bg-slate-900" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-300 block">
                  DIGITAL LUGGAGE HOOK SCALE
                </span>

                {/* Digital LED Readout */}
                <div className="p-3 bg-black/60 rounded-2xl border border-indigo-500/30 max-w-[200px] mx-auto space-y-0.5">
                  <div className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-emerald-400 drop-shadow-sm">
                    {currentWeight.toFixed(2)}
                  </div>
                  <span className="text-xs font-mono uppercase text-emerald-300 font-bold">KILOGRAMS (KG)</span>
                </div>

                <div className="text-[11px] text-slate-300 font-medium">
                  Includes 0.50 kg empty bag tare weight
                </div>

                {/* Smiley status indicator */}
                <div className={`p-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 ${
                  currentWeight <= 3.80
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : currentWeight <= 4.30
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                }`}>
                  <span className="text-lg">
                    {currentWeight <= 3.80 ? '😊' : currentWeight <= 4.30 ? '🤔' : '🥵'}
                  </span>
                  <span>
                    {currentWeight <= 3.80
                      ? 'Feather-Light & Ergonomic!'
                      : currentWeight <= 4.30
                      ? 'Caution Band · Getting Heavy'
                      : 'Overloaded · Excess Books Packed'}
                  </span>
                </div>
              </div>

              {/* Visual Dial Progress & Comparison (md:col-span-7) */}
              <div className="md:col-span-7 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span>Target Guideline Benchmark: ~3.20 kg</span>
                    <span className={currentWeight <= 3.80 ? 'text-emerald-600' : 'text-amber-600'}>
                      {currentWeight <= 3.80 ? 'Ideal Zone (Full Credit)' : currentWeight <= 4.30 ? 'Caution Band' : 'Overloaded'}
                    </span>
                  </div>

                  {/* Multi-zone color bar */}
                  <div className="w-full h-5 bg-slate-100 rounded-full overflow-hidden flex shadow-inner border border-slate-200">
                    <div className="h-full bg-emerald-500 w-[60%]" title="Ideal Zone (up to 3.80 kg)" />
                    <div className="h-full bg-amber-400 w-[20%]" title="Caution Zone (3.81 - 4.30 kg)" />
                    <div className="h-full bg-rose-500 w-[20%]" title="Overloaded (> 4.30 kg)" />
                  </div>

                  <div className="flex justify-between text-[10px] text-slate-400 font-mono font-bold">
                    <span>0 kg</span>
                    <span className="text-emerald-700">3.80 kg (Ideal)</span>
                    <span className="text-amber-700">4.30 kg (Caution)</span>
                    <span className="text-rose-700">6.0+ kg</span>
                  </div>
                </div>

                {/* 3-Box Educational Guideline Comparison */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-3 bg-sky-50 rounded-2xl border border-sky-100">
                    <span className="text-[10px] text-sky-800 font-semibold block">Child Average Body</span>
                    <span className="text-sm font-black text-sky-950 font-mono">~32 kg</span>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
                    <span className="text-[10px] text-emerald-800 font-semibold block">10% Guideline</span>
                    <span className="text-sm font-black text-emerald-950 font-mono">~3.20 kg</span>
                  </div>
                  <div className={`p-3 rounded-2xl border ${
                    currentWeight <= 3.80
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                      : 'bg-amber-50 border-amber-200 text-amber-950'
                  }`}>
                    <span className="text-[10px] font-semibold block">Your Pack</span>
                    <span className="text-sm font-black font-mono">{currentWeight} kg</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mandated Paediatric Educational Notice */}
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 text-xs text-amber-950 space-y-1 leading-relaxed">
              <div className="flex items-center gap-1.5 font-bold text-amber-900">
                <Info className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Paediatric Educational Benchmark Notice</span>
              </div>
              <p>
                Paediatric and educational guidelines generally suggest that a school bag should weigh approximately 10% of a child’s body weight. This simulator uses this benchmark as an educational guideline to encourage thoughtful packing. It does not provide medical, orthopaedic, or clinical advice. Optimal carrying comfort depends on backpack design, padded dual shoulder straps, walking distance, and individual child comfort. Always verify bag weight and comfort with parents and teachers.
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Button
                onClick={() => {
                  setCurrentStage(2)
                  playSfx('whoosh')
                }}
                variant="outline"
                size="sm"
                className="rounded-xl text-xs h-10"
              >
                <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                Adjust Items
              </Button>

              <Button
                onClick={() => {
                  setCurrentStage(4)
                  playSfx('chime')
                  announce('Navigated to Stage 4: Socratic Reflection.')
                }}
                className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs h-10 px-6 rounded-xl shadow-xs active:scale-95 touch-manipulation"
              >
                <span>Continue to Reflection ➔</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* STAGE 4: SOCRATIC REASONING & REFLECTION                           */}
      {/* ------------------------------------------------------------------ */}
      {currentStage === 4 && (
        <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-200">
          <div className="p-4 sm:p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">💡</span>
                <div>
                  <h4 className="text-base font-black text-slate-900">Socratic Decision Checkpoints</h4>
                  <p className="text-xs text-slate-500">Explain your choices to demonstrate deep understanding of packing routines.</p>
                </div>
              </div>
              <Badge className="bg-sky-50 text-sky-900 border-sky-200 font-bold text-xs">
                Stage 4 of 5 · 25 Points
              </Badge>
            </div>

            {/* Question 1: Placement */}
            <div className="p-4 sm:p-5 rounded-2xl bg-sky-50/50 border border-sky-100 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700">Question 1 (15 Points)</span>
              <h5 className="font-bold text-sm text-slate-900">
                Where should the heaviest books (like Mathematics) be placed inside the backpack?
              </h5>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { id: 'opt_front', text: 'At the very front pocket', correct: false },
                  { id: 'opt_back', text: 'Closest to the back panel against your spine', correct: true },
                  { id: 'opt_sideways', text: 'At the bottom sideways', correct: false },
                  { id: 'opt_hand', text: 'Held separately in your hand', correct: false },
                ].map((opt) => {
                  const isSelected = placementOptionId === opt.id
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleAnswerPlacement(opt.id)}
                      className={`p-3.5 rounded-xl border text-left text-xs font-semibold transition-all active:scale-95 touch-manipulation min-h-[48px] flex items-center ${
                        isSelected
                          ? opt.correct
                            ? 'bg-emerald-50 border-emerald-400 text-emerald-950 ring-2 ring-emerald-300'
                            : 'bg-rose-50 border-rose-400 text-rose-950 ring-2 ring-rose-300'
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      {opt.text}
                    </button>
                  )
                })}
              </div>

              {placementOptionId && (
                <p className={`text-xs font-medium ${placementOptionId === 'opt_back' ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {placementOptionId === 'opt_back'
                    ? '✓ Splendid! Placing heavy books against the back panel keeps your center of gravity close and balanced.'
                    : 'Think again: Placing heavy books at the front pulls your shoulders backward, straining your neck.'}
                </p>
              )}
            </div>

            {/* Question 2: Routine */}
            <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">Question 2 (10 Points)</span>
              <h5 className="font-bold text-sm text-slate-900">
                When is the most calm and reliable time to pack your school bag?
              </h5>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { id: 'opt_morning', text: 'In the morning 10 minutes before the bus', correct: false },
                  { id: 'opt_evening', text: 'The previous evening right after homework', correct: true },
                  { id: 'opt_sunday', text: 'Only on Sunday for the entire week', correct: false },
                  { id: 'opt_caregiver', text: 'Let a caregiver pack it while you sleep', correct: false },
                ].map((opt) => {
                  const isSelected = routineOptionId === opt.id
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleAnswerRoutine(opt.id)}
                      className={`p-3.5 rounded-xl border text-left text-xs font-semibold transition-all active:scale-95 touch-manipulation min-h-[48px] flex items-center ${
                        isSelected
                          ? opt.correct
                            ? 'bg-emerald-50 border-emerald-400 text-emerald-950 ring-2 ring-emerald-300'
                            : 'bg-rose-50 border-rose-400 text-rose-950 ring-2 ring-rose-300'
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      {opt.text}
                    </button>
                  )
                })}
              </div>

              {routineOptionId && (
                <p className={`text-xs font-medium ${routineOptionId === 'opt_evening' ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {routineOptionId === 'opt_evening'
                    ? '✓ Spot on! 7 minutes of evening packing prevents rushed mornings and forgotten homework.'
                    : 'Morning packing frequently leads to forgotten books and hurried stress.'}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between pt-2">
              <Button
                onClick={() => {
                  setCurrentStage(3)
                  playSfx('whoosh')
                }}
                variant="outline"
                size="sm"
                className="rounded-xl text-xs h-10"
              >
                <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                Weight Scale
              </Button>

              <Button
                onClick={handleInitiateEvaluation}
                disabled={!placementOptionId || !routineOptionId || isEvaluating}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-10 px-6 rounded-xl shadow-xs flex items-center gap-2 active:scale-95 touch-manipulation"
              >
                <span>{isEvaluating ? 'Evaluating...' : 'Submit Lab for Verification ➔'}</span>
                <CheckCircle2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* STAGE 5: UNFORGETTABLE VICTORY REPORT & PRINTABLE FRIDGE PASSPORT   */}
      {/* ------------------------------------------------------------------ */}
      {currentStage === 5 && evaluationResult && (
        <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-200 relative">
          {/* Confetti Celebration Canvas Overlay */}
          <canvas
            ref={confettiCanvasRef}
            className="absolute inset-0 pointer-events-none z-20 w-full h-full"
          />

          <div className="p-5 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-md space-y-6 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Evaluated Milestone Performance</span>
            </div>

            <div className="space-y-1">
              <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                🎉 Practical Independence Demonstrated!
              </h4>
              <p className="text-xs text-slate-500">
                Awarded to <span className="font-bold text-slate-800">{learnerName}</span> for Class 4 Personal Independence
              </p>
            </div>

            {/* Big Score Card */}
            <div className="p-5 max-w-sm mx-auto rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl space-y-1 border border-indigo-400/30">
              <span className="text-[10px] uppercase font-mono tracking-widest text-indigo-300">TOTAL RUBRIC SCORE</span>
              <div className="text-5xl font-black font-mono tracking-tight text-white drop-shadow-md">
                {evaluationResult.totalScore} <span className="text-xl font-normal text-indigo-300">/ 100</span>
              </div>
              <p className="text-xs text-emerald-400 font-bold">
                {evaluationResult.totalScore >= 90 ? '🌟 Exemplary Mastery' : '✓ Proficient Performance'}
              </p>
            </div>

            {/* 3 Junior Star Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-w-xl mx-auto text-left">
              <div className="p-3 rounded-2xl bg-sky-50 border border-sky-100 flex items-center gap-2.5">
                <span className="text-2xl">🕵️‍♂️</span>
                <div>
                  <span className="text-xs font-bold text-sky-950 block">Timetable Detective</span>
                  <span className="text-[10px] text-sky-700">Tuesday essentials identified</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center gap-2.5">
                <span className="text-2xl">🦴</span>
                <div>
                  <span className="text-xs font-bold text-indigo-950 block">Ergonomic Hero</span>
                  <span className="text-[10px] text-indigo-700">Heavy books along back spine</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center gap-2.5">
                <span className="text-2xl">⚖️</span>
                <div>
                  <span className="text-xs font-bold text-emerald-950 block">Featherweight Guardian</span>
                  <span className="text-[10px] text-emerald-700">Protected daily carry energy</span>
                </div>
              </div>
            </div>

            {/* 4 Rubric Dimensions Breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-2xl mx-auto text-left">
              <div className="p-3 bg-sky-50 rounded-2xl border border-sky-100">
                <span className="text-[10px] text-sky-800 font-semibold block">Timetable Precision</span>
                <span className="text-base font-black text-sky-950 font-mono">{evaluationResult.timetableAccuracy} / 40</span>
              </div>
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
                <span className="text-[10px] text-emerald-800 font-semibold block">Weight Band</span>
                <span className="text-base font-black text-emerald-950 font-mono">{evaluationResult.weightBand} / 20</span>
              </div>
              <div className="p-3 bg-indigo-50 rounded-2xl border border-indigo-100">
                <span className="text-[10px] text-indigo-800 font-semibold block">Ergonomic Placement</span>
                <span className="text-base font-black text-indigo-950 font-mono">{evaluationResult.placement} / 15</span>
              </div>
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-100">
                <span className="text-[10px] text-amber-800 font-semibold block">Socratic Reflection</span>
                <span className="text-base font-black text-amber-950 font-mono">{evaluationResult.reasoning} / 25</span>
              </div>
            </div>

            {/* Credential Reference and QR Link */}
            {certificateId && (
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 max-w-md mx-auto flex items-center justify-between text-xs">
                <div className="text-left font-mono">
                  <span className="text-[10px] text-slate-400 block">CREDENTIAL ID</span>
                  <span className="font-bold text-slate-800 text-xs sm:text-sm">{certificateId}</span>
                </div>
                {verificationUrl && (
                  <a
                    href={verificationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-sky-600 hover:text-sky-700 font-bold"
                  >
                    <span>Verify QR Record</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            )}

            {/* Printable 7-Day Weekend Refrigerator Card for Parents */}
            <div className="p-5 bg-gradient-to-r from-sky-50 to-indigo-50 border-2 border-dashed border-sky-300 rounded-3xl max-w-xl mx-auto space-y-3 text-left">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📋</span>
                  <span className="text-xs font-bold text-slate-900">
                    {learnerName.split(' ')[0]}&apos;s Printable 7-Day Refrigerator Habit Passport
                  </span>
                </div>
                <Badge className="bg-sky-600 text-white font-bold text-[10px]">Home Mission</Badge>
              </div>
              <p className="text-[11px] text-slate-600">
                Stick this on the fridge! Parents check off evening bag packing practice at home to complete the practical milestone.
              </p>
              <div className="bg-white p-3.5 rounded-2xl border border-sky-100 space-y-2 text-xs">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                  <div key={day} className="flex items-center justify-between text-slate-700 py-0.5 border-b border-slate-100 last:border-0">
                    <span className="font-medium">{day} Evening Routine (Before 8 PM):</span>
                    <span className="text-slate-400 font-mono">[ ] Caregiver Checkmark</span>
                  </div>
                ))}
              </div>
              <Button
                onClick={() => {
                  if (typeof window !== 'undefined') window.print()
                }}
                variant="outline"
                size="sm"
                className="w-full text-xs font-bold rounded-xl flex items-center justify-center gap-2 h-10"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Refrigerator Card</span>
              </Button>
            </div>

            <div className="pt-2">
              <Button
                onClick={() => {
                  clearBackpackAttempt()
                  setCurrentStage(1)
                  setPackedItemIds([])
                  setItemPlacements({})
                  setPlacementOptionId(undefined)
                  setRoutineOptionId(undefined)
                  setEvaluationResult(null)
                  setCertificateId(null)
                  playSfx('whoosh')
                }}
                variant="outline"
                size="sm"
                className="rounded-xl text-xs text-slate-600 h-9"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1" />
                Start Fresh Challenge
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* STICKY BOTTOM ACTION TRAY FOR MOBILE DEVICES (lg:hidden)            */}
      {/* ------------------------------------------------------------------ */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2.5 shadow-lg lg:hidden flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-black font-mono px-2.5 py-1 rounded-xl ${
            currentWeight <= 3.80 ? 'bg-emerald-100 text-emerald-900' : 'bg-amber-100 text-amber-900'
          }`}>
            🎒 {currentWeight} kg
          </span>
          <span className="text-[11px] font-bold text-slate-600">
            {essentialCount}/4 Essentials
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {currentStage === 1 && (
            <Button
              onClick={() => {
                setCurrentStage(2)
                playSfx('whoosh')
              }}
              size="sm"
              className="bg-sky-600 text-white font-bold text-xs h-9 px-4 rounded-xl"
            >
              Pack Now ➔
            </Button>
          )}

          {currentStage === 2 && (
            <Button
              onClick={() => {
                setCurrentStage(3)
                playSfx('scale')
              }}
              disabled={packedItemIds.length === 0}
              size="sm"
              className="bg-sky-600 text-white font-bold text-xs h-9 px-4 rounded-xl"
            >
              Weigh ➔
            </Button>
          )}

          {currentStage === 3 && (
            <Button
              onClick={() => {
                setCurrentStage(4)
                playSfx('chime')
              }}
              size="sm"
              className="bg-sky-600 text-white font-bold text-xs h-9 px-4 rounded-xl"
            >
              Reflect ➔
            </Button>
          )}

          {currentStage === 4 && (
            <Button
              onClick={handleInitiateEvaluation}
              disabled={!placementOptionId || !routineOptionId || isEvaluating}
              size="sm"
              className="bg-emerald-600 text-white font-bold text-xs h-9 px-4 rounded-xl"
            >
              {isEvaluating ? '...' : 'Submit ➔'}
            </Button>
          )}

          {currentStage === 5 && (
            <Button
              onClick={() => {
                if (typeof window !== 'undefined') window.print()
              }}
              size="sm"
              className="bg-amber-600 text-white font-bold text-xs h-9 px-4 rounded-xl"
            >
              Print PDF
            </Button>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* ADULT CONSENT CHALLENGE MODAL (DPDPA 2023)                         */}
      {/* ------------------------------------------------------------------ */}
      {isConsentModalOpen && consentChallenge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-sm font-bold">
                🔒
              </div>
              <div>
                <h5 className="font-bold text-sm text-slate-900">Adult Verification Gate</h5>
                <p className="text-[11px] text-slate-500">Under DPDPA 2023, parent/guardian consent is required.</p>
              </div>
            </div>

            <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 space-y-1">
              <span className="text-xs font-bold text-amber-950 block">{consentChallenge.questionText}</span>
              <input
                type="number"
                value={parentAnswer}
                onChange={(e) => setParentAnswer(e.target.value)}
                placeholder="Enter answer"
                className="w-full px-3 py-2 text-xs bg-white border border-amber-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                Parent Email (Optional, for credential verification link)
              </label>
              <input
                type="email"
                value={parentEmail}
                onChange={(e) => setParentEmail(e.target.value)}
                placeholder="parent@example.com"
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <label className="flex items-start gap-2 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={affirmativeConsent}
                onChange={(e) => setAffirmativeConsent(e.target.checked)}
                className="mt-0.5 rounded text-sky-600 focus:ring-sky-500"
              />
              <span className="leading-snug">
                I confirm I am the parent or legal guardian of this learner and consent to generating this learning credential.
              </span>
            </label>

            {consentError && <p className="text-xs text-rose-600 font-bold">{consentError}</p>}

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button
                onClick={() => setIsConsentModalOpen(false)}
                variant="outline"
                size="sm"
                className="rounded-xl text-xs h-9"
              >
                Cancel
              </Button>
              <Button
                onClick={handleVerifyParentAndEvaluate}
                className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl h-9 px-4"
              >
                Verify &amp; Issue Credential
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Stale Archive Prompt Dialog */}
      {stalePromptOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border border-slate-200 shadow-2xl space-y-4 text-center">
            <span className="text-3xl">🕰️</span>
            <div className="space-y-1">
              <h5 className="font-bold text-sm text-slate-900">Resume Previous Challenge?</h5>
              <p className="text-xs text-slate-500">
                You started a packing challenge over a week ago. Would you like to resume where you left off or start fresh?
              </p>
            </div>
            <div className="flex gap-2 justify-center pt-2">
              <Button
                onClick={() => {
                  clearBackpackAttempt()
                  setStalePromptOpen(false)
                }}
                variant="outline"
                size="sm"
                className="rounded-xl text-xs h-9"
              >
                Start Fresh
              </Button>
              <Button
                onClick={() => setStalePromptOpen(false)}
                className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl h-9"
              >
                Resume Saved
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
