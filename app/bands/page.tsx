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
  title: 'Bands – Vivid Music Productions',
  description: '10 Profi-Bands für Firmenevents, Hochzeiten und Festivals – direkt buchbar über Vivid Music Productions im Rhein-Main-Gebiet.',
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
