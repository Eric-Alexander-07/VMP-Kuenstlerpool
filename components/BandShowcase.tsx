'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { NavLinks, MobileMenuDrawer, VmpBadge } from './Navbar'
import type { BandCardData, BandsMenuEntry } from '@/types/band'

// ─── Ambient glow helper ─────────────────────────────────────────

function Glow({
  x, y, color = 'rgba(234,88,12,0.07)', size = 700,
}: {
  x: string; y: string; color?: string; size?: number
}) {
  return (
    <div
      aria-hidden
      className="absolute pointer-events-none select-none"
      style={{
        left: x, top: y,
        width: size, height: size * 0.75,
        transform: 'translate(-50%, -50%)',
        background: `radial-gradient(ellipse at center, ${color} 0%, transparent 68%)`,
        borderRadius: '50%',
        zIndex: 0,
      }}
    />
  )
}

// ─── Static fallback data ─────────────────────────────────────────

const PARTY_BANDS: BandCardData[] = [
  {
    name: 'Groove Control',
    tagline: 'Der Allrounder für jede Tanzfläche',
    description: 'Die Allround-Partyband für Unternehmens-Events, Stadtfeste und Hochzeiten. Immer ausgebucht.',
    href: '/groove-control',
    image: '/images/groove-control.avif',
  },
  {
    name: 'Spirit of Soul',
    tagline: 'The finest of Black Music',
    description: 'Authentischer Soul und Funk – eine Show, die niemanden auf dem Stuhl lässt.',
    href: '/spirit-of-soul',
    image: '/images/spirit-of-soul.avif',
  },
  {
    name: 'Time Warp',
    tagline: 'Fünf Jahrzehnte. Ein Abend.',
    description: 'Von den 60ern bis heute – musikalische Zeitreise durch fünf Jahrzehnte.',
    href: '/time-warp',
    image: '/images/time-warp.avif',
  },
  {
    name: 'BOBbastic',
    tagline: 'Drei Mann. Maximale Energie.',
    description: 'Drei Musiker, maximale Energie – klassischer Rock in konzentriertester Form.',
    href: '/bobbastic',
    image: '/images/bobbastic.avif',
  },
]

const TRIBUTE_BANDS: BandCardData[] = [
  {
    name: 'The Kiss Tribute Band',
    tagline: 'Die heißeste Show Deutschlands',
    description: "Deutschlands erfolgreichste Kiss-Tribute-Show – originalgetreues Make-up, Kostüme und feurige Pyroshow.",
    href: '/kiss-tribute',
    image: '/images/KissTribute.avif',
  },
  {
    name: 'CoverSnake',
    tagline: 'Decades of the Snake',
    description: 'Decades of the Snake – authentischer Hard Rock der 80er auf höchstem Niveau.',
    href: '/coversnake',
    image: '/images/coversnake.avif',
  },
  {
    name: 'The Adams Family',
    tagline: 'Summer of \'69 – live erlebt',
    description: "Summer of '69, Run to You und mehr – inklusive stimmungsvollem Unplugged-Set.",
    href: '/adams-family',
    image: '/images/adams-family.avif',
  },
  {
    name: 'Sir Williams',
    tagline: 'Feel me, rock me, entertain me',
    description: 'Die ultimative Robbie Williams Show – charismatisch, mitreißend, authentisch.',
    href: '/sir-williams',
    image: '/images/sir-williams.avif',
  },
]

const EASY_BANDS: BandCardData[] = [
  {
    name: 'Bobby & Friends',
    tagline: 'Musik, die den Raum füllt',
    description: 'Elegante Loungemusik mit Jazz-Einflüssen – ideal für Empfänge und private Feiern.',
    href: '/bobby-and-friends',
    image: '/images/bobby-and-friends.avif',
  },
  {
    name: 'Marsch Mellows',
    tagline: 'Der Walkact, der überrascht',
    description: 'Überraschend, charmant und ganz ohne Bühne – der besondere Empfangs-Act.',
    href: '/marsch-mellows',
    image: '/images/marsch-mellows.avif',
  },
]

