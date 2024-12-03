-- Add missing columns to rss_feeds table
ALTER TABLE rss_feeds 
ADD COLUMN IF NOT EXISTS update_frequency VARCHAR(20) DEFAULT 'daily',
ADD COLUMN IF NOT EXISTS retention_days INTEGER DEFAULT 30;

-- Update existing rows with default values
UPDATE rss_feeds 
SET 
    update_frequency = 'daily',
    retention_days = 30
WHERE update_frequency IS NULL OR retention_days IS NULL;