'use client'

import { useRouter } from 'next/navigation'
import { PageHeader } from '../../_components/AdminShell'
import { AdminBackLink } from '../../_components/AdminBackLink'
import BandMetaForm from '../../_components/BandMetaForm'

export default function NewBandPage() {
  const router = useRouter()

  return (
    <div>
      <AdminBackLink href="/admin/bands" label="← Alle Bands" />

      <PageHeader
        title="Neue Band"
        subtitle="Band-Metadaten eingeben. Bilder und Bewertungen können danach hinzugefügt werden."
      />

      <div style={{
        backgroundColor: '#fff',
        border: '1px solid #E8D8C8',
        borderRadius: 12,
        padding: '28px 32px',
      }}>
        <BandMetaForm
          mode="create"
          onSaved={slug => router.push(`/admin/bands/${slug}`)}
        />
      </div>
    </div>
  )
}
