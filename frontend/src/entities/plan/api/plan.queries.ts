import { GET } from '@/shared/api'

export const getPlansQuery = async (token: string | undefined, page: number, limit: number) => {
  const { data, error } = await GET('/plans', {
    params: {
      query: {
        limit,
        offset: (page - 1) * limit,
      },
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (error) {
    throw error
  }

  return data
}

export const getPlanQuery = async (token: string | undefined, id: number) => {
  const { data, error } = await GET('/plans/{id}', {
    params: {
      path: {
        id,
      },
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (error) {
    throw error
  }

  return data
}
