'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Timer,
  Share2,
  Trophy,
  Zap,
  Flame,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Users,
  Target,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RazorpayCheckoutModal } from '@/components/commerce/razorpay-checkout-modal'

interface TrendingDuel {
  id: string
  title: string
  category: string
  classLevel: string
  subject: string
  avgTime: string
  questionUrl: string
  passRate: string
}

const TRENDING_DUELS: TrendingDuel[] = [
  {
    id: 'math_c10_ch01_q0001',
    title: 'Real Numbers & Fundamental Theorem of Arithmetic',
    category: 'CBSE Board',
    classLevel: 'Class 10',
    subject: 'Mathematics',
    avgTime: '34s',
    passRate: '22%',
    questionUrl: '/question/math_c10_ch01_q0001?challenge=1',
  },
  {
    id: 'sci_c10_ch01_q0001',
    title: 'Chemical Reactions & Balancing Equations',
    category: 'CBSE Board',
    classLevel: 'Class 10',
    subject: 'Science',
    avgTime: '26s',
    passRate: '31%',
    questionUrl: '/question/sci_c10_ch01_q0001?challenge=1',
  },
  {
    id: 'math_c12_ch01_q0001',
    title: 'Relations and Functions & Equivalence Relations',
    category: 'CBSE Board',
    classLevel: 'Class 12',
    subject: 'Mathematics',
    avgTime: '42s',
    passRate: '18%',
    questionUrl: '/question/math_c12_ch01_q0001?challenge=1',
  },
  {
    id: 'oir_v_01',
    title: 'SSB Officer Intelligence Rating: Military Code & Series',
    category: 'Defence & SSB',
    classLevel: 'Officer Entry',
    subject: 'Verbal Reasoning',
    avgTime: '19s',
    passRate: '24%',
    questionUrl: '/competitive/ssb-oir/verbal-reasoning',
  },
  {
    id: 'nda_math_01',
    title: 'NDA Mathematics: Determinants & Matrices High-Speed Drill',
    category: 'National Defence',
    classLevel: 'NDA 10-Year PYQ',
    subject: 'Mathematics',
    avgTime: '38s',
    passRate: '19%',
    questionUrl: '/competitive/nda/mathematics',
  },
  {
    id: 'jee_phys_01',
    title: 'JEE Main Physics: Kinematics & Relative Velocity Trap',
    category: 'Engineering',
    classLevel: 'JEE Main 2026',
    subject: 'Physics',
    avgTime: '48s',
    passRate: '14%',
    questionUrl: '/competitive/jee-main/physics-jee',
  },
]

