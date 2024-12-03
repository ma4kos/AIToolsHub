-- Add created_at and content columns to news table if they don't exist
ALTER TABLE news 
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN IF NOT EXISTS content TEXT;

-- Add created_at column to articles table if it doesn't exist
ALTER TABLE articles 
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN IF NOT EXISTS content TEXT;

-- Update news table to ensure date column exists and is of correct type
ALTER TABLE news 
ALTER COLUMN date TYPE TIMESTAMP WITH TIME ZONE USING date::TIMESTAMP WITH TIME ZONE;

-- Add max_articles column to rss_feeds if it doesn't exist
ALTER TABLE rss_feeds 
ADD COLUMN IF NOT EXISTS max_articles INTEGER DEFAULT 5;

-- Update existing feeds with default max_articles value
UPDATE rss_feeds 
SET max_articles = 5 
WHERE max_articles IS NULL;