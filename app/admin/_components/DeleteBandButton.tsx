'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { deleteBand } from '@/app/admin/bands/actions'

export function DeleteBandButton({ slug, name }: { slug: string; name: string }) {
  const router = useRouter()
  const [confirm, setConfirm] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleDelete() {
    setDeleting(true)
    const result = await deleteBand(slug)
    if (!result.ok) {
      setDeleting(false)
      setError(result.error)
      return
    }
    router.push('/admin/bands')
  }

  if (confirm) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 13, fontFamily: 'var(--font-body)', color: '#991B1B' }}>
          „{name}" wirklich löschen?
        </span>
        <button
          onClick={handleDelete}
          disabled={deleting}
          style={{
            backgroundColor: deleting ? '#ccc' : '#991B1B',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '8px 16px',
            fontSize: 13,
            fontFamily: 'var(--font-body)',
            fontWeight: 600,
            cursor: deleting ? 'not-allowed' : 'pointer',
          }}
        >
          {deleting ? 'Wird gelöscht…' : 'Ja, löschen'}
        </button>
        <button
          onClick={() => setConfirm(false)}
          disabled={deleting}
          style={{
            backgroundColor: 'transparent',
            color: '#6B4F3A',
            border: '1px solid #E8D8C8',
            borderRadius: 8,
            padding: '8px 16px',
            fontSize: 13,
            fontFamily: 'var(--font-body)',
            cursor: 'pointer',
          }}
        >
          Abbrechen
        </button>
        {error && (
          <span style={{ fontSize: 12, color: '#991B1B', fontFamily: 'var(--font-body)' }}>
            Fehler: {error}
          </span>
        )}
      </div>
    )
  }

  return (
    <button
      onClick={() => setConfirm(true)}
      style={{
        backgroundColor: 'transparent',
        color: '#991B1B',
        border: '1px solid #FCA5A5',
        borderRadius: 8,
        padding: '8px 16px',
        fontSize: 13,
        fontFamily: 'var(--font-body)',
        fontWeight: 500,
        cursor: 'pointer',
      }}
    >
      Band löschen
    </button>
  )
}
