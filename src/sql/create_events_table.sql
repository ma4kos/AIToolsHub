-- Create events table
CREATE TABLE IF NOT EXISTS events (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    location VARCHAR(255) NOT NULL,
    venue_name VARCHAR(255),
    format VARCHAR(50) NOT NULL CHECK (format IN ('in-person', 'virtual', 'hybrid')),
    registration_url VARCHAR(512),
    registration_deadline TIMESTAMP WITH TIME ZONE,
    registration_status VARCHAR(50) DEFAULT 'open' CHECK (registration_status IN ('open', 'closed', 'waitlist')),
    max_attendees INTEGER,
    current_attendees INTEGER DEFAULT 0,
    price DECIMAL(10,2),
    currency VARCHAR(3) DEFAULT 'USD',
    category VARCHAR(100) NOT NULL,
    tags TEXT[] DEFAULT '{}',
    image_url VARCHAR(512),
    organizer VARCHAR(255),
    website_url VARCHAR(512),
    featured BOOLEAN DEFAULT false,
    slug VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create trigger for updated_at
CREATE TRIGGER update_events_updated_at
    BEFORE UPDATE ON events
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_events_date ON events(start_date);
CREATE INDEX IF NOT EXISTS idx_events_category ON events(category);
CREATE INDEX IF NOT EXISTS idx_events_tags ON events USING gin(tags);
CREATE INDEX IF NOT EXISTS idx_events_featured ON events(featured);
CREATE INDEX IF NOT EXISTS idx_events_slug ON events(slug);

-- Insert sample events
INSERT INTO events (
    title,
    description,
    start_date,
    end_date,
    location,
    venue_name,
    format,
    registration_url,
    category,
    tags,
    image_url,
    organizer,
    website_url,
    featured,
    slug
) VALUES
(
    'AWS re:Invent 2024',
    'Premier cloud computing conference bringing together the global AWS community for networking, collaboration, and learning opportunities with AWS experts about cutting-edge cloud technologies and innovations.',
    '2024-12-02 09:00:00-08',
    '2024-12-06 17:00:00-08',
    'Las Vegas, Nevada',
    'The Venetian Resort',
    'in-person',
    'https://reinvent.awsevents.com/',
    'Cloud Computing',
    ARRAY['AWS', 'Cloud', 'AI', 'Machine Learning'],
    'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba',
    'Amazon Web Services',
    'https://reinvent.awsevents.com/',
    true,
    'aws-reinvent-2024'
),
(
    'American Society for AI (ASFAI) Conference',
    'An exclusive gathering of AI industry leaders focused on fostering collaborative discussions and driving positive impact in the artificial intelligence sector.',
    '2024-12-06 09:00:00-08',
    '2024-12-07 17:00:00-08',
    'San Francisco, California',
    'Moscone Center',
    'hybrid',
    'https://example.com/asfai-2024',
    'Artificial Intelligence',
    ARRAY['AI', 'Industry Leaders', 'Innovation'],
    'https://images.unsplash.com/photo-1591453089816-0fbb971b454c',
    'ASFAI',
    'https://example.com/asfai-2024',
    true,
    'asfai-conference-2024'
),
(
    'The AI Summit New York',
    'Industry-focused conference exploring practical applications of artificial intelligence across various business sectors.',
    '2024-12-11 09:00:00-05',
    '2024-12-12 17:00:00-05',
    'New York, New York',
    'Javits Center',
    'in-person',
    'https://example.com/ai-summit-ny',
    'Business & AI',
    ARRAY['AI', 'Business', 'Enterprise', 'Innovation'],
    'https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2',
    'AI Summit Series',
    'https://example.com/ai-summit-ny',
    true,
    'ai-summit-ny-2024'
);