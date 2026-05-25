// ── Raw DB row ─────────────────────────────────────────────────────────

export type BandRow = {
  id: string
  slug: string
  name: string
  category: 'partyband' | 'tribute' | 'easy-listening'
  sort_order: number
  published: boolean
  tagline: string
  description: string
  short_description: string
  repertoire: string[]
  facebook_url: string | null
  instagram_url: string | null
  youtube_links: { url: string; title: string }[]
  created_at: string
  updated_at: string
}

// ── Lightweight nav shape ──────────────────────────────────────────────

export type BandNav = {
  slug: string
  name: string
  category: BandRow['category']
}

// ── Shape used by BandShowcase cards ──────────────────────────────────

export type BandCardData = {
  name: string
  tagline: string
  description: string
  href: string
  image: string
}

// ── Nav menu structure (mirrors Navbar's BANDS_MENU) ──────────────────

export type BandsMenuEntry = {
  category: string
  href: string
  bands: { name: string; href: string }[]
}

// ── Category helpers ───────────────────────────────────────────────────

export function getCategoryLabel(category: BandRow['category']): string {
  switch (category) {
    case 'partyband':      return 'Partybands'
    case 'tribute':        return 'Tribute Bands'
    case 'easy-listening': return 'Easy Listening'
  }
}

export function getCategoryAnchor(category: BandRow['category']): string {
  switch (category) {
    case 'partyband':      return 'partybands'
    case 'tribute':        return 'tribute'
    case 'easy-listening': return 'easy-listening'
  }
}

// ── Map BandRow → legacy Band shape (for BandPageClient compatibility) ─

export function bandRowToBand(row: BandRow): import('@/lib/bands-data').Band {
  return {
    slug: row.slug,
    name: row.name,
    category: row.category,
    tagline: row.tagline,
    description: row.description,
    besetzung: '',
    spielzeit: '',
    geeignetFuer: [],
    repertoire: row.repertoire,
    region: '',
    images: [],
    videos: row.youtube_links,
    news: [],
    facebookUrl: row.facebook_url ?? undefined,
    instagramUrl: row.instagram_url ?? undefined,
  }
}

// ── Map BandRow → BandsMenuEntry structure ─────────────────────────────

export function buildBandsMenu(bands: BandNav[]): BandsMenuEntry[] {
  const order: BandRow['category'][] = ['partyband', 'tribute', 'easy-listening']
  const map = new Map<string, BandsMenuEntry>()

  order.forEach(cat => {
    map.set(cat, {
      category: getCategoryLabel(cat),
      href: `/bands#${getCategoryAnchor(cat)}`,
      bands: [],
    })
  })

  bands.forEach(b => {
    const entry = map.get(b.category)
    if (entry) entry.bands.push({ name: b.name, href: `/${b.slug}` })
  })

  return Array.from(map.values()).filter(e => e.bands.length > 0)
}
