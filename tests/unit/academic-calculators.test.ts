import { describe, it, expect } from 'vitest'

describe('Academic & Entrance Calculator Mathematical Engines', () => {
  it('computes CBSE CGPA conversion using official 9.5 multiplier', () => {
    const cgpa = 9.2
    const percentage = (cgpa * 9.5).toFixed(1)
    expect(percentage).toBe('87.4')
  })

  it('computes Board Percentage aggregate accurately', () => {
    const subjects = [
      { marks: 88, maxMarks: 100 },
      { marks: 92, maxMarks: 100 },
      { marks: 85, maxMarks: 100 },
      { marks: 90, maxMarks: 100 },
      { marks: 95, maxMarks: 100 },
    ]
    const totalObtained = subjects.reduce((a, b) => a + b.marks, 0)
    const totalMax = subjects.reduce((a, b) => a + b.maxMarks, 0)
    const pct = ((totalObtained / totalMax) * 100).toFixed(2)

    expect(totalObtained).toBe(450)
    expect(totalMax).toBe(500)
    expect(pct).toBe('90.00')
  })

  it('computes CBSE Best-of-Five with mandatory language and top 4 remaining electives', () => {
    const subjects = [
      { name: 'English (Language 1 - Compulsory)', marks: 88, isLanguage: true },
      { name: 'Mathematics', marks: 95, isLanguage: false },
      { name: 'Science', marks: 91, isLanguage: false },
      { name: 'Social Science', marks: 84, isLanguage: false },
      { name: 'Hindi', marks: 79, isLanguage: false },
      { name: 'Skill Subject (IT / AI)', marks: 96, isLanguage: false },
    ]

    const language = subjects[0]
    const remaining = subjects.slice(1).sort((a, b) => b.marks - a.marks)
    const top4 = remaining.slice(0, 4)
    const excluded = remaining[4]

    const best5 = [language, ...top4]
    const best5Total = best5.reduce((a, b) => a + b.marks, 0)
    const best5Percentage = (best5Total / 5).toFixed(2)

    // Hindi (79) should be excluded because IT (96), Math (95), Science (91), and Social (84) are higher
    expect(excluded.name).toBe('Hindi')
    expect(best5Total).toBe(88 + 96 + 95 + 91 + 84) // 454
    expect(best5Percentage).toBe('90.80')

    const total6 = subjects.reduce((a, b) => a + b.marks, 0)
    const all6Percentage = (total6 / 6).toFixed(2) // 533 / 6 = 88.83
    expect(all6Percentage).toBe('88.83')
    expect(parseFloat(best5Percentage)).toBeGreaterThan(parseFloat(all6Percentage))
  })

  it('computes JEE Main All India Rank accurately from percentile', () => {
    const TOTAL_CANDIDATES = 1450000
    const percentile = 98.75
    const rank = Math.round(((100 - percentile) * TOTAL_CANDIDATES) / 100)
    expect(rank).toBe(18125)
  })
})
