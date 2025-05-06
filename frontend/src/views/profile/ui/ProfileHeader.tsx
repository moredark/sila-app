import { FC } from 'react'

import { useTranslation } from '@/shared/lib'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { CardHeader, CardTitle } from '@/shared/ui/card'
import { Skeleton } from '@/shared/ui/skeleton'

interface ProfileHeaderProps {
  username: string
  email: string | undefined
  avatarUrl: string | undefined
  isLoading?: boolean
}

export const ProfileHeader: FC<ProfileHeaderProps> = ({
  username,
  email,
  avatarUrl,
  isLoading = false,
}) => {
  const t = useTranslation()

  if (isLoading) {
    return (
      <CardHeader className="flex items-center gap-4">
        <Skeleton className="size-16 rounded-full" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>
      </CardHeader>
    )
  }

  return (
    <CardHeader className="flex items-center gap-4">
      <Avatar className="size-16">
        {avatarUrl ? (
          <AvatarImage src={avatarUrl} alt={t('avatar')} />
        ) : (
          <AvatarFallback className="text-lg uppercase">
            {username ? username[0] : 'U'}
          </AvatarFallback>
        )}
      </Avatar>
      <div>
        <CardTitle className="text-center text-lg font-bold">{username || t('user')}</CardTitle>
        <p className="text-sm text-muted-foreground">{email}</p>
      </div>
    </CardHeader>
  )
}
