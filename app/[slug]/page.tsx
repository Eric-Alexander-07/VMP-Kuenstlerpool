import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import NavbarWrapper from '@/components/NavbarWrapper'
import VmpFooter from '@/components/VmpFooter'
import BandPageClient from '@/components/BandPageClient'
import { getRelatedBands, getBandsMenuEntries } from '@/lib/bands'
import { bandRowToBand, getCategoryLabel } from '@/types/band'
import { storageUrl } from '@/lib/db-images'
import { getBands, getBandBySlug, getAllBandImages } from '@/lib/vmp-data'
import { buildInquiryMailHref } from '@/lib/inquiryMail'

const BASE_URL = 'https://v-m-p.com'

export const revalidate = 3600

// ── Static paths ───────────────────────────────────────────────────

export async function generateStaticParams() {
  const bands = await getBands()
  return bands.map(b => ({ slug: b.slug }))
}

// ── Metadata ───────────────────────────────────────────────────────

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const bandData = await getBandBySlug(slug)
  if (!bandData) return { title: 'Künstler nicht gefunden | VMP', robots: { index: false } }

  const { band, images } = bandData
  const heroImg = images.find(img => img.role === 'hero')
  const ogImageUrl = heroImg ? storageUrl(heroImg.path) : '/og-image.jpg'
  const description = band.short_description || band.tagline
  const title = `${band.name} │ VMP`
  const url = `${BASE_URL}/${slug}`
  const categoryLabel = getCategoryLabel(band.category)

  return {
    title,
    description,
    keywords: [
      `${band.name} buchen`,
      band.name,
      `${band.name} Eventband`,
      categoryLabel,
      `${categoryLabel} Frankfurt`,
      'Band buchen Frankfurt',
      'Live Musik Rhein-Main',
      'Vivid Music Productions',
    ],
    openGraph: {
      title,
      description,
      url,
      type: 'profile',
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: `${band.name} – Live Musik` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  }
}

// ── Page ───────────────────────────────────────────────────────────

export default async function BandPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const [bandData, allBandImages, bandsMenu] = await Promise.all([
    getBandBySlug(slug),
    getAllBandImages(),
    getBandsMenuEntries(),
  ])
  if (!bandData) notFound()

  const { band: bandRow, images: imgData, reviews: reviewData } = bandData

  const heroRecord = imgData.find(img => img.role === 'hero')
  const heroUrl = heroRecord ? storageUrl(heroRecord.path) : undefined
  const dbImages = imgData
    .filter(img => img.role === 'gallery')
    .map(img => storageUrl(img.path))

  const reviews = reviewData as import('@/lib/bands-data').Review[]

  const categoryLabel = getCategoryLabel(bandRow.category)

  const relatedRows = await getRelatedBands(slug, bandRow.category)

  const relatedSlugs = relatedRows.map(b => b.slug)
  const relatedImageMap: Record<string, string> = {}
  if (relatedSlugs.length > 0) {
    allBandImages
      .filter(img => relatedSlugs.includes(img.band_slug))
      .forEach(img => {
        if (!relatedImageMap[img.band_slug] || img.role === 'hero') {
          relatedImageMap[img.band_slug] = storageUrl(img.path)
        }
      })
  }

  const related = relatedRows.map(row => {
    const b = bandRowToBand(row)
    const img = relatedImageMap[row.slug]
    return img ? { ...b, images: [img] } : b
  })

  const band = bandRowToBand(bandRow)

  const mailtoHref = buildInquiryMailHref({ bandName: band.name })
  const fbEmbedSrc = band.facebookUrl
    ? `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(band.facebookUrl)}&tabs=timeline&width=340&height=720&small_header=true&adapt_container_width=false&hide_cover=false&show_facepile=false`
    : undefined

  const avgRating = reviews.length
    ? Math.round(reviews.reduce((s, r) => s + r.rating, 0) / reviews.length)
    : null

  const musicGroupSchema = {
    '@context': 'https://schema.org',
    '@type': 'MusicGroup',
    name: band.name,
    description: band.description || band.tagline,
    genre: getCategoryLabel(bandRow.category),
    url: `${BASE_URL}/${slug}`,
    ...(heroUrl && { image: heroUrl }),
    memberOf: {
      '@type': 'Organization',
      name: 'Vivid Music Productions',
      url: BASE_URL,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(musicGroupSchema) }}
      />
      <NavbarWrapper />
      <BandPageClient
        band={band}
        related={related}
        categoryLabel={categoryLabel}
        mailtoHref={mailtoHref}
        fbEmbedSrc={fbEmbedSrc}
        instagramUrl={band.instagramUrl}
        avgRating={avgRating}
        heroUrl={heroUrl}
        dbImages={dbImages?.length ? dbImages : undefined}
        reviews={reviews}
        bandsMenu={bandsMenu}
      />
      <VmpFooter />
    </>
  )
}
