import { NextRequest, NextResponse } from 'next/server'
import { getResend, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL } from '@/lib/mail/resend'
import {
  notificationEmailHtml,
  confirmationEmailHtml,
  formatDate,
  type InquiryDetails,
} from '@/lib/mail/templates'

/**
 * Nimmt das Kontaktformular (Startseite /#kontakt) entgegen.
 *
 * Sendet zwei Mails über Resend: eine interne Benachrichtigung an
 * info@v-m-p.com (Reply-To = Absender, damit direkt geantwortet werden kann)
 * und eine automatische Bestätigung an den Absender (Reply-To = info@v-m-p.com).
 *
 * Gleiche Mechanik wie auf den Bandseiten (bands-network) — dort pro Band,
 * hier zentral für VMP.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function field(payload: Record<string, unknown>, key: string): string | undefined {
  const value = payload[key]
  return typeof value === 'string' && value.trim() !== '' ? value.trim() : undefined
}

export async function POST(request: NextRequest) {
  let payload: Record<string, unknown>
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Ungültige Anfrage.' }, { status: 400 })
  }

  // Honeypot: Bots füllen das versteckte Feld aus, echte Nutzer nie.
  if (field(payload, 'website')) {
    return NextResponse.json({ ok: true })
  }

  const name = field(payload, 'name')
  const email = field(payload, 'email')
  const message = field(payload, 'message')

  if (!name || !email || !message || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: 'Bitte Name, eine gültige E-Mail-Adresse und Angaben zur Veranstaltung ausfüllen.' },
      { status: 400 }
    )
  }

  const details: InquiryDetails = {
    name,
    email,
    phone: field(payload, 'phone'),
    date: field(payload, 'date'),
    occasion: field(payload, 'occasion'),
    band: field(payload, 'band'),
    message,
  }

  const subjectSuffix = [details.band, details.occasion, formatDate(details.date)]
    .filter(Boolean)
    .join(' · ')

  // Resend wirft bei API-Fehlern (falscher Key, nicht verifizierte Domain, ...)
  // NICHT — es liefert { data: null, error: {...} } zurück. Muss explizit
  // geprüft werden.
  try {
    const { error } = await getResend().emails.send({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `[VMP] Anfrage von ${name}${subjectSuffix ? ` – ${subjectSuffix}` : ''}`,
      html: notificationEmailHtml(details),
    })
    if (error) throw error
  } catch (error) {
    console.error('Resend: interne Benachrichtigung fehlgeschlagen:', error)
    return NextResponse.json(
      {
        ok: false,
        error: `Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es später erneut oder schreiben Sie uns direkt an ${CONTACT_TO_EMAIL}.`,
      },
      { status: 502 }
    )
  }

  // Schlägt nur die Bestätigungsmail fehl, ist die Anfrage trotzdem im
  // Postfach angekommen — das zählt als Erfolg für den Nutzer.
  try {
    const { error } = await getResend().emails.send({
      from: CONTACT_FROM_EMAIL,
      to: email,
      replyTo: CONTACT_TO_EMAIL,
      subject: 'Ihre Anfrage bei Vivid Music Productions ist eingegangen',
      html: confirmationEmailHtml(details),
    })
    if (error) throw error
  } catch (error) {
    console.error('Resend: Bestätigungsmail fehlgeschlagen:', error)
  }

  return NextResponse.json({ ok: true })
}
