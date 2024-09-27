import { APP_ROUTES } from '@/shared/config'
import { redirect } from 'next/navigation'

export default async function Home() {
  redirect(APP_ROUTES.AUTH.LOGIN)
}
