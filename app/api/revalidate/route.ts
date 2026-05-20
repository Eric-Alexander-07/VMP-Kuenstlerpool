import { revalidateTag, revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// Triggered by a Supabase Database Webhook on INSERT/UPDATE/DELETE to `bands`.
// Set the webhook HTTP header: Authorization: Bearer <REVALIDATE_SECRET>
//
// Revalidates nav, bands overview, and the specific band page if slug is provided.
// Add REVALIDATE_SECRET=<random-string> to .env.local

export async function POST(req: NextRequest) {
  const secret = req.headers.get('authorization')?.replace('Bearer ', '')

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let slug: string | undefined

  try {
    const body = await req.json()
    slug = body?.record?.slug ?? body?.old_record?.slug
  } catch {
    // body is optional — full revalidation if not parseable
  }

  // Always revalidate nav and category list
  revalidateTag('bands-nav')
  revalidateTag('bands-category')
  revalidatePath('/bands')

  if (slug) {
    revalidateTag(`band-${slug}`)
    revalidatePath(`/${slug}`)
  } else {
    // No slug → invalidate all band pages
    revalidateTag('bands-all')
  }

  return NextResponse.json({
    revalidated: true,
    slug: slug ?? 'all',
    time: new Date().toISOString(),
  })
}
