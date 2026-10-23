import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import type { Database } from '@/types/database'
import { isSuperAdminEmail } from '@/lib/auth/permissions'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wvuvriewskvvievacida.supabase.co'
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_2OGNulCHMN3ID-W8eRermg_28PD1wuM'

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

  const isLocalHost = host.includes('localhost') || host.includes('127.0.0.1')
  const isPreview = request.nextUrl.searchParams.get('preview') === '1'
  const isLocalE2EAudit =
    (process.env.NODE_ENV !== 'production' || isLocalHost) &&
    (request.headers.get('x-e2e-audit') === '1' ||
      request.cookies.get('e2e_audit')?.value === '1' ||
      isPreview)
  const adminCookie = request.cookies.get('talentxcel_super_admin')?.value
  const isSuperAdminCookie = isSuperAdminEmail(adminCookie)
  const isSuperAdminUser = isSuperAdminEmail(user?.email) || isSuperAdminCookie

  if (isAcademyRoute && !user && !isLocalE2EAudit && !isSuperAdminUser) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/auth/login'
    redirectUrl.searchParams.set('redirectTo', request.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  if (isAuthRoute && (user || isSuperAdminCookie)) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = isSuperAdminCookie ? '/admin/question-bank' : '/dashboard'
    return NextResponse.redirect(redirectUrl)
  }

  return supabaseResponse
}
