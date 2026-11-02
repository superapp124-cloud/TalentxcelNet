'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Brain,
  Calculator,
  Sparkles,
  Atom,
  GraduationCap,
  Target,
  Lightbulb,
  Zap,
  Code2,
  Layers,
  Award,
  Compass,
  BookOpen,
  TrendingUp,
  Users,
  ShieldCheck,
  CreditCard,
  ChevronDown,
  ArrowRight,
  Menu,
  X,
  LayoutDashboard,
  CheckCircle2,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { TalentXcelEmblem } from '@/components/brand/logo'

export interface SiteHeaderProps {
  onOpenGrowthPlan?: () => void
  className?: string
}

interface CurrentUser {
  id: string
  email?: string
  displayName?: string
  avatarUrl?: string | null
}

interface DropdownItem {
  title: string
  description: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  iconBg: string
  iconColor: string
  badge?: string
}

interface NavCategory {
  id: string
  label: string
  href?: string
  dropdownWidth?: string
  gridCols?: string
  items: DropdownItem[]
}

const NAVIGATION_CATEGORIES: NavCategory[] = [
  {
    id: 'explore',
    label: 'Explore',
    dropdownWidth: 'w-[520px]',
    gridCols: 'grid-cols-2',
    items: [
      {
        title: 'Diagnostic Assessments',
        description: 'Server-verified curriculum assessments with instant gap derivations.',
        href: '/assessment',
        icon: Brain,
        iconBg: 'bg-blue-50 text-blue-600',
        iconColor: 'text-blue-600',
        badge: 'Zero Login',
      },
      {
        title: 'Universal Question Bank',
        description: 'Curated archive of 3,000,000+ NCERT, CBSE & ICSE syllabus questions.',
        href: '/dashboard/question-bank',
        icon: Calculator,
        iconBg: 'bg-indigo-50 text-indigo-600',
        iconColor: 'text-indigo-600',
        badge: '3M+ Qs',
      },
      {
        title: 'Instant Free Practice',
        description: 'Take 5 verified practice questions across grades with automated grading.',
        href: '/assessment#practice',
        icon: Sparkles,
        iconBg: 'bg-emerald-50 text-emerald-600',
        iconColor: 'text-emerald-600',
        badge: '100% Free',
      },
      {
        title: 'Interactive Optics & STEM Lab',
        description: '60FPS optical ray-tracing bench, laser puzzles & CBSE exam gauntlet.',
        href: '/academic/optics-lab',
        icon: Atom,
        iconBg: 'bg-purple-50 text-purple-600',
        iconColor: 'text-purple-600',
        badge: 'Interactive',
      },
    ],
  },
  {
    id: 'students',
    label: 'For Students',
    dropdownWidth: 'w-[540px]',
    gridCols: 'grid-cols-2',
    items: [
      {
        title: 'Classes 4–12 Academic Foundations',
        description: 'CBSE, ICSE & state board aligned lessons with socratic concept proofs.',
        href: '/academic',
        icon: GraduationCap,
        iconBg: 'bg-emerald-50 text-emerald-600',
        iconColor: 'text-emerald-600',
      },
      {
        title: 'Competitive Exams Gauntlet',
        description: 'Rigorous mock tests calibrated for JEE Main, NEET-UG, CUET & Olympiads.',
        href: '/assessment?category=competitive',
        icon: Target,
        iconBg: 'bg-rose-50 text-rose-600',
        iconColor: 'text-rose-600',
      },
      {
        title: 'Super AI Socratic Tutor',
        description: 'Context-grounded assistance for homework, derivations & step explanations.',
        href: '/dashboard#ai-tutor',
        icon: Lightbulb,
        iconBg: 'bg-amber-50 text-amber-600',
        iconColor: 'text-amber-600',
      },
      {
        title: 'Class 9 Foundation Programme',
        description: '8-month intensive early-start accelerator for competitive STEM dominance.',
        href: '/programmes/class-9-foundation',
        icon: Zap,
        iconBg: 'bg-blue-50 text-blue-600',
        iconColor: 'text-blue-600',
        badge: 'Flagship',
      },
    ],
  },
  {
    id: 'skills',
    label: 'Skills',
    dropdownWidth: 'w-[520px]',
    gridCols: 'grid-cols-2',
    items: [
      {
        title: '8 Practical Skill Tracks',
        description: 'Hands-on AI development, robotics, financial acuity, IoT & programming.',
        href: '/skills',
        icon: Code2,
        iconBg: 'bg-indigo-50 text-indigo-600',
        iconColor: 'text-indigo-600',
        badge: '8 Tracks',
      },
      {
        title: 'Real-World Project Labs',
        description: 'Deploy multi-tenant RAG engines, vector search & enterprise software.',
        href: '/courses/ai-development',
        icon: Layers,
        iconBg: 'bg-purple-50 text-purple-600',
        iconColor: 'text-purple-600',
      },
      {
        title: 'Verified Industry Certifications',
        description: 'Demonstrable engineering competencies with ATS-verifiable credentials.',
        href: '/skills#certifications',
        icon: Award,
        iconBg: 'bg-amber-50 text-amber-600',
        iconColor: 'text-amber-600',
      },
      {
        title: 'High School Integrated Studio',
        description: '2 to 4-year integrated programmes blending school boards with real skills.',
        href: '/programmes/highschool-integrated-foundation',
        icon: Compass,
        iconBg: 'bg-teal-50 text-teal-600',
        iconColor: 'text-teal-600',
      },
    ],
  },
  {
    id: 'schools',
    label: 'For Schools',
    dropdownWidth: 'w-[520px]',
    gridCols: 'grid-cols-2',
    items: [
      {
        title: 'Practical Life-Skills Curriculum',
        description: 'NEP 2020 aligned 216-module curriculum across 6 grade levels & 8 domains.',
        href: '/admin/life-skills',
        icon: BookOpen,
        iconBg: 'bg-emerald-50 text-emerald-600',
        iconColor: 'text-emerald-600',
        badge: 'NEP 2020',
      },
      {
        title: 'School Diagnostic Assessment OS',
        description: 'Campus-wide learning gap audits, percentile benchmarks & heatmaps.',
        href: '/assessment',
        icon: TrendingUp,
        iconBg: 'bg-blue-50 text-blue-600',
        iconColor: 'text-blue-600',
      },
      {
        title: 'Teacher & Educator Upskilling',
        description: 'Modern AI teaching aids, lesson storyboards & rubrics for classroom mastery.',
        href: '/programmes/teachers-trainers',
        icon: Users,
        iconBg: 'bg-indigo-50 text-indigo-600',
        iconColor: 'text-indigo-600',
      },
      {
        title: 'Hardware & Lab Kit Fulfillment',
        description: 'Microcontroller, robotics and optics kits shipped directly to schools.',
        href: '/admin/hardware',
        icon: ShieldCheck,
        iconBg: 'bg-cyan-50 text-cyan-600',
        iconColor: 'text-cyan-600',
      },
    ],
  },
  {
    id: 'pricing',
    label: 'Pricing',
    href: '/plans',
    dropdownWidth: 'w-[360px]',
    gridCols: 'grid-cols-1',
    items: [
      {
        title: 'All Plans & Pricing Passes',
        description: 'Transparent plans from ₹20 single chapter mocks to full academic passes.',
        href: '/plans',
        icon: CreditCard,
        iconBg: 'bg-amber-50 text-amber-600',
        iconColor: 'text-amber-600',
      },
      {
        title: 'Plus Pack (₹499)',
        description: '12 full-length tests across school subjects with analytical reasoning suite.',
        href: '/plans#assessment',
        icon: Sparkles,
        iconBg: 'bg-blue-50 text-blue-600',
        iconColor: 'text-blue-600',
        badge: 'Most Popular',
      },
      {
        title: 'Annual Pro Pass (₹999)',
        description: 'Unlimited practice tests, percentile analytics & full syllabus mocks.',
        href: '/plans#assessment',
        icon: Award,
        iconBg: 'bg-purple-50 text-purple-600',
        iconColor: 'text-purple-600',
      },
    ],
  },
]

