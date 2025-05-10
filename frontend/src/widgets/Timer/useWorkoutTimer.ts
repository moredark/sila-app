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

const STORAGE_KEYS = {
  ELAPSED_TIME: 'workout_timer_elapsed_time',
  IS_RUNNING: 'workout_timer_is_running',
  IS_PAUSED: 'workout_timer_is_paused',
}

const safeLocalStorage = {
  getItem: (key: string): string | null => {
    if (typeof window === 'undefined') return null
    try {
      return window.localStorage.getItem(key)
    } catch (e) {
      console.error('Error accessing localStorage:', e)
      return null
    }
  },
  setItem: (key: string, value: string): void => {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.setItem(key, value)
    } catch (e) {
      console.error('Error writing to localStorage:', e)
    }
  },
}

export function useWorkoutTimer(): UseWorkoutTimerReturn {
  const [time, setTime] = useState<number>(0)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [isPaused, setIsPaused] = useState<boolean>(false)

  const elapsedTimeRef = useRef<number>(0)
  const startTimeRef = useRef<number | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const isClientSide = useRef<boolean>(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      isClientSide.current = true
      try {
        const storedElapsedTime = safeLocalStorage.getItem(STORAGE_KEYS.ELAPSED_TIME)
        const storedIsPaused = safeLocalStorage.getItem(STORAGE_KEYS.IS_PAUSED)

        if (storedElapsedTime) {
          const parsedTime = parseInt(storedElapsedTime, 10) || 0
          elapsedTimeRef.current = parsedTime
          setTime(parsedTime)
        }

        if (storedIsPaused === 'true') {
          setIsPaused(true)
        }
      } catch (e) {
        console.error('Error initializing timer:', e)
      }
    }
  }, [])

  const updateTimer = useCallback(() => {
    if (!isRunning || !startTimeRef.current) return

    const now = Date.now()
    const delta = Math.floor((now - startTimeRef.current) / 1000)
    const newTime = elapsedTimeRef.current + delta

    setTime(newTime)

    if (newTime % 5 === 0) {
      safeLocalStorage.setItem(STORAGE_KEYS.ELAPSED_TIME, newTime.toString())
    }
  }, [isRunning])

  useEffect(() => {
    if (!isClientSide.current) return

    if (isRunning) {
      startTimeRef.current = Date.now()

      intervalRef.current = setInterval(() => {
        updateTimer()
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }

      if (startTimeRef.current) {
        const now = Date.now()
        const additionalTime = Math.floor((now - startTimeRef.current) / 1000)
        elapsedTimeRef.current += additionalTime
        startTimeRef.current = null

        setTime(elapsedTimeRef.current)

        safeLocalStorage.setItem(STORAGE_KEYS.ELAPSED_TIME, elapsedTimeRef.current.toString())
      }
    }

    safeLocalStorage.setItem(STORAGE_KEYS.IS_RUNNING, isRunning ? 'true' : 'false')

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isRunning, updateTimer])

  useEffect(() => {
    if (!isClientSide.current) return

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        if (isRunning && startTimeRef.current) {
          const now = Date.now()
          const additionalTime = Math.floor((now - startTimeRef.current) / 1000)
          elapsedTimeRef.current += additionalTime

          safeLocalStorage.setItem(STORAGE_KEYS.ELAPSED_TIME, elapsedTimeRef.current.toString())

          if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
          }
        }
      } else if (document.visibilityState === 'visible') {
        if (isRunning) {
          startTimeRef.current = Date.now()

          if (!intervalRef.current) {
            intervalRef.current = setInterval(() => {
              updateTimer()
            }, 1000)
          }
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [isRunning, updateTimer])

  const startTimer = useCallback(() => {
    if (!isClientSide.current) return

    startTimeRef.current = Date.now()

    setIsRunning(true)
    setIsPaused(false)

    safeLocalStorage.setItem(STORAGE_KEYS.IS_RUNNING, 'true')
    safeLocalStorage.setItem(STORAGE_KEYS.IS_PAUSED, 'false')
  }, [])

  const pauseTimer = useCallback(() => {
    if (!isClientSide.current) return

    if (startTimeRef.current) {
      const now = Date.now()
      const additionalTime = Math.floor((now - startTimeRef.current) / 1000)
      elapsedTimeRef.current += additionalTime
      startTimeRef.current = null

      setTime(elapsedTimeRef.current)

      safeLocalStorage.setItem(STORAGE_KEYS.ELAPSED_TIME, elapsedTimeRef.current.toString())
    }

    setIsRunning(false)
    setIsPaused(true)

    safeLocalStorage.setItem(STORAGE_KEYS.IS_RUNNING, 'false')
    safeLocalStorage.setItem(STORAGE_KEYS.IS_PAUSED, 'true')
  }, [])

  const resetTimer = useCallback(() => {
    if (!isClientSide.current) return

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    startTimeRef.current = null
    elapsedTimeRef.current = 0

    setTime(0)
    setIsRunning(false)
    setIsPaused(false)

    safeLocalStorage.setItem(STORAGE_KEYS.ELAPSED_TIME, '0')
    safeLocalStorage.setItem(STORAGE_KEYS.IS_RUNNING, 'false')
    safeLocalStorage.setItem(STORAGE_KEYS.IS_PAUSED, 'false')
  }, [])

  const togglePause = useCallback(() => {
    if (isRunning) {
      pauseTimer()
    } else {
      startTimer()
    }
  }, [isRunning, pauseTimer, startTimer])

  const handleSetAdded = useCallback(() => {
    if (!isClientSide.current) return

    if (isRunning && startTimeRef.current) {
      const now = Date.now()
      const additionalTime = Math.floor((now - startTimeRef.current) / 1000)
      elapsedTimeRef.current += additionalTime

      safeLocalStorage.setItem(STORAGE_KEYS.ELAPSED_TIME, elapsedTimeRef.current.toString())
    }

    setIsRunning(false)

    setTimeout(() => {
      startTimeRef.current = Date.now()
      setIsPaused(false)
      setIsRunning(true)

      safeLocalStorage.setItem(STORAGE_KEYS.IS_RUNNING, 'true')
      safeLocalStorage.setItem(STORAGE_KEYS.IS_PAUSED, 'false')
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
