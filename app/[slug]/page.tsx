import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { createClient } from '@supabase/supabase-js'
import NavbarWrapper from '@/components/NavbarWrapper'
import VmpFooter from '@/components/VmpFooter'
import BandPageClient from '@/components/BandPageClient'
import { getBandBySlug, getRelatedBands, getBandsMenuEntries } from '@/lib/bands'
import { bandRowToBand, getCategoryLabel } from '@/types/band'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { storageUrl } from '@/lib/db-images'

const BASE_URL = 'https://v-m-p.com'

export const revalidate = 3600

// ── Static paths ───────────────────────────────────────────────────

export async function generateStaticParams() {
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const { data } = await sb
    .from('bands')
    .select('slug')
    .eq('published', true)
  return (data ?? []).map((r: { slug: string }) => ({ slug: r.slug }))
}

// ── Metadata ───────────────────────────────────────────────────────

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const band = await getBandBySlug(slug)
  if (!band) return { title: 'Künstler nicht gefunden | VMP', robots: { index: false } }

  // Fetch hero image for OG (public client — safe at build time)
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const { data: heroImg } = await sb
    .from('band_images')
    .select('path')
    .eq('band_slug', slug)
    .eq('role', 'hero')
    .limit(1)
    .single()

  const ogImageUrl = heroImg ? storageUrl((heroImg as { path: string }).path) : '/og-image.jpg'
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
  const [bandRow, sb, bandsMenu] = await Promise.all([
    getBandBySlug(slug),
    createServerSupabaseClient(),
    getBandsMenuEntries(),
  ])
  if (!bandRow) notFound()

  const [{ data: imgData }, { data: reviewData }] = await Promise.all([
    sb.from('band_images').select('path, role').eq('band_slug', slug).order('sort_order', { ascending: true }),
    sb.from('reviews').select('name, rating, text, date, platform').eq('band_slug', slug).order('created_at', { ascending: true }),
  ])

  const heroRecord = imgData?.find((img: { role: string }) => img.role === 'hero')
  const heroUrl = heroRecord ? storageUrl((heroRecord as { path: string }).path) : undefined
  const dbImages = imgData
    ?.filter((img: { role: string }) => img.role === 'gallery')
    .map((img: { path: string }) => storageUrl(img.path))

  const reviews = (reviewData ?? []) as import('@/lib/bands-data').Review[]

  const categoryLabel = getCategoryLabel(bandRow.category)

  const relatedRows = await getRelatedBands(slug, bandRow.category)

  // Fetch the first available image for each related band
  const relatedSlugs = relatedRows.map(b => b.slug)
  let relatedImageMap: Record<string, string> = {}
  if (relatedSlugs.length > 0) {
    const { data: relatedImgs } = await sb
      .from('band_images')
      .select('band_slug, path, role')
      .in('band_slug', relatedSlugs)
      .order('sort_order', { ascending: true })

      // Prefer hero image, fall back to first gallery image
      ; (relatedImgs ?? []).forEach((img: { band_slug: string; path: string; role: string }) => {
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

  const mailtoHref = `mailto:info@v-m-p.com?subject=Bandanfrage%3A%20${encodeURIComponent(band.name)}&body=Band%3A%20${encodeURIComponent(band.name)}%0AVeranstaltung%3A%20%0ADatum%3A%20%0AOrt%3A%20`
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
