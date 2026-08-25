/**
 * HTML-Mailvorlagen im VMP-Theme — Creme-Hintergrund, weinroter Kopf,
 * schmale Großbuchstaben-Überschriften (spiegelt Navbar/Footer der Website).
 * Ton ist durchgehend Sie/Ihr — anders als bei We Rock, das Du/Ihr nutzt.
 *
 * Bewusst ohne Bilder: Bild-Blocker in Mailprogrammen würden die Vorlage
 * sonst kaputt aussehen lassen. Tabellenlayout + Inline-Styles statt
 * <style>-Block, weil Outlook Desktop <style> unzuverlässig rendert.
 */

const COLORS = {
  bg: '#F3ECE1',
  surface: '#FDF9F2',
  panel: '#FAF6EE',
  wine: '#8B1A1A',
  wineDark: '#6B1414',
  text: '#1A1A1A',
  textDim: '#555555',
  textMuted: '#888888',
  border: '#E8D8C8',
  onDark: '#FFFFFF',
}

const FONT_DISPLAY = "'Arial Narrow', Arial, Helvetica, sans-serif"
const FONT_BODY =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"

export interface InquiryDetails {
  name: string
  email: string
  phone?: string
  date?: string
  occasion?: string
  /** Gesetzt, wenn die Anfrage von einer Bandseite ausgelöst wurde. */
  band?: string
  message: string
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/** ISO-Datum aus <input type="date"> für deutsche Leser aufbereiten. */
export function formatDate(value?: string): string | undefined {
  if (!value) return undefined
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
  return m ? `${m[3]}.${m[2]}.${m[1]}` : value
}

function detailRow(label: string, value?: string): string {
  if (!value) return ''
  return `<tr>
    <td style="padding:8px 0; border-bottom:1px solid ${COLORS.border}; font-family:${FONT_BODY}; font-size:12px; color:${COLORS.textMuted}; text-transform:uppercase; letter-spacing:0.5px; width:110px; vertical-align:top; white-space:nowrap;">${escapeHtml(label)}</td>
    <td style="padding:8px 0; border-bottom:1px solid ${COLORS.border}; font-family:${FONT_BODY}; font-size:14px; color:${COLORS.text}; vertical-align:top;">${escapeHtml(value)}</td>
  </tr>`
}

function messageBlock(message: string): string {
  const html = escapeHtml(message).replace(/\n/g, '<br />')
  return `<div style="margin-top:18px; padding:16px 18px; background:${COLORS.panel}; border:1px solid ${COLORS.border}; border-radius:10px; font-family:${FONT_BODY}; font-size:14px; line-height:1.7; color:${COLORS.text};">${html}</div>`
}

function emailShell(opts: { preheader: string; heading: string; bodyHtml: string }): string {
  return `<!doctype html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Vivid Music Productions</title>
  </head>
  <body style="margin:0; padding:0; background:${COLORS.bg};">
    <div style="display:none; max-height:0; overflow:hidden; opacity:0;">${escapeHtml(opts.preheader)}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COLORS.bg};">
      <tr>
        <td align="center" style="padding:40px 16px;">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px; width:100%; background:${COLORS.surface}; border:1px solid ${COLORS.border}; border-radius:14px; overflow:hidden;">
            <tr>
              <td style="padding:28px 40px; background:${COLORS.wineDark}; text-align:center;">
                <div style="font-family:${FONT_DISPLAY}; font-size:22px; letter-spacing:4px; text-transform:uppercase; color:${COLORS.onDark}; font-weight:700;">Vivid Music Productions</div>
                <div style="margin-top:8px; font-family:${FONT_BODY}; font-size:11px; letter-spacing:2px; text-transform:uppercase; color:rgba(255,255,255,0.68);">Live-Musik für Ihre Veranstaltung</div>
              </td>
            </tr>
            <tr>
              <td style="padding:32px 40px 0;">
                <h1 style="font-family:${FONT_DISPLAY}; font-weight:700; text-transform:uppercase; letter-spacing:1px; font-size:23px; line-height:1.3; color:${COLORS.text}; margin:0 0 20px;">${opts.heading}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:0 40px 32px;">${opts.bodyHtml}</td>
            </tr>
            <tr>
              <td style="padding:22px 40px 30px; border-top:1px solid ${COLORS.border}; background:${COLORS.panel};">
                <p style="margin:0; font-family:${FONT_BODY}; font-size:12px; color:${COLORS.textMuted}; line-height:1.8;">
                  Vivid Music Productions · Bernhard Stöcker<br />
                  Westring 20 · 64823 Groß-Umstadt<br />
                  <a href="mailto:info@v-m-p.com" style="color:${COLORS.wine}; text-decoration:none;">info@v-m-p.com</a>
                  &nbsp;·&nbsp;
                  <a href="tel:+496078759568" style="color:${COLORS.wine}; text-decoration:none;">+49 (0) 6078-759568</a>
                  &nbsp;·&nbsp;
                  <a href="https://v-m-p.com" style="color:${COLORS.wine}; text-decoration:none;">v-m-p.com</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

function detailTable(d: InquiryDetails, withEmail = true): string {
  return [
    detailRow('Name', d.name),
    withEmail ? detailRow('E-Mail', d.email) : '',
    detailRow('Telefon', d.phone),
    detailRow('Datum', formatDate(d.date)),
    detailRow('Anlass', d.occasion),
    detailRow('Band', d.band),
  ].join('')
}

/** Interne Benachrichtigung an das Booking-Postfach (info@v-m-p.com). */
export function notificationEmailHtml(d: InquiryDetails): string {
  const body = `
    <p style="margin:0 0 18px; font-family:${FONT_BODY}; font-size:14px; line-height:1.7; color:${COLORS.textDim};">
      Über das Kontaktformular auf v-m-p.com ist eine neue Anfrage eingegangen.
      Eine Antwort auf diese Mail geht direkt an
      <a href="mailto:${escapeHtml(d.email)}" style="color:${COLORS.wine}; text-decoration:none;">${escapeHtml(d.email)}</a>.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${detailTable(d)}</table>
    ${messageBlock(d.message)}
  `

  return emailShell({
    preheader: `Neue Anfrage von ${d.name}${d.occasion ? ` – ${d.occasion}` : ''}`,
    heading: 'Neue Anfrage über die Website',
    bodyHtml: body,
  })
}

/** Automatische Bestätigung an den Absender der Anfrage. */
export function confirmationEmailHtml(d: InquiryDetails): string {
  const body = `
    <p style="margin:0 0 24px; font-family:${FONT_BODY}; font-size:15px; line-height:1.7; color:${COLORS.textDim};">
      Guten Tag ${escapeHtml(d.name)},<br /><br />
      vielen Dank für Ihre Anfrage bei Vivid Music Productions. Wir haben Ihre Angaben
      erhalten und melden uns in der Regel innerhalb von 24 Stunden persönlich bei Ihnen –
      mit Verfügbarkeiten und einem passenden Angebot.
    </p>
    <p style="margin:0 0 10px; font-family:${FONT_BODY}; font-size:12px; letter-spacing:1px; text-transform:uppercase; color:${COLORS.wine};">Ihre Angaben</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${detailTable(d, false)}</table>
    ${messageBlock(d.message)}
    <p style="margin:24px 0 0; font-family:${FONT_BODY}; font-size:15px; line-height:1.7; color:${COLORS.textDim};">
      Mit musikalischen Grüßen<br />
      Bobby Stöcker<br />
      <span style="color:${COLORS.textMuted}; font-size:13px;">Musikalischer Leiter · Vivid Music Productions</span>
    </p>
    <p style="margin:20px 0 0; font-family:${FONT_BODY}; font-size:12px; line-height:1.7; color:${COLORS.textMuted};">
      Diese Bestätigung wurde automatisch versendet. Sie können direkt auf diese
      E-Mail antworten – sie erreicht uns unter info@v-m-p.com.
    </p>
  `

  return emailShell({
    preheader: 'Ihre Anfrage bei Vivid Music Productions ist eingegangen.',
    heading: 'Ihre Anfrage ist eingegangen',
    bodyHtml: body,
  })
}
