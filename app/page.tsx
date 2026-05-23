export const revalidate = 3600

import type { Metadata } from 'next'
import NavbarWrapper from '@/components/NavbarWrapper'

export const metadata: Metadata = {
  title: 'Livemusik buchen im Rhein-Main-Gebiet | Vivid Music Productions',
  description:
    'Vivid Music Productions – Ihr Künstlerpool für Live-Events seit 20 Jahren. Partybands, Tribute Bands und Easy Listening direkt buchbar in Frankfurt und Rhein-Main. Jetzt unverbindlich anfragen.',
  keywords: [
    'Band buchen Frankfurt',
    'Liveband Rhein-Main',
    'Hochzeitsband Frankfurt',
    'Coverband buchen',
    'Partyband mieten',
    'Live Musik Event',
    'Vivid Music Productions',
    'VMP Künstlerpool',
  ],
  openGraph: {
    title: 'Livemusik buchen im Rhein-Main-Gebiet | Vivid Music Productions',
    description:
      'Partybands, Tribute Bands und Easy Listening – direkt buchbar seit 20 Jahren. Keine Agenturgebühren, direkter Kontakt.',
    url: 'https://v-m-p.de',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Vivid Music Productions – Live Musik Frankfurt' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Livemusik buchen im Rhein-Main-Gebiet | VMP',
    description:
      'Partybands, Tribute Bands und Easy Listening – direkt buchbar seit 20 Jahren.',
  },
  alternates: {
    canonical: 'https://v-m-p.de',
  },
}
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

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Vivid Music Productions',
    description: 'Künstlerpool für professionelle Live-Musik im Rhein-Main-Gebiet – Partybands, Tribute Bands und Easy Listening seit 20 Jahren.',
    url: 'https://v-m-p.de',
    telephone: '+4960787595688',
    email: 'info@v-m-p.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Westring 20',
      addressLocality: 'Groß-Umstadt',
      postalCode: '64823',
      addressCountry: 'DE',
    },
    areaServed: ['Frankfurt am Main', 'Rhein-Main', 'Hessen'],
    serviceType: ['Liveband buchen', 'Künstler buchen', 'Live Musik Events', 'Hochzeitsband', 'Partyband', 'Tribute Band'],
    foundingDate: '2001',
    priceRange: '€€€',
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
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
