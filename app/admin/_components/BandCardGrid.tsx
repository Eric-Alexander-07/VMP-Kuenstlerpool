'use client'

import type { BandRow } from '@/types/band'

const CATEGORY_STYLE: Record<string, { bg: string; color: string }> = {
  'partyband':      { bg: '#F5E0E0', color: '#8B1A1A' },
  'tribute':        { bg: '#EDE9FE', color: '#6D28D9' },
  'easy-listening': { bg: '#D1FAE5', color: '#065F46' },
}

const CATEGORY_LABEL: Record<string, string> = {
  'partyband':      'Partyband',
  'tribute':        'Tribute',
  'easy-listening': 'Easy Listening',
}

type BandItem = Pick<BandRow, 'slug' | 'name' | 'category' | 'published' | 'sort_order'>

export function BandCardGrid({ bands }: { bands: BandItem[] }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
      gap: 12,
    }}>
      {bands.map(band => {
        const style = CATEGORY_STYLE[band.category] ?? { bg: '#F5F5F5', color: '#555' }
        return (
          <a
            key={band.slug}
            href={`/admin/bands/${band.slug}`}
            style={{
              display: 'block', padding: '18px 20px',
              borderRadius: 10,
              backgroundColor: '#fff',
              border: `1px solid ${band.published ? '#E8D8C8' : '#EEE'}`,
              textDecoration: 'none',
              transition: 'border-color 0.15s, transform 0.15s, box-shadow 0.15s',
              opacity: band.published ? 1 : 0.6,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#8B1A1A'
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(139,26,26,0.1)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = band.published ? '#E8D8C8' : '#EEE'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{
                display: 'inline-block',
                fontSize: 10, fontFamily: 'var(--font-body)', fontWeight: 700,
                color: style.color,
                padding: '2px 8px', borderRadius: 4,
                backgroundColor: style.bg,
                letterSpacing: '0.08em', textTransform: 'uppercase',
              }}>
                {CATEGORY_LABEL[band.category] ?? band.category}
              </span>
              {!band.published && (
                <span style={{ fontSize: 10, color: '#999', fontFamily: 'var(--font-body)' }}>
                  Unveröffentlicht
                </span>
              )}
            </div>
            <p style={{ fontSize: 16, fontFamily: 'var(--font-display)', color: '#1A1A1A', marginBottom: 6, letterSpacing: '0.02em' }}>
              {band.name}
            </p>
            <p style={{ fontSize: 12, color: '#8B1A1A', fontFamily: 'var(--font-body)' }}>
              Bearbeiten →
            </p>
          </a>
        )
      })}
    </div>
  )
}
