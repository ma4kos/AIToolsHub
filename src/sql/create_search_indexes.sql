-- Create text search configurations if they don't exist
CREATE TEXT SEARCH CONFIGURATION IF NOT EXISTS public.english ( COPY = pg_catalog.english );

-- Create indexes for full-text search
CREATE INDEX IF NOT EXISTS idx_tools_search ON tools 
USING gin(to_tsvector('english', name || ' ' || description));

CREATE INDEX IF NOT EXISTS idx_news_search ON news 
USING gin(to_tsvector('english', title || ' ' || description));

CREATE INDEX IF NOT EXISTS idx_articles_search ON articles 
USING gin(to_tsvector('english', title || ' ' || description));

CREATE INDEX IF NOT EXISTS idx_events_search ON events 
USING gin(to_tsvector('english', title || ' ' || description));

CREATE INDEX IF NOT EXISTS idx_tutorials_search ON tutorials 
USING gin(to_tsvector('english', title || ' ' || description));