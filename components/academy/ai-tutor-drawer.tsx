'use client'

import React, { useState } from 'react'
import { Brain, X, Send, Sparkles, MessageSquare, AlertCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface Message {
  role: 'user' | 'assistant'
  content: string
  sources?: Array<{ title: string; category: string }>
  suggestedActions?: string[]
}

export function AITutorDrawer({ courseContext }: { courseContext?: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        'Hi! I am your **TalentXcel Super AI Tutor**. I am grounded on your curriculum modules and learning objectives. Ask for a Socratic hint, code review, or conceptual explanation.',
      suggestedActions: ['Get Hint #1', 'Explain system boundaries', 'Review project criteria'],
    },
  ])
  const [loading, setLoading] = useState(false)
  const [hintStep, setHintStep] = useState(1)
  const [reportStatus, setReportStatus] = useState<string | null>(null)

  const handleSend = async (mode: 'hint' | 'full_solution' = 'hint', customText?: string) => {
    const textToSend = customText || input.trim()
    if (!textToSend && mode !== 'hint') return

    const questionText = textToSend || `I need hint #${hintStep} for this concept.`
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
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: data.content,
            sources: data.sources,
            suggestedActions: data.suggestedActions,
          },
        ])
        if (mode === 'hint') setHintStep((h) => Math.min(h + 1, 5))
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: 'I encountered an issue generating a response. You can escalate directly to an academy mentor.',
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

  const handleEscalate = async (lastAssistantMsg: Message) => {
    setReportStatus('Escalating to instructor...')
    try {
      const res = await fetch('/api/ai/report-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: input || 'Learner requested direct instructor intervention',
          responseContent: lastAssistantMsg.content,
          feedbackType: 'escalate_instructor',
          courseContext: courseContext || 'Course Lesson',
        }),
      })
      if (res.ok) {
        setReportStatus('Escalated to instructor. Mentor will review.')
        setTimeout(() => setReportStatus(null), 5000)
      }
    } catch {
      setReportStatus('Unable to reach escalation server.')
    }
  }

  const handleReport = async (lastAssistantMsg: Message) => {
    setReportStatus('Submitting report...')
    try {
      await fetch('/api/ai/report-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: 'Inaccurate answer report',
          responseContent: lastAssistantMsg.content,
          feedbackType: 'report_inaccurate',
          courseContext: courseContext || 'Course Lesson',
        }),
      })
      setReportStatus('Feedback logged. Thank you.')
      setTimeout(() => setReportStatus(null), 4000)
    } catch {
      setReportStatus('Failed to send report.')
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
                    <Badge variant="default" className="text-[10px] py-0 px-1.5 bg-emerald-600">
                      Grounded
                    </Badge>
                    <span className="text-[11px] text-muted-foreground">Socratic mode • Curriculum RAG</span>
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

            {/* Status notice */}
            {reportStatus && (
              <div className="bg-primary/10 text-primary text-xs px-4 py-1.5 border-b text-center font-medium">
                {reportStatus}
              </div>
            )}

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
                    className={`max-w-[90%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted border text-foreground'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{m.content}</p>

                    {/* Sources Badge */}
                    {m.sources && m.sources.length > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-border/40 text-[11px] text-muted-foreground space-y-1">
                        <div className="font-semibold text-[10px] uppercase tracking-wider text-primary">
                          Verified Curriculum Sources:
                        </div>
                        {m.sources.map((s, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span>{s.title}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Report & Escalate row for assistant messages */}
                    {m.role === 'assistant' && idx > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-border/30 flex items-center justify-between text-[10px] text-muted-foreground">
                        <button
                          onClick={() => handleReport(m)}
                          className="hover:text-destructive underline"
                        >
                          Report Inaccuracy
                        </button>
                        <button
                          onClick={() => handleEscalate(m)}
                          className="text-primary hover:underline font-medium"
                        >
                          Escalate to Instructor →
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Suggested Actions chips */}
                  {m.suggestedActions && m.suggestedActions.length > 0 && idx === messages.length - 1 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {m.suggestedActions.map((action, aIdx) => (
                        <button
                          key={aIdx}
                          onClick={() => handleSend('hint', action)}
                          className="text-[11px] rounded-full border border-primary/30 bg-primary/5 hover:bg-primary/10 text-primary px-2.5 py-0.5 transition-colors"
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground py-2">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span>Super AI is consulting curriculum...</span>
                </div>
              )}
            </div>

            {/* Disclaimer & Escalation notice */}
            <div className="px-4 py-1.5 bg-muted/30 border-t flex items-center justify-between text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                Curriculum grounded • Discloses uncertainty
              </span>
              <a
                href="/contact"
                target="_blank"
                className="text-primary hover:underline"
              >
                Direct Support
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
                  placeholder="Ask Super AI or request a hint..."
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
