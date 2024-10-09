'use client'

import { useTranslations } from 'next-intl'

import { TranslationKeys } from '@/shared/types/i18n'

export function useTranslation() {
  const t = useTranslations()

  const typedT = (key: TranslationKeys) => t(key)

  return typedT
}
