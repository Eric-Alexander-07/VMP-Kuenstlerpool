export const revalidate = 3600

import type { Metadata } from 'next'
import NavbarWrapper from '@/components/NavbarWrapper'
import VmpFooter from '@/components/VmpFooter'
import TechnikPageClient from '@/components/TechnikPageClient'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { storageUrl } from '@/lib/db-images'
import { getBandsMenuEntries } from '@/lib/bands'

export const metadata: Metadata = {
  title: 'Technik & Tonstudio – Vollservice für Live-Events | VMP',
  description: 'Vivid Music Productions bietet Vollservice aus einer Hand: PA-Beschallung, Bühne, Lichttechnik, Musikproduktion und Songwriting im Rhein-Main-Gebiet seit 20 Jahren.',
  keywords: ['PA-Technik mieten Frankfurt', 'Tonstudio Rhein-Main', 'Bühnentechnik', 'Licht Technik Event', 'Musikproduktion Frankfurt', 'Vivid Music Productions'],
  openGraph: {
    title: 'Technik & Tonstudio | Vivid Music Productions',
    description: 'PA-Beschallung, Bühne, Lichttechnik und Musikproduktion aus einer Hand im Rhein-Main-Gebiet.',
    url: 'https://v-m-p.de/technik',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'VMP Technik & Tonstudio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Technik & Tonstudio | VMP',
    description: 'PA-Beschallung, Bühne, Lichttechnik und Musikproduktion aus einer Hand.',
  },
  alternates: {
    canonical: 'https://v-m-p.de/technik',
  },
}

export default async function TechnikPage() {
  const sb = await createServerSupabaseClient()
  const [{ data }, bandsMenu] = await Promise.all([
    sb.from('page_images').select('path, section').eq('page', 'technik').order('sort_order', { ascending: true }),
    getBandsMenuEntries(),
  ])

  const bySection = (section: string) =>
    (data ?? []).filter((img: { section: string }) => img.section === section)
               .map((img: { path: string }) => storageUrl(img.path))

  return (
    <>
      <NavbarWrapper />
      <TechnikPageClient
        heroUrl={bySection('hero')[0]}
        mainUrl={bySection('main')[0]}
        thumbnailUrls={bySection('thumbnails')}
        songwritingUrl={bySection('songwriting')[0]}
        bandsMenu={bandsMenu}
      />
      <VmpFooter />
    </>
  )
}
