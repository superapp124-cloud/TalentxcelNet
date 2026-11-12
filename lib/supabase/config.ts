type SupabaseConfig = { url: string; anonKey: string }

export function getSupabaseConfig(): SupabaseConfig {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()
  if (!url || !anonKey) {
    throw new Error('Supabase configuration is missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.')
  }
  try {
    new URL(url)
  } catch {
    throw new Error('Supabase configuration is invalid. NEXT_PUBLIC_SUPABASE_URL must be an absolute URL.')
  }
  return { url, anonKey }
}
