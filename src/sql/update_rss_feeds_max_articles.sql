-- Add max_articles column to rss_feeds table
ALTER TABLE rss_feeds 
ADD COLUMN IF NOT EXISTS max_articles INTEGER DEFAULT 5;

-- Update existing rows with default value
UPDATE rss_feeds 
SET max_articles = 5
WHERE max_articles IS NULL;