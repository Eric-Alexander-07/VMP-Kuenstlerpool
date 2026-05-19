'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import InlineNavBar from './InlineNavBar'

// ─── Helpers ──────────────────────────────────────────────────────────

function useSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return { ref, inView }
}

// ─── Data ──────────────────────────────────────────────────────────────

const TEAM = [
  {
    name: 'Bobby Stöcker',
    role: 'Geschäftsführer & musikalischer Leiter',
    image: '/images/bobby-profile.avif',
    initials: 'BS',
  },
]

const FEATURES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Direkter Kontakt',
    text: 'Sie sprechen direkt mit dem musikalischen Leiter. Wir sind KEINE Agentur, die nur Vermittler sind! Wir kennen trotzdem beide Seiten – die des Musikers und des Veranstalters. Hier können wir Ihnen entscheidende Tipps geben, Sie unterstützen oder das Projekt für Sie in die Hand nehmen.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: '20+ Jahre Erfahrung',
    text: 'Bobby Stöcker arbeitet bundesweit mit den besten Sängern und Musikern zusammen und stellt sie seit 2001 zu interessanten musikalischen Projekten zusammen. Tausende Events, zufriedene Kunden — das ist kein Versprechen, das ist Geschichte.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    title: 'Vollservice',
    text: 'Band, Ablauf, Technik, Bühne, Ton & Lichttechnik aus einer Hand. Wir müssen nicht, können aber gerne alles für Sie koordinieren. Sie können sich auf uns verlassen und einfach Ihre Veranstaltung genießen.',
  },
]

// ─── Props ─────────────────────────────────────────────────────────────

interface Props {
  heroUrl?: string
  introUrl?: string
  teamUrls?: string[]
}

// ─── Main ──────────────────────────────────────────────────────────────

