'use server'

import { revalidateTag, revalidatePath } from 'next/cache'
import { createAdminSupabaseClient } from '@/lib/supabase-server'

const BUCKET = 'vmp-images'

export interface BandPayload {
  slug: string
  name: string
  category: 'partyband' | 'tribute' | 'easy-listening'
  sort_order: number
  published: boolean
  tagline: string
  short_description: string
  description: string
  facebook_url: string | null
  instagram_url: string | null
  repertoire: string[]
  youtube_links: { url: string; title: string }[]
}

export async function saveBand(
  payload: BandPayload,
  mode: 'create' | 'edit',
  existingSlug?: string
): Promise<{ ok: true; slug: string } | { ok: false; error: string }> {
  const sb = await createAdminSupabaseClient()
  const newSlug = payload.slug

  // ── Slug changed: migrate images before updating the band row ──────────
  if (mode === 'edit' && existingSlug && existingSlug !== newSlug) {
    const { data: images } = await sb
      .from('band_images')
      .select('id, path')
      .eq('band_slug', existingSlug)

    if (images && images.length > 0) {
      for (const img of images as { id: string; path: string }[]) {
        const oldPath = img.path
        const newPath = oldPath.replace(
          `bands/${existingSlug}/`,
          `bands/${newSlug}/`
        )

        // Move file in storage (copy + delete)
        const { error: moveError } = await sb.storage
          .from(BUCKET)
          .move(oldPath, newPath)

        if (moveError) {
          return { ok: false, error: `Bild konnte nicht verschoben werden: ${moveError.message}` }
        }

        // Update path + band_slug in band_images
        await sb
          .from('band_images')
          .update({ band_slug: newSlug, path: newPath })
          .eq('id', img.id)
      }
    }

    // Invalidate old slug cache
    revalidateTag(`band-${existingSlug}`)
    revalidatePath(`/${existingSlug}`)
  }

  // ── Save band row ──────────────────────────────────────────────────────
  const { data, error } = mode === 'create'
    ? await sb.from('bands').insert(payload).select('slug').single()
    : await sb.from('bands').update(payload).eq('slug', existingSlug!).select('slug').single()

  if (error) return { ok: false, error: error.message }

  const savedSlug = (data as { slug: string }).slug
  revalidateTag('bands-nav')
  revalidateTag('bands-category')
  revalidateTag(`band-${savedSlug}`)
  revalidateTag('bands-all')
  revalidatePath('/bands')
  revalidatePath(`/${savedSlug}`)

  return { ok: true, slug: savedSlug }
}

export async function deleteBand(
  slug: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const sb = await createAdminSupabaseClient()

  // 1. Fetch all image paths for this band
  const { data: images } = await sb
    .from('band_images')
    .select('path')
    .eq('band_slug', slug)

  // 2. Delete files from Storage
  if (images && images.length > 0) {
    const paths = (images as { path: string }[]).map(img => img.path)
    const { error: storageError } = await sb.storage.from(BUCKET).remove(paths)
    if (storageError) return { ok: false, error: `Storage: ${storageError.message}` }
  }

  // 3. Delete band_images rows
  await sb.from('band_images').delete().eq('band_slug', slug)

  // 4. Delete reviews
  await sb.from('reviews').delete().eq('band_slug', slug)

  // 5. Delete the band row
  const { error } = await sb.from('bands').delete().eq('slug', slug)
  if (error) return { ok: false, error: error.message }

  revalidateTag('bands-nav')
  revalidateTag('bands-category')
  revalidateTag(`band-${slug}`)
  revalidateTag('bands-all')
  revalidatePath('/bands')
  revalidatePath(`/${slug}`)

  return { ok: true }
}
