import { act, renderHook } from '@testing-library/react'

import { useWorkoutTimer } from '../useWorkoutTimer'

const mockLocalStorage = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value
    }),
    clear: jest.fn(() => {
      store = {}
    }),
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
})

const mockNow = jest.fn()
global.Date.now = mockNow

describe('useWorkoutTimer', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockLocalStorage.clear()
    mockNow.mockReturnValue(1000)
  })

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useWorkoutTimer())

    expect(result.current.time).toBe(0)
    expect(result.current.isRunning).toBe(false)
    expect(result.current.isPaused).toBe(false)
  })

  it('should start timer when calling startTimer', () => {
    const { result } = renderHook(() => useWorkoutTimer())

    act(() => {
      result.current.startTimer()
    })

    expect(result.current.isRunning).toBe(true)
    expect(result.current.isPaused).toBe(false)
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('workout_timer_is_running', 'true')
  })

  it('should pause timer when calling pauseTimer', () => {
    const { result } = renderHook(() => useWorkoutTimer())

    act(() => {
      result.current.startTimer()
    })

    act(() => {
      result.current.pauseTimer()
    })

    expect(result.current.isRunning).toBe(false)
    expect(result.current.isPaused).toBe(true)
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('workout_timer_is_paused', 'true')
  })

  it('should reset timer when calling resetTimer', () => {
    const { result } = renderHook(() => useWorkoutTimer())

    act(() => {
      result.current.startTimer()
    })

    mockNow.mockReturnValue(6000)

    act(() => {
      result.current.resetTimer()
    })

    expect(result.current.time).toBe(0)
    expect(result.current.isRunning).toBe(false)
    expect(result.current.isPaused).toBe(false)
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('workout_timer_elapsed_time', '0')
  })

  it('should toggle pause state when calling togglePause', () => {
    const { result } = renderHook(() => useWorkoutTimer())

    act(() => {
      result.current.startTimer()
    })

    expect(result.current.isRunning).toBe(true)
    expect(result.current.isPaused).toBe(false)

    act(() => {
      result.current.togglePause()
    })

    expect(result.current.isRunning).toBe(false)
    expect(result.current.isPaused).toBe(true)

    act(() => {
      result.current.togglePause()
    })

    expect(result.current.isRunning).toBe(true)
    expect(result.current.isPaused).toBe(false)
  })

  it('should have handleSetAdded function defined', () => {
    const { result } = renderHook(() => useWorkoutTimer())

    expect(result.current.handleSetAdded).toBeDefined()

    act(() => {
      result.current.startTimer()
    })

    act(() => {
      mockNow.mockReturnValue(6000)
      result.current.handleSetAdded()
    })

    expect(typeof result.current.handleSetAdded).toBe('function')
  })
})
