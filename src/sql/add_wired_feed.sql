-- Insert Wired AI RSS feed
INSERT INTO rss_feeds (
    name,
    url,
    category,
    content_type,
    update_frequency,
    retention_days
)
VALUES (
    'Feed: Artificial Intelligence Latest',
    'https://www.wired.com/feed/tag/ai/latest/rss',
    'AI News',
    'news',
    'daily',
    30
)
ON CONFLICT (url) 
DO UPDATE SET
    name = EXCLUDED.name,
    category = EXCLUDED.category,
    content_type = EXCLUDED.content_type,
    update_frequency = EXCLUDED.update_frequency,
    retention_days = EXCLUDED.retention_days,
    updated_at = CURRENT_TIMESTAMP;