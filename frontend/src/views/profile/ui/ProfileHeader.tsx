import { FC } from 'react';

import { useTranslation } from '@/shared/lib';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { CardHeader, CardTitle } from '@/shared/ui/card';

interface ProfileHeaderProps {
    username: string;
    email: string | undefined;
    avatarUrl: string | undefined;
}

export const ProfileHeader: FC<ProfileHeaderProps> = ({ username, email, avatarUrl }) => {
    const { t } = useTranslation();

    return (
        <CardHeader className="flex items-center gap-4">
            <Avatar className="size-16">
                {avatarUrl ? (
                    <AvatarImage src={avatarUrl}
alt={t('avatar')} />
                ) : (
                    <AvatarFallback className="text-lg uppercase">{username ? username[0] : 'U'}</AvatarFallback>
                )}
            </Avatar>
            <div>
                <CardTitle className="text-center text-lg font-bold">{username || t('user')}</CardTitle>
                <p className="text-sm text-muted-foreground">{email}</p>
            </div>
        </CardHeader>
    );
};
