import { describe, it, expect } from 'vitest'
import {
  hasRoleOrAbove,
  isAdmin,
  canManageProgrammes,
  canManageLeads,
  canViewFinancials,
  canAccessAcademy,
} from '@/lib/auth/permissions'
import type { UserRole } from '@/types/database'

describe('Role Hierarchy', () => {
  it('super_admin has highest privilege', () => {
    expect(hasRoleOrAbove('super_admin', 'academy_admin')).toBe(true)
    expect(hasRoleOrAbove('super_admin', 'learner')).toBe(true)
    expect(hasRoleOrAbove('super_admin', 'prospect')).toBe(true)
  })

  it('learner cannot access admin functions', () => {
    expect(isAdmin('learner')).toBe(false)
    expect(canManageProgrammes('learner')).toBe(false)
    expect(canManageLeads('learner')).toBe(false)
    expect(canViewFinancials('learner')).toBe(false)
  })

  it('prospect cannot access academy', () => {
    expect(canAccessAcademy('prospect')).toBe(false)
  })

  it('learner can access academy', () => {
    expect(canAccessAcademy('learner')).toBe(true)
  })

  it('admissions_counsellor can manage leads but not programmes', () => {
    expect(canManageLeads('admissions_counsellor')).toBe(true)
    expect(canManageProgrammes('admissions_counsellor')).toBe(false)
  })

  it('finance_ops can view financials but not manage programmes', () => {
    expect(canViewFinancials('finance_ops')).toBe(true)
    expect(canManageProgrammes('finance_ops')).toBe(false)
  })

  it('content_editor can manage programmes', () => {
    expect(canManageProgrammes('content_editor')).toBe(true)
  })

  it('privilege escalation check: lower role cannot exceed higher', () => {
    const roles: UserRole[] = ['prospect', 'learner', 'instructor', 'admissions_counsellor']
    roles.forEach((role) => {
      expect(hasRoleOrAbove(role, 'academy_admin')).toBe(false)
      expect(hasRoleOrAbove(role, 'super_admin')).toBe(false)
    })
  })
})
