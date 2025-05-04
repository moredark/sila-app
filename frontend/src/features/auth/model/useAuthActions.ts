import { useCallback } from 'react'

import { toast } from 'sonner'

import { useTranslation } from '@/shared/lib'

import { refreshTokens } from '../api/refreshToken'
import { useLogin } from '../api/useLogin'
import { useRegister } from '../api/useRegister'

import { useAuth } from './auth.provider'
import { TokensResponse , LoginCredentials, LoginParams, RegisterCredentials } from './auth.types'

/**
 * Hook for authentication that combines all actions in one place
 */
export const useAuthActions = () => {
  const t = useTranslation()
  const { login: authLogin, logout: authLogout } = useAuth()
  
  const loginMutation = useLogin()
  const registerMutation = useRegister()
  
  // Login handler
  const login = useCallback(
    async (credentials: LoginParams) => {
      if ('access_token' in credentials && 'refresh_token' in credentials) {
        authLogin(credentials)
        return credentials
      } else {
        return loginMutation.mutateAsync(credentials as LoginCredentials)
      }
    },
    [loginMutation, authLogin]
  )
  
  // Registration handler
  const register = useCallback(
    async (credentials: RegisterCredentials) => {
      return registerMutation.mutateAsync(credentials)
    },
    [registerMutation]
  )
  
  // Logout handler
  const logout = useCallback(() => {
    authLogout()
    toast.success(t('logout-successful'))
  }, [authLogout, t])
  
  // Token refresh handler
  const refresh = useCallback(
    async (refreshToken: string) => {
      return refreshTokens(
        refreshToken,
        (tokens: TokensResponse) => {
          authLogin(tokens)
        },
        () => {
          authLogout()
        }
      )
    },
    [authLogin, authLogout]
  )
  
  return {
    login,
    register,
    logout,
    refresh,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
  }
}