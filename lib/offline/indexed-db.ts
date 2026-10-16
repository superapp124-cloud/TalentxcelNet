import { openDB, type IDBPDatabase } from 'idb'

const DB_NAME = 'talentxcel_offline_db'
const DB_VERSION = 1

interface OfflineDB {
  lessons: {
    key: string
    value: {
      lessonId: string
      programmeSlug: string
      title: string
      content: string
      downloadedAt: number
    }
  }
  progress_events: {
    key: string
    value: {
      id: string
      lessonId: string
      completed: boolean
      timestamp: number
      synced: boolean
    }
  }
}

let dbPromise: Promise<IDBPDatabase<OfflineDB>> | null = null

export function getOfflineDB() {
  if (typeof window === 'undefined') return null
  if (!dbPromise) {
    dbPromise = openDB<OfflineDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('lessons')) {
          db.createObjectStore('lessons', { keyPath: 'lessonId' })
        }
        if (!db.objectStoreNames.contains('progress_events')) {
          db.createObjectStore('progress_events', { keyPath: 'id' })
        }
      },
    })
  }
  return dbPromise
}

export async function saveLessonOffline(lesson: {
  lessonId: string
  programmeSlug: string
  title: string
  content: string
}) {
  const db = await getOfflineDB()
  if (!db) return
  await db.put('lessons', {
    ...lesson,
    downloadedAt: Date.now(),
  })
}

export async function getOfflineLesson(lessonId: string) {
  const db = await getOfflineDB()
  if (!db) return null
  return await db.get('lessons', lessonId)
}

export async function getDownloadedLessonsCount(): Promise<number> {
  const db = await getOfflineDB()
  if (!db) return 0
  return await db.count('lessons')
}
