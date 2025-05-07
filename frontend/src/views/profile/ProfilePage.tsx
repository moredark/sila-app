'use client'
import { FC } from 'react'

import { useGetUserProfile } from '@/entities/user/hooks/useProfile'

import { ProfileCard } from './ui/ProfileCard'

export const ProfilePage: FC = () => {
  const { data: userProfile, error, isLoading } = useGetUserProfile()

  return (
    <div className="relative">
      <ProfileCard userProfile={userProfile} error={error} isLoading={isLoading} />
    </div>
  )
}
