'use client'

import React, { useState } from 'react'
import { Brain, X, Send, Sparkles, MessageSquare, AlertCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export function AITutorDrawer({ courseContext }: { courseContext?: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        'Hi! I am your **TalentXcel AI Tutor**. How can I help you with this lesson? You can ask for a hint or a conceptual breakdown.',
    },
  ])
  const [loading, setLoading] = useState(false)
  const [hintStep, setHintStep] = useState(1)

  const handleSend = async (mode: 'hint' | 'full_solution' = 'hint') => {
    if (!input.trim() && mode !== 'hint') return

    const questionText = input.trim() || `I need hint #${hintStep} for this concept.`
    const userMsg: Message = { role: 'user', content: questionText }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/ai/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: questionText,
          courseContext: courseContext ?? 'General Academy Learning',
          mode,
          hintStep,
        }),
      })

      const data = await res.json()
      if (res.ok && data.content) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.content }])
        if (mode === 'hint') setHintStep((h) => Math.min(h + 1, 5))
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: 'I had trouble generating a response. Please try again or ask an instructor.',
          },
        ])
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Network error. Please check your internet connection.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-white shadow-xl hover:bg-primary/90 transition-all focus:outline-none focus:ring-2 focus:ring-ring"
        aria-label="Open AI Tutor"
      >
        <Sparkles className="h-5 w-5 animate-pulse" />
        <span className="font-semibold text-sm">Super AI Tutor</span>
      </button>

      {/* Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
          <div className="flex h-full w-full max-w-md flex-col bg-background shadow-2xl border-l">
            {/* Header */}
            <div className="flex items-center justify-between border-b px-4 py-3.5 bg-muted/40">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <Brain className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight">Super AI Learning Tutor</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Badge variant="success" className="text-[10px] py-0 px-1.5">
                      Grounded
                    </Badge>
                    <span className="text-[11px] text-muted-foreground">Socratic mode</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
                aria-label="Close tutor"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Quick Actions Bar */}
            <div className="flex items-center gap-2 border-b bg-muted/20 px-4 py-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-7 gap-1"
                onClick={() => handleSend('hint')}
                disabled={loading}
              >
                <Sparkles className="h-3 w-3 text-amber-500" />
                Get Hint #{hintStep}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs h-7 text-muted-foreground hover:text-foreground"
                onClick={() => handleSend('full_solution')}
                disabled={loading}
              >
                Explain Concept
              </Button>
            </div>

            {/* Messages Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    m.role === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
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
                  <span>AI Tutor is thinking...</span>
                </div>
              )}
            </div>

            {/* Disclaimer & Escalation notice */}
            <div className="px-4 py-1.5 bg-muted/30 border-t flex items-center justify-between text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                AI may produce inaccuracies.
              </span>
              <a
                href="/contact"
                target="_blank"
                className="text-primary hover:underline"
              >
                Ask Instructor
              </a>
            </div>

            {/* Input Form */}
            <div className="border-t p-3 bg-background">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSend('hint')
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question or request a hint..."
                  className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  disabled={loading}
                />
                <Button type="submit" size="sm" disabled={loading || !input.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
