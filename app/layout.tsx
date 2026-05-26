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
    'Seit 20 Jahren Ihr Partner für unvergessliche Live-Events. Partybands, Tribute Bands und Easy Listening – direkt buchbar im Rhein-Main-Gebiet.',
  metadataBase: new URL('https://v-m-p.com'),
  openGraph: {
    title: 'Vivid Music Productions – Livemusik im Rhein-Main-Gebiet',
    description:
      'Seit 20 Jahren Ihr Partner für unvergessliche Live-Events. Partybands, Tribute Bands und Easy Listening – direkt buchbar im Rhein-Main-Gebiet.',
    type: 'website',
    locale: 'de_DE',
    siteName: 'Vivid Music Productions',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Vivid Music Productions – Live Musik im Rhein-Main-Gebiet',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vivid Music Productions – Livemusik im Rhein-Main-Gebiet',
    description:
      'Seit 20 Jahren Ihr Partner für unvergessliche Live-Events. Partybands, Tribute Bands und Easy Listening – direkt buchbar.',
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
