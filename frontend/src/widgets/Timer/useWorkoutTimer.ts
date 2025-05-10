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
  const animationFrameRef = useRef<number | null>(null)
  const lastUpdateTimeRef = useRef<number | null>(null)

  const updateTimer = useCallback(() => {
    if (!isRunning || !startTimeRef.current) return

    const now = performance.now()
    const delta = Math.floor((now - startTimeRef.current) / 1000)
    const newTime = elapsedTimeRef.current + delta

    setTime(newTime)

    lastUpdateTimeRef.current = now

    animationFrameRef.current = requestAnimationFrame(updateTimer)
  }, [isRunning])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        if (isRunning && startTimeRef.current) {
          const now = performance.now()
          const additionalTime = Math.floor((now - startTimeRef.current) / 1000)
          elapsedTimeRef.current += additionalTime

          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current)
            animationFrameRef.current = null
          }
        }
      } else if (document.visibilityState === 'visible') {
        if (isRunning) {
          startTimeRef.current = performance.now()

          if (!animationFrameRef.current) {
            animationFrameRef.current = requestAnimationFrame(updateTimer)
          }
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [isRunning, updateTimer])

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = performance.now()
      lastUpdateTimeRef.current = performance.now()

      animationFrameRef.current = requestAnimationFrame(updateTimer)
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }

      if (startTimeRef.current) {
        const now = performance.now()
        const additionalTime = Math.floor((now - startTimeRef.current) / 1000)
        elapsedTimeRef.current += additionalTime
        startTimeRef.current = null
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
    }
  }, [isRunning, updateTimer])

  const startTimer = useCallback(() => {
    startTimeRef.current = performance.now()
    lastUpdateTimeRef.current = performance.now()
    setIsRunning(true)
    setIsPaused(false)
  }, [])

  const pauseTimer = useCallback(() => {
    if (startTimeRef.current) {
      const now = performance.now()
      const additionalTime = Math.floor((now - startTimeRef.current) / 1000)
      elapsedTimeRef.current += additionalTime
      startTimeRef.current = null
    }

    setIsRunning(false)
    setIsPaused(true)
  }, [])

  const resetTimer = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }

    startTimeRef.current = null
    lastUpdateTimeRef.current = null
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
      const now = performance.now()
      const additionalTime = Math.floor((now - startTimeRef.current) / 1000)
      elapsedTimeRef.current += additionalTime
    }

    setIsRunning(false)

    setTimeout(() => {
      startTimeRef.current = performance.now()
      lastUpdateTimeRef.current = performance.now()
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
