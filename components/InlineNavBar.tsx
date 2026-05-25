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
        className="w-full flex items-center relative"
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

        {/* flex-1 (not absolute) — can never overlap the right-side CTA; font scales via clamp */}
        <div className="hidden lg:flex flex-1 flex-wrap items-center justify-center" style={{ gap: 'clamp(8px, 1.3vw, 32px)' }}>
          <NavLinks color="#ffffff" bandsMenu={bandsMenu} />
        </div>

        {/* ml-auto pushes this to the right edge even when nav links are hidden */}
        <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
          <a href="/#kontakt"
            className="lg:hidden inline-flex items-center px-3 py-1.5 rounded-full font-body font-semibold text-white"
            style={{ backgroundColor: 'var(--color-orange)', fontSize: 12 }}>
            Anfragen
          </a>
          <button
            className="lg:hidden flex items-center justify-center"
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
          {/* compact at lg (1024-1279px), full size at xl (1280px+) */}
          <a href="/#kontakt"
            className="hidden lg:inline-flex items-center px-3 py-1.5 xl:px-5 xl:py-2 rounded-full font-body font-semibold text-white text-xs xl:text-sm"
            style={{ backgroundColor: 'var(--color-orange)' }}>
            Anfragen
          </a>
        </div>
      </nav>
    </>
  )
}
