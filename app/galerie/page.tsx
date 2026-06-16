export const revalidate = 3600

import type { Metadata } from 'next'
import NavbarWrapper from '@/components/NavbarWrapper'
import VmpFooter from '@/components/VmpFooter'
import GalleryPageClient from '@/components/GalleryPageClient'
import { storageUrl, assignGridSpan } from '@/lib/db-images'
import { getBandsMenuEntries } from '@/lib/bands'
import { getGalleryImages } from '@/lib/vmp-data'

export const metadata: Metadata = {
  title: 'Galerie – Live-Events & Bands │ Vivid Music Productions',
  description: 'Fotogalerie von Vivid Music Productions – Eindrücke aus unvergesslichen Live-Events, Konzerten und dem Tonstudio im Rhein-Main-Gebiet.',
  keywords: [
    'VMP Galerie',
    'Live Event Fotos Frankfurt',
    'Konzertfotos Rhein-Main',
    'Tonstudio',
    'Werbejingles',
    'Musikproduktion',
    'Radiowerbung',
    'Bandfotos',
  ],
  openGraph: {
    title: 'Galerie – Live-Events & Bands │ Vivid Music Productions',
    description: 'Eindrücke aus unvergesslichen Live-Events, Konzerten und dem Tonstudio von Vivid Music Productions.',
    url: 'https://v-m-p.com/galerie',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'VMP Galerie – Live Events' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Galerie │ Vivid Music Productions',
    description: 'Eindrücke aus unvergesslichen Live-Events und dem Tonstudio.',
  },
  alternates: {
    canonical: 'https://v-m-p.com/galerie',
  },
}

export default async function GaleriePage() {
  const [allImages, bandsMenu] = await Promise.all([
    getGalleryImages(),
    getBandsMenuEntries(),
  ])

  const headerData = allImages.filter(img => img.image_type === 'header')
  const gridData = allImages.filter(img => img.image_type === 'grid')

  const headerBg = headerData[0] ? storageUrl(headerData[0].path) : undefined

  const photos = gridData.length
    ? gridData.map((img, i) => ({
      src: storageUrl(img.path),
      label: '',
      ...assignGridSpan(i),
    }))
    : undefined

  return (
    <>
      <NavbarWrapper />
      <GalleryPageClient photos={photos} headerBg={headerBg} bandsMenu={bandsMenu} />
      <VmpFooter />
    </>
  )
}
