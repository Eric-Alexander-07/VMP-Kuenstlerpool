import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// Supabase Database Webhook endpoint.
// Called on INSERT/UPDATE/DELETE for any of the 7 data tables.
// Auth: ?secret=<REVALIDATION_SECRET> query parameter.

const TABLE_TAGS: Record<string, string[]> = {
  bands:          ['bands'],
  band_images:    ['band-images', 'bands'],
  reviews:        ['reviews', 'bands'],
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

  tags.forEach(tag => revalidateTag(tag))

  return NextResponse.json({
    revalidated: true,
    tags,
    table,
    record: record ?? null,
  })
}
