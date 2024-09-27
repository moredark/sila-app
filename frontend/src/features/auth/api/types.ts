import { paths, components } from '@/shared/api/schema'

export type RegisterResponse =
  paths['/auth/register']['post']['responses']['200']['content']['application/json']

export type RegisterError =
  | paths['/auth/register']['post']['responses']['400']['content']['application/json']
  | paths['/auth/register']['post']['responses']['409']['content']['application/json']

export type TokensResponse = components['schemas']['models.TokensResponse']
