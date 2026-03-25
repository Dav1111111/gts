// 👤 User Profile Component

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { User } from '../model'
import { UserModel } from '../model'
import { UserAvatar } from './UserAvatar'

interface UserProfileProps {
  user: User
  className?: string
}

export function UserProfile({ user, className }: UserProfileProps) {
  const userModel = new UserModel(user)

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-start gap-4">
          <UserAvatar user={user} size="lg" />
          
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2">
              {userModel.fullName}
              <Badge variant="outline">{user.role}</Badge>
            </CardTitle>
            <p className="text-muted-foreground mt-1">{user.email}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {user.profile.phone && (
          <div>
            <h4 className="font-medium mb-1">Телефон</h4>
            <p className="text-muted-foreground">{user.profile.phone}</p>
          </div>
        )}
        
        <div>
          <h4 className="font-medium mb-1">Регистрация</h4>
          <p className="text-muted-foreground">
            {new Date(user.createdAt).toLocaleDateString('ru-RU')}
          </p>
        </div>
        
        <div>
          <h4 className="font-medium mb-1">Последнее обновление</h4>
          <p className="text-muted-foreground">
            {new Date(user.updatedAt).toLocaleDateString('ru-RU')}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}