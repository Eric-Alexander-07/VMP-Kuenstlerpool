export const dynamic = 'force-dynamic'

import NavbarWrapper from '@/components/NavbarWrapper'
import HeroSection from '@/components/HeroSection'
import StatsBar from '@/components/StatsBar'
import BandFinderSection from '@/components/BandFinderSection'
import UspSection from '@/components/UspSection'
import KontaktCta from '@/components/KontaktCta'
import VmpFooter from '@/components/VmpFooter'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { storageUrl } from '@/lib/db-images'

export default async function HomePage() {
  const sb = await createServerSupabaseClient()

  const [{ data: heroData }, { data: eventData }] = await Promise.all([
    sb.from('hero_images').select('path, label').order('sort_order', { ascending: true }),
    sb.from('event_images').select('path, category').order('sort_order', { ascending: true }),
  ])

  const heroSlides = heroData?.length
    ? heroData.map((img: { path: string; label: string }) => ({
        src: storageUrl(img.path),
        label: img.label,
      }))
    : undefined

  const categoryImages: Record<string, string[]> = {}
  eventData?.forEach((img: { path: string; category: string }) => {
    if (!categoryImages[img.category]) categoryImages[img.category] = []
    categoryImages[img.category].push(storageUrl(img.path))
  })
  const hasCategoryImages = Object.keys(categoryImages).length > 0

  return (
    <main>
      {/* 1 — Navbar */}
      <NavbarWrapper />

      {/* 2 — Hero */}
      <HeroSection slides={heroSlides} />

      {/* 3 — Stats Bar (Gebucht von + Kategorie-Chips) */}
      <StatsBar />

      {/* 4 — Band Finder + Band der Woche */}
      <BandFinderSection categoryImages={hasCategoryImages ? categoryImages : undefined} />

      {/* 5 — Social Media */}
      <UspSection />

      {/* 6 — Kontakt */}
      <KontaktCta />

      {/* 7 — Footer */}
      <VmpFooter />
    </main>
  )
}
