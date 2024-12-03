-- Add type column to articles table
ALTER TABLE articles 
ADD COLUMN IF NOT EXISTS type VARCHAR(50);

-- Create events table if it doesn't exist
CREATE TABLE IF NOT EXISTS events (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    format VARCHAR(50) NOT NULL, -- 'virtual' or 'in-person'
    registration_status VARCHAR(50) NOT NULL, -- 'open' or 'closed'
    location TEXT,
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index for events date
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);

-- Create trigger for events updated_at
DROP TRIGGER IF EXISTS update_events_updated_at ON events;
CREATE TRIGGER update_events_updated_at
    BEFORE UPDATE ON events
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample events
INSERT INTO events (title, description, date, format, registration_status, tags)
VALUES 
    (
        'AI Tools Workshop 2024',
        'Learn about the latest AI tools and their applications',
        CURRENT_TIMESTAMP + INTERVAL '30 days',
        'virtual',
        'open',
        ARRAY['AI', 'Workshop', 'Tools']
    ),
    (
        'Machine Learning Conference',
        'Annual conference on machine learning and AI',
        CURRENT_TIMESTAMP + INTERVAL '45 days',
        'in-person',
        'open',
        ARRAY['Machine Learning', 'AI', 'Conference']
    ),
    (
        'AI Ethics Symposium',
        'Discussion on ethical considerations in AI development',
        CURRENT_TIMESTAMP + INTERVAL '15 days',
        'hybrid',
        'open',
        ARRAY['AI', 'Ethics', 'Symposium']
    );

-- Update existing articles to include type
UPDATE articles 
SET type = CASE 
    WHEN title ILIKE '%tutorial%' OR title ILIKE '%guide%' THEN 'tutorial'
    ELSE 'article'
END
WHERE type IS NULL;