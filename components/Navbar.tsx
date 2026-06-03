'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

// ── VMP Kreis-Logo ────────────────────────────────────────────────────

export function VmpBadge({ size = 48, shadow = true, borderWidth = 4 }: { size?: number; shadow?: boolean; borderWidth?: number }) {
  const showSub = size >= 70

  return (
    <div style={{
      width: size, height: size,
      borderRadius: '50%',
      background: 'linear-gradient(145deg, #E2BF58 0%, #C49220 38%, #8C6210 68%, #BF9928 100%)',
      border: `${borderWidth}px solid var(--color-bg-dark)`,
      boxShadow: shadow
        ? '0 4px 18px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.14), inset 0 2px 0 rgba(255,255,255,0.22)'
        : 'inset 0 0 0 1px rgba(255,255,255,0.12), inset 0 1px 0 rgba(255,255,255,0.18)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: showSub ? 4 : 0,
      flexShrink: 0,
    }}>
      <span style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        color: '#fff',
        fontSize: Math.round(size * (showSub ? 0.28 : 0.37)),
        letterSpacing: '0.12em',
        lineHeight: 1,
        userSelect: 'none',
        textShadow: '0 1px 4px rgba(0,0,0,0.45)',
      }}>
        VMP
      </span>
      {showSub && (
        <>
          <div style={{ width: '52%', height: 1, backgroundColor: 'rgba(255,255,255,0.3)' }} />
          <span style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.78)',
            fontSize: Math.round(size * 0.068),
            letterSpacing: '0.1em',
            lineHeight: 1,
            userSelect: 'none',
            textTransform: 'uppercase',
          }}>
            Künstlerpool
          </span>
        </>
      )}
    </div>
  )
}

// ── Nav data ──────────────────────────────────────────────────────────

export type BandsMenuEntry = {
  category: string
  href: string
  bands: { name: string; href: string }[]
}

export const NAV_ITEMS = [
  { label: 'Home',                href: '/',            dropdown: false },
  { label: 'Bands',               href: '/bands',       dropdown: true  },
  { label: 'Galerie',             href: '/galerie',     dropdown: false },
  { label: 'Technik & Tonstudio', href: '/technik',     dropdown: false },
  { label: 'Über uns',            href: '/ueber-uns',   dropdown: false },
  { label: 'Social Media',        href: '/#social',     dropdown: false },
  { label: 'Kontakt',             href: '/#kontakt',    dropdown: false },
  { label: 'Partner',             href: '/partner',     dropdown: false },
]

const BANDS_MENU_STATIC: BandsMenuEntry[] = [
  {
    category: 'Partybands', href: '/bands#partybands',
    bands: [
      { name: 'Spirit of Soul',  href: '/spirit-of-soul' },
      { name: 'Groove Control',  href: '/groove-control' },
      { name: 'BOBbastic',       href: '/bobbastic'      },
      { name: 'Time Warp',       href: '/time-warp'      },
    ],
  },
  {
    category: 'Tribute Bands', href: '/bands#tribute',
    bands: [
      { name: 'The Kiss Tribute Band', href: '/kiss-tribute'  },
      { name: 'CoverSnake',            href: '/coversnake'    },
      { name: 'The Adams Family',      href: '/adams-family'  },
      { name: 'Sir Williams',          href: '/sir-williams'  },
    ],
  },
  {
    category: 'Easy Listening', href: '/bands#easy-listening',
    bands: [
      { name: 'Bobby & Friends', href: '/bobby-and-friends' },
      { name: 'Marsch Mellows',  href: '/marsch-mellows'   },
    ],
  },
]

// ── Mobile drawer ─────────────────────────────────────────────────────

export function MobileMenuDrawer({ open, onClose, bandsMenu }: { open: boolean; onClose: () => void; bandsMenu?: BandsMenuEntry[] }) {
  const menu = bandsMenu ?? BANDS_MENU_STATIC
  const [bandsOpen, setBandsOpen] = useState(false)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setBandsOpen(false)
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="mob-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0"
            style={{ background: 'rgba(0,0,0,0.6)', zIndex: 490 }}
            onClick={onClose}
          />
          {/* Drawer */}
          <motion.div
            key="mob-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: [0.32, 0, 0.67, 0] }}
            className="fixed top-0 right-0 bottom-0 flex flex-col w-full sm:w-80"
            style={{ backgroundColor: 'var(--color-bg-dark)', zIndex: 500, overflowY: 'auto' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 flex-shrink-0"
              style={{ height: 56, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <a href="/" onClick={onClose} style={{ textDecoration: 'none' }}>
                <VmpBadge size={40} />
              </a>
              <button onClick={onClose}
                style={{ background: 'none', border: 'none', cursor: 'pointer',
                  color: 'rgba(255,255,255,0.7)', padding: 6, display: 'flex' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 px-5 pt-6 pb-4 flex flex-col">
              {NAV_ITEMS.map(item =>
                item.dropdown ? (
                  <div key="bands-mob">
                    <button
                      onClick={() => setBandsOpen(v => !v)}
                      className="w-full flex items-center justify-between font-display font-bold text-white"
                      style={{
                        fontSize: 24, background: 'none', border: 'none', cursor: 'pointer',
                        textAlign: 'left', padding: '14px 0',
                        borderBottom: '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      {item.label}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                        style={{ transform: bandsOpen ? 'rotate(180deg)' : 'none',
                          transition: 'transform 0.2s', flexShrink: 0, opacity: 0.4 }}>
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    </button>

                    <AnimatePresence>
                      {bandsOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22 }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div className="pt-4 pb-2 pl-3 flex flex-col gap-5">
                            {menu.map(cat => (
                              <div key={cat.category}>
                                <p style={{
                                  fontSize: 10, color: 'var(--color-orange)', textTransform: 'uppercase',
                                  letterSpacing: '0.15em', fontWeight: 600, marginBottom: 10,
                                  fontFamily: 'var(--font-body)',
                                }}>
                                  {cat.category}
                                </p>
                                <div className="flex flex-col gap-3">
                                  {cat.bands.map(band => (
                                    <a key={band.name} href={band.href} onClick={onClose}
                                      className="font-body"
                                      style={{ fontSize: 15, color: '#ffffff', textDecoration: 'none' }}>
                                      {band.name}
                                    </a>
                                  ))}
                                </div>
                              </div>
                            ))}
                            <a href="/bands" onClick={onClose}
                              className="font-body font-semibold text-center block"
                              style={{
                                fontSize: 13,
                                color: '#fff',
                                textDecoration: 'none',
                                backgroundColor: 'rgba(234,88,12,0.15)',
                                border: '1px solid rgba(234,88,12,0.3)',
                                borderRadius: 8,
                                padding: '10px 14px',
                                marginTop: 4,
                              }}
                            >
                              Alle Bands ansehen →
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <a key={item.href} href={item.href} onClick={onClose}
                    className="font-display font-bold text-white"
                    style={{
                      fontSize: 24, textDecoration: 'none', display: 'block',
                      padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.06)',
                    }}>
                    {item.label}
                  </a>
                )
              )}
            </nav>

            {/* CTA */}
            <div className="px-5 pb-10 pt-4">
              <a href="/#kontakt" onClick={onClose}
                className="flex items-center justify-center w-full rounded-full font-body font-bold text-white"
                style={{ backgroundColor: 'var(--color-orange)', fontSize: 15,
                  textDecoration: 'none', padding: '14px 24px' }}>
                JETZT ANFRAGEN
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ── Bands mega-dropdown ───────────────────────────────────────────────

function BandsMegaMenu({ open, bandsMenu }: { open: boolean; bandsMenu?: BandsMenuEntry[] }) {
  const menu = bandsMenu ?? BANDS_MENU_STATIC
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="bands-menu"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.16 }}
          className="absolute top-full mt-2 rounded-2xl overflow-hidden"
          style={{
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'var(--color-bg-dark)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
            minWidth: 520,
            zIndex: 9999,
          }}
        >
          <div className="grid grid-cols-3 p-6 gap-6">
            {menu.map(cat => (
              <div key={cat.category}>
                <a href={cat.href}
                  className="font-display uppercase block mb-4 transition-opacity hover:opacity-70"
                  style={{ fontSize: 14, color: 'var(--color-on-dark)', letterSpacing: '0.14em', textDecoration: 'none' }}>
                  {cat.category}
                </a>
                <div className="flex flex-col gap-2.5">
                  {cat.bands.map(band => (
                    <a key={band.name} href={band.href}
                      className="font-body transition-colors"
                      style={{ fontSize: 14, color: '#ffffff', textDecoration: 'none' }}
                      onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
                      onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                      {band.name}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '10px 24px' }}>
            <a href="/bands"
              className="font-body font-semibold block text-center w-full transition-opacity hover:opacity-70"
              style={{ fontSize: 12, color: '#ffffff', textDecoration: 'none' }}>
              Alle {menu.reduce((n, c) => n + c.bands.length, 0)} Bands ansehen →
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ── Nav links (desktop only) ──────────────────────────────────────────

export function NavLinks({ color = '#fff', bandsMenu }: { color?: string; bandsMenu?: BandsMenuEntry[] }) {
  const [bandsOpen, setBandsOpen] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const open  = () => { if (timerRef.current) clearTimeout(timerRef.current); setBandsOpen(true)  }
  const close = () => { timerRef.current = setTimeout(() => setBandsOpen(false), 140) }

  return (
    <>
      {NAV_ITEMS.map(item =>
        item.dropdown ? (
          <div key="bands-trigger" className="relative hidden lg:block" onMouseEnter={open} onMouseLeave={close}>
            <a
              href={item.href}
              className="flex items-center gap-1.5 font-display"
              style={{ color, fontSize: 'clamp(13px, 1.5vw, 19px)', letterSpacing: '0.08em', textDecoration: 'none', transition: 'opacity 0.15s', whiteSpace: 'nowrap' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              {item.label.toUpperCase()}
              <svg width="9" height="6" viewBox="0 0 9 6" fill="none"
                style={{ transform: bandsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s', marginTop: 1, opacity: 0.7 }}>
                <path d="M1 1l3.5 3.5L8 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <BandsMegaMenu open={bandsOpen} bandsMenu={bandsMenu} />
          </div>
        ) : (
          <a key={item.href} href={item.href}
            className="font-display hidden lg:block"
            style={{ color, fontSize: 'clamp(13px, 1.5vw, 19px)', letterSpacing: '0.08em', textDecoration: 'none', transition: 'opacity 0.15s', whiteSpace: 'nowrap' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
            {item.label.toUpperCase()}
          </a>
        )
      )}
    </>
  )
}

// ── Navbar ────────────────────────────────────────────────────────────

export default function Navbar({ bandsMenu }: { bandsMenu?: BandsMenuEntry[] }) {
  const pathname = usePathname()
  const isHome   = pathname === '/'
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const inlineNav = document.getElementById('inline-nav')
    if (inlineNav) {
      const observer = new IntersectionObserver(
        ([entry]) => setScrolled(!entry.isIntersecting),
        { threshold: 0 }
      )
      observer.observe(inlineNav)
      return () => observer.disconnect()
    } else {
      const onScroll = () => setScrolled(window.scrollY > 80)
      onScroll()
      window.addEventListener('scroll', onScroll, { passive: true })
      return () => window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const visible = scrolled

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.header
            key="navbar"
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center"
            style={{ backgroundColor: 'var(--color-bg-dark)', boxShadow: '0 2px 20px rgba(0,0,0,0.3)', overflow: 'visible', paddingLeft: 120, paddingRight: 16, minHeight: 64, paddingTop: 10, paddingBottom: 10 }}
          >
            {/* Logo — absolute, doesn't consume flex space */}
            <a href="/" style={{
              textDecoration: 'none',
              position: 'absolute',
              left: 28,
              top: 0,
              zIndex: 60,
            }}>
              <VmpBadge size={88} shadow={false} borderWidth={2} />
            </a>

            {/* Desktop nav — shown at lg (1024px+), font scales via clamp so items fit */}
            <nav className="hidden lg:flex flex-1 flex-wrap items-center justify-center self-center" style={{ gap: 'clamp(4px, 0.6vw, 8px) clamp(8px, 2.2vw, 28px)' }}>
              <NavLinks color="#ffffff" bandsMenu={bandsMenu} />
            </nav>

            {/* Right side — flex sibling, never overlaps nav */}
            <div className="flex items-center gap-2 flex-shrink-0 self-center ml-auto">
              <a href="/#kontakt"
                className="lg:hidden inline-flex items-center px-3 py-1.5 rounded-full font-body font-semibold text-white"
                style={{ backgroundColor: 'var(--color-orange)', fontSize: 12 }}>
                ANFRAGEN
              </a>
              <button
                className="lg:hidden flex items-center justify-center"
                onClick={() => setMobileOpen(true)}
                aria-label="Menü öffnen"
                style={{ width: 36, height: 36, background: 'none', border: 'none',
                  cursor: 'pointer', color: '#ffffff' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2.5" strokeLinecap="round">
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <line x1="3" y1="12" x2="21" y2="12"/>
                  <line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              </button>
              <a href="/#kontakt"
                className="hidden lg:inline-flex items-center px-3 py-1.5 xl:px-4 xl:py-2 rounded-full font-body font-semibold text-white text-xs xl:text-sm"
                style={{ backgroundColor: 'var(--color-orange)' }}>
                ANFRAGEN
              </a>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      <MobileMenuDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} bandsMenu={bandsMenu} />
    </>
  )
}
