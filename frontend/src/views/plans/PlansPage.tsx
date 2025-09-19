'use client'

import { useState } from 'react'

import { toast } from 'sonner'

import { useGetPlans, useDeletePlan } from '@/entities/plan/api'
import { Plan } from '@/entities/plan/model'
import { CreatePlanForm } from '@/features/plan/ui'
import { useTranslation } from '@/shared/lib'
import { Button } from '@/shared/ui'
import { Drawer, DrawerContent, DrawerTrigger } from '@/shared/ui/drawer'
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '@/shared/ui/pagination'
import { Skeleton } from '@/shared/ui/skeleton'

import { DeletePlanDialog, PlansGrid } from './components'

export const PlansPage = () => {
  const t = useTranslation()
  const [page, setPage] = useState(1)
  const { data: plansData, isLoading } = useGetPlans(page, 10)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const { mutateAsync: deletePlan } = useDeletePlan()
  const [planToDelete, setPlanToDelete] = useState<Plan | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const plans = plansData?.data?.items as Plan[] | undefined
  const totalPages = plansData?.data?.total ? Math.ceil(plansData.data.total / 10) : 1

  const handlePlanCreated = () => {
    setIsDrawerOpen(false)
  }

  const handleDeletePlan = async () => {
    if (planToDelete) {
      await deletePlan(planToDelete.id!)
      toast.success(t('plan-deleted-successfully'))
      setPlanToDelete(null)
      setIsDeleteDialogOpen(false)
    }
  }

  const handleDeleteClick = (plan: Plan) => {
    setPlanToDelete(plan)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteDialogChange = (open: boolean) => {
    setIsDeleteDialogOpen(open)
    if (!open) setPlanToDelete(null)
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('plans')}</h1>
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerTrigger asChild>
            <Button>{t('create-plan')}</Button>
          </DrawerTrigger>
          <DrawerContent>
            <CreatePlanForm onSuccess={handlePlanCreated} />
          </DrawerContent>
        </Drawer>
      </div>

      {isLoading && (
        <div className="grid gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      )}

      {plans && <PlansGrid plans={plans} onDeletePlan={handleDeleteClick} />}

      <DeletePlanDialog
        plan={planToDelete}
        open={isDeleteDialogOpen}
        onOpenChange={handleDeleteDialogChange}
        onConfirm={handleDeletePlan}
      />

      {totalPages > 1 && (
        <Pagination className="mt-2">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => setPage(p => Math.max(p - 1, 1))} />
            </PaginationItem>
            <PaginationItem>{page}</PaginationItem>
            <PaginationItem>
              <PaginationNext onClick={() => setPage(p => (p < totalPages ? p + 1 : p))} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
