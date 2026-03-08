
-- Create pricing type enum
CREATE TYPE public.pricing_type AS ENUM ('free', 'freemium', 'free_trial', 'paid');

-- Create ai_tools table
CREATE TABLE public.ai_tools (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  pricing_type pricing_type NOT NULL DEFAULT 'free',
  popularity_score INTEGER NOT NULL DEFAULT 50,
  trending BOOLEAN NOT NULL DEFAULT false,
  is_new BOOLEAN NOT NULL DEFAULT false,
  website_url TEXT NOT NULL,
  logo_url TEXT,
  source TEXT DEFAULT 'manual',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(name, website_url)
);

-- Create categories table
CREATE TABLE public.categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT ''
);

-- Enable RLS but allow public read access (this is a public directory)
ALTER TABLE public.ai_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on ai_tools" ON public.ai_tools FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow public read access on categories" ON public.categories FOR SELECT TO anon, authenticated USING (true);

-- Service role can insert/update (for edge functions)
CREATE POLICY "Allow service role insert on ai_tools" ON public.ai_tools FOR INSERT TO service_role WITH CHECK (true);
CREATE POLICY "Allow service role update on ai_tools" ON public.ai_tools FOR UPDATE TO service_role USING (true);
CREATE POLICY "Allow service role insert on categories" ON public.categories FOR INSERT TO service_role WITH CHECK (true);
CREATE POLICY "Allow service role update on categories" ON public.categories FOR UPDATE TO service_role USING (true);

-- Enable pg_cron and pg_net extensions for scheduled scraping
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;
