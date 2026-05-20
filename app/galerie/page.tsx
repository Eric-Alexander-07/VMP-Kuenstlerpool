import type { Metadata } from 'next'
import NavbarWrapper from '@/components/NavbarWrapper'
import VmpFooter from '@/components/VmpFooter'
import GalleryPageClient from '@/components/GalleryPageClient'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { storageUrl, assignGridSpan } from '@/lib/db-images'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Galerie – Vivid Music Productions',
  description: 'Eindrücke von unvergesslichen Live-Events, Bands und dem Tonstudio von Vivid Music Productions.',
}

export default async function GaleriePage() {
  const sb = await createServerSupabaseClient()

  const [{ data: headerData }, { data: gridData }] = await Promise.all([
    sb.from('gallery_images').select('path').eq('image_type', 'header').order('sort_order', { ascending: true }).limit(1),
    sb.from('gallery_images').select('path').eq('image_type', 'grid').order('sort_order', { ascending: true }),
  ])

  const headerBg = headerData?.[0] ? storageUrl((headerData[0] as { path: string }).path) : undefined

  const photos = gridData?.length
    ? gridData.map((img: { path: string }, i: number) => ({
        src: storageUrl(img.path),
        label: '',
        ...assignGridSpan(i),
      }))
    : undefined

  return (
    <>
      <NavbarWrapper />
      <GalleryPageClient photos={photos} headerBg={headerBg} />
      <VmpFooter />
    </>
  )
}
