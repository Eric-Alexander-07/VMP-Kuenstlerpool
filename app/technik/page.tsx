export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import NavbarWrapper from '@/components/NavbarWrapper'
import VmpFooter from '@/components/VmpFooter'
import TechnikPageClient from '@/components/TechnikPageClient'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { storageUrl } from '@/lib/db-images'

export const metadata: Metadata = {
  title: 'Technik & Tonstudio – Vivid Music Productions',
  description: 'Vollservice aus einer Hand: PA-Technik, Bühne, Licht, Musikproduktion und Songwriting seit 20 Jahren.',
}

export default async function TechnikPage() {
  const sb = await createServerSupabaseClient()
  const { data } = await sb
    .from('page_images')
    .select('path, section')
    .eq('page', 'technik')
    .order('sort_order', { ascending: true })

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
      />
      <VmpFooter />
    </>
  )
}
