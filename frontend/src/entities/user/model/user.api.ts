import { GET } from '@/shared/api'

export const getUserProfile = async (accessToken?: string) => {
  try {
    const response = await GET('/user/profile', {
      headers: accessToken ? { Authorization: accessToken } : {},
    })
    return response.data
  } catch (error) {
    console.error('Failed to fetch user profile:', error)
    throw error
  }
}
