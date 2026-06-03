'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import InlineNavBar from './InlineNavBar'
import type { BandsMenuEntry } from './Navbar'
import type { BandNav } from '@/types/band'

// ── Icon components ───────────────────────────────────────────────────

function CameraIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
      <circle cx="12" cy="13" r="4"/>
    </svg>
  )
}

function VideoIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="23 7 16 12 23 17 23 7"/>
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
    </svg>
  )
}

function ExternalLinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  )
}

function MusicIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13"/>
      <circle cx="6" cy="18" r="3"/>
      <circle cx="18" cy="16" r="3"/>
    </svg>
  )
}

// ── Media partners ────────────────────────────────────────────────────

const MEDIA_PARTNERS: {
  name: string
  role: string
  specialty: string
  type: 'photo' | 'video'
  website?: string
}[] = [
  {
    name: 'Hans Jürgen Luft (Lufti)',
    role: 'Eventfotografie',
    specialty: 'Live-Events · Konzerte · Veranstaltungen',
    type: 'photo',
  },
  {
    name: 'Michael Wagner',
    role: 'Eventfotografie',
    specialty: 'Live-Events · Konzerte · Veranstaltungen',
    type: 'photo',
    website: 'https://www.instagram.com/photographerwmphoto',
  },
  {
    name: 'Oliver Haremsa',
    role: 'Eventfotografie',
    specialty: 'Live-Events · Konzerte · Veranstaltungen',
    type: 'photo',
    website: 'https://www.instagram.com/emeraldpicsbyoh?igsh=cXpwNTc1c3VzdXhr',
  },
  {
    name: 'Marvin Stang',
    role: 'Eventfotografie',
    specialty: 'Live-Events · Konzerte · Veranstaltungen',
    type: 'photo',
  },
  {
    name: 'Jochen Hasmanis',
    role: 'Videoproduktion',
    specialty: 'Event-Videos · Konzerte · Live-Mitschnitte',
    type: 'video',
    website: 'https://www.frame-spotting.de',
  },
  {
    name: 'Evelyne Papparazzi',
    role: 'Videoproduktion',
    specialty: 'Event-Videos · Konzerte · Live-Mitschnitte',
    type: 'video',
    website: 'https://youtube.com/@thepaparazzi001?si=sw-DsKcTaF6PBk8W',
  },
  {
    name: 'Damir Klaushofer',
    role: 'Videoproduktion',
    specialty: 'Event-Videos · Konzerte · Live-Mitschnitte',
    type: 'video',
  },
  {
    name: 'Klaus Allert',
    role: 'Videoproduktion',
    specialty: 'Event-Videos · Konzerte · Live-Mitschnitte',
    type: 'video',
  },
  {
    name: 'CAM Movies',
    role: 'Videoproduktion',
    specialty: 'Event-Videos · Konzerte · Live-Mitschnitte',
    type: 'video',
    website: 'https://www.chrisundarthur.de',
  },
  {
    name: 'Michael Meinzinger',
    role: 'Videoproduktion',
    specialty: 'Event-Videos · Konzerte · Live-Mitschnitte',
    type: 'video',
    website: 'https://www.instagram.com/michael_meinzinger?igsh=eG95OXdtN2RyN2M5',
  },
]

// ── Category helpers ──────────────────────────────────────────────────

function getCategoryLabel(category: BandNav['category']): string {
  switch (category) {
    case 'partyband':      return 'Partybands'
    case 'tribute':        return 'Tribute Bands'
    case 'easy-listening': return 'Easy Listening'
  }
}

const CATEGORY_ORDER: BandNav['category'][] = ['partyband', 'tribute', 'easy-listening']

const CATEGORY_DESCRIPTIONS: Record<BandNav['category'], string> = {
  'partyband':      'Energiegeladene Live-Bands für jede Tanzfläche',
  'tribute':        'Originalgetreue Shows der größten Acts aller Zeiten',
  'easy-listening': 'Elegante Loungemusik für Empfänge und besondere Anlässe',
}

// ── Media Partner Card ────────────────────────────────────────────────

