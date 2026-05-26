import type { MetadataRoute } from 'next'
import { getBandsForNav } from '@/lib/bands'

const BASE_URL = 'https://v-m-p.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const bands = await getBandsForNav()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL,                    lastModified: new Date(), changeFrequency: 'monthly', priority: 1   },
    { url: `${BASE_URL}/bands`,         lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE_URL}/galerie`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/technik`,       lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.5 },
    { url: `${BASE_URL}/ueber-uns`,     lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.5 },
    { url: `${BASE_URL}/impressum`,     lastModified: new Date(), changeFrequency: 'never',   priority: 0.1 },
    { url: `${BASE_URL}/datenschutz`,   lastModified: new Date(), changeFrequency: 'never',   priority: 0.1 },
  ]

  const bandRoutes: MetadataRoute.Sitemap = bands.map(b => ({
    url:             `${BASE_URL}/${b.slug}`,
    lastModified:    new Date(),
    changeFrequency: 'monthly',
    priority:        0.8,
  }))

  return [...staticRoutes, ...bandRoutes]
}
