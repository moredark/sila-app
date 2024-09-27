import React, { FC } from 'react';

import { useUserStore } from '@/entities/user';
import { useTranslation } from '@/shared/lib';
import { Button } from '@/shared/ui';

interface Props { }

export const LogoutButton: FC<Props> = ({ }) => {
    const { t } = useTranslation()

    const { logout } = useUserStore()

    const handleLogout = () => {
        logout();
    }

    return <Button onClick={handleLogout}
variant='outline'
className='w-full border-destructive text-red-700'>{t("logout")}</Button>;
};
