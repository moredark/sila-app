'use client'

import { FC } from 'react'

import { PauseCircle, PlayCircle, RotateCcw } from 'lucide-react'

import { cn, formatTime } from '@/shared/lib'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'

interface TimerProps {
  time: number
  isRunning: boolean
  onReset: () => void
  onPauseToggle: () => void
}

export const Timer: FC<TimerProps> = ({ time, isRunning, onReset, onPauseToggle }) => {
  return (
    <Card
      className={cn(
        'pointer-events-auto relative z-50 flex items-center justify-between overflow-hidden rounded-xl p-4 shadow-lg',
        isRunning && 'border-primary/30',
      )}
    >
      <div className="pl-0.5">
        <div className="text-3xl font-bold tracking-wide">{formatTime(time)}</div>
      </div>

      <div className="flex items-center space-x-3 pr-0.5">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'h-12 w-12 rounded-full transition-all duration-200',
            isRunning && 'text-primary',
          )}
          onClick={onPauseToggle}
          aria-label={isRunning ? 'Pause timer' : 'Start timer'}
        >
          {isRunning ? <PauseCircle className="size-7" /> : <PlayCircle className="size-7" />}
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="size-10 rounded-full transition-all duration-200 hover:scale-105"
          onClick={onReset}
          aria-label="Reset timer"
        >
          <RotateCcw className="size-5" />
        </Button>
      </div>
    </Card>
  )
}
