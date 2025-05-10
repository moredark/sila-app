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
  START_TIMESTAMP: 'workout_timer_start_timestamp',
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

  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const isMountedRef = useRef<boolean>(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      const storedElapsedTime = safeLocalStorage.getItem(STORAGE_KEYS.ELAPSED_TIME)
      const storedStartTimestamp = safeLocalStorage.getItem(STORAGE_KEYS.START_TIMESTAMP)
      const storedIsRunning = safeLocalStorage.getItem(STORAGE_KEYS.IS_RUNNING) === 'true'
      const storedIsPaused = safeLocalStorage.getItem(STORAGE_KEYS.IS_PAUSED) === 'true'

      let initialTime = 0

      if (storedIsRunning && storedStartTimestamp && storedElapsedTime) {
        const startTimestamp = parseInt(storedStartTimestamp, 10)
        const elapsedTime = parseInt(storedElapsedTime, 10)
        const now = Date.now()

        const timePassed = Math.floor((now - startTimestamp) / 1000)
        initialTime = elapsedTime + timePassed

        safeLocalStorage.setItem(STORAGE_KEYS.START_TIMESTAMP, now.toString())
        safeLocalStorage.setItem(STORAGE_KEYS.ELAPSED_TIME, initialTime.toString())

        setIsRunning(true)
      } else if (storedIsPaused && storedElapsedTime) {
        initialTime = parseInt(storedElapsedTime, 10)
        setIsPaused(true)
      } else if (storedElapsedTime) {
        initialTime = parseInt(storedElapsedTime, 10)
      }

      setTime(initialTime)
    } catch (e) {}

    isMountedRef.current = true

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined' || !isMountedRef.current) return

    if (isRunning) {
      intervalRef.current = setInterval(() => {
        const storedStartTimestamp = safeLocalStorage.getItem(STORAGE_KEYS.START_TIMESTAMP)
        const storedElapsedTime = safeLocalStorage.getItem(STORAGE_KEYS.ELAPSED_TIME)

        if (storedStartTimestamp && storedElapsedTime) {
          const startTimestamp = parseInt(storedStartTimestamp, 10)
          const baseElapsedTime = parseInt(storedElapsedTime, 10)
          const now = Date.now()

          const timePassed = Math.floor((now - startTimestamp) / 1000)
          const newTime = baseElapsedTime + timePassed

          setTime(newTime)
        }
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    safeLocalStorage.setItem(STORAGE_KEYS.IS_RUNNING, isRunning ? 'true' : 'false')
    safeLocalStorage.setItem(STORAGE_KEYS.IS_PAUSED, isPaused ? 'true' : 'false')

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isRunning, isPaused])

  useEffect(() => {
    if (typeof window === 'undefined' || !isMountedRef.current) return

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isRunning) {
        const storedStartTimestamp = safeLocalStorage.getItem(STORAGE_KEYS.START_TIMESTAMP)
        const storedElapsedTime = safeLocalStorage.getItem(STORAGE_KEYS.ELAPSED_TIME)

        if (storedStartTimestamp && storedElapsedTime) {
          const startTimestamp = parseInt(storedStartTimestamp, 10)
          const baseElapsedTime = parseInt(storedElapsedTime, 10)
          const now = Date.now()

          const timePassed = Math.floor((now - startTimestamp) / 1000)
          const newTime = baseElapsedTime + timePassed

          setTime(newTime)
          safeLocalStorage.setItem(STORAGE_KEYS.ELAPSED_TIME, newTime.toString())
          safeLocalStorage.setItem(STORAGE_KEYS.START_TIMESTAMP, now.toString())
        }
      }
    }

    window.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('focus', handleVisibilityChange)

    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('focus', handleVisibilityChange)
    }
  }, [isRunning])

  useEffect(() => {
    if (typeof window === 'undefined' || !isMountedRef.current) return

    const handleAppFocus = () => {
      if (isRunning) {
        const storedStartTimestamp = safeLocalStorage.getItem(STORAGE_KEYS.START_TIMESTAMP)
        const storedElapsedTime = safeLocalStorage.getItem(STORAGE_KEYS.ELAPSED_TIME)

        if (storedStartTimestamp && storedElapsedTime) {
          const startTimestamp = parseInt(storedStartTimestamp, 10)
          const baseElapsedTime = parseInt(storedElapsedTime, 10)
          const now = Date.now()

          const timePassed = Math.floor((now - startTimestamp) / 1000)
          const newTime = baseElapsedTime + timePassed

          setTime(newTime)
          safeLocalStorage.setItem(STORAGE_KEYS.ELAPSED_TIME, newTime.toString())
          safeLocalStorage.setItem(STORAGE_KEYS.START_TIMESTAMP, now.toString())
        }
      }
    }

    window.addEventListener('pageshow', handleAppFocus)

    return () => {
      window.removeEventListener('pageshow', handleAppFocus)
    }
  }, [isRunning])

  const startTimer = useCallback(() => {
    if (typeof window === 'undefined') return

    const now = Date.now()
    const currentElapsedTime = time

    safeLocalStorage.setItem(STORAGE_KEYS.START_TIMESTAMP, now.toString())
    safeLocalStorage.setItem(STORAGE_KEYS.ELAPSED_TIME, currentElapsedTime.toString())
    safeLocalStorage.setItem(STORAGE_KEYS.IS_RUNNING, 'true')
    safeLocalStorage.setItem(STORAGE_KEYS.IS_PAUSED, 'false')

    setIsRunning(true)
    setIsPaused(false)
  }, [time])

  const pauseTimer = useCallback(() => {
    if (typeof window === 'undefined') return

    const storedStartTimestamp = safeLocalStorage.getItem(STORAGE_KEYS.START_TIMESTAMP)
    const storedElapsedTime = safeLocalStorage.getItem(STORAGE_KEYS.ELAPSED_TIME)

    if (isRunning && storedStartTimestamp && storedElapsedTime) {
      const startTimestamp = parseInt(storedStartTimestamp, 10)
      const baseElapsedTime = parseInt(storedElapsedTime, 10)
      const now = Date.now()

      const timePassed = Math.floor((now - startTimestamp) / 1000)
      const newTime = baseElapsedTime + timePassed

      setTime(newTime)
      safeLocalStorage.setItem(STORAGE_KEYS.ELAPSED_TIME, newTime.toString())
    }

    safeLocalStorage.setItem(STORAGE_KEYS.IS_RUNNING, 'false')
    safeLocalStorage.setItem(STORAGE_KEYS.IS_PAUSED, 'true')

    setIsRunning(false)
    setIsPaused(true)
  }, [isRunning])

  const resetTimer = useCallback(() => {
    if (typeof window === 'undefined') return

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    safeLocalStorage.setItem(STORAGE_KEYS.ELAPSED_TIME, '0')
    safeLocalStorage.setItem(STORAGE_KEYS.START_TIMESTAMP, '0')
    safeLocalStorage.setItem(STORAGE_KEYS.IS_RUNNING, 'false')
    safeLocalStorage.setItem(STORAGE_KEYS.IS_PAUSED, 'false')

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
    if (typeof window === 'undefined') return

    if (isRunning) {
      const storedStartTimestamp = safeLocalStorage.getItem(STORAGE_KEYS.START_TIMESTAMP)
      const storedElapsedTime = safeLocalStorage.getItem(STORAGE_KEYS.ELAPSED_TIME)

      if (storedStartTimestamp && storedElapsedTime) {
        const startTimestamp = parseInt(storedStartTimestamp, 10)
        const baseElapsedTime = parseInt(storedElapsedTime, 10)
        const now = Date.now()

        const timePassed = Math.floor((now - startTimestamp) / 1000)
        const newTime = baseElapsedTime + timePassed

        setTime(newTime)
        safeLocalStorage.setItem(STORAGE_KEYS.ELAPSED_TIME, newTime.toString())
      }

      setIsRunning(false)
      safeLocalStorage.setItem(STORAGE_KEYS.IS_RUNNING, 'false')

      setTimeout(() => {
        const now = Date.now()
        safeLocalStorage.setItem(STORAGE_KEYS.START_TIMESTAMP, now.toString())
        safeLocalStorage.setItem(STORAGE_KEYS.IS_RUNNING, 'true')
        safeLocalStorage.setItem(STORAGE_KEYS.IS_PAUSED, 'false')

        setIsPaused(false)
        setIsRunning(true)
      }, 0)
    }
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
