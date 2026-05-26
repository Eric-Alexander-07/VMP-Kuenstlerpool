import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import VmpFooter from '@/components/VmpFooter'
import BandPageClient from '@/components/BandPageClient'
import { bandsData, bandsBySlug, getCategoryMeta } from '@/lib/bands-data'

// ── Static params ──────────────────────────────────────────────────

export function generateStaticParams() {
  return bandsData.map((band) => ({ slug: band.slug }))
}

// ── Metadata ───────────────────────────────────────────────────────

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const band = bandsBySlug[slug]
  if (!band) return { title: 'Band nicht gefunden – VMP' }
  return {
    title: `${band.name} – Vivid Music Productions`,
    description: band.tagline,
  }
}

// ── Page ───────────────────────────────────────────────────────────

export default async function BandPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const band = bandsBySlug[slug]
  if (!band) notFound()

  const { label: categoryLabel } = getCategoryMeta(band.category)

  const related = bandsData
    .filter((b) => b.category === band.category && b.slug !== band.slug)
    .slice(0, 3)

  const mailtoHref = `mailto:info@v-m-p.com?subject=Bandanfrage%3A%20${encodeURIComponent(band.name)}&body=Band%3A%20${encodeURIComponent(band.name)}%0AVeranstaltung%3A%20%0ADatum%3A%20%0AOrt%3A%20`
  const whatsappHref = `https://wa.me/4960787595868?text=${encodeURIComponent(`Hallo, ich interessiere mich für ${band.name}.`)}`
  const fbPageUrl = band.facebookUrl ?? 'https://www.facebook.com/vividmusicproductions'
  const fbEmbedSrc = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(fbPageUrl)}&tabs=timeline&width=340&height=460&small_header=true&adapt_container_width=false&hide_cover=false&show_facepile=false`

  const infoItems = [
    { label: 'Besetzung', value: band.besetzung },
    { label: 'Spielzeit', value: band.spielzeit },
    { label: 'Geeignet für', value: band.geeignetFuer.join(' · ') },
    { label: 'Region', value: band.region },
  ]

  const avgRating = band.reviews?.length
    ? Math.round(band.reviews.reduce((s, r) => s + r.rating, 0) / band.reviews.length)
    : null

  return (
    <>
      <Navbar />
      <BandPageClient
        band={band}
        related={related}
        categoryLabel={categoryLabel}
        mailtoHref={mailtoHref}
        whatsappHref={whatsappHref}
        fbEmbedSrc={fbEmbedSrc}
        avgRating={avgRating}
        infoItems={infoItems}
      />
      <VmpFooter />
    </>
  )
}
