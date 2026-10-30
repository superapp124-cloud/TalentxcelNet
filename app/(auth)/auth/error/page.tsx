'use client'

import React, { Suspense, useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { AlertCircle, ArrowLeft, RefreshCw, ShieldAlert, LogIn, Database } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/brand/logo'

function AuthErrorContent() {
  const searchParams = useSearchParams()
  const [errorDetails, setErrorDetails] = useState<{
    error: string
    description: string
    code: string
  }>({
    error: searchParams.get('error') || searchParams.get('message') || 'Authentication Error',
    description:
      searchParams.get('error_description') ||
      'An unexpected error occurred during authentication. Please try again.',
    code: searchParams.get('error_code') || '',
  })

  // Also read hash fragment if Supabase OAuth sent error in URL hash
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.substring(1)
      const params = new URLSearchParams(hash)
      const hashError = params.get('error')
      const hashDesc = params.get('error_description')
      const hashCode = params.get('error_code')

      if (hashError || hashDesc) {
        setErrorDetails({
          error: hashError || 'Authentication Error',
          description: hashDesc
            ? decodeURIComponent(hashDesc.replace(/\+/g, ' '))
            : 'Database error occurred during user profile synchronization.',
          code: hashCode || '',
        })
      }
    }
  }, [])

  const isDatabaseError =
    errorDetails.description.toLowerCase().includes('database error') ||
    errorDetails.error.toLowerCase().includes('server_error')

  return (
    <div className="w-full max-w-lg p-6 sm:p-8 bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-xl space-y-6">
      <div className="text-center space-y-3">
        <div className="mx-auto w-12 h-12 rounded-2xl bg-red-500/10 text-red-600 flex items-center justify-center">
          {isDatabaseError ? (
            <Database className="w-6 h-6 text-red-600" />
          ) : (
            <ShieldAlert className="w-6 h-6 text-red-600" />
          )}
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white tracking-tight">
          Authentication Error
        </h1>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          We encountered an issue while verifying your Google authentication session.
        </p>
      </div>

      {/* Error Details Box */}
      <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/20 space-y-2 text-xs">
        <div className="flex items-center gap-2 text-red-600 font-bold">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorDetails.error}</span>
          {errorDetails.code && (
            <span className="text-[10px] bg-red-100 dark:bg-red-950/40 px-2 py-0.5 rounded font-mono">
              {errorDetails.code}
            </span>
          )}
        </div>
        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed font-mono text-[11px] break-words">
          {errorDetails.description}
        </p>
      </div>

      {isDatabaseError && (
        <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/20 text-xs space-y-2 text-neutral-600 dark:text-neutral-400">
          <p className="font-semibold text-neutral-900 dark:text-white">
            Why did this happen?
          </p>
          <p className="text-[11px] leading-relaxed">
            This typically occurs when a database trigger on Supabase encounters a unique constraint or conflict with an existing profile record for this email. Applying the safe database trigger migration resolves this permanently.
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Link href="/auth/login" className="flex-1">
          <Button className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs h-10 font-semibold shadow-xs">
            <LogIn className="w-4 h-4" />
            Try Signing In Again
          </Button>
        </Link>
        <Link href="/" className="flex-1">
          <Button variant="outline" className="w-full gap-2 text-xs h-10 font-semibold">
            <ArrowLeft className="w-4 h-4" />
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex flex-col items-center justify-center p-4">
      <div className="mb-6">
        <Logo size="md" variant="full" href="/" />
      </div>
      <Suspense
        fallback={
          <div className="p-8 text-center text-xs text-neutral-500">
            Loading error details...
          </div>
        }
      >
        <AuthErrorContent />
      </Suspense>
    </div>
  )
}
