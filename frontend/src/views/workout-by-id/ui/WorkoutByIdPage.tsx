'use client'
import React, { FC } from 'react'

import { useGetWorkoutById } from '@/entities/workout/model/workout.api'
import { calculateAverageWeight, formatDate, useTranslation } from '@/shared/lib'
import { Badge } from '@/shared/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { Skeleton } from '@/shared/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'

interface Props {
  workoutId: number
}

const WorkoutByIdPage: FC<Props> = ({ workoutId }) => {
  const { t } = useTranslation()
  const { data, isLoading } = useGetWorkoutById({ workout_id: workoutId })

  const exerciseData = data?.data

  if (isLoading) {
    return (
      <div className="space-y-6 p-4">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    )
  }

  return (
    <div className="space-y-6 p-4">
      <Card>
        <CardHeader>
          <CardTitle>{exerciseData?.exercise && exerciseData?.exercise.name}</CardTitle>
          <CardDescription>
            {exerciseData?.exercise?.muscle_group && exerciseData?.exercise.muscle_group.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span>{formatDate(exerciseData?.created_at)}</span>
            <Badge>{exerciseData?.is_completed ? t('completed') : t('not_completed')}</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('sets')}</CardTitle>
          <CardDescription>
            {t('avg-weight')}: {exerciseData?.sets && calculateAverageWeight(exerciseData?.sets)} kg
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('set')}</TableHead>
                <TableHead>{t('weight')}</TableHead>
                <TableHead>{t('reps')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exerciseData?.sets?.map((set, index) => (
                <TableRow key={set.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{set.weight}</TableCell>
                  <TableCell>{set.reps}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {exerciseData?.note && (
        <Card>
          <CardHeader>
            <CardTitle>{t('note')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{exerciseData?.note}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default WorkoutByIdPage
