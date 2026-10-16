import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges Tailwind CSS class names with clsx and tailwind-merge.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a numeric amount as currency (default INR).
 */
export function formatCurrency(amount: number, currency = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Formats a date string or Date object into human-readable Indian English date.
 */
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}

/**
 * Truncates a string to the specified character limit, appending an ellipsis.
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}

/**
 * Generates a URL-friendly slug from text.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Generates a unique order reference number.
 */
export function generateOrderNumber(): string {
  const prefix = 'TX'
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `${prefix}-${timestamp}-${random}`
}

/**
 * Generates a unique certificate credential number.
 */
export function generateCertificateNumber(): string {
  const prefix = 'TXCERT'
  const year = new Date().getFullYear()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `${prefix}-${year}-${random}`
}

/**
 * Calculates a structured payment installment schedule.
 */
export function calculateInstalmentSchedule(params: {
  upfrontAmount: number
  monthlyAmount: number
  instalmentMonths: number
  startDate?: Date
}): Array<{
  dueDate: Date
  amount: number
  type: 'upfront' | 'instalment'
  index: number
}> {
  const { upfrontAmount, monthlyAmount, instalmentMonths, startDate = new Date() } = params
  const schedule: Array<{
    dueDate: Date
    amount: number
    type: 'upfront' | 'instalment'
    index: number
  }> = []

  // Upfront payment
  schedule.push({ dueDate: startDate, amount: upfrontAmount, type: 'upfront', index: 0 })

  // Monthly instalments
  for (let i = 1; i <= instalmentMonths; i++) {
    const dueDate = new Date(startDate)
    dueDate.setMonth(dueDate.getMonth() + i)
    schedule.push({ dueDate, amount: monthlyAmount, type: 'instalment', index: i })
  }

  return schedule
}
