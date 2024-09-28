'use client'
import { FC } from 'react'

import Link from 'next/link'

import { UserProfile } from '@/entities/user/model/user.type'
import { Button } from '@/shared/ui'
import { Card } from '@/shared/ui/card'
import { Skeleton } from '@/shared/ui/skeleton'

import { ProfileDetails } from './ProfileDetails'
import { ProfileHeader } from './ProfileHeader'
import { SettingsButton } from './SettingsButton'

interface Props {
  userProfile: UserProfile | undefined
}

const ProfilePage: FC<Props> = ({ userProfile }) => {
  return (
    <div className="relative p-4">
      {userProfile ? (
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
      ) : (
        <Skeleton className="mx-auto h-64 w-full max-w-md" />
      )}

      {userProfile?.role === 'admin' && (
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
