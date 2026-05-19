'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const SOCIALS = [
  {
    platform: 'Instagram',
    handle: '@vmp.frankfurt',
    description: 'Backstage-Momente, Live-Impressionen und Stories direkt vom Event.',
    href: 'https://instagram.com/vmp.frankfurt',
    hoverColor: 'rgba(225,48,108,0.18)',
    hoverBorder: 'rgba(225,48,108,0.45)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
    cta: 'Jetzt folgen',
  },
  {
    platform: 'Facebook',
    handle: 'Vivid Music Productions (V.M.P) Künstlerpool',
    description: 'Events, Neuigkeiten und direkte Anfragen über unsere Facebook-Seite.',
    href: 'https://www.facebook.com/VMPKuenstlerpool/',
    hoverColor: 'rgba(24,119,242,0.15)',
    hoverBorder: 'rgba(24,119,242,0.4)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
    cta: 'Seite besuchen',
  },
  {
    platform: 'YouTube',
    handle: 'Vivid Music Productions (V.M.P) Künstlerpool',
    description: 'Komplette Showmitschnitte aller Bands.',
    href: 'https://www.youtube.com/@VividMusicProductions',
    hoverColor: 'rgba(255,0,0,0.12)',
    hoverBorder: 'rgba(255,0,0,0.38)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
      </svg>
    ),
    cta: 'Videos ansehen',
  },
]

export default function UspSection() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      id="social"
      className="w-full py-14 md:py-24 px-4 md:px-6"
      style={{ backgroundColor: '#2C1810' }}
    >
      <div ref={ref} className="max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <p
              className="font-body font-semibold uppercase tracking-widest mb-2"
              style={{ fontSize: 10, color: 'var(--color-on-dark)', letterSpacing: '0.18em' }}
            >
              Social Media
            </p>
            <h2
              className="font-display font-bold text-white"
              style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', lineHeight: 1.15 }}
            >
              Bleiben Sie auf dem Laufenden.
            </h2>
          </div>
          <p className="font-body" style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', maxWidth: 380, lineHeight: 1.6 }}>
            Folgen Sie uns Tour, blicken Sie hinter die Kulissen, Backstage sowie bei Proben, oder bleiben Sie auf dem Laufenden mit den Terminen der Bands, wenn Sie uns bei einem unserer Konzerte besuchen wollen.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {SOCIALS.map((s, i) => (
            <motion.a
              key={s.platform}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group flex flex-col gap-5 p-7 rounded-2xl"
              style={{
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                textDecoration: 'none',
                transition: 'background-color 0.3s ease, border-color 0.3s ease, transform 0.25s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = s.hoverColor
                e.currentTarget.style.borderColor = s.hoverBorder
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = `0 16px 40px rgba(0,0,0,0.3)`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Icon + platform */}
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.75)' }}
                >
                  {s.icon}
                </div>
                <div>
                  <p className="font-body font-bold text-white" style={{ fontSize: 15 }}>
                    {s.platform}
                  </p>
                  <p className="font-body" style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)' }}>
                    {s.handle}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="font-body flex-1" style={{ fontSize: 13, color: 'rgba(255,255,255,0.78)', lineHeight: 1.65 }}>
                {s.description}
              </p>

              {/* CTA */}
              <div className="flex items-center gap-2 font-body font-semibold" style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', transition: 'color 0.2s' }}>
                <span className="group-hover:text-white transition-colors">{s.cta}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transition: 'transform 0.2s' }}
                  className="group-hover:translate-x-1">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  )
}
