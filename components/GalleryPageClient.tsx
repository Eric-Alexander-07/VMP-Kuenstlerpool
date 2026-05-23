'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Image from 'next/image'
import InlineNavBar from './InlineNavBar'
import type { BandsMenuEntry } from './Navbar'

// ─── Data ─────────────────────────────────────────────────────────────

// colSpan / rowSpan define the editorial grid layout (4-column base)
const PHOTOS: { src: string; label: string; col: number; row: number }[] = [
  { src: '/images/gallery-1.avif', label: 'Live Performance', col: 2, row: 2 },
  { src: '/images/gallery-2.avif', label: 'Stadtfest Frankfurt', col: 1, row: 1 },
  { src: '/images/gallery-3.avif', label: 'Open Air 2023', col: 1, row: 1 },
  { src: '/images/gallery-4.avif', label: 'Galanacht Wiesbaden', col: 1, row: 2 },
  { src: '/images/gallery-5.avif', label: 'Sommerfest Rhein-Main', col: 1, row: 1 },
  { src: '/images/hero-event.avif', label: 'VMP Live Event', col: 2, row: 1 },
  { src: '/images/empfaenge.avif', label: 'Eleganter Empfang', col: 1, row: 1 },
  { src: '/images/stadtfeste.avif', label: 'Stadtfest', col: 1, row: 1 },
  { src: '/images/firmenevents.avif', label: 'Firmenevent', col: 2, row: 1 },
  { src: '/images/hochzeit.avif', label: 'Hochzeitsfeier', col: 1, row: 2 },
  { src: '/images/veranstaltungsservice.avif', label: 'Veranstaltungsservice', col: 1, row: 1 },
  { src: '/images/groove-control.avif', label: 'Groove Control', col: 2, row: 1 },
  { src: '/images/spirit-of-soul.avif', label: 'Spirit of Soul', col: 1, row: 1 },
  { src: '/images/time-warp.avif', label: 'Time Warp', col: 1, row: 2 },
  { src: '/images/bobbastic.avif', label: 'BOBbastic', col: 1, row: 1 },
  { src: '/images/KissTribute.avif', label: 'The Kiss Tribute Band', col: 2, row: 1 },
  { src: '/images/coversnake.avif', label: 'CoverSnake', col: 1, row: 1 },
  { src: '/images/adams-family.avif', label: 'The Adams Family', col: 1, row: 1 },
  { src: '/images/sir-williams.avif', label: 'Sir Williams', col: 2, row: 1 },
  { src: '/images/bobby-and-friends.avif', label: 'Bobby & Friends', col: 1, row: 1 },
  { src: '/images/marsch-mellows.avif', label: 'Marsch Mellows', col: 2, row: 2 },
  { src: '/images/thin-lizzy-tribute.avif', label: 'Thin Lizzy Tribute', col: 1, row: 1 },
  { src: '/images/melanie-thornton.avif', label: 'Melanie Thornton Tribute', col: 1, row: 1 },
  { src: '/images/bobby-profile.avif', label: 'Bobby Stöcker', col: 1, row: 2 },
  { src: '/images/technik-1.avif', label: 'Tonstudio', col: 2, row: 1 },
  { src: '/images/technik-2.avif', label: 'PA-Technik', col: 1, row: 1 },
]


// ─── Lightbox ─────────────────────────────────────────────────────────

function Lightbox({ photos, startIndex, onClose }: {
  photos: typeof PHOTOS
  startIndex: number
  onClose: () => void
}) {
  const [active, setActive] = useState(startIndex)
  const prev = useCallback(() => setActive(i => (i - 1 + photos.length) % photos.length), [photos.length])
  const next = useCallback(() => setActive(i => (i + 1) % photos.length), [photos.length])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, prev, next])

  const thumbsRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = thumbsRef.current?.children[active] as HTMLElement | undefined
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [active])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      role="dialog"
      aria-modal="true"
      aria-label="Bildansicht"
      className="fixed inset-0 flex items-center justify-center"
      style={{ background: 'rgba(8,6,4,0.96)', zIndex: 3000, backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      {/* Main image */}
      <div
        style={{ position: 'relative', width: 'min(92vw, 1200px)', height: 'min(80vh, 800px)' }}
        onClick={e => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.2 }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <Image
              src={photos[active].src}
              alt={photos[active].label}
              fill
              style={{ objectFit: 'contain' }}
              sizes="92vw"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Label */}
        <div style={{
          position: 'absolute', bottom: -36, left: 0, right: 0,
          textAlign: 'center', fontFamily: 'var(--font-body)',
          fontSize: 13, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.04em',
        }}>
          {photos[active].label}
        </div>
      </div>

      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Schließen"
        style={{
          position: 'fixed', top: 20, right: 24,
          width: 40, height: 40, borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
          color: '#fff', fontSize: 18, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
          transition: 'background 150ms',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
      >✕</button>

      {/* Prev */}
      <button
        onClick={e => { e.stopPropagation(); prev() }}
        aria-label="Vorheriges Foto"
        style={{
          position: 'fixed', left: 16, top: '50%', transform: 'translateY(-50%)',
          width: 52, height: 52, borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.16)',
          color: '#fff', fontSize: 24, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
          transition: 'background 150ms, border-color 150ms',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(234,88,12,0.3)'; e.currentTarget.style.borderColor = 'rgba(234,88,12,0.5)' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.16)' }}
      >‹</button>

      {/* Next */}
      <button
        onClick={e => { e.stopPropagation(); next() }}
        aria-label="Nächstes Foto"
        style={{
          position: 'fixed', right: 16, top: '50%', transform: 'translateY(-50%)',
          width: 52, height: 52, borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.16)',
          color: '#fff', fontSize: 24, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
          transition: 'background 150ms, border-color 150ms',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(234,88,12,0.3)'; e.currentTarget.style.borderColor = 'rgba(234,88,12,0.5)' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.16)' }}
      >›</button>

      {/* Bottom: thumbnails + counter */}
      <div
        style={{ position: 'fixed', bottom: 16, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}
        onClick={e => e.stopPropagation()}
      >
        <div
          ref={thumbsRef}
          style={{ display: 'flex', gap: 6, overflowX: 'auto', maxWidth: '90vw', scrollbarWidth: 'none', padding: '4px 0' }}
        >
          {photos.map((p, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={p.label}
              style={{
                width: 52, height: 38, borderRadius: 5, overflow: 'hidden',
                position: 'relative', flexShrink: 0, border: 'none',
                outline: i === active ? '2px solid var(--color-orange)' : '2px solid transparent',
                outlineOffset: '1px',
                opacity: i === active ? 1 : 0.45,
                transition: 'opacity 150ms, outline-color 150ms',
                cursor: 'pointer', padding: 0,
              }}
            >
              <Image src={p.src} alt="" fill style={{ objectFit: 'cover' }} sizes="52px" />
            </button>
          ))}
        </div>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.1em' }}>
          {active + 1} / {photos.length}
        </p>
      </div>
    </motion.div>
  )
}

