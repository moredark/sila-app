'use client'

import { BicepsFlexed, HistoryIcon, NotebookText, User } from 'lucide-react'
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
  const t = useTranslation()

  const navItems: NavItem[] = [
    {
      label: t('history'),
      icon: <HistoryIcon />,
      route: APP_ROUTES.WORKOUT_HISTORY.LIST,
    },
    {
      label: t('nav-plans'),
      icon: <NotebookText />,
      route: APP_ROUTES.PLAN.LIST,
    },
    {
      label: t('nav-workout'),
      icon: <BicepsFlexed />,
      route: APP_ROUTES.WORKOUT.LIST,
    },
    { label: t('nav-profile'), icon: <User />, route: APP_ROUTES.PROFILE },
  ]

  return (
    <nav className="flex h-16 w-full items-center justify-between border-t border-border bg-background pb-2 shadow-md dark:bg-neutral-900">
      {navItems.map((item, index) => (
        <NavButton
          key={index}
          icon={item.icon}
          label={item.label}
          onClick={() => router.push(item.route)}
          isActive={pathname === item.route}
        />
      ))}
    </nav>
  )
}
