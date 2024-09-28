'use client'

import { useTranslation } from '@/shared/lib'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select'

import { useLanguage } from '../model/useLanguage'

export const LanguageSwitcher = () => {
  const { t } = useTranslation()
  const { currentLanguage, changeLanguage } = useLanguage()

  return (
    <div className="w-full">
      <Select onValueChange={changeLanguage} value={currentLanguage}>
        <SelectTrigger className="w-full">
          <SelectValue>{t('select-language')}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">{t('english')}</SelectItem>
          <SelectItem value="ru">{t('russian')}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
