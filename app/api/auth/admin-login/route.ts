import { NextResponse } from 'next/server'

// Retained only to return a deterministic failure for stale clients. There is
// no custom administrator credential or client-controlled session anymore.
export async function POST() {
  return NextResponse.json(
    { success: false, error: 'This endpoint has been removed. Use Supabase authentication.' },
    { status: 410 }
  )
}
