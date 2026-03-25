// 🔐 Auth Hook - FSD Migration
// ✅ Authentication state management

import { useState, useCallback, useEffect } from 'react'
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

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

// ✅ Mock auth data
const MOCK_USERS = {
  'admin@gts.com': {
    id: '1',
    email: 'admin@gts.com',
    role: 'executive' as UserRole,
    profile: {
      firstName: 'Александр',
      lastName: 'Петров',
      phone: '+7 (900) 123-45-67',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  },
  'partner@gts.com': {
    id: '2',
    email: 'partner@gts.com',
    role: 'partner' as UserRole,
    profile: {
      firstName: 'Елена',
      lastName: 'Иванова',
      phone: '+7 (900) 987-65-43'
    },
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-20')
  }
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null
  })

  // ✅ Initialize auth state
  useEffect(() => {
    try {
      // ✅ Check for stored auth
      const storedUser = localStorage.getItem('gts-user')
      if (storedUser) {
        const user = JSON.parse(storedUser)
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null
        })
      } else {
        setAuthState(prev => ({
          ...prev,
          isLoading: false
        }))
      }
    } catch (error) {
      console.error('Auth initialization error:', error)
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: 'Ошибка инициализации аутентификации'
      })
    }
  }, [])

  // ✅ Login function
  const login = useCallback(async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }))
    
    try {
      // ✅ Mock authentication
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const user = MOCK_USERS[email as keyof typeof MOCK_USERS]
      
      if (!user || password !== 'demo123') {
        throw new Error('Неверный email или пароль')
      }

      // ✅ Store auth state
      localStorage.setItem('gts-user', JSON.stringify(user))
      
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null
      })

      return user
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка входа'
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: errorMessage
      })
      throw error
    }
  }, [])

  // ✅ Logout function
  const logout = useCallback(() => {
    localStorage.removeItem('gts-user')
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null
    })
  }, [])

  // ✅ Clear error
  const clearError = useCallback(() => {
    setAuthState(prev => ({ ...prev, error: null }))
  }, [])

  return {
    ...authState,
    login,
    logout,
    clearError
  }
}