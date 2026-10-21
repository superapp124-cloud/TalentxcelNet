import { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2, ArrowRight, Brain, Code2, Users, Award, Download, Laptop } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'How It Works — TalentXcel Academy',
  description: 'Understand the step-by-step learning journey at TalentXcel Academy.',
  alternates: {
    canonical: 'https://talentxcel.net/how-it-works',
  },
}

const steps = [
  {
    step: '1',
    title: 'Admissions & Goal Assessment',
    description:
      'Submit an enquiry to connect with an admissions counsellor. We assess your background and recommend the appropriate programme pathway. Enrolment is activated upon meeting eligibility and completing payment terms.',
  },
  {
    step: '2',
    title: 'Guided Curriculum & Super AI Tutor',
    description:
      'Engage with structured text, code walkthroughs, and exercises. When you get stuck, the Super AI Tutor provides Socratic hints without spoiling the solution, keeping you progressing independently.',
  },
  {
    step: '3',
    title: 'Hands-on Projects & Mentor Feedback',
    description:
      'Build real projects evaluated against industry rubrics. Qualified instructors review your submissions, provide constructive feedback, and assess competency.',
  },
  {
    step: '4',
    title: 'Offline Learning & PWA Access',
    description:
      'Going off-grid or dealing with slow connectivity? Download lesson materials to your device via our Progressive Web App (PWA). Progress events queue locally and sync automatically when you reconnect.',
  },
  {
    step: '5',
    title: 'Competency Milestone & Certification',
    description:
      'Upon meeting the completion criteria (100% core modules completed and passing assessment threshold), earn a verifiable digital completion certificate with its own permanent public verification link.',
  },
]

export default function HowItWorksPage() {
  return (
    <div className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            How Learning Works at TalentXcel
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            A practical, project-first educational model combining structured modules, AI assistance, offline accessibility, and human mentor guidance.
          </p>
        </div>

        <div className="space-y-6">
          {steps.map((s) => (
            <div key={s.step} className="flex gap-4 sm:gap-6 p-6 rounded-2xl border bg-card shadow-xs">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-lg">
                {s.step}
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-foreground">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-8 rounded-2xl bg-muted/40 border text-center space-y-4 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-foreground">Ready to begin your journey?</h3>
          <p className="text-sm text-muted-foreground">
            Explore our programme catalogue or speak directly with an admissions counsellor.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <Link href="/programmes">
              <Button variant="outline">Browse Programmes</Button>
            </Link>
            <Link href="/apply">
              <Button>Apply for Admission</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
