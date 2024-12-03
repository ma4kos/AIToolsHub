-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create news table
CREATE TABLE IF NOT EXISTS news (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    image VARCHAR(255) NOT NULL,
    tags TEXT[] DEFAULT '{}',
    slug VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(100) NOT NULL,
    read_time VARCHAR(20) NOT NULL,
    category VARCHAR(50) NOT NULL,
    image VARCHAR(255) NOT NULL,
    tags TEXT[] DEFAULT '{}',
    slug VARCHAR(255) NOT NULL UNIQUE,
    content TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    level VARCHAR(50) NOT NULL,
    duration VARCHAR(50) NOT NULL,
    image VARCHAR(255) NOT NULL,
    tags TEXT[] DEFAULT '{}',
    slug VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create tools table
CREATE TABLE IF NOT EXISTS tools (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    pricing VARCHAR(50) NOT NULL,
    rating DECIMAL(3,2) NOT NULL,
    reviews INTEGER DEFAULT 0,
    description TEXT NOT NULL,
    logo VARCHAR(255) NOT NULL,
    tags TEXT[] DEFAULT '{}',
    slug VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create RSS feeds table
CREATE TABLE IF NOT EXISTS rss_feeds (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    url VARCHAR(512) NOT NULL UNIQUE,
    category VARCHAR(50) NOT NULL,
    content_type VARCHAR(50) NOT NULL, -- 'news' or 'article'
    active BOOLEAN DEFAULT true,
    last_fetch TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_news_date ON news(date DESC);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_courses_level ON courses(level);
CREATE INDEX IF NOT EXISTS idx_tools_rating ON tools(rating DESC);
CREATE INDEX IF NOT EXISTS idx_rss_feeds_active ON rss_feeds(active);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_news_updated_at
    BEFORE UPDATE ON news
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_articles_updated_at
    BEFORE UPDATE ON articles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_courses_updated_at
    BEFORE UPDATE ON courses
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tools_updated_at
    BEFORE UPDATE ON tools
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rss_feeds_updated_at
    BEFORE UPDATE ON rss_feeds
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data for news
INSERT INTO news (title, description, date, image, tags, slug) VALUES
('OpenAI Announces GPT-5 Development Roadmap', 'Latest developments in language model capabilities and future implications for AI technology.', '2024-03-15', 'https://images.unsplash.com/photo-1677442136019-21780ecad995', ARRAY['AI', 'GPT', 'Machine Learning'], 'openai-gpt5-roadmap'),
('AI Breakthrough in Medical Diagnosis', 'New AI system achieves unprecedented accuracy in early disease detection.', '2024-03-14', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d', ARRAY['AI', 'Healthcare', 'Medicine'], 'ai-medical-breakthrough'),
('Tech Giants Collaborate on AI Safety Standards', 'Major companies join forces to establish ethical AI development guidelines.', '2024-03-13', 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485', ARRAY['AI', 'Ethics', 'Technology'], 'ai-safety-standards');

-- Insert sample data for articles
INSERT INTO articles (title, author, read_time, category, image, tags, slug) VALUES
('Getting Started with Machine Learning', 'Sarah Johnson', '8 min', 'Machine Learning', 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4', ARRAY['Machine Learning', 'AI', 'Beginner'], 'getting-started-machine-learning'),
('Understanding Neural Networks', 'Mike Chen', '12 min', 'Deep Learning', 'https://images.unsplash.com/photo-1544654803-b69140b285a1', ARRAY['Neural Networks', 'Deep Learning', 'AI'], 'understanding-neural-networks'),
('Ethics in Artificial Intelligence', 'Emma Davis', '10 min', 'AI Ethics', 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b', ARRAY['AI', 'Ethics', 'Technology'], 'ethics-artificial-intelligence'),
('Future of Computer Vision', 'Alex Turner', '15 min', 'Computer Vision', 'https://images.unsplash.com/photo-1535378917042-10a22c95931a', ARRAY['Computer Vision', 'AI', 'Future'], 'future-computer-vision');

-- Insert sample data for courses
INSERT INTO courses (title, description, level, duration, image, tags, slug) VALUES
('AI Fundamentals', 'Master the basics of artificial intelligence and machine learning', 'Beginner', '6 weeks', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5', ARRAY['AI', 'Fundamentals', 'Machine Learning'], 'ai-fundamentals'),
('Deep Learning Specialization', 'Advanced concepts in neural networks and deep learning', 'Advanced', '12 weeks', 'https://images.unsplash.com/photo-1555949963-aa79dcee981c', ARRAY['Deep Learning', 'Neural Networks', 'Advanced'], 'deep-learning-specialization'),
('Natural Language Processing', 'Learn to process and analyze human language with AI', 'Intermediate', '8 weeks', 'https://images.unsplash.com/photo-1516110833967-0b5716ca1387', ARRAY['NLP', 'AI', 'Language'], 'natural-language-processing');

-- Insert sample data for tools
INSERT INTO tools (name, category, pricing, rating, reviews, description, logo, tags, slug) VALUES
('AI Writer Pro', 'Content Generation', 'Freemium', 4.8, 1250, 'Advanced AI writing assistant for content creators', 'https://images.unsplash.com/photo-1612178537253-bccd437b730e', ARRAY['Writing', 'AI', 'Content'], 'ai-writer-pro'),
('DataSense AI', 'Data Analysis', 'Paid', 4.9, 850, 'Intelligent data analysis and visualization platform', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71', ARRAY['Data Analysis', 'AI', 'Visualization'], 'datasense-ai'),
('VoiceAI', 'Speech Recognition', 'Free', 4.7, 2100, 'Real-time speech recognition and translation', 'https://images.unsplash.com/photo-1589254065878-42c9da997008', ARRAY['Speech', 'AI', 'Translation'], 'voice-ai'),
('CodeAssist', 'Development', 'Freemium', 4.6, 1800, 'AI-powered code completion and analysis', 'https://images.unsplash.com/photo-1542831371-29b0f74f9713', ARRAY['Development', 'AI', 'Coding'], 'code-assist'),
('ImageGen Pro', 'Image Generation', 'Paid', 4.9, 3200, 'Advanced AI image generation and editing', 'https://images.unsplash.com/photo-1561736778-92e52a7769ef', ARRAY['Image', 'AI', 'Generation'], 'imagegen-pro'),
('ChatBot Builder', 'Chatbots', 'Freemium', 4.7, 950, 'No-code AI chatbot creation platform', 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a', ARRAY['Chatbot', 'AI', 'No-Code'], 'chatbot-builder');

-- Insert sample RSS feeds
INSERT INTO rss_feeds (name, url, category, content_type) VALUES
('AI News Daily', 'https://example.com/ai-news-feed', 'AI News', 'news'),
('Machine Learning Weekly', 'https://example.com/ml-weekly-feed', 'Machine Learning', 'article'),
('AI Research Updates', 'https://example.com/ai-research-feed', 'Research', 'article');