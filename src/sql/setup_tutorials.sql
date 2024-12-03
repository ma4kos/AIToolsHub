-- First ensure the function exists
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS update_tutorials_updated_at ON tutorials;
DROP TRIGGER IF EXISTS update_tutorial_progress_updated_at ON tutorial_progress;

-- Create tutorials table if it doesn't exist
CREATE TABLE IF NOT EXISTS tutorials (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    video_url VARCHAR(255) NOT NULL,
    thumbnail_url VARCHAR(255) NOT NULL,
    duration INTEGER NOT NULL,
    difficulty_level VARCHAR(20) NOT NULL CHECK (difficulty_level IN ('Beginner', 'Intermediate', 'Advanced')),
    category VARCHAR(50) NOT NULL,
    tags TEXT[] DEFAULT '{}',
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    completion_count INTEGER DEFAULT 0,
    content TEXT,
    learning_outcomes TEXT[] DEFAULT '{}',
    prerequisites TEXT[] DEFAULT '{}',
    youtube_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create tutorial progress table if it doesn't exist
CREATE TABLE IF NOT EXISTS tutorial_progress (
    id BIGSERIAL PRIMARY KEY,
    tutorial_id BIGINT REFERENCES tutorials(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL,
    completed BOOLEAN DEFAULT false,
    progress_percent INTEGER DEFAULT 0,
    last_watched_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(tutorial_id, user_id)
);

-- Create indexes if they don't exist
CREATE INDEX IF NOT EXISTS idx_tutorials_category ON tutorials(category);
CREATE INDEX IF NOT EXISTS idx_tutorials_difficulty ON tutorials(difficulty_level);
CREATE INDEX IF NOT EXISTS idx_tutorials_tags ON tutorials USING gin(tags);
CREATE INDEX IF NOT EXISTS idx_tutorials_youtube_id ON tutorials(youtube_id);
CREATE INDEX IF NOT EXISTS idx_tutorial_progress_user ON tutorial_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_tutorial_progress_user_tutorial ON tutorial_progress(user_id, tutorial_id);

-- Recreate triggers
CREATE TRIGGER update_tutorials_updated_at
    BEFORE UPDATE ON tutorials
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tutorial_progress_updated_at
    BEFORE UPDATE ON tutorial_progress
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to extract YouTube ID
CREATE OR REPLACE FUNCTION extract_youtube_id(url TEXT)
RETURNS TEXT AS $$
DECLARE
    youtube_id TEXT;
BEGIN
    youtube_id := substring(url FROM 'v=([a-zA-Z0-9_-]{11})');
    IF youtube_id IS NULL THEN
        youtube_id := substring(url FROM 'youtu\.be/([a-zA-Z0-9_-]{11})');
    END IF;
    RETURN youtube_id;
END;
$$ LANGUAGE plpgsql;

-- Clear existing tutorials
DELETE FROM tutorial_progress;
DELETE FROM tutorials;

-- Reset sequence
ALTER SEQUENCE tutorials_id_seq RESTART WITH 1;

-- Insert new tutorials
INSERT INTO tutorials (
    title,
    description,
    video_url,
    thumbnail_url,
    duration,
    difficulty_level,
    category,
    tags,
    learning_outcomes,
    prerequisites,
    content,
    youtube_id
) VALUES
(
    'Getting Started with ChatGPT',
    'Learn how to effectively use ChatGPT for various tasks.',
    'https://www.youtube.com/watch?v=JTxsNm9IdYU',
    'https://img.youtube.com/vi/JTxsNm9IdYU/maxresdefault.jpg',
    45,
    'Beginner',
    'Natural Language Processing',
    ARRAY['ChatGPT', 'OpenAI', 'Prompt Engineering'],
    ARRAY['Understand ChatGPT basics', 'Master prompt engineering'],
    ARRAY['Basic understanding of AI'],
    'Additional resources and guides',
    'JTxsNm9IdYU'
);

-- Update view counts
UPDATE tutorials 
SET 
    views = floor(random() * 10000 + 1000)::integer,
    likes = floor(random() * 1000 + 100)::integer,
    completion_count = floor(random() * 500 + 50)::integer;

-- Update YouTube IDs for any missing entries
UPDATE tutorials 
SET youtube_id = extract_youtube_id(video_url)
WHERE youtube_id IS NULL;