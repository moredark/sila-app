'use client'

import { FC } from 'react'

import { useSettingsStore } from '@/entities/settings/model/settings.store'
import { useTranslation } from '@/shared/lib'
import { Label, Switch } from '@/shared/ui'

export const TimerSettings: FC = () => {
  const t = useTranslation()
  const { shouldRestartOnNewSet, setShouldRestartOnNewSet } = useSettingsStore()

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{t('timer-settings')}</h3>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="restart-timer">{t('restart-timer-on-new-set')}</Label>
          <p className="text-sm text-muted-foreground">
            {t('restart-timer-on-new-set-description')}
          </p>
        </div>
        <Switch
          id="restart-timer"
          checked={shouldRestartOnNewSet}
          onCheckedChange={setShouldRestartOnNewSet}
        />
      </div>
    </div>
  )
}