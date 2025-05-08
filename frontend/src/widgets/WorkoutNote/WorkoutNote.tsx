import React, { FC } from 'react'

import { useTranslation } from '@/shared/lib'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'

interface Props {
  note: string
}

export const WorkoutNote: FC<Props> = ({ note }) => {
  const t = useTranslation()

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('note')}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{note}</p>
      </CardContent>
    </Card>
  )
}
