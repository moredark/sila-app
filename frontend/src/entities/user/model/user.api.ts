import { GET } from '@/shared/api'

export const getUserProfile = async () => {
  try {
    const response = await GET('/user/profile')
    return response.data
  } catch (error) {
    console.error('Failed to fetch user profile:', error)
    throw error
  }
}