export function SiteHeader({ className = '' }: SiteHeaderProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileExpandedCat, setMobileExpandedCat] = useState<string | null>('explore')
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)

  const dropdownContainerRef = useRef<HTMLDivElement>(null)
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Auth State Listener
  useEffect(() => {
    let mounted = true
    try {
      const supabase = createClient()

      // 1. Instant check from session
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (mounted && session?.user) {
          const user = session.user
          const name =
            user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            user.email?.split('@')[0] ||
            'Learner'
          const avatarUrl =
            user.user_metadata?.avatar_url ||
            user.user_metadata?.picture ||
            null
          setCurrentUser({
            id: user.id,
            email: user.email,
            displayName: name,
            avatarUrl,
          })
        }
      })

      // 2. Server verification
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (mounted && user) {
          const name =
            user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            user.email?.split('@')[0] ||
            'Learner'
          const avatarUrl =
            user.user_metadata?.avatar_url ||
            user.user_metadata?.picture ||
            null
          setCurrentUser({
            id: user.id,
            email: user.email,
            displayName: name,
            avatarUrl,
          })
        }
      })

      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          if (!mounted) return
          if (session?.user) {
            const user = session.user
            const name =
              user.user_metadata?.full_name ||
              user.user_metadata?.name ||
              user.email?.split('@')[0] ||
              'Learner'
            const avatarUrl =
              user.user_metadata?.avatar_url ||
              user.user_metadata?.picture ||
              null
            setCurrentUser({
              id: user.id,
              email: user.email,
              displayName: name,
              avatarUrl,
            })
          } else {
            setCurrentUser(null)
          }
        }
      )

      return () => {
        mounted = false
        subscription?.unsubscribe()
      }
    } catch {
      // Graceful fallback
    }
  }, [])

  // Close dropdown on outside click or escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownContainerRef.current &&
        !dropdownContainerRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActiveDropdown(null)
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  // Close menus on route change
  useEffect(() => {
    setActiveDropdown(null)
    setMobileMenuOpen(false)
  }, [pathname])

  const handleMouseEnter = (catId: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setActiveDropdown(catId)
  }

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-17 flex items-center justify-between gap-4">
        {/* ================================================================= */}
        {/* 1. OFFICIAL BRAND IDENTITY */}
        {/* ================================================================= */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2.5 group transition-transform active:scale-[0.99]"
            aria-label="TalentXcel - Universal Learning & Assessment Platform"
          >
            {/* Authentic TalentXcel Emblem (Circular aperture track with electric blue accent) */}
            <div className="relative flex items-center justify-center">
              <TalentXcelEmblem
                className="h-8 w-8 text-slate-900 group-hover:scale-105 transition-transform duration-200"
                pixelSize={32}
              />
            </div>

            {/* Official Wordmark with strict brand typography */}
            <span className="font-semibold text-[22px] tracking-tight text-slate-900 font-sans leading-none inline-flex items-baseline">
              talent<span className="font-extrabold text-[#0080FF]">X</span>cel
            </span>
          </Link>

          {/* ================================================================= */}
          {/* 2. DESKTOP 5-CATEGORY NAVIGATION ARCHITECTURE */}
          {/* ================================================================= */}
          <nav
            ref={dropdownContainerRef}
            className="hidden lg:flex items-center gap-1 relative"
            aria-label="Main Navigation"
          >
            {NAVIGATION_CATEGORIES.map((cat) => {
              const isOpen = activeDropdown === cat.id
              const isDirectLink = cat.id === 'pricing'

              return (
                <div
                  key={cat.id}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(cat.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  {isDirectLink ? (
                    <Link
                      href={cat.href || '/plans'}
                      className={`inline-flex items-center gap-1 px-3.5 py-2 rounded-xl text-[13px] font-semibold transition-colors ${
                        pathname.startsWith('/plans')
                          ? 'text-[#0066FF] font-bold bg-blue-50/60'
                          : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/70'
                      }`}
                      aria-expanded={isOpen}
                    >
                      <span>{cat.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-blue-600' : ''
                        }`}
                      />
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        setActiveDropdown(isOpen ? null : cat.id)
                      }
                      className={`inline-flex items-center gap-1 px-3.5 py-2 rounded-xl text-[13px] font-semibold transition-colors cursor-pointer ${
                        isOpen
                          ? 'text-[#0066FF] font-bold bg-blue-50/60'
                          : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/70'
                      }`}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                    >
                      <span>{cat.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-blue-600' : ''
                        }`}
                      />
                    </button>
                  )}

                  {/* Dropdown Menu Container */}
                  {isOpen && (
                    <div
                      className={`absolute top-full left-0 mt-1.5 ${
                        cat.dropdownWidth || 'w-[480px]'
                      } bg-white/98 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150`}
                      onMouseEnter={() => handleMouseEnter(cat.id)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className={`grid ${cat.gridCols || 'grid-cols-2'} gap-1.5`}>
                        {cat.items.map((item) => {
                          const IconComponent = item.icon
                          return (
                            <Link
                              key={item.title}
                              href={item.href}
                              onClick={() => setActiveDropdown(null)}
                              className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all"
                            >
                              <div
                                className={`w-8 h-8 rounded-lg ${item.iconBg} flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform`}
                              >
                                <IconComponent className="w-4 h-4" />
                              </div>
                              <div className="space-y-0.5 min-w-0 flex-1">
                                <div className="flex items-center gap-1.5">
                                  <span className="font-bold text-xs text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                                    {item.title}
                                  </span>
                                  {item.badge && (
                                    <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-700 shrink-0">
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-slate-500 leading-tight line-clamp-2">
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          )
                        })}
                      </div>

                      {/* Dropdown Bottom Quick Strip */}
                      {cat.id === 'explore' && (
                        <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between px-2 text-[11px]">
                          <span className="text-slate-500 font-medium">
                            3M+ verified questions mapped to CBSE &amp; ICSE
                          </span>
                          <Link
                            href="/assessment"
                            onClick={() => setActiveDropdown(null)}
                            className="text-blue-600 font-bold hover:underline flex items-center gap-1"
                          >
                            Explore All Assessments →
                          </Link>
                        </div>
                      )}

                      {cat.id === 'students' && (
                        <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between px-2 text-[11px]">
                          <span className="text-slate-500 font-medium">
                            100% verified step-by-step derivations
                          </span>
                          <Link
                            href="/academic"
                            onClick={() => setActiveDropdown(null)}
                            className="text-emerald-600 font-bold hover:underline flex items-center gap-1"
                          >
                            View Academic Lessons →
                          </Link>
                        </div>
                      )}

                      {cat.id === 'pricing' && (
                        <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between px-2 text-[11px]">
                          <span className="text-slate-500 font-medium">
                            No hidden fees • 100% transparent pricing
                          </span>
                          <Link
                            href="/plans"
                            onClick={() => setActiveDropdown(null)}
                            className="text-blue-600 font-bold hover:underline flex items-center gap-1"
                          >
                            Compare All Plans →
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>
        </div>

        {/* ================================================================= */}
        {/* 3. HEADER ACTIONS: SIGN IN & START FREE */}
        {/* ================================================================= */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Dynamic Auth: Sign In or Dashboard */}
          {currentUser ? (
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-xs font-bold text-slate-800 hover:text-slate-950 bg-slate-100/80 hover:bg-slate-200/80 h-9.5 px-3.5 rounded-xl border border-slate-200 transition-all shadow-2xs"
            >
              {currentUser.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.displayName || 'Learner'}
                  referrerPolicy="no-referrer"
                  className="w-5 h-5 rounded-full object-cover ring-1 ring-slate-300"
                />
              ) : (
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-black">
                  {currentUser.displayName?.charAt(0).toUpperCase() || 'U'}
                </div>
              )}
              <span className="truncate max-w-[120px]">
                {currentUser.displayName || 'Dashboard'}
              </span>
            </Link>
          ) : (
            <Link
              href="/auth/login"
              className="text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100/70 h-9.5 px-3.5 rounded-xl transition-all inline-flex items-center justify-center"
            >
              Sign In
            </Link>
          )}

          {/* Primary CTA: Start Free */}
          <Link
            href="/assessment"
            className="bg-[#0066FF] hover:bg-blue-700 text-white text-xs font-bold h-9.5 px-4.5 rounded-xl shadow-xs hover:shadow-sm transition-all inline-flex items-center gap-1.5 shrink-0"
          >
            <span>Start Free</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={
              mobileMenuOpen ? 'Close main navigation' : 'Open main navigation'
            }
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* ================================================================= */}
      {/* 4. RESPONSIVE MOBILE NAVIGATION DRAWER */}
      {/* ================================================================= */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200/90 bg-white px-4 pt-3 pb-6 space-y-4 shadow-xl max-h-[calc(100vh-70px)] overflow-y-auto animate-in slide-in-from-top-2 duration-150">
          <div className="space-y-1">
            {NAVIGATION_CATEGORIES.map((cat) => {
              const isExpanded = mobileExpandedCat === cat.id

              return (
                <div
                  key={cat.id}
                  className="border border-slate-100 rounded-xl overflow-hidden bg-slate-50/50"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setMobileExpandedCat(isExpanded ? null : cat.id)
                    }
                    className="w-full flex items-center justify-between p-3 text-left font-bold text-xs text-slate-800"
                  >
                    <span>{cat.label}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="px-3 pb-3 pt-1 space-y-1.5 bg-white border-t border-slate-100">
                      {cat.items.map((item) => {
                        const IconComponent = item.icon
                        return (
                          <Link
                            key={item.title}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition-colors"
                          >
                            <div
                              className={`w-6 h-6 rounded-md ${item.iconBg} flex items-center justify-center shrink-0 mt-0.5`}
                            >
                              <IconComponent className="w-3.5 h-3.5" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                                <span>{item.title}</span>
                                {item.badge && (
                                  <span className="text-[9px] px-1 rounded-sm bg-blue-100 text-blue-700">
                                    {item.badge}
                                  </span>
                                )}
                              </p>
                              <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                                {item.description}
                              </p>
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Mobile Bottom Actions */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <Link
              href="/assessment"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center bg-[#0066FF] hover:bg-blue-700 text-white font-bold text-xs h-10.5 px-4 rounded-xl transition-colors shadow-xs gap-1.5"
            >
              <span>Start Free Practice</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {currentUser ? (
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs h-10 px-4 rounded-xl transition-colors gap-2"
              >
                <LayoutDashboard className="w-4 h-4 text-blue-600" />
                <span>Go to Dashboard ({currentUser.displayName})</span>
              </Link>
            ) : (
              <Link
                href="/auth/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs h-10 px-4 rounded-xl transition-colors"
              >
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
