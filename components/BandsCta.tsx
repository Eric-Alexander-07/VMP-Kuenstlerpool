'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function BandsCta() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      className="w-full py-20 md:py-28 px-6"
      style={{ backgroundColor: 'var(--color-bg-alt)', borderTop: '1px solid var(--color-border)' }}
    >
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-8">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-4"
        >
          <p
            className="font-body font-semibold uppercase tracking-widest"
            style={{ fontSize: 10, color: 'var(--color-muted)', letterSpacing: '0.2em' }}
          >
            Vivid Music Productions
          </p>
          <h2
            className="font-display font-bold"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)', lineHeight: 1.1, color: 'var(--color-dark)' }}
          >
            Die richtige Band<br />für Ihren Abend.
          </h2>
          <p
            className="font-body"
            style={{ fontSize: 16, color: 'var(--color-muted)', lineHeight: 1.7, maxWidth: 480 }}
          >
            Direktkontakt zu Bobby Stöcker – ohne Aufpreis, ohne Vermittler.
            Wir finden gemeinsam die perfekte Band für Ihre Veranstaltung.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="/#kontakt"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-body font-bold text-white"
            style={{
              backgroundColor: 'var(--color-orange)',
              border: '1px solid var(--color-orange)',
              fontSize: 15,
              textDecoration: 'none',
              transition: 'opacity 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.opacity = '0.85'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.opacity = '1'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Jetzt anfragen
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>

          <a
            href="tel:+4960787595868"
            className="inline-flex items-center gap-2 font-body font-semibold"
            style={{ fontSize: 15, color: 'var(--color-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-dark)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-muted)')}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.07 1.18 2 2 0 012.06 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
            </svg>
            +49 6078 759 568
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="flex flex-wrap justify-center gap-x-8 gap-y-2"
        >
          {['Direktkontakt', 'Keine Agenturgebühren', 'Antwort in 24h', '20+ Jahre Erfahrung'].map(item => (
            <span key={item} className="font-body flex items-center gap-1.5"
              style={{ fontSize: 12, color: 'var(--color-subtle)' }}>
              <span style={{ color: 'var(--color-orange)' }}>✓</span> {item}
            </span>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