function MediaPartnerCard({ partner, index, inView }: {
  partner: typeof MEDIA_PARTNERS[0]
  index: number
  inView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      style={{
        backgroundColor: '#fff',
        border: '1px solid var(--color-border)',
        borderRadius: 16,
        padding: '32px 28px',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      {/* Icon */}
      <div style={{
        width: 56,
        height: 56,
        borderRadius: 14,
        backgroundColor: 'var(--color-dark)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--color-orange)',
        flexShrink: 0,
      }}>
        {partner.type === 'photo' ? <CameraIcon /> : <VideoIcon />}
      </div>

      {/* Role tag */}
      <div>
        <span style={{
          display: 'inline-block',
          fontSize: 10,
          fontWeight: 600,
          fontFamily: 'var(--font-body)',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--color-orange)',
          backgroundColor: 'rgba(234,88,12,0.08)',
          padding: '3px 10px',
          borderRadius: 20,
        }}>
          {partner.role}
        </span>
      </div>

      {/* Name */}
      <div>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 20,
          color: 'var(--color-dark)',
          lineHeight: 1.2,
          marginBottom: 6,
        }}>
          {partner.name}
        </h3>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 13,
          color: 'var(--color-muted)',
          lineHeight: 1.6,
        }}>
          {partner.specialty}
        </p>
      </div>

      {/* Website link (optional) */}
      {partner.website && (
        <a
          href={partner.website}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--color-orange)',
            textDecoration: 'none',
            marginTop: 'auto',
          }}
        >
          Website besuchen <ExternalLinkIcon />
        </a>
      )}
    </motion.div>
  )
}

// ── Band Link Card ────────────────────────────────────────────────────

function BandLinkCard({ band, index, inView }: {
  band: BandNav
  index: number
  inView: boolean
}) {
  return (
    <motion.a
      href={`/${band.slug}`}
      initial={{ opacity: 0, x: -8 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        padding: '14px 18px',
        borderRadius: 12,
        border: '1px solid rgba(255,255,255,0.08)',
        backgroundColor: 'rgba(255,255,255,0.04)',
        textDecoration: 'none',
        transition: 'background-color 0.18s, border-color 0.18s, transform 0.18s',
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.backgroundColor = 'rgba(234,88,12,0.08)'
        e.currentTarget.style.borderColor = 'rgba(234,88,12,0.25)'
        e.currentTarget.style.transform = 'translateX(4px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
        e.currentTarget.style.transform = 'translateX(0)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ color: 'var(--color-orange)', flexShrink: 0 }}>
          <MusicIcon />
        </div>
        <span style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 600,
          fontSize: 15,
          color: '#fff',
        }}>
          {band.name}
        </span>
      </div>
      <div style={{ color: 'rgba(255,255,255,0.35)', flexShrink: 0 }}>
        <ExternalLinkIcon />
      </div>
    </motion.a>
  )
}

// ── Main ──────────────────────────────────────────────────────────────

