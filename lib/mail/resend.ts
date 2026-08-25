import { Resend } from 'resend'

/**
 * Absenderadresse für alle Mails aus dem Kontaktformular. Die Domain
 * (v-m-p.com) ist in Resend verifiziert (SPF/DKIM) — dieselbe, die auch die
 * Bandseiten nutzen. Überschreibbar per Env, falls später eine eigene
 * Absenderadresse für VMP verifiziert wird.
 */
export const CONTACT_FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || 'Vivid Music Productions <no-reply@v-m-p.com>'

/** Postfach, in dem die internen Benachrichtigungen landen. */
export const CONTACT_TO_EMAIL = process.env.RESEND_TO_EMAIL || 'info@v-m-p.com'

let client: Resend | null = null

/**
 * Lazy statt `new Resend(...)` auf Modulebene: der Konstruktor wirft sofort,
 * wenn RESEND_API_KEY fehlt, und würde die Route sonst schon beim Import
 * abschießen — noch bevor der try/catch in route.ts greifen kann.
 */
export function getResend(): Resend {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY ist nicht gesetzt.')
  }
  if (!client) client = new Resend(process.env.RESEND_API_KEY)
  return client
}
