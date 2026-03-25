// 🔐 Auth Provider - FSD Migration
// ✅ React Context для authentication state

'use client'

import React, { createContext, useContext } from 'react'
import { useAuth } from '../hooks/useAuth'
// ✅ Temporary type definitions to avoid circular imports during migration
type UserRole = 'executive' | 'partner' | 'client' | 'crew' | 'contractor'

interface User {
  id: string
  email: string
  role: UserRole
  profile: {
    firstName: string
    lastName: string
    phone?: string
    avatar?: string
  }
  createdAt: Date
  updatedAt: Date
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<User>
  logout: () => void
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth()

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

// ✅ Hook для использования auth context
export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}