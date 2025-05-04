import Providers from '@/app/providers/Providers'
import { Toaster } from '@/shared/ui'
import { getLocale } from 'next-intl/server'
import '../src/app/styles/globals.css'
import { geistSans, geistMono } from '@/shared/config/fonts'
import { metadata } from '@/shared/config/metadata'
import { viewport } from '@/shared/config/viewport'

export { metadata, viewport }

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
            <main className="h-full">{children}</main>
          <Toaster position="top-right" richColors />
        </Providers>
      </body>
    </html>
  )
}
