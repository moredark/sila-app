'use client'

import { Plan } from '@/entities/plan/model'
import { useTranslation } from '@/shared/lib'
import { Button } from '@/shared/ui'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/shared/ui/dialog'

interface DeletePlanDialogProps {
  plan: Plan | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export const DeletePlanDialog = ({ open, onOpenChange, onConfirm }: DeletePlanDialogProps) => {
  const t = useTranslation()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('confirm-deletion')}</DialogTitle>
          <DialogDescription>
            {t('confirm-plan-deletion-message')}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>{t('cancel')}</Button>
          <Button variant="destructive" onClick={onConfirm}>{t('delete')}</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}