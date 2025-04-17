'use client'
import { FC } from 'react'

import Link from 'next/link'

import { useGetUserProfile } from '@/entities/user/hooks/useProfile'
import { Button } from '@/shared/ui'
import { Card } from '@/shared/ui/card'
import { ErrorCard } from '@/shared/ui/error-card'
import { Skeleton } from '@/shared/ui/skeleton'

import { ProfileDetails } from './ProfileDetails'
import { ProfileHeader } from './ProfileHeader'
import { SettingsButton } from './SettingsButton'


const ProfilePage: FC = () => {
  const { data: userProfile, error, isLoading } = useGetUserProfile()

  if (isLoading) {
    return (
      <div className="relative p-4">
        <Skeleton className="mx-auto h-64 w-full max-w-md" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="relative p-4">
        <ErrorCard message={error.message} className="relative mx-auto w-full" />
      </div>
    )
  }

  if (!userProfile) {
    return null
  }

  return (
    <div className="relative p-4">
      <Card className="relative mx-auto w-full">
        <ProfileHeader
          username={userProfile.username || 'User'}
          email={userProfile.email}
          avatarUrl={userProfile.avatar_url}
        />
        <ProfileDetails
          fitnessLevel={userProfile.fitness_level}
          joinedDate={
            userProfile.created_at
              ? new Date(userProfile.created_at).toLocaleDateString()
              : 'Unknown'
          }
          bio={userProfile.bio}
        />
        <SettingsButton />
      </Card>

      {userProfile.role === 'admin' && (
        <div className="mt-4 flex justify-center">
          <Link href={'/admin'}>
            <Button className="w-full">Go to admin panel</Button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default ProfilePage
