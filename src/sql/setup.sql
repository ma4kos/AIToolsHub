-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the update_updated_at_column function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create RSS feeds table
CREATE TABLE IF NOT EXISTS rss_feeds (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    url VARCHAR(512) NOT NULL UNIQUE,
    category VARCHAR(50) NOT NULL,
    content_type VARCHAR(50) NOT NULL CHECK (content_type IN ('news', 'article')),
    active BOOLEAN DEFAULT true,
    update_frequency VARCHAR(20) DEFAULT 'daily',
    retention_days INTEGER DEFAULT 30,
    last_fetch TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index for active feeds
CREATE INDEX IF NOT EXISTS idx_rss_feeds_active ON rss_feeds(active);

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_rss_feeds_updated_at ON rss_feeds;
CREATE TRIGGER update_rss_feeds_updated_at
    BEFORE UPDATE ON rss_feeds
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample RSS feeds if the table is empty
INSERT INTO rss_feeds (name, url, category, content_type, update_frequency, retention_days)
SELECT 'AI News Daily', 'https://example.com/ai-news-feed', 'AI News', 'news', 'daily', 30
WHERE NOT EXISTS (SELECT 1 FROM rss_feeds);

INSERT INTO rss_feeds (name, url, category, content_type, update_frequency, retention_days)
SELECT 'Machine Learning Weekly', 'https://example.com/ml-weekly-feed', 'Machine Learning', 'article', 'weekly', 90
WHERE NOT EXISTS (SELECT 1 FROM rss_feeds WHERE url = 'https://example.com/ml-weekly-feed');

INSERT INTO rss_feeds (name, url, category, content_type, update_frequency, retention_days)
SELECT 'AI Research Updates', 'https://example.com/ai-research-feed', 'Research', 'article', 'daily', 60
WHERE NOT EXISTS (SELECT 1 FROM rss_feeds WHERE url = 'https://example.com/ai-research-feed');