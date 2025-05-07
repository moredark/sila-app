'use client'
import { FC } from 'react'

import { WorkoutSession } from '@/entities/workout/model/workout.types'
import { formatDate, useTranslation } from '@/shared/lib'
import { Badge } from '@/shared/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import SetsTable from '@/widgets/SetsTable/ui/SetsTable'
import WorkoutNote from '@/widgets/SetsTable/ui/WorkoutNote'

interface WorkoutDetailsProps {
  exerciseData: WorkoutSession
}

export const WorkoutDetails: FC<WorkoutDetailsProps> = ({ exerciseData }) => {
  const t = useTranslation()

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{exerciseData.exercise.name}</CardTitle>
          <CardDescription>{exerciseData.exercise.muscle_group.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span>{formatDate(exerciseData.created_at)}</span>
            <Badge>{exerciseData.is_completed ? t('completed') : t('not_completed')}</Badge>
          </div>
        </CardContent>
      </Card>
      {exerciseData.sets && <SetsTable sets={exerciseData.sets} />}
      {exerciseData?.note && <WorkoutNote note={exerciseData.note} />}
    </>
  )
}
