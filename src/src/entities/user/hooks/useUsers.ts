// 👥 Users List Hook
// ✅ Multiple users management

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { User, CreateUser } from '../model'
import { UserRole } from '@/shared/lib/constants'

// ✅ Mock users list
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
  },
  {
    id: '3',
    email: 'client@gts.com',
    role: 'client',
    profile: {
      firstName: 'Михаил',
      lastName: 'Сидоров',
      phone: '+7 (900) 555-11-22'
    },
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-18')
  },
  {
    id: '4',
    email: 'crew@gts.com',
    role: 'crew',
    profile: {
      firstName: 'Андрей',
      lastName: 'Козлов',
      phone: '+7 (900) 333-44-55'
    },
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-22')
  }
]

interface UseUsersOptions {
  role?: UserRole
  search?: string
  limit?: number
}

// ✅ Users list hook
export function useUsers(options: UseUsersOptions = {}) {
  return useQuery({
    queryKey: ['users', options],
    queryFn: async () => {
      // ✅ Mock API call with filtering
      await new Promise(resolve => setTimeout(resolve, 600))
      
      let filteredUsers = [...MOCK_USERS]
      
      // Filter by role
      if (options.role) {
        filteredUsers = filteredUsers.filter(user => user.role === options.role)
      }
      
      // Filter by search
      if (options.search) {
        const search = options.search.toLowerCase()
        filteredUsers = filteredUsers.filter(user => 
          user.profile.firstName.toLowerCase().includes(search) ||
          user.profile.lastName.toLowerCase().includes(search) ||
          user.email.toLowerCase().includes(search)
        )
      }
      
      // Limit results
      if (options.limit) {
        filteredUsers = filteredUsers.slice(0, options.limit)
      }
      
      return {
        users: filteredUsers,
        total: filteredUsers.length,
        hasMore: false
      }
    }
  })
}

// ✅ Create user hook
export function useCreateUser() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (data: CreateUser) => {
      // ✅ Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newUser: User = {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date(),
        updatedAt: new Date()
      }
      
      MOCK_USERS.push(newUser)
      return newUser
    },
    onSuccess: () => {
      // ✅ Invalidate users list
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })
}

// ✅ Delete user hook
export function useDeleteUser() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (userId: string) => {
      // ✅ Mock API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const userIndex = MOCK_USERS.findIndex(u => u.id === userId)
      if (userIndex === -1) throw new Error('User not found')
      
      MOCK_USERS.splice(userIndex, 1)
      return userId
    },
    onSuccess: (userId) => {
      // ✅ Remove from cache
      queryClient.removeQueries({ queryKey: ['user', userId] })
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })
}