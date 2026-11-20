'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Calculator,
  Calendar,
  Award,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Share2,
  Zap,
  TrendingUp,
  Shield,
  HelpCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function CbseCgpaCalculator() {
  const [cgpa, setCgpa] = useState<string>('9.2')
  const [subjects, setSubjects] = useState<number[]>([9, 9, 10, 9, 9])

  const cgpaNum = parseFloat(cgpa) || 0
  const percentage = (cgpaNum * 9.5).toFixed(1)

  const handleCgpaChange = (val: string) => {
    setCgpa(val)
  }

  const shareText = `I just calculated my CBSE Percentage (${percentage}%) on TalentXcel! Check yours here: https://talentxcel.net/tools/cbse-cgpa-calculator`

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 text-[10px] uppercase font-bold">
            CBSE Official Multiplier (9.5)
          </Badge>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            CBSE Class 10 CGPA to Percentage Calculator
          </h1>
        </div>
        <span className="text-xs font-semibold text-slate-400">Class 10 Board Metric</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
              Enter Your Cumulative Grade Point Average (CGPA out of 10.0):
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={cgpa}
                onChange={(e) => handleCgpaChange(e.target.value)}
                className="w-32 text-2xl font-black text-center p-3 rounded-2xl border-2 border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 text-blue-950 dark:text-blue-100 focus:outline-none"
              />
              <span className="text-xs text-slate-500">
                Formula: <code className="font-bold text-blue-600">Percentage = CGPA × 9.5</code>
              </span>
            </div>
          </div>

          <div className="space-y-1 text-xs text-slate-500">
            <p>• Official CBSE circular specifies multiplying your CGPA by 9.5 to compute aggregate percentage.</p>
            <p>• For individual subject percentage: <code className="font-semibold">Subject Grade Point × 9.5</code>.</p>
          </div>
        </div>

        {/* Live Result Display */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white space-y-4 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
            Official Equivalent Percentage
          </span>
          <div className="text-5xl font-black tracking-tight">
            {percentage}%
          </div>
          <div className="text-xs text-blue-100">
            {cgpaNum >= 9.0 ? '🌟 Distinction / A1 Grade Band' : cgpaNum >= 7.5 ? '👍 First Division / High Distinction' : 'Verified Board Grade'}
          </div>

          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button size="sm" className="bg-white hover:bg-blue-50 text-blue-950 font-bold text-xs gap-1.5 shadow-md">
              <Share2 className="h-3.5 w-3.5 text-emerald-600" />
              Share on WhatsApp
            </Button>
          </a>
        </div>
      </div>

      {/* Cross-Sell Lead Magnet */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-0.5">
          <h4 className="text-xs font-bold text-slate-900 dark:text-white">
            Aiming for 95%+ in Class 10 Board Examinations?
          </h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Practice verified chapter-wise MCQs, textbook exercise solutions, and formula cheat sheets.
          </p>
        </div>
        <Link href="/practice/cbse/class-10">
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs">
            Start Free Class 10 Practice
            <ArrowRight className="h-3.5 w-3.5 ml-1" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

export function SsbAgeEligibilityCalculator() {
  const [dob, setDob] = useState<string>('2007-06-15')
  const [entry, setEntry] = useState<'nda' | 'cds' | 'afcat'>('nda')

  // Calculate age as of reference year
  const birthDate = new Date(dob)
  const today = new Date()
  let ageYears = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    ageYears--
  }

  // Eligibility Rules
  // NDA: 16.5 to 19.5 years
  // CDS (IMA/INA): 19 to 24 years
  // CDS (OTA): 19 to 25 years
  // AFCAT: 20 to 24 (flying), 20 to 26 (ground duty)
  let isEligible = false
  let ageLimit = ''
  if (entry === 'nda') {
    isEligible = ageYears >= 16.5 && ageYears <= 19.5
    ageLimit = '16.5 to 19.5 years (Unmarried 10+2 Male & Female)'
  } else if (entry === 'cds') {
    isEligible = ageYears >= 19 && ageYears <= 24
    ageLimit = '19 to 24 years (Graduates for IMA/INA/AFA, up to 25 for OTA)'
  } else if (entry === 'afcat') {
    isEligible = ageYears >= 20 && ageYears <= 24
    ageLimit = '20 to 24 years (Flying), up to 26 for Ground Duty'
  }

  const shareText = `Check your exact SSB Armed Forces (NDA/CDS/AFCAT) Age Eligibility in 5 seconds on TalentXcel: https://talentxcel.net/tools/ssb-eligibility-calculator`

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <Badge className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] uppercase font-bold">
            UPSC &amp; Armed Forces Rules
          </Badge>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            SSB &amp; Armed Forces Age Eligibility Calculator
          </h1>
        </div>
        <span className="text-xs font-semibold text-slate-400">NDA • CDS • AFCAT</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
              Select Defence Entry:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['nda', 'cds', 'afcat'] as const).map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setEntry(e)}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold uppercase transition-all ${
                    entry === e
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {e.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
              Enter Date of Birth (DOB):
            </label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="text-[11px] text-slate-500 space-y-1">
            <p>• Official Criteria for {entry.toUpperCase()}: <span className="font-semibold text-slate-700 dark:text-slate-300">{ageLimit}</span>.</p>
            <p>• Calculated Current Age: <span className="font-bold text-slate-900 dark:text-white">{ageYears} Years</span>.</p>
          </div>
        </div>

        {/* Live Eligibility Card */}
        <div className={`p-6 rounded-2xl text-white space-y-4 text-center ${
          isEligible ? 'bg-gradient-to-br from-emerald-600 to-teal-700' : 'bg-gradient-to-br from-slate-700 to-slate-900'
        }`}>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
            Eligibility Verdict
          </span>
          <div className="text-3xl sm:text-4xl font-black">
            {isEligible ? 'Eligible to Apply! 🎖️' : 'Age Boundary Alert ⚠️'}
          </div>
          <p className="text-xs text-slate-200 max-w-xs mx-auto leading-relaxed">
            {isEligible
              ? `You meet the statutory age threshold for ${entry.toUpperCase()} examination.`
              : `Your age (${ageYears} yrs) is outside the official ${entry.toUpperCase()} cut-off window (${ageLimit}).`}
          </p>

          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button size="sm" className="bg-white hover:bg-slate-50 text-slate-950 font-bold text-xs gap-1.5 shadow-md">
              <Share2 className="h-3.5 w-3.5 text-emerald-600" />
              Share Calculator with Cadets
            </Button>
          </a>
        </div>
      </div>

      {/* Cross-Sell Lead Magnet */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-0.5">
          <h4 className="text-xs font-bold text-slate-900 dark:text-white">
            Prepare for Stage-I SSB Screening &amp; OIR Test Free
          </h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Practice 50 verbal and non-verbal reasoning test questions calibrated to OIR-1 rating standards.
          </p>
        </div>
        <Link href="/competitive/ssb-oir">
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs">
            Start Free SSB OIR Test
            <ArrowRight className="h-3.5 w-3.5 ml-1" />
          </Button>
        </Link>
      </div>
    </div>
  )
}


// ============================================================================
// 1. CLASS 10 & 12 BOARD PERCENTAGE CALCULATOR
// ============================================================================

export function BoardPercentageCalculator() {
  const [board, setBoard] = useState<'CBSE' | 'ICSE' | 'STATE'>('CBSE')
  const [classLevel, setClassLevel] = useState<'10' | '12'>('10')
  const [subjects, setSubjects] = useState<Array<{ name: string; marks: number; maxMarks: number }>>([
    { name: 'Subject 1 (Language)', marks: 88, maxMarks: 100 },
    { name: 'Subject 2 (Core)', marks: 92, maxMarks: 100 },
    { name: 'Subject 3 (Science / Elective)', marks: 85, maxMarks: 100 },
    { name: 'Subject 4 (Social / Commerce)', marks: 90, maxMarks: 100 },
    { name: 'Subject 5 (Optional / Skill)', marks: 95, maxMarks: 100 },
  ])

  const totalMarksObtained = subjects.reduce((acc, s) => acc + (Number(s.marks) || 0), 0)
  const totalMaxMarks = subjects.reduce((acc, s) => acc + (Number(s.maxMarks) || 100), 0)
  const percentage = totalMaxMarks > 0 ? ((totalMarksObtained / totalMaxMarks) * 100).toFixed(2) : '0.00'
  const numericPct = parseFloat(percentage)

  const getDivision = (pct: number) => {
    if (pct >= 75) return { label: 'Distinction (First Class with Distinction)', color: 'text-emerald-500' }
    if (pct >= 60) return { label: 'First Division (60%+)', color: 'text-blue-500' }
    if (pct >= 50) return { label: 'Second Division (50%-59%)', color: 'text-amber-500' }
    if (pct >= 33) return { label: 'Third Division (Pass)', color: 'text-slate-400' }
    return { label: 'Needs Improvement / Compartment', color: 'text-rose-500' }
  }

  const division = getDivision(numericPct)

  const handleMarksChange = (idx: number, field: 'marks' | 'maxMarks', val: string) => {
    const num = Math.max(0, parseInt(val, 10) || 0)
    setSubjects((prev) => {
      const copy = [...prev]
      copy[idx] = { ...copy[idx], [field]: num }
      return copy
    })
  }

  const addSubject = () => {
    if (subjects.length < 8) {
      setSubjects((prev) => [
        ...prev,
        { name: `Subject ${prev.length + 1}`, marks: 80, maxMarks: 100 },
      ])
    }
  }

  const removeSubject = (idx: number) => {
    if (subjects.length > 3) {
      setSubjects((prev) => prev.filter((_, i) => i !== idx))
    }
  }

  const shareText = `I calculated my Class ${classLevel} (${board}) Board Percentage: ${percentage}% (${division.label}) on TalentXcel! Check yours free: https://talentxcel.net/tools/board-percentage-calculator`

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <Badge className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] uppercase font-bold">
            All Boards Aligned
          </Badge>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            Class 10 &amp; 12 Board Percentage Calculator
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={classLevel === '10' ? 'default' : 'outline'}
            onClick={() => setClassLevel('10')}
            className="text-xs h-7 px-2.5"
          >
            Class 10
          </Button>
          <Button
            size="sm"
            variant={classLevel === '12' ? 'default' : 'outline'}
            onClick={() => setClassLevel('12')}
            className="text-xs h-7 px-2.5"
          >
            Class 12
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-3">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
            Enter Marks Obtained and Maximum Marks per Subject:
          </label>
          <div className="space-y-2">
            {subjects.map((s, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={s.name}
                  onChange={(e) => {
                    const val = e.target.value
                    setSubjects((prev) => {
                      const copy = [...prev]
                      copy[idx] = { ...copy[idx], name: val }
                      return copy
                    })
                  }}
                  className="flex-1 p-2 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                />
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={s.marks}
                  onChange={(e) => handleMarksChange(idx, 'marks', e.target.value)}
                  placeholder="Marks"
                  className="w-20 p-2 rounded-xl text-xs text-center font-bold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
                <span className="text-xs text-slate-400">/</span>
                <input
                  type="number"
                  min="1"
                  max="200"
                  value={s.maxMarks}
                  onChange={(e) => handleMarksChange(idx, 'maxMarks', e.target.value)}
                  placeholder="Max"
                  className="w-20 p-2 rounded-xl text-xs text-center border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                />
                {subjects.length > 3 && (
                  <button
                    onClick={() => removeSubject(idx)}
                    className="text-xs text-slate-400 hover:text-rose-500 px-1"
                    title="Remove subject"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>

          {subjects.length < 8 && (
            <Button size="sm" variant="outline" onClick={addSubject} className="text-xs mt-2">
              + Add Another Subject
            </Button>
          )}
        </div>

        {/* Aggregate Output */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white flex flex-col justify-between text-center space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
              Aggregate Board Percentage
            </span>
            <div className="text-5xl font-black tracking-tight">{percentage}%</div>
            <div className="text-xs font-medium text-emerald-100">{division.label}</div>
          </div>

          <div className="bg-emerald-950/40 p-3 rounded-xl text-xs space-y-1 text-emerald-100">
            <div>
              Total Marks: <strong>{totalMarksObtained}</strong> / {totalMaxMarks}
            </div>
            <div>
              Average per Subject: <strong>{(totalMarksObtained / subjects.length).toFixed(1)}</strong>
            </div>
          </div>

          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button size="sm" className="w-full bg-white hover:bg-emerald-50 text-emerald-950 font-bold text-xs gap-1.5 shadow-md">
              <Share2 className="h-3.5 w-3.5 text-emerald-600" />
              Share Result on WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// 2. CBSE BEST OF FIVE CALCULATOR
// ============================================================================

export function CbseBestOfFiveCalculator() {
  const [subjects, setSubjects] = useState<Array<{ name: string; marks: number; isLanguage: boolean }>>([
    { name: 'English (Language 1 - Compulsory)', marks: 88, isLanguage: true },
    { name: 'Mathematics', marks: 95, isLanguage: false },
    { name: 'Science', marks: 91, isLanguage: false },
    { name: 'Social Science', marks: 84, isLanguage: false },
    { name: 'Hindi / Regional Language', marks: 79, isLanguage: false },
    { name: 'Skill Subject (IT / AI / CS)', marks: 96, isLanguage: false },
  ])

  // CBSE Rule: 1 Language is mandatory + Top 4 highest scoring subjects among remaining 5
  const languageSubject = subjects[0]
  const remainingSubjects = subjects.slice(1).sort((a, b) => b.marks - a.marks)
  const top4Remaining = remainingSubjects.slice(0, 4)
  const excludedSubject = remainingSubjects[4]

  const best5Subjects = [languageSubject, ...top4Remaining]
  const best5Total = best5Subjects.reduce((acc, s) => acc + s.marks, 0)
  const best5Percentage = (best5Total / 5).toFixed(2)

  // Standard 6-subject percentage for comparison
  const totalAll6 = subjects.reduce((acc, s) => acc + s.marks, 0)
  const all6Percentage = (totalAll6 / 6).toFixed(2)
  const gain = (parseFloat(best5Percentage) - parseFloat(all6Percentage)).toFixed(2)

  const handleMarksChange = (idx: number, val: string) => {
    const num = Math.min(100, Math.max(0, parseInt(val, 10) || 0))
    setSubjects((prev) => {
      const copy = [...prev]
      copy[idx] = { ...copy[idx], marks: num }
      return copy
    })
  }

  const shareText = `I calculated my CBSE Best-of-Five Percentage on TalentXcel: ${best5Percentage}% (improved by +${gain}% over 6 subjects)! Calculate yours: https://talentxcel.net/tools/cbse-best-of-five-calculator`

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <Badge className="bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 text-[10px] uppercase font-bold">
            CBSE Statutory Best-of-5 Protocol
          </Badge>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            CBSE Best-of-Five Marks Calculator
          </h2>
        </div>
        <span className="text-xs text-slate-400 font-semibold">Automatic 6th Subject Elimination</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-3">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
            Enter Your 6 Subject Scores (Out of 100):
          </label>
          <div className="space-y-2">
            {subjects.map((s, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="flex-1 p-2 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-between">
                  <span>{s.name}</span>
                  {s.isLanguage && (
                    <Badge variant="outline" className="text-[10px] py-0 px-1 border-blue-400 text-blue-600 dark:text-blue-400">
                      Compulsory
                    </Badge>
                  )}
                </div>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={s.marks}
                  onChange={(e) => handleMarksChange(idx, e.target.value)}
                  placeholder="Marks"
                  className="w-24 p-2 rounded-xl text-xs text-center font-bold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
                <span className="text-xs text-slate-400">/ 100</span>
              </div>
            ))}
          </div>

          {excludedSubject && (
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-800 dark:text-amber-300">
              💡 <strong>CBSE Excluded Subject:</strong> <code>{excludedSubject.name}</code> ({excludedSubject.marks}/100) was excluded to maximize your aggregate percentage!
            </div>
          )}
        </div>

        {/* Result Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-800 text-white flex flex-col justify-between text-center space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-200">
              CBSE Best of 5 Percentage
            </span>
            <div className="text-5xl font-black tracking-tight">{best5Percentage}%</div>
            <div className="text-xs font-medium text-emerald-300">
              +{gain}% advantage over all 6 subjects ({all6Percentage}%)
            </div>
          </div>

          <div className="bg-indigo-950/40 p-3 rounded-xl text-xs space-y-1 text-indigo-100">
            <div>
              Best-5 Total: <strong>{best5Total}</strong> / 500
            </div>
            <div>
              All-6 Total: <strong>{totalAll6}</strong> / 600
            </div>
          </div>

          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button size="sm" className="w-full bg-white hover:bg-indigo-50 text-indigo-950 font-bold text-xs gap-1.5 shadow-md">
              <Share2 className="h-3.5 w-3.5 text-emerald-600" />
              Share on WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// 3. JEE MAIN & NEET RANK VS PERCENTILE PREDICTOR
// ============================================================================

export function JeeNeetRankPredictor() {
  const [exam, setExam] = useState<'JEE' | 'NEET'>('JEE')
  const [percentile, setPercentile] = useState<string>('98.75')
  const [neetScore, setNeetScore] = useState<string>('645')
  const [category, setCategory] = useState<'GEN' | 'OBC' | 'EWS' | 'SC' | 'ST'>('GEN')

  // Total unique aspirants in 2026: ~1,450,000 for JEE Main, ~2,400,000 for NEET UG
  const TOTAL_JEE_CANDIDATES = 1450000
  const TOTAL_NEET_CANDIDATES = 2400000

  // JEE Rank computation: Rank = ((100 - Percentile) * Total Candidates) / 100
  const numPercentile = Math.max(0, Math.min(100, parseFloat(percentile) || 0))
  const estimatedJeeAir = Math.max(1, Math.round(((100 - numPercentile) * TOTAL_JEE_CANDIDATES) / 100))

  // NEET Rank heuristic based on recent cutoffs (score out of 720)
  const numNeetScore = Math.max(0, Math.min(720, parseInt(neetScore, 10) || 0))
  const getNeetEstimatedAir = (score: number) => {
    if (score >= 710) return Math.round(1 + ((720 - score) / 10) * 80)
    if (score >= 680) return Math.round(80 + ((710 - score) / 30) * 1200)
    if (score >= 650) return Math.round(1280 + ((680 - score) / 30) * 4500)
    if (score >= 620) return Math.round(5780 + ((650 - score) / 30) * 11000)
    if (score >= 580) return Math.round(16780 + ((620 - score) / 40) * 22000)
    if (score >= 500) return Math.round(38780 + ((580 - score) / 80) * 55000)
    if (score >= 400) return Math.round(93780 + ((500 - score) / 100) * 90000)
    return Math.round(183780 + ((400 - score) / 400) * 800000)
  }

  const estimatedNeetAir = getNeetEstimatedAir(numNeetScore)
  const estimatedNeetPct = (100 - (estimatedNeetAir / TOTAL_NEET_CANDIDATES) * 100).toFixed(2)

  const activeAir = exam === 'JEE' ? estimatedJeeAir : estimatedNeetAir
  const activeCollegeTier =
    exam === 'JEE'
      ? activeAir <= 5000
        ? 'Top Tier NIT (Trichy, Surathkal, Warangal) - CS / Circuital'
        : activeAir <= 15000
        ? 'Premier NIT / IIIT Core Engineering'
        : activeAir <= 35000
        ? 'Top State Govt Engineering Colleges & Newer NITs'
        : activeAir <= 60000
        ? 'JEE Advanced Qualified • Reputed IIITs & GFTIs'
        : 'State Level Counselling & Private Engineering Universities'
      : activeAir <= 2500
      ? 'Top AIIMS (Delhi, Bhubaneswar, Jodhpur) & MAMC'
      : activeAir <= 12000
      ? 'All India Quota (AIQ) 15% Premier State Medical College (MBBS)'
      : activeAir <= 25000
      ? 'State Quota 85% Government Medical College (MBBS)'
      : activeAir <= 45000
      ? 'Semi-Govt Medical College / Govt BDS / Top BAMS'
      : 'Private Medical Colleges & Deemed Universities'

  const shareText = `I checked my expected ${exam} All India Rank (AIR ~${activeAir.toLocaleString()}) on TalentXcel Rank Predictor! Check yours free: https://talentxcel.net/tools/jee-neet-rank-predictor`

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <Badge className="bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300 text-[10px] uppercase font-bold">
            NTA Rank &amp; Cutoff Prediction
          </Badge>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            JEE Main &amp; NEET Rank vs Percentile Predictor 2026
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={exam === 'JEE' ? 'default' : 'outline'}
            onClick={() => setExam('JEE')}
            className="text-xs h-7 px-3"
          >
            JEE Main
          </Button>
          <Button
            size="sm"
            variant={exam === 'NEET' ? 'default' : 'outline'}
            onClick={() => setExam('NEET')}
            className="text-xs h-7 px-3"
          >
            NEET UG
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {exam === 'JEE' ? (
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                Enter Your NTA Percentile Score (e.g. 98.75):
              </label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={percentile}
                onChange={(e) => setPercentile(e.target.value)}
                className="w-full sm:w-48 text-xl font-black p-3 rounded-2xl border-2 border-rose-500 bg-rose-50/40 dark:bg-rose-950/40 text-rose-950 dark:text-rose-100 focus:outline-none"
              />
              <span className="text-[11px] text-slate-500 block mt-1.5">
                Calculated on ~14.5 Lakh unique JEE Main 2026 candidates.
              </span>
            </div>
          ) : (
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                Enter Your Expected NEET Score (out of 720):
              </label>
              <input
                type="number"
                min="0"
                max="720"
                value={neetScore}
                onChange={(e) => setNeetScore(e.target.value)}
                className="w-full sm:w-48 text-xl font-black p-3 rounded-2xl border-2 border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 focus:outline-none"
              />
              <span className="text-[11px] text-slate-500 block mt-1.5">
                Calculated on ~24 Lakh unique NEET UG 2026 aspirants.
              </span>
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
              Select Reservation Category:
            </label>
            <div className="flex flex-wrap gap-2">
              {(['GEN', 'OBC', 'EWS', 'SC', 'ST'] as const).map((cat) => (
                <Button
                  key={cat}
                  size="sm"
                  variant={category === cat ? 'default' : 'outline'}
                  onClick={() => setCategory(cat)}
                  className="text-xs h-7 px-3"
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs text-slate-600 dark:text-slate-300 space-y-1">
            <p>
              🏛️ <strong>Expected Admission Tier:</strong>
            </p>
            <p className="font-semibold text-blue-600 dark:text-blue-400">{activeCollegeTier}</p>
          </div>
        </div>

        {/* Prediction Display */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-600 to-amber-700 text-white flex flex-col justify-between text-center space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-200">
              Estimated All India Rank (AIR)
            </span>
            <div className="text-4xl sm:text-5xl font-black tracking-tight">
              ~{activeAir.toLocaleString()}
            </div>
            <div className="text-xs text-rose-100">
              {exam === 'JEE' ? `Percentile: ${percentile}%` : `NEET Score: ${neetScore}/720 (Est. ~${estimatedNeetPct}%)`}
            </div>
          </div>

          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button size="sm" className="w-full bg-white hover:bg-rose-50 text-rose-950 font-bold text-xs gap-1.5 shadow-md">
              <Share2 className="h-3.5 w-3.5 text-emerald-600" />
              Share Rank on WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}