export default function UeberUnsPageClient({ heroUrl, introUrl, teamUrls }: Props) {
  const intro = useSection()
  const team  = useSection()
  const usp   = useSection()

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section style={{
        paddingTop: 56,
        background: 'var(--color-dark)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src={heroUrl ?? '/images/veranstaltungsservice.avif'}
            alt=""
            fill
            style={{ objectFit: 'cover', opacity: 0.18 }}
            sizes="100vw"
            priority
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(28,25,23,0.55) 0%, var(--color-dark) 100%)' }} />
        </div>

        <div className="max-w-7xl mx-auto" style={{ padding: '60px 40px 64px', position: 'relative', zIndex: 1 }}>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{ fontSize: 10, color: 'var(--color-orange)', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 600, fontFamily: 'var(--font-body)', marginBottom: 14 }}
          >
            Vivid Music Productions
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(46px, 7vw, 88px)',
              color: '#fff',
              lineHeight: 1,
              fontWeight: 700,
              marginBottom: 16,
            }}
          >
            Über uns
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ fontFamily: 'var(--font-body)', fontSize: 17, color: 'rgba(255,255,255,0.5)', fontStyle: 'italic' }}
          >
            Persönlich, direkt und seit 20 Jahren für Ihre Veranstaltung.
          </motion.p>
        </div>
      </section>

      <InlineNavBar />

      {/* ── Intro / Philosophy ────────────────────────────────────── */}
      <section style={{ background: 'var(--color-bg)', padding: '80px 0', position: 'relative' }}>
        {/* Texture */}
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

        <div ref={intro.ref} className="max-w-7xl mx-auto" style={{ padding: '0 40px', position: 'relative' }}>
          <div className="lg:grid" style={{ gridTemplateColumns: '1fr 1.4fr', gap: 72, alignItems: 'center' }}>

            {/* Left: text + contact */}
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              animate={intro.inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <p style={{ fontSize: 10, color: 'var(--color-orange)', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 600, fontFamily: 'var(--font-body)', marginBottom: 14 }}>
                Das Team
              </p>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(32px, 4vw, 52px)',
                fontWeight: 700,
                color: 'var(--color-dark)',
                lineHeight: 1.1,
                marginBottom: 24,
              }}>
                Persönlich.<br />Direkt. Verlässlich.
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 15,
                color: 'var(--color-muted)',
                lineHeight: 1.85,
                marginBottom: 32,
                maxWidth: 460,
              }}>
                Bei Interesse an einer Buchung beraten wir Sie gerne im Detail, telefonisch oder auch per E-Mail. Der Schlüssel zum Erfolg einer jeden Veranstaltung liegt unserer Meinung in der richtigen Kommunikation bzw. im Vertrauen. Und das kann man nur durch einen persönlichen Kontakt aufbauen.
              </p>

              {/* Contact */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <a
                  href="mailto:info@v-m-p.com"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    fontFamily: 'var(--font-body)',
                    fontSize: 14,
                    fontWeight: 600,
                    color: 'var(--color-dark)',
                    textDecoration: 'none',
                    padding: '10px 18px',
                    borderRadius: 8,
                    backgroundColor: 'rgba(28,25,23,0.06)',
                    border: '1px solid rgba(28,25,23,0.1)',
                    alignSelf: 'flex-start',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(28,25,23,0.1)')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'rgba(28,25,23,0.06)')}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  info@v-m-p.com
                </a>
                <a
                  href="tel:+496078759568"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    fontFamily: 'var(--font-body)',
                    fontSize: 14,
                    fontWeight: 600,
                    color: 'var(--color-muted)',
                    textDecoration: 'none',
                    alignSelf: 'flex-start',
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  06078-759568
                </a>
              </div>
            </motion.div>

            {/* Right: event photo */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              animate={intro.inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ marginTop: 40 }}
              className="lg:mt-0"
            >
              <div style={{ borderRadius: 18, overflow: 'hidden', position: 'relative', aspectRatio: '4/3', boxShadow: '0 24px 64px rgba(0,0,0,0.12)' }}>
                <Image
                  src={introUrl ?? '/images/groove-control.avif'}
                  alt="Das VMP-Team live auf der Bühne"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Team ──────────────────────────────────────────────────── */}
      <section style={{ background: '#F0EBE3', padding: '80px 0' }}>
        <div ref={team.ref} className="max-w-7xl mx-auto" style={{ padding: '0 40px' }}>

          <div className="lg:grid" style={{ gridTemplateColumns: '1fr auto', gap: 64, alignItems: 'start' }}>

            {/* Left: header + cards */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={team.inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                style={{ marginBottom: 48 }}
              >
                <p style={{ fontSize: 10, color: 'var(--color-orange)', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 600, fontFamily: 'var(--font-body)', marginBottom: 10 }}>
                  Unser Team
                </p>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: 'var(--color-dark)', lineHeight: 1.1 }}>
                  Die Menschen dahinter
                </h2>
              </motion.div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 300px))', gap: 24 }}>
                {TEAM.map((member, i) => {
                  const memberImage = teamUrls?.[i] ?? member.image
                  return (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 24 }}
                    animate={team.inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      borderRadius: 16,
                      overflow: 'hidden',
                      backgroundColor: '#fff',
                      boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
                    }}
                  >
                    {/* Photo */}
                    <div style={{ position: 'relative', aspectRatio: '3/4', backgroundColor: '#E8E0D4' }}>
                      {memberImage ? (
                        <Image
                          src={memberImage}
                          alt={member.name}
                          fill
                          style={{ objectFit: 'cover', filter: 'grayscale(15%)' }}
                          sizes="300px"
                        />
                      ) : (
                        <div style={{
                          position: 'absolute', inset: 0,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          background: 'linear-gradient(135deg, #D4C9BC 0%, #C4B8AA 100%)',
                        }}>
                          <span style={{ fontFamily: 'var(--font-display)', fontSize: 52, fontWeight: 700, color: 'rgba(28,25,23,0.25)' }}>
                            {member.initials}
                          </span>
                        </div>
                      )}
                      {/* Name overlay */}
                      <div style={{
                        position: 'absolute', bottom: 0, left: 0, right: 0,
                        padding: '32px 20px 16px',
                        background: 'linear-gradient(to top, rgba(28,25,23,0.75) 0%, transparent 100%)',
                      }}>
                        <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>
                          {member.name}
                        </p>
                      </div>
                    </div>
                    {/* Role */}
                    <div style={{ padding: '14px 20px 18px' }}>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--color-muted)', lineHeight: 1.5 }}>
                        {member.role}
                      </p>
                    </div>
                  </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Right: Facebook embed */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={team.inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block mt-0"
              style={{ marginTop: 0 }}
            >
              <p style={{ fontSize: 10, color: 'var(--color-orange)', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 600, fontFamily: 'var(--font-body)', marginBottom: 14 }}>
                Auf Facebook
              </p>
              <div style={{
                borderRadius: 16,
                overflow: 'hidden',
                border: '1px solid var(--color-border)',
                backgroundColor: '#fff',
                boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
              }}>
                <div style={{ padding: '12px 16px 10px', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, color: 'var(--color-dark)' }}>
                    VMP Künstlerpool
                  </span>
                </div>
                <iframe
                  src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FVMPKuenstlerpool%2F&tabs=timeline&width=340&height=500&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true"
                  width="340"
                  height="500"
                  style={{ border: 'none', overflow: 'hidden', display: 'block' }}
                  scrolling="no"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Warum direkt bei uns buchen? ──────────────────────────── */}
      <section
        id="ueber-uns"
        style={{ background: 'var(--color-dark)', padding: '80px 40px' }}
      >
        <div ref={usp.ref} className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={usp.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-display font-bold text-white mb-14 text-center"
            style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}
          >
            Warum direkt bei uns buchen?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {FEATURES.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 30 }}
                animate={usp.inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex flex-col gap-4"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'var(--color-orange)' }}
                >
                  <span className="text-white">{feat.icon}</span>
                </div>
                <h3 className="font-body font-bold text-white" style={{ fontSize: 17 }}>
                  {feat.title}
                </h3>
                <p className="font-body" style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>
                  {feat.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
