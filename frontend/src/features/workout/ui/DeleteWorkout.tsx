'use client'

import { FC, useState } from 'react'

import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { useDeleteWorkout } from '@/features/workout/model'
import { APP_ROUTES } from '@/shared/config'
import { useTranslation } from '@/shared/lib'
import { Button } from '@/shared/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog'

interface DeleteWorkoutProps {
  workoutId: number
}

const DeleteWorkout: FC<DeleteWorkoutProps> = ({ workoutId }) => {
  const t = useTranslation()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const deleteWorkoutMutation = useDeleteWorkout()

  const handleDelete = () => {
    deleteWorkoutMutation.mutate(
      { workoutId },
      {
        onSuccess: () => {
          toast.success(t('workout-deleted'))
          router.push(APP_ROUTES.WORKOUT)
          setOpen(false)
        },
        onError: () => {
          toast.error(t('workout-delete-failed'))
        },
      },
    )
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon" className="p-2">
            <X color="#731b1b" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('confirm-deletion')}</DialogTitle>
            <DialogDescription>{t('confirm-deletion-message')}</DialogDescription>
          </DialogHeader>
          <div className="flex gap-6">
            <Button className="w-full" variant="outline" onClick={() => setOpen(false)}>
              {t('cancel')}
            </Button>
            <Button className="w-full" variant="destructive" onClick={handleDelete}>
              {t('delete')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default DeleteWorkout
