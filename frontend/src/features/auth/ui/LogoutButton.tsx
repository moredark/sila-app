import React, { FC } from 'react'

import { useTranslation } from '@/shared/lib'
import { Button } from '@/shared/ui'

import { useAuthActions } from '../model/useAuthActions'

interface Props {}

export const LogoutButton: FC<Props> = ({}) => {
  const t = useTranslation()

  const { logout } = useAuthActions()

  const handleLogout = () => {
    logout()
  }

  return (
    <Button
      onClick={handleLogout}
      variant="outline"
      className="w-full border-destructive text-red-700"
    >
      {t('logout')}
    </Button>
  )
}
