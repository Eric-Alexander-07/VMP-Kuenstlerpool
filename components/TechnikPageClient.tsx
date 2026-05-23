'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import InlineNavBar from './InlineNavBar'
import type { BandsMenuEntry } from './Navbar'

// ─── Helpers ──────────────────────────────────────────────────────────

function useSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return { ref, inView }
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p style={{
      fontSize: 10,
      color: 'var(--color-orange)',
      textTransform: 'uppercase',
      letterSpacing: '0.2em',
      fontWeight: 600,
      fontFamily: 'var(--font-body)',
      marginBottom: 14,
    }}>
      {children}
    </p>
  )
}

function SectionHeading({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2 style={{
      fontFamily: 'var(--font-display)',
      fontSize: 'clamp(28px, 4vw, 46px)',
      fontWeight: 700,
      color: light ? '#fff' : 'var(--color-dark)',
      lineHeight: 1.1,
      marginBottom: 20,
    }}>
      {children}
    </h2>
  )
}

function BodyText({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p style={{
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      color: light ? 'rgba(255,255,255,0.6)' : 'var(--color-muted)',
      lineHeight: 1.8,
      maxWidth: 520,
    }}>
      {children}
    </p>
  )
}

function CtaLink({ href, children, light = false }: { href: string; children: React.ReactNode; light?: boolean }) {
  return (
    <motion.a
      href={href}
      whileHover={{ x: 4 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontFamily: 'var(--font-body)',
        fontSize: 14,
        fontWeight: 600,
        color: 'var(--color-orange)',
        textDecoration: 'none',
        marginTop: 28,
      }}
    >
      {children}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    </motion.a>
  )
}


// ─── Props ────────────────────────────────────────────────────────────

interface Props {
  heroUrl?: string
  mainUrl?: string
  thumbnailUrls?: string[]
  songwritingUrl?: string
  bandsMenu?: BandsMenuEntry[]
}

// ─── Main ─────────────────────────────────────────────────────────────

