import { NavigationMenu } from '@/widgets/NavigationMenu/NavigationMenu'
import { ReactElement } from 'react'

export default function Layout({ children }: { children: ReactElement }) {
  return (
    <>
      <div className="flex h-screen flex-col">
        <main className="flex-grow overflow-y-auto pb-16">{children}</main>
        <NavigationMenu />
      </div>
    </>
  )
}
