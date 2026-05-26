export const revalidate = 3600

import type { Metadata } from 'next'
import NavbarWrapper from '@/components/NavbarWrapper'
import VmpFooter from '@/components/VmpFooter'
import TechnikPageClient from '@/components/TechnikPageClient'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { storageUrl } from '@/lib/db-images'
import { getBandsMenuEntries } from '@/lib/bands'

export const metadata: Metadata = {
  title: 'Veranstaltungstechnik – Vollservice für Live-Events und Tonstudio │ VMP',
  description: 'Wir bieten Gesamtpakete, Liveband und PA-Beschallungstechnik aus einer Hand mit Bühne, Ton- und Lichttechnik. Außerdem betreiben wir ein Tonstudio mit Musikproduktion, Auftragskomposition und Jingle Erstellung.',
  keywords: [
    'Veranstaltungstechnik buchen Frankfurt',
    'Tonstudio Rhein-Main',
    'Bühnentechnik mieten Frankfurt',
    'Musikproduktion',
    'Auftragskomposition',
    'Licht Ton Bühne',
    'Musikproduktion Frankfurt',
    'Vivid Music Productions',
    'Jingle Erstellung',
    'Demo Produktion',
  ],
  openGraph: {
    title: 'Veranstaltungstechnik – Vollservice für Live-Events und Tonstudio │ VMP',
    description: 'Gesamtpakete mit Liveband und PA-Beschallungstechnik aus einer Hand: Bühne, Ton- und Lichttechnik sowie Tonstudio mit Musikproduktion und Jingle Erstellung.',
    url: 'https://v-m-p.com/technik',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'VMP Veranstaltungstechnik & Tonstudio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Veranstaltungstechnik & Tonstudio │ VMP',
    description: 'Gesamtpakete mit Liveband, PA-Beschallungstechnik und Tonstudio aus einer Hand.',
  },
  alternates: {
    canonical: 'https://v-m-p.com/technik',
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
