import { APP_ROUTES } from '@/shared/config'
import { Button } from '@/shared/ui'
import { Card, CardContent, CardHeader } from '@/shared/ui/card'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import React, { Suspense } from 'react'

// Создаем компонент с содержимым админ-панели
const AdminPanelContent = () => {
  return (
    <div className="p-4">
      <Card>
        <Link href={APP_ROUTES.HOME}>
          <Button variant="outline" className="m-2">
            Back
          </Button>
        </Link>
        <CardHeader className="text-center text-xl">Admin Panel</CardHeader>

        <CardContent>
          <Link href={APP_ROUTES.ADMIN.MUSCLE_GROUPS}>
            <Button className="w-full">Muscle groups</Button>
          </Link>
        </CardContent>

        <CardContent>
          <Link href={APP_ROUTES.ADMIN.EXERCISES}>
            <Button className="w-full">Exercises</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

const DynamicAdminPanel = dynamic(() => Promise.resolve(AdminPanelContent), {
  loading: () => <div className="flex justify-center p-4">Loading...</div>,
  ssr: true,
})

const Admin = () => {
  return <DynamicAdminPanel />
}

export default Admin
