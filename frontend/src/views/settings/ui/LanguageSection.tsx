import { LanguageSwitcher } from '@/features/language-switcher/ui'
import { useTranslation } from '@/shared/lib'

export const LanguageSection = () => {
  const t = useTranslation()

  return (
    <div>
      <h3 className="mb-2 text-lg font-semibold">{t('language')}</h3>
      <LanguageSwitcher />
    </div>
  )
}
