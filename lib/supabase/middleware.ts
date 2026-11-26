import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import type { Database } from '@/types/database'
import { getSupabaseConfig } from '@/lib/supabase/config'

export async function updateSession(request: NextRequest) {
  const host = request.headers.get('host') || ''
  const isAcademySubdomain = host.startsWith('academy.')
  const isAiSubdomain = host.startsWith('ai.')
  const pathname = request.nextUrl.pathname

  const isAcademyRoute =
    pathname.startsWith('/academy') ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/courses') ||
    pathname.startsWith('/admin')
  const isAuthRoute =
    pathname.startsWith('/auth/login') ||
    pathname.startsWith('/auth/register')

  // Public SEO/marketing routes never call Supabase Auth even when an sb- cookie is present.
  const needsAuthCheck =
    isAcademyRoute ||
    isAuthRoute ||
    ((isAcademySubdomain || isAiSubdomain) && pathname === '/')

  if (!needsAuthCheck) {
    return NextResponse.next()
  }

  let supabaseResponse = NextResponse.next({ request })

  const hasSupabaseCookie = request.cookies.getAll().some((c) => c.name.startsWith('sb-'))

  let user: { id: string } | null = null
  if (hasSupabaseCookie) {
    const { url, anonKey } = getSupabaseConfig()

    const supabase = createServerClient<Database>(url, anonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    })

    const { data } = await supabase.auth.getUser()
    user = data.user
  }

  // Multi-domain routing: on academy.talentxcel.net or ai.talentxcel.net, root '/' routes to learner portal
  if ((isAcademySubdomain || isAiSubdomain) && pathname === '/') {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = user ? '/dashboard' : '/auth/login'
    if (!user) redirectUrl.searchParams.set('redirectTo', '/dashboard')
    return NextResponse.redirect(redirectUrl)
  }

  if (isAcademyRoute && !user) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/auth/login'
    redirectUrl.searchParams.set('redirectTo', request.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  if (isAuthRoute && user) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/dashboard'
    return NextResponse.redirect(redirectUrl)
  }

  return supabaseResponse
}
