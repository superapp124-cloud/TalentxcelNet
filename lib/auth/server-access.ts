import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { authorizeRoles, type AuthorizationResult } from '@/lib/auth/access-policy'
import type { UserRole } from '@/types/database'

type VerifiedUser = { id: string; email?: string | null }

export type ServerAccess = {
  user: VerifiedUser | null
  roles: UserRole[]
  authorization: AuthorizationResult
}

export async function getServerAccess(requiredAccess: 'admin' | 'learner'): Promise<ServerAccess> {
  let supabase
  try {
    supabase = await createClient()
  } catch {
    return { user: null, roles: [], authorization: authorizeRoles(null, [], requiredAccess) }
  }
  let user
  try {
    const result = await supabase.auth.getUser()
    user = result.data.user
  } catch {
    return { user: null, roles: [], authorization: authorizeRoles(null, [], requiredAccess) }
  }

  if (!user) {
    return { user: null, roles: [], authorization: authorizeRoles(null, [], requiredAccess) }
  }

  const { data: roleRows, error } = await supabase
    .from('user_roles')
    .select('role, is_active, expires_at')
    .eq('user_id', user.id)

  // A role-query failure is authorization failure. Do not fall back to claims, email, or cookies.
  const typedRoleRows = roleRows as Array<{ role: UserRole; is_active: boolean; expires_at: string | null }> | null
  const roles = error || !typedRoleRows
    ? []
    : typedRoleRows
        .filter((row) => row.is_active && (!row.expires_at || new Date(row.expires_at).getTime() > Date.now()))
        .map((row) => row.role)

  return {
    user,
    roles,
    authorization: authorizeRoles(user.id, roles, requiredAccess),
  }
}

export async function requireAdminPage(redirectTo = '/admin') {
  const access = await getServerAccess('admin')
  if (!access.authorization.allowed) {
    redirect(access.authorization.status === 401
      ? `/auth/login?redirectTo=${encodeURIComponent(redirectTo)}`
      : '/dashboard?error=forbidden')
  }
  return access
}

export async function requireLearnerPage(redirectTo: string) {
  const access = await getServerAccess('learner')
  if (!access.authorization.allowed) {
    redirect(access.authorization.status === 401
      ? `/auth/login?redirectTo=${encodeURIComponent(redirectTo)}`
      : '/dashboard?error=forbidden')
  }
  return access
}
