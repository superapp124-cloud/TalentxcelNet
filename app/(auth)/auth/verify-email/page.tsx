import { Metadata } from 'next'
import Link from 'next/link'
import { Mail, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/brand/logo'

export const metadata: Metadata = {
  title: 'Verify Your Email — TalentXcel Academy',
  robots: { index: false },
}

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-black px-4 py-12">
      <div className="max-w-md w-full text-center space-y-6">
        <Logo size="lg" variant="full" href="/" className="justify-center mb-6" />

        <div className="bg-white dark:bg-neutral-900/80 rounded-3xl border border-black/[0.08] dark:border-white/[0.1] shadow-xl p-8 backdrop-blur-xl space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0080FF]/10 text-[#0080FF]">
            <Mail className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Check your email
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
            We&apos;ve sent a secure activation link to your email address. Click the link to verify your account and access your learner dashboard.
          </p>
          <div className="pt-2">
            <Link href="/auth/login">
              <Button className="w-full rounded-full bg-[#0080FF] hover:bg-[#0070E0] text-white font-semibold text-xs">
                Back to Sign In <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <p className="text-xs text-neutral-400">
          Didn&apos;t receive it? Check your spam folder or{' '}
          <Link href="/contact" className="underline text-neutral-600 dark:text-neutral-300">
            contact admissions
          </Link>.
        </p>
      </div>
    </div>
  )
}
