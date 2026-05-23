import { unstable_cache } from 'next/cache'
import { createClient } from '@supabase/supabase-js'
import type { BandRow, BandNav, BandCardData, BandsMenuEntry } from '@/types/band'
import { buildBandsMenu } from '@/types/band'

// Public client without cookie dependency — safe to use in unstable_cache callbacks
function publicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// ── getBandsForNav ────────────────────────────────────────────────────
// Minimal data for the nav dropdown. Cached 3600s.

export const getBandsForNav = unstable_cache(
  async (): Promise<BandNav[]> => {
    const { data, error } = await publicClient()
      .from('bands')
      .select('slug, name, category')
      .eq('published', true)
      .order('sort_order', { ascending: true })

    if (error) {
      console.error('[getBandsForNav]', error.message)
      return []
    }
    return (data ?? []) as BandNav[]
  },
  ['bands-nav-3'],
  { revalidate: 60, tags: ['bands-nav'] }
)

// ── getBandsMenuEntries ────────────────────────────────────────────────
// Ready-to-use nav menu structure.

export async function getBandsMenuEntries(): Promise<BandsMenuEntry[]> {
  const bands = await getBandsForNav()
  return buildBandsMenu(bands)
}

// ── getBandsByCategory ────────────────────────────────────────────────
// All published bands grouped by category. Cached 3600s.

export const getBandsByCategory = unstable_cache(
  async (): Promise<{
    partyBands: BandRow[]
    tributeBands: BandRow[]
    easyBands: BandRow[]
  }> => {
    const { data, error } = await publicClient()
      .from('bands')
      .select('*')
      .eq('published', true)
      .order('sort_order', { ascending: true })

    if (error) {
      console.error('[getBandsByCategory]', error.message)
      return { partyBands: [], tributeBands: [], easyBands: [] }
    }

    const rows = (data ?? []) as BandRow[]
    return {
      partyBands:   rows.filter(b => b.category === 'partyband'),
      tributeBands: rows.filter(b => b.category === 'tribute'),
      easyBands:    rows.filter(b => b.category === 'easy-listening'),
    }
  },
  ['bands-category-3'],
  { revalidate: 60, tags: ['bands-category'] }
)

// ── getBandBySlug ─────────────────────────────────────────────────────
// Full band row by slug. Per-band cache with 3600s revalidation.

export async function getBandBySlug(slug: string): Promise<BandRow | null> {
  return unstable_cache(
    async (s: string): Promise<BandRow | null> => {
      const { data, error } = await publicClient()
        .from('bands')
        .select('*')
        .eq('slug', s)
        .eq('published', true)
        .single()

      if (error) {
        if (error.code !== 'PGRST116') {
          console.error('[getBandBySlug]', error.message)
        }
        return null
      }
      return data as BandRow
    },
    [`band-${slug}`],
    { revalidate: 3600, tags: [`band-${slug}`, 'bands-all'] }
  )(slug)
}

// ── getRelatedBands ───────────────────────────────────────────────────
// Up to 3 other published bands in the same category.

export async function getRelatedBands(slug: string, category: BandRow['category']): Promise<BandRow[]> {
  return unstable_cache(
    async (s: string, cat: string): Promise<BandRow[]> => {
      const { data, error } = await publicClient()
        .from('bands')
        .select('*')
        .eq('published', true)
        .eq('category', cat)
        .neq('slug', s)
        .order('sort_order', { ascending: true })
        .limit(3)

      if (error) {
        console.error('[getRelatedBands]', error.message)
        return []
      }
      return (data ?? []) as BandRow[]
    },
    [`related-${slug}`],
    { revalidate: 3600, tags: [`band-${slug}`, 'bands-all'] }
  )(slug, category)
}

// ── bandsToBandCards ──────────────────────────────────────────────────
// Map DB rows to BandCardData shape for BandShowcase, optionally
// applying showcase images from band_images table.

export function bandsToBandCards(
  bands: BandRow[],
  showcaseImages?: Record<string, string>
): BandCardData[] {
  return bands.map(b => ({
    name:        b.name,
    tagline:     b.tagline,
    description: b.short_description || b.description.split('\n\n')[0] || b.description,
    href:        `/${b.slug}`,
    image:       showcaseImages?.[b.slug] ?? '',
  }))
}
