import { canAccessAcademy, isAdmin } from '@/lib/auth/permissions'
import type { UserRole } from '@/types/database'

export type AuthorizationResult =
  | { allowed: true; status: 200 }
  | { allowed: false; status: 401 | 403; reason: 'authentication_required' | 'insufficient_role' }

export function authorizeRoles(
  authenticatedUserId: string | null,
  roles: UserRole[],
  requiredAccess: 'admin' | 'learner'
): AuthorizationResult {
  if (!authenticatedUserId) {
    return { allowed: false, status: 401, reason: 'authentication_required' }
  }

  const allowed = requiredAccess === 'admin'
    ? roles.some((role) => isAdmin(role))
    : roles.some((role) => canAccessAcademy(role))

  return allowed
    ? { allowed: true, status: 200 }
    : { allowed: false, status: 403, reason: 'insufficient_role' }
}
