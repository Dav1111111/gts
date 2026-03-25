// 🧭 Navigation Hook - FSD Migration
// ✅ Копия оригинального хука с FSD импортами

import { useState, useCallback } from 'react'
// ✅ Simplified types for migration
type UserRole = 'executive' | 'partner' | 'client' | 'crew' | 'contractor'

export interface NavigationContext {
  currentModule?: string
  breadcrumb?: string[]
  previousPage?: string
}

export interface NavigationState {
  currentPage: string
  navigationContext: NavigationContext
  userRole: UserRole | null
}

export function useNavigation() {
  const [currentPage, setCurrentPage] = useState('home')
  const [navigationContext, setNavigationContext] = useState<NavigationContext>({})
  const [userRole, setUserRole] = useState<UserRole | null>(null)

  const navigateToModule = useCallback((moduleName: string) => {
    setNavigationContext(prev => ({
      ...prev,
      currentModule: moduleName,
      breadcrumb: [...(prev.breadcrumb || []), moduleName]
    }))
  }, [])

  const handleRoleSelected = useCallback((role: UserRole) => {
    setUserRole(role)
    
    // Navigate based on role
    const roleRoutes: Record<UserRole, string> = {
      executive: 'executive-access',
      partner: 'partner-portal',
      client: 'client-club-portal', 
      crew: 'crew-app',
      contractor: 'contractor-portal'
    }
    
    const targetPage = roleRoutes[role]
    if (targetPage) {
      setCurrentPage(targetPage)
    }
  }, [])

  const goToHome = useCallback(() => {
    setCurrentPage('home')
    setNavigationContext({})
  }, [])

  const goToLogin = useCallback(() => {
    setCurrentPage('login')
    setUserRole(null)
    setNavigationContext({})
  }, [])

  return {
    currentPage,
    navigationContext,
    userRole,
    setCurrentPage,
    navigateToModule,
    handleRoleSelected,
    goToHome,
    goToLogin
  }
}