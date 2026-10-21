import { Suspense } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { LoginForm } from '@/components/auth/login-form'
import { Logo } from '@/components/brand/logo'

export const metadata: Metadata = {
  title: 'Sign In — TalentXcel Academy',
  robots: { index: false },
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 dark:bg-black px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center text-center">
          <Logo size="lg" variant="full" href="/" />
          <h1 className="mt-8 text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Welcome back
          </h1>
          <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" className="text-[#0080FF] hover:underline font-semibold">
              Create one
            </Link>
          </p>
        </div>

        <div className="bg-white dark:bg-neutral-900/80 rounded-3xl border border-black/[0.08] dark:border-white/[0.1] shadow-xl p-8 backdrop-blur-xl">
          <Suspense fallback={<div className="py-12 text-center text-sm text-neutral-400">Loading sign in form...</div>}>
            <LoginForm />
          </Suspense>
        </div>

        <p className="text-center text-xs text-neutral-500">
          By signing in you agree to our{' '}
          <Link href="/legal/terms" className="underline hover:text-black dark:hover:text-white">
            Terms
          </Link>{' '}
          and{' '}
          <Link href="/legal/privacy" className="underline hover:text-black dark:hover:text-white">
            Privacy Policy
          </Link>.
        </p>
      </div>
    </div>
  )
}
