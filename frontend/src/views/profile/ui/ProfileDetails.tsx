import { FC } from 'react'

import { useTranslation } from '@/shared/lib'
import { CardContent } from '@/shared/ui/card'

interface ProfileDetailsProps {
  fitnessLevel: string | undefined
  joinedDate: string
  bio: string | undefined
}

export const ProfileDetails: FC<ProfileDetailsProps> = ({
  fitnessLevel,
  joinedDate,
  bio,
}) => {
  const { t } = useTranslation()

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
