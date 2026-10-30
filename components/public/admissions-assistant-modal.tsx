'use client'

import React, { useState } from 'react'
import { Sparkles, X, Send, Loader2, Bot, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface Message {
  role: 'user' | 'assistant'
  content: string
  suggestedActions?: string[]
}

export function AdmissionsAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        'Hello! 👋 I am **TalentXcel AI**, your personal learning and academic guide.\n\nAsk me anything! How our free diagnostic tests work, curriculum for Classes 4–12, competitive entrance mocks (JEE, NEET, CUET, UPSC), skill studio tracks (AI, Coding, Robotics), or ask me any question in Math or Science and I will explain it step-by-step.',
      suggestedActions: [
        'How does the free diagnostic work?',
        'Which classes and boards are supported?',
        'What are the pricing plans?',
      ],
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
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: data.content,
            suggestedActions: data.suggestedActions || [],
          },
        ])
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content:
              'I am here to help! You can explore our free 5-question diagnostics on the home page, browse syllabus under /assessment, or check transparent plans starting from ₹20 at /plans.',
          },
        ])
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Network hiccup. Please check your internet connection or email support@talentxcel.net.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Floating Chatbot Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom))] right-3 sm:bottom-6 sm:right-6 z-30 flex items-center gap-2 rounded-full border border-blue-400/40 bg-[#245BFF] hover:bg-[#1D4ED8] px-3.5 py-2 text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        aria-label="Open TalentXcel AI Chatbot"
      >
        <Sparkles className="h-4 w-4 text-cyan-200 animate-pulse" />
        <span>Ask TalentXcel</span>
      </button>

      {/* Slide-in Modal Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
          <div className="flex h-full w-full max-w-md flex-col bg-white border-l border-slate-200 shadow-2xl text-slate-900">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-4 sm:px-5 py-3.5 bg-slate-50/80">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-600 shadow-2xs">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 leading-tight">
                    Ask TalentXcel AI
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] font-semibold text-emerald-700">Online</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-[11px] text-slate-500">Universal Learning Guide</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
                aria-label="Close Assistant"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Quick Prompt Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto border-b border-slate-100 bg-slate-50/40 px-3.5 py-2 scrollbar-none">
              <button
                onClick={() => handleSend('How does the free diagnostic test work?')}
                className="shrink-0 text-[11px] font-semibold bg-white border border-slate-200 rounded-full px-2.5 py-1 text-slate-700 hover:text-blue-600 hover:border-blue-300 transition-colors shadow-2xs"
              >
                5 Free Diagnostic Qs
              </button>
              <button
                onClick={() => handleSend('What classes, boards, and subjects are covered?')}
                className="shrink-0 text-[11px] font-semibold bg-white border border-slate-200 rounded-full px-2.5 py-1 text-slate-700 hover:text-blue-600 hover:border-blue-300 transition-colors shadow-2xs"
              >
                Classes 4–12
              </button>
              <button
                onClick={() => handleSend('Tell me about competitive entrance mocks for JEE, NEET, and UPSC.')}
                className="shrink-0 text-[11px] font-semibold bg-white border border-slate-200 rounded-full px-2.5 py-1 text-slate-700 hover:text-blue-600 hover:border-blue-300 transition-colors shadow-2xs"
              >
                Entrance Mocks
              </button>
              <button
                onClick={() => handleSend('What are the 8 hands-on skill development tracks?')}
                className="shrink-0 text-[11px] font-semibold bg-white border border-slate-200 rounded-full px-2.5 py-1 text-slate-700 hover:text-blue-600 hover:border-blue-300 transition-colors shadow-2xs"
              >
                AI & Coding Tracks
              </button>
              <button
                onClick={() => handleSend('What are your pricing plans and chapter packs?')}
                className="shrink-0 text-[11px] font-semibold bg-white border border-slate-200 rounded-full px-2.5 py-1 text-slate-700 hover:text-blue-600 hover:border-blue-300 transition-colors shadow-2xs"
              >
                Pricing (From ₹20)
              </button>
            </div>

            {/* Messages Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#F8FAFC]">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed shadow-2xs ${
                      m.role === 'user'
                        ? 'bg-[#245BFF] text-white font-medium rounded-br-xs'
                        : 'bg-white border border-slate-200 text-slate-800 rounded-bl-xs'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{m.content}</p>
                  </div>

                  {/* Render Suggested Actions if any */}
                  {m.role === 'assistant' && m.suggestedActions && m.suggestedActions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                      {m.suggestedActions.map((action, aIdx) => (
                        <button
                          key={aIdx}
                          onClick={() => handleSend(action)}
                          className="text-[10.5px] font-semibold bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 px-2.5 py-1 rounded-lg transition-colors text-left shadow-2xs"
                        >
                          {action} &rarr;
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-2 text-xs text-slate-500 py-2 bg-white border border-slate-200 rounded-xl px-3 w-fit shadow-2xs">
                  <Loader2 className="h-4 w-4 animate-spin text-[#245BFF]" />
                  <span>TalentXcel AI is thinking...</span>
                </div>
              )}
            </div>

            {/* Bottom Actions & Input */}
            <div className="border-t border-slate-200 p-3 bg-white space-y-2">
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
                  placeholder="Ask about tests, curriculum, skills, pricing, or homework..."
                  className="flex-1 rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs sm:text-sm placeholder:text-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#245BFF] focus:bg-white transition-all"
                  disabled={loading}
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={loading || !input.trim()}
                  className="bg-[#245BFF] hover:bg-[#1D4ED8] text-white rounded-xl h-9 px-3"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
              <div className="text-[10px] text-center text-slate-400">
                Grounded in verified CBSE, ICSE &amp; entrance standards • Instant server explanations
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
