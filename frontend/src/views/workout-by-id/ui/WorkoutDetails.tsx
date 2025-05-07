'use client'
import { FC } from 'react'

import { WorkoutSession } from '@/entities/workout/model'
import SetsTable from '@/widgets/SetsTable/ui/SetsTable'
import WorkoutNote from '@/widgets/SetsTable/ui/WorkoutNote'

import { WorkoutInfoCard } from './WorkoutInfoCard'
interface WorkoutDetailsProps {
  exerciseData: WorkoutSession
}

export const WorkoutDetails: FC<WorkoutDetailsProps> = ({ exerciseData }) => {
  return (
    <>
      <WorkoutInfoCard exerciseData={exerciseData} />

      {exerciseData?.sets && <SetsTable sets={exerciseData.sets} />}
      {exerciseData?.note && <WorkoutNote note={exerciseData.note} />}
    </>
  )
}
