import { ReactNode } from 'react'

import { useTranslation } from '@/shared/lib'
import { Card, CardHeader, CardTitle } from '@/shared/ui/card'

interface SettingsCardProps {
  children: ReactNode
}

export const SettingsCard = ({ children }: SettingsCardProps) => {
  const t = useTranslation()

  return (
    <Card className="mx-auto size-full">
      <CardHeader>
        <CardTitle>{t('settings')}</CardTitle>
      </CardHeader>
      {children}
    </Card>
  )
}
