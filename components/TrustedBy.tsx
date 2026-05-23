'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const LOGOS: { name: string; prominent: boolean }[] = [
  { name: 'AUDI',           prominent: true  },
  { name: 'PORSCHE',        prominent: true  },
  { name: 'VOLKSWAGEN',     prominent: true  },
  { name: 'DEUTSCHE BANK',  prominent: true  },
  { name: 'SAMSUNG',        prominent: true  },
  { name: 'REWE',           prominent: false },
  { name: 'DEUTSCHE POST',  prominent: false },
  { name: 'DVAG',           prominent: false },
  { name: 'DEBEKA',         prominent: false },
  { name: 'STIHL',          prominent: false },
  { name: 'BRIDGESTONE',    prominent: false },
  { name: 'WACKER CHEMIE',  prominent: false },
  { name: 'SONY ERICSSON',  prominent: false },
  { name: 'GRUNER & JAHR',  prominent: false },
]

export default function TrustedBy() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
      className="w-full bg-white py-4 md:py-6 px-5 md:px-8 flex flex-col justify-center gap-3"
    >
      {/* Row 1: label + prominent logos (scrollable on mobile) */}
      <div className="flex items-center gap-3 md:gap-6">
        <span
          className="font-body font-semibold uppercase flex-shrink-0"
          style={{ fontSize: 9, color: 'var(--color-subtle)', letterSpacing: '0.15em' }}
        >
          Gebucht von
        </span>
        <div className="hidden md:block h-4 w-px flex-shrink-0" style={{ backgroundColor: 'var(--color-border)' }} />
        <div
          className="flex items-center gap-5 md:gap-8 md:flex-wrap"
          style={{ overflowX: 'auto', scrollbarWidth: 'none', flexShrink: 1 }}
        >
          {LOGOS.filter(l => l.prominent).map(({ name }) => (
            <span
              key={name}
              className="font-body font-bold uppercase tracking-widest flex-shrink-0"
              style={{ fontSize: 12, color: '#9C948C', letterSpacing: '0.12em' }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* Row 2: secondary logos — hidden on mobile */}
      <div className="hidden md:flex items-center gap-6 flex-wrap">
        {LOGOS.filter(l => !l.prominent).map(({ name }) => (
          <span
            key={name}
            className="font-body font-medium uppercase tracking-widest"
            style={{ fontSize: 10, color: '#C8C2BB', letterSpacing: '0.1em' }}
          >
            {name}
          </span>
        ))}
        <span className="font-body font-medium" style={{ fontSize: 10, color: '#C8C2BB', letterSpacing: '0.04em' }}>
          u.v.m.
        </span>
      </div>
    </motion.section>
  )
}
