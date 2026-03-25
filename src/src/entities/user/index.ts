// 👤 User Entity - Public API
// ✅ Публичный API entity согласно rules.json FSD

export { User, CreateUser, UpdateUser, UserSchema, CreateUserSchema, UpdateUserSchema, UserModel } from './model'
export { UserCard, UserAvatar, UserProfile } from './ui'
export * from './hooks'
export type { UserRole } from '@/shared/lib/constants'