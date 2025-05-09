import { useCallback, useEffect, useRef, useState } from 'react'

interface UseWorkoutTimerReturn {
  time: number
  isRunning: boolean
  isPaused: boolean
  startTimer: () => void
  pauseTimer: () => void
  resetTimer: () => void
  togglePause: () => void
  handleSetAdded: () => void
}

export function useWorkoutTimer(): UseWorkoutTimerReturn {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const clearTimerInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prev => prev + 1)
      }, 1000)
    } else {
      clearTimerInterval()
    }

    return clearTimerInterval
  }, [isRunning, clearTimerInterval])

  const startTimer = useCallback(() => {
    setIsRunning(true)
    setIsPaused(false)
  }, [])

  const pauseTimer = useCallback(() => {
    setIsRunning(false)
    setIsPaused(true)
  }, [])

  const resetTimer = useCallback(() => {
    clearTimerInterval()
    setTime(0)
    setIsRunning(false)
    setIsPaused(false)
  }, [clearTimerInterval])

  const togglePause = useCallback(() => {
    if (isRunning) {
      pauseTimer()
    } else {
      startTimer()
    }
  }, [isRunning, pauseTimer, startTimer])

  const handleSetAdded = useCallback(() => {
    setIsRunning(false)
    setTimeout(() => {
      setIsPaused(false)
      setIsRunning(true)
    }, 0)
  }, [])

  return {
    time,
    isRunning,
    isPaused,
    startTimer,
    pauseTimer,
    resetTimer,
    togglePause,
    handleSetAdded,
  }
}
