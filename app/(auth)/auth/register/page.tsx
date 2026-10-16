import { Metadata } from 'next'
import Link from 'next/link'
import { RegisterForm } from '@/components/auth/register-form'
import { GraduationCap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Create Account',
  robots: { index: false },
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <Link href="/">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">TalentXcel</span>
            </div>
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-foreground">Create your account</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Already registered?{' '}
            <Link href="/auth/login" className="text-primary hover:underline font-medium">Sign in</Link>
          </p>
        </div>
        <div className="bg-card rounded-2xl border shadow-sm p-6">
          <RegisterForm />
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          By creating an account you agree to our{' '}
          <Link href="/legal/terms" className="underline hover:text-foreground">Terms</Link> and{' '}
          <Link href="/legal/privacy" className="underline hover:text-foreground">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  )
}
