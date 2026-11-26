import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'
import { getSupabaseConfig } from '@/lib/supabase/config'

/**
 * Creates a privileged server-only Supabase client using SUPABASE_SERVICE_ROLE_KEY.
 * Restricted to trusted server-to-server operations (such as payment webhooks) that
 * invoke SECURITY DEFINER RPCs or mutate tables protected by service_role grants.
 *
 * Never import or invoke this module from client components or NEXT_PUBLIC code.
 */
export function createServiceRoleClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  if (!serviceRoleKey) {
    throw new Error(
      'Server configuration error: SUPABASE_SERVICE_ROLE_KEY is required for privileged webhook operations.'
    )
  }

  const { url } = getSupabaseConfig()
  return createSupabaseClient<Database>(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
