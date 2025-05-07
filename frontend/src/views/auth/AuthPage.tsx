'use client'

import { AuthAlternatives, AuthTabs } from './ui'

export const AuthPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center p-6">
      <div className="w-full">
        <AuthTabs />

        <div className="mt-4 w-full">
          <AuthAlternatives />
        </div>
      </div>
    </div>
  )
}
