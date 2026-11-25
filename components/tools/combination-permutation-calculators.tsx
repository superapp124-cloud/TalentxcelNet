'use client'

import React, { useState, useCallback } from 'react'
import Link from 'next/link'
import { ChevronRight, Calculator, Share2, Zap, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

// ─── Math helpers (number arithmetic, safe for exam-range values up to n≈170) ──

function nCr(n: number, r: number): number {
  if (r > n || r < 0 || n < 0) return 0
  if (r === 0 || r === n) return 1
  const minR = Math.min(r, n - r)
  let result = 1
  for (let i = 0; i < minR; i++) {
    result = (result * (n - i)) / (i + 1)
  }
  return Math.round(result)
}

function nPr(n: number, r: number): number {
  if (r > n || r < 0 || n < 0) return 0
  if (r === 0) return 1
  let result = 1
  for (let i = 0; i < r; i++) result *= (n - i)
  return Math.round(result)
}

function factorial(n: number): number {
  if (n < 0) return 0
  if (n === 0 || n === 1) return 1
  let result = 1
  for (let i = 2; i <= n; i++) result *= i
  return result
}

// ─── Shared input styles ───────────────────────────────────────────────────────

const INPUT_CLS =
  'w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-lg font-bold text-center focus:outline-none focus:ring-2 focus:ring-blue-500'

// ═══════════════════════════════════════════════════════════════════════════════
// COMBINATION CALCULATOR
// ═══════════════════════════════════════════════════════════════════════════════

const POPULAR_COMBINATIONS = [
  { n: 5, r: 3 }, { n: 10, r: 2 }, { n: 4, r: 2 },
  { n: 6, r: 3 }, { n: 8, r: 4 }, { n: 7, r: 2 },
  { n: 12, r: 5 }, { n: 20, r: 3 }, { n: 15, r: 7 }, { n: 100, r: 2 },
]

export function CombinationCalculatorClient() {
  const [n, setN] = useState('5')
  const [r, setR] = useState('3')
  const [result, setResult] = useState<string | null>('10')
  const [formula, setFormula] = useState<string | null>('C(5, 3) = 5! / (3! × 2!)')
  const [error, setError] = useState<string | null>(null)

  const calculate = useCallback((nv = n, rv = r) => {
    const nVal = parseInt(nv, 10)
    const rVal = parseInt(rv, 10)
    setError(null)
    if (isNaN(nVal) || isNaN(rVal)) { setError('Enter valid whole numbers.'); setResult(null); return }
    if (nVal < 0 || rVal < 0) { setError('n and r must be ≥ 0.'); setResult(null); return }
    if (rVal > nVal) { setError(`r (${rVal}) cannot exceed n (${nVal}).`); setResult(null); return }
    if (nVal > 1000) { setError('n must be ≤ 1000.'); setResult(null); return }
    const val = nCr(nVal, rVal)
    setResult(val.toLocaleString('en-IN'))
    setFormula(`C(${nVal}, ${rVal}) = ${nVal}! / (${rVal}! × ${nVal - rVal}!)`)
  }, [n, r])

  const setQuick = (nv: number, rv: number) => {
    setN(String(nv)); setR(String(rv)); setError(null)
    setResult(nCr(nv, rv).toLocaleString('en-IN'))
    setFormula(`C(${nv}, ${rv}) = ${nv}! / (${rv}! × ${nv - rv}!)`)
  }

  const whatsappShare = () => {
    if (!result) return
    const text = encodeURIComponent(`🎯 ${n}C${r} = ${result}\nSolve any combination instantly: https://talentxcel.net/tools/combination-calculator`)
    window.open(`https://wa.me/?text=${text}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/tools" className="hover:text-blue-600 transition-colors">Tools</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-semibold text-slate-900 dark:text-white">Combination Calculator (nCr)</span>
        </nav>

        <div className="text-center space-y-3">
          <Badge className="bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-300">
            <Zap className="h-3.5 w-3.5 mr-1.5" />Free Online nCr Calculator
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Combination Calculator — nCr Value
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Instantly calculate <strong>C(n,r)</strong> — ways to choose r items from n without regard to order.
            Used in probability, Class 11 &amp; 12 Maths, JEE, and NDA.
          </p>
        </div>

        {/* Calculator card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">n (total items)</label>
              <input type="number" value={n} min={0} max={1000}
                onChange={(e) => setN(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && calculate()}
                className={INPUT_CLS} placeholder="e.g. 5" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">r (choose)</label>
              <input type="number" value={r} min={0} max={1000}
                onChange={(e) => setR(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && calculate()}
                className={INPUT_CLS} placeholder="e.g. 3" />
            </div>
          </div>
          <Button onClick={() => calculate()} className="w-full h-14 text-base font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-lg shadow-blue-200 dark:shadow-none">
            <Calculator className="h-5 w-5 mr-2" />Calculate {n && r ? `${n}C${r}` : 'nCr'}
          </Button>
          {error && <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm font-semibold">⚠️ {error}</div>}
          {result !== null && !error && (
            <div className="space-y-3">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border border-blue-200 dark:border-blue-800 text-center">
                <div className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-1">{n}C{r} =</div>
                <div className="text-4xl sm:text-5xl font-black text-blue-700 dark:text-blue-300">{result}</div>
                {formula && <div className="mt-3 text-xs text-slate-500 dark:text-slate-400 font-mono">{formula}</div>}
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" onClick={whatsappShare} className="flex-1 rounded-xl border-green-300 text-green-700 hover:bg-green-50">
                  <Share2 className="h-4 w-4 mr-2" />Share on WhatsApp
                </Button>
                <Link href="/tools/permutation-calculator" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full rounded-xl">Try nPr →</Button>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Quick values */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Zap className="h-4 w-4 text-amber-500" /> Popular nCr Values
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {POPULAR_COMBINATIONS.map(({ n: nv, r: rv }) => (
              <button key={`${nv}c${rv}`} onClick={() => setQuick(nv, rv)}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors">
                <div className="text-xs font-bold text-blue-600 dark:text-blue-400">{nv}C{rv}</div>
                <div className="text-sm font-black text-slate-900 dark:text-white mt-1">= {nCr(nv, rv).toLocaleString('en-IN')}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Formula explanation */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-300 space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">What Is C(n,r)? — Combination Formula</h2>
          <p className="leading-relaxed">
            The combination formula <strong>C(n, r)</strong> or <strong>nCr</strong> gives the number of ways to select r items from n distinct items where <em>order does not matter</em>.
          </p>
          <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl font-mono text-center text-blue-700 dark:text-blue-300 font-bold text-sm">
            C(n, r) = n! / [r! × (n − r)!]
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Example: 5C3</h3>
            <p>5C3 = 5! / (3! × 2!) = 120 / 12 = <strong>10</strong></p>
            <p className="text-xs text-slate-500">There are 10 ways to choose 3 students from 5 for a team.</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">When Is nCr Used?</h3>
            <ul className="space-y-1 text-xs list-disc pl-4">
              <li>Probability (choosing outcomes from a sample space)</li>
              <li>Class 11 &amp; 12 Maths — Permutations and Combinations chapter</li>
              <li>JEE Main, JEE Advanced, NDA mathematics paper</li>
              <li>Binomial theorem expansion coefficients</li>
              <li>Lottery and card game probability problems</li>
            </ul>
          </div>
        </div>

        {/* Frequently asked */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">Frequently Asked — nCr Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {[
              { q: 'What is 5C3?', a: '5C3 = 10' },
              { q: 'What is 10C2?', a: '10C2 = 45' },
              { q: 'What is 4C2?', a: '4C2 = 6' },
              { q: 'What is 6C3?', a: '6C3 = 20' },
              { q: 'What is 8C4?', a: '8C4 = 70' },
              { q: 'What is 12C5?', a: '12C5 = 792' },
            ].map(({ q, a }) => (
              <div key={q} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="font-bold text-slate-900 dark:text-white">{q}</div>
                <div className="text-blue-600 dark:text-blue-400 font-black mt-0.5">{a}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Cross-links */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Related Calculators &amp; Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: '/tools/permutation-calculator', label: 'Permutation Calculator (nPr)', desc: 'Count ordered arrangements' },
              { href: '/tools/factorial-calculator', label: 'Factorial Calculator (n!)', desc: 'Compute n! for any n' },
              { href: '/tools/jee-neet-rank-predictor', label: 'JEE / NEET Rank Predictor', desc: 'Estimate your all-India rank' },
              { href: '/formulas/class-12/math', label: 'Class 12 Maths Formulas', desc: 'All permutation & combination formulas' },
            ].map(({ href, label, desc }) => (
              <Link key={href} href={href} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors group text-xs">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">{label}</div>
                  <div className="text-slate-500 mt-0.5">{desc}</div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// PERMUTATION CALCULATOR
// ═══════════════════════════════════════════════════════════════════════════════

const POPULAR_PERMUTATIONS = [
  { n: 5, r: 3 }, { n: 4, r: 2 }, { n: 6, r: 2 },
  { n: 10, r: 3 }, { n: 7, r: 4 }, { n: 8, r: 2 },
  { n: 12, r: 3 }, { n: 6, r: 6 }, { n: 20, r: 2 }, { n: 9, r: 4 },
]

export function PermutationCalculatorClient() {
  const [n, setN] = useState('5')
  const [r, setR] = useState('3')
  const [result, setResult] = useState<string | null>('60')
  const [formula, setFormula] = useState<string | null>('P(5, 3) = 5! / (5-3)!')
  const [error, setError] = useState<string | null>(null)

  const calculate = useCallback((nv = n, rv = r) => {
    const nVal = parseInt(nv, 10)
    const rVal = parseInt(rv, 10)
    setError(null)
    if (isNaN(nVal) || isNaN(rVal)) { setError('Enter valid whole numbers.'); setResult(null); return }
    if (nVal < 0 || rVal < 0) { setError('n and r must be ≥ 0.'); setResult(null); return }
    if (rVal > nVal) { setError(`r (${rVal}) cannot exceed n (${nVal}).`); setResult(null); return }
    if (nVal > 500) { setError('n must be ≤ 500.'); setResult(null); return }
    const val = nPr(nVal, rVal)
    setResult(val.toLocaleString('en-IN'))
    setFormula(`P(${nVal}, ${rVal}) = ${nVal}! / ${nVal - rVal}!`)
  }, [n, r])

  const setQuick = (nv: number, rv: number) => {
    setN(String(nv)); setR(String(rv)); setError(null)
    setResult(nPr(nv, rv).toLocaleString('en-IN'))
    setFormula(`P(${nv}, ${rv}) = ${nv}! / ${nv - rv}!`)
  }

  const whatsappShare = () => {
    if (!result) return
    const text = encodeURIComponent(`🎯 ${n}P${r} = ${result}\nCalculate permutations instantly: https://talentxcel.net/tools/permutation-calculator`)
    window.open(`https://wa.me/?text=${text}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/tools" className="hover:text-blue-600 transition-colors">Tools</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-semibold text-slate-900 dark:text-white">Permutation Calculator (nPr)</span>
        </nav>

        <div className="text-center space-y-3">
          <Badge className="bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-300">
            <Zap className="h-3.5 w-3.5 mr-1.5" />Free Online nPr Calculator
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Permutation Calculator — nPr Value
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Instantly calculate <strong>P(n,r)</strong> — ordered arrangements of r items from n.
            Used in JEE, NDA, Class 11 &amp; 12 Maths probability chapters.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">n (total)</label>
              <input type="number" value={n} min={0} max={500}
                onChange={(e) => setN(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && calculate()}
                className={INPUT_CLS.replace('focus:ring-blue-500', 'focus:ring-purple-500')} placeholder="e.g. 5" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">r (arrange)</label>
              <input type="number" value={r} min={0} max={500}
                onChange={(e) => setR(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && calculate()}
                className={INPUT_CLS.replace('focus:ring-blue-500', 'focus:ring-purple-500')} placeholder="e.g. 3" />
            </div>
          </div>
          <Button onClick={() => calculate()} className="w-full h-14 text-base font-bold bg-purple-600 hover:bg-purple-700 text-white rounded-2xl shadow-lg">
            <Calculator className="h-5 w-5 mr-2" />Calculate {n && r ? `${n}P${r}` : 'nPr'}
          </Button>
          {error && <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950 border border-red-200 text-red-700 dark:text-red-300 text-sm font-semibold">⚠️ {error}</div>}
          {result !== null && !error && (
            <div className="space-y-3">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950 border border-purple-200 dark:border-purple-800 text-center">
                <div className="text-xs font-bold text-purple-500 uppercase tracking-widest mb-1">{n}P{r} =</div>
                <div className="text-4xl sm:text-5xl font-black text-purple-700 dark:text-purple-300">{result}</div>
                {formula && <div className="mt-3 text-xs text-slate-500 font-mono">{formula}</div>}
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" onClick={whatsappShare} className="flex-1 rounded-xl border-green-300 text-green-700 hover:bg-green-50">
                  <Share2 className="h-4 w-4 mr-2" />Share on WhatsApp
                </Button>
                <Link href="/tools/combination-calculator" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full rounded-xl">Try nCr →</Button>
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Zap className="h-4 w-4 text-amber-500" /> Popular nPr Values
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {POPULAR_PERMUTATIONS.map(({ n: nv, r: rv }) => (
              <button key={`${nv}p${rv}`} onClick={() => setQuick(nv, rv)}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-slate-700 transition-colors">
                <div className="text-xs font-bold text-purple-600 dark:text-purple-400">{nv}P{rv}</div>
                <div className="text-sm font-black text-slate-900 dark:text-white mt-1">= {nPr(nv, rv).toLocaleString('en-IN')}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-300 space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">What Is P(n,r)? — Permutation Formula</h2>
          <p className="leading-relaxed"><strong>P(n, r)</strong> counts the number of ordered arrangements (sequences) of r items chosen from n distinct items. Unlike combinations, <em>order matters</em>.</p>
          <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl font-mono text-center text-purple-700 dark:text-purple-300 font-bold text-sm">
            P(n, r) = n! / (n − r)!
          </div>
          <p className="text-xs">Example: 5P3 = 5! / 2! = 120 / 2 = <strong>60</strong>. There are 60 ways to arrange 3 of 5 students in a line.</p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Related Calculators &amp; Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: '/tools/combination-calculator', label: 'Combination Calculator (nCr)', desc: 'Order doesn\'t matter — select r from n' },
              { href: '/tools/factorial-calculator', label: 'Factorial Calculator (n!)', desc: 'Compute n! instantly for any n' },
              { href: '/tools/jee-neet-rank-predictor', label: 'JEE / NEET Rank Predictor', desc: 'Estimate rank from your score' },
              { href: '/formulas/class-12/math', label: 'Class 12 Maths Formulas', desc: 'Full revision cheat sheet' },
            ].map(({ href, label, desc }) => (
              <Link key={href} href={href} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-slate-700 transition-colors group text-xs">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">{label}</div>
                  <div className="text-slate-500 mt-0.5">{desc}</div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-purple-500 group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// FACTORIAL CALCULATOR
// ═══════════════════════════════════════════════════════════════════════════════

const POPULAR_FACTORIALS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 25]

export function FactorialCalculatorClient() {
  const [n, setN] = useState('10')
  const [result, setResult] = useState<string | null>('36,28,800')
  const [error, setError] = useState<string | null>(null)

  const calculate = useCallback((nv = n) => {
    const nVal = parseInt(nv, 10)
    setError(null)
    if (isNaN(nVal) || nVal < 0) { setError('Enter a non-negative integer.'); setResult(null); return }
    if (nVal > 1000) { setError('n must be ≤ 1000.'); setResult(null); return }
    setResult(factorial(nVal).toLocaleString('en-IN'))
  }, [n])

  const setQuick = (nv: number) => {
    setN(String(nv)); setError(null)
    setResult(factorial(nv).toLocaleString('en-IN'))
  }

  const whatsappShare = () => {
    if (!result) return
    const text = encodeURIComponent(`🎯 ${n}! = ${result}\nCalculate factorials: https://talentxcel.net/tools/factorial-calculator`)
    window.open(`https://wa.me/?text=${text}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/tools" className="hover:text-blue-600 transition-colors">Tools</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-semibold text-slate-900 dark:text-white">Factorial Calculator (n!)</span>
        </nav>

        <div className="text-center space-y-3">
          <Badge className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-300">
            <Zap className="h-3.5 w-3.5 mr-1.5" />Free Online n! Calculator
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Factorial Calculator — n! Value
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Instantly compute n! for any non-negative integer. Essential for permutations, combinations, and Class 11 &amp; 12 Maths.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Enter n</label>
            <input type="number" value={n} min={0} max={1000}
              onChange={(e) => setN(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && calculate()}
              className="w-full px-4 py-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-2xl font-bold text-center focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="e.g. 10" />
          </div>
          <Button onClick={() => calculate()} className="w-full h-14 text-base font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl shadow-lg">
            <Calculator className="h-5 w-5 mr-2" />Calculate {n ? `${n}!` : 'n!'}
          </Button>
          {error && <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950 border border-red-200 text-red-700 dark:text-red-300 text-sm font-semibold">⚠️ {error}</div>}
          {result !== null && !error && (
            <div className="space-y-3">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 border border-emerald-200 dark:border-emerald-800 text-center">
                <div className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-1">{n}! =</div>
                <div className="text-3xl sm:text-4xl font-black text-emerald-700 dark:text-emerald-300 break-all">{result}</div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" onClick={whatsappShare} className="flex-1 rounded-xl border-green-300 text-green-700 hover:bg-green-50">
                  <Share2 className="h-4 w-4 mr-2" />Share on WhatsApp
                </Button>
                <Link href="/tools/combination-calculator" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full rounded-xl">Try nCr →</Button>
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Zap className="h-4 w-4 text-amber-500" /> Common Factorial Values
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {POPULAR_FACTORIALS.map((nv) => (
              <button key={nv} onClick={() => setQuick(nv)}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center hover:border-emerald-400 hover:bg-emerald-50 dark:hover:bg-slate-700 transition-colors">
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{nv}!</div>
                <div className="text-[10px] font-mono text-slate-700 dark:text-slate-300 mt-0.5 truncate">
                  {nv <= 15 ? factorial(nv).toLocaleString('en-IN') : '…'}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-300 space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">What Is n! (Factorial)?</h2>
          <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl font-mono text-center text-emerald-700 dark:text-emerald-300 font-bold text-sm">
            n! = n × (n−1) × (n−2) × ⋯ × 2 × 1
          </div>
          <p>Example: 5! = 5 × 4 × 3 × 2 × 1 = <strong>120</strong></p>
          <p className="text-xs text-slate-500">Special case: 0! = 1 (by definition). Factorials are used in nCr, nPr, binomial coefficients, and Taylor series.</p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Related Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: '/tools/combination-calculator', label: 'Combination Calculator (nCr)', desc: 'C(n,r) — select r from n (order-free)' },
              { href: '/tools/permutation-calculator', label: 'Permutation Calculator (nPr)', desc: 'P(n,r) — ordered arrangements' },
              { href: '/formulas/class-11/math', label: 'Class 11 Maths Formulas', desc: 'Complete formula sheet' },
              { href: '/formulas/class-12/math', label: 'Class 12 Maths Formulas', desc: 'Full revision cheat sheet' },
            ].map(({ href, label, desc }) => (
              <Link key={href} href={href} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-400 hover:bg-emerald-50 dark:hover:bg-slate-700 transition-colors group text-xs">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">{label}</div>
                  <div className="text-slate-500 mt-0.5">{desc}</div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
