import { describe, it, expect } from 'vitest'
import { cn, formatCurrency, truncate, calculateInstalmentSchedule } from '@/lib/utils'

describe('cn (classname merge)', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('handles tailwind conflicts correctly', () => {
    expect(cn('p-4', 'p-6')).toBe('p-6')
  })

  it('handles conditional classes', () => {
    expect(cn('base', false && 'excluded', 'included')).toBe('base included')
  })
})

describe('formatCurrency', () => {
  it('formats INR correctly', () => {
    const result = formatCurrency(29999)
    expect(result).toContain('29,999')
  })

  it('formats zero correctly', () => {
    const result = formatCurrency(0)
    expect(result).toContain('0')
  })
})

describe('truncate', () => {
  it('returns text unchanged when shorter than limit', () => {
    expect(truncate('hello', 10)).toBe('hello')
  })

  it('truncates and adds ellipsis when over limit', () => {
    expect(truncate('hello world', 5)).toBe('hello...')
  })

  it('returns text unchanged at exact limit', () => {
    expect(truncate('hello', 5)).toBe('hello')
  })
})

describe('calculateInstalmentSchedule', () => {
  it('generates correct number of payments', () => {
    const schedule = calculateInstalmentSchedule({
      upfrontAmount: 29999,
      monthlyAmount: 1500,
      instalmentMonths: 8,
    })
    // 1 upfront + 8 monthly = 9 total
    expect(schedule).toHaveLength(9)
  })

  it('first payment is upfront', () => {
    const schedule = calculateInstalmentSchedule({
      upfrontAmount: 29999,
      monthlyAmount: 1500,
      instalmentMonths: 8,
    })
    expect(schedule[0].type).toBe('upfront')
    expect(schedule[0].amount).toBe(29999)
  })

  it('monthly payments have correct amount', () => {
    const schedule = calculateInstalmentSchedule({
      upfrontAmount: 29999,
      monthlyAmount: 1500,
      instalmentMonths: 8,
    })
    const monthlyPayments = schedule.filter((p) => p.type === 'instalment')
    expect(monthlyPayments).toHaveLength(8)
    monthlyPayments.forEach((p) => {
      expect(p.amount).toBe(1500)
    })
  })

  it('total value is correct', () => {
    const schedule = calculateInstalmentSchedule({
      upfrontAmount: 29999,
      monthlyAmount: 1500,
      instalmentMonths: 8,
    })
    const total = schedule.reduce((sum, p) => sum + p.amount, 0)
    expect(total).toBe(29999 + 1500 * 8) // 41999
  })
})
