import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// Supabase Database Webhook endpoint.
// Called on INSERT/UPDATE/DELETE for any of the 7 data tables.
// Auth: ?secret=<REVALIDATION_SECRET> query parameter.

// Die bands-Tabelle wird von zwei Datenschichten gecacht (lib/vmp-data.ts und
// lib/bands.ts) — alle deren Tags muessen hier stehen, sonst bleiben Navbar
// und Kategorie-Listen nach einer direkten DB-Aenderung stehen.
const TABLE_TAGS: Record<string, string[]> = {
  bands:          ['bands', 'bands-nav', 'bands-category', 'bands-all'],
  band_images:    ['band-images'],
  reviews:        ['reviews'],
  hero_images:    ['hero-images'],
  gallery_images: ['gallery-images'],
  event_images:   ['event-images'],
  page_images:    ['page-images'],
}

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')

  const expectedSecret = process.env.REVALIDATION_SECRET ?? process.env.REVALIDATE_SECRET
  if (!secret || secret !== expectedSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let table: string | undefined
  let record: Record<string, unknown> | undefined

  try {
    const body = await req.json()
    table = body?.table
    record = body?.record ?? body?.old_record
  } catch {
    // unparseable body — still process if table was in query string
  }

  const tags = table ? TABLE_TAGS[table] : undefined

  if (!tags) {
    return NextResponse.json(
      { error: 'Unknown or missing table', table: table ?? null },
      { status: 400 }
    )
  }

  // Bandspezifischer Tag zusaetzlich, damit die Detailseite sofort nachzieht.
  // bands hat `slug`, band_images/reviews haben `band_slug`.
  const rawSlug = record?.slug ?? record?.band_slug
  const slug = typeof rawSlug === 'string' ? rawSlug : undefined
  const allTags = slug ? [...tags, `band-${slug}`] : tags

  allTags.forEach(tag => revalidateTag(tag))

  return NextResponse.json({
    revalidated: true,
    tags: allTags,
    table,
    record: record ?? null,
  })
}
