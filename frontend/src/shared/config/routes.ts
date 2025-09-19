/**
 * Основные маршруты приложения
 */
export const APP_ROUTES = {
  HOME: '/main',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  PLAN: {
    LIST: '/plans',
    DETAIL: (id: number | string): string => `/plans/${id}`,
  },
  WORKOUT: {
    /** Маршрут списка тренировок */
    LIST: '/workout',
    /** Маршрут конкретной тренировки по ID */
    DETAIL: (id: number | string): string => `/workout/${id}`,
  },
  WORKOUT_HISTORY: {
    /** Маршрут списка истории тренировок */
    LIST: '/workout-history',
    /** Маршрут конкретной истории тренировки по ID */
    DETAIL: (id: number | string): string => `/workout-history/${id}`,
  },
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    GOOGLE_CALLBACK: '/auth/google/callback',
  },
  ADMIN: {
    HOME: '/admin',
    WORKOUTS: '/admin/workouts',
    EXERCISES: '/admin/exercises',
    MUSCLE_GROUPS: '/admin/muscle_groups',
  },
}

/**
 * Создает URL с query-параметрами
 */
export const createUrl = (path: string, params?: Record<string, string>): string => {
  if (!params) return path

  const url = new URL(path, window.location.origin)
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value)
  })

  return url.pathname + url.search
}
