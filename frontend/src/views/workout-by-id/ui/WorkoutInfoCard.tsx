'use client'
import { FC } from 'react'

import { useRouter } from 'next/navigation'

import { WorkoutSession } from '@/entities/workout/model/workout.types'
import { APP_ROUTES } from '@/shared/config'
import { formatDate, useTranslation } from '@/shared/lib'
import { Badge } from '@/shared/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'

interface WorkoutInfoCardProps {
  exerciseData: WorkoutSession
}

export const WorkoutInfoCard: FC<WorkoutInfoCardProps> = ({ exerciseData }) => {
  const t = useTranslation()
  const router = useRouter()

  const handleCardClick = () => {
    if (!exerciseData.is_completed) {
      router.push(APP_ROUTES.WORKOUT.DETAIL(exerciseData.id))
    }
  }

  return (
    <Card onClick={handleCardClick}>
      <CardHeader>
        <CardTitle>{exerciseData.exercise.name}</CardTitle>
        <CardDescription>{exerciseData.exercise.muscle_group.name}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span>{formatDate(exerciseData.created_at)}</span>
          <Badge variant={exerciseData.is_completed ? 'default' : 'secondary'}>
            {exerciseData.is_completed ? t('completed') : t('not_completed')}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
