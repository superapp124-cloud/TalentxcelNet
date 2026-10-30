import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'
  const errorParam = searchParams.get('error')
  const errorDesc = searchParams.get('error_description')
  const errorCode = searchParams.get('error_code')

  // If OAuth provider returned an explicit error
  if (errorParam || errorDesc) {
    const errorUrl = new URL(`${origin}/auth/error`)
    if (errorParam) errorUrl.searchParams.set('error', errorParam)
    if (errorDesc) errorUrl.searchParams.set('error_description', errorDesc)
    if (errorCode) errorUrl.searchParams.set('error_code', errorCode)
    return NextResponse.redirect(errorUrl.toString())
  }

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }

    // Exchange failed, forward Supabase error details
    const errorUrl = new URL(`${origin}/auth/error`)
    errorUrl.searchParams.set('error', error.name || 'auth-exchange-error')
    errorUrl.searchParams.set('error_description', error.message || 'Failed to exchange authorization code for session.')
    return NextResponse.redirect(errorUrl.toString())
  }

  // Return user to error page
  return NextResponse.redirect(`${origin}/auth/error?message=auth-code-error`)
}
