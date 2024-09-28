import Cookies from 'js-cookie'
import { create } from 'zustand'

import { APP_ROUTES } from '@/shared/config'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/shared/config/auth'

interface UserState {
  isAuthenticated: boolean
  accessToken: string | null
  refreshToken: string | null
  setTokens: (accessToken: string, refreshToken: string) => void
  logout: () => void
}

export const useUserStore = create<UserState>(set => {
  const accessToken = Cookies.get(ACCESS_TOKEN_KEY) || null
  const refreshToken = Cookies.get(REFRESH_TOKEN_KEY) || null
  const isAuthenticated = !!accessToken

  return {
    isAuthenticated,
    accessToken,
    refreshToken,
    setTokens: (accessToken: string, refreshToken: string) => {
      Cookies.set(ACCESS_TOKEN_KEY, accessToken, { expires: 7 })
      Cookies.set(REFRESH_TOKEN_KEY, refreshToken, { expires: 7 })
      set({ isAuthenticated: true, accessToken, refreshToken })
    },
    logout: () => {
      Cookies.remove(ACCESS_TOKEN_KEY)
      Cookies.remove(REFRESH_TOKEN_KEY)
      set({ isAuthenticated: false, accessToken: null, refreshToken: null })
      location.assign(APP_ROUTES.AUTH.LOGIN)
    },
  }
})
