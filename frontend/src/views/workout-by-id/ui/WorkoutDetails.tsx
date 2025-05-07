'use client'
import { FC } from 'react'

import { WorkoutSession } from '@/entities/workout/model/workout.types'
import { formatDate, useTranslation } from '@/shared/lib'
import SetsTable from '@/widgets/SetsTable/ui/SetsTable'
import WorkoutNote from '@/widgets/SetsTable/ui/WorkoutNote'

import { WorkoutInfoCard } from './WorkoutInfoCard'
interface WorkoutDetailsProps {
  exerciseData: WorkoutSession
}

export const WorkoutDetails: FC<WorkoutDetailsProps> = ({ exerciseData }) => {
  const t = useTranslation()

  return (
    <>
      <WorkoutInfoCard exerciseData={exerciseData} />

      {exerciseData?.sets && <SetsTable sets={exerciseData.sets} />}
      {exerciseData?.note && <WorkoutNote note={exerciseData.note} />}
    </>
  )
}
