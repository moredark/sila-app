import { FC } from 'react'

import { useTranslation } from '@/shared/lib'
import { CardContent } from '@/shared/ui/card'
import { Skeleton } from '@/shared/ui/skeleton'

interface ProfileDetailsProps {
  fitnessLevel: string | undefined
  joinedDate: string
  bio: string | undefined
  isLoading?: boolean
}

export const ProfileDetails: FC<ProfileDetailsProps> = ({
  fitnessLevel,
  joinedDate,
  bio,
  isLoading = false,
}) => {
  const t = useTranslation()

  if (isLoading) {
    return (
      <CardContent className="mt-4 space-y-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">{t('fitness-level')}:</span>
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">{t('joined')}:</span>
          <Skeleton className="h-4 w-32" />
        </div>
      </CardContent>
    )
  }

  return (
    <CardContent className="mt-4 space-y-4">
      <div className="flex justify-between">
        <span className="text-muted-foreground">{t('fitness-level')}:</span>
        <span>{fitnessLevel}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">{t('joined')}:</span>
        <span>{joinedDate}</span>
      </div>
      {bio && (
        <div>
          <h3 className="font-semibold">{t('bio')}</h3>
          <p className="text-sm">{bio}</p>
        </div>
      )}
    </CardContent>
  )
}
