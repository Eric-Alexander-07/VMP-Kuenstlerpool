'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const CLIENTS = [
  'AUDI',
  'PORSCHE',
  'VOLKSWAGEN',
  'DEUTSCHE BANK',
  'SAMSUNG',
  'LUFTHANSA',
  'COMMERZBANK',
  'REWE',
  'DEUTSCHE POST',
  'DVAG',
  'DEBEKA',
  'STIHL',
  'BRIDGESTONE',
  'WACKER CHEMIE',
  'SONY ERICSSON',
  'GRUNER & JAHR',
  'FOSSIL',
  'WELLA',
  'TRILUX',
  'KNORR-BREMSE',
  'TUI',
  'SCHENKER',
  'ALDIANA',
  'ROBINSON',
  'GEO SAISON',
  'ITB BERLIN',
  'CEBIT',
  'HANNOVER MESSE',
  'HAMBURGER PRESSEBALL',
  'BALL DES SPORTS',
  'LIONS CLUB',
  'ATP TENNISTURNIER HANNOVER',
  "TOYS 'R' US",
  '125 JAHRE FLENSBURGER',
  'JOHANNISNACHT MAINZ',
  'SÜDBAHNHOF FRANKFURT',
  'COLOS-SAAL ASCHAFFENBURG',
  'SCHLOSSGRABENFEST DARMSTADT',
]

// Intersperse separators between items, then triple for seamless loop
const single: (string | null)[] = CLIENTS.flatMap((name, i) => [
  name,
  ...(i < CLIENTS.length - 1 ? [null] : []),
])
const ITEMS = [...single, null, ...single, null, ...single]

export default function TrustedBy() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
      className="w-full overflow-hidden"
      style={{
        backgroundColor: 'var(--color-bg-dark)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Label */}
      <div className="flex items-center gap-4 px-5 md:px-8 pt-4 pb-3">
        <span
          className="font-body font-semibold uppercase flex-shrink-0"
          style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.15em' }}
        >
          Gebucht von
        </span>
        <div className="h-px flex-1" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }} />
      </div>

      {/* Ticker */}
      <div className="relative overflow-hidden pb-4">
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, var(--color-bg-dark) 0%, transparent 100%)' }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, var(--color-bg-dark) 0%, transparent 100%)' }}
        />

        <motion.div
          animate={{ x: ['0%', '-33.333%'] }}
          transition={{ duration: 75, repeat: Infinity, ease: 'linear' }}
          className="flex items-center whitespace-nowrap"
          style={{ width: 'max-content', gap: 20 }}
        >
          {ITEMS.map((item, i) =>
            item === null ? (
              <span
                key={i}
                aria-hidden
                className="select-none"
                style={{ fontSize: 10, color: 'rgba(234,88,12,0.35)', lineHeight: 1 }}
              >
                ·
              </span>
            ) : (
              <span
                key={i}
                className="font-body font-bold uppercase"
                style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.1em' }}
              >
                {item}
              </span>
            )
          )}
        </motion.div>
      </div>
    </motion.section>
  )
}
