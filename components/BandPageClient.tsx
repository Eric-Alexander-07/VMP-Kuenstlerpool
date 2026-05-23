'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence, LayoutGroup } from 'framer-motion'
import Image from 'next/image'
import type { Band, Review } from '@/lib/bands-data'
import InlineNavBar from './InlineNavBar'
import type { BandsMenuEntry } from './Navbar'

// ─── Stars ────────────────────────────────────────────────────────────

function Stars({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24"
          fill={i < rating ? 'var(--color-orange)' : '#E0D8CE'}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  )
}

// ─── ReviewCard ───────────────────────────────────────────────────────

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const [hovered, setHovered] = useState(false)
  const platformColors: Record<string, string> = {
    Google:   '#4285F4',
    Facebook: '#1877F2',
    Direkt:   'var(--color-orange)',
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: '#fff',
        border: `1px solid ${hovered ? 'rgba(234,88,12,0.3)' : '#EAE3D8'}`,
        borderRadius: 14,
        padding: '20px 22px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? '0 8px 24px rgba(234,88,12,0.1)' : 'none',
        transition: 'border-color 0.2s, transform 0.22s ease, box-shadow 0.22s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <Stars rating={review.rating} />
        <span style={{
          fontSize: 10,
          fontWeight: 600,
          fontFamily: 'var(--font-body)',
          color: platformColors[review.platform] ?? 'var(--color-orange)',
          letterSpacing: '0.06em',
        }}>
          {review.platform}
        </span>
      </div>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 13,
        color: '#4A3F35',
        lineHeight: 1.65,
        fontStyle: 'italic',
      }}>
        „{review.text}"
      </p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, color: '#1C1917' }}>
          {review.name}
        </span>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: '#A09080' }}>
          {review.date}
        </span>
      </div>
    </motion.div>
  )
}

// ─── YouTubeEmbed ─────────────────────────────────────────────────────

function getYouTubeId(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?\s]+)/)
  return m?.[1] ?? null
}

