export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import NavbarWrapper from '@/components/NavbarWrapper'
import VmpFooter from '@/components/VmpFooter'
import UeberUnsPageClient from '@/components/UeberUnsPageClient'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { storageUrl } from '@/lib/db-images'

export const metadata: Metadata = {
  title: 'Über uns – Vivid Music Productions',
  description: 'Das Team hinter Vivid Music Productions. 20+ Jahre Erfahrung im Event Business, direkte Kommunikation und Vollservice aus einer Hand.',
}

export default async function UeberUnsPage() {
  const sb = await createServerSupabaseClient()
  const { data } = await sb
    .from('page_images')
    .select('path, section')
    .eq('page', 'ueber-uns')
    .order('sort_order', { ascending: true })

  const bySection = (section: string) =>
    (data ?? []).filter((img: { section: string }) => img.section === section)
               .map((img: { path: string }) => storageUrl(img.path))

  return (
    <>
      <NavbarWrapper />
      <UeberUnsPageClient
        heroUrl={bySection('hero')[0]}
        introUrl={bySection('intro')[0]}
        teamUrls={bySection('team')}
      />
      <VmpFooter />
    </>
  )
}
