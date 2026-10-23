import type { UserRole } from '@/types/database'

// Hierarchy from highest to lowest privilege
const ROLE_HIERARCHY: Record<UserRole, number> = {
  super_admin: 12,
  academy_admin: 11,
  finance_ops: 10,
  admissions_counsellor: 9,
  content_editor: 8,
  instructor: 7,
  mentor: 6,
  support_agent: 5,
  learner: 4,
  parent_guardian: 3,
  prospect: 2,
  public: 1,
}

export const SUPER_ADMIN_EMAILS = [
  'arsh.wani@gmail.com',
  'talentxcelservices@gmail.com',
  'talentxcelservices@gmail.ocm',
  'admin@talentxcel.net',
]

export function isSuperAdminEmail(email?: string | null): boolean {
  if (!email) return false
  const normalized = email.toLowerCase().trim()
  return SUPER_ADMIN_EMAILS.some((adminEmail) => adminEmail.toLowerCase() === normalized)
}

export function hasRoleOrAbove(userRole: UserRole, requiredRole: UserRole): boolean {
  return (ROLE_HIERARCHY[userRole] ?? 0) >= (ROLE_HIERARCHY[requiredRole] ?? 0)
}

export function isAdmin(role: UserRole, email?: string | null): boolean {
  if (email && isSuperAdminEmail(email)) return true
  return role === 'academy_admin' || role === 'super_admin'
}

export function canManageProgrammes(role: UserRole): boolean {
  return isAdmin(role) || role === 'content_editor'
}

export function canManageLeads(role: UserRole): boolean {
  return isAdmin(role) || role === 'admissions_counsellor'
}

export function canViewFinancials(role: UserRole): boolean {
  return isAdmin(role) || role === 'finance_ops'
}

export function canManageSupport(role: UserRole): boolean {
  return isAdmin(role) || role === 'support_agent'
}

export function canAccessAcademy(role: UserRole): boolean {
  return hasRoleOrAbove(role, 'learner')
}

// Permission matrix for UI rendering (not a substitute for server-side checks)
export const PERMISSIONS = {
  PROGRAMME_CREATE: (role: UserRole) => canManageProgrammes(role),
  PROGRAMME_PUBLISH: (role: UserRole) => isAdmin(role),
  LEAD_VIEW: (role: UserRole) => canManageLeads(role),
  LEAD_ASSIGN: (role: UserRole) => isAdmin(role),
  ORDER_VIEW: (role: UserRole) => canViewFinancials(role),
  REFUND_APPROVE: (role: UserRole) => isAdmin(role),
  ROLE_GRANT: (role: UserRole) => role === 'super_admin',
  CERTIFICATE_ISSUE: (role: UserRole) => isAdmin(role),
  CONTENT_APPROVE: (role: UserRole) => isAdmin(role) || role === 'content_editor',
} as const
