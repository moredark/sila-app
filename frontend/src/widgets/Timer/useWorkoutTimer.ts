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
  START_TIME: 'workout_timer_start_time',
  ELAPSED_TIME: 'workout_timer_elapsed_time',
  IS_RUNNING: 'workout_timer_is_running',
  IS_PAUSED: 'workout_timer_is_paused',
  LAST_ACTIVE: 'workout_timer_last_active',
}

export function useWorkoutTimer(): UseWorkoutTimerReturn {
  const [time, setTime] = useState(() => {
    const storedElapsedTime = localStorage.getItem(STORAGE_KEYS.ELAPSED_TIME)
    return storedElapsedTime ? parseInt(storedElapsedTime, 10) : 0
  })

  const [isRunning, setIsRunning] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.IS_RUNNING) === 'true'
  })

  const [isPaused, setIsPaused] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.IS_PAUSED) === 'true'
  })

  const elapsedTimeRef = useRef<number>(time)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleInitialLoad = () => {
      const storedIsRunning = localStorage.getItem(STORAGE_KEYS.IS_RUNNING) === 'true'
      const storedStartTime = localStorage.getItem(STORAGE_KEYS.START_TIME)
      const storedElapsedTime = localStorage.getItem(STORAGE_KEYS.ELAPSED_TIME)
      const storedLastActive = localStorage.getItem(STORAGE_KEYS.LAST_ACTIVE)

      if (storedIsRunning && storedStartTime && storedElapsedTime && storedLastActive) {
        const elapsedTime = parseInt(storedElapsedTime, 10)
        const lastActive = parseInt(storedLastActive, 10)
        const now = Date.now()

        const missedTime = Math.floor((now - lastActive) / 1000)
        const newElapsedTime = elapsedTime + missedTime

        elapsedTimeRef.current = newElapsedTime
        setTime(newElapsedTime)

        localStorage.setItem(STORAGE_KEYS.ELAPSED_TIME, newElapsedTime.toString())
        localStorage.setItem(STORAGE_KEYS.START_TIME, now.toString())
        localStorage.setItem(STORAGE_KEYS.LAST_ACTIVE, now.toString())
      }
    }

    handleInitialLoad()
    window.addEventListener('focus', handleInitialLoad)

    return () => {
      window.removeEventListener('focus', handleInitialLoad)
    }
  }, [])

  useEffect(() => {
    if (isRunning) {
      const now = Date.now()
      localStorage.setItem(STORAGE_KEYS.START_TIME, now.toString())
      localStorage.setItem(STORAGE_KEYS.LAST_ACTIVE, now.toString())

      const updateAndSaveTime = () => {
        const currentTime = Date.now()
        const storedStartTime = localStorage.getItem(STORAGE_KEYS.START_TIME)
        const storedElapsedTime = localStorage.getItem(STORAGE_KEYS.ELAPSED_TIME)

        if (storedStartTime && storedElapsedTime) {
          const startTime = parseInt(storedStartTime, 10)
          const baseElapsedTime = parseInt(storedElapsedTime, 10)
          const delta = Math.floor((currentTime - startTime) / 1000)
          const newTime = baseElapsedTime + delta

          setTime(newTime)
          localStorage.setItem(STORAGE_KEYS.LAST_ACTIVE, currentTime.toString())
        }
      }

      intervalRef.current = setInterval(updateAndSaveTime, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isRunning])

  useEffect(() => {
    const handleVisibilityChange = () => {
      const now = Date.now()
      localStorage.setItem(STORAGE_KEYS.LAST_ACTIVE, now.toString())

      if (document.visibilityState === 'hidden') {
        if (isRunning) {
          const storedStartTime = localStorage.getItem(STORAGE_KEYS.START_TIME)
          const storedElapsedTime = localStorage.getItem(STORAGE_KEYS.ELAPSED_TIME)

          if (storedStartTime && storedElapsedTime) {
            const startTime = parseInt(storedStartTime, 10)
            const baseElapsedTime = parseInt(storedElapsedTime, 10)
            const delta = Math.floor((now - startTime) / 1000)
            const newElapsedTime = baseElapsedTime + delta

            localStorage.setItem(STORAGE_KEYS.ELAPSED_TIME, newElapsedTime.toString())
            elapsedTimeRef.current = newElapsedTime
          }

          if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
          }
        }
      } else if (document.visibilityState === 'visible' && isRunning) {
        const storedElapsedTime = localStorage.getItem(STORAGE_KEYS.ELAPSED_TIME)
        const storedLastActive = localStorage.getItem(STORAGE_KEYS.LAST_ACTIVE)

        if (storedElapsedTime && storedLastActive) {
          const elapsedTime = parseInt(storedElapsedTime, 10)
          const lastActive = parseInt(storedLastActive, 10)
          const missedTime = Math.floor((now - lastActive) / 1000)
          const newElapsedTime = elapsedTime + missedTime

          setTime(newElapsedTime)
          elapsedTimeRef.current = newElapsedTime
          localStorage.setItem(STORAGE_KEYS.ELAPSED_TIME, newElapsedTime.toString())
        }

        localStorage.setItem(STORAGE_KEYS.START_TIME, now.toString())

        if (!intervalRef.current) {
          const updateTime = () => {
            const currentTime = Date.now()
            const storedStartTime = localStorage.getItem(STORAGE_KEYS.START_TIME)
            const storedElapsedTime = localStorage.getItem(STORAGE_KEYS.ELAPSED_TIME)

            if (storedStartTime && storedElapsedTime) {
              const startTime = parseInt(storedStartTime, 10)
              const baseElapsedTime = parseInt(storedElapsedTime, 10)
              const delta = Math.floor((currentTime - startTime) / 1000)
              const newTime = baseElapsedTime + delta

              setTime(newTime)
              localStorage.setItem(STORAGE_KEYS.LAST_ACTIVE, currentTime.toString())
            }
          }

          intervalRef.current = setInterval(updateTime, 1000)
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [isRunning])

  const startTimer = useCallback(() => {
    const now = Date.now()

    localStorage.setItem(STORAGE_KEYS.START_TIME, now.toString())
    localStorage.setItem(STORAGE_KEYS.LAST_ACTIVE, now.toString())
    localStorage.setItem(STORAGE_KEYS.IS_RUNNING, 'true')
    localStorage.setItem(STORAGE_KEYS.IS_PAUSED, 'false')

    setIsRunning(true)
    setIsPaused(false)
  }, [])

  const pauseTimer = useCallback(() => {
    if (isRunning) {
      const now = Date.now()
      const storedStartTime = localStorage.getItem(STORAGE_KEYS.START_TIME)
      const storedElapsedTime = localStorage.getItem(STORAGE_KEYS.ELAPSED_TIME)

      if (storedStartTime && storedElapsedTime) {
        const startTime = parseInt(storedStartTime, 10)
        const baseElapsedTime = parseInt(storedElapsedTime, 10)
        const delta = Math.floor((now - startTime) / 1000)
        const newElapsedTime = baseElapsedTime + delta

        elapsedTimeRef.current = newElapsedTime
        localStorage.setItem(STORAGE_KEYS.ELAPSED_TIME, newElapsedTime.toString())
      }
    }

    localStorage.setItem(STORAGE_KEYS.IS_RUNNING, 'false')
    localStorage.setItem(STORAGE_KEYS.IS_PAUSED, 'true')

    setIsRunning(false)
    setIsPaused(true)
  }, [isRunning])

  const resetTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    localStorage.setItem(STORAGE_KEYS.START_TIME, '0')
    localStorage.setItem(STORAGE_KEYS.ELAPSED_TIME, '0')
    localStorage.setItem(STORAGE_KEYS.IS_RUNNING, 'false')
    localStorage.setItem(STORAGE_KEYS.IS_PAUSED, 'false')
    localStorage.setItem(STORAGE_KEYS.LAST_ACTIVE, '0')

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
    if (isRunning) {
      const now = Date.now()
      const storedStartTime = localStorage.getItem(STORAGE_KEYS.START_TIME)
      const storedElapsedTime = localStorage.getItem(STORAGE_KEYS.ELAPSED_TIME)

      if (storedStartTime && storedElapsedTime) {
        const startTime = parseInt(storedStartTime, 10)
        const baseElapsedTime = parseInt(storedElapsedTime, 10)
        const delta = Math.floor((now - startTime) / 1000)
        const newElapsedTime = baseElapsedTime + delta

        elapsedTimeRef.current = newElapsedTime
        localStorage.setItem(STORAGE_KEYS.ELAPSED_TIME, newElapsedTime.toString())
      }
    }

    localStorage.setItem(STORAGE_KEYS.IS_RUNNING, 'false')
    setIsRunning(false)

    setTimeout(() => {
      const now = Date.now()
      localStorage.setItem(STORAGE_KEYS.START_TIME, now.toString())
      localStorage.setItem(STORAGE_KEYS.LAST_ACTIVE, now.toString())
      localStorage.setItem(STORAGE_KEYS.IS_RUNNING, 'true')
      localStorage.setItem(STORAGE_KEYS.IS_PAUSED, 'false')

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
