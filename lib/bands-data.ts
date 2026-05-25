// ── Band type ──────────────────────────────────────────────────────

export interface Review {
  name: string
  rating: number   // 1–5
  text: string
  date: string
  platform: 'Google' | 'Facebook' | 'Direkt'
}

export interface Band {
  slug: string
  name: string
  category: 'easy-listening' | 'partyband' | 'tribute'
  tagline: string
  description: string
  besetzung: string
  spielzeit: string
  geeignetFuer: string[]
  repertoire: string[]
  region: string
  images: string[]
  videos: { url: string; title: string }[]
  news: { date: string; headline: string }[]
  reviews?: Review[]
  facebookUrl?: string
  instagramUrl?: string
}

// ── Category helpers ───────────────────────────────────────────────

export function getCategoryMeta(category: Band['category']): { label: string; anchor: string } {
  switch (category) {
    case 'easy-listening': return { label: 'Easy Listening', anchor: 'easy-listening' }
    case 'partyband':      return { label: 'Partybands',     anchor: 'partybands'     }
    case 'tribute':        return { label: 'Tribute Bands',  anchor: 'tribute-bands'  }
  }
}

// ── Band data ──────────────────────────────────────────────────────

export const bandsData: Band[] = [

  // ── PARTYBANDS ──────────────────────────────────────────────────

  {
    slug: 'groove-control',
    name: 'Groove Control',
    category: 'partyband',
    tagline: 'Soul, Pop & Rock für unvergessliche Nächte',
    description: `Groove Control ist die Allround-Partyband aus der Rhein-Main-Region für Unternehmens-Events, Stadtfeste und Hochzeiten. Mit einem Repertoire, das von Classic Soul und Motown bis hin zu modernem Pop und Rock reicht, sorgen die sechs Profimusiker für eine Tanzfläche, die sich bis zum letzten Song kein einziges Mal leert.

Die Band besteht aus einem schlagkräftigen Rhythmus-Team, zwei Bläsern, einer charismatischen Frontfrau und einem Frontmann – eine Besetzung, die für den warmen, vollen Sound von Groove Control verantwortlich ist, der bereits Tausende von Gästen auf Firmenfeiern, Stadtfesten und privaten Feiern begeistert hat.

Groove Control ist bundesweit buchbar und bringt auf Wunsch das komplette Bühnentechnik-Equipment mit.`,
    besetzung: '6-teilig (Vocals, Git, Bass, Keys, Drums, Bläser)',
    spielzeit: '2 × 60 Min. + Option',
    geeignetFuer: ['Hochzeiten', 'Firmenfeiern', 'Stadtfeste', 'Galas'],
    repertoire: ['Soul', 'Motown', 'Funk', 'Pop', 'Classic Rock', 'R&B', 'Disco', 'Aktuelle Hits'],
    region: 'Bundesweit',
    images: ['/images/groove-control.avif'],
    videos: [
      { url: 'https://www.youtube.com/watch?v=HJSyFnVuF40', title: 'Groove Control Live' },
      { url: 'https://www.youtube.com/watch?v=fXYPmgsvMxk', title: 'Groove Control – Showreel' },
    ],
    news: [
      { date: '15. Feb 2025', headline: 'Groove Control spielt auf dem Wiesbadener Stadtfest 2025' },
      { date: '03. Jan 2025', headline: 'Neues Programm: Jetzt auch mit Akustik-Set buchbar' },
      { date: '10. Nov 2024', headline: 'Ausverkaufte Firmenfeier-Saison – Termine 2025 jetzt buchen' },
    ],
    facebookUrl: 'https://www.facebook.com/partybanddeluxe/',
  },

  {
    slug: 'spirit-of-soul',
    name: 'Spirit of Soul',
    category: 'partyband',
    tagline: 'The finest of Black Music',
    description: `Spirit of Soul bietet ein breitgefächertes Partyprogramm und High-Class-Entertainment. Vier Sänger und acht Begleitmusiker – allesamt erfahrene Profimusiker mit internationalem Niveau.

Im Juni 2016 feierte Spirit of Soul das 15-jährige Jubiläum in Mainz anlässlich der Johannisnacht vor mehreren tausend Gästen.

Unter dem Motto "The finest of Black Music" reicht das Repertoire von James Brown, The Temptations, Kool & The Gang und Marvin Gaye über Michael Jackson bis zu Usher, Taio Cruz und Pharrell Williams.`,
    besetzung: '12 Musiker & Sänger',
    spielzeit: '2 × 60 min oder 3 × 40 min',
    geeignetFuer: ['Stadtfest', 'Firmenevent', 'Gala', 'Hochzeit'],
    repertoire: ['James Brown', 'Soul Classics', 'R&B', 'Funk', 'Motown', 'Michael Jackson', 'Modern R&B'],
    region: 'Europaweit',
    images: ['/images/spirit-of-soul.avif'],
    videos: [
      { url: 'https://www.youtube.com/watch?v=ndpeOeVYXiw', title: 'Spirit of Soul – Johannisnacht Mainz' },
      { url: 'https://www.youtube.com/watch?v=8X4Pe2HNEjY', title: 'Spirit of Soul – The finest of Black Music' },
      { url: 'https://www.youtube.com/watch?v=MRjRdrT3IYc', title: 'Spirit of Soul – Live Show' },
      { url: 'https://www.youtube.com/watch?v=2afQhcUkdIc', title: 'Spirit of Soul – Uptown Funk' },
    ],
    news: [],
    facebookUrl: 'https://www.facebook.com/spiritofsoulband/',
  },

  {
    slug: 'time-warp',
    name: 'Time Warp',
    category: 'partyband',
    tagline: 'Die musikalische Zeitreise durch 5 Jahrzehnte',
    description: `Die musikalische Zeitreise-Band für Ihre Jubiläumsfeier. Starten Sie den Abend mit großen Standards der 50er Jahre, tanzen Sie Rockabilly zu den Perlen der 60er, durchleben Sie die Power Flower & Disco-Ära der 70er, lassen Sie sich entführen in die Neue Deutsche Welle und New Romantics der 80er, und beschließen Sie den Event mit den größten Hits der 90er bis heute.

Time Warp vereint viele musikalische Stilrichtungen, Geschmäcker und Showaspekte – kostümiert und mitreißend – zu einem Entertainment das "großes Kino" bietet.`,
    besetzung: 'Profi-Ensemble',
    spielzeit: 'Flexibel',
    geeignetFuer: ['Jubiläum', 'Firmenevent', 'Stadtfest', 'Gala'],
    repertoire: ['50er Klassiker', '60er Rockabilly', '70er Disco', '80er New Wave', '90er Hits', 'Aktuelle Charts'],
    region: 'Bundesweit',
    images: ['/images/time-warp.avif'],
    videos: [
      { url: 'https://www.youtube.com/watch?v=bEddNGTafWA', title: 'Time Warp – Live' },
    ],
    news: [],
    facebookUrl: 'https://www.facebook.com/people/Time-Warp-Showband/100068200021858/',
  },

  {
    slug: 'bobbastic',
    name: 'BOBbastic',
    category: 'partyband',
    tagline: 'Das Power Rock Trio',
    description: `BOBbastic bieten ein rundum Rockprogramm – von den Klassikern (u.a. ZZ-Top) über die 90er (Blink 182 & Green Day) bis zu aktuellen Rocksongs aus den Charts.

Bobby Stöcker, Jürgen Lucas (Spider, Drowning Suns) und Kai Kessler (Pfund & Friends) schaffen es durch ihre individuelle Klasse und ohne technische Hilfsmittel, die Zuschauer völlig vergessen zu lassen, dass hier NUR drei und NICHT sechs Leute auf der Bühne stehen.

Die ideale, kompakte Band für alle die eine fetzige Party feiern wollen.`,
    besetzung: 'Trio (3 Musiker)',
    spielzeit: 'Flexibel',
    geeignetFuer: ['Stadtfest', 'Hochzeit', 'Firmenevent', 'Party'],
    repertoire: ['ZZ-Top', 'Green Day', 'Blink 182', 'Rock Klassiker', '90er Rock', 'Aktuelle Rock-Charts'],
    region: 'Bundesweit',
    images: ['/images/bobbastic.avif'],
    videos: [
      { url: 'https://www.youtube.com/watch?v=QcwOlWI9QMA', title: 'BOBbastic Live' },
      { url: 'https://www.youtube.com/watch?v=BQUoNe12ruc', title: 'BOBbastic – Rock Show' },
      { url: 'https://www.youtube.com/watch?v=_C8NXwLBNog', title: 'BOBbastic – Showreel' },
    ],
    news: [],
    facebookUrl: 'https://www.facebook.com/BOBbasticRock/',
  },

  // ── EASY LISTENING ──────────────────────────────────────────────

  {
    slug: 'bobby-and-friends',
    name: 'Bobby & Friends',
    category: 'easy-listening',
    tagline: 'Akustik · Jazz · Dinner Lounge · Party',
    description: `Sie lieben handgemachte Livemusik – dezent im Hintergrund, in gemütlicher Atmosphäre, oder als Party? Die Solo-Quartett-Besetzung aus Frankfurt am Main bietet ein variables Dinner-, Lounge- und Party-Repertoire für jeden Anlass und jedes Budget.

Die erfahrenen Profimusiker um Sänger & Gitarrist Bobby Stöcker werden seit über 10 Jahren für Firmenevents, Galas, Hochzeiten und Events erfolgreich gebucht.

Ein musikalischer Cocktail aus Akustikgitarren, Piano, Saxophon und gefühlvollen Stimmen.`,
    besetzung: 'Solo bis Quartett',
    spielzeit: 'Flexibel',
    geeignetFuer: ['Hochzeit', 'Firmenevent', 'Restaurant', 'Gala'],
    repertoire: ['Jazz Standards', 'Acoustic Pop', 'Dinner Lounge', 'Soul', 'Hochzeitsklassiker', 'Charts Akustik'],
    region: 'Bundesweit',
    images: ['/images/bobby-and-friends.avif'],
    videos: [
      { url: 'https://www.youtube.com/watch?v=Q5tCG7d15FE', title: 'Bobby & Friends Live' },
    ],
    news: [
      { date: '2025', headline: 'Neue Termine für Wohnzimmerkonzerte verfügbar' },
    ],
    facebookUrl: 'https://www.facebook.com/bobbyandfriendsband/',
  },

  {
    slug: 'marsch-mellows',
    name: 'Marsch Mellows',
    category: 'easy-listening',
    tagline: 'Walkact · Empfangsmusik · Jazz · Soul',
    description: `Die Mischung aus grooviger Musik und Showelementen gibt den Marsch Mellows das gewisse Element, das bisher jedes Publikum begeistert hat. Mit oder ohne Verstärker – die Band ist sowohl vom Sound als auch vom Repertoire her sehr flexibel und braucht keinerlei Verstärker.

Ein musikalisches Happening der besonderen Art. Mit Percussion, Kontrabass, Gitarren, Saxophon, Akkordeon und Gesang bieten die Marsch Mellows eine schlagkräftige Besetzung, die schnell die Aufmerksamkeit aller auf sich lenkt.`,
    besetzung: 'Variables Ensemble',
    spielzeit: 'Flexibel · ohne Verstärker möglich',
    geeignetFuer: ['Walkact', 'Empfang', 'Stadtfest', 'Firmenevent'],
    repertoire: ['Jazz', 'Pop', 'Soul', 'Blues', 'Rock', 'Walkact'],
    region: 'Bundesweit',
    images: ['/images/marsch-mellows.avif'],
    videos: [
      { url: '', title: 'Marsch Mellows – Walkact Stadtfest' },
      { url: '', title: 'Marsch Mellows – Empfangsmusik' },
    ],
    news: [],
  },

  // ── TRIBUTE BANDS ───────────────────────────────────────────────

  {
    slug: 'kiss-tribute',
    name: 'The Kiss Tribute Band',
    category: 'tribute',
    tagline: 'Deutschlands erfolgreichste Kiss-Tribute-Show',
    description: `Bekannt aus der Casting-Show "My Name is" (RTL II), Sieger des Wettbewerbs "Hessen Rockt" 2012, powered by Radio BOB. Gefeatured vom Hessischen Rundfunk sowie Rhein-Main-TV, europaweit auf den größten Tribute-Festivals gebucht.

THE KISS TRIBUTE BAND ist Deutschlands erfolgreichste Kiss-Tribute-Show und beeindruckt durch eine authentische Performance sowie eine mitreißende Bühnenshow mit originalgetreuem Make-up, Kostümen und feuriger Pyroshow.`,
    besetzung: '4 Musiker',
    spielzeit: '90–120 min',
    geeignetFuer: ['Festival', 'Stadtfest', 'Rockveranstaltung'],
    repertoire: ['Detroit Rock City', "I Was Made For Lovin' You", "Rock And Roll All Nite", "God Gave Rock'n'Roll To You", 'Shout It Out Loud'],
    region: 'Europaweit',
    images: [],
    videos: [
      { url: '', title: 'Kiss Tribute – Live Schlossgrabenfest Darmstadt' },
      { url: '', title: 'Kiss Tribute – Pyroshow Highlights' },
    ],
    news: [
      { date: '2012', headline: 'Sieger "Hessen Rockt" – powered by Radio BOB' },
    ],
  },

  {
    slug: 'coversnake',
    name: 'CoverSnake',
    category: 'tribute',
    tagline: 'A Tribute to Whitesnake – Decades of the Snake',
    description: `Von Gitarrist & Sänger Bobby Stöcker 2015 gegründet, rund um "The Voice of Germany"-Teilnehmer Emmo Acar. Unter dem Motto "DECADES OF THE SNAKE" zollen die sechs Profimusiker einer der einflussreichsten Rockbands aller Zeiten Tribut.

Songs wie "Here I Go Again", "Is This Love" und "Still of The Night" werden originalgetreu dargeboten – unterstützt durch eine aufwendige Bühnenshow mit LED-Leinwänden und Projektionen.

Durch die fantastische Stimme von Emmo Acar klingt die Band wie Whitesnake zu seinen besten Zeiten 1987.`,
    besetzung: '6 Profimusiker',
    spielzeit: '90–120 min',
    geeignetFuer: ['Festival', 'Stadtfest', 'Rockveranstaltung', 'Club'],
    repertoire: ['Here I Go Again', 'Is This Love', 'Still of The Night', 'Fool For Your Loving', 'Give Me All Your Love'],
    region: 'Europaweit',
    images: ['/images/coversnake.avif'],
    videos: [
      { url: 'https://www.youtube.com/watch?v=MmmC-Swcnmg', title: 'CoverSnake – Live Hüttenwerk Michelstadt' },
      { url: 'https://www.youtube.com/watch?v=hht8W7tK1tw', title: 'CoverSnake – Here I Go Again' },
      { url: 'https://www.youtube.com/watch?v=TVBisV0Zy4c', title: 'CoverSnake – Showreel' },
    ],
    news: [],
    facebookUrl: 'https://www.facebook.com/CoverSnakeBand/',
  },

  {
    slug: 'adams-family',
    name: 'The Adams Family',
    category: 'tribute',
    tagline: 'A Tribute to Bryan Adams',
    description: `Mit Fingerspitzengefühl präsentiert die Frankfurter Band um den wohlbekannten Gitarristen & Sänger Bobby Stöcker eine mitreißende Covershow mit allen Hits von Bryan Adams. Klassiker wie "Cuts Like a Knife", "Heat of the Night", "Summer of '69" und "Run to You" begeistern bundesweit.

Ein besonderes Highlight: das etwa 20-minütige Unplugged-Set, in dem einige Songs rein akustisch dargeboten werden.

Ein Live-Erlebnis das bei Stadtfesten, Partys und Firmenevents Euphorie und Erinnerungen weckt.`,
    besetzung: 'Band-Ensemble',
    spielzeit: '2 × 60 min inkl. Unplugged-Set',
    geeignetFuer: ['Stadtfest', 'Firmenevent', 'Club', 'Open Air'],
    repertoire: ["Summer of '69", 'Run to You', 'Cuts Like a Knife', 'Heat of the Night', 'Cloud No. 9', 'Everything I Do', 'Unplugged-Set'],
    region: 'Bundesweit',
    images: ['/images/adams-family.avif'],
    videos: [
      { url: 'https://www.youtube.com/watch?v=mS_hF0z69wM', title: 'The Adams Family Live' },
    ],
    news: [],
    facebookUrl: 'https://www.facebook.com/thinlizzyband',
  },

  {
    slug: 'sir-williams',
    name: 'Sir Williams',
    category: 'tribute',
    tagline: 'A Tribute to Robbie Williams',
    description: `Sir Williams präsentiert eine einmalige Robbie-Williams-Tribute-Show. Charisma, Entertainment, musikalische und stimmliche Vielseitigkeit – all diese Facetten bringt Frontmann Armin Joisten gekonnt auf die Bühne.

Über zwei Stunden Show mit allen Hits der Zeit als Robbie alle Charts der Welt anführte: von "Angels" über "Feel" bis "Sin Sin Sin".

Schnell entwickelte sich Sir Williams zu einer der gefragtesten Robbie-Williams-Tribute-Bands Europas – mit Shows in Deutschland, Österreich, der Schweiz und Liechtenstein.`,
    besetzung: '7 Musiker',
    spielzeit: 'Über 2 Stunden',
    geeignetFuer: ['Stadtfest', 'Festival', 'Club', 'Open Air'],
    repertoire: ['Angels', 'Feel', 'Rock DJ', 'Let Me Entertain You', 'Come Undone', 'Millennium', 'Sin Sin Sin'],
    region: 'D / A / CH / Liechtenstein',
    images: ['/images/sir-williams.avif'],
    videos: [
      { url: 'https://www.youtube.com/watch?v=qiN3nXtgCDk', title: 'Sir Williams – Live Show' },
      { url: 'https://www.youtube.com/watch?v=CF7Nq83lzdA', title: 'Sir Williams – Feel' },
      { url: 'https://www.youtube.com/watch?v=mtjWFp7f8ps', title: 'Sir Williams – Angels' },
    ],
    news: [],
    facebookUrl: 'https://www.facebook.com/sirwilliamsband',
  },

]

// ── Lookup map ─────────────────────────────────────────────────────

export const bandsBySlug: Record<string, Band> = Object.fromEntries(
  bandsData.map((b) => [b.slug, b])
)
