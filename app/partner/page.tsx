export const revalidate = 3600

import type { Metadata } from 'next'
import NavbarWrapper from '@/components/NavbarWrapper'
import VmpFooter from '@/components/VmpFooter'
import PartnerPageClient from '@/components/PartnerPageClient'
import { getBandsForNav, getBandsMenuEntries } from '@/lib/bands'

export const metadata: Metadata = {
  title: 'Partner – Fotografen, Videografen & Bands │ Vivid Music Productions',
  description: 'Unsere Partner: Erfahrene Fotografen und Videografen für Live-Events sowie alle Bands des VMP-Künstlerpools mit ihren eigenen Websites.',
  alternates: {
    canonical: 'https://v-m-p.com/partner',
  },
  openGraph: {
    title: 'Partner │ Vivid Music Productions',
    description: 'Fotografen, Videografen und Bands – die Partner von Vivid Music Productions.',
    url: 'https://v-m-p.com/partner',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'VMP Partner' }],
  },
}

export default async function PartnerPage() {
  const [bands, bandsMenu] = await Promise.all([
    getBandsForNav(),
    getBandsMenuEntries(),
  ])

  return (
    <>
      <NavbarWrapper />
      <PartnerPageClient bands={bands} bandsMenu={bandsMenu} />
      <VmpFooter />
    </>
  )
}
