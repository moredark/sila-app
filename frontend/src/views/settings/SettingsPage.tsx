'use client'

import { CardContent } from '@/shared/ui/card'

import { SettingsCard, LanguageSection, LogoutSection, TimerSettings } from './ui'

export const SettingsPage = () => {
  return (
    <div className="size-full">
      <SettingsCard>
        <CardContent className="w-full">
          <LanguageSection />
        </CardContent>

        <CardContent className="w-full">
          <TimerSettings />
        </CardContent>

        <CardContent className="space-y-4">
          <LogoutSection />
        </CardContent>
      </SettingsCard>
    </div>
  )
}
