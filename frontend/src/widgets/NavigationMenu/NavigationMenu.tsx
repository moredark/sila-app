'use client'

import { BicepsFlexed, Settings, User } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

import { APP_ROUTES } from '@/shared/config'
import { useTranslation } from '@/shared/lib'

import { NavButton } from './ui/NavButton'

type NavItem = {
  label: string
  icon: JSX.Element
  route: string
}

export const NavigationMenu = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { t } = useTranslation()

  const navItems: NavItem[] = [
    { label: t('settings'), icon: <Settings />, route: APP_ROUTES.SETTINGS },
    {
      label: t('nav-workout'),
      icon: <BicepsFlexed />,
      route: APP_ROUTES.WORKOUT,
    },
    { label: t('nav-profile'), icon: <User />, route: APP_ROUTES.PROFILE },
  ]

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 flex h-16 items-center justify-between border-t border-border bg-background py-2 shadow-md dark:bg-neutral-900">
      {navItems.map((item, index) => (
        <NavButton
          key={index}
          icon={item.icon}
          label={item.label}
          onClick={() => router.push(item.route)}
          isActive={pathname === item.route}
          isMain={index === 1}
        />
      ))}
    </nav>
  )
}
