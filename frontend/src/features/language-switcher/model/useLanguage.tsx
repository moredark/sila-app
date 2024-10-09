'use client'

import { useState, useEffect } from 'react'

import { useQueryClient } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

export function useLanguage() {
  const router = useRouter()
  const [currentLanguage, setCurrentLanguage] = useState('en')
  const queryClient = useQueryClient()

  useEffect(() => {
    const languageCookie = Cookies.get('language')
    if (languageCookie) {
      setCurrentLanguage(languageCookie)
    }
  }, [])

  const changeLanguage = (locale: string) => {
    Cookies.set('language', locale, {
      path: '/',
      expires: 365,
      secure: true,
      sameSite: 'lax',
    })

    setCurrentLanguage(locale)

    queryClient.invalidateQueries({
      queryKey: ['muscleGroups', 'incompleteWorkouts', 'exercises'],
    })

    router.refresh()
  }

  return { changeLanguage, currentLanguage }
}
