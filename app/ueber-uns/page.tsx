export const revalidate = 3600

import type { Metadata } from 'next'
import NavbarWrapper from '@/components/NavbarWrapper'
import VmpFooter from '@/components/VmpFooter'
import UeberUnsPageClient from '@/components/UeberUnsPageClient'
import { storageUrl } from '@/lib/db-images'
import { getBandsMenuEntries } from '@/lib/bands'
import { getPageImages } from '@/lib/vmp-data'

export const metadata: Metadata = {
  title: 'Über uns – Livemusik im Rhein-Main-Gebiet │ VMP',
  description: 'Lernen Sie das Team hinter Vivid Music Productions kennen: 20+ Jahre Erfahrung im Event-Business, direkte Kommunikation ohne Agenturgebühren und Vollservice aus einer Hand.',
  keywords: [
    'Vivid Music Productions Team',
    'Bobby Stöcker',
    'Künstlerpool Frankfurt',
    'Geschäftsführer',
    'Über uns VMP',
    'Live Musik Agentur Rhein-Main',
    'Musikalischer Leiter',
    'Musical Director',
  ],
  openGraph: {
    title: 'Über uns – Livemusik im Rhein-Main-Gebiet │ VMP',
    description: '20+ Jahre Erfahrung im Event-Business. Direkter Kontakt, keine Agenturgebühren, Vollservice aus einer Hand.',
    url: 'https://v-m-p.com/ueber-uns',
    type: 'profile',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Das Team von Vivid Music Productions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Über uns │ Vivid Music Productions',
    description: '20+ Jahre Erfahrung im Event-Business. Direkter Kontakt, keine Agenturgebühren.',
  },
  alternates: {
    canonical: 'https://v-m-p.com/ueber-uns',
  },
}

export default async function UeberUnsPage() {
  const [data, bandsMenu] = await Promise.all([
    getPageImages('ueber-uns'),
    getBandsMenuEntries(),
  ])

  const bySection = (section: string) =>
    data.filter(img => img.section === section).map(img => storageUrl(img.path))

  return (
    <>
      <NavbarWrapper />
      <UeberUnsPageClient
        heroUrl={bySection('hero')[0]}
        introUrl={bySection('intro')[0]}
        teamUrls={bySection('team')}
        bandsMenu={bandsMenu}
      />
      <VmpFooter />
    </>
  )
}
