import { Settings } from 'lucide-react';
import Link from 'next/link';

import { APP_ROUTES } from '@/shared/config';
import { useTranslation } from '@/shared/lib';
import { Button } from '@/shared/ui/button';

export const SettingsButton = () => {
    const { t } = useTranslation();

    return (
        <Link href={APP_ROUTES.SETTINGS}>
            <Button variant="ghost"
className="absolute right-0 top-2">
                <Settings className="size-6" />
                <span className="sr-only">{t('settings')}</span>
            </Button>
        </Link>
    );
};
