'use client'

import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Plan } from '@/entities/plan/model'
import { APP_ROUTES } from '@/shared/config'
import { useTranslation } from '@/shared/lib'
import { Button } from '@/shared/ui'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'

interface PlanCardProps {
  plan: Plan
  onDelete: (plan: Plan) => void
}

export const PlanCard = ({ plan, onDelete }: PlanCardProps) => {
  const router = useRouter()
  const t = useTranslation()

  return (
    <Card className='relative'>
      <div onClick={() => router.push(APP_ROUTES.PLAN.DETAIL(plan.id!))} className="cursor-pointer">
        <CardHeader>
          <CardTitle>{plan.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{plan.description}</p>
        </CardContent>
      </div>
      <div className="absolute right-2 top-2">
        <Button variant="outline" size="icon" className="p-2" onClick={() => onDelete(plan)}>
          <X color="#731b1b" />
        </Button>
      </div>
    </Card>
  )
}