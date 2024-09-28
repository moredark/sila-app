'use client'
import { usePathname, useRouter } from 'next/navigation'

import { LoginForm, RegisterForm } from '@/features/auth'
import { APP_ROUTES } from '@/shared/config'
import { useTranslation } from '@/shared/lib'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs'

export const AuthPage = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const pathname = usePathname()

  const currentTab = pathname === APP_ROUTES.AUTH.LOGIN ? 'login' : 'register'

  const handleTabChange = (value: string) => {
    if (value === 'login') {
      router.push(APP_ROUTES.AUTH.LOGIN)
    } else if (value === 'register') {
      router.push(APP_ROUTES.AUTH.REGISTER)
    }
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center p-6">
      <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full max-w-md">
        <TabsList
          role="tablist"
          aria-orientation="horizontal"
          className="grid h-9 w-full grid-cols-2 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground"
        >
          <TabsTrigger
            value="login"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow"
          >
            {t('sign-in')}
          </TabsTrigger>
          <TabsTrigger
            value="register"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow"
          >
            {t('sign-up')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
        <TabsContent value="register">
          <RegisterForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}
