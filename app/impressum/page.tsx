export const revalidate = 86400

import type { Metadata } from 'next'
import NavbarWrapper from '@/components/NavbarWrapper'
import VmpFooter from '@/components/VmpFooter'

export const metadata: Metadata = {
  title: 'Impressum – Vivid Music Productions',
  description: 'Impressum und Anbieterkennzeichnung gemäß § 5 TMG für Vivid Music Productions, Inhaber Bernhard Stöcker, Groß-Umstadt.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function ImpressumPage() {
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
            Impressum
          </h1>

          <div className="flex flex-col gap-10">

            <div>
              <h2 className="font-display font-bold mb-4"
                style={{ fontSize: 20, color: 'var(--color-dark)', letterSpacing: '0.06em' }}>
                ANGABEN GEMÄß § 5 TMG
              </h2>
              <div className="font-body" style={{ fontSize: 15, color: 'var(--color-muted)', lineHeight: 1.8 }}>
                <p className="font-semibold" style={{ color: 'var(--color-dark)' }}>Vivid Music Productions</p>
                <p>Inhaber: Bernhard Stöcker</p>
                <p>Westring 20</p>
                <p>64823 Groß-Umstadt</p>
              </div>
              <div className="font-body mt-4" style={{ fontSize: 15, color: 'var(--color-muted)', lineHeight: 1.8 }}>
                <p>Tel: <a href="tel:+4960787595868" style={{ color: 'var(--color-orange)', textDecoration: 'none' }}>+49 6078 759568</a></p>
                <p>Fax: +49 6078 759569</p>
                <p>Mobil: <a href="tel:+491775719570" style={{ color: 'var(--color-orange)', textDecoration: 'none' }}>+49 177 5719570</a></p>
                <p>Mail: <a href="mailto:info@v-m-p.com" style={{ color: 'var(--color-orange)', textDecoration: 'none' }}>info@v-m-p.com</a></p>
                <p>Web: <a href="https://www.v-m-p.com" style={{ color: 'var(--color-orange)', textDecoration: 'none' }}>www.v-m-p.com</a></p>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 32 }}>
              <h2 className="font-display font-bold mb-4"
                style={{ fontSize: 20, color: 'var(--color-dark)', letterSpacing: '0.06em' }}>
                HAFTUNG FÜR INHALTE
              </h2>
              <p className="font-body" style={{ fontSize: 15, color: 'var(--color-muted)', lineHeight: 1.8 }}>
                Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
              </p>
            </div>

            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 32 }}>
              <h2 className="font-display font-bold mb-4"
                style={{ fontSize: 20, color: 'var(--color-dark)', letterSpacing: '0.06em' }}>
                HAFTUNG FÜR LINKS
              </h2>
              <p className="font-body" style={{ fontSize: 15, color: 'var(--color-muted)', lineHeight: 1.8 }}>
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
              </p>
            </div>

            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 32 }}>
              <h2 className="font-display font-bold mb-4"
                style={{ fontSize: 20, color: 'var(--color-dark)', letterSpacing: '0.06em' }}>
                URHEBERRECHT
              </h2>
              <p className="font-body" style={{ fontSize: 15, color: 'var(--color-muted)', lineHeight: 1.8 }}>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Für alle sonstigen Ablichtungen liegen die Rechte zur Veröffentlichung bei uns. Für abgelichtete Personen liegen uns entsprechende Einwilligungen vor.
              </p>
            </div>

            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 32 }}>
              <h2 className="font-display font-bold mb-4"
                style={{ fontSize: 20, color: 'var(--color-dark)', letterSpacing: '0.06em' }}>
                SCHUTZRECHTE
              </h2>
              <p className="font-body" style={{ fontSize: 15, color: 'var(--color-muted)', lineHeight: 1.8 }}>
                Sollte der Inhalt oder die Aufmachung dieser Seiten fremde Rechte Dritter oder gesetzliche Bestimmungen verletzen, bitten wir um eine entsprechende Nachricht ohne Kostennote. Wir garantieren, dass die zu Recht beanstandeten Passagen unverzüglich entfernt werden, ohne dass die Einschaltung eines Rechtsbeistandes erforderlich ist.
              </p>
            </div>

          </div>
        </div>
      </section>
      <VmpFooter />
    </main>
  )
}
