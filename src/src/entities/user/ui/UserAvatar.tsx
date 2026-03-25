// 👤 User Avatar Component

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { User } from '../model'
import { UserModel } from '../model'

interface UserAvatarProps {
  user: User
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function UserAvatar({ user, size = 'md', className }: UserAvatarProps) {
  const userModel = new UserModel(user)
  
  const sizeClasses = {
    sm: 'h-6 w-6 text-xs',
    md: 'h-8 w-8 text-sm', 
    lg: 'h-12 w-12 text-base'
  }

  return (
    <Avatar className={`${sizeClasses[size]} ${className}`}>
      <AvatarImage src={user.profile.avatar} alt={userModel.fullName} />
      <AvatarFallback>{userModel.initials}</AvatarFallback>
    </Avatar>
  )
}