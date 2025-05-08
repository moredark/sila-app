import { FC } from 'react'

import { Exercise } from '@/entities/exercise/model'
import { Card, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'

interface ExerciseCardProps {
  exercise: Exercise
  isSelected: boolean
  onSelect: (id: number) => void
}

export const ExerciseCard: FC<ExerciseCardProps> = ({ exercise, isSelected, onSelect }) => (
  <Card
    className={`cursor-pointer bg-card p-2 ${isSelected ? 'border border-primary' : ''}`}
    onClick={() => onSelect(exercise.id)}
  >
    <CardHeader className="p-2">
      <CardTitle className="text-sm text-foreground">{exercise.name}</CardTitle>
      <CardDescription className="text-xs text-muted-foreground">
        {exercise.muscle_group.name}
      </CardDescription>
    </CardHeader>
  </Card>
)
