// 👤 User Hooks - Entity layer
// ✅ User data management hooks

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { User, CreateUser, UpdateUser } from '../model'

// ✅ Mock data для frontend-only архитектуры
const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'admin@gts.com',
    role: 'executive',
    profile: {
      firstName: 'Александр',
      lastName: 'Петров',
      phone: '+7 (900) 123-45-67',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    email: 'partner@gts.com',
    role: 'partner',
    profile: {
      firstName: 'Елена',
      lastName: 'Иванова',
      phone: '+7 (900) 987-65-43'
    },
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-20')
  }
]

// ✅ Single user hook
export function useUser(userId: string) {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      // ✅ Mock API call
      await new Promise(resolve => setTimeout(resolve, 500))
      const user = MOCK_USERS.find(u => u.id === userId)
      if (!user) throw new Error('User not found')
      return user
    },
    enabled: !!userId
  })
}

// ✅ Current user hook
export function useCurrentUser() {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      // ✅ Mock current user (обычно из auth context)
      await new Promise(resolve => setTimeout(resolve, 300))
      return MOCK_USERS[0] // Admin user
    }
  })
}

// ✅ Update user hook
export function useUpdateUser() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ userId, data }: { userId: string; data: UpdateUser }) => {
      // ✅ Mock API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const userIndex = MOCK_USERS.findIndex(u => u.id === userId)
      if (userIndex === -1) throw new Error('User not found')
      
      const updatedUser = {
        ...MOCK_USERS[userIndex],
        ...data,
        updatedAt: new Date()
      }
      
      MOCK_USERS[userIndex] = updatedUser
      return updatedUser
    },
    onSuccess: (data, variables) => {
      // ✅ Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ['user', variables.userId] })
      queryClient.invalidateQueries({ queryKey: ['users'] })
      if (variables.userId === MOCK_USERS[0].id) {
        queryClient.invalidateQueries({ queryKey: ['currentUser'] })
      }
    }
  })
}