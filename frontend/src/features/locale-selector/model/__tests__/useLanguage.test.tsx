import { useQueryClient } from '@tanstack/react-query'
import { act, renderHook } from '@testing-library/react'
import Cookies from 'js-cookie'

import { useLanguage } from '../useLanguage'

jest.mock('js-cookie')
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))
jest.mock('@tanstack/react-query', () => ({
  useQueryClient: jest.fn(),
}))

describe('useLanguage', () => {
  const mockInvalidateQueries = jest.fn()
  const mockRefresh = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(jest.requireMock('next/navigation').useRouter as jest.Mock).mockReturnValue({
      refresh: mockRefresh,
    })
    ;(useQueryClient as jest.Mock).mockReturnValue({
      invalidateQueries: mockInvalidateQueries,
    })
    ;(Cookies.get as jest.Mock).mockReturnValue(null)
    ;(Cookies.set as jest.Mock).mockImplementation(() => {})
  })

  it('should use default language "en" if cookies are not set', () => {
    const { result } = renderHook(() => useLanguage())

    expect(result.current.currentLanguage).toBe('en')
  })

  it('should load language from cookies on initialization', () => {
    ;(Cookies.get as jest.Mock).mockReturnValue('ru')

    const { result } = renderHook(() => useLanguage())

    expect(result.current.currentLanguage).toBe('ru')
  })

  it('should change language, save to cookies and refresh the page', () => {
    const { result } = renderHook(() => useLanguage())

    act(() => {
      result.current.changeLanguage('ru')
    })

    expect(result.current.currentLanguage).toBe('ru')

    expect(Cookies.set).toHaveBeenCalledWith('language', 'ru', {
      path: '/',
      expires: 365,
      secure: true,
      sameSite: 'lax',
    })

    expect(mockInvalidateQueries).toHaveBeenCalledWith({
      queryKey: ['muscleGroups', 'incompleteWorkouts', 'exercises'],
    })

    expect(mockRefresh).toHaveBeenCalled()
  })
})
