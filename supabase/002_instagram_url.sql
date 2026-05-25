-- ============================================================
-- Migration: Add instagram_url to bands table
-- Run this in the Supabase SQL Editor
-- ============================================================

ALTER TABLE bands ADD COLUMN IF NOT EXISTS instagram_url text DEFAULT NULL;
