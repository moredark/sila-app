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

  const startTimeRef = useRef<number | null>(null)
  const elapsedTimeRef = useRef<number>(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        if (isRunning && startTimeRef.current) {
          const now = Date.now()
          const additionalTime = Math.floor((now - startTimeRef.current) / 1000)
          elapsedTimeRef.current += additionalTime

          if (timerRef.current) {
            clearInterval(timerRef.current)
            timerRef.current = null
          }
        }
      } else if (document.visibilityState === 'visible') {
        if (isRunning) {
          startTimeRef.current = Date.now()

          if (!timerRef.current) {
            timerRef.current = setInterval(() => {
              const now = Date.now()
              if (!startTimeRef.current) return

              const newTime =
                elapsedTimeRef.current + Math.floor((now - startTimeRef.current) / 1000)
              setTime(newTime)
            }, 1000)
          }
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [isRunning])

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now()

      timerRef.current = setInterval(() => {
        const now = Date.now()
        if (!startTimeRef.current) return

        const newTime = elapsedTimeRef.current + Math.floor((now - startTimeRef.current) / 1000)
        setTime(newTime)
      }, 1000)
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }

      if (startTimeRef.current) {
        const now = Date.now()
        const additionalTime = Math.floor((now - startTimeRef.current) / 1000)
        elapsedTimeRef.current += additionalTime
        startTimeRef.current = null
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [isRunning])

  const startTimer = useCallback(() => {
    startTimeRef.current = Date.now()
    setIsRunning(true)
    setIsPaused(false)
  }, [])

  const pauseTimer = useCallback(() => {
    if (startTimeRef.current) {
      const now = Date.now()
      const additionalTime = Math.floor((now - startTimeRef.current) / 1000)
      elapsedTimeRef.current += additionalTime
      startTimeRef.current = null
    }

    setIsRunning(false)
    setIsPaused(true)
  }, [])

  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }

    startTimeRef.current = null
    elapsedTimeRef.current = 0
    setTime(0)
    setIsRunning(false)
    setIsPaused(false)
  }, [])

  const togglePause = useCallback(() => {
    if (isRunning) {
      pauseTimer()
    } else {
      startTimer()
    }
  }, [isRunning, pauseTimer, startTimer])

  const handleSetAdded = useCallback(() => {
    if (isRunning && startTimeRef.current) {
      const now = Date.now()
      const additionalTime = Math.floor((now - startTimeRef.current) / 1000)
      elapsedTimeRef.current += additionalTime
    }

    setIsRunning(false)

    setTimeout(() => {
      startTimeRef.current = Date.now()
      setIsPaused(false)
      setIsRunning(true)
    }, 0)
  }, [isRunning])

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
