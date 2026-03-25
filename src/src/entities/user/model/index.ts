// 👤 User Model
// ✅ User domain model согласно rules.json

export { 
  User, 
  CreateUser, 
  UpdateUser, 
  UserSchema, 
  CreateUserSchema, 
  UpdateUserSchema,
  type UserRole
} from '@/shared/lib/validation'

// ✅ User business logic
export class UserModel {
  constructor(private user: User) {}

  get id() { return this.user.id }
  get email() { return this.user.email }
  get role() { return this.user.role }
  get fullName() {
    return `${this.user.profile.firstName} ${this.user.profile.lastName}`
  }
  
  get initials() {
    return `${this.user.profile.firstName[0]}${this.user.profile.lastName[0]}`.toUpperCase()
  }

  isExecutive() {
    return this.user.role === 'executive'
  }

  isPartner() {
    return this.user.role === 'partner'
  }

  isClient() {
    return this.user.role === 'client'
  }

  isCrew() {
    return this.user.role === 'crew'
  }

  hasRole(role: UserRole) {
    return this.user.role === role
  }

  toJSON() {
    return this.user
  }
}