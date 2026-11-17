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
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            CBSE Class 10 CGPA to Percentage Calculator
          </h2>
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
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            SSB &amp; Armed Forces Age Eligibility Calculator
          </h2>
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
