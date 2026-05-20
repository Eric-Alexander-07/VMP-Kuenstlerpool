import { notFound } from 'next/navigation'
import { ImageManager } from '../../_components/ImageManager'
import { ReviewManager } from '../../_components/ReviewManager'
import { PageHeader } from '../../_components/AdminShell'
import { ContextBanner } from '../../_components/ContextBanner'
import { AdminBackLink } from '../../_components/AdminBackLink'
import BandMetaForm from '../../_components/BandMetaForm'
import { createAdminSupabaseClient } from '@/lib/supabase-server'
import { DeleteBandButton } from '../../_components/DeleteBandButton'
import type { BandRow } from '@/types/band'

export async function generateStaticParams() {
  const { createClient } = await import('@supabase/supabase-js')
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const { data } = await sb.from('bands').select('slug')
  return (data ?? []).map((r: { slug: string }) => ({ slug: r.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return { title: `${slug} — Admin` }
}

export default async function BandAdminPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const sb = await createAdminSupabaseClient()

  const { data } = await sb
    .from('bands')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!data) notFound()
  const band = data as BandRow

  return (
    <div>
      <AdminBackLink href="/admin/bands" label="← Alle Bands" />

      <PageHeader
        title={band.name}
        subtitle={band.category}
      />

      {/* ── Metadaten bearbeiten ──────────────────────────── */}
      <div style={{
        backgroundColor: '#fff',
        border: '1px solid #E8D8C8',
        borderRadius: 12,
        padding: '28px 32px',
        marginBottom: 40,
      }}>
        <p style={{
          fontSize: 13,
          fontWeight: 700,
          fontFamily: 'var(--font-body)',
          color: '#1A1A1A',
          marginBottom: 20,
        }}>
          Band-Informationen
        </p>
        <BandMetaForm band={band} mode="edit" />
      </div>

      {/* ── Showcase-Bild ──────────────────────────────────── */}
      <ContextBanner
        location={`Bands → ${band.name} — Karte auf /bands`}
        url="/bands"
        dimensions="mind. 800 × 600 px (4:3)"
        note="Dieses Bild erscheint als Vorschaukarte auf der Bands-Übersichtsseite. Nur 1 Bild möglich — zeigt die Band am besten von vorne."
        preview="band-showcase"
      />

      <ImageManager
        table="band_images"
        folder={`bands/${slug}`}
        filter={{ column: 'band_slug', value: slug }}
        extraFilters={[{ column: 'role', value: 'showcase' }]}
        insertExtra={{ band_slug: slug, role: 'showcase' }}
        maxImages={1}
        title="Showcase-Bild"
        description="Erscheint als Karten-Bild auf der Bands-Übersichtsseite (/bands)."
      />

      <div style={{ borderTop: '1px solid #E8D8C8', margin: '8px 0 40px' }} />

      {/* ── Hintergrundbild ────────────────────────────────── */}
      <ContextBanner
        location={`/${slug} — Hero-Hintergrund`}
        url={`/${slug}`}
        dimensions="mind. 1920 × 1080 px (16:9)"
        note="Vollflächiger Hintergrund der Band-Detailseite. Wird mit dunklem Overlay überlagert — ein stimmungsvolles Bühnenfoto funktioniert am besten."
        preview="band-hero"
      />

      <ImageManager
        table="band_images"
        folder={`bands/${slug}`}
        filter={{ column: 'band_slug', value: slug }}
        extraFilters={[{ column: 'role', value: 'hero' }]}
        insertExtra={{ band_slug: slug, role: 'hero' }}
        maxImages={1}
        title="Hintergrundbild"
        description={`Hero-Hintergrund der Band-Detailseite (/${slug}).`}
      />

      <div style={{ borderTop: '1px solid #E8D8C8', margin: '8px 0 40px' }} />

      {/* ── Galerie ────────────────────────────────────────── */}
      <ContextBanner
        location={`/${slug} — Bildergalerie`}
        url={`/${slug}`}
        dimensions="mind. 1200 × 800 px (Querformat empfohlen)"
        note="Erscheinen als Foto-Grid auf der Band-Detailseite. Erstes Bild wird als Hauptbild groß dargestellt, weitere folgen im Grid und als Lightbox."
        preview="band-gallery"
      />

      <ImageManager
        table="band_images"
        folder={`bands/${slug}`}
        filter={{ column: 'band_slug', value: slug }}
        extraFilters={[{ column: 'role', value: 'gallery' }]}
        insertExtra={{ band_slug: slug, role: 'gallery' }}
        title="Galerie-Bilder"
        description="Foto-Grid + Lightbox auf der Band-Detailseite. Reihenfolge per Drag & Drop."
      />

      <div style={{ borderTop: '1px solid #E8D8C8', margin: '8px 0 40px' }} />

      {/* ── Bewertungen ────────────────────────────────────── */}
      <ReviewManager bandSlug={slug} />

      {/* ── Gefahrenzone ───────────────────────────────────── */}
      <div style={{
        marginTop: 48,
        padding: '20px 24px',
        border: '1px solid #FCA5A5',
        borderRadius: 12,
        backgroundColor: '#FFF5F5',
      }}>
        <p style={{ fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-body)', color: '#991B1B', marginBottom: 12 }}>
          Gefahrenzone
        </p>
        <DeleteBandButton slug={slug} name={band.name} />
      </div>
    </div>
  )
}
