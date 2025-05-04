'use client'

import { AuthTabs } from '@/features/auth'

export const AuthPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center p-6">
      <AuthTabs />
    </div>
  )
}
