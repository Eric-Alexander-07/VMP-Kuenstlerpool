-- ============================================================
-- VMP: Bands table with full metadata + RLS + seed data
-- Run this in the Supabase SQL Editor
-- ============================================================

-- ── 1. Table ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS bands (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            text        NOT NULL UNIQUE,
  name            text        NOT NULL,
  category        text        NOT NULL CHECK (category IN ('partyband', 'tribute', 'easy-listening')),
  sort_order      int         NOT NULL DEFAULT 0,
  published       boolean     NOT NULL DEFAULT true,

  -- /bands page display
  tagline         text        NOT NULL DEFAULT '',
  description     text        NOT NULL DEFAULT '',
  badge           text        NOT NULL DEFAULT '',
  genre_label     text        NOT NULL DEFAULT '',
  color           text        NOT NULL DEFAULT '#641414',
  featured        boolean     NOT NULL DEFAULT false,

  -- Band detail page
  besetzung       text        NOT NULL DEFAULT '',
  spielzeit       text        NOT NULL DEFAULT '',
  geeignet_fuer   text[]      NOT NULL DEFAULT '{}',
  repertoire      text[]      NOT NULL DEFAULT '{}',
  region          text        NOT NULL DEFAULT '',
  facebook_url    text,
  youtube_links   jsonb       NOT NULL DEFAULT '[]',

  created_at      timestamptz DEFAULT now(),
  updated_at      timestamptz DEFAULT now()
);

-- ── 2. updated_at trigger ─────────────────────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS bands_updated_at ON bands;
CREATE TRIGGER bands_updated_at
  BEFORE UPDATE ON bands
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ── 3. RLS ────────────────────────────────────────────────
ALTER TABLE bands ENABLE ROW LEVEL SECURITY;

CREATE POLICY "bands select" ON bands FOR SELECT USING (true);
CREATE POLICY "bands admin"  ON bands FOR ALL
  USING      (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- ── 4. Indexes ────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS bands_category_idx   ON bands (category, sort_order);
CREATE INDEX IF NOT EXISTS bands_published_idx  ON bands (published);
CREATE INDEX IF NOT EXISTS bands_slug_idx       ON bands (slug);

-- ── 5. Seed data ──────────────────────────────────────────
INSERT INTO bands (slug, name, category, sort_order, published, tagline, description, badge, genre_label, color, featured, besetzung, spielzeit, geeignet_fuer, repertoire, region, facebook_url, youtube_links)
VALUES

-- PARTYBANDS ─────────────────────────────────────────────

('groove-control', 'Groove Control', 'partyband', 1, true,
  'Soul, Pop & Rock für unvergessliche Nächte',
  'Groove Control ist die Allround-Partyband aus der Rhein-Main-Region für Unternehmens-Events, Stadtfeste und Hochzeiten. Mit einem Repertoire, das von Classic Soul und Motown bis hin zu modernem Pop und Rock reicht, sorgen die sechs Profimusiker für eine Tanzfläche, die sich bis zum letzten Song kein einziges Mal leert.

Die Band besteht aus einem schlagkräftigen Rhythmus-Team, zwei Bläsern, einer charismatischen Frontfrau und einem Frontmann – eine Besetzung, die für den warmen, vollen Sound von Groove Control verantwortlich ist, der bereits Tausende von Gästen auf Firmenfeiern, Stadtfesten und privaten Feiern begeistert hat.

Groove Control ist bundesweit buchbar und bringt auf Wunsch das komplette Bühnentechnik-Equipment mit.',
  'Headliner', 'Soul · Pop · Rock', '#6B1414', true,
  '6-teilig (Vocals, Git, Bass, Keys, Drums, Bläser)',
  '2 × 60 Min. + Option',
  ARRAY['Hochzeiten', 'Firmenfeiern', 'Stadtfeste', 'Galas'],
  ARRAY['Soul', 'Motown', 'Funk', 'Pop', 'Classic Rock', 'R&B', 'Disco', 'Aktuelle Hits'],
  'Bundesweit',
  'https://www.facebook.com/partybanddeluxe/',
  '[{"url": "https://www.youtube.com/watch?v=HJSyFnVuF40", "title": "Groove Control Live"}, {"url": "https://www.youtube.com/watch?v=fXYPmgsvMxk", "title": "Groove Control – Showreel"}]'::jsonb
),

('spirit-of-soul', 'Spirit of Soul', 'partyband', 2, true,
  'The finest of Black Music',
  'Spirit of Soul bietet ein breitgefächertes Partyprogramm und High-Class-Entertainment. Vier Sänger und acht Begleitmusiker – allesamt erfahrene Profimusiker mit internationalem Niveau.

Im Juni 2016 feierte Spirit of Soul das 15-jährige Jubiläum in Mainz anlässlich der Johannisnacht vor mehreren tausend Gästen.

Unter dem Motto "The finest of Black Music" reicht das Repertoire von James Brown, The Temptations, Kool & The Gang und Marvin Gaye über Michael Jackson bis zu Usher, Taio Cruz und Pharrell Williams.',
  'Bühnenshow', 'Black Music · R&B · Funk', '#701616', true,
  '12 Musiker & Sänger',
  '2 × 60 min oder 3 × 40 min',
  ARRAY['Stadtfest', 'Firmenevent', 'Gala', 'Hochzeit'],
  ARRAY['James Brown', 'Soul Classics', 'R&B', 'Funk', 'Motown', 'Michael Jackson', 'Modern R&B'],
  'Europaweit',
  'https://www.facebook.com/spiritofsoulband/',
  '[{"url": "https://www.youtube.com/watch?v=ndpeOeVYXiw", "title": "Spirit of Soul – Johannisnacht Mainz"}, {"url": "https://www.youtube.com/watch?v=8X4Pe2HNEjY", "title": "Spirit of Soul – The finest of Black Music"}, {"url": "https://www.youtube.com/watch?v=MRjRdrT3IYc", "title": "Spirit of Soul – Live Show"}, {"url": "https://www.youtube.com/watch?v=2afQhcUkdIc", "title": "Spirit of Soul – Uptown Funk"}]'::jsonb
),

('time-warp', 'Time Warp', 'partyband', 3, true,
  'Die musikalische Zeitreise durch 5 Jahrzehnte',
  'Die musikalische Zeitreise-Band für Ihre Jubiläumsfeier. Starten Sie den Abend mit großen Standards der 50er Jahre, tanzen Sie Rockabilly zu den Perlen der 60er, durchleben Sie die Power Flower & Disco-Ära der 70er, lassen Sie sich entführen in die Neue Deutsche Welle und New Romantics der 80er, und beschließen Sie den Event mit den größten Hits der 90er bis heute.

Time Warp vereint viele musikalische Stilrichtungen, Geschmäcker und Showaspekte – kostümiert und mitreißend – zu einem Entertainment das "großes Kino" bietet.',
  'Crowd Favourite', '5 Jahrzehnte Hits', '#5C1212', false,
  'Profi-Ensemble', 'Flexibel',
  ARRAY['Jubiläum', 'Firmenevent', 'Stadtfest', 'Gala'],
  ARRAY['50er Klassiker', '60er Rockabilly', '70er Disco', '80er New Wave', '90er Hits', 'Aktuelle Charts'],
  'Bundesweit',
  'https://www.facebook.com/people/Time-Warp-Showband/100068200021858/',
  '[{"url": "https://www.youtube.com/watch?v=bEddNGTafWA", "title": "Time Warp – Live"}]'::jsonb
),

('bobbastic', 'BOBbastic', 'partyband', 4, true,
  'Das Power Rock Trio',
  'BOBbastic bieten ein rundum Rockprogramm – von den Klassikern (u.a. ZZ-Top) über die 90er (Blink 182 & Green Day) bis zu aktuellen Rocksongs aus den Charts.

Bobby Stöcker, Jürgen Lucas (Spider, Drowning Suns) und Kai Kessler (Pfund & Friends) schaffen es durch ihre individuelle Klasse und ohne technische Hilfsmittel, die Zuschauer völlig vergessen zu lassen, dass hier NUR drei und NICHT sechs Leute auf der Bühne stehen.

Die ideale, kompakte Band für alle die eine fetzige Party feiern wollen.',
  'Energie Pur', 'Power Rock Trio', '#641515', false,
  'Trio (3 Musiker)', 'Flexibel',
  ARRAY['Stadtfest', 'Hochzeit', 'Firmenevent', 'Party'],
  ARRAY['ZZ-Top', 'Green Day', 'Blink 182', 'Rock Klassiker', '90er Rock', 'Aktuelle Rock-Charts'],
  'Bundesweit',
  'https://www.facebook.com/BOBbasticRock/',
  '[{"url": "https://www.youtube.com/watch?v=QcwOlWI9QMA", "title": "BOBbastic Live"}, {"url": "https://www.youtube.com/watch?v=BQUoNe12ruc", "title": "BOBbastic – Rock Show"}, {"url": "https://www.youtube.com/watch?v=_C8NXwLBNog", "title": "BOBbastic – Showreel"}]'::jsonb
),

-- TRIBUTE BANDS ──────────────────────────────────────────

('kiss-tribute', 'The Kiss Tribute Band', 'tribute', 1, true,
  'Deutschlands erfolgreichste Kiss-Tribute-Show',
  'Bekannt aus der Casting-Show "My Name is" (RTL II), Sieger des Wettbewerbs "Hessen Rockt" 2012, powered by Radio BOB. Gefeatured vom Hessischen Rundfunk sowie Rhein-Main-TV, europaweit auf den größten Tribute-Festivals gebucht.

THE KISS TRIBUTE BAND ist Deutschlands erfolgreichste Kiss-Tribute-Show und beeindruckt durch eine authentische Performance sowie eine mitreißende Bühnenshow mit originalgetreuem Make-up, Kostümen und feuriger Pyroshow.',
  'Pyroshow', 'Rock Tribute', '#580F0F', false,
  '4 Musiker', '90–120 min',
  ARRAY['Festival', 'Stadtfest', 'Rockveranstaltung'],
  ARRAY['Detroit Rock City', 'I Was Made For Lovin'' You', 'Rock And Roll All Nite', 'God Gave Rock''n''Roll To You', 'Shout It Out Loud'],
  'Europaweit',
  NULL,
  '[]'::jsonb
),

('coversnake', 'CoverSnake', 'tribute', 2, true,
  'A Tribute to Whitesnake – Decades of the Snake',
  'Von Gitarrist & Sänger Bobby Stöcker 2015 gegründet, rund um "The Voice of Germany"-Teilnehmer Emmo Acar. Unter dem Motto "DECADES OF THE SNAKE" zollen die sechs Profimusiker einer der einflussreichsten Rockbands aller Zeiten Tribut.

Songs wie "Here I Go Again", "Is This Love" und "Still of The Night" werden originalgetreu dargeboten – unterstützt durch eine aufwendige Bühnenshow mit LED-Leinwänden und Projektionen.

Durch die fantastische Stimme von Emmo Acar klingt die Band wie Whitesnake zu seinen besten Zeiten 1987.',
  '6 Profimusiker', 'Whitesnake Tribute', '#641414', false,
  '6 Profimusiker', '90–120 min',
  ARRAY['Festival', 'Stadtfest', 'Rockveranstaltung', 'Club'],
  ARRAY['Here I Go Again', 'Is This Love', 'Still of The Night', 'Fool For Your Loving', 'Give Me All Your Love'],
  'Europaweit',
  'https://www.facebook.com/CoverSnakeBand/',
  '[{"url": "https://www.youtube.com/watch?v=MmmC-Swcnmg", "title": "CoverSnake – Live Hüttenwerk Michelstadt"}, {"url": "https://www.youtube.com/watch?v=hht8W7tK1tw", "title": "CoverSnake – Here I Go Again"}, {"url": "https://www.youtube.com/watch?v=TVBisV0Zy4c", "title": "CoverSnake – Showreel"}]'::jsonb
),

('adams-family', 'The Adams Family', 'tribute', 3, true,
  'A Tribute to Bryan Adams',
  'Mit Fingerspitzengefühl präsentiert die Frankfurter Band um den wohlbekannten Gitarristen & Sänger Bobby Stöcker eine mitreißende Covershow mit allen Hits von Bryan Adams. Klassiker wie "Cuts Like a Knife", "Heat of the Night", "Summer of ''69" und "Run to You" begeistern bundesweit.

Ein besonderes Highlight: das etwa 20-minütige Unplugged-Set, in dem einige Songs rein akustisch dargeboten werden.

Ein Live-Erlebnis das bei Stadtfesten, Partys und Firmenevents Euphorie und Erinnerungen weckt.',
  'inkl. Unplugged', 'Bryan Adams Tribute', '#5A1212', false,
  'Band-Ensemble', '2 × 60 min inkl. Unplugged-Set',
  ARRAY['Stadtfest', 'Firmenevent', 'Club', 'Open Air'],
  ARRAY['Summer of ''69', 'Run to You', 'Cuts Like a Knife', 'Heat of the Night', 'Cloud No. 9', 'Everything I Do', 'Unplugged-Set'],
  'Bundesweit',
  'https://www.facebook.com/thinlizzyband',
  '[{"url": "https://www.youtube.com/watch?v=mS_hF0z69wM", "title": "The Adams Family Live"}]'::jsonb
),

('sir-williams', 'Sir Williams', 'tribute', 4, true,
  'A Tribute to Robbie Williams',
  'Sir Williams präsentiert eine einmalige Robbie-Williams-Tribute-Show. Charisma, Entertainment, musikalische und stimmliche Vielseitigkeit – all diese Facetten bringt Frontmann Armin Joisten gekonnt auf die Bühne.

Über zwei Stunden Show mit allen Hits der Zeit als Robbie alle Charts der Welt anführte: von "Angels" über "Feel" bis "Sin Sin Sin".

Schnell entwickelte sich Sir Williams zu einer der gefragtesten Robbie-Williams-Tribute-Bands Europas – mit Shows in Deutschland, Österreich, der Schweiz und Liechtenstein.',
  '30 Jahre Hits', 'Robbie Williams Tribute', '#5E1313', false,
  '7 Musiker', 'Über 2 Stunden',
  ARRAY['Stadtfest', 'Festival', 'Club', 'Open Air'],
  ARRAY['Angels', 'Feel', 'Rock DJ', 'Let Me Entertain You', 'Come Undone', 'Millennium', 'Sin Sin Sin'],
  'D / A / CH / Liechtenstein',
  'https://www.facebook.com/sirwilliamsband',
  '[{"url": "https://www.youtube.com/watch?v=qiN3nXtgCDk", "title": "Sir Williams – Live Show"}, {"url": "https://www.youtube.com/watch?v=CF7Nq83lzdA", "title": "Sir Williams – Feel"}, {"url": "https://www.youtube.com/watch?v=mtjWFp7f8ps", "title": "Sir Williams – Angels"}]'::jsonb
),

-- EASY LISTENING ─────────────────────────────────────────

('bobby-and-friends', 'Bobby & Friends', 'easy-listening', 1, true,
  'Akustik · Jazz · Dinner Lounge · Party',
  'Sie lieben handgemachte Livemusik – dezent im Hintergrund, in gemütlicher Atmosphäre, oder als Party? Die Solo-Quartett-Besetzung aus Frankfurt am Main bietet ein variables Dinner-, Lounge- und Party-Repertoire für jeden Anlass und jedes Budget.

Die erfahrenen Profimusiker um Sänger & Gitarrist Bobby Stöcker werden seit über 10 Jahren für Firmenevents, Galas, Hochzeiten und Events erfolgreich gebucht.

Ein musikalischer Cocktail aus Akustikgitarren, Piano, Saxophon und gefühlvollen Stimmen.',
  'Dinner Lounge', 'Jazz · Acoustic Pop', '#601212', false,
  'Solo bis Quartett', 'Flexibel',
  ARRAY['Hochzeit', 'Firmenevent', 'Restaurant', 'Gala'],
  ARRAY['Jazz Standards', 'Acoustic Pop', 'Dinner Lounge', 'Soul', 'Hochzeitsklassiker', 'Charts Akustik'],
  'Bundesweit',
  'https://www.facebook.com/bobbyandfriendsband/',
  '[{"url": "https://www.youtube.com/watch?v=Q5tCG7d15FE", "title": "Bobby & Friends Live"}]'::jsonb
),

('marsch-mellows', 'Marsch Mellows', 'easy-listening', 2, true,
  'Walkact · Empfangsmusik · Jazz · Soul',
  'Die Mischung aus grooviger Musik und Showelementen gibt den Marsch Mellows das gewisse Element, das bisher jedes Publikum begeistert hat. Mit oder ohne Verstärker – die Band ist sowohl vom Sound als auch vom Repertoire her sehr flexibel und braucht keinerlei Verstärker.

Ein musikalisches Happening der besonderen Art. Mit Percussion, Kontrabass, Gitarren, Saxophon, Akkordeon und Gesang bieten die Marsch Mellows eine schlagkräftige Besetzung, die schnell die Aufmerksamkeit aller auf sich lenkt.',
  'Mobiler Walkact', 'Walkact · Empfangsmusik', '#5C1010', false,
  'Variables Ensemble', 'Flexibel · ohne Verstärker möglich',
  ARRAY['Walkact', 'Empfang', 'Stadtfest', 'Firmenevent'],
  ARRAY['Jazz', 'Pop', 'Soul', 'Blues', 'Rock', 'Walkact'],
  'Bundesweit',
  NULL,
  '[]'::jsonb
)

ON CONFLICT (slug) DO NOTHING;
