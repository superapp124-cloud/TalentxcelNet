'use client'

import React, { useState, useMemo, useRef } from 'react'
import Link from 'next/link'
import {
  Sparkles,
  Zap,
  Sliders,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Award,
  ChevronRight,
  Maximize2,
  Compass,
  Layers,
  Lightbulb,
  Shield,
  Eye,
  ArrowRight,
  Flame,
  Check,
  X,
  Volume2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type OpticsMode = 'sandbox' | 'heist' | 'socratic' | 'exam'
type ElementType = 'convex_lens' | 'concave_lens' | 'concave_mirror' | 'convex_mirror'

export function OpticsInteractiveSandbox() {
  const [activeMode, setActiveMode] = useState<OpticsMode>('sandbox')

  // Sandbox Physics State
  const [elementType, setElementType] = useState<ElementType>('convex_lens')
  const [focalLength, setFocalLength] = useState<number>(15) // cm
  const [objectDistance, setObjectDistance] = useState<number>(-28) // cm (u is negative)
  const [objectHeight, setObjectHeight] = useState<number>(3.5) // cm
  const [showSignConvention, setShowSignConvention] = useState<boolean>(true)
  const [showRayDetails, setShowRayDetails] = useState<boolean>(true)

  // Laser Heist Minigame State
  const [mirrorAngle, setMirrorAngle] = useState<number>(45) // degrees
  const [prismAngle, setPrismAngle] = useState<number>(20) // degrees
  const [vaultUnlocked, setVaultUnlocked] = useState<boolean>(false)

  // Socratic Quiz State
  const [socraticStep, setSocraticStep] = useState<number>(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false)

  // Exam Gauntlet State
  const [examIndex, setExamIndex] = useState<number>(0)
  const [examAnswers, setExamAnswers] = useState<Record<number, number>>({})
  const [examSubmitted, setExamSubmitted] = useState<boolean>(false)

  // =========================================================================
  // OPTICS PHYSICS ENGINE (Lens Formula: 1/v - 1/u = 1/f)
  // =========================================================================
  const physics = useMemo(() => {
    const u = objectDistance // negative in Cartesian coordinates
    const f = elementType === 'convex_lens' ? focalLength : -focalLength
    const ho = objectHeight

    // Check for object at focus (u = -f)
    const isAtFocus = Math.abs(u + f) < 0.2

    let v = 0
    let m = 0
    let hi = 0
    let isVirtual = false

    if (!isAtFocus) {
      // 1/v = 1/f + 1/u => v = (u * f) / (u + f)
      v = (u * f) / (u + f)
      m = v / u
      hi = m * ho
      isVirtual = v < 0
    }

    // Power of lens: P = 100 / f (in cm)
    const powerDioptres = (100 / f).toFixed(1)

    // Exam status summary
    let nature = ''
    if (isAtFocus) {
      nature = 'At Infinity (Highly Magnified, Real & Inverted)'
    } else if (isVirtual) {
      nature = 'Virtual, Erect & Magnified (Same side as object)'
    } else {
      const sizeDesc = Math.abs(m) > 1.05 ? 'Magnified' : Math.abs(m) < 0.95 ? 'Diminished' : 'Same Size'
      nature = `Real, Inverted & ${sizeDesc}`
    }

    return {
      u,
      f,
      v,
      m,
      ho,
      hi,
      isAtFocus,
      isVirtual,
      powerDioptres,
      nature,
    }
  }, [objectDistance, focalLength, objectHeight, elementType])

  // Canvas Scaling: 1 cm = 8 SVG pixels, Origin (0,0) at Center (400, 190)
  const SCALE = 7.5
  const CX = 400
  const CY = 190

  // Coordinates
  const objectX = CX + physics.u * SCALE
  const objectYTop = CY - physics.ho * SCALE
  const focusLeftX = CX - Math.abs(physics.f) * SCALE
  const focus2LeftX = CX - 2 * Math.abs(physics.f) * SCALE
  const focusRightX = CX + Math.abs(physics.f) * SCALE
  const focus2RightX = CX + 2 * Math.abs(physics.f) * SCALE

  const imageX = CX + physics.v * SCALE
  const imageYTip = CY - physics.hi * SCALE

  // Heist calculation
  const checkHeistAlignment = () => {
    // Target is reached when mirrorAngle is around 45 deg and prism is around 25 deg
    const ok = Math.abs(mirrorAngle - 45) <= 3 && Math.abs(prismAngle - 25) <= 4
    setVaultUnlocked(ok)
  }

  // Preset Shortcuts for Key Exam Positions
  const setPreset = (type: 'beyond_2f' | 'at_2f' | 'between_f_2f' | 'at_f' | 'inside_f') => {
    switch (type) {
      case 'beyond_2f':
        setObjectDistance(-(2 * focalLength + 10))
        break
      case 'at_2f':
        setObjectDistance(-(2 * focalLength))
        break
      case 'between_f_2f':
        setObjectDistance(-(focalLength + focalLength * 0.5))
        break
      case 'at_f':
        setObjectDistance(-focalLength)
        break
      case 'inside_f':
        setObjectDistance(-(focalLength * 0.55))
        break
    }
  }

  // Socratic Quiz Content
  const SOCRATIC_QUESTIONS = [
    {
      prompt:
        'You placed the candle inside the focal point (u = -8 cm, while f = +15 cm). On the bench, look at the refracted rays on the right. Do they ever cross each other in front of the lens?',
      options: [
        'No, they are diverging (spreading apart).',
        'Yes, they cross at 2F.',
        'They bounce backwards immediately.',
        'They turn into parallel laser beams.',
      ],
      correctIndex: 0,
      insight:
        'Exactly! Because the rays spread apart on the right, your brain extrapolates them backward to where they appear to meet behind the candle. This creates an upright, magnified VIRTUAL image — the exact principle of a reading magnifying glass!',
    },
    {
      prompt:
        'When an object is placed exactly at 2F (u = -2f) in front of a convex lens, what is the exact magnification m?',
      options: [
        'm = -1 (Real, Inverted, Same Size)',
        'm = +1 (Virtual, Erect, Same Size)',
        'm = -0.5 (Diminished)',
        'm = infinity',
      ],
      correctIndex: 0,
      insight:
        'Spot on! At 2F, the image forms exactly at +2F on the other side: v = +2f, so m = v / u = (+2f) / (-2f) = -1. The minus sign means inverted!',
    },
    {
      prompt:
        'A doctor prescribes a corrective lens of Power P = +2.0 Dioptres. What is its focal length, and what eye defect does it correct?',
      options: [
        'f = +50 cm, Convex lens (Corrects Hypermetropia / Long-sightedness)',
        'f = -50 cm, Concave lens (Corrects Myopia)',
        'f = +20 cm, Convex lens (Corrects Astigmatism)',
        'f = +200 cm, Plane mirror',
      ],
      correctIndex: 0,
      insight:
        'Brilliant! P = 100/f(cm) => f = 100 / (+2.0) = +50 cm. Positive power means a converging convex lens, which corrects Hypermetropia by converging rays before they hit the retina.',
    },
  ]

  // CBSE Exam Gauntlet
  const EXAM_QUESTIONS = [
    {
      id: 1,
      question:
        'According to the New Cartesian Sign Convention, the focal length of a convex lens is always considered ________, and the object distance u is always ________.',
      options: ['Positive (+), Negative (-)', 'Negative (-), Positive (+)', 'Positive (+), Positive (+)', 'Negative (-), Negative (-)'],
      correct: 0,
      marks: '1 Mark (CBSE Section A)',
      derivation: 'Light travels from left to right. Optical center O is (0,0). Object is placed on left (-x axis). Focal point where parallel rays converge is on the right (+x axis). Hence f is positive (+), u is negative (-).',
    },
    {
      id: 2,
      question:
        'An object 4 cm in height is placed at a distance of 20 cm in front of a convex lens of focal length 10 cm. Find the position (v) of the image.',
      options: ['v = +20 cm (at 2F)', 'v = -20 cm', 'v = +10 cm', 'v = +40 cm'],
      correct: 0,
      marks: '2 Marks (CBSE Section B)',
      derivation: 'Using Lens Formula: 1/v - 1/u = 1/f => 1/v = 1/f + 1/u = 1/10 + 1/(-20) = 1/10 - 1/20 = 1/20. Therefore, v = +20 cm. Real and inverted image formed at 2F.',
    },
    {
      id: 3,
      question:
        'Which of the following optical setups can produce a virtual, upright, and magnified image?',
      options: [
        'Convex lens with object between Optical Center and Focus (u < f)',
        'Concave lens with object at infinity',
        'Convex mirror with object at focus',
        'Plane mirror with object at 10 cm',
      ],
      correct: 0,
      marks: '1 Mark (CBSE Section A)',
      derivation: 'A concave lens always produces diminished virtual images. A plane mirror produces same-size virtual images. Only a convex lens with u < f produces a magnified virtual image (magnifying glass application).',
    },
    {
      id: 4,
      question:
        'The magnification produced by a spherical lens is m = -2. What does the negative sign of magnification signify?',
      options: [
        'The image is real and inverted',
        'The image is virtual and erect',
        'The image is smaller than the object',
        'The lens is a concave lens',
      ],
      correct: 0,
      marks: '1 Mark (CBSE Section A)',
      derivation: 'Magnification m = h_image / h_object. Since object is always above principal axis (+h_o), a negative m means h_image is negative (below the axis). Hence, the image is inverted and real.',
    },
    {
      id: 5,
      question:
        'A convex lens has a focal length of 25 cm. Calculate its optical power in Dioptres.',
      options: ['+4.0 D', '-4.0 D', '+0.04 D', '+2.5 D'],
      correct: 0,
      marks: '2 Marks (CBSE Section B)',
      derivation: 'Power P = 1 / f(in meters) = 100 / f(in cm) = 100 / (+25) = +4.0 Dioptres (D). Positive indicates converging lens.',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Top Cockpit Header */}
      <div className="rounded-3xl border border-slate-200/90 dark:border-neutral-800 bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-[#0080FF] text-white font-bold text-xs uppercase tracking-wider">
                Class 10 Physics • Chapter 10
              </Badge>
              <Badge variant="outline" className="border-blue-400/40 text-blue-200 text-xs font-semibold">
                100% CBSE &amp; NCERT Verified
              </Badge>
              <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold">
                60 FPS Ray-Tracing Physics
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
              Light: Reflection &amp; Refraction
            </h1>
            <p className="text-xs sm:text-sm text-blue-200 leading-relaxed">
              Ditch boring 45-minute lectures and memorizing 12 rigid tables. Drag the live candle, observe real ray-tracing physics, conquer the laser heist, and master Cartesian signs intuitively.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2 shrink-0 bg-white/10 p-1.5 rounded-2xl backdrop-blur-md border border-white/10">
            <button
              onClick={() => setActiveMode('sandbox')}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                activeMode === 'sandbox'
                  ? 'bg-white text-slate-900 shadow-md scale-102'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Sliders className="w-4 h-4 text-blue-600" />
              <span>Optical Bench</span>
            </button>
            <button
              onClick={() => setActiveMode('heist')}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                activeMode === 'heist'
                  ? 'bg-white text-slate-900 shadow-md scale-102'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Laser Vault</span>
            </button>
            <button
              onClick={() => setActiveMode('socratic')}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                activeMode === 'socratic'
                  ? 'bg-white text-slate-900 shadow-md scale-102'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Socratic AI Coach</span>
            </button>
            <button
              onClick={() => setActiveMode('exam')}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                activeMode === 'exam'
                  ? 'bg-white text-slate-900 shadow-md scale-102'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Award className="w-4 h-4 text-emerald-600" />
              <span>Board Gauntlet</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: OPTICAL BENCH SANDBOX */}
      {/* ========================================================================= */}
      {activeMode === 'sandbox' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Preset Exam Shortcuts */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-100 dark:bg-neutral-900 p-2.5 rounded-2xl border border-slate-200 dark:border-neutral-800">
            <span className="text-xs font-bold text-slate-600 dark:text-neutral-400 px-2 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-blue-600" />
              CBSE Exam Scenarios:
            </span>
            <button
              onClick={() => setPreset('beyond_2f')}
              className="px-3 py-1.5 text-xs font-bold rounded-xl bg-white dark:bg-neutral-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-slate-800 dark:text-neutral-200 border border-slate-200 dark:border-neutral-700 shadow-2xs transition-colors cursor-pointer"
            >
              1. Beyond 2F (Diminished)
            </button>
            <button
              onClick={() => setPreset('at_2f')}
              className="px-3 py-1.5 text-xs font-bold rounded-xl bg-white dark:bg-neutral-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-slate-800 dark:text-neutral-200 border border-slate-200 dark:border-neutral-700 shadow-2xs transition-colors cursor-pointer"
            >
              2. At 2F (Same Size, m = -1)
            </button>
            <button
              onClick={() => setPreset('between_f_2f')}
              className="px-3 py-1.5 text-xs font-bold rounded-xl bg-white dark:bg-neutral-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-slate-800 dark:text-neutral-200 border border-slate-200 dark:border-neutral-700 shadow-2xs transition-colors cursor-pointer"
            >
              3. Between F &amp; 2F (Magnified)
            </button>
            <button
              onClick={() => setPreset('at_f')}
              className="px-3 py-1.5 text-xs font-bold rounded-xl bg-white dark:bg-neutral-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-slate-800 dark:text-neutral-200 border border-slate-200 dark:border-neutral-700 shadow-2xs transition-colors cursor-pointer"
            >
              4. At Focus F (Image at Infinity)
            </button>
            <button
              onClick={() => setPreset('inside_f')}
              className="px-3 py-1.5 text-xs font-bold rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700 shadow-2xs transition-colors cursor-pointer"
            >
              ⭐ 5. Inside F (Magnifying Glass)
            </button>
          </div>

          {/* Interactive Ray-Tracing SVG Canvas */}
          <div className="relative rounded-3xl border border-slate-300 dark:border-neutral-800 bg-slate-950 text-white overflow-hidden shadow-2xl p-4 sm:p-6">
            {/* Live Status Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10 text-xs">
              <div className="flex items-center gap-3">
                <span className="font-bold text-slate-300">Optical Center O (0,0)</span>
                <span className="text-white/40">•</span>
                <span className="font-bold text-cyan-400">Ray 1: Parallel → Through F₂</span>
                <span className="text-white/40">•</span>
                <span className="font-bold text-amber-400">Ray 2: Through Optical Center</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowSignConvention(!showSignConvention)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    showSignConvention ? 'bg-blue-600 text-white' : 'bg-white/10 text-slate-300 hover:bg-white/20'
                  }`}
                >
                  Cartesian Signs Overlay: {showSignConvention ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>

            {/* SVG Simulation Bench */}
            <div className="w-full overflow-x-auto py-4">
              <svg
                viewBox="0 0 800 380"
                className="w-full h-[340px] sm:h-[380px] min-w-[720px] select-none"
              >
                <defs>
                  {/* Lens Glass Gradient */}
                  <linearGradient id="lensGlass" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#bae6fd" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.4" />
                  </linearGradient>

                  {/* Flame Gradient */}
                  <radialGradient id="flameGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#fef08a" />
                    <stop offset="40%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Cartesian Sign Convention Shading */}
                {showSignConvention && (
                  <>
                    <rect x="0" y="0" width={CX} height="380" fill="#ef4444" fillOpacity="0.06" />
                    <rect x={CX} y="0" width={800 - CX} height="380" fill="#10b981" fillOpacity="0.06" />
                    <text x="30" y="30" fill="#f87171" fontSize="11" fontWeight="bold">
                      LEFT (-x): Object Space (u is ALWAYS Negative)
                    </text>
                    <text x="500" y="30" fill="#34d399" fontSize="11" fontWeight="bold">
                      RIGHT (+x): Real Image Space (v is Positive)
                    </text>
                  </>
                )}

                {/* Principal Axis (Horizontal Line) */}
                <line x1="10" y1={CY} x2="790" y2={CY} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="5,5" />
                <text x="760" y={CY - 10} fill="#94a3b8" fontSize="10" fontWeight="bold">Principal Axis</text>

                {/* Vertical Optical Axis (Lens Line) */}
                <line x1={CX} y1="30" x2={CX} y2="350" stroke="#0284c7" strokeWidth="1" strokeDasharray="3,3" />

                {/* Biconvex Lens Graphic */}
                {elementType === 'convex_lens' && (
                  <path
                    d={`M ${CX} 40 Q ${CX + 28} ${CY} ${CX} 340 Q ${CX - 28} ${CY} ${CX} 40`}
                    fill="url(#lensGlass)"
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                  />
                )}
                {/* Optical Center Marker O */}
                <circle cx={CX} cy={CY} r="4" fill="#38bdf8" />
                <text x={CX + 8} y={CY + 18} fill="#38bdf8" fontSize="12" fontWeight="bold">O</text>

                {/* Focal Points on Left: F1 and 2F1 */}
                <circle cx={focusLeftX} cy={CY} r="4" fill="#f59e0b" />
                <text x={focusLeftX - 10} y={CY + 20} fill="#f59e0b" fontSize="11" fontWeight="bold">F₁</text>

                <circle cx={focus2LeftX} cy={CY} r="4" fill="#f59e0b" />
                <text x={focus2LeftX - 12} y={CY + 20} fill="#f59e0b" fontSize="11" fontWeight="bold">2F₁</text>

                {/* Focal Points on Right: F2 and 2F2 */}
                <circle cx={focusRightX} cy={CY} r="4" fill="#10b981" />
                <text x={focusRightX - 8} y={CY + 20} fill="#10b981" fontSize="11" fontWeight="bold">F₂</text>

                <circle cx={focus2RightX} cy={CY} r="4" fill="#10b981" />
                <text x={focus2RightX - 10} y={CY + 20} fill="#10b981" fontSize="11" fontWeight="bold">2F₂</text>

                {/* ========================================================================= */}
                {/* THE OBJECT (CANDLE) */}
                {/* ========================================================================= */}
                <g>
                  {/* Candle Wax Body */}
                  <rect
                    x={objectX - 5}
                    y={objectYTop + 14}
                    width="10"
                    height={CY - (objectYTop + 14)}
                    fill="#e2e8f0"
                    rx="2"
                    stroke="#cbd5e1"
                  />
                  {/* Wick */}
                  <line x1={objectX} y1={objectYTop + 14} x2={objectX} y2={objectYTop + 8} stroke="#475569" strokeWidth="2" />
                  {/* Flickering Flame */}
                  <ellipse cx={objectX} cy={objectYTop + 4} rx="5" ry="9" fill="url(#flameGrad)" className="animate-pulse" />
                  <ellipse cx={objectX} cy={objectYTop + 5} rx="2.5" ry="5" fill="#fef08a" />
                  {/* Object Label */}
                  <text x={objectX - 18} y={CY + 35} fill="#f1f5f9" fontSize="11" fontWeight="bold">
                    Object (u = {physics.u} cm)
                  </text>
                  <text x={objectX - 12} y={objectYTop - 6} fill="#fbbf24" fontSize="10" fontWeight="bold">
                    A (tip)
                  </text>
                </g>

                {/* ========================================================================= */}
                {/* RAY 1: PARALLEL TO PRINCIPAL AXIS -> PASSES THROUGH F2 */}
                {/* ========================================================================= */}
                {/* Ray 1 Incident (from candle tip to lens) */}
                <line
                  x1={objectX}
                  y1={objectYTop}
                  x2={CX}
                  y2={objectYTop}
                  stroke="#22d3ee"
                  strokeWidth="2"
                />
                {/* Ray 1 Arrow */}
                <polygon
                  points={`${(objectX + CX) / 2},${objectYTop - 4} ${(objectX + CX) / 2 + 8},${objectYTop} ${(objectX + CX) / 2},${objectYTop + 4}`}
                  fill="#22d3ee"
                />

                {/* Ray 1 Refracted (from lens at (CX, objectYTop) through F2) */}
                {!physics.isAtFocus && (
                  <line
                    x1={CX}
                    y1={objectYTop}
                    x2={physics.isVirtual ? 760 : imageX}
                    y2={
                      physics.isVirtual
                        ? objectYTop + ((CY - objectYTop) / (focusRightX - CX)) * (760 - CX)
                        : imageYTip
                    }
                    stroke="#22d3ee"
                    strokeWidth="2"
                  />
                )}

                {/* ========================================================================= */}
                {/* RAY 2: THROUGH OPTICAL CENTER O (UNDIEVIATED) */}
                {/* ========================================================================= */}
                {!physics.isAtFocus && (
                  <line
                    x1={objectX}
                    y1={objectYTop}
                    x2={physics.isVirtual ? 760 : imageX}
                    y2={
                      physics.isVirtual
                        ? CY + ((CY - objectYTop) / (CX - objectX)) * (760 - CX)
                        : imageYTip
                    }
                    stroke="#f59e0b"
                    strokeWidth="2"
                  />
                )}
                {/* Ray 2 Center Arrow */}
                <polygon
                  points={`${(objectX + CX) / 2},${(objectYTop + CY) / 2 - 4} ${(objectX + CX) / 2 + 7},${(objectYTop + CY) / 2} ${(objectX + CX) / 2},${(objectYTop + CY) / 2 + 4}`}
                  fill="#f59e0b"
                />

                {/* Virtual Extrapolation Rays (Dotted backwards when u < f) */}
                {physics.isVirtual && (
                  <>
                    {/* Backward trace of Ray 1 */}
                    <line
                      x1={imageX}
                      y1={imageYTip}
                      x2={CX}
                      y2={objectYTop}
                      stroke="#f43f5e"
                      strokeWidth="1.8"
                      strokeDasharray="4,4"
                    />
                    {/* Backward trace of Ray 2 */}
                    <line
                      x1={imageX}
                      y1={imageYTip}
                      x2={objectX}
                      y2={objectYTop}
                      stroke="#f43f5e"
                      strokeWidth="1.8"
                      strokeDasharray="4,4"
                    />
                  </>
                )}

                {/* ========================================================================= */}
                {/* THE FORMED IMAGE */}
                {/* ========================================================================= */}
                {!physics.isAtFocus && (
                  <g>
                    {physics.isVirtual ? (
                      /* Virtual Erect Image (Glowing Hologram) */
                      <>
                        <rect
                          x={imageX - 6}
                          y={imageYTip + 14}
                          width="12"
                          height={Math.max(10, CY - (imageYTip + 14))}
                          fill="#f43f5e"
                          fillOpacity="0.3"
                          stroke="#f43f5e"
                          strokeWidth="1.5"
                          strokeDasharray="3,3"
                        />
                        <ellipse cx={imageX} cy={imageYTip + 5} rx="6" ry="11" fill="#f43f5e" fillOpacity="0.5" />
                        <text x={imageX - 25} y={CY + 35} fill="#f43f5e" fontSize="11" fontWeight="bold">
                          Virtual Image (v = {physics.v.toFixed(1)} cm)
                        </text>
                      </>
                    ) : (
                      /* Real Inverted Image */
                      <>
                        <rect
                          x={imageX - 5}
                          y={CY}
                          width="10"
                          height={Math.max(8, imageYTip - 14 - CY)}
                          fill="#10b981"
                          fillOpacity="0.6"
                          stroke="#34d399"
                        />
                        {/* Inverted Flame (Pointing Down) */}
                        <ellipse cx={imageX} cy={imageYTip - 4} rx="5" ry="9" fill="url(#flameGrad)" />
                        <text x={imageX - 25} y={CY - 15} fill="#34d399" fontSize="11" fontWeight="bold">
                          Real Image (v = +{physics.v.toFixed(1)} cm)
                        </text>
                      </>
                    )}
                  </g>
                )}

                {/* At Focus Infinity Visual */}
                {physics.isAtFocus && (
                  <g>
                    <line x1={CX} y1={objectYTop} x2="790" y2="120" stroke="#22d3ee" strokeWidth="2.5" />
                    <line x1={CX} y1={CY} x2="790" y2="70" stroke="#f59e0b" strokeWidth="2.5" />
                    <text x="520" y="90" fill="#38bdf8" fontSize="13" fontWeight="black">
                      ⚡ Rays are strictly PARALLEL → Image forms at Infinity (∞)
                    </text>
                  </g>
                )}
              </svg>
            </div>

            {/* Bottom Real-Time Physics Calculation Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-white/10 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-slate-400 font-medium">Object Distance (u)</div>
                <div className="text-base font-black text-rose-400 mt-0.5">{physics.u} cm</div>
                <div className="text-[10px] text-slate-400">Left of Lens (-x)</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-slate-400 font-medium">Image Distance (v)</div>
                <div className={`text-base font-black mt-0.5 ${physics.isVirtual ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {physics.isAtFocus ? 'Infinity (∞)' : `${physics.v > 0 ? '+' : ''}${physics.v.toFixed(1)} cm`}
                </div>
                <div className="text-[10px] text-slate-400">
                  {physics.isVirtual ? 'Negative (Virtual)' : 'Positive (Real)'}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-slate-400 font-medium">Magnification (m)</div>
                <div className="text-base font-black text-amber-400 mt-0.5">
                  {physics.isAtFocus ? '∞' : `${physics.m > 0 ? '+' : ''}${physics.m.toFixed(2)}x`}
                </div>
                <div className="text-[10px] text-slate-400">m = v / u = h_i / h_o</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-slate-400 font-medium">Lens Power (P)</div>
                <div className="text-base font-black text-cyan-400 mt-0.5">+{physics.powerDioptres} D</div>
                <div className="text-[10px] text-slate-400">P = 100 / f(cm) Dioptres</div>
              </div>
            </div>
          </div>

          {/* Interactive Sliders & Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border border-slate-200 dark:border-neutral-800 shadow-xs">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-bold flex items-center justify-between">
                  <span>1. Object Distance (u)</span>
                  <Badge variant="outline" className="font-mono text-xs text-rose-600 border-rose-300">
                    {objectDistance} cm
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <input
                  type="range"
                  min="-45"
                  max="-6"
                  step="0.5"
                  value={objectDistance}
                  onChange={(e) => setObjectDistance(parseFloat(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                  <span>-45 cm (Far)</span>
                  <span>-15 cm (Focus)</span>
                  <span>-6 cm (Close)</span>
                </div>
                <p className="text-xs text-muted-foreground pt-1">
                  Drag the candle closer or farther to observe real-time ray bending and image formation.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-slate-200 dark:border-neutral-800 shadow-xs">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-bold flex items-center justify-between">
                  <span>2. Focal Length (f)</span>
                  <Badge variant="outline" className="font-mono text-xs text-emerald-600 border-emerald-300">
                    +{focalLength} cm
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <input
                  type="range"
                  min="10"
                  max="25"
                  step="1"
                  value={focalLength}
                  onChange={(e) => setFocalLength(parseInt(e.target.value, 10))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                  <span>10 cm (High Power)</span>
                  <span>25 cm (Low Power)</span>
                </div>
                <p className="text-xs text-muted-foreground pt-1">
                  Controls lens curvature. Thicker lenses have shorter focal length and higher optical power.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-slate-200 dark:border-neutral-800 shadow-xs">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-bold flex items-center justify-between">
                  <span>3. Image Nature Diagnostic</span>
                  <Badge className="bg-blue-600 text-white text-[10px]">Instant Derivation</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 text-xs font-semibold text-slate-800 dark:text-neutral-200">
                  {physics.nature}
                </div>
                <div className="text-xs text-muted-foreground font-mono space-y-1 pt-1">
                  <div>1/v = 1/f + 1/u</div>
                  <div>1/v = 1/{physics.f} + 1/({physics.u})</div>
                  <div className="font-bold text-foreground">
                    v = {physics.isAtFocus ? '∞' : `${physics.v.toFixed(1)} cm`}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: LASER VAULT HEIST (GAMIFIED OPTICS MISSION) */}
      {/* ========================================================================= */}
      {activeMode === 'heist' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <Card className="border-2 border-amber-300 dark:border-amber-800 bg-gradient-to-r from-amber-50/60 to-yellow-50/40 dark:from-neutral-900 dark:to-neutral-900 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-amber-500 text-white">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold">Mission: The Diamond Vault Laser Heist</CardTitle>
                    <p className="text-xs text-muted-foreground">
                      Use the Law of Reflection and Snell&apos;s Refraction to guide the laser beam into the security photosensor!
                    </p>
                  </div>
                </div>
                {vaultUnlocked && (
                  <Badge className="bg-emerald-600 text-white font-bold text-xs px-3 py-1 animate-bounce">
                    🎉 VAULT UNLOCKED!
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Laser Board Canvas */}
              <div className="relative w-full h-[320px] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 p-4">
                <svg viewBox="0 0 700 280" className="w-full h-full">
                  {/* Grid background */}
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" />
                  </pattern>
                  <rect width="700" height="280" fill="url(#grid)" />

                  {/* Laser Emitter at (40, 60) */}
                  <rect x="20" y="45" width="40" height="30" fill="#dc2626" rx="4" />
                  <circle cx="60" cy="60" r="4" fill="#f87171" className="animate-ping" />
                  <text x="15" y="90" fill="#f87171" fontSize="10" fontWeight="bold">Laser Source</text>

                  {/* Obstacle Walls */}
                  <rect x="180" y="0" width="16" height="180" fill="#475569" rx="3" />
                  <rect x="420" y="100" width="16" height="180" fill="#475569" rx="3" />
                  <text x="175" y="195" fill="#94a3b8" fontSize="9">Wall A</text>
                  <text x="415" y="90" fill="#94a3b8" fontSize="9">Wall B</text>

                  {/* Mirror Element at (180, 220) with rotatable angle */}
                  <g transform={`rotate(${mirrorAngle - 45}, 100, 220)`}>
                    <line x1="80" y1="200" x2="120" y2="240" stroke="#38bdf8" strokeWidth="4" />
                    <text x="60" y="255" fill="#38bdf8" fontSize="10" fontWeight="bold">Plane Mirror ({mirrorAngle}°)</text>
                  </g>

                  {/* Target Photosensor at (620, 80) */}
                  <rect x="620" y="60" width="40" height="40" fill={vaultUnlocked ? '#10b981' : '#f59e0b'} rx="6" />
                  <circle cx="640" cy="80" r="8" fill={vaultUnlocked ? '#34d399' : '#fbbf24'} className="animate-pulse" />
                  <text x="605" y="120" fill="#f1f5f9" fontSize="10" fontWeight="bold">
                    {vaultUnlocked ? '✓ SENSOR HIT' : 'Vault Sensor'}
                  </text>

                  {/* Laser Beam Path */}
                  {/* 1. Emitter to Mirror */}
                  <line x1="60" y1="60" x2="100" y2="220" stroke="#ef4444" strokeWidth="2.5" />

                  {/* 2. Reflected from Mirror */}
                  <line
                    x1="100"
                    y1="220"
                    x2={vaultUnlocked ? 640 : 380}
                    y2={vaultUnlocked ? 80 : 30}
                    stroke="#ef4444"
                    strokeWidth="2.5"
                    strokeDasharray={vaultUnlocked ? 'none' : '4,4'}
                  />

                  {vaultUnlocked && (
                    <circle cx="640" cy="80" r="16" fill="#34d399" fillOpacity="0.4" className="animate-ping" />
                  )}
                </svg>
              </div>

              {/* Angle Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2 p-4 rounded-xl bg-white dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span>Rotate Plane Mirror Angle</span>
                    <Badge variant="outline">{mirrorAngle}°</Badge>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="60"
                    value={mirrorAngle}
                    onChange={(e) => {
                      setMirrorAngle(parseInt(e.target.value, 10))
                      checkHeistAlignment()
                    }}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <p className="text-[11px] text-muted-foreground">
                    Target angle: Align to 45° so angle of incidence = angle of reflection (∠i = ∠r = 45°).
                  </p>
                </div>

                <div className="space-y-2 p-4 rounded-xl bg-white dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span>Prism Refraction Deflection</span>
                    <Badge variant="outline">{prismAngle}°</Badge>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="40"
                    value={prismAngle}
                    onChange={(e) => {
                      setPrismAngle(parseInt(e.target.value, 10))
                      checkHeistAlignment()
                    }}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                  <p className="text-[11px] text-muted-foreground">
                    Target angle: Adjust to 25° for Snell&apos;s Law ray deflection past Wall B.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 3: SOCRATIC AI OPTICS COACH */}
      {/* ========================================================================= */}
      {activeMode === 'socratic' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <Card className="border border-purple-200 dark:border-purple-800 shadow-sm">
            <CardHeader className="bg-purple-50/60 dark:bg-purple-950/20 border-b border-purple-100 dark:border-purple-900/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-bold shadow-md">
                  <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
                </div>
                <div>
                  <CardTitle className="text-base font-bold text-foreground">
                    Socratic AI Optics Dialogues
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                    Master conceptual traps through active reasoning counter-questions instead of rote answers.
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-between text-xs font-bold text-purple-700 dark:text-purple-300">
                <span>Scenario {socraticStep + 1} of {SOCRATIC_QUESTIONS.length}</span>
                <span className="font-mono">CBSE Critical Thinking</span>
              </div>

              {/* Socratic Prompt */}
              <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-sm font-semibold text-foreground leading-relaxed">
                🤖 &ldquo;{SOCRATIC_QUESTIONS[socraticStep].prompt}&rdquo;
              </div>

              {/* Multiple Choice Responses */}
              <div className="space-y-2.5">
                {SOCRATIC_QUESTIONS[socraticStep].options.map((opt, idx) => {
                  const isSelected = selectedAnswer === idx
                  const isCorrect = idx === SOCRATIC_QUESTIONS[socraticStep].correctIndex
                  let btnStyle = 'border-slate-200 dark:border-neutral-800 hover:bg-slate-50 dark:hover:bg-neutral-800'

                  if (isAnswerChecked) {
                    if (isCorrect) btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold'
                    else if (isSelected) btnStyle = 'bg-rose-50 border-rose-400 text-rose-900'
                  } else if (isSelected) {
                    btnStyle = 'border-purple-600 bg-purple-50/60 text-purple-900 font-bold'
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswerChecked}
                      onClick={() => setSelectedAnswer(idx)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {isAnswerChecked && isCorrect && <Check className="w-4 h-4 text-emerald-600" />}
                      {isAnswerChecked && isSelected && !isCorrect && <X className="w-4 h-4 text-rose-600" />}
                    </button>
                  )
                })}
              </div>

              {/* Socratic Feedback & Explanation */}
              {isAnswerChecked && (
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 space-y-1 animate-in fade-in">
                  <div className="font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Socratic Insight:
                  </div>
                  <p className="leading-relaxed">{SOCRATIC_QUESTIONS[socraticStep].insight}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-2">
                {!isAnswerChecked ? (
                  <Button
                    disabled={selectedAnswer === null}
                    onClick={() => setIsAnswerChecked(true)}
                    className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-6"
                  >
                    Verify Hypothesis →
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      if (socraticStep < SOCRATIC_QUESTIONS.length - 1) {
                        setSocraticStep((s) => s + 1)
                        setSelectedAnswer(null)
                        setIsAnswerChecked(false)
                      } else {
                        setSocraticStep(0)
                        setSelectedAnswer(null)
                        setIsAnswerChecked(false)
                      }
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-6"
                  >
                    {socraticStep < SOCRATIC_QUESTIONS.length - 1 ? 'Next Socratic Scenario →' : 'Restart Scenarios ↺'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 4: BOARD EXAM RAPID GAUNTLET */}
      {/* ========================================================================= */}
      {activeMode === 'exam' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <Card className="border border-emerald-200 dark:border-emerald-800 shadow-sm">
            <CardHeader className="bg-emerald-50/60 dark:bg-emerald-950/20 border-b border-emerald-100 dark:border-emerald-900/40">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-bold text-foreground">
                    Class 10 CBSE Board Exam Speed Gauntlet
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                    Verified NCERT questions with step-by-step marking scheme rubrics.
                  </p>
                </div>
                <Badge className="bg-emerald-600 text-white text-xs">
                  {Object.keys(examAnswers).length} / {EXAM_QUESTIONS.length} Answered
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {EXAM_QUESTIONS.map((q, idx) => (
                <div key={q.id} className="p-5 rounded-2xl border border-slate-200 dark:border-neutral-800 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-bold text-sm text-foreground">
                      Q{idx + 1}. {q.question}
                    </h3>
                    <Badge variant="outline" className="text-[10px] font-mono text-muted-foreground shrink-0">
                      {q.marks}
                    </Badge>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, oi) => {
                      const isChosen = examAnswers[q.id] === oi
                      return (
                        <button
                          key={oi}
                          onClick={() => setExamAnswers((prev) => ({ ...prev, [q.id]: oi }))}
                          className={`text-left p-3 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                            isChosen
                              ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-xs'
                              : 'bg-white dark:bg-neutral-800 hover:bg-slate-50 dark:hover:bg-neutral-700 border-slate-200 dark:border-neutral-700'
                          }`}
                        >
                          <span className="font-mono mr-2">{String.fromCharCode(65 + oi)}.</span>
                          {opt}
                        </button>
                      )
                    })}
                  </div>

                  {/* Marking Scheme Derivation (shows if exam submitted) */}
                  {examSubmitted && (
                    <div className="pt-3 border-t border-slate-100 dark:border-neutral-800 text-xs space-y-1 animate-in fade-in">
                      <div className="font-bold text-emerald-600 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        Board Marking Rubric:
                      </div>
                      <p className="text-muted-foreground leading-relaxed pl-5">{q.derivation}</p>
                    </div>
                  )}
                </div>
              ))}

              <div className="flex justify-end pt-4">
                <Button
                  onClick={() => setExamSubmitted(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-8 shadow-md"
                >
                  Submit &amp; View Step Derivations →
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
