'use server'

import { revalidateTag, revalidatePath } from 'next/cache'
import { createAdminSupabaseClient } from '@/lib/supabase-server'

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
  repertoire: string[]
  youtube_links: { url: string; title: string }[]
}

export async function saveBand(
  payload: BandPayload,
  mode: 'create' | 'edit',
  existingSlug?: string
): Promise<{ ok: true; slug: string } | { ok: false; error: string }> {
  const sb = await createAdminSupabaseClient()

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
