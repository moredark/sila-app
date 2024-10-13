import { getUserProfile } from '@/entities/user'
import { ACCESS_TOKEN_KEY } from '@/shared/config/auth'
import ProfilePage from '@/views/profile/ui'
import { cookies } from 'next/headers'
import { FC } from 'react'

interface Props {}

const Profile: FC<Props> = async ({}) => {
  const accessToken = cookies().get(ACCESS_TOKEN_KEY)?.value
  const userProfile = await getUserProfile(accessToken)

  return <ProfilePage userProfile={userProfile} />
}

export default Profile
