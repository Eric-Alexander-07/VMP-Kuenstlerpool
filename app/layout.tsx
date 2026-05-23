import type { Metadata, Viewport } from 'next'
import { Bebas_Neue, Inter } from 'next/font/google'
import './globals.css'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

// Safari/iOS: viewport-fit=cover enables content behind the notch safe area
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  title: 'Vivid Music Productions – Livemusik im Rhein-Main-Gebiet',
  description:
    'Seit 20 Jahren Ihr Partner für unvergessliche Live-Events. 10 Bands in den Kategorien Easy Listening, Partybands und Tribute Bands.',
  metadataBase: new URL('https://v-m-p.de'),
  openGraph: {
    title: 'Vivid Music Productions',
    description:
      'Livemusik auf höchstem Niveau – seit 20 Jahren Ihr Partner für unvergessliche Events.',
    type: 'website',
    locale: 'de_DE',
  },
  // iOS home-screen bookmark: standalone mode + translucent status bar
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className={`${bebasNeue.variable} ${inter.variable}`}>
      <body>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
