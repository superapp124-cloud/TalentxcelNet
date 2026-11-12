import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import type { Database } from '@/types/database'
import { getSupabaseConfig } from '@/lib/supabase/config'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const { url, anonKey } = getSupabaseConfig()

  const supabase = createServerClient<Database>(
    url,
    anonKey,
    {
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
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const host = request.headers.get('host') || ''
  const isAcademySubdomain = host.startsWith('academy.')
  const isAiSubdomain = host.startsWith('ai.')

  // Multi-domain routing: on academy.talentxcel.net or ai.talentxcel.net, root '/' routes to learner portal
  if ((isAcademySubdomain || isAiSubdomain) && request.nextUrl.pathname === '/') {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = user ? '/dashboard' : '/auth/login'
    if (!user) redirectUrl.searchParams.set('redirectTo', '/dashboard')
    return NextResponse.redirect(redirectUrl)
  }

  // Protected academy routes
  const isAcademyRoute =
    request.nextUrl.pathname.startsWith('/academy') ||
    request.nextUrl.pathname.startsWith('/dashboard') ||
    request.nextUrl.pathname.startsWith('/courses') ||
    request.nextUrl.pathname.startsWith('/admin')

  // Auth routes (redirect if already logged in)
  const isAuthRoute =
    request.nextUrl.pathname.startsWith('/auth/login') ||
    request.nextUrl.pathname.startsWith('/auth/register')

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
