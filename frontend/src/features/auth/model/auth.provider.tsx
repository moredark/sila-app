'use client'

import { ReactNode, createContext, useContext, useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { useUserStore } from '@/entities/user'
import { APP_ROUTES } from '@/shared/config'

import { TokensResponse } from './auth.types'

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  login: (tokens: TokensResponse) => void
  logout: () => void
  getAccessToken: () => string | null
  getRefreshToken: () => string | null
}

const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  const {
    accessToken,
    refreshToken,
    setTokens: setStoreTokens,
    logout: logoutStore,
  } = useUserStore()

  useEffect(() => {
    setIsLoading(false)
  }, [])

  const login = (tokens: TokensResponse) => {
    if (tokens.access_token && tokens.refresh_token) {
      setStoreTokens(tokens.access_token, tokens.refresh_token)
      router.push(APP_ROUTES.WORKOUT.LIST)
    }
  }

  const logout = () => {
    logoutStore()
    router.push(APP_ROUTES.AUTH.LOGIN)
  }

  const getAccessToken = () => accessToken
  const getRefreshToken = () => refreshToken

  const value = {
    isAuthenticated: !!accessToken,
    isLoading,
    login,
    logout,
    getAccessToken,
    getRefreshToken,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
