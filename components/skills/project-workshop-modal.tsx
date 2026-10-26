'use client'

import React, { useState } from 'react'
import {
  Briefcase,
  CheckCircle2,
  Clock,
  Sparkles,
  X,
  Send,
  ExternalLink,
  ShieldCheck,
  FileText,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { SkillProject, ClassSkillProject } from '@/packages/core/src'

interface ProjectWorkshopModalProps {
  project: SkillProject | ClassSkillProject | null
  isOpen: boolean
  onClose: () => void
  onEnrollTrack?: () => void
}

export function ProjectWorkshopModal({
  project,
  isOpen,
  onClose,
  onEnrollTrack,
}: ProjectWorkshopModalProps) {
  const [submissionUrl, setSubmissionUrl] = useState('')
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if (!isOpen || !project) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!submissionUrl.trim()) return
    setSubmitted(true)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Capstone Project Workshop
              </h3>
              <p className="text-xs text-slate-500">
                Craftsmanship &amp; Rubric-Based Evaluation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {'classNumber' in project && project.classNumber && (
                <Badge className="bg-indigo-600 text-white font-bold text-xs">
                  Class {project.classNumber}
                </Badge>
              )}
              <Badge className="bg-indigo-100 text-indigo-800 border-none font-bold text-xs">
                {project.estimatedHours} Hours Required
              </Badge>
              <Badge variant="outline" className="text-xs capitalize text-slate-600">
                Difficulty: {project.difficulty}
              </Badge>
              <Badge variant="outline" className="text-xs text-emerald-700 border-emerald-200 bg-emerald-50">
                Verified Rubric
              </Badge>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">{project.title}</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{project.brief}</p>
          </div>

          {/* Real-World Context */}
          <div className="p-4 bg-indigo-50/70 border border-indigo-200/80 rounded-2xl space-y-1">
            <h4 className="text-xs font-bold text-indigo-900 flex items-center gap-1.5 uppercase tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              Real-World Engineering Context
            </h4>
            <p className="text-xs text-indigo-950 leading-relaxed">{project.realWorldContext}</p>
          </div>

          {/* Deliverables */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Required Capstone Deliverables
            </h4>
            <ul className="space-y-2 text-xs text-slate-700">
              {project.deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Rubric Criteria Table */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Evaluation Rubric &amp; Weight Distribution
            </h4>
            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                  <tr>
                    <th className="p-3">Evaluation Criterion</th>
                    <th className="p-3 text-center">Weight</th>
                    <th className="p-3">Mastery Expectation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {project.rubricCriteria.map((rc, i) => (
                    <tr key={i} className="hover:bg-slate-50/50">
                      <td className="p-3 font-semibold text-slate-900">{rc.criterion}</td>
                      <td className="p-3 text-center font-bold text-indigo-700">{rc.weightPercentage}%</td>
                      <td className="p-3 text-slate-600">{rc.masteryDescription}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Submission Form */}
          <div className="pt-4 border-t border-slate-200 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Submit Project Deliverables for Evaluation
            </h4>

            {submitted ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-1">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="font-bold text-xs text-emerald-950">Project Submitted for Rubric Review!</p>
                <p className="text-[11px] text-emerald-800">
                  Your deliverable has been queued. You will receive asynchronous rubric feedback.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Deliverable URL (GitHub repo, Figma link, or Google Drive folder)
                  </label>
                  <input
                    type="url"
                    required
                    value={submissionUrl}
                    onChange={(e) => setSubmissionUrl(e.target.value)}
                    placeholder="https://github.com/username/project"
                    className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Notes or Reflection on Challenges Faced (optional)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Explain key design decisions or architectural hurdles overcome..."
                    className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  {onEnrollTrack ? (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        onClose()
                        onEnrollTrack()
                      }}
                      className="text-xs font-bold text-indigo-700 border-indigo-200 hover:bg-indigo-50"
                    >
                      Enroll Track (From ₹999/mo) →
                    </Button>
                  ) : (
                    <span />
                  )}

                  <Button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5 mr-1.5" />
                    Submit for Review
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
