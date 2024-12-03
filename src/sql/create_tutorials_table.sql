-- Create tutorials table
CREATE TABLE IF NOT EXISTS tutorials (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    video_url VARCHAR(255) NOT NULL,
    thumbnail_url VARCHAR(255) NOT NULL,
    duration INTEGER NOT NULL, -- in minutes
    difficulty_level VARCHAR(20) NOT NULL CHECK (difficulty_level IN ('Beginner', 'Intermediate', 'Advanced')),
    category VARCHAR(50) NOT NULL,
    tags TEXT[] DEFAULT '{}',
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    completion_count INTEGER DEFAULT 0,
    content TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create user progress tracking table
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

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_tutorials_category ON tutorials(category);
CREATE INDEX IF NOT EXISTS idx_tutorials_difficulty ON tutorials(difficulty_level);
CREATE INDEX IF NOT EXISTS idx_tutorials_tags ON tutorials USING gin(tags);
CREATE INDEX IF NOT EXISTS idx_tutorial_progress_user ON tutorial_progress(user_id);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_tutorials_updated_at
    BEFORE UPDATE ON tutorials
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tutorial_progress_updated_at
    BEFORE UPDATE ON tutorial_progress
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();