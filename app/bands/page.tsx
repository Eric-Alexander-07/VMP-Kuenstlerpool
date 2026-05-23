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
  title: 'Alle Bands & Künstler buchen | Vivid Music Productions',
  description: 'Entdecken Sie unser Ensemble: Partybands, Tribute Bands und Easy Listening – 10 Profi-Formationen für Firmenevents, Hochzeiten und Festivals direkt buchbar im Rhein-Main-Gebiet.',
  keywords: ['Bands buchen', 'Partyband Frankfurt', 'Tribute Band buchen', 'Hochzeitsband Rhein-Main', 'Liveband mieten', 'Vivid Music Productions'],
  openGraph: {
    title: 'Alle Bands & Künstler | Vivid Music Productions',
    description: 'Partybands, Tribute Bands und Easy Listening – 10 Profi-Formationen direkt buchbar im Rhein-Main-Gebiet.',
    url: 'https://v-m-p.de/bands',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'VMP Bands & Künstler' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alle Bands & Künstler | VMP',
    description: 'Partybands, Tribute Bands und Easy Listening – direkt buchbar im Rhein-Main-Gebiet.',
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
