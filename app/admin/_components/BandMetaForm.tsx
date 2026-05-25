'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
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
  const router = useRouter()
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
  const [instagramUrl,     setInstagramUrl]     = useState(band?.instagram_url    ?? '')
  const [repertoire,       setRepertoire]       = useState(band?.repertoire?.join('\n') ?? '')
  const [youtubeLinks, setYoutubeLinks] = useState<{ url: string; title: string }[]>(
    band?.youtube_links.length ? band.youtube_links : []
  )

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMessage(null)

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
      instagram_url:     instagramUrl.trim() || null,
      repertoire:        repertoire.split('\n').map(s => s.trim()).filter(Boolean),
      youtube_links:     youtubeLinks.filter(v => v.url.trim()),
    }

    const result = await saveBand(payload, mode, band?.slug)

    setSaving(false)

    if (!result.ok) {
      setMessage({ ok: false, text: `Fehler: ${result.error}` })
    } else {
      setMessage({ ok: true, text: mode === 'create' ? 'Band erfolgreich erstellt.' : 'Änderungen gespeichert.' })
      if (onSaved) {
        onSaved(result.slug)
      } else if (mode === 'edit' && result.slug !== band?.slug) {
        // Slug changed — navigate to the new admin URL
        router.push(`/admin/bands/${result.slug}`)
      }
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
        <div style={{ ...grid2, marginBottom: 16 }}>
          <Field id="facebook_url"  label="Facebook URL"  value={facebookUrl}  onChange={setFacebookUrl} />
          <Field id="instagram_url" label="Instagram URL" value={instagramUrl} onChange={setInstagramUrl} />
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
          <p style={label}>YouTube-Videos</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {youtubeLinks.map((v, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 8, alignItems: 'center' }}>
                <input
                  type="url"
                  placeholder="https://youtube.com/watch?v=..."
                  value={v.url}
                  onChange={e => setYoutubeLinks(prev => prev.map((x, j) => j === i ? { ...x, url: e.target.value } : x))}
                  style={field}
                />
                <input
                  type="text"
                  placeholder="Titel (optional)"
                  value={v.title}
                  onChange={e => setYoutubeLinks(prev => prev.map((x, j) => j === i ? { ...x, title: e.target.value } : x))}
                  style={field}
                />
                <button
                  type="button"
                  onClick={() => setYoutubeLinks(prev => prev.filter((_, j) => j !== i))}
                  style={{
                    width: 32, height: 32, border: '1px solid #E8D8C8', borderRadius: 6,
                    background: '#fff', color: '#8B1A1A', cursor: 'pointer', fontSize: 14,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}
                  title="Entfernen"
                >✕</button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setYoutubeLinks(prev => [...prev, { url: '', title: '' }])}
              style={{
                alignSelf: 'flex-start',
                padding: '7px 16px',
                border: '1px dashed #C4A882',
                borderRadius: 8,
                background: 'transparent',
                color: '#8B1A1A',
                fontSize: 13,
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              + Video hinzufügen
            </button>
          </div>
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
