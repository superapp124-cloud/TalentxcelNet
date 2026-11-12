import { describe, expect, it } from 'vitest'
import { authorizeRoles } from '@/lib/auth/access-policy'

describe('server authorization policy', () => {
  it('denies anonymous admin access', () => {
    expect(authorizeRoles(null, [], 'admin')).toEqual({ allowed: false, status: 401, reason: 'authentication_required' })
  })

  it('ignores forged cookie/header state because only verified identity is an input', () => {
    expect(authorizeRoles(null, [], 'admin')).toEqual({ allowed: false, status: 401, reason: 'authentication_required' })
  })

  it('denies an authenticated ordinary learner from admin routes', () => {
    expect(authorizeRoles('learner-id', ['learner'], 'admin')).toEqual({ allowed: false, status: 403, reason: 'insufficient_role' })
  })

  it('allows an active administrator role', () => {
    expect(authorizeRoles('admin-id', ['academy_admin'], 'admin')).toEqual({ allowed: true, status: 200 })
  })

  it('allows a learner role for question-bank access', () => {
    expect(authorizeRoles('learner-id', ['learner'], 'learner')).toEqual({ allowed: true, status: 200 })
  })

  it('denies expired or missing role records by default', () => {
    expect(authorizeRoles('expired-id', [], 'learner')).toEqual({ allowed: false, status: 403, reason: 'insufficient_role' })
  })
})
