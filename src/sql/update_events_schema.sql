-- First, ensure the update_updated_at_column function exists
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_events_updated_at ON events;

-- Add or modify columns in events table
ALTER TABLE events 
ADD COLUMN IF NOT EXISTS start_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS end_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS venue_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS format VARCHAR(50),
ADD COLUMN IF NOT EXISTS registration_url VARCHAR(512),
ADD COLUMN IF NOT EXISTS registration_deadline TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS registration_status VARCHAR(50) DEFAULT 'open',
ADD COLUMN IF NOT EXISTS max_attendees INTEGER,
ADD COLUMN IF NOT EXISTS current_attendees INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS price DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS currency VARCHAR(3) DEFAULT 'USD',
ADD COLUMN IF NOT EXISTS image_url VARCHAR(512),
ADD COLUMN IF NOT EXISTS organizer VARCHAR(255),
ADD COLUMN IF NOT EXISTS website_url VARCHAR(512),
ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;

-- Add constraints
ALTER TABLE events 
ALTER COLUMN title SET NOT NULL,
ALTER COLUMN description SET NOT NULL,
ALTER COLUMN location SET NOT NULL,
ALTER COLUMN category SET NOT NULL,
ADD CONSTRAINT valid_format CHECK (format IN ('in-person', 'virtual', 'hybrid')),
ADD CONSTRAINT valid_registration_status CHECK (registration_status IN ('open', 'closed', 'waitlist'));

-- Create indexes if they don't exist
CREATE INDEX IF NOT EXISTS idx_events_date ON events(start_date);
CREATE INDEX IF NOT EXISTS idx_events_category ON events(category);
CREATE INDEX IF NOT EXISTS idx_events_tags ON events USING gin(tags);
CREATE INDEX IF NOT EXISTS idx_events_featured ON events(featured);
CREATE INDEX IF NOT EXISTS idx_events_slug ON events(slug);

-- Recreate the trigger
CREATE TRIGGER update_events_updated_at
    BEFORE UPDATE ON events
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Update existing records with default values
UPDATE events 
SET 
    registration_status = 'open',
    current_attendees = 0,
    currency = 'USD',
    featured = false
WHERE registration_status IS NULL;

-- Analyze the table
ANALYZE events;