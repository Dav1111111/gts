// 🔐 User Permissions Hook
// ✅ RBAC permissions management для пользователей

import { useQuery } from '@tanstack/react-query'
import { ROLE_PERMISSIONS, type Permission, type UserRole } from '@/shared/lib/constants'
import { useCurrentUser } from './useUser'

// ✅ Get user permissions
export function useUserPermissions() {
  const { data: currentUser, isLoading: isUserLoading } = useCurrentUser()
  
  return useQuery({
    queryKey: ['userPermissions', currentUser?.id],
    queryFn: async () => {
      if (!currentUser) return []
      
      // ✅ Get permissions for user role
      const permissions = ROLE_PERMISSIONS[currentUser.role] || []
      return permissions
    },
    enabled: !!currentUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// ✅ Check specific permission
export function useHasPermission(permission: Permission) {
  const { data: permissions = [], isLoading } = useUserPermissions()
  
  return {
    hasPermission: permissions.includes(permission),
    isLoading
  }
}

// ✅ Check multiple permissions (all must be present)
export function useHasAllPermissions(requiredPermissions: Permission[]) {
  const { data: permissions = [], isLoading } = useUserPermissions()
  
  return {
    hasPermissions: requiredPermissions.every(permission => 
      permissions.includes(permission)
    ),
    isLoading
  }
}

// ✅ Check multiple permissions (at least one must be present)
export function useHasAnyPermission(requiredPermissions: Permission[]) {
  const { data: permissions = [], isLoading } = useUserPermissions()
  
  return {
    hasPermission: requiredPermissions.some(permission => 
      permissions.includes(permission)
    ),
    isLoading
  }
}

// ✅ Get permissions for specific role (utility)
export function useRolePermissions(role: UserRole) {
  return useQuery({
    queryKey: ['rolePermissions', role],
    queryFn: async () => {
      return ROLE_PERMISSIONS[role] || []
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

// ✅ Check if current user can access a specific module/page
export function useCanAccessModule(moduleName: string) {
  const { hasPermission, isLoading } = useHasPermission(
    `${moduleName}:read` as Permission
  )
  
  return { canAccess: hasPermission, isLoading }
}