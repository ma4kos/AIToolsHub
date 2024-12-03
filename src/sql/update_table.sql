-- First ensure the table has all required columns
ALTER TABLE rss_feeds 
ADD COLUMN IF NOT EXISTS update_frequency VARCHAR(20) DEFAULT 'daily',
ADD COLUMN IF NOT EXISTS retention_days INTEGER DEFAULT 30;

-- Insert Wired AI RSS feed
INSERT INTO rss_feeds (
    name,
    url,
    category,
    content_type,
    update_frequency,
    retention_days,
    active
)
VALUES (
    'Feed: Artificial Intelligence Latest',
    'https://www.wired.com/feed/tag/ai/latest/rss',
    'AI News',
    'news',
    'daily',
    30,
    true
)
ON CONFLICT (url) 
DO UPDATE SET
    name = EXCLUDED.name,
    category = EXCLUDED.category,
    content_type = EXCLUDED.content_type,
    update_frequency = EXCLUDED.update_frequency,
    retention_days = EXCLUDED.retention_days,
    active = EXCLUDED.active,
    updated_at = CURRENT_TIMESTAMP;