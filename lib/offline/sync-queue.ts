import { getOfflineDB } from './indexed-db'

export async function queueOfflineProgress(lessonId: string, completed: boolean) {
  const db = await getOfflineDB()
  if (!db) return

  const eventId = `prog_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
  await db.put('progress_events', {
    id: eventId,
    lessonId,
    completed,
    timestamp: Date.now(),
    synced: false,
  })
}

export async function syncOfflineProgressQueue(): Promise<number> {
  const db = await getOfflineDB()
  if (!db || typeof navigator === 'undefined' || !navigator.onLine) return 0

  const events = await db.getAll('progress_events')
  const pending = events.filter((e) => !e.synced)

  if (pending.length === 0) return 0

  let syncedCount = 0
  for (const event of pending) {
    try {
      const res = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonId: event.lessonId,
          completed: event.completed,
        }),
      })

      if (res.ok) {
        await db.delete('progress_events', event.id)
        syncedCount++
      }
    } catch {
      break // network interrupted, retry on next connection
    }
  }

  return syncedCount
}
