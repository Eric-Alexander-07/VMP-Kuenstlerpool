import { unstable_cache } from 'next/cache'
import { createClient } from '@supabase/supabase-js'
import type { BandRow } from '@/types/band'

function publicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// ── getBands ──────────────────────────────────────────────────────────
// All published bands ordered by sort_order.

export const getBands = unstable_cache(
  async (): Promise<BandRow[]> => {
    const { data, error } = await publicClient()
      .from('bands')
      .select('*')
      .eq('published', true)
      .order('sort_order', { ascending: true })
    if (error) {
      console.error('[getBands]', error.message)
      return []
    }
    return (data ?? []) as BandRow[]
  },
  ['vmp-bands'],
  { revalidate: 3600, tags: ['bands'] }
)

// ── getBandBySlug ─────────────────────────────────────────────────────
// One band with its images and reviews. Per-slug cache.

export async function getBandBySlug(slug: string) {
  return unstable_cache(
    async (s: string) => {
      const sb = publicClient()
      const [
        { data: band, error },
        { data: images },
        { data: reviews },
      ] = await Promise.all([
        sb.from('bands').select('*').eq('slug', s).eq('published', true).single(),
        sb.from('band_images').select('path, role, sort_order').eq('band_slug', s).order('sort_order', { ascending: true }),
        sb.from('reviews').select('name, rating, text, date, platform').eq('band_slug', s).order('created_at', { ascending: true }),
      ])
      if (error || !band) return null
      return {
        band: band as BandRow,
        images: (images ?? []) as { path: string; role: string; sort_order: number }[],
        reviews: (reviews ?? []) as { name: string; rating: number; text: string; date: string; platform: string }[],
      }
    },
    [`vmp-band-${slug}`],
    { revalidate: 3600, tags: ['bands', 'band-images', 'reviews'] }
  )(slug)
}

// ── getAllBandImages ──────────────────────────────────────────────────
// All rows from band_images — pages filter by role / band_slug as needed.

export const getAllBandImages = unstable_cache(
  async (): Promise<{ band_slug: string; path: string; role: string; sort_order: number }[]> => {
    const { data, error } = await publicClient()
      .from('band_images')
      .select('band_slug, path, role, sort_order')
      .order('sort_order', { ascending: true })
    if (error) {
      console.error('[getAllBandImages]', error.message)
      return []
    }
    return (data ?? []) as { band_slug: string; path: string; role: string; sort_order: number }[]
  },
  ['vmp-all-band-images'],
  { revalidate: 3600, tags: ['band-images'] }
)

// ── getHeroImages ─────────────────────────────────────────────────────
// Hero slideshow images ordered by sort_order.

export const getHeroImages = unstable_cache(
  async (): Promise<{ path: string; label: string }[]> => {
    const { data, error } = await publicClient()
      .from('hero_images')
      .select('path, label')
      .order('sort_order', { ascending: true })
    if (error) {
      console.error('[getHeroImages]', error.message)
      return []
    }
    return (data ?? []) as { path: string; label: string }[]
  },
  ['vmp-hero-images'],
  { revalidate: 86400, tags: ['hero-images'] }
)

// ── getGalleryImages ──────────────────────────────────────────────────
// All gallery_images — caller filters by image_type or category.

export const getGalleryImages = unstable_cache(
  async (): Promise<{ path: string; category: string; image_type: string; sort_order: number }[]> => {
    const { data, error } = await publicClient()
      .from('gallery_images')
      .select('path, category, image_type, sort_order')
      .order('sort_order', { ascending: true })
    if (error) {
      console.error('[getGalleryImages]', error.message)
      return []
    }
    return (data ?? []) as { path: string; category: string; image_type: string; sort_order: number }[]
  },
  ['vmp-gallery-images'],
  { revalidate: 3600, tags: ['gallery-images'] }
)

// ── getEventImages ────────────────────────────────────────────────────
// All event_images ordered by sort_order.

export const getEventImages = unstable_cache(
  async (): Promise<{ path: string; category: string }[]> => {
    const { data, error } = await publicClient()
      .from('event_images')
      .select('path, category')
      .order('sort_order', { ascending: true })
    if (error) {
      console.error('[getEventImages]', error.message)
      return []
    }
    return (data ?? []) as { path: string; category: string }[]
  },
  ['vmp-event-images'],
  { revalidate: 3600, tags: ['event-images'] }
)

// ── getPageImages ─────────────────────────────────────────────────────
// Images for a specific page — caller filters by section as needed.

export async function getPageImages(page: string) {
  return unstable_cache(
    async (p: string): Promise<{ path: string; section: string }[]> => {
      const { data, error } = await publicClient()
        .from('page_images')
        .select('path, section')
        .eq('page', p)
        .order('sort_order', { ascending: true })
      if (error) {
        console.error('[getPageImages]', error.message)
        return []
      }
      return (data ?? []) as { path: string; section: string }[]
    },
    [`vmp-page-images-${page}`],
    { revalidate: 3600, tags: ['page-images'] }
  )(page)
}