function YouTubeEmbed({ url, title, large = false, autoplay = false }: { url: string; title: string; large?: boolean; autoplay?: boolean }) {
  const id = getYouTubeId(url)
  if (!id) return null
  return (
    <div style={{ aspectRatio: '16/9', borderRadius: large ? 12 : 8, overflow: 'hidden', position: 'relative', backgroundColor: '#0a0a0a' }}>
      <iframe
        src={`https://www.youtube.com/embed/${id}${autoplay ? '?autoplay=1' : ''}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
      />
    </div>
  )
}

// ─── Image Lightbox ───────────────────────────────────────────────────

function ImageLightbox({ images, startIndex, onClose }: {
  images: string[]
  startIndex: number
  onClose: () => void
}) {
  const [active, setActive] = useState(startIndex)
  const touchStartY = useRef(0)
  const prev = useCallback(() => setActive((i) => (i - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setActive((i) => (i + 1) % images.length), [images.length])

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     onClose()
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, prev, next])

  // Lock body scroll (iOS-safe: position fixed)
  useEffect(() => {
    const scrollY = window.scrollY
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'
    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      window.scrollTo(0, scrollY)
    }
  }, [])

  // Swipe down to close
  function onTouchStart(e: React.TouchEvent) {
    touchStartY.current = e.touches[0].clientY
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (e.changedTouches[0].clientY - touchStartY.current > 64) onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      role="dialog"
      aria-modal="true"
      aria-label="Bildansicht"
      className="fixed inset-0 flex items-center justify-center"
      style={{
        background: 'rgba(10,8,6,0.94)',
        zIndex: 2000,
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        cursor: 'pointer', // iOS: makes div tappable
      }}
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Image */}
      <div
        style={{ position: 'relative', width: 'min(92vw, 1100px)', height: 'min(72vh, 760px)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.22 }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <Image
              src={images[active]}
              alt={`Foto ${active + 1}`}
              fill
              style={{ objectFit: 'contain' }}
              sizes="92vw"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Close — positioned below Dynamic Island / notch */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose() }}
        aria-label="Schließen"
        style={{
          position: 'fixed',
          top: 'calc(env(safe-area-inset-top, 20px) + 16px)',
          right: 'max(24px, env(safe-area-inset-right, 24px))',
          width: 48, height: 48,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.15)',
          border: '1px solid rgba(255,255,255,0.25)',
          color: '#fff',
          fontSize: 20,
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
          WebkitTapHighlightColor: 'transparent',
          touchAction: 'manipulation',
          zIndex: 2010,
        }}
      >✕</button>

      {/* Prev */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); prev() }}
          aria-label="Vorheriges Bild"
          style={{
            position: 'fixed', left: 'max(16px, env(safe-area-inset-left, 16px))', top: '50%', transform: 'translateY(-50%)',
            width: 52, height: 52, borderRadius: '50%',
            background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.18)',
            color: '#fff', fontSize: 22, cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
            WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
            zIndex: 2010,
          }}
        >‹</button>
      )}

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); next() }}
          aria-label="Nächstes Bild"
          style={{
            position: 'fixed', right: 'max(16px, env(safe-area-inset-right, 16px))', top: '50%', transform: 'translateY(-50%)',
            width: 52, height: 52, borderRadius: '50%',
            background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.18)',
            color: '#fff', fontSize: 22, cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
            WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
            zIndex: 2010,
          }}
        >›</button>
      )}

      {/* Counter + mobile close hint */}
      <div style={{
        position: 'fixed',
        bottom: 'calc(env(safe-area-inset-bottom, 0px) + 24px)',
        left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        zIndex: 2010,
      }}>
        {images.length > 1 && (
          <span style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', fontSize: 12 }}>
            {active + 1} / {images.length}
          </span>
        )}
        <span style={{ color: 'rgba(255,255,255,0.28)', fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.06em' }}>
          Tippen zum Schließen
        </span>
      </div>
    </motion.div>
  )
}

// ─── VideoPlaylist (sidebar) ──────────────────────────────────────────

function VideoPlaylist({ videos, active, onSelect, isExpanded = false }: {
  videos: { url: string; title: string }[]
  active: number | null
  onSelect: (i: number) => void
  isExpanded?: boolean
}) {
  const [fetchedTitles, setFetchedTitles] = useState<Record<number, string>>({})
  const [autoplay, setAutoplay] = useState(false)

  const handleSelect = (i: number) => {
    setAutoplay(true)
    onSelect(i)
  }

  useEffect(() => {
    const missing = videos
      .map((v, i) => ({ i, id: getYouTubeId(v.url), hasTitle: !!v.title?.trim() }))
      .filter(x => x.id && !x.hasTitle)
    if (missing.length === 0) return
    missing.forEach(({ i, id }) => {
      fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`)
        .then(r => r.json())
        .then((d: { title: string }) => setFetchedTitles(prev => ({ ...prev, [i]: d.title })))
        .catch(() => {})
    })
  }, [videos])

  const label = (v: { title: string }, i: number) =>
    v.title?.trim() || fetchedTitles[i] || `Video ${i + 1}`

  return (
    <div style={{ marginBottom: 20 }}>
      <p style={{ fontSize: 10, fontWeight: 700, color: '#8B1A1A', textTransform: 'uppercase' as const, letterSpacing: '0.1em', fontFamily: 'var(--font-body)', marginBottom: 10 }}>
        Videos & Hörproben <span style={{ color: '#A09080', fontWeight: 400 }}>({videos.length})</span>
      </p>

      {/* Player — always visible, switches on playlist click */}
      {active !== null && (
        <div style={{ borderRadius: 10, overflow: 'hidden', marginBottom: 10, backgroundColor: '#0a0a0a', position: 'relative' }}>
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              <YouTubeEmbed url={videos[active].url} title={label(videos[active], active)} large autoplay={autoplay} />
            </motion.div>
          </AnimatePresence>
          {/* Invisible overlay catches direct clicks on the player when not yet expanded */}
          {!isExpanded && (
            <div
              onClick={() => handleSelect(active)}
              style={{ position: 'absolute', inset: 0, zIndex: 2, cursor: 'pointer' }}
            />
          )}
        </div>
      )}

      {/* Playlist */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #EAE3D8', borderRadius: 12, overflow: 'hidden' }}>
        {videos.map((video, i) => (
          <button key={i} onClick={() => handleSelect(i)} style={{
            width: '100%', textAlign: 'left', padding: '10px 14px',
            borderTop: i > 0 ? '1px solid #F0E8DF' : '0px solid transparent',
            borderRight: '0px solid transparent', borderBottom: '0px solid transparent',
            borderLeft: `3px solid ${i === active ? '#8B1A1A' : 'transparent'}`,
            backgroundColor: i === active ? 'rgba(139,26,26,0.04)' : 'transparent',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10,
            WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
            transition: 'background-color 0.15s',
          }}>
            <span style={{ flexShrink: 0, fontSize: 8, color: i === active ? '#8B1A1A' : '#C4B5A5' }}>
              {i === active ? '▶' : '▷'}
            </span>
            <span style={{ fontSize: 12, color: i === active ? '#1A1A1A' : '#6B4F3A', fontFamily: 'var(--font-body)', fontWeight: i === active ? 600 : 400, lineHeight: 1.4 }}>
              {label(video, i)}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── EyebrowLabel ─────────────────────────────────────────────────────

function EyebrowLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontSize: 10,
      color: 'var(--color-orange)',
      textTransform: 'uppercase',
      letterSpacing: '0.18em',
      fontWeight: 600,
      marginBottom: 14,
      fontFamily: 'var(--font-body)',
    }}>
      {children}
    </p>
  )
}

// ─── RelatedBandCard ──────────────────────────────────────────────────

function RelatedBandCard({ band, index, inView }: { band: Band; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.a
      href={`/${band.slug}`}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.09 }}
      whileHover={{ y: -4, boxShadow: '0 18px 48px rgba(0,0,0,0.55)' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative overflow-hidden rounded-xl block"
      style={{
        height: 260,
        textDecoration: 'none',
        border: '1px solid rgba(255,255,255,0.06)',
        backgroundColor: '#1A1714',
      }}
    >
      {band.images[0] && (
        <Image
          src={band.images[0]}
          alt={band.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 33vw"
        />
      )}

      {/* Base gradient */}
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)' }} />

      {/* Orange hover tint */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(to top, rgba(234,88,12,0.3) 0%, transparent 65%)' }} />

      {/* Text */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
        <h3 className="font-display font-bold text-white" style={{ fontSize: 20, lineHeight: 1.2, marginBottom: 4 }}>
          {band.name}
        </h3>
        <p className="font-body" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
          {band.tagline}
        </p>
        {/* Description — slides up on hover */}
        <p
          className="font-body overflow-hidden"
          style={{
            fontSize: 12,
            color: 'rgba(255,255,255,0.72)',
            lineHeight: 1.55,
            marginTop: hovered ? 8 : 0,
            maxHeight: hovered ? 80 : 0,
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(6px)',
            transition: 'max-height 0.35s ease, opacity 0.28s ease, transform 0.28s ease, margin-top 0.28s ease',
          }}
        >
          {band.description}
        </p>
      </div>
    </motion.a>
  )
}

// ─── Props ────────────────────────────────────────────────────────────

interface Props {
  band: Band
  related: Band[]
  categoryLabel: string
  mailtoHref: string
  fbEmbedSrc: string
  avgRating: number | null
  heroUrl?: string
  dbImages?: string[]
  reviews?: Review[]
  bandsMenu?: BandsMenuEntry[]
}

// ─── Main ─────────────────────────────────────────────────────────────

export default function BandPageClient({
  band, related, categoryLabel,
  mailtoHref, fbEmbedSrc, avgRating,
  heroUrl, dbImages, reviews = [], bandsMenu,
}: Props) {
  const contentRef = useRef<HTMLDivElement>(null)
  const relatedRef = useRef<HTMLElement>(null)
  const contentInView = useInView(contentRef, { once: true, margin: '-60px' })
  const relatedInView = useInView(relatedRef, { once: true, margin: '-60px' })

  const realVideos = band.videos.filter(v => getYouTubeId(v.url))

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [activeVideo, setActiveVideo] = useState<number | null>(() => realVideos.length > 0 ? 0 : null)
  const [videoExpanded, setVideoExpanded] = useState(false)

  const handleVideoSelect = useCallback((i: number) => {
    setActiveVideo(i)
    setVideoExpanded(true)
  }, [])
  const openLightbox = useCallback((i: number) => setLightboxIndex(i), [])
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  const galleryImages = dbImages?.length ? dbImages : band.images.filter(Boolean)

  return (
    <>
      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <ImageLightbox
            images={galleryImages}
            startIndex={lightboxIndex}
            onClose={closeLightbox}
          />
        )}
      </AnimatePresence>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section style={{
        position: 'relative',
        height: 560,
        backgroundColor: 'var(--color-dark)',
        overflow: 'hidden',
      }}>
        {(heroUrl ?? band.images[0]) && (
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.07 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
          >
            <Image
              src={heroUrl ?? band.images[0]}
              alt={band.name}
              fill
              priority
              style={{ objectFit: 'cover', opacity: 0.4 }}
              sizes="100vw"
            />
          </motion.div>
        )}

        {/* Gradients */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(28,25,23,0.95) 0%, rgba(28,25,23,0.3) 60%, transparent 100%)', zIndex: 1 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(28,25,23,0.5) 0%, transparent 50%)', zIndex: 1 }} />

        {/* Content */}
        <div className="absolute bottom-12 left-5 right-5 md:left-10 md:right-[200px] z-[2]">
          {categoryLabel && (
            <motion.span
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                display: 'inline-block',
                backgroundColor: 'var(--color-orange)',
                color: '#fff',
                fontSize: 11,
                fontWeight: 600,
                padding: '4px 16px',
                borderRadius: 30,
                fontFamily: 'var(--font-body)',
                letterSpacing: '0.06em',
                marginBottom: 16,
              }}
            >
              {categoryLabel}
            </motion.span>
          )}

          {avgRating && (
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}
            >
              <Stars rating={avgRating} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
                {reviews?.length} Bewertungen
              </span>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', columnGap: 14, rowGap: 4, marginBottom: 12 }}
          >
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(38px, 5.5vw, 64px)',
              fontWeight: 700,
              color: '#fff',
              lineHeight: 1.05,
              margin: 0,
            }}>
              {band.name}
            </h1>
            {band.tagline && (
              <>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 3vw, 38px)', fontWeight: 300, lineHeight: 1 }}>–</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(16px, 1.6vw, 22px)', color: '#fff', fontStyle: 'italic', fontWeight: 300 }}>
                  {band.tagline}
                </span>
              </>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="hidden md:block absolute bottom-12 right-10 z-[2]"
        >
          <motion.a
            href="#anfrage"
            whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(234,88,12,0.5)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-block',
              backgroundColor: 'var(--color-orange)',
              color: '#fff',
              padding: '14px 32px',
              borderRadius: 30,
              fontSize: 15,
              fontWeight: 600,
              fontFamily: 'var(--font-body)',
              textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(234,88,12,0.35)',
            }}
          >
            Jetzt anfragen
          </motion.a>
        </motion.div>
      </section>

      <InlineNavBar bandsMenu={bandsMenu} />

      {/* ── Content grid ─────────────────────────────────────── */}
      <div ref={contentRef} style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="max-w-7xl mx-auto" style={{ padding: '60px 40px' }}>
          <LayoutGroup>
          <div className="lg:grid" style={{ gap: 56, gridTemplateColumns: videoExpanded ? '2fr 3fr' : '1fr 360px' }}>

            {/* ── Left column ── */}
            <motion.div layout transition={{ layout: { duration: 0.45, ease: [0.32, 0, 0.67, 0] } }}>

              {/* Photo grid */}
              {galleryImages.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={contentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className={galleryImages.length > 1
                  ? 'grid grid-cols-2 gap-2.5 mb-[52px] [grid-template-rows:220px_140px] md:[grid-template-rows:240px_150px]'
                  : 'mb-[52px] h-[360px]'
                }
              >
                {/* Main image — spans both rows when grid has 2 cols */}
                <button
                  onClick={() => openLightbox(0)}
                  className={`group ${galleryImages.length > 1 ? 'col-span-2 md:col-span-1 md:row-span-2' : 'w-full h-full'}`}
                  style={{ borderRadius: 12, overflow: 'hidden', backgroundColor: '#E8E0D4', position: 'relative', border: 'none', padding: 0, cursor: 'pointer' }}
                >
                  <Image src={galleryImages[0]} alt={band.name} fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="30vw" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    style={{ background: 'rgba(0,0,0,0.25)' }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                    </svg>
                  </div>
                </button>

                {/* Second image */}
                {galleryImages[1] && (
                  <button
                    onClick={() => openLightbox(1)}
                    className="group"
                    style={{ borderRadius: 12, overflow: 'hidden', position: 'relative', border: 'none', padding: 0, cursor: 'pointer' }}
                  >
                    <Image src={galleryImages[1]} alt={`${band.name} 2`} fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="15vw" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                      style={{ background: 'rgba(0,0,0,0.25)' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                      </svg>
                    </div>
                  </button>
                )}

                {/* Third image — +N overlay if more images exist */}
                {galleryImages[2] && (
                  <button
                    onClick={() => openLightbox(2)}
                    className="group"
                    style={{ borderRadius: 12, overflow: 'hidden', position: 'relative', border: 'none', padding: 0, cursor: 'pointer' }}
                  >
                    <Image src={galleryImages[2]} alt={`${band.name} 3`} fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="15vw" />
                    {galleryImages.length > 3 ? (
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: 'rgba(0,0,0,0.58)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexDirection: 'column', gap: 2,
                      }}>
                        <span style={{ color: '#fff', fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, lineHeight: 1 }}>
                          +{galleryImages.length - 3}
                        </span>
                        <span style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                          Fotos
                        </span>
                      </div>
                    ) : (
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                        style={{ background: 'rgba(0,0,0,0.25)' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                        </svg>
                      </div>
                    )}
                  </button>
                )}
              </motion.div>
              )}

              {/* Über die Band */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.08 }}
                style={{ marginBottom: 44 }}
              >
                <EyebrowLabel>Über die Band</EyebrowLabel>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 15,
                  color: 'var(--color-muted)',
                  lineHeight: 1.75,
                }}>
                  {band.description.split('\n\n')[0]}
                </p>
              </motion.div>

              {/* Repertoire */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.16 }}
                style={{ marginBottom: 52 }}
              >
                <EyebrowLabel>Repertoire</EyebrowLabel>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {band.repertoire.map((tag, i) => (
                    <motion.span
                      key={`${tag}-${i}`}
                      initial={{ opacity: 0, scale: 0.88 }}
                      animate={contentInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: 0.18 + i * 0.04 }}
                      whileHover={{ scale: 1.06, backgroundColor: 'var(--color-orange-light)', borderColor: 'rgba(234,88,12,0.4)', color: 'var(--color-orange-text)' }}
                      style={{
                        backgroundColor: '#fff',
                        border: '1px solid #E5DDD5',
                        padding: '6px 16px',
                        borderRadius: 30,
                        fontSize: 12,
                        fontFamily: 'var(--font-body)',
                        color: '#4A3F35',
                        fontWeight: 500,
                        cursor: 'default',
                        display: 'inline-block',
                      }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Reviews */}
              {reviews && reviews.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={contentInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.26 }}
                >
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 20 }}>
                    <EyebrowLabel>Bewertungen</EyebrowLabel>
                    {avgRating && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                        <Stars rating={avgRating} />
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--color-muted)' }}>
                          Ø {avgRating}.0 · {reviews.length} Bewertungen
                        </span>
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
                    {reviews.map((review, i) => (
                      <ReviewCard key={i} review={review} index={i} />
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* ── Right sidebar ── */}
            <motion.div
              layout
              className="mt-12 lg:mt-0"
              initial={{ opacity: 0, x: 28 }}
              animate={contentInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1], layout: { duration: 0.45, ease: [0.32, 0, 0.67, 0] } }}
            >

              {/* Videos */}
              {realVideos.length > 0 && (
                <VideoPlaylist videos={realVideos} active={activeVideo} onSelect={handleVideoSelect} isExpanded={videoExpanded} />
              )}

              {/* Anfrage-Box */}
              <div id="anfrage" style={{
                backgroundColor: 'var(--color-dark)',
                borderRadius: 16,
                padding: '28px 26px',
                marginBottom: 20,
                border: '1px solid rgba(255,255,255,0.06)',
              }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: '#fff', fontWeight: 700, marginBottom: 4 }}>
                  {band.name} anfragen
                </h2>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--color-orange)', marginBottom: 22 }}>
                  Direktkontakt – kein Mittelsmann, kein Aufpreis.
                </p>

                {/* Phone */}
                <a
                  href="tel:+4960787595868"
                  className="group"
                  style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 20 }}
                >
                  <div
                    className="transition-all duration-200 group-hover:scale-110"
                    style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: 'rgba(234,88,12,0.15)', border: '1px solid rgba(234,88,12,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.07 1.18 2 2 0 012.06 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
                    </svg>
                  </div>
                  <span
                    className="transition-colors duration-200 group-hover:text-orange-400"
                    style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: '#fff', fontWeight: 700, letterSpacing: '0.02em' }}>
                    06078 – 759 568
                  </span>
                </a>

                {/* Email CTA */}
                <motion.a
                  href={mailtoHref}
                  whileHover={{ scale: 1.02, boxShadow: '0 6px 26px rgba(234,88,12,0.48)' }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: 'block',
                    backgroundColor: 'var(--color-orange)',
                    color: '#fff',
                    borderRadius: 10,
                    padding: '13px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-body)',
                    fontSize: 14,
                    fontWeight: 600,
                    marginBottom: 10,
                    boxShadow: '0 4px 16px rgba(234,88,12,0.3)',
                  }}
                >
                  Per E-Mail anfragen
                </motion.a>

              </div>

              {/* Facebook Embed */}
              <div style={{
                borderRadius: 16,
                overflow: 'hidden',
                border: '1px solid #E5DDD5',
                backgroundColor: '#fff',
              }}>
                <div style={{ padding: '14px 18px 10px', borderBottom: '1px solid #E8E0D4', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, color: '#1C1917' }}>
                    Facebook
                  </span>
                </div>
                <iframe
                  src={fbEmbedSrc}
                  width="340"
                  height="460"
                  style={{ border: 'none', overflow: 'hidden', display: 'block', width: '100%' }}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                />
              </div>

            </motion.div>
          </div>
          </LayoutGroup>
        </div>
      </div>

      {/* ── Related Bands ─────────────────────────────────────── */}
      {related.length > 0 && (
        <section ref={relatedRef} style={{ position: 'relative', overflow: 'hidden', backgroundColor: 'var(--color-bg)', padding: '60px 40px', borderTop: '1px solid var(--color-border)' }}>
          {/* Diagonal hairline grid texture */}
          <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ zIndex: 0, backgroundImage: `repeating-linear-gradient(-52deg, rgba(28,25,23,0.028) 0px, rgba(28,25,23,0.028) 1px, transparent 1px, transparent 22px), repeating-linear-gradient(38deg, rgba(28,25,23,0.016) 0px, rgba(28,25,23,0.016) 1px, transparent 1px, transparent 44px)` }} />

          <div className="max-w-7xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={relatedInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              style={{ marginBottom: 32 }}
            >
              <p style={{ fontSize: 10, color: 'var(--color-orange)', textTransform: 'uppercase', letterSpacing: '0.18em', fontWeight: 600, fontFamily: 'var(--font-body)', marginBottom: 10 }}>
                Weitere Bands
              </p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3.5vw, 36px)', color: 'var(--color-dark)', fontWeight: 700, lineHeight: 1.1 }}>
                Weitere Bands aus dieser Kategorie
              </h2>
            </motion.div>

            <div
              className="flex gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-x-visible sm:pb-0"
              style={{ scrollbarWidth: 'none' }}
            >
              {related.map((b, i) => (
                <div key={b.slug} className="flex-shrink-0 w-[280px] sm:w-auto">
                  <RelatedBandCard band={b} index={i} inView={relatedInView} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
