'use client'

import { CardContent } from '@/shared/ui/card'

import { SettingsCard, LanguageSection, LogoutSection } from './ui'

export const SettingsPage = () => {
  return (
    <div className="size-full p-4">
      <SettingsCard>
        <CardContent className="w-full">
          <LanguageSection />
        </CardContent>

        <CardContent className="space-y-4">
          <LogoutSection />
        </CardContent>
      </SettingsCard>
    </div>
  )
}
