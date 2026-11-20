type SupabaseConfig = { url: string; anonKey: string }

export function getSupabaseConfig(): SupabaseConfig {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ||
    'https://wvuvriewskvvievacida.supabase.co'
  const anonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
    'sb_publishable_2OGNulCHMN3ID-W8eRermg_28PD1wuM'

  try {
    new URL(url)
  } catch {
    throw new Error('Supabase configuration is invalid. NEXT_PUBLIC_SUPABASE_URL must be an absolute URL.')
  }
  return { url, anonKey }
}
