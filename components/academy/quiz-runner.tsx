'use client'

import React, { useState } from 'react'
import { CheckCircle2, XCircle, Award, RotateCcw, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MODULE_1_QUIZ } from '@/lib/lms/assessment-service'

export function QuizRunner({
  programmeTitle = 'AI Development & Automation',
  onComplete,
}: {
  programmeTitle?: string
  onComplete?: (passed: boolean) => void
}) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  interface EvaluationType {
    isPassed: boolean
    score: number
    totalQuestions: number
    percentage: number
    results: Array<{
      questionId: string
      isCorrect: boolean
      correctIndex: number
      explanation: string
    }>
  }

  const [evaluation, setEvaluation] = useState<EvaluationType | null>(null)
  interface CertificateType {
    certificateNumber: string
    verificationUrl: string
  }

  const [certificate, setCertificate] = useState<CertificateType | null>(null)

  const handleSelect = (questionId: string, optionIndex: number) => {
    if (submitted) return
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/assessment/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: selectedAnswers, programmeTitle }),
      })
      const data = await res.json()
      if (res.ok) {
        setEvaluation(data.evaluation)
        setCertificate(data.certificate)
        setSubmitted(true)
        if (onComplete) onComplete(data.evaluation.isPassed)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setSelectedAnswers({})
    setSubmitted(false)
    setEvaluation(null)
    setCertificate(null)
  }

  return (
    <div className="space-y-6">
      {MODULE_1_QUIZ.map((q, qIndex) => {
        const selected = selectedAnswers[q.id]
        const evalResult = evaluation?.results?.find((r) => r.questionId === q.id)

        return (
          <Card key={q.id} className="border shadow-xs">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">
                Question {qIndex + 1}: {q.text}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {q.options.map((option, optIdx) => {
                const isSelected = selected === optIdx
                let optionStyle = 'border-input hover:bg-accent'

                if (submitted && evalResult) {
                  if (optIdx === q.correctIndex) {
                    optionStyle = 'border-green-500 bg-green-50 dark:bg-green-950/30'
                  } else if (isSelected && !evalResult.isCorrect) {
                    optionStyle = 'border-destructive bg-red-50 dark:bg-red-950/30'
                  }
                } else if (isSelected) {
                  optionStyle = 'border-primary bg-primary/5 text-primary'
                }

                return (
                  <div
                    key={optIdx}
                    onClick={() => handleSelect(q.id, optIdx)}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer text-sm transition-all ${optionStyle}`}
                  >
                    <div
                      className={`h-4 w-4 rounded-full border flex items-center justify-center text-[10px] ${
                        isSelected ? 'border-primary bg-primary text-white' : 'border-muted-foreground'
                      }`}
                    >
                      {String.fromCharCode(65 + optIdx)}
                    </div>
                    <span>{option}</span>
                  </div>
                )
              })}

              {submitted && evalResult && (
                <div className="mt-3 p-3 rounded-lg bg-muted text-xs leading-relaxed">
                  <div className="flex items-center gap-1 font-semibold mb-1">
                    {evalResult.isCorrect ? (
                      <span className="text-green-600 flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Correct
                      </span>
                    ) : (
                      <span className="text-destructive flex items-center gap-1">
                        <XCircle className="h-3.5 w-3.5" /> Incorrect
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground">{evalResult.explanation}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}

      {!submitted ? (
        <Button
          onClick={handleSubmit}
          className="w-full"
          disabled={loading || Object.keys(selectedAnswers).length < MODULE_1_QUIZ.length}
        >
          {loading ? 'Submitting & Evaluating...' : 'Submit Assessment'}
        </Button>
      ) : (
        <div className="p-6 rounded-xl border bg-card space-y-4 text-center">
          <div className="flex justify-center">
            {evaluation?.isPassed ? (
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <CheckCircle2 className="h-7 w-7" />
              </div>
            ) : (
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center text-destructive">
                <XCircle className="h-7 w-7" />
              </div>
            )}
          </div>
          <div>
            <h3 className="text-xl font-bold">
              {evaluation?.isPassed ? 'Assessment Passed!' : 'Need More Practice'}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              You scored {evaluation?.score} of {evaluation?.totalQuestions} ({evaluation?.percentage}%)
            </p>
          </div>

          {certificate && (
            <div className="p-4 rounded-xl border border-green-500/30 bg-green-50 dark:bg-green-950/20 text-left space-y-2">
              <div className="flex items-center gap-2 text-green-700 dark:text-green-300 font-bold">
                <Award className="h-5 w-5" />
                <span>Certificate Issued: {certificate.certificateNumber}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Congratulations on demonstrating perfect competency! Your completion certificate has been generated.
              </p>
              <a
                href={certificate.verificationUrl}
                target="_blank"
                className="inline-flex items-center gap-1 text-xs text-primary font-semibold hover:underline"
              >
                View Public Verification Page <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          )}

          <div className="flex justify-center gap-3">
            <Button variant="outline" size="sm" onClick={handleReset} className="gap-1.5">
              <RotateCcw className="h-4 w-4" /> Retake Assessment
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
