import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

export async function I18Provider({ children }: React.PropsWithChildren) {
  const messages = await getMessages()

  return <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
}
