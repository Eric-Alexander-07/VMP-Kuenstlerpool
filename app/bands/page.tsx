export const revalidate = 60

import type { Metadata } from 'next'
import NavbarWrapper from '@/components/NavbarWrapper'
import BandShowcase from '@/components/BandShowcase'
import BandsCta from '@/components/BandsCta'
import VmpFooter from '@/components/VmpFooter'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { storageUrl } from '@/lib/db-images'
import { getBandsByCategory, getBandsMenuEntries, bandsToBandCards } from '@/lib/bands'

export const metadata: Metadata = {
  title: 'Unser Band Repertoire buchen │ Vivid Music Productions',
  description: 'Entdecken Sie unser Band Repertoire in mehreren Kategorien: Partybands, Tribute Bands und Easy Listening für Firmenfeiern, Hochzeiten, Stadtfeste und High Class Events aller Art.',
  keywords: [
    'Bands buchen',
    'Partyband Frankfurt',
    'Tribute Band buchen',
    'Eventband Darmstadt',
    'Musik Band',
    'Hochzeitsband Rhein-Main',
    'Liveband Darmstadt',
    'Vivid Music Productions',
    'Livemusik Aschaffenburg',
    'Akustik Band Dinner Lounge',
  ],
  openGraph: {
    title: 'Unser Band Repertoire buchen │ Vivid Music Productions',
    description: 'Partybands, Tribute Bands und Easy Listening für Firmenfeiern, Hochzeiten, Stadtfeste und High Class Events aller Art.',
    url: 'https://v-m-p.de/bands',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'VMP Bands & Künstler' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unser Band Repertoire buchen │ VMP',
    description: 'Partybands, Tribute Bands und Easy Listening für Firmenfeiern, Hochzeiten, Stadtfeste und High Class Events.',
  },
  alternates: {
    canonical: 'https://v-m-p.de/bands',
  },
}

export default async function BandsPage() {
  const [{ partyBands, tributeBands, easyBands }, bandsMenu, showcaseData] = await Promise.all([
    getBandsByCategory(),
    getBandsMenuEntries(),
    (async () => {
      const sb = await createServerSupabaseClient()
      const { data } = await sb
        .from('band_images')
        .select('band_slug, path')
        .eq('role', 'showcase')
        .order('sort_order', { ascending: true })
      return data
    })(),
  ])

  const showcaseImages: Record<string, string> = {}
  showcaseData?.forEach((img: { band_slug: string; path: string }) => {
    if (!showcaseImages[img.band_slug]) {
      showcaseImages[img.band_slug] = storageUrl(img.path)
    }
  })

  return (
    <main>
      <NavbarWrapper />
      <BandShowcase
        partyBands={bandsToBandCards(partyBands, showcaseImages)}
        tributeBands={bandsToBandCards(tributeBands, showcaseImages)}
        easyBands={bandsToBandCards(easyBands, showcaseImages)}
        bandsMenu={bandsMenu}
      />
      <BandsCta />
      <VmpFooter />
    </main>
  )
}
