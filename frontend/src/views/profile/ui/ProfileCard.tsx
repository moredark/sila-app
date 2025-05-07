'use client'
import { FC } from 'react'

import Link from 'next/link'

import { UserData } from '@/entities/user/model/user.type'
import { Button } from '@/shared/ui'
import { Card } from '@/shared/ui/card'
import { ErrorCard } from '@/shared/ui/error-card'

import { ProfileDetails } from './ProfileDetails'
import { ProfileHeader } from './ProfileHeader'
import { SettingsButton } from './SettingsButton'

interface ProfileCardProps {
  userProfile: UserData | undefined
  error: Error | null
  isLoading: boolean
}

export const ProfileCard: FC<ProfileCardProps> = ({ userProfile, error, isLoading }) => {
  if (error) {
    return <ErrorCard message={error.message} className="relative mx-auto w-full" />
  }

  return (
    <Card className="relative mx-auto w-full">
      <ProfileHeader
        username={userProfile?.username || 'User'}
        email={userProfile?.email}
        avatarUrl={userProfile?.avatar_url}
        isLoading={isLoading}
      />
      <ProfileDetails
        fitnessLevel={userProfile?.fitness_level}
        joinedDate={
          userProfile?.created_at
            ? new Date(userProfile.created_at).toLocaleDateString()
            : 'Unknown'
        }
        bio={userProfile?.bio}
        isLoading={isLoading}
      />
      <SettingsButton />

      {userProfile?.role === 'admin' && (
        <div className="mt-4 flex justify-center p-4">
          <Link href={'/admin'}>
            <Button className="w-full">Go to admin panel</Button>
          </Link>
        </div>
      )}
    </Card>
  )
}
