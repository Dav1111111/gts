// 🧭 Navigation Types
// ✅ TypeScript определения для navigation feature

import { UserRole } from '@/shared/lib/constants'

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