// ─── Photo card ────────────────────────────────────────────────────────

function PhotoCard({ photo, index, onClick }: {
  photo: typeof PHOTOS[0]
  index: number
  onClick: () => void
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.45, delay: (index % 8) * 0.04 }}
      aria-label={`${photo.label} vergrößern`}
      className="rounded-xl overflow-hidden w-full h-full relative block"
      style={{
        gridColumn: `span ${photo.col}`,
        gridRow: `span ${photo.row}`,
        cursor: 'pointer',
        border: 'none',
        padding: 0,
        outline: 'none',
        backgroundColor: '#1A1714',
      }}
    >
      <Image
        src={photo.src}
        alt={photo.label}
        fill
        style={{
          objectFit: 'cover',
          transform: hovered ? 'scale(1.06)' : 'scale(1)',
          transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        loading={index < 6 ? 'eager' : 'lazy'}
      />

      {/* Hover overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }} />

      {/* Label + icon */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '12px 14px',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        opacity: hovered ? 1 : 0,
        transform: hovered ? 'translateY(0)' : 'translateY(6px)',
        transition: 'opacity 0.28s ease, transform 0.28s ease',
      }}>
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: 12,
          fontWeight: 600,
          color: '#fff',
          textShadow: '0 1px 4px rgba(0,0,0,0.5)',
        }}>
          {photo.label}
        </span>
        <div style={{
          width: 28, height: 28, borderRadius: '50%',
          background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
        </div>
      </div>
    </motion.button>
  )
}

type PhotoEntry = { src: string; label: string; col: number; row: number }

// ─── Main ──────────────────────────────────────────────────────────────

export default function GalleryPageClient({
  photos: photoProp,
  headerBg,
  bandsMenu,
}: {
  photos?: PhotoEntry[]
  headerBg?: string
  bandsMenu?: BandsMenuEntry[]
}) {
  const photos = photoProp?.length ? photoProp : PHOTOS
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), [])
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section style={{
        paddingTop: 56,
        background: 'var(--color-dark)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Subtle background photo */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src={headerBg ?? '/images/gallery-3.avif'}
            alt=""
            fill
            style={{ objectFit: 'cover', opacity: 0.18 }}
            sizes="100vw"
            priority
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(28,25,23,0.6) 0%, var(--color-dark) 100%)' }} />
        </div>

        <div className="max-w-7xl mx-auto" style={{ padding: '56px 40px 52px', position: 'relative', zIndex: 1 }}>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{ fontSize: 10, color: 'var(--color-orange)', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 600, fontFamily: 'var(--font-body)', marginBottom: 14 }}
          >
            Vivid Music Productions
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(48px, 7vw, 88px)',
              color: '#fff',
              lineHeight: 1,
              fontWeight: 700,
              marginBottom: 14,
              letterSpacing: '0.01em',
            }}
          >
            Galerie
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.18 }}
            style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'rgba(255,255,255,0.5)', maxWidth: 480 }}
          >
            Eindrücke von unvergesslichen Live-Events, unseren Bands und dem Tonstudio.
          </motion.p>
        </div>
      </section>

      <InlineNavBar bandsMenu={bandsMenu} />

      {/* ── Masonry grid ──────────────────────────────────────────── */}
      <div style={{ background: 'var(--color-bg)', minHeight: '60vh', position: 'relative' }}>
        <div aria-hidden style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `repeating-linear-gradient(-52deg, rgba(28,25,23,0.028) 0px, rgba(28,25,23,0.028) 1px, transparent 1px, transparent 22px), repeating-linear-gradient(38deg, rgba(28,25,23,0.016) 0px, rgba(28,25,23,0.016) 1px, transparent 1px, transparent 44px)`,
        }} />
        <div aria-hidden style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23g)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
          opacity: 0.045,
          mixBlendMode: 'multiply' as const,
        }} />
        <div className="max-w-7xl mx-auto" style={{ padding: '40px 20px 80px', position: 'relative' }}>
          <div
            className="grid grid-cols-2 md:grid-cols-4 [grid-auto-rows:160px] md:[grid-auto-rows:200px]"
            style={{ gap: 8, gridAutoFlow: 'dense' }}
          >
            {photos.map((photo, i) => (
              <PhotoCard
                key={photo.src}
                photo={photo}
                index={i}
                onClick={() => openLightbox(i)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Lightbox ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            photos={photos}
            startIndex={lightboxIndex}
            onClose={closeLightbox}
          />
        )}
      </AnimatePresence>
    </>
  )
}
