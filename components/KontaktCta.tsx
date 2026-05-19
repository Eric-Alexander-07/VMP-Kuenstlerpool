'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const TRUST_ITEMS = [
  'Direktkontakt – keine Agenturgebühren',
  'Antwort in der Regel innerhalb von 24 Stunden',
  '20+ Jahre Erfahrung im Veranstaltungsbereich',
]

const ANLAESSE = [
  'Firmenevents & Galas',
  'Stadtfeste & Festivals',
  'Hochzeiten',
  'Empfänge & Dinner',
  'Geburtstage & private Feiern',
  'Sonstiges',
]

const inputStyle: React.CSSProperties = {
  width: '100%',
  backgroundColor: '#fff',
  border: '1px solid #E5DDD5',
  borderRadius: 10,
  padding: '11px 14px',
  fontSize: 14,
  color: 'var(--color-dark)',
  outline: 'none',
  fontFamily: 'var(--font-body)',
  transition: 'border-color 0.2s',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 13,
  fontWeight: 600,
  color: 'var(--color-dark)',
  marginBottom: 6,
  fontFamily: 'var(--font-body)',
}

export default function KontaktCta() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [form, setForm] = useState({ name: '', email: '', anlass: '', message: '' })
  const [focused, setFocused] = useState<string | null>(null)

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const buildMailto = () => {
    const subject = encodeURIComponent(`Bandanfrage${form.anlass ? ` – ${form.anlass}` : ''}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nE-Mail: ${form.email}\nAnlass: ${form.anlass}\n\n${form.message}`
    )
    return `mailto:info@v-m-p.com?subject=${subject}&body=${body}`
  }

  const borderFor = (k: string) => focused === k
    ? '1px solid var(--color-orange)'
    : '1px solid #E5DDD5'

  return (
    <section
      id="kontakt"
      ref={ref}
      className="relative overflow-hidden w-full py-16 md:py-24 px-6"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      {/* Diagonal hairline grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              -52deg,
              rgba(28,25,23,0.028) 0px,
              rgba(28,25,23,0.028) 1px,
              transparent 1px,
              transparent 22px
            ),
            repeating-linear-gradient(
              38deg,
              rgba(28,25,23,0.016) 0px,
              rgba(28,25,23,0.016) 1px,
              transparent 1px,
              transparent 44px
            )
          `,
        }}
      />
      {/* Fine noise grain */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23g)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
          opacity: 0.045,
          mixBlendMode: 'multiply',
        }}
      />
      {/* Soft radial vignette */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, transparent 50%, rgba(28,25,23,0.07) 100%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2
            className="font-display font-bold text-dark"
            style={{ fontSize: 'clamp(30px, 4.5vw, 46px)', lineHeight: 1.15, marginBottom: 8 }}
          >
            Kontakt
          </h2>
          <p className="font-body" style={{ fontSize: 16, color: 'var(--color-muted)', lineHeight: 1.6 }}>
            Sprechen Sie uns direkt an – ohne Vermittler, ohne Aufpreis.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-12 lg:gap-16 items-end">

          {/* ── Left: contact info ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex flex-col gap-8"
          >
            {/* Person */}
            <div>
              <p className="font-body font-bold text-dark mb-1" style={{ fontSize: 15 }}>
                Vivid Music Productions
              </p>
              <p className="font-body" style={{ fontSize: 14, color: 'var(--color-orange)', lineHeight: 1.6 }}>
                Bobby Stöcker – Musikalischer Leiter und Ihr persönlicher Ansprechpartner für Bandanfragen, Verfügbarkeiten und Angebote.
              </p>
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-2">
              {['+49 (0) 6078-759568', '+49 (0) 177-5719570'].map((num, i) => (
                <a
                  key={num}
                  href={`tel:${num.replace(/[\s\-()]/g, '')}`}
                  className="flex items-center gap-3 font-body font-semibold transition-opacity hover:opacity-70"
                  style={{ fontSize: 15, color: 'var(--color-dark)', textDecoration: 'none' }}
                >
                  <span
                    className="flex items-center justify-center rounded-full flex-shrink-0"
                    style={{ width: 36, height: 36, backgroundColor: 'var(--color-orange-light)' }}
                  >
                    {i === 0 ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.07 1.18 2 2 0 012.06 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
                      </svg>
                    )}
                  </span>
                  {num}
                </a>
              ))}
            </div>

            {/* Email button */}
            <div>
              <a
                href="mailto:info@v-m-p.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-body font-semibold text-white transition-opacity hover:opacity-85"
                style={{ backgroundColor: 'var(--color-orange)', fontSize: 14, textDecoration: 'none' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                E-Mail schreiben
              </a>
            </div>

            {/* Divider */}
            <div style={{ height: 1, backgroundColor: 'var(--color-border)' }} />

            {/* Trust items */}
            <div className="flex flex-col gap-3">
              {TRUST_ITEMS.map(item => (
                <div key={item} className="flex items-start gap-2.5">
                  <span
                    className="font-body font-bold flex-shrink-0"
                    style={{ fontSize: 13, color: 'var(--color-orange)', marginTop: 1 }}
                  >
                    ✓
                  </span>
                  <span className="font-body" style={{ fontSize: 13, color: 'var(--color-muted)', lineHeight: 1.5 }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Info checklist */}
            <div style={{
              backgroundColor: 'var(--color-bg-alt)',
              border: '1px solid var(--color-border)',
              borderRadius: 10,
              padding: '14px 16px',
            }}>
              <p className="font-body" style={{ fontSize: 12, color: 'var(--color-muted)', marginBottom: 10, lineHeight: 1.5 }}>
                Wir möchten Ihnen gerne schnellst möglich ein passgenaues Angebot machen. Bitte geben Sie uns nach Möglichkeit Auskunft zu folgenden Punkten:
              </p>
              <div className="flex flex-col gap-1.5">
                {[
                  'Stadt & Location der Veranstaltung.',
                  'Ungefähre Gästeanzahl.',
                  'Findet der Event öffentlich, oder im geschlossenen Rahmen statt?',
                  'Ist bereits Technik vorhanden, oder soll die Band diese mitbringen?',
                  'Gibt es eine optionale Bühne? Im Sommer bei Open Airs eine Überdachung?',
                  'Ist die Location ebenerdig anfahrbar, oder gibt es Treppen zu überwinden?',
                  'Gewünschte Besetzung der Band & optional nach Möglichkeit in etwa den Budgetrahmen. Wir haben einheitliche Preise – so können wir gleich die richtige Größe anbieten.',
                  'Gewünschte Spieldauer. Unsere Regelspieldauer ist 2×60 min oder 3×40 min Sets oder nach Absprache.',
                  'Gibt es noch andere Künstler / Musiker, die bei der Veranstaltung auftreten?',
                  'Ist Pausenmusik oder DJ-Service gewünscht? Wir können Ihnen zusätzlich einen auf das Live Event abgestimmten DJ anbieten.',
                  'Ganz wichtig! Ihre Telefonnummer für Rückfragen.',
                ].map(point => (
                  <div key={point} className="flex items-start gap-2">
                    <span style={{ color: 'var(--color-orange)', fontSize: 12, marginTop: 1, flexShrink: 0 }}>→</span>
                    <span className="font-body" style={{ fontSize: 12, color: 'var(--color-muted)', lineHeight: 1.4 }}>
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Right: form ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.18, duration: 0.5 }}
            className="flex flex-col gap-5"
          >
            {/* Name + Email row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label style={labelStyle}>
                  Name <span style={{ color: 'var(--color-orange)' }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ihr Name"
                  value={form.name}
                  onChange={set('name')}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                  style={{ ...inputStyle, border: borderFor('name') }}
                />
              </div>
              <div>
                <label style={labelStyle}>
                  E-Mail <span style={{ color: 'var(--color-orange)' }}>*</span>
                </label>
                <input
                  type="email"
                  placeholder="ihre@email.de"
                  value={form.email}
                  onChange={set('email')}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  style={{ ...inputStyle, border: borderFor('email') }}
                />
              </div>
            </div>

            {/* Anlass */}
            <div>
              <label style={labelStyle}>Anlass</label>
              <select
                value={form.anlass}
                onChange={set('anlass')}
                onFocus={() => setFocused('anlass')}
                onBlur={() => setFocused(null)}
                style={{
                  ...inputStyle,
                  border: borderFor('anlass'),
                  appearance: 'none',
                  WebkitAppearance: 'none' as const,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%239C948C' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 14px center',
                  paddingRight: 38,
                  color: form.anlass ? 'var(--color-dark)' : '#A09890',
                  cursor: 'pointer',
                }}
              >
                <option value="" disabled hidden>Anlass auswählen …</option>
                {ANLAESSE.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>

            {/* Message */}
            <div>
              <label style={labelStyle}>Ihre Nachricht</label>
              <textarea
                rows={6}
                placeholder="Bitte schildern Sie Ihre Veranstaltung und gehen Sie auf die obigen Punkte ein …"
                value={form.message}
                onChange={set('message')}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused(null)}
                style={{
                  ...inputStyle,
                  border: borderFor('message'),
                  resize: 'vertical',
                  minHeight: 140,
                }}
              />
            </div>

            {/* Submit */}
            <a
              href={buildMailto()}
              className="w-full flex items-center justify-center rounded-full font-body font-semibold text-white transition-opacity hover:opacity-90"
              style={{
                backgroundColor: 'var(--color-orange)',
                padding: '14px 24px',
                fontSize: 15,
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(234,88,12,0.25)',
              }}
            >
              Anfrage senden
            </a>

            <p className="font-body text-center" style={{ fontSize: 11, color: 'var(--color-subtle)' }}>
              Klick öffnet Ihr E-Mail-Programm mit vorausgefüllter Nachricht.
            </p>
          </motion.div>

        </div>
      </div>{/* /max-w-5xl */}
    </section>
  )
}
