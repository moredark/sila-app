'use client'

import { Plan } from '@/entities/plan/model'

import { PlanCard } from './PlanCard'

interface PlansGridProps {
  plans: Plan[]
  onDeletePlan: (plan: Plan) => void
}

export const PlansGrid = ({ plans, onDeletePlan }: PlansGridProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {plans.map(plan => (
        <PlanCard key={plan.id} plan={plan} onDelete={onDeletePlan} />
      ))}
    </div>
  )
}