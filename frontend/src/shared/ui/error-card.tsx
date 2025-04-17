import { FC } from 'react'

import { Card } from '@/shared/ui/card'

interface ErrorCardProps {
  message: string
  className?: string
}

export const ErrorCard: FC<ErrorCardProps> = ({ message, className = '' }) => {
  return (
    <Card className={`border-destructive bg-destructive/10 p-6 ${className}`}>
      <p className="text-center text-sm text-destructive">{message}</p>
    </Card>
  )
} 