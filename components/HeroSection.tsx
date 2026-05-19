'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { NavLinks, MobileMenuDrawer, VmpBadge } from './Navbar'

const SLIDES = [
  { src: '/images/hero/hero-event.avif',     label: 'Live auf der Bühne' },
  { src: '/images/hero/firmenevents.avif',   label: 'Firmenevents & Galas' },
  { src: '/images/hero/stadtfeste.avif',     label: 'Stadtfeste & Festivals' },
  { src: '/images/hero/hochzeit.avif',       label: 'Hochzeiten & Privatveranstaltungen' },
  { src: '/images/hero/empfaenge.avif',      label: 'Empfänge & Dinner' },
  { src: '/images/hero/gallery-1.avif',      label: 'Bühnenshow' },
  { src: '/images/hero/gallery-2.avif',      label: 'Livemusik' },
  { src: '/images/hero/gallery-3.avif',      label: 'Entertainment' },
  { src: '/images/hero/gallery-4.avif',      label: 'Events' },
  { src: '/images/hero/gallery-5.avif',      label: 'Konzert' },
]

const H1_WORDS = ['WE', 'LOVE', 'EVENTS!']


export default function HeroSection({ slides: propSlides }: { slides?: { src: string; label: string }[] }) {
  const slides = propSlides?.length ? propSlides : SLIDES

  const [active, setActive]           = useState(0)
  const [hovered, setHovered]         = useState(false)
  const [lightbox, setLightbox]       = useState<number | null>(null)
  const [direction, setDirection]     = useState(1) // 1 = forward, -1 = backward
  const [mobileOpen, setMobileOpen]   = useState(false)
  const pauseRef  = useRef(false)
  const touchStartX = useRef<number | null>(null)

  // Auto-advance — pauses on hover or when lightbox is open
  useEffect(() => {
    const id = setInterval(() => {
      if (!pauseRef.current) {
        setDirection(1)
        setActive(s => (s + 1) % slides.length)
      }
    }, 9000)
    return () => clearInterval(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length])

  useEffect(() => { pauseRef.current = hovered || lightbox !== null }, [hovered, lightbox])

  const prev = useCallback(() => {
    setDirection(-1)
    setActive(s => (s - 1 + slides.length) % slides.length)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length])

  const next = useCallback(() => {
    setDirection(1)
    setActive(s => (s + 1) % slides.length)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length])

  const openLightbox = (i: number) => setLightbox(i)
  const closeLightbox = () => setLightbox(null)

  const lightboxPrev = () => setLightbox(i => i !== null ? (i - 1 + slides.length) % slides.length : null)
  const lightboxNext = () => setLightbox(i => i !== null ? (i + 1) % slides.length : null)

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  lightboxPrev()
      if (e.key === 'ArrowRight') lightboxNext()
      if (e.key === 'Escape')     closeLightbox()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox])

  const slideVariants = {
    enter:  (d: number) => ({ x: d > 0 ? '100%' : '-100%' }),
    center: { x: 0 },
    exit:   (d: number) => ({ x: d > 0 ? '-100%' : '100%' }),
  }

  return (
    <>
      <MobileMenuDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* ── Lightbox ─────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ backgroundColor: 'rgba(0,0,0,0.92)' }}
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 flex items-center justify-center rounded-full text-white"
              style={{ width: 40, height: 40, backgroundColor: 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer', zIndex: 10 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Prev */}
            <button
              onClick={e => { e.stopPropagation(); lightboxPrev() }}
              className="absolute left-5 flex items-center justify-center rounded-full text-white"
              style={{ width: 48, height: 48, backgroundColor: 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer', zIndex: 10 }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Image */}
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.3 }}
              className="relative"
              style={{ width: 'min(90vw, 1100px)', height: 'min(80vh, 700px)' }}
              onClick={e => e.stopPropagation()}
            >
              <Image
                src={slides[lightbox].src}
                alt={slides[lightbox].label}
                fill
                style={{ objectFit: 'contain' }}
                sizes="(max-width: 768px) 90vw, 1100px"
              />
              {/* Caption */}
              {slides[lightbox].label && (
                <div className="absolute bottom-0 left-0 right-0 text-center pb-3">
                  <span
                    className="font-body font-semibold text-white px-4 py-1.5 rounded-full"
                    style={{ backgroundColor: 'rgba(28,25,23,0.7)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', fontSize: 13 }}
                  >
                    {slides[lightbox].label}
                  </span>
                </div>
              )}
            </motion.div>

            {/* Next */}
            <button
              onClick={e => { e.stopPropagation(); lightboxNext() }}
              className="absolute right-5 flex items-center justify-center rounded-full text-white"
              style={{ width: 48, height: 48, backgroundColor: 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer', zIndex: 10 }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* Counter */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 font-body text-white" style={{ fontSize: 12, opacity: 0.5 }}>
              {lightbox + 1} / {slides.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="hero" className="relative" style={{ backgroundColor: 'var(--color-bg)' }}>

        {/* ── Texture layers ────────────────────────────── */}

        {/* 1 · Diagonal hairline grid — the main character */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 0,
            backgroundImage: `
              repeating-linear-gradient(
                -52deg,
                rgba(28,25,23,0.028) 0px,
                rgba(28,25,23,0.028) 1px,
                transparent 1px,
                transparent 22px
              ),
              repeating-linear-gradient(
                38deg,
                rgba(28,25,23,0.016) 0px,
                rgba(28,25,23,0.016) 1px,
                transparent 1px,
                transparent 44px
              )
            `,
          }}
        />

        {/* 2 · Fine noise grain for warmth */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23g)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '200px 200px',
            opacity: 0.045,
            mixBlendMode: 'multiply',
          }}
        />

        {/* 3 · Soft radial vignette at edges */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 0,
            background: 'radial-gradient(ellipse at 50% 40%, transparent 50%, rgba(28,25,23,0.07) 100%)',
          }}
        />

        {/* ── Brand header (centered) ───────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative flex flex-col items-center pt-8 md:pt-12 pb-5 md:pb-7 px-4 md:px-6"
          style={{ zIndex: 2 }}
        >
          <a href="#">
            <Image src="/images/logo_dark_transparent.png" alt="Vivid Music Productions" width={280} height={100}
              style={{ height: 'clamp(80px, 11vw, 130px)', width: 'auto' }} />
          </a>
          <p className="mt-3 font-display text-center" style={{ fontSize: 'clamp(13px, 1.8vw, 18px)', letterSpacing: '0.22em', color: 'var(--color-muted)' }}>
            KÜNSTLERPOOL
          </p>
        </motion.div>

        {/* ── Inline Navbar ─────────────────────────────── */}
        <motion.nav
          id="inline-nav"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="w-full flex items-center justify-between relative"
          style={{ backgroundColor: 'var(--color-bg-dark)', height: 64, paddingLeft: 168, paddingRight: 24, overflow: 'visible', zIndex: 30 }}
        >
          {/* VMP-Kreis — zentriert in Navbar, ragt oben+unten gleich weit raus */}
          <a href="#" style={{
            textDecoration: 'none',
            position: 'absolute',
            left: 40,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 40,
          }}>
            <VmpBadge size={110} />
          </a>

          {/* Desktop links — centered */}
          <div className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2" style={{ gap: 'clamp(10px, 1.5vw, 32px)' }}>
            <NavLinks color="#ffffff" />
          </div>
          {/* Right side */}
          <div className="flex items-center gap-2">
            <a href="#kontakt"
              className="md:hidden inline-flex items-center px-3 py-1.5 rounded-full font-body font-semibold text-white"
              style={{ backgroundColor: 'var(--color-orange)', fontSize: 12 }}>
              Anfragen
            </a>
            <button
              className="md:hidden flex items-center justify-center"
              onClick={() => setMobileOpen(true)}
              aria-label="Menü öffnen"
              style={{ width: 36, height: 36, background: 'none', border: 'none',
                cursor: 'pointer', color: 'rgba(255,255,255,0.8)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2.5" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
            <a href="#kontakt"
              className="hidden md:inline-flex items-center px-5 py-2 rounded-full font-body font-semibold text-white text-sm"
              style={{ backgroundColor: 'var(--color-orange)' }}>
              Anfragen
            </a>
          </div>
        </motion.nav>

        {/* ── Two-column Hero ───────────────────────────── */}
        <div className="relative grid grid-cols-1 lg:grid-cols-[5fr_7fr] lg:min-h-[680px]" style={{ zIndex: 1 }}>

          {/* Left — Text */}
          <div className="flex flex-col justify-center px-5 md:px-10 lg:px-16 py-10 lg:py-20">
<h1 className="font-display font-bold text-dark leading-tight mb-2" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {H1_WORDS.map((word, i) => (
                  <motion.span key={word} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 + i * 0.08, duration: 0.5 }}>
                    {word}
                  </motion.span>
                ))}
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
                <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.87, duration: 0.5 }}>
                  Ihr Musiker &amp; Band
                </motion.span>
                <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.95, duration: 0.5 }} className="italic" style={{ color: 'var(--color-orange)' }}>
                  Direkt
                </motion.span>
                <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.03, duration: 0.5 }}>
                  Kontakt
                </motion.span>
              </div>
            </h1>

            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.5 }}
              className="font-body text-muted mt-6 mb-8" style={{ fontSize: 16, maxWidth: 460, lineHeight: 1.75 }}>
              Livemusik auf höchstem Niveau für Ihren Event, Ihre Firmenfeier, Ihre Hochzeit oder Ihr Stadtfest. Im V.M.P-Künstlerpool aus dem Rhein-Main (um Frankfurt, Darmstadt & Aschaffenburg) organisieren sich Profimusiker in Eigenregie. Unsere Tributebands, Coverbands und Partybands werden bundesweit und auch international für High Class Events gebucht.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.5 }}
              className="flex items-center gap-4"
            >
              {/* Bobby's profile photo */}
              <div className="relative flex-shrink-0" style={{ width: 52, height: 52 }}>
                <Image
                  src="/images/bobby-profile.avif"
                  alt="Bobby Stöcker"
                  fill
                  style={{ objectFit: 'cover', borderRadius: '50%', border: '2.5px solid var(--color-orange)' }}
                  sizes="52px"
                />
              </div>
              <div>
                <p className="font-body font-semibold text-dark" style={{ fontSize: 14, lineHeight: 1.3 }}>
                  Bobby Stöcker
                </p>
                <p className="font-body text-muted" style={{ fontSize: 12, lineHeight: 1.4 }}>
                  Persönlicher Ansprechpartner · Musikalischer Leiter
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right — Image Slider */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="flex items-center justify-center p-8 lg:p-14"
          >
          <div
            className="relative overflow-hidden rounded-2xl w-full"
            style={{ height: 'clamp(260px, 34vw, 480px)', maxWidth: 640 }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onTouchStart={e => { touchStartX.current = e.touches[0].clientX }}
            onTouchEnd={e => {
              if (touchStartX.current === null) return
              const diff = touchStartX.current - e.changedTouches[0].clientX
              if (Math.abs(diff) > 40) { if (diff > 0) next(); else prev() }
              touchStartX.current = null
            }}
          >
            {/* Slides */}
            <AnimatePresence custom={direction} mode="sync">
              <motion.div
                key={active}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute inset-0 cursor-pointer"
                onClick={() => openLightbox(active)}
              >
                <Image
                  src={slides[active].src}
                  alt={slides[active].label}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  priority={active === 0}
                />
                {/* Gradient */}
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.08) 50%, transparent 100%)' }} />
              </motion.div>
            </AnimatePresence>

            {/* Hover arrows — full-height bars */}
            <AnimatePresence>
              {hovered && (
                <>
                  <motion.button key="bar-left"
                    initial={{ opacity: 0, x: -44 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -44 }}
                    transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
                    whileHover="hovered"
                    onClick={prev}
                    className="absolute left-0 top-0 h-full z-20 flex items-center justify-center"
                    style={{
                      width: 44, border: 'none', cursor: 'pointer', color: '#fff',
                      backgroundColor: 'rgba(28,25,23,0.55)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
                      transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.backgroundColor = 'rgba(139,26,26,0.88)'
                      e.currentTarget.style.boxShadow = 'inset 3px 0 18px rgba(139,26,26,0.35), 4px 0 24px rgba(139,26,26,0.25)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.backgroundColor = 'rgba(28,25,23,0.55)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <motion.span
                      variants={{ hovered: { x: -4, scale: 1.2 } }}
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                      style={{ display: 'flex' }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </motion.span>
                  </motion.button>
                  <motion.button key="bar-right"
                    initial={{ opacity: 0, x: 44 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 44 }}
                    transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
                    whileHover="hovered"
                    onClick={next}
                    className="absolute right-0 top-0 h-full z-20 flex items-center justify-center"
                    style={{
                      width: 44, border: 'none', cursor: 'pointer', color: '#fff',
                      backgroundColor: 'rgba(28,25,23,0.55)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
                      transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.backgroundColor = 'rgba(139,26,26,0.88)'
                      e.currentTarget.style.boxShadow = 'inset -3px 0 18px rgba(139,26,26,0.35), -4px 0 24px rgba(139,26,26,0.25)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.backgroundColor = 'rgba(28,25,23,0.55)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <motion.span
                      variants={{ hovered: { x: 4, scale: 1.2 } }}
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                      style={{ display: 'flex' }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </motion.span>
                  </motion.button>
                </>
              )}
            </AnimatePresence>

            {/* Label */}
            <div className="absolute bottom-8 left-8 z-10">
              <AnimatePresence mode="wait">
                {slides[active].label && (
                  <motion.span key={active}
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="inline-block px-4 py-2 font-body font-semibold text-white rounded-full"
                    style={{ backgroundColor: 'rgba(28,25,23,0.65)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', fontSize: 13 }}>
                    {slides[active].label}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Dots */}
            <div className="absolute bottom-8 right-8 z-10 flex gap-2">
              {slides.map((_, i) => (
                <button key={i} onClick={() => { setDirection(i > active ? 1 : -1); setActive(i) }}
                  className="rounded-full"
                  style={{
                    width: i === active ? 20 : 7, height: 7, border: 'none', cursor: 'pointer',
                    backgroundColor: i === active ? 'var(--color-orange)' : 'rgba(255,255,255,0.4)',
                    transition: 'width 0.3s ease, background-color 0.3s ease',
                  }} />
              ))}
            </div>

            {/* Click-to-open hint */}
            <AnimatePresence>
              {hovered && (
                <motion.div key="hint"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full font-body text-white pointer-events-none"
                  style={{ backgroundColor: 'rgba(28,25,23,0.6)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', fontSize: 12 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  </svg>
                  Vollbild
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
