'use client'

import React, { useEffect, useState } from 'react'
import { Wifi, WifiOff, RefreshCw } from 'lucide-react'
import { syncOfflineProgressQueue } from '@/lib/offline/sync-queue'

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true)
  const [isSyncing, setIsSyncing] = useState(false)

  useEffect(() => {
    setIsOnline(navigator.onLine)

    const handleOnline = async () => {
      setIsOnline(true)
      setIsSyncing(true)
      try {
        await syncOfflineProgressQueue()
      } finally {
        setIsSyncing(false)
      }
    }

    const handleOffline = () => {
      setIsOnline(false)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (isOnline && !isSyncing) return null

  return (
    <div
      className={`fixed top-18 right-4 z-50 flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold shadow-md transition-all ${
        isOnline
          ? 'bg-blue-600 text-white'
          : 'bg-amber-600 text-white'
      }`}
      role="status"
    >
      {isSyncing ? (
        <>
          <RefreshCw className="h-3.5 w-3.5 animate-spin" />
          <span>Syncing offline progress...</span>
        </>
      ) : isOnline ? (
        <>
          <Wifi className="h-3.5 w-3.5" />
          <span>Online</span>
        </>
      ) : (
        <>
          <WifiOff className="h-3.5 w-3.5" />
          <span>Offline (Cached Learning Active)</span>
        </>
      )}
    </div>
  )
}
