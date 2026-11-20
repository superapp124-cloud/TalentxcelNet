import { describe, it, expect } from 'vitest'
import { SAMPLE_PARENT_REPORT } from '@/lib/academic/class-9-master-data'

describe('Sunday Parent Intelligence Cockpit', () => {
  it('should include key transparency metrics in the parent report data', () => {
    expect(SAMPLE_PARENT_REPORT.attendanceRate).toBeGreaterThanOrEqual(90)
    expect(SAMPLE_PARENT_REPORT.activeProblemSolvingMinutes).toBeGreaterThan(0)
    expect(SAMPLE_PARENT_REPORT.masteredSkills.length).toBeGreaterThan(0)
    expect(SAMPLE_PARENT_REPORT.activeGapsUnderRevision.length).toBeGreaterThan(0)
  })

  it('should include actionable dinner conversation guidance and mentor notes', () => {
    expect(SAMPLE_PARENT_REPORT.mentorNote).toBeTruthy()
    expect(SAMPLE_PARENT_REPORT.parentDiscussionPrompt).toBeTruthy()
    expect(SAMPLE_PARENT_REPORT.parentDiscussionPrompt).toContain('?')
  })

  it('should generate properly formatted WhatsApp dispatch message', () => {
    const studentName = 'Aarav Sharma'
    const weekStartDate = '2026-11-17'
    const weekEndDate = '2026-11-23'
    const activeStudyDays = 5
    const verifiedConceptsCount = 8
    const examReadinessScore = 84
    const token = 'test-token-1234'
    const shareUrl = `https://talentxcel.net/parent-report/${token}`

    const whatsAppText = `📊 *SUNDAY ACADEMIC INTELLIGENCE BRIEFING*\n` +
      `🎓 Learner: *${studentName}* | Class 9 CBSE Foundation\n` +
      `📅 Week: *${weekStartDate} to ${weekEndDate}*\n\n` +
      `✅ *Weekly Academic Highlights:*\n` +
      `• Active Study Days: *${activeStudyDays} of 7 days*\n` +
      `• Verified Concepts Mastered: *${verifiedConceptsCount} concepts (>85% exam timer)*\n` +
      `• Exam Readiness Trajectory: *${examReadinessScore}% (+6% this week)*\n\n` +
      `🔗 *View Full Verified Audit Report Online:*\n${shareUrl}`

    expect(whatsAppText).toContain('*SUNDAY ACADEMIC INTELLIGENCE BRIEFING*')
    expect(whatsAppText).toContain('Aarav Sharma')
    expect(whatsAppText).toContain('5 of 7 days')
    expect(whatsAppText).toContain('https://talentxcel.net/parent-report/test-token-1234')

    const encoded = encodeURIComponent(whatsAppText)
    expect(encoded).toContain('https%3A%2F%2Ftalentxcel.net')
  })
})
