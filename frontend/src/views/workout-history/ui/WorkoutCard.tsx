import { WorkoutSession } from '@/entities/workout/model/workout.types'
import { calculateAverageWeight, useTranslation } from '@/shared/lib'
import { formatDate } from '@/shared/lib/formatDate'
import { Card, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'

type WorkoutCardProps = {
  workout: WorkoutSession
  onClick: () => void
}

export const WorkoutCard = ({ workout, onClick }: WorkoutCardProps) => {
  const { t } = useTranslation()

  return (
    <Card className="grid cursor-pointer gap-4 p-4" onClick={onClick}>
      <CardHeader className="p-0">
        <CardTitle className="text-lg">
          {t('sets')}: {workout?.sets?.length}
        </CardTitle>
        <CardTitle className="text-base">
          {t('avg-weight')}: {workout.sets ? calculateAverageWeight(workout?.sets) : 0}
        </CardTitle>
        <CardDescription>{formatDate(workout?.created_at)}</CardDescription>
      </CardHeader>
    </Card>
  )
}