export function ChallengeHubView() {
  const [selectedCategory, setSelectedCategory] = useState<'class10' | 'class12' | 'competitive'>('class10')
  const [checkoutProductId, setCheckoutProductId] = useState<string | null>(null)

  const getCustomWhatsAppLink = (duel: TrendingDuel) => {
    const text = `⚔️ *CLASS SPEED DUEL: Can you beat my time?* 🔥\nTopic: ${duel.title} (${duel.classLevel} ${duel.subject})\nAverage time is ${duel.avgTime}. Only ${duel.passRate} students pass under 60 seconds!\n\nTake the 60-Second Challenge now:\n👉 https://talentxcel.net${duel.questionUrl}\n\n_Sent via TalentXcel Board Prep 2026_`
    return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`
  }

  return (
    <div className="space-y-12">
      {/* Hero Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-bold text-indigo-700 dark:text-indigo-300">
          <Flame className="h-4 w-4 text-orange-500 fill-orange-500" />
          <span>India&apos;s #1 Class Study Duel &amp; Speed Challenge</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Challenge Your Classmates in a{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            60-Second Speed Duel
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          80% of students struggle to solve conceptual board and competitive questions under timer pressure. Challenge your tuition group or classmates on WhatsApp and see who finishes first!
        </p>

        {/* Instant UPI Unlock Teaser */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Button
            onClick={() => setCheckoutProductId('prod_assess_preboard_49')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-6 py-2.5 text-xs shadow-lg shadow-emerald-600/30 gap-2"
          >
            <Zap className="h-3.5 w-3.5" />
            <span>Unlock All 106,000+ Solutions: ₹49 UPI Pass</span>
          </Button>

          <Link href="/practice">
            <Button variant="outline" className="text-xs font-bold">
              Browse All Practice Hubs
            </Button>
          </Link>
        </div>
      </div>

      {/* Duel Category Filters */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
        <Button
          size="sm"
          variant={selectedCategory === 'class10' ? 'default' : 'outline'}
          onClick={() => setSelectedCategory('class10')}
          className="text-xs font-bold rounded-xl"
        >
          Class 10 Board Duels
        </Button>
        <Button
          size="sm"
          variant={selectedCategory === 'class12' ? 'default' : 'outline'}
          onClick={() => setSelectedCategory('class12')}
          className="text-xs font-bold rounded-xl"
        >
          Class 12 Board Duels
        </Button>
        <Button
          size="sm"
          variant={selectedCategory === 'competitive' ? 'default' : 'outline'}
          onClick={() => setSelectedCategory('competitive')}
          className="text-xs font-bold rounded-xl"
        >
          Competitive &amp; SSB Duels
        </Button>
      </div>

      {/* Trending Duels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {TRENDING_DUELS.filter((d) => {
          if (selectedCategory === 'class10') return d.classLevel.includes('10')
          if (selectedCategory === 'class12') return d.classLevel.includes('12')
          return !d.classLevel.includes('10') && !d.classLevel.includes('12')
        }).map((duel) => (
          <div
            key={duel.id}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <Badge variant="outline" className="text-[10px] font-bold text-blue-600 dark:text-blue-400">
                  {duel.category} • {duel.classLevel}
                </Badge>
                <span className="text-[11px] font-mono font-bold text-slate-500">
                  ⏱️ Avg {duel.avgTime}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                {duel.title}
              </h3>

              <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                <span>Subject: <strong className="text-slate-800 dark:text-slate-200">{duel.subject}</strong></span>
                <span>•</span>
                <span className="text-rose-500 font-semibold">{duel.passRate} pass rate</span>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <Link href={duel.questionUrl} className="w-full block">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs gap-1.5 rounded-xl shadow-xs">
                  <Timer className="h-3.5 w-3.5" />
                  <span>Accept 60s Challenge</span>
                </Button>
              </Link>

              <a
                href={getCustomWhatsAppLink(duel)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block"
              >
                <Button variant="outline" className="w-full text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 font-bold text-xs gap-1.5 rounded-xl">
                  <Share2 className="h-3.5 w-3.5" />
                  <span>Challenge Group on WhatsApp</span>
                </Button>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* How It Works Explainer */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 space-y-6">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-[10px] uppercase font-bold">
            Zero App Download Required
          </Badge>
          <h2 className="text-xl sm:text-2xl font-black">How the 60-Second Duel Works</h2>
          <p className="text-xs text-slate-400">
            Challenge classmates directly on WhatsApp with instant web scoring on mobile.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2 text-center sm:text-left">
            <div className="h-10 w-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black mx-auto sm:mx-0">
              1
            </div>
            <h4 className="text-sm font-bold text-slate-100">Pick a Question or Topic</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Choose from 106,000+ NCERT, RD Sharma, SSB OIR, NDA, or JEE questions.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2 text-center sm:text-left">
            <div className="h-10 w-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black mx-auto sm:mx-0">
              2
            </div>
            <h4 className="text-sm font-bold text-slate-100">Share to WhatsApp Group</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              One click posts the 60-second challenge with your time and score to your study group.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2 text-center sm:text-left">
            <div className="h-10 w-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black mx-auto sm:mx-0">
              3
            </div>
            <h4 className="text-sm font-bold text-slate-100">Beat Peer Times &amp; Unlock</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Friends compete to beat your time, see who ranks #1, and unlock verified step proofs.
            </p>
          </div>
        </div>
      </div>

      <RazorpayCheckoutModal
        isOpen={Boolean(checkoutProductId)}
        onClose={() => setCheckoutProductId(null)}
        productId={checkoutProductId}
        onSuccess={() => {
          setCheckoutProductId(null)
          window.location.reload()
        }}
      />
    </div>
  )
}
