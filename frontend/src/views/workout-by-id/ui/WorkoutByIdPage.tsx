'use client'
import { FC } from 'react'

import { useGetWorkoutById } from '@/entities/workout/model/workout.api'
import { formatDate, useTranslation } from '@/shared/lib'
import { Badge } from '@/shared/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import SetsTable from '@/widgets/SetsTable/ui/SetsTable'
import WorkoutNote from '@/widgets/SetsTable/ui/WorkoutNote'
import { UserInfo } from '@/widgets/UserInfo/ui/UserInfo'

import { WorkoutByIdSkeleton } from './WorkoutByIdSkeleton'

interface Props {
  workoutId: number
}

const WorkoutByIdPage: FC<Props> = ({ workoutId }) => {
  const t = useTranslation()
  const { data, isLoading } = useGetWorkoutById({ workout_id: workoutId })

  const exerciseData = data?.data

  if (isLoading) {
    return <WorkoutByIdSkeleton />
  }

  return (
    <div className="space-y-6 p-4">
      {exerciseData?.user && <UserInfo user={exerciseData.user} />}
      <Card>
        <CardHeader>
          <CardTitle>{exerciseData?.exercise?.name}</CardTitle>
          <CardDescription>
            {exerciseData?.exercise?.muscle_group?.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span>{formatDate(exerciseData?.created_at)}</span>
            <Badge>{exerciseData?.is_completed ? t('completed') : t('not_completed')}</Badge>
          </div>
        </CardContent>
      </Card>
      {exerciseData?.sets && <SetsTable sets={exerciseData.sets} />}
      {exerciseData?.note && <WorkoutNote note={exerciseData.note} />}
    </div>
  )
}

export default WorkoutByIdPage
