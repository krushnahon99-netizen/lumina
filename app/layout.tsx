import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  title: 'Echo Technology — Fabric mod for Minecraft 1.21.1',
  description:
    'Download the latest Echo Technology build, a sculk-tech Fabric mod for Minecraft Java 1.21.1, with install steps for mobile launchers.',
  generator: 'v0.app',
  icons: {
    icon: '/mod/icon.png',
    apple: '/mod/icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0b1418',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} bg-background`}>
      <body className="min-h-dvh bg-[radial-gradient(120%_50%_at_50%_0%,#0f3b44_0%,transparent_70%)] bg-no-repeat font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
