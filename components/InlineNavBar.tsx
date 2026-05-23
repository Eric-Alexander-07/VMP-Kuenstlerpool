'use client'

import { useState } from 'react'
import { NavLinks, MobileMenuDrawer, VmpBadge } from './Navbar'
import type { BandsMenuEntry } from './Navbar'

export default function InlineNavBar({ bandsMenu }: { bandsMenu?: BandsMenuEntry[] }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <MobileMenuDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} bandsMenu={bandsMenu} />
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

        <div className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2" style={{ gap: 'clamp(10px, 1.5vw, 32px)' }}>
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
    </>
  )
}
