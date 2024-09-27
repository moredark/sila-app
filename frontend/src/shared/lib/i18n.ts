'use client'

import i18n from 'i18next'
import HttpBackend from 'i18next-http-backend'
import Cookies from 'js-cookie'
import { initReactI18next } from 'react-i18next'

const defaultLanguage = Cookies.get('language') || 'en'

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: defaultLanguage,
    fallbackLng: 'en',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  })

export default i18n
