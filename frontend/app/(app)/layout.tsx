import { NavigationMenu } from '@/widgets/NavigationMenu'
import { ReactElement } from 'react'

interface AppLayoutProps {
  children: ReactElement
}

export default function Layout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-screen flex-col">
      <main className="flex-grow overflow-y-auto p-4">{children}</main>
      <NavigationMenu />
    </div>
  )
}
