export const revalidate = 3600

import type { Metadata } from 'next'
import NavbarWrapper from '@/components/NavbarWrapper'

export const metadata: Metadata = {
  title: 'Livemusik aus dem Rhein-Main-Gebiet bundesweit für Events buchen │ Vivid Music Productions',
  description:
    'Profimusiker & Live Bands auf höchstem Niveau für Firmenfeiern, Hochzeiten, Stadtfeste und High Class Events. Partybands, Coverbands und Tribute Bands aus Frankfurt, Darmstadt, Aschaffenburg für Ihren Event.',
  keywords: [
    'Band buchen Frankfurt',
    'Livemusik Rhein-Main',
    'Hochzeitsband Frankfurt',
    'Coverband Aschaffenburg',
    'Band buchen Darmstadt',
    'Partyband für Firmenfeier',
    'Eventband Livemusik',
    'VMP Künstlerpool',
    'Tribute Band Darmstadt',
  ],
  openGraph: {
    title: 'Livemusik aus dem Rhein-Main-Gebiet bundesweit für Events buchen │ Vivid Music Productions',
    description:
      'Profimusiker & Live Bands auf höchstem Niveau für Firmenfeiern, Hochzeiten, Stadtfeste und High Class Events. Partybands, Coverbands und Tribute Bands aus Frankfurt, Darmstadt, Aschaffenburg.',
    url: 'https://v-m-p.com',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Vivid Music Productions – Live Musik Frankfurt' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Livemusik aus dem Rhein-Main-Gebiet bundesweit für Events buchen │ VMP',
    description:
      'Profimusiker & Live Bands auf höchstem Niveau für Firmenfeiern, Hochzeiten, Stadtfeste und High Class Events.',
  },
  alternates: {
    canonical: 'https://v-m-p.com',
  },
}
import HeroSection from '@/components/HeroSection'
import StatsBar from '@/components/StatsBar'
import BandFinderSection from '@/components/BandFinderSection'
import UspSection from '@/components/UspSection'
import KontaktCta from '@/components/KontaktCta'
import VmpFooter from '@/components/VmpFooter'
import { storageUrl } from '@/lib/db-images'
import { getBandsMenuEntries } from '@/lib/bands'
import { getCategoryLabel } from '@/types/band'
import { getBands, getAllBandImages, getHeroImages, getEventImages } from '@/lib/vmp-data'

export default async function HomePage() {
  const [heroData, eventData, bandsMenu, bandsData, allBandImages] = await Promise.all([
    getHeroImages(),
    getEventImages(),
    getBandsMenuEntries(),
    getBands(),
    getAllBandImages(),
  ])

  const showcaseImageMap: Record<string, string> = {}
  allBandImages
    .filter(img => img.role === 'showcase')
    .forEach(img => {
      if (!showcaseImageMap[img.band_slug]) showcaseImageMap[img.band_slug] = storageUrl(img.path)
    })

  const weeklyBand = bandsData.length > 0 ? (() => {
    const weekNumber = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000))
    const b = bandsData[weekNumber % bandsData.length]
    return {
      name: b.name,
      genre: b.tagline,
      category: getCategoryLabel(b.category),
      description: b.short_description,
      href: `/${b.slug}`,
      image: showcaseImageMap[b.slug] ?? '',
    }
  })() : undefined

  const heroSlides = heroData.length
    ? heroData.map(img => ({ src: storageUrl(img.path), label: img.label }))
    : undefined

  const categoryImages: Record<string, string[]> = {}
  eventData.forEach(img => {
    if (!categoryImages[img.category]) categoryImages[img.category] = []
    categoryImages[img.category].push(storageUrl(img.path))
  })
  const hasCategoryImages = Object.keys(categoryImages).length > 0

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Vivid Music Productions',
    description: 'Künstlerpool für professionelle Live-Musik im Rhein-Main-Gebiet – Partybands, Tribute Bands und Easy Listening seit 20 Jahren.',
    url: 'https://v-m-p.com',
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
