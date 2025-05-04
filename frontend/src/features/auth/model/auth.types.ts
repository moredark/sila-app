import { paths, components } from '@/shared/api/schema'

export type RegisterResponse =
  paths['/auth/register']['post']['responses']['200']['content']['application/json']

export type RegisterError =
  | paths['/auth/register']['post']['responses']['400']['content']['application/json']
  | paths['/auth/register']['post']['responses']['409']['content']['application/json']

export type TokensResponse = components['schemas']['models.TokensResponse']

export interface AuthState {
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export interface AuthUser {
  id: number
  email: string
  username: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export type LoginParams = LoginCredentials | TokensResponse
export interface RegisterCredentials {
  email: string
  password: string
  confirmPassword: string
  username: string
}

export interface AuthResponse {
  user: AuthUser
  tokens: TokensResponse;
}
