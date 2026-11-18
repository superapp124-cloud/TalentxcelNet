'use client'

import React, { useState } from 'react'
import { Printer, Share2, Copy, Check, Download, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FormulaActionButtonsProps {
  classNum: number
  subjectName: string
  subjectCode: string
}

export function FormulaActionButtons({
  classNum,
  subjectName,
  subjectCode,
}: FormulaActionButtonsProps) {
  const [copied, setCopied] = useState(false)

  const pageUrl = `https://talentxcel.net/formulas/class-${classNum}/${subjectCode}`
  const shareMessage = `⚡ *Class ${classNum} ${subjectName} Complete Formula & Concepts Cheat-Sheet (2026 Board Exam)* 📚\n\nChapter-by-chapter formulas, core laws & solved practice questions:\n👉 ${pageUrl}\n\n_Save as PDF or share with classmates preparing for Pre-Boards!_`

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print()
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
    }
  }

  const handleWhatsAppShare = () => {
    const encoded = encodeURIComponent(shareMessage)
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank')
  }

  const handleTelegramShare = () => {
    const encodedText = encodeURIComponent(`Class ${classNum} ${subjectName} Complete Formula Cheat-Sheet`)
    const encodedUrl = encodeURIComponent(pageUrl)
    window.open(`https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`, '_blank')
  }

  return (
    <div className="flex flex-wrap items-center gap-2.5 print:hidden">
      {/* Print / Save PDF Button */}
      <Button
        onClick={handlePrint}
        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5"
      >
        <Printer className="h-3.5 w-3.5" />
        Print / Save PDF Cheat-Sheet
      </Button>

      {/* WhatsApp Share */}
      <Button
        onClick={handleWhatsAppShare}
        variant="outline"
        className="border-emerald-500/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 font-bold text-xs flex items-center gap-1.5"
      >
        <Share2 className="h-3.5 w-3.5" />
        Share on WhatsApp
      </Button>

      {/* Telegram Share */}
      <Button
        onClick={handleTelegramShare}
        variant="outline"
        className="border-sky-500/40 text-sky-700 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/50 font-semibold text-xs flex items-center gap-1.5"
      >
        <Send className="h-3.5 w-3.5" />
        Telegram
      </Button>

      {/* Copy Link */}
      <Button
        onClick={handleCopy}
        variant="ghost"
        className="text-xs text-slate-600 dark:text-slate-300 hover:text-slate-900 font-medium flex items-center gap-1"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-emerald-500" />
            <span className="text-emerald-600 font-semibold">Link Copied!</span>
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" />
            <span>Copy Link</span>
          </>
        )}
      </Button>
    </div>
  )
}
