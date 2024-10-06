'use client'

import React from 'react'

import { X } from 'lucide-react'
import { toast } from 'sonner'

import { useDeleteSet } from '@/features/workout/model'
import { Button } from '@/shared/ui/button'

interface DeleteSetProps {
  setId: number
}

const DeleteSetButton: React.FC<DeleteSetProps> = ({ setId }) => {
  const deleteSetMutation = useDeleteSet()

  const handleDelete = () => {
    deleteSetMutation.mutate(
      { setId },
      {
        onError(error) {
          toast.error(error.message)
        },
      },
    )
  }

  return (
    <Button variant="destructive" size="icon" onClick={handleDelete}>
      <X className="size-6" />
    </Button>
  )
}

export default DeleteSetButton
