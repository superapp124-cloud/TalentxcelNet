'use client'

import React, { useState } from 'react'
import { Zap, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { RazorpayCheckoutModal } from '@/components/commerce/razorpay-checkout-modal'

interface NcertActionBarProps {
  classNum: number
  subjectName: string
  chapterTitle: string
  chapterUrl: string
}

export function NcertActionBar({
  classNum,
  subjectName,
  chapterTitle,
  chapterUrl,
}: NcertActionBarProps) {
  const [checkoutProductId, setCheckoutProductId] = useState<string | null>(null)

  const shareText = `📚 *Class ${classNum} ${subjectName} NCERT Solutions* — Chapter: ${chapterTitle}\nVerified step-by-step textbook solutions & practice questions:\n👉 ${chapterUrl}`

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <Button
          size="sm"
          onClick={() => setCheckoutProductId('prod_assess_preboard_49')}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs gap-1.5 shadow-sm"
        >
          <Zap className="h-3.5 w-3.5" />
          <span>Unlock All Chapter Solutions (₹49 UPI Pass)</span>
        </Button>

        <a
          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button size="sm" variant="outline" className="text-xs font-semibold gap-1.5 border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50">
            <Share2 className="h-3.5 w-3.5" />
            <span>Share Chapter on WhatsApp</span>
          </Button>
        </a>
      </div>

      <RazorpayCheckoutModal
        isOpen={Boolean(checkoutProductId)}
        onClose={() => setCheckoutProductId(null)}
        productId={checkoutProductId}
        onSuccess={() => {
          setCheckoutProductId(null)
          window.location.reload()
        }}
      />
    </>
  )
}
