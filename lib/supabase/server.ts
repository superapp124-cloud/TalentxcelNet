import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/types/database'
import { getSupabaseConfig } from '@/lib/supabase/config'

export async function createClient() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let cookieStore: any = null
  try {
    cookieStore = await cookies()
  } catch (err: unknown) {
    // If Next.js threw a dynamic server usage bailout, rethrow to preserve dynamic rendering
    if (
      err &&
      typeof err === 'object' &&
      ('digest' in err || ('message' in err && String((err as Error).message).includes('Dynamic server usage')))
    ) {
      throw err
    }
    // Request cookie store is not available in server-to-server webhooks or test runner contexts
  }

  const { url, anonKey } = getSupabaseConfig()
  return createServerClient<Database>(
    url,
    anonKey,
    {
      cookies: {
        getAll() {
          return cookieStore ? cookieStore.getAll() : []
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          if (!cookieStore) return
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {}
        },
      },
    }
  )
}
