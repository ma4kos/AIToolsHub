-- Add missing columns to news table
ALTER TABLE news 
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN IF NOT EXISTS content TEXT,
ADD COLUMN IF NOT EXISTS date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

-- Add missing columns to articles table
ALTER TABLE articles 
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN IF NOT EXISTS content TEXT,
ADD COLUMN IF NOT EXISTS date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

-- Add missing columns to rss_feeds table
ALTER TABLE rss_feeds 
ADD COLUMN IF NOT EXISTS max_articles INTEGER DEFAULT 5,
ADD COLUMN IF NOT EXISTS update_frequency VARCHAR(20) DEFAULT 'daily',
ADD COLUMN IF NOT EXISTS retention_days INTEGER DEFAULT 30;

-- Update existing feeds with default values
UPDATE rss_feeds 
SET 
    max_articles = 5,
    update_frequency = 'daily',
    retention_days = 30
WHERE max_articles IS NULL 
   OR update_frequency IS NULL 
   OR retention_days IS NULL;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_news_date ON news(date DESC);
CREATE INDEX IF NOT EXISTS idx_articles_date ON articles(date DESC);
CREATE INDEX IF NOT EXISTS idx_news_slug ON news(slug);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);