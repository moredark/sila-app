import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Skeleton } from '@/shared/ui/skeleton'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import React, { FC } from 'react'
import { getUserProfile } from '@/entities/user'
import { cookies } from 'next/headers'
import { ACCESS_TOKEN_KEY } from '@/shared/config/auth'
import ProfilePage from '@/views/profile/ui'

interface Props {}

const Profile: FC<Props> = async ({}) => {
  const accessToken = cookies().get(ACCESS_TOKEN_KEY)?.value
  const userProfile = await getUserProfile(accessToken)

  return <ProfilePage userProfile={userProfile} />
}

export default Profile