export default function PartnerPageClient({
  bands,
  bandsMenu,
}: {
  bands: BandNav[]
  bandsMenu: BandsMenuEntry[]
}) {
  const mediaRef  = useRef<HTMLElement>(null)
  const bandsRef  = useRef<HTMLElement>(null)
  const mediaInView = useInView(mediaRef,  { once: true, margin: '-60px' })
  const bandsInView = useInView(bandsRef,  { once: true, margin: '-60px' })

  const grouped = CATEGORY_ORDER.reduce<Record<string, BandNav[]>>((acc, cat) => {
    acc[cat] = bands.filter(b => b.category === cat)
    return acc
  }, {} as Record<string, BandNav[]>)

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section style={{
        backgroundColor: 'var(--color-dark)',
        paddingTop: 56,
        paddingBottom: 0,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Subtle grid pattern */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />

        <div className="max-w-7xl mx-auto" style={{ padding: '72px 40px 80px', position: 'relative', zIndex: 1 }}>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{ fontSize: 10, color: 'var(--color-orange)', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 600, fontFamily: 'var(--font-body)', marginBottom: 16 }}
          >
            Vivid Music Productions
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(52px, 8vw, 96px)',
              color: '#fff',
              lineHeight: 1,
              fontWeight: 700,
              marginBottom: 24,
              letterSpacing: '-0.01em',
            }}
          >
            Partner
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(15px, 2vw, 18px)',
              color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.7,
              maxWidth: 520,
            }}
          >
            Fotografen und Videografen, die unsere Events professionell festhalten –
            sowie alle Bands aus dem VMP-Künstlerpool mit ihren eigenen Websites.
          </motion.p>
        </div>

      </section>

      <InlineNavBar bandsMenu={bandsMenu} />

      {/* ── Medienprofis ──────────────────────────────────────────── */}
      <section
        ref={mediaRef}
        style={{
          backgroundColor: 'var(--color-bg)',
          paddingTop: 80,
          paddingBottom: 96,
          backgroundImage: `repeating-linear-gradient(-52deg, rgba(28,25,23,0.028) 0px, rgba(28,25,23,0.028) 1px, transparent 1px, transparent 22px), repeating-linear-gradient(38deg, rgba(28,25,23,0.016) 0px, rgba(28,25,23,0.016) 1px, transparent 1px, transparent 44px)`,
        }}
      >
        <div className="max-w-7xl mx-auto" style={{ padding: '0 40px' }}>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={mediaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: 48 }}
          >
            <p style={{
              fontSize: 10, color: 'var(--color-orange)', textTransform: 'uppercase',
              letterSpacing: '0.2em', fontWeight: 600, fontFamily: 'var(--font-body)', marginBottom: 12,
            }}>
              Foto &amp; Video
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(28px, 4vw, 42px)',
              color: 'var(--color-dark)',
              lineHeight: 1.15,
              marginBottom: 12,
            }}>
              Unsere Medienprofis
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 15,
              color: 'var(--color-muted)',
              maxWidth: 480,
              lineHeight: 1.7,
            }}>
              Erfahrene Fotografen und Videografen, mit denen wir seit Jahren zusammenarbeiten
              und die das Besondere eines jeden Events einfangen.
            </p>
          </motion.div>

          {/* Cards */}
          <div
            className="grid gap-6"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}
          >
            {MEDIA_PARTNERS.map((partner, i) => (
              <MediaPartnerCard
                key={i}
                partner={partner}
                index={i}
                inView={mediaInView}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Unsere Bands ──────────────────────────────────────────── */}
      <section
        ref={bandsRef}
        style={{ backgroundColor: 'var(--color-dark)', paddingTop: 88, paddingBottom: 100 }}
      >
        <div className="max-w-7xl mx-auto" style={{ padding: '0 40px' }}>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={bandsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: 56 }}
          >
            <p style={{
              fontSize: 10, color: 'var(--color-orange)', textTransform: 'uppercase',
              letterSpacing: '0.2em', fontWeight: 600, fontFamily: 'var(--font-body)', marginBottom: 12,
            }}>
              Künstlerpool
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(28px, 4vw, 42px)',
              color: '#fff',
              lineHeight: 1.15,
              marginBottom: 12,
            }}>
              Unsere Bands
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 15,
              color: 'rgba(255,255,255,0.5)',
              maxWidth: 480,
              lineHeight: 1.7,
            }}>
              Jede Band aus dem VMP-Künstlerpool hat ihre eigene Präsenz. Hier finden Sie
              direkte Links zu allen Bandwebsites.
            </p>
          </motion.div>

          {/* Band groups */}
          <div className="grid gap-10 lg:grid-cols-3">
            {CATEGORY_ORDER.map((cat, catIndex) => {
              const catBands = grouped[cat] ?? []
              if (catBands.length === 0) return null
              return (
                <motion.div
                  key={cat}
                  initial={{ opacity: 0, y: 24 }}
                  animate={bandsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                >
                  {/* Category header */}
                  <div style={{ marginBottom: 20 }}>
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: 18,
                      color: '#fff',
                      marginBottom: 6,
                    }}>
                      {getCategoryLabel(cat)}
                    </h3>
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 12,
                      color: 'rgba(255,255,255,0.4)',
                      lineHeight: 1.5,
                    }}>
                      {CATEGORY_DESCRIPTIONS[cat]}
                    </p>
                    <div style={{ width: 32, height: 2, backgroundColor: 'var(--color-orange)', borderRadius: 1, marginTop: 14 }} />
                  </div>

                  {/* Band links */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {catBands.map((band, i) => (
                      <BandLinkCard
                        key={band.slug}
                        band={band}
                        index={i}
                        inView={bandsInView}
                      />
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={bandsInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.5 }}
            style={{
              marginTop: 56,
              fontFamily: 'var(--font-body)',
              fontSize: 12,
              color: 'rgba(255,255,255,0.25)',
              textAlign: 'center',
            }}
          >
            Eigene Bandwebsites werden schrittweise ergänzt.
          </motion.p>
        </div>
      </section>
    </>
  )
}
