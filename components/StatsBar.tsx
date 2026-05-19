'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const PROMINENT = ['AUDI', 'PORSCHE', 'VOLKSWAGEN', 'DEUTSCHE BANK', 'SAMSUNG']
const SECONDARY = ['REWE', 'DEUTSCHE POST', 'DVAG', 'DEBEKA', 'STIHL', 'BRIDGESTONE', 'WACKER CHEMIE', 'SONY ERICSSON', 'GRUNER & JAHR']


export default function StatsBar() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      className="w-full"
      style={{ backgroundColor: '#2C1810' }}
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-8 md:py-10 flex flex-col gap-6">

        {/* Gebucht von */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-3"
        >
          <span
            className="font-body font-semibold uppercase"
            style={{ fontSize: 9, color: '#ffffff', letterSpacing: '0.18em' }}
          >
            Gebucht von
          </span>

          {/* Prominent logos */}
          <div className="flex items-center gap-6 md:gap-10 flex-wrap">
            {PROMINENT.map((name, i) => (
              <motion.span
                key={name}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                className="font-body font-bold uppercase tracking-widest"
                style={{ fontSize: 13, color: '#ffffff', letterSpacing: '0.13em' }}
              >
                {name}
              </motion.span>
            ))}
          </div>

          {/* Secondary logos — desktop only */}
          <div className="hidden md:flex items-center gap-6 flex-wrap">
            {SECONDARY.map((name, i) => (
              <motion.span
                key={name}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.35 + i * 0.04 }}
                className="font-body font-medium uppercase"
                style={{ fontSize: 10, color: '#ffffff', letterSpacing: '0.1em' }}
              >
                {name}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.75 }}
              className="font-body font-medium"
              style={{ fontSize: 10, color: '#ffffff', letterSpacing: '0.05em' }}
            >
              u.v.m.
            </motion.span>
          </div>
        </motion.div>


      </div>
    </section>
  )
}
