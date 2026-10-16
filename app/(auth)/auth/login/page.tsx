import { Metadata } from 'next'
import Link from 'next/link'
import { LoginForm } from '@/components/auth/login-form'
import { GraduationCap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sign In',
  robots: { index: false },
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <Link href="/" aria-label="TalentXcel Academy home">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">TalentXcel</span>
            </div>
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-foreground">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" className="text-primary hover:underline font-medium">Create one</Link>
          </p>
        </div>
        <div className="bg-card rounded-2xl border shadow-sm p-6">
          <LoginForm />
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          By signing in you agree to our{' '}
          <Link href="/legal/terms" className="underline hover:text-foreground">Terms</Link> and{' '}
          <Link href="/legal/privacy" className="underline hover:text-foreground">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  )
}
