import { Metadata } from 'next'
import Link from 'next/link'
import { Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Verify your email',
  robots: { index: false },
}

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Mail className="h-8 w-8 text-primary" aria-hidden="true" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">Check your email</h1>
        <p className="mt-3 text-muted-foreground">
          We&apos;ve sent a verification link to your email address. Click the link to activate your account.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          The link expires in 24 hours. Check your spam folder if you don&apos;t see it.
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <Link href="/auth/login">
            <Button variant="outline" className="w-full">Back to Sign In</Button>
          </Link>
          <Link href="/contact">
            <Button variant="ghost" className="w-full text-sm">Need help? Contact us</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
