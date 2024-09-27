'use client'

import { LogoutButton } from '@/features/auth'
import { LanguageSwitcher } from '@/features/language-switcher/ui/LanguageSwitcher'
import { useTranslation } from '@/shared/lib'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'

const SettingsPage = () => {
    const { t } = useTranslation()

    return (
        <div className="size-full p-4">
            <Card className="mx-auto size-full">
                <CardHeader>
                    <CardTitle>{t('settings')}</CardTitle>
                </CardHeader>

                <CardContent className="w-full">
                    <div>
                        <h3 className="mb-2 text-lg font-semibold">{t('language')}</h3>
                        <LanguageSwitcher />
                    </div>
                </CardContent>

                <CardContent className="flex justify-center space-y-4">
                    <LogoutButton />
                </CardContent>
            </Card>
        </div>
    )
}

export default SettingsPage
