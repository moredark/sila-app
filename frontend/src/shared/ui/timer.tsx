'use client'

import { FC, useEffect, useRef, useState } from 'react'

import { PauseCircle, PlayCircle, RotateCcw } from 'lucide-react'

import { Button } from '@/shared/ui/button'

import { formatTime } from '../lib'

import { Card } from './card'

interface TimerProps {
  isRunning: boolean
  onReset: () => void
  onPauseToggle: () => void
}

export const Timer: FC<TimerProps> = ({ isRunning, onReset, onPauseToggle }) => {
  const [time, setTime] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prev => prev + 1)
      }, 1000)
    } else if (!isRunning && intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning])

  const handleReset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    setTime(0)
    onReset()
  }

  return (
    <Card className="fixed left-4 right-4 flex items-center justify-between space-x-4 p-4">
      <div className="text-2xl font-bold">{formatTime(time)}</div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={onPauseToggle}
          aria-label={isRunning ? 'Pause timer' : 'Start timer'}
        >
          {isRunning ? (
            <PauseCircle className="size-6 text-foreground" />
          ) : (
            <PlayCircle className="size-6 text-foreground" />
          )}
        </Button>

        <Button variant="outline" size="icon" onClick={handleReset} aria-label="Reset timer">
          <RotateCcw className="size-6 text-foreground" />
        </Button>
      </div>
    </Card>
  )
}
