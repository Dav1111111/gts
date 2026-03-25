// 👤 User Card Component
// ✅ User UI representation

import { Card, CardContent, CardHeader } from '@/shared/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { Badge } from '@/shared/ui/badge'
import { User } from '../model'
import { UserModel } from '../model'

interface UserCardProps {
  user: User
  className?: string
  showRole?: boolean
  onClick?: () => void
}

export function UserCard({ user, className, showRole = true, onClick }: UserCardProps) {
  const userModel = new UserModel(user)

  const roleVariants = {
    executive: 'destructive',
    partner: 'secondary', 
    client: 'outline',
    crew: 'default',
    contractor: 'default'
  } as const

  return (
    <Card 
      className={`cursor-pointer hover:shadow-md transition-shadow ${className}`}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.profile.avatar} alt={userModel.fullName} />
            <AvatarFallback>{userModel.initials}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-medium truncate">{userModel.fullName}</h3>
            <p className="text-sm text-muted-foreground truncate">{user.email}</p>
          </div>
          
          {showRole && (
            <Badge variant={roleVariants[user.role]}>
              {user.role}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      {user.profile.phone && (
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground">
            📞 {user.profile.phone}
          </p>
        </CardContent>
      )}
    </Card>
  )
}