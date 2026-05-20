'use client'

import { useState } from 'react'
import { saveBand } from '@/app/admin/bands/actions'
import type { BandRow } from '@/types/band'

const field: React.CSSProperties = {
  width: '100%',
  padding: '8px 12px',
  border: '1px solid #E8D8C8',
  borderRadius: 8,
  fontSize: 14,
  fontFamily: 'var(--font-body)',
  color: '#1A1A1A',
  backgroundColor: '#fff',
  outline: 'none',
  boxSizing: 'border-box',
}

const label: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  color: '#6B4F3A',
  fontFamily: 'var(--font-body)',
  marginBottom: 4,
  display: 'block',
}

function Field({
  id, label: lbl, value, onChange, type = 'text', rows, hint,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  rows?: number
  hint?: string
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <label htmlFor={id} style={label}>{lbl}</label>
      {hint && <p style={{ fontSize: 11, color: '#A09080', fontFamily: 'var(--font-body)', marginBottom: 2 }}>{hint}</p>}
      {rows ? (
        <textarea
          id={id}
          rows={rows}
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{ ...field, resize: 'vertical' }}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          style={field}
        />
      )}
    </div>
  )
}

interface Props {
  band?: BandRow
  mode: 'create' | 'edit'
  onSaved?: (slug: string) => void
}

