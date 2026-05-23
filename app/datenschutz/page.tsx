export const revalidate = 60

import type { Metadata } from 'next'
import NavbarWrapper from '@/components/NavbarWrapper'
import VmpFooter from '@/components/VmpFooter'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung – Vivid Music Productions',
  description: 'Datenschutzerklärung von Vivid Music Productions gemäß DSGVO. Informationen zur Erhebung, Verarbeitung und Nutzung personenbezogener Daten.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function DatenschutzPage() {
  return (
    <main>
      <NavbarWrapper />
      <section
        className="w-full px-6 py-24 md:py-32"
        style={{ backgroundColor: 'var(--color-bg)', minHeight: '70vh' }}
      >
        <div className="max-w-2xl mx-auto">

          <p className="font-body font-semibold uppercase tracking-widest mb-3"
            style={{ fontSize: 11, color: 'var(--color-orange)', letterSpacing: '0.18em' }}>
            Rechtliches
          </p>
          <h1 className="font-display font-bold mb-12"
            style={{ fontSize: 'clamp(36px, 6vw, 56px)', lineHeight: 1.1, color: 'var(--color-dark)' }}>
            Datenschutz
          </h1>

          <div className="flex flex-col gap-10">

            <div>
              <h2 className="font-display font-bold mb-4"
                style={{ fontSize: 20, color: 'var(--color-dark)', letterSpacing: '0.06em' }}>
                ZWECK DER DATENVERARBEITUNG
              </h2>
              <p className="font-body" style={{ fontSize: 15, color: 'var(--color-muted)', lineHeight: 1.8 }}>
                Die Datenverarbeitung erfolgt aufgrund gesetzlicher Vorgaben und um Ihnen als Kunden – aufgrund Ihrer Anfragen zu unseren Bands und Künstlern – das von Ihnen angeforderte Material zustellen zu können. Hierzu verarbeiten wir Ihre personenbezogenen Daten, insbesondere die Kontaktdaten. Dazu zählen Schriftverkehr, Erstellung von Angeboten und Telefonate, welche sich jeweils während der Bearbeitung Ihrer Feier bzw. Ihres Events ergeben.
              </p>
            </div>

            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 32 }}>
              <h2 className="font-display font-bold mb-4"
                style={{ fontSize: 20, color: 'var(--color-dark)', letterSpacing: '0.06em' }}>
                WEITERGABE IHRER DATEN AN DRITTE
              </h2>
              <p className="font-body" style={{ fontSize: 15, color: 'var(--color-muted)', lineHeight: 1.8 }}>
                Wir übermitteln Ihre personenbezogenen Daten nur dann an Dritte, wenn Sie eingewilligt haben.
              </p>
            </div>

            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 32 }}>
              <h2 className="font-display font-bold mb-4"
                style={{ fontSize: 20, color: 'var(--color-dark)', letterSpacing: '0.06em' }}>
                SPEICHERUNG IHRER DATEN
              </h2>
              <p className="font-body" style={{ fontSize: 15, color: 'var(--color-muted)', lineHeight: 1.8 }}>
                Wir bewahren Ihre personenbezogenen Daten nur solange auf, wie dies für die Durchführung der Veranstaltung erforderlich ist. Nach rechtlichen Vorgaben sind wir dazu verpflichtet, diese Daten mindestens 10 Jahre nach Abschluss der Veranstaltung aufzubewahren.
              </p>
            </div>

            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 32 }}>
              <h2 className="font-display font-bold mb-4"
                style={{ fontSize: 20, color: 'var(--color-dark)', letterSpacing: '0.06em' }}>
                EINWILLIGUNGSERKLÄRUNG
              </h2>
              <p className="font-body" style={{ fontSize: 15, color: 'var(--color-muted)', lineHeight: 1.8 }}>
                Zur Bearbeitung Ihrer Veranstaltung senden wir Ihnen per E-Mail Informationsmaterial, Angebote und sonstige Unterlagen, die sich ausschließlich auf Ihre Feier beziehen und nicht als Werbung gedacht sind. Falls Sie damit nicht einverstanden sind, bitten wir Sie, uns dies per E-Mail mitzuteilen:{' '}
                <a href="mailto:info@v-m-p.com" style={{ color: 'var(--color-orange)', textDecoration: 'none' }}>info@v-m-p.com</a>.
              </p>
            </div>

            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 32 }}>
              <h2 className="font-display font-bold mb-4"
                style={{ fontSize: 20, color: 'var(--color-dark)', letterSpacing: '0.06em' }}>
                IHRE RECHTE
              </h2>
              <p className="font-body" style={{ fontSize: 15, color: 'var(--color-muted)', lineHeight: 1.8 }}>
                Sie haben das Recht, über die Sie betreffenden personenbezogenen Daten Auskunft zu erhalten. Auch können Sie die Berichtigung unrichtiger Daten verlangen. Darüber hinaus steht Ihnen unter bestimmten Voraussetzungen das Recht auf Löschung von Daten, das Recht auf Einschränkung der Datenverarbeitung sowie das Recht auf Datenübertragbarkeit zu.
              </p>
              <p className="font-body mt-4" style={{ fontSize: 15, color: 'var(--color-muted)', lineHeight: 1.8 }}>
                Die Verarbeitung Ihrer Daten erfolgt auf Basis von gesetzlichen Regelungen. Nur in Ausnahmefällen benötigen wir Ihr Einverständnis. In diesen Fällen haben Sie das Recht, die Einwilligung für die zukünftige Verarbeitung zu widerrufen.
              </p>
            </div>

            <div
              className="rounded-xl p-6"
              style={{ backgroundColor: 'var(--color-bg-alt)', border: '1px solid var(--color-border)', marginTop: 8 }}
            >
              <p className="font-body font-semibold mb-1" style={{ fontSize: 14, color: 'var(--color-dark)' }}>
                Kontakt bei Datenschutzfragen
              </p>
              <p className="font-body" style={{ fontSize: 14, color: 'var(--color-muted)', lineHeight: 1.7 }}>
                Vivid Music Productions · Bernhard Stöcker · Westring 20 · 64823 Groß-Umstadt
                <br />
                <a href="mailto:info@v-m-p.com" style={{ color: 'var(--color-orange)', textDecoration: 'none' }}>
                  info@v-m-p.com
                </a>
              </p>
            </div>

          </div>
        </div>
      </section>
      <VmpFooter />
    </main>
  )
}