// ─── Compact overlay card ─────────────────────────────────────────

function BandCard({
  band, index, inView, height = 280,
}: {
  band: BandCardData
  index: number
  inView: boolean
  height?: number
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.a
      href={band.href}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      whileHover={{ y: -4, boxShadow: '0 18px 48px rgba(0,0,0,0.5)' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative overflow-hidden rounded-xl block"
      style={{
        height,
        textDecoration: 'none',
        border: '1px solid rgba(255,255,255,0.06)',
        backgroundColor: '#1A1714',
        flexShrink: 0,
      }}
    >
      {band.image && (
        <Image
          src={band.image}
          alt={band.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
        />
      )}
      {/* Gradient */}
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)' }} />
      {/* Orange hover tint */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(to top, rgba(139,26,26,0.45) 0%, transparent 65%)' }} />

      {/* Name + tag + tagline */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
        <h3 className="font-display font-bold text-white" style={{ fontSize: 18, lineHeight: 1.2, marginBottom: 4 }}>
          {band.name}
        </h3>
        <p className="font-body" style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', fontStyle: 'italic' }}>
          {band.tagline}
        </p>
        {/* Description — fades + slides up on hover */}
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

// ─── Section header ───────────────────────────────────────────────

function SectionHeader({
  eyebrow, title, subtitle, inView, light = false,
}: {
  eyebrow: string; title: string; subtitle: string; inView: boolean; light?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="mb-10"
    >
      <p
        className="font-body font-semibold uppercase tracking-widest mb-3"
        style={{ fontSize: 11, color: light ? 'var(--color-on-dark)' : 'var(--color-orange)', letterSpacing: '0.18em' }}
      >
        {eyebrow}
      </p>
      <h2
        className="font-display font-bold mb-3"
        style={{
          fontSize: 'clamp(26px, 4vw, 40px)',
          lineHeight: 1.15,
          color: light ? '#fff' : 'var(--color-dark)',
        }}
      >
        {title}
      </h2>
      <p className="font-body" style={{ fontSize: 15, color: light ? 'rgba(255,255,255,0.5)' : 'var(--color-muted)', maxWidth: 480 }}>
        {subtitle}
      </p>
    </motion.div>
  )
}

// ─── Ticker strip ────────────────────────────────────────────────

const TICKER_BANDS_STATIC = [
  { name: 'Groove Control',        tagline: 'Der Allrounder für jede Tanzfläche',  href: '/groove-control' },
  { name: 'Spirit of Soul',        tagline: 'The finest of Black Music',            href: '/spirit-of-soul' },
  { name: 'Time Warp',             tagline: 'Fünf Jahrzehnte. Ein Abend.',          href: '/time-warp' },
  { name: 'BOBbastic',             tagline: 'Drei Mann. Maximale Energie.',         href: '/bobbastic' },
  { name: 'The Kiss Tribute Band', tagline: 'Die heißeste Show Deutschlands',       href: '/kiss-tribute' },
  { name: 'CoverSnake',            tagline: 'Decades of the Snake',                 href: '/coversnake' },
  { name: 'The Adams Family',      tagline: 'Summer of \'69 – live erlebt',         href: '/adams-family' },
  { name: 'Sir Williams',          tagline: 'Feel me, rock me, entertain me',       href: '/sir-williams' },
  { name: 'Bobby & Friends',       tagline: 'Musik, die den Raum füllt',            href: '/bobby-and-friends' },
  { name: 'Marsch Mellows',        tagline: 'Der Walkact, der überrascht',          href: '/marsch-mellows' },
]

function TickerStrip({ tickerBands }: { tickerBands?: { name: string; tagline: string; href: string }[] }) {
  const data = tickerBands ?? TICKER_BANDS_STATIC
  // Interleave separators between bands
  const items = data.flatMap((b, i) => [
    b,
    ...(i < data.length - 1 ? [null] : []),
  ])
  // Triple for a seamless loop: animate from 0 to -33.33%
  const tripled = [...items, null, ...items, null, ...items]

  return (
    <div
      className="w-full overflow-hidden py-3"
      style={{ backgroundColor: 'var(--color-on-dark)', borderTop: '1px solid rgba(139,26,26,0.15)', borderBottom: '1px solid rgba(139,26,26,0.15)' }}
    >
      <motion.div
        animate={{ x: ['0%', '-33.333%'] }}
        transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
        className="flex items-start gap-10 whitespace-nowrap"
        style={{ width: 'max-content' }}
      >
        {tripled.map((item, i) =>
          item === null ? (
            <span key={i} className="font-display font-bold select-none"
              style={{ fontSize: 14, color: 'rgba(139,26,26,0.35)' }}>·</span>
          ) : (
            <a
              key={i}
              href={item.href}
              className="inline-flex flex-col transition-opacity hover:opacity-70"
              style={{ textDecoration: 'none' }}
            >
              <span className="font-display font-bold"
                style={{ fontSize: 14, color: 'var(--color-orange)', letterSpacing: '0.04em', lineHeight: 1.2 }}>
                {item.name}
              </span>
              <span className="font-body"
                style={{ fontSize: 10, color: 'var(--color-muted)', fontStyle: 'italic', lineHeight: 1.3 }}>
                {item.tagline}
              </span>
            </a>
          )
        )}
      </motion.div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────

export default function BandShowcase({
  partyBands:   partyBandsProp,
  tributeBands: tributeBandsProp,
  easyBands:    easyBandsProp,
  bandsMenu,
}: {
  partyBands?:   BandCardData[]
  tributeBands?: BandCardData[]
  easyBands?:    BandCardData[]
  bandsMenu?:    BandsMenuEntry[]
}) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const partyBands   = partyBandsProp   ?? PARTY_BANDS
  const tributeBands = tributeBandsProp ?? TRIBUTE_BANDS
  const easyBands    = easyBandsProp    ?? EASY_BANDS

  const tickerBands = [
    ...partyBands,
    ...tributeBands,
    ...easyBands,
  ].map(b => ({ name: b.name, tagline: b.tagline, href: b.href }))

  const introRef   = useRef<HTMLDivElement>(null)
  const partyRef   = useRef<HTMLDivElement>(null)
  const tributeRef = useRef<HTMLDivElement>(null)
  const easyRef    = useRef<HTMLDivElement>(null)

  const introInView   = useInView(introRef,   { once: true, margin: '-60px' })
  const partyInView   = useInView(partyRef,   { once: true, margin: '-60px' })
  const tributeInView = useInView(tributeRef, { once: true, margin: '-60px' })
  const easyInView    = useInView(easyRef,    { once: true, margin: '-60px' })

  return (
    <>
    <MobileMenuDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} bandsMenu={bandsMenu} />
    <div id="bands">

      {/* ── Intro strip ──────────────────────────────────── */}
      <section
        ref={introRef}
        className="relative overflow-hidden w-full py-20 px-6 md:px-10"
        style={{ backgroundColor: 'var(--color-bg)' }}
      >
        {/* Diagonal hairline grid texture */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0, backgroundImage: `repeating-linear-gradient(-52deg, rgba(28,25,23,0.028) 0px, rgba(28,25,23,0.028) 1px, transparent 1px, transparent 22px), repeating-linear-gradient(38deg, rgba(28,25,23,0.016) 0px, rgba(28,25,23,0.016) 1px, transparent 1px, transparent 44px)` }} />

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={introInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
          >
            <p
              className="font-body font-semibold uppercase tracking-widest mb-3"
              style={{ fontSize: 11, color: 'var(--color-orange)', letterSpacing: '0.18em' }}
            >
              Das komplette Line-up
            </p>
            <h2
              className="font-display font-bold"
              style={{ fontSize: 'clamp(30px, 5vw, 52px)', lineHeight: 1.1, color: 'var(--color-dark)' }}
            >
              Live Musik.<br />
              <span style={{ color: 'var(--color-orange)' }}>Eine Adresse.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={introInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col gap-4 md:items-end"
          >
            {[
              { num: '4', label: 'Partybands' },
              { num: '4', label: 'Tribute Bands' },
              { num: '2', label: 'Easy Listening' },
            ].map((s) => (
              <div key={s.label} className="flex items-baseline gap-3 md:flex-row-reverse">
                <span className="font-display font-bold" style={{ fontSize: 32, color: 'var(--color-dark)', lineHeight: 1 }}>
                  {s.num}
                </span>
                <span className="font-body" style={{ fontSize: 13, color: 'var(--color-muted)' }}>
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Inline navbar ─────────────────────────────────── */}
      <nav
        id="inline-nav"
        className="w-full flex items-center justify-between relative"
        style={{ backgroundColor: 'var(--color-bg-dark)', height: 64, paddingLeft: 168, paddingRight: 24, overflow: 'visible', zIndex: 30 }}
      >
        <a href="/" style={{
          textDecoration: 'none',
          position: 'absolute',
          left: 40,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 40,
        }}>
          <VmpBadge size={110} />
        </a>
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          <NavLinks color="#ffffff" bandsMenu={bandsMenu} />
        </div>
        <div className="flex items-center gap-2">
          <a href="/#kontakt"
            className="md:hidden inline-flex items-center px-3 py-1.5 rounded-full font-body font-semibold text-white"
            style={{ backgroundColor: 'var(--color-orange)', fontSize: 12 }}>
            Anfragen
          </a>
          <button
            className="md:hidden flex items-center justify-center"
            onClick={() => setMobileOpen(true)}
            aria-label="Menü öffnen"
            style={{ width: 36, height: 36, background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.8)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
          <a href="/#kontakt"
            className="hidden md:inline-flex items-center px-5 py-2 rounded-full font-body font-semibold text-white text-sm"
            style={{ backgroundColor: 'var(--color-orange)' }}>
            Anfragen
          </a>
        </div>
      </nav>

      {/* Ticker */}
      <TickerStrip tickerBands={tickerBands} />

      {/* ── 1. Partybands ────────────────────────────────── */}
      <section
        ref={partyRef}
        id="partybands"
        className="relative overflow-hidden w-full py-20 px-4 md:px-10"
        style={{ backgroundColor: 'var(--color-bg)' }}
      >
        <Glow x="80%" y="25%" color="rgba(139,26,26,0.06)" size={800} />
        <Glow x="5%"  y="75%" color="rgba(139,26,26,0.04)" size={500} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Kategorie 01"
            title="Partybands"
            subtitle="Das Zugpferd des Line-ups. Vier vielseitige Bands für jede Größenordnung — von der Firmenfeier bis zum Stadtfest."
            inView={partyInView}
            light={false}
          />
          {/* Mobile: horizontal scroll */}
          <div className="flex md:hidden gap-3 pb-3 -mx-4 px-4"
            style={{ overflowX: 'auto', scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}>
            {partyBands.map((band, i) => (
              <div key={band.name} style={{ width: '72vw', flexShrink: 0, scrollSnapAlign: 'start' }}>
                <BandCard band={band} index={i} inView={partyInView} height={280} />
              </div>
            ))}
          </div>
          {/* Desktop: grid */}
          <div className="hidden md:block">
            <div className="grid grid-cols-2 gap-3 mb-3">
              {partyBands.slice(0, 2).map((band, i) => (
                <BandCard key={band.name} band={band} index={i} inView={partyInView} height={340} />
              ))}
            </div>
            <div className="grid grid-cols-4 gap-3">
              {partyBands.slice(2).map((band, i) => (
                <BandCard key={band.name} band={band} index={i + 2} inView={partyInView} height={220} />
              ))}
              <div className="col-span-2 flex items-center justify-center rounded-xl"
                style={{ height: 220, border: '1px dashed var(--color-border-strong)', backgroundColor: 'var(--color-bg-alt)' }}>
                <a href="/#kontakt" className="font-body font-semibold transition-colors hover:opacity-70"
                  style={{ fontSize: 14, color: 'var(--color-orange)', textDecoration: 'none' }}>
                  Partyband anfragen →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Tribute Bands ─────────────────────────────── */}
      <section
        ref={tributeRef}
        id="tribute"
        className="relative overflow-hidden w-full py-20 px-4 md:px-10"
        style={{ backgroundColor: 'var(--color-bg-alt)' }}
      >
        <Glow x="50%" y="10%" color="rgba(139,26,26,0.05)" size={900} />
        <Glow x="15%" y="80%" color="rgba(139,26,26,0.03)" size={400} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Kategorie 02"
            title="Tribute Bands"
            subtitle="Vier Tribute-Acts mit Wiedererkennungswert. Die Kiss-Show mit Pyrotechnik ist ein Alleinstellungsmerkmal in Deutschland."
            inView={tributeInView}
            light={false}
          />
          {/* Mobile: horizontal scroll */}
          <div className="flex md:hidden gap-3 pb-3 -mx-4 px-4"
            style={{ overflowX: 'auto', scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}>
            {tributeBands.map((band, i) => (
              <div key={band.name} style={{ width: '72vw', flexShrink: 0, scrollSnapAlign: 'start' }}>
                <BandCard band={band} index={i} inView={tributeInView} height={280} />
              </div>
            ))}
          </div>
          {/* Desktop: grid */}
          <div className="hidden md:block">
            <div className="grid grid-cols-4 gap-3 mb-3">
              {tributeBands.map((band, i) => (
                <BandCard key={band.name} band={band} index={i} inView={tributeInView} height={300} />
              ))}
            </div>
            <div className="flex items-center justify-center rounded-xl"
              style={{ height: 72, border: '1px dashed var(--color-border-strong)', backgroundColor: 'var(--color-bg)' }}>
              <a href="/#kontakt" className="font-body font-semibold transition-colors hover:opacity-70"
                style={{ fontSize: 14, color: 'var(--color-orange)', textDecoration: 'none' }}>
                Tribute Band anfragen →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Easy Listening ────────────────────────────── */}
      <section
        ref={easyRef}
        id="easy-listening"
        className="w-full py-20 px-4 md:px-10"
        style={{ backgroundColor: 'var(--color-bg)' }}
      >
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Kategorie 03"
            title="Easy Listening"
            subtitle="Das Nischenangebot für gehobene Empfänge, Dinner-Events und Wohnzimmerkonzerte — wer es sucht, weiß warum."
            inView={easyInView}
            light={false}
          />
          {/* Mobile: horizontal scroll */}
          <div className="flex md:hidden gap-3 pb-3 -mx-4 px-4"
            style={{ overflowX: 'auto', scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}>
            {easyBands.map((band, i) => (
              <div key={band.name} style={{ width: '72vw', flexShrink: 0, scrollSnapAlign: 'start' }}>
                <BandCard band={band} index={i} inView={easyInView} height={280} />
              </div>
            ))}
          </div>
          {/* Desktop: grid */}
          <div className="hidden md:grid grid-cols-4 gap-3">
            {easyBands.map((band, i) => (
              <BandCard key={band.name} band={band} index={i} inView={easyInView} height={300} />
            ))}
            {/* Spacer CTA */}
            <div className="col-span-2 flex items-center justify-center rounded-xl"
              style={{ height: 300, border: '1px dashed var(--color-border-strong)', backgroundColor: 'var(--color-bg-alt)' }}>
              <a href="/#kontakt" className="font-body font-semibold transition-colors hover:opacity-70"
                style={{ fontSize: 14, color: 'var(--color-orange)', textDecoration: 'none' }}>
                Easy Listening anfragen →
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
    </>
  )
}