export default function BandMetaForm({ band, mode, onSaved }: Props) {
  const [saving, setSaving]   = useState(false)
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null)

  const [slug,             setSlug]             = useState(band?.slug             ?? '')
  const [name,             setName]             = useState(band?.name             ?? '')
  const [category,         setCategory]         = useState<BandRow['category']>(band?.category ?? 'partyband')
  const [sortOrder,        setSortOrder]        = useState(String(band?.sort_order ?? 0))
  const [published,        setPublished]        = useState(band?.published        ?? true)
  const [tagline,          setTagline]          = useState(band?.tagline          ?? '')
  const [shortDescription, setShortDescription] = useState(band?.short_description ?? '')
  const [description,      setDescription]      = useState(band?.description      ?? '')
  const [facebookUrl,      setFacebookUrl]      = useState(band?.facebook_url     ?? '')
  const [repertoire,       setRepertoire]       = useState(band?.repertoire?.join('\n') ?? '')
  const [youtubeLinks,     setYoutubeLinks]     = useState(
    band?.youtube_links.map(v => `${v.url}|${v.title}`).join('\n') ?? ''
  )

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMessage(null)

    const parsedVideos = youtubeLinks
      .split('\n')
      .map(line => {
        const [url, ...titleParts] = line.split('|')
        return { url: url?.trim() ?? '', title: titleParts.join('|').trim() }
      })
      .filter(v => v.url)

    const payload = {
      slug:              slug.trim().toLowerCase().replace(/\s+/g, '-'),
      name:              name.trim(),
      category,
      sort_order:        parseInt(sortOrder, 10) || 0,
      published,
      tagline:           tagline.trim(),
      short_description: shortDescription.trim(),
      description:       description.trim(),
      facebook_url:      facebookUrl.trim() || null,
      repertoire:        repertoire.split('\n').map(s => s.trim()).filter(Boolean),
      youtube_links:     parsedVideos,
    }

    const result = await saveBand(payload, mode, band?.slug)

    setSaving(false)

    if (!result.ok) {
      setMessage({ ok: false, text: `Fehler: ${result.error}` })
    } else {
      setMessage({ ok: true, text: mode === 'create' ? 'Band erfolgreich erstellt.' : 'Änderungen gespeichert.' })
      if (onSaved) onSaved(result.slug)
    }
  }

  const grid2: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 16,
  }

  const sectionLabel: React.CSSProperties = {
    fontSize: 11,
    fontWeight: 700,
    color: '#8B1A1A',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    fontFamily: 'var(--font-body)',
    marginBottom: 12,
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* ── Identität ─────────────────────────────────────── */}
      <section>
        <p style={sectionLabel}>Identität</p>
        <div style={{ ...grid2, marginBottom: 16 }}>
          <Field id="name" label="Name"       value={name} onChange={setName} />
          <Field id="slug" label="Slug (URL)" value={slug} onChange={setSlug} />
        </div>
        <div style={grid2}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label htmlFor="category" style={label}>Kategorie</label>
            <select
              id="category"
              value={category}
              onChange={e => setCategory(e.target.value as BandRow['category'])}
              style={field}
            >
              <option value="partyband">Partyband</option>
              <option value="tribute">Tribute Band</option>
              <option value="easy-listening">Easy Listening</option>
            </select>
          </div>
          <Field id="sort_order" label="Reihenfolge" value={sortOrder} onChange={setSortOrder} type="number" />
        </div>
        <div style={{ marginTop: 16 }}>
          <label style={{ ...label, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <input type="checkbox" checked={published} onChange={e => setPublished(e.target.checked)} />
            Veröffentlicht
          </label>
        </div>
      </section>

      {/* ── Texte ────────────────────────────────────────── */}
      <section>
        <p style={sectionLabel}>Texte</p>
        <div style={{ marginBottom: 16 }}>
          <Field id="tagline" label="Tagline (Untertitel, erscheint im Hero)" value={tagline} onChange={setTagline} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <Field
            id="short_description"
            label="Kurzbeschreibung (1–3 Sätze, erscheint auf der Band-Seite + Google)"
            value={shortDescription}
            onChange={setShortDescription}
            rows={3}
            hint="Wird als Google Meta-Description verwendet (max. 160 Zeichen empfohlen)."
          />
        </div>
        <Field
          id="description"
          label="Ausführliche Beschreibung (Über die Band)"
          value={description}
          onChange={setDescription}
          rows={7}
        />
      </section>

      {/* ── Details ──────────────────────────────────────── */}
      <section>
        <p style={sectionLabel}>Details</p>
        <div style={{ marginBottom: 16 }}>
          <Field id="facebook_url" label="Facebook URL" value={facebookUrl} onChange={setFacebookUrl} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 16 }}>
          <label htmlFor="repertoire" style={label}>Repertoire-Chips (eine Zeile pro Chip)</label>
          <p style={{ fontSize: 11, color: '#A09080', fontFamily: 'var(--font-body)', marginBottom: 2 }}>z.B. Soul</p>
          <textarea
            id="repertoire"
            rows={3}
            value={repertoire}
            onChange={e => setRepertoire(e.target.value)}
            style={{ ...field, resize: 'vertical' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label htmlFor="youtube_links" style={label}>YouTube-Videos (URL|Titel, eine Zeile pro Video)</label>
          <p style={{ fontSize: 11, color: '#A09080', fontFamily: 'var(--font-body)', marginBottom: 2 }}>
            Format: https://youtube.com/watch?v=xxx|Videotitel
          </p>
          <textarea
            id="youtube_links"
            rows={4}
            value={youtubeLinks}
            onChange={e => setYoutubeLinks(e.target.value)}
            style={{ ...field, resize: 'vertical' }}
          />
        </div>
      </section>

      {/* ── Submit ───────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <button
          type="submit"
          disabled={saving}
          style={{
            backgroundColor: saving ? '#ccc' : '#8B1A1A',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '10px 24px',
            fontSize: 14,
            fontFamily: 'var(--font-body)',
            fontWeight: 600,
            cursor: saving ? 'not-allowed' : 'pointer',
          }}
        >
          {saving ? 'Wird gespeichert…' : mode === 'create' ? 'Band erstellen' : 'Speichern'}
        </button>
        {message && (
          <span style={{
            fontSize: 13,
            fontFamily: 'var(--font-body)',
            color: message.ok ? '#065F46' : '#991B1B',
          }}>
            {message.text}
          </span>
        )}
      </div>
    </form>
  )
}
