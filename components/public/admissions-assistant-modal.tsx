'use client'

import React, { useState } from 'react'
import { Sparkles, MessageSquare, X, Send, Loader2, BookOpen, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export function AdmissionsAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        'Hello! I am the **TalentXcel AI Admissions Assistant**. Ask me anything about our 4 programme tracks, transparent fees & instalment plans, or eligibility requirements.',
    },
  ])

  const handleSend = async (customQuery?: string) => {
    const textToSend = (customQuery || input).trim()
    if (!textToSend || loading) return

    setMessages((prev) => [...prev, { role: 'user', content: textToSend }])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/ai/admissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: textToSend }),
      })

      const data = await res.json()
      if (res.ok && data.content) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.content }])
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: 'I had trouble answering that. Please fill out our enquiry form or speak with a counsellor at /apply.',
          },
        ])
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Network connection issue. Please check your internet or email admissions@talentxcel.net.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Floating Admissions Trigger - Compact on mobile to avoid blocking hero imagery */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom))] right-3 sm:bottom-6 sm:right-6 z-30 flex items-center gap-1.5 sm:gap-2 rounded-full border border-blue-400/40 bg-[#245BFF]/95 backdrop-blur-xs hover:bg-[#1E4ED8] px-3 py-1.5 sm:px-3.5 sm:py-2 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all text-[11px] sm:text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        aria-label="Open Admissions Assistant"
      >
        <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-cyan-200 animate-pulse" />
        <span className="hidden sm:inline">Ask Admissions AI</span>
        <span className="sm:hidden">Ask AI</span>
      </button>

      {/* Slide-in Modal Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
          <div className="flex h-full w-full max-w-md flex-col bg-background border-l shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b px-5 py-4 bg-muted/40">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-foreground">AI Admissions Assistant</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Badge variant="success" className="text-[10px] py-0 px-1.5">
                      Verified Policy
                    </Badge>
                    <span className="text-[11px] text-muted-foreground">Instant Grounded Answers</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
                aria-label="Close Assistant"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Quick Questions */}
            <div className="flex items-center gap-1.5 overflow-x-auto border-b bg-muted/20 px-4 py-2 scrollbar-none">
              <button
                onClick={() => handleSend('What are the fees and instalment plans?')}
                className="shrink-0 text-[11px] font-medium bg-background border rounded-full px-2.5 py-1 text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
              >
                Fees & Instalments
              </button>
              <button
                onClick={() => handleSend('Does the programme include a laptop?')}
                className="shrink-0 text-[11px] font-medium bg-background border rounded-full px-2.5 py-1 text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
              >
                Laptop Details
              </button>
              <button
                onClick={() => handleSend('What are the 4 programme tracks?')}
                className="shrink-0 text-[11px] font-medium bg-background border rounded-full px-2.5 py-1 text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
              >
                Programmes
              </button>
            </div>

            {/* Messages Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted border text-foreground'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{m.content}</p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground py-2">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span>Searching verified curriculum and admissions policies...</span>
                </div>
              )}
            </div>

            {/* Bottom Actions & Input */}
            <div className="border-t p-3 bg-background space-y-2">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSend()
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about tuition, eligibility, syllabus..."
                  className="flex-1 rounded-xl border border-input bg-background px-3.5 py-2 text-xs sm:text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={loading}
                />
                <Button type="submit" size="sm" disabled={loading || !input.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
              <div className="text-[10px] text-center text-muted-foreground">
                Grounded on verified TalentXcel policies • No job outcome guarantees
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
