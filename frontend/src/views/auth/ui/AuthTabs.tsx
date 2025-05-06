'use client'
import { usePathname, useRouter } from 'next/navigation'

import { APP_ROUTES } from '@/shared/config'
import { useTranslation } from '@/shared/lib'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs'

import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'

const routes = {
  login: APP_ROUTES.AUTH.LOGIN,
  register: APP_ROUTES.AUTH.REGISTER,
}

export const AuthTabs = () => {
  const t = useTranslation()
  const router = useRouter()
  const pathname = usePathname()

  const currentTab = pathname === APP_ROUTES.AUTH.LOGIN ? 'login' : 'register'

  const handleTabChange = (value: string) => {
    if (routes[value as keyof typeof routes]) {
      router.push(routes[value as keyof typeof routes])
    }
  }

  return (
    <Tabs value={currentTab} onValueChange={handleTabChange}>
      <TabsList
        role="tablist"
        aria-orientation="horizontal"
        className="grid w-full grid-cols-2 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground"
      >
        <TabsTrigger value="login" className="tabs-trigger">
          {t('sign-in')}
        </TabsTrigger>
        <TabsTrigger value="register" className="tabs-trigger">
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
  )
}
