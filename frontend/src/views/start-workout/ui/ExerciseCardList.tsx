import { FC } from 'react'

import { components } from '@/shared/api/schema'
import { Card, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { Skeleton } from '@/shared/ui/skeleton'

interface ExerciseCardListProps {
  exercises: components['schemas']['models.ExerciseResponse'][] | undefined
  isLoading: boolean
  selectedExerciseId: number | null
  onSelectExercise: (id: number) => void
  exercisesError: Error | null
}

export const ExerciseCardList: FC<ExerciseCardListProps> = ({
  exercises,
  isLoading,
  selectedExerciseId,
  onSelectExercise,
  exercisesError,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-2">
        {[...Array(6)].map((_, index) => (
          <Skeleton key={index} className="h-32 w-full" />
        ))}
      </div>
    )
  }

  if (exercisesError || !exercises) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-center text-sm text-red-500">{exercisesError?.message || 'Error'}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      {exercises.map(exercise => (
        <Card
          key={exercise.id}
          className={`cursor-pointer bg-card p-2 ${
            selectedExerciseId === exercise.id ? 'border border-primary' : ''
          }`}
          onClick={() => onSelectExercise(exercise.id!)}
        >
          <CardHeader className="p-2">
            <CardTitle className="text-sm text-foreground">{exercise.name}</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              {exercise.muscle_group?.name}
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}
