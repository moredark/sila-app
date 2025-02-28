'use client'

import { FC } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { Card, CardContent } from '@/shared/ui/card'

interface UserInfoProps {
    user: {
        avatar_url?: string
        username?: string
        email?: string
    }
}

export const UserInfo: FC<UserInfoProps> = ({ user }) => {
    const { avatar_url, username, email } = user

    return (
        <Card>
            <CardContent className="flex items-center gap-4 p-4">
                <Avatar className="h-12 w-12">
                    <AvatarImage src={avatar_url} />
                    <AvatarFallback>{username?.[0]?.toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                    <h3 className="text-lg font-semibold">{username}</h3>
                    <p className="text-sm text-muted-foreground">{email}</p>
                </div>
            </CardContent>
        </Card>
    )
} 