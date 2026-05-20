-- Remove unused fields and add short_description

ALTER TABLE bands
  DROP COLUMN IF EXISTS badge,
  DROP COLUMN IF EXISTS genre_label,
  DROP COLUMN IF EXISTS color,
  DROP COLUMN IF EXISTS featured,
  DROP COLUMN IF EXISTS besetzung,
  DROP COLUMN IF EXISTS spielzeit,
  DROP COLUMN IF EXISTS geeignet_fuer,
  DROP COLUMN IF EXISTS region,
  ADD COLUMN IF NOT EXISTS short_description TEXT NOT NULL DEFAULT '';
