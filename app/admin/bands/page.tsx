import { PageHeader } from '../_components/AdminShell'
import { BandCardGrid } from '../_components/BandCardGrid'
import { createAdminSupabaseClient } from '@/lib/supabase-server'
import type { BandRow } from '@/types/band'

export default async function BandsAdminPage() {
  const sb = await createAdminSupabaseClient()
  const { data } = await sb
    .from('bands')
    .select('slug, name, category, published, sort_order')
    .order('category')
    .order('sort_order')

  const bands = (data ?? []) as Pick<BandRow, 'slug' | 'name' | 'category' | 'published' | 'sort_order'>[]

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <PageHeader
          title="Bands"
          subtitle="Band-Metadaten, Bilder und Bewertungen verwalten."
        />
        <a
          href="/admin/bands/new"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            backgroundColor: '#8B1A1A',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '10px 18px',
            fontSize: 14,
            fontFamily: 'var(--font-body)',
            fontWeight: 600,
            textDecoration: 'none',
            flexShrink: 0,
            marginTop: 4,
          }}
        >
          + Neue Band
        </a>
      </div>

      <BandCardGrid bands={bands} />
    </div>
  )
}