export default function TechnikPageClient({ heroUrl, mainUrl, thumbnailUrls, songwritingUrl, bandsMenu }: Props) {

  const s1 = useSection()
  const s2 = useSection()
  const s3 = useSection()
  const cta = useSection()

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  })

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
            src={heroUrl ?? '/images/technik-1.avif'}
            alt=""
            fill
            style={{ objectFit: 'cover', opacity: 0.2 }}
            sizes="100vw"
            priority
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(28,25,23,0.5) 0%, var(--color-dark) 100%)' }} />
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
            Veranstaltungstechnik<br />&amp; Tonstudio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ fontFamily: 'var(--font-body)', fontSize: 17, color: 'rgba(255,255,255,0.5)', fontStyle: 'italic' }}
          >
            Vollservice aus einer Hand – seit 20 Jahren.
          </motion.p>
        </div>
      </section>

      <InlineNavBar bandsMenu={bandsMenu} />

      {/* ── Section 1: Veranstaltungsservice ─────────────────────── */}
      <section style={{ background: 'var(--color-bg)', padding: '80px 0', position: 'relative' }}>
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
        <div ref={s1.ref} className="max-w-7xl mx-auto" style={{ padding: '0 40px', position: 'relative' }}>
          <div className="lg:grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>

            {/* Images */}
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              animate={s1.inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Main image */}
              <div style={{ borderRadius: 16, overflow: 'hidden', position: 'relative', aspectRatio: '4/3', marginBottom: 10 }}>
                <Image
                  src={mainUrl ?? '/images/technik-1.avif'}
                  alt="PA-Anlage und Bühnentechnik"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="50vw"
                />
              </div>
              {/* 3 smaller images */}
              {(() => {
                const fallbacks = ['/images/technik-2.avif', '/images/veranstaltungsservice.avif', '/images/hero-event.avif']
                const thumbs = fallbacks.map((fb, i) => thumbnailUrls?.[i] ?? fb)
                return (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                {thumbs.map((src, i) => (
                  <div key={i} style={{ borderRadius: 10, overflow: 'hidden', position: 'relative', aspectRatio: '1/1' }}>
                    <Image src={src} alt="" fill style={{ objectFit: 'cover' }} sizes="17vw" />
                  </div>
                ))}
              </div>
                )
              })()}
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              animate={s1.inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ marginTop: 40 }}
              className="lg:mt-0"
            >
              <Eyebrow>Veranstaltungsservice</Eyebrow>
              <SectionHeading>Band &amp; Technik aus einer Hand!</SectionHeading>
              <BodyText>
                Sie möchten eine Band buchen und haben noch keine Bühne, Licht und keine Beschallung für Ihre Gäste oder Zuschauer? Wir verstehen uns als Volldienstleister in allen Bereichen rund um Ihre Veranstaltung. Wir bieten attraktive Komplettpakete mit Band, Beschallung, Licht und Bühne – realisiert von erfahrenen Veranstaltungstechnikern.
              </BodyText>

              {/* Features */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 28 }}>
                {[
                  'Professionelle Sound Anlagen in alle Größen & Line-Array-Systeme',
                  'Lichtdesign',
                  'Modulare oder mobile Bühnensysteme bis 12m × 10m',
                  'Eigene Toningenieure & Veranstaltungstechniker',
                ].map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--color-orange)', flexShrink: 0 }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--color-muted)' }}>{item}</span>
                  </div>
                ))}
              </div>

              <CtaLink href="/#kontakt">Jetzt anfragen</CtaLink>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Musikproduktion ────────────────────────────── */}
      <section id="musikproduktion" style={{ background: '#F0EBE3', padding: '80px 0', borderTop: '1px solid var(--color-border)' }}>
        <div ref={s2.ref} className="max-w-5xl mx-auto" style={{ padding: '0 40px' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={s2.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <Eyebrow>Musikproduktion</Eyebrow>
            <SectionHeading>Werbejingles, Demos &amp; Auftragsproduktionen</SectionHeading>
            <BodyText>
              Seit über 20 Jahren produzieren wir Songs für Labels, Verlage, Werbeagenturen und Künstler wie Melanie Thornton und The Voice. TV-Werbejingles wie Cliff Duschgel, Focus Kontaktlinsen u.v.m. Fordern Sie Demos an oder vereinbaren Sie einen Termin.
            </BodyText>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={s2.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: 2,
              marginTop: 52,
              borderRadius: 16,
              overflow: 'hidden',
              border: '1px solid var(--color-border)',
            }}
          >
            {[
              { value: '20+', label: 'Jahre Erfahrung' },
              { value: '100+', label: 'Produktionen' },
              { value: 'Gold', label: 'Melanie Thornton – Ready To Fly' },
              { value: 'TV', label: 'Cliff Duschgel · Focus Kontaktlinsen · Bravo TV · The Voice' },
            ].map(({ value, label }, i) => (
              <div key={label} style={{
                backgroundColor: i % 2 === 0 ? '#fff' : 'rgba(255,255,255,0.6)',
                padding: '28px 32px',
                borderRight: i < 3 ? '1px solid var(--color-border)' : 'none',
              }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 38, color: 'var(--color-orange)', lineHeight: 1, marginBottom: 8 }}>{value}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--color-muted)', lineHeight: 1.5 }}>{label}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={s2.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            style={{
              marginTop: 28,
              padding: '16px 20px',
              backgroundColor: '#fff',
              border: '1px solid var(--color-border)',
              borderRadius: 12,
            }}
          >
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, color: 'var(--color-orange)', letterSpacing: '0.12em', textTransform: 'uppercase' as const, marginBottom: 8 }}>
              Live-Referenzen
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--color-muted)', lineHeight: 1.6 }}>
              Bobby Stöcker wirkte als Gitarrist beim Tommy Musical von The Who im Offenbacher Capitol mit, begleitete Stars wie Bobby Kimball auf der Bühne und veröffentlichte 2022 international unter dem Namen Bobby Stoker sein erstes Solo-Album mit eigenen komponierten Songs.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={s2.inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.35 }}
          >
            <CtaLink href="/#kontakt">Demo anfragen</CtaLink>
          </motion.div>
        </div>
      </section>

      {/* ── Section 3: Songwriting ────────────────────────────────── */}
      <section id="songwriting" style={{ background: 'var(--color-bg)', padding: '80px 0', position: 'relative', overflow: 'hidden', borderTop: '1px solid var(--color-border)' }}>
        {/* Diagonal hairline grid texture */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `repeating-linear-gradient(-52deg, rgba(28,25,23,0.028) 0px, rgba(28,25,23,0.028) 1px, transparent 1px, transparent 22px), repeating-linear-gradient(38deg, rgba(28,25,23,0.016) 0px, rgba(28,25,23,0.016) 1px, transparent 1px, transparent 44px)`,
        }} />

        <div ref={s3.ref} className="max-w-7xl mx-auto" style={{ padding: '0 40px', position: 'relative' }}>
          <div className="lg:grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>

            {/* Text – left */}
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              animate={s3.inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Eyebrow>Songwriting &amp; Arrangements</Eyebrow>
              <SectionHeading>Songs für Verlage, Künstler &amp; Werbung</SectionHeading>
              <BodyText>
                Bobby Stöcker ist seit 20 Jahren nicht nur Live- bzw. Tourmusiker, sondern auch ein renommierter Songschreiber und Produzent. Von Pop &amp; Rock über Dance bis R&amp;B – Songs hat er auch schon für andere Künstler geschrieben. Auch für Firmen, Nachwuchsbands und Künstler bieten wir Demo Produktionen und Auftragskompositionen an.
              </BodyText>

              {/* Gold achievement card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={s3.inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{
                  marginTop: 32,
                  backgroundColor: '#fff',
                  border: '1px solid rgba(139,26,26,0.18)',
                  borderRadius: 14,
                  padding: '20px 22px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <span style={{ fontSize: 16 }}>🏆</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, color: 'var(--color-orange)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    Gold-Status
                  </span>
                </div>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--color-dark)', fontWeight: 700, marginBottom: 6 }}>
                  Melanie Thornton – Ready To Fly
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--color-muted)', marginBottom: 4 }}>
                  150.000 verkaufte Alben · Platz 3 der deutschen Album-Charts
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--color-subtle)' }}>
                  + Top 10 DJ-Charts mit Ayla Presents Yell
                </p>
              </motion.div>

              <CtaLink href="/#kontakt">Termin vereinbaren</CtaLink>
            </motion.div>

            {/* Image – right */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              animate={s3.inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              style={{ marginTop: 40 }}
              className="lg:mt-0"
            >
              <div style={{ borderRadius: 16, overflow: 'hidden', position: 'relative', aspectRatio: '4/3', border: '1px solid var(--color-border)', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
                <Image
                  src={songwritingUrl ?? '/images/melanie-thornton.avif'}
                  alt="Melanie Thornton"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="45vw"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section style={{ background: 'var(--color-dark)', padding: '80px 40px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div ref={cta.ref} className="max-w-3xl mx-auto" style={{ textAlign: 'center' }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={cta.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: 'var(--color-orange)', textTransform: 'uppercase' as const, letterSpacing: '0.2em', fontWeight: 600, marginBottom: 16 }}
          >
            Vollservice aus einer Hand
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={cta.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)', color: '#fff', fontWeight: 700, lineHeight: 1.1, marginBottom: 16 }}
          >
            Interesse an einem Komplettpaket?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={cta.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.16 }}
            style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'rgba(255,255,255,0.5)', marginBottom: 36, lineHeight: 1.7 }}
          >
            Wir erstellen Ihnen ein unverbindliches Angebot — Band + Technik aus einer Hand.
          </motion.p>
          <motion.a
            href="/#kontakt"
            initial={{ opacity: 0, y: 10 }}
            animate={cta.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.24 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              backgroundColor: 'var(--color-orange)',
              color: '#fff',
              padding: '14px 36px',
              borderRadius: 30,
              fontSize: 15,
              fontWeight: 700,
              fontFamily: 'var(--font-body)',
              textDecoration: 'none',
            }}
          >
            Jetzt anfragen
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </motion.a>
        </div>
      </section>
    </>
  )
}
