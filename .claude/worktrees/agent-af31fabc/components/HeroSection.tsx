'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { NavLinks } from './Navbar'

const SLIDES = [
  { src: '/images/hero/hero-event.avif',     label: 'Live auf der Bühne' },
  { src: '/images/hero/firmenevents.avif',   label: 'Firmenevents & Galas' },
  { src: '/images/hero/stadtfeste.avif',     label: 'Stadtfeste & Festivals' },
  { src: '/images/hero/hochzeit.avif',       label: 'Hochzeitsbands' },
  { src: '/images/hero/empfaenge.avif',      label: 'Empfänge & Dinner' },
  { src: '/images/hero/gallery-1.avif',      label: 'Bühnenshow' },
  { src: '/images/hero/gallery-2.avif',      label: 'Livemusik' },
  { src: '/images/hero/gallery-3.avif',      label: 'Entertainment' },
  { src: '/images/hero/gallery-4.avif',      label: 'Events' },
  { src: '/images/hero/gallery-5.avif',      label: 'Konzert' },
]

const H1_WORDS = ['Ihr', 'Künstler']


export default function HeroSection() {
  const [active, setActive]           = useState(0)
  const [hovered, setHovered]         = useState(false)
  const [lightbox, setLightbox]       = useState<number | null>(null)
  const [direction, setDirection]     = useState(1) // 1 = forward, -1 = backward
  const pauseRef = useRef(false)

  // Auto-advance — pauses on hover or when lightbox is open
  useEffect(() => {
    const id = setInterval(() => {
      if (!pauseRef.current) {
        setDirection(1)
        setActive(s => (s + 1) % SLIDES.length)
      }
    }, 3800)
    return () => clearInterval(id)
  }, [])

  useEffect(() => { pauseRef.current = hovered || lightbox !== null }, [hovered, lightbox])

  const prev = useCallback(() => {
    setDirection(-1)
    setActive(s => (s - 1 + SLIDES.length) % SLIDES.length)
  }, [])

  const next = useCallback(() => {
    setDirection(1)
    setActive(s => (s + 1) % SLIDES.length)
  }, [])

  const openLightbox = (i: number) => setLightbox(i)
  const closeLightbox = () => setLightbox(null)

  const lightboxPrev = () => setLightbox(i => i !== null ? (i - 1 + SLIDES.length) % SLIDES.length : null)
  const lightboxNext = () => setLightbox(i => i !== null ? (i + 1) % SLIDES.length : null)

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
    enter:  (d: number) => ({ opacity: 0, x: d > 0 ?  40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit:   (d: number) => ({ opacity: 0, x: d > 0 ? -40 :  40 }),
  }

  return (
    <>
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
                src={SLIDES[lightbox].src}
                alt={SLIDES[lightbox].label}
                fill
                style={{ objectFit: 'contain' }}
                sizes="(max-width: 768px) 90vw, 1100px"
              />
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 text-center pb-3">
                <span
                  className="font-body font-semibold text-white px-4 py-1.5 rounded-full"
                  style={{ backgroundColor: 'rgba(28,25,23,0.7)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', fontSize: 13 }}
                >
                  {SLIDES[lightbox].label}
                </span>
              </div>
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
              {lightbox + 1} / {SLIDES.length}
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
          className="relative flex flex-col items-center pt-8 md:pt-12 pb-4 md:pb-6 px-4 md:px-6"
          style={{ zIndex: 1 }}
        >
          <a href="#">
            <Image src="/images/logo_dark_transparent.png" alt="Vivid Music Productions" width={280} height={100}
              style={{ height: 'clamp(70px, 10vw, 110px)', width: 'auto' }} />
          </a>
          <p className="mt-2 font-body uppercase tracking-widest text-subtle" style={{ fontSize: 11, letterSpacing: '0.18em' }}>
            <span style={{ color: 'var(--color-orange)', fontWeight: 700 }}>V</span>IVID{' '}
            <span style={{ color: 'var(--color-orange)', fontWeight: 700 }}>M</span>USIC{' '}
            <span style={{ color: 'var(--color-orange)', fontWeight: 700 }}>P</span>RODUCTIONS · FRANKFURT AM MAIN
          </p>
        </motion.div>

        {/* ── Inline Navbar ─────────────────────────────── */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="w-full flex items-center justify-center gap-10 px-8 md:px-12 relative"
          style={{ backgroundColor: 'var(--color-dark)', height: 56 }}
        >
          <a href="#" className="absolute left-4 md:left-8 block">
            <Image src="/images/logo_light_transparent.png" alt="Vivid Music Productions" width={80} height={28} style={{ height: 28, width: 'auto' }} />
          </a>
          <NavLinks color="rgba(255,255,255,0.55)" />
          <a href="#kontakt" className="inline-flex items-center px-5 py-2 rounded-full font-body font-semibold text-white text-sm"
            style={{ backgroundColor: 'var(--color-orange)' }}>
            Anfragen
          </a>
        </motion.nav>

        {/* ── Two-column Hero ───────────────────────────── */}
        <div className="relative grid grid-cols-1 lg:grid-cols-[5fr_7fr] lg:min-h-[680px]" style={{ zIndex: 1 }}>

          {/* Left — Text */}
          <div className="flex flex-col justify-center px-5 md:px-10 lg:px-16 py-10 lg:py-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="inline-flex items-center self-start gap-2 px-4 py-2 rounded-full font-body font-semibold mb-8"
              style={{ backgroundColor: 'var(--color-orange-light)', color: 'var(--color-orange-text)', fontSize: 13 }}
            >
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--color-orange)' }} />
              20 Jahre Erfahrung · Kein Mittelsmann
            </motion.div>

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
                  transition={{ delay: 0.87, duration: 0.5 }} className="italic" style={{ color: 'var(--color-orange)' }}>
                  direkt
                </motion.span>
                <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.95, duration: 0.5 }}>
                  kontakt
                </motion.span>
              </div>
            </h1>

            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.5 }}
              className="font-body text-muted mt-6 mb-8" style={{ fontSize: 16, maxWidth: 460, lineHeight: 1.75 }}>
              10 Profi-Bands für Firmenevents, Hochzeiten und Festivals — direkt buchbar, ohne Aufpreis, mit 20 Jahren Erfahrung im Rhein-Main-Gebiet.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15, duration: 0.5 }} className="flex flex-wrap gap-3 mb-10">
              <a href="#bands" className="inline-flex items-center px-7 py-3.5 rounded-full font-body font-semibold text-white"
                style={{ backgroundColor: 'var(--color-orange)', fontSize: 15, boxShadow: '0 4px 20px rgba(234,88,12,0.3)', transition: 'opacity 0.2s, transform 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}>
                Jetzt Band finden
              </a>
              <a href="#kategorien" className="inline-flex items-center px-7 py-3.5 rounded-full font-body font-semibold"
                style={{ border: '1.5px solid var(--color-dark)', color: 'var(--color-dark)', fontSize: 15, transition: 'opacity 0.2s, transform 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)' }}>
                Alle Kategorien
              </a>
            </motion.div>

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
            className="relative overflow-hidden"
            style={{ minHeight: 'clamp(320px, 50vw, 700px)' }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {/* Slides */}
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={active}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: 'easeInOut' }}
                className="absolute inset-0 cursor-pointer"
                onClick={() => openLightbox(active)}
              >
                <Image
                  src={SLIDES[active].src}
                  alt={SLIDES[active].label}
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
                      e.currentTarget.style.backgroundColor = 'rgba(234,88,12,0.88)'
                      e.currentTarget.style.boxShadow = 'inset 3px 0 18px rgba(234,88,12,0.35), 4px 0 24px rgba(234,88,12,0.25)'
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
                      e.currentTarget.style.backgroundColor = 'rgba(234,88,12,0.88)'
                      e.currentTarget.style.boxShadow = 'inset -3px 0 18px rgba(234,88,12,0.35), -4px 0 24px rgba(234,88,12,0.25)'
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
                <motion.span key={active}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="inline-block px-4 py-2 font-body font-semibold text-white rounded-full"
                  style={{ backgroundColor: 'rgba(28,25,23,0.65)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', fontSize: 13 }}>
                  {SLIDES[active].label}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Dots */}
            <div className="absolute bottom-8 right-8 z-10 flex gap-2">
              {SLIDES.map((_, i) => (
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
          </motion.div>
        </div>
      </section>
    </>
  )
}
