import { PlanDetailsPage } from '@/views/plan-details'
import { FC } from 'react'

const PlanDetails: FC<{ params: Promise<{ id: string }> }> = async ({ params }) => {
  const { id } = await params

  return <PlanDetailsPage planId={Number(id)} />
}

export default PlanDetails
