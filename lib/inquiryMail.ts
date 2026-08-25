/**
 * Zentrale Vorlage für Anfrage-E-Mails.
 *
 * Jeder "direkt per E-Mail"-Link auf der Seite (Kontaktbereich, Footer,
 * Über uns, Buchen-Button auf den Bandseiten) öffnet das Mailprogramm mit
 * dieser Vorlage — Betreff inkl. Band/Anlass und die Fragen aus der
 * Kontakt-Checkliste, jede mit einer Zeile zum Antworten darunter.
 *
 * Hinweis: Impressum und Datenschutz nutzen bewusst weiterhin ein schlichtes
 * `mailto:` ohne Vorlage — dort geht es nicht um Buchungsanfragen.
 */

export const INQUIRY_EMAIL = 'info@v-m-p.com'

/**
 * Die Punkte der Kontakt-Checkliste, gekürzt auf je eine Frage.
 * Die ausführlichen Erklärungen bleiben in der sichtbaren Liste in
 * KontaktCta — die Mailvorlage bleibt dadurch schlank.
 */
export const EVENT_QUESTIONS = [
  'Wann findet die Veranstaltung statt?',
  'In welcher Stadt und Location?',
  'Wie viele Gäste erwarten Sie etwa?',
  'Öffentlich oder im geschlossenen Rahmen?',
  'Ist Technik vorhanden, oder bringt die Band sie mit?',
  'Gibt es eine Bühne – bei Open Air auch eine Überdachung?',
  'Ist die Location ebenerdig anfahrbar, oder gibt es Treppen?',
  'Gewünschte Besetzung und ungefährer Budgetrahmen?',
  'Gewünschte Spieldauer? (Regel: 2×60 oder 3×40 min)',
  'Treten weitere Künstler oder Bands auf?',
  'Ist Pausenmusik oder DJ-Service gewünscht?',
  'Ihre Telefonnummer für Rückfragen?',
]

/**
 * Vorlage für das Nachrichtenfeld: jede Frage mit einer Antwortzeile darunter.
 * Nur für die `mailto:`-Links — das Formular auf der Seite bleibt leer, dort
 * stehen die Fragen als Checkliste daneben.
 */
export const QUESTION_TEMPLATE = EVENT_QUESTIONS.map(q => `${q}\n: `).join('\n\n')

export interface InquiryMailOptions {
  /** Bandname — landet im Betreff und als eigene Zeile im Body. */
  bandName?: string
  name?: string
  email?: string
  anlass?: string
  /** Ausgefülltes Nachrichtenfeld; leer = die Fragenvorlage wird eingesetzt. */
  message?: string
}

/** Baut einen `mailto:`-Link mit vorausgefülltem Betreff und Body. */
export function buildInquiryMailHref(opts: InquiryMailOptions = {}): string {
  const { bandName, name, email, anlass, message } = opts

  const subject = [
    'Bandanfrage',
    bandName ? `: ${bandName}` : '',
    anlass ? ` – ${anlass}` : '',
  ].join('')

  const body = [
    'Hallo Vivid Music Productions,',
    '',
    'ich interessiere mich für eine Buchung. Hier meine Angaben:',
    '',
    `Name: ${name ?? ''}`,
    `E-Mail: ${email ?? ''}`,
    ...(bandName ? [`Band: ${bandName}`] : []),
    ...(anlass ? [`Anlass: ${anlass}`] : []),
    '',
    'Angaben zur Veranstaltung:',
    '',
    message?.trim() ? message.trim() : QUESTION_TEMPLATE,
    '',
    '--',
    'Diese Anfrage wurde über v-m-p.com gesendet.',
  ].join('\n')

  return `mailto:${INQUIRY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

/** Fertiger Link ohne Formulardaten — für reine "E-Mail schreiben"-Links. */
export const INQUIRY_MAIL_HREF = buildInquiryMailHref()
