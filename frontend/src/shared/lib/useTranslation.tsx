'use client'

import { useTranslation as useTranslationOriginal } from 'react-i18next';

import { TranslationKeys } from '@/shared/types/i18n';

export function useTranslation() {
    const { t, i18n } = useTranslationOriginal('translation');

    const typedT = (key: TranslationKeys) => t(key);

    return { t: typedT, i18n };
}
