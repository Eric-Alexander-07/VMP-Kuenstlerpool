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
import { getBandsMenuEntries } from '@/lib/bands'
import { getCategoryLabel } from '@/types/band'

export default async function HomePage() {
  const sb = await createServerSupabaseClient()

  const [{ data: heroData }, { data: eventData }, bandsMenu, { data: bandsData }, { data: showcaseData }] = await Promise.all([
    sb.from('hero_images').select('path, label').order('sort_order', { ascending: true }),
    sb.from('event_images').select('path, category').order('sort_order', { ascending: true }),
    getBandsMenuEntries(),
    sb.from('bands').select('slug, name, category, tagline, short_description').eq('published', true).order('sort_order', { ascending: true }),
    sb.from('band_images').select('band_slug, path').eq('role', 'showcase').order('sort_order', { ascending: true }),
  ])

  const showcaseImageMap: Record<string, string> = {}
  showcaseData?.forEach((img: { band_slug: string; path: string }) => {
    if (!showcaseImageMap[img.band_slug]) showcaseImageMap[img.band_slug] = storageUrl(img.path)
  })

  const bands = (bandsData ?? []) as { slug: string; name: string; category: 'partyband' | 'tribute' | 'easy-listening'; tagline: string; short_description: string }[]
  const weeklyBand = bands.length > 0 ? (() => {
    const weekNumber = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000))
    const b = bands[weekNumber % bands.length]
    return {
      name: b.name,
      genre: b.tagline,
      category: getCategoryLabel(b.category),
      description: b.short_description,
      href: `/${b.slug}`,
      image: showcaseImageMap[b.slug] ?? '',
    }
  })() : undefined

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
      <HeroSection slides={heroSlides} bandsMenu={bandsMenu} />

      {/* 3 — Stats Bar (Gebucht von + Kategorie-Chips) */}
      <StatsBar />

      {/* 4 — Band Finder + Band der Woche */}
      <BandFinderSection categoryImages={hasCategoryImages ? categoryImages : undefined} weeklyBand={weeklyBand} />

      {/* 5 — Social Media */}
      <UspSection />

      {/* 6 — Kontakt */}
      <KontaktCta />

      {/* 7 — Footer */}
      <VmpFooter />
    </main>
  )
}
