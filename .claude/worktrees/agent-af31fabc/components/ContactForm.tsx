'use client'

import { useState, type FormEvent } from 'react'

const ANLASS_OPTIONS = [
  'Firmenevent',
  'Hochzeit',
  'Geburtstag',
  'Galaveranstaltung',
  'Stadtfest',
  'Sonstiges',
] as const

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', anlass: '', nachricht: '' })

  const update = (field: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(
      `Bandanfrage${form.anlass ? `: ${form.anlass}` : ''}`
    )
    const body = encodeURIComponent(
      [
        `Name: ${form.name || '–'}`,
        `E-Mail: ${form.email || '–'}`,
        `Anlass: ${form.anlass || '–'}`,
        '',
        'Nachricht:',
        form.nachricht || '–',
      ].join('\n')
    )
    window.location.href =
      `mailto:info@v-m-p.com?subject=${subject}&body=${body}`
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      {/* Name */}
      <div>
        <label
          className="block text-sm font-medium mb-1.5"
          style={{ color: 'var(--color-ink)' }}
        >
          Name *
        </label>
        <input
          type="text"
          className="form-input"
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
          placeholder="Ihr Name"
          required
        />
      </div>

      {/* E-Mail */}
      <div>
        <label
          className="block text-sm font-medium mb-1.5"
          style={{ color: 'var(--color-ink)' }}
        >
          E-Mail *
        </label>
        <input
          type="email"
          className="form-input"
          value={form.email}
          onChange={(e) => update('email', e.target.value)}
          placeholder="ihre@email.de"
          required
        />
      </div>

      {/* Anlass */}
      <div>
        <label
          className="block text-sm font-medium mb-1.5"
          style={{ color: 'var(--color-ink)' }}
        >
          Anlass
        </label>
        {/* Custom select wrapper */}
        <div className="relative">
          <select
            className="form-input pr-9 cursor-pointer"
            style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }}
            value={form.anlass}
            onChange={(e) => update('anlass', e.target.value)}
          >
            <option value="">Anlass auswählen …</option>
            {ANLASS_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {/* Chevron */}
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 9l6 6 6-6"
                stroke="var(--color-brown)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Nachricht */}
      <div>
        <label
          className="block text-sm font-medium mb-1.5"
          style={{ color: 'var(--color-ink)' }}
        >
          Nachricht
        </label>
        <textarea
          className="form-input"
          style={{ resize: 'vertical', minHeight: '120px' }}
          value={form.nachricht}
          onChange={(e) => update('nachricht', e.target.value)}
          placeholder="Ihr Wunschtermin, Veranstaltungsort, Bandwunsch …"
          rows={4}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-3.5 px-8 rounded-full text-white font-medium text-base transition-all duration-200 hover:brightness-110 hover:shadow-lg active:scale-95"
        style={{ background: 'var(--color-gold)' }}
      >
        Anfrage senden
      </button>

      <p className="text-xs text-center" style={{ color: 'var(--color-brown)' }}>
        Klick öffnet Ihr E-Mail-Programm mit vorausgefüllter Nachricht.
      </p>
    </form>
  )
}
