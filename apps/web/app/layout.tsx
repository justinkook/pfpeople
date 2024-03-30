import type { Metadata } from 'next'
import localFont from 'next/font/local'

import '@/styles/globals.css'

import { cn } from '@/lib/utils'
import { Providers } from '@/components/providers/providers'

const fontLimerick = localFont({
  src: '../public/fonts/Limerick-ExtraBold-Regular.ttf',
  variable: '--font-limerick',
})

export const metadata: Metadata = {
  title: 'PFPeople',
  description: 'PFPeople',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          `min-h-screen bg-background font-sans antialiased bg-[url('/images/radial.png')]`,
          fontLimerick.variable
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
