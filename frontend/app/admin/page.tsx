import { APP_ROUTES } from '@/shared/config';
import { Button } from '@/shared/ui';
import { Card, CardContent, CardHeader } from '@/shared/ui/card';
import Link from 'next/link';
import React, { FC } from 'react';

interface Props { }

const Admin: FC<Props> = ({ }) => {
    return <div className='p-4'>
        <Card>
            <Link href={APP_ROUTES.HOME}>
                <Button variant='outline' className='m-2'>Back</Button>
            </Link>
            <CardHeader className='text-center text-xl'>
                Admin Panel
            </CardHeader>

            <CardContent>
                <Link href={APP_ROUTES.ADMIN.MUSCLE_GROUPS}>
                    <Button className='w-full'>Muscle groups</Button>
                </Link>
            </CardContent>


            <CardContent>
                <Link href={APP_ROUTES.ADMIN.EXERCISES}>
                    <Button className='w-full'>Exercises</Button>
                </Link>
            </CardContent>
        </Card>
    </div>;
};

export default Admin;