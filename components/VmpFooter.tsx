'use client'

import Image from 'next/image'
import { INQUIRY_MAIL_HREF } from '@/lib/inquiryMail'

const FOOTER_NAV = [
  { label: 'Home',                 href: '#'           },
  { label: 'Partybands',           href: '#partybands' },
  { label: 'Tribute Bands',        href: '#tribute'    },
  { label: 'Easy Listening',       href: '#easy-listening' },
  { label: 'Galerie',              href: '/galerie'    },
  { label: 'Technik & Tonstudio',  href: '/technik'    },
  { label: 'Über uns',             href: '/ueber-uns'  },
  { label: 'Social Media',         href: '#social'     },
  { label: 'Kontakt',              href: '#kontakt'    },
]

const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/bobbystoker',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/VMPKuenstlerpool/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@VividMusicProductions',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
      </svg>
    ),
  },
]

export default function VmpFooter() {
  return (
    <footer className="w-full" style={{ backgroundColor: '#2C1810' }}>
      <div className="max-w-5xl mx-auto px-6 pt-12 pb-8 md:pt-16 md:pb-10">

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr_2fr] gap-10 md:gap-12 mb-12">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <a href="#" className="inline-block">
              <Image
                src="/images/logo_light_transparent.png"
                alt="Vivid Music Productions"
                width={160}
                height={56}
                style={{ height: 46, width: 'auto' }}
              />
            </a>
            <p className="font-body" style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.65 }}>
              Beste Qualität an Live-Musik – direkt gebucht.<br />
              64823 Groß-Umstadt · Rhein Main Gebiet · seit 2001
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 mt-1">
              {SOCIALS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex items-center justify-center rounded-xl transition-colors"
                  style={{
                    width: 38, height: 38,
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    color: 'rgba(255,255,255,0.65)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    transition: 'background-color 0.2s, color 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = 'rgba(234,88,12,0.2)'
                    e.currentTarget.style.color = 'var(--color-orange)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)'
                    e.currentTarget.style.color = 'rgba(255,255,255,0.65)'
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav — two columns */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 content-start">
            {FOOTER_NAV.map(l => (
              <a
                key={l.href + l.label}
                href={l.href}
                className="font-body transition-colors"
                style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3 md:items-end">
            <p className="font-body font-semibold uppercase tracking-widest"
              style={{ fontSize: 10, color: 'var(--color-orange)', letterSpacing: '0.15em', marginBottom: 4 }}>
              Kontakt
            </p>
            <a
              href="tel:+4960787595688"
              className="font-body font-semibold transition-opacity hover:opacity-75"
              style={{ fontSize: 14, color: '#fff', textDecoration: 'none' }}
            >
              +49 (0) 6078-759568
            </a>
            <a
              href="tel:+491775719570"
              className="font-body font-semibold transition-opacity hover:opacity-75"
              style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}
            >
              +49 (0) 177-5719570
            </a>
            <a
              href={INQUIRY_MAIL_HREF}
              className="font-body font-semibold transition-opacity hover:opacity-75"
              style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}
            >
              info@v-m-p.com
            </a>
            <a
              href="#kontakt"
              className="inline-flex items-center gap-2 mt-3 px-5 py-2.5 rounded-full font-body font-semibold text-white transition-opacity hover:opacity-85"
              style={{ backgroundColor: 'var(--color-orange)', fontSize: 13, textDecoration: 'none' }}
            >
              Jetzt anfragen
            </a>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          <p className="font-body" style={{ fontSize: 12, color: 'rgba(255,255,255,0.50)' }}>
            © {new Date().getFullYear()} Vivid Music Productions. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-6 items-center">
            {['Impressum', 'Datenschutz'].map(l => (
              <a
                key={l}
                href={`/${l.toLowerCase()}`}
                className="font-body transition-colors"
                style={{ fontSize: 12, color: 'rgba(255,255,255,0.50)', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.9)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.50)')}
              >
                {l}
              </a>
            ))}
            <a
              href="/admin"
              className="font-body transition-colors"
              style={{ fontSize: 12, color: 'rgba(255,255,255,0.12)', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.12)')}
            >
              Admin
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}
