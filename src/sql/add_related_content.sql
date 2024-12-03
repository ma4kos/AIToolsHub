-- Add related news for AI tools
INSERT INTO news (title, description, date, image, tags, slug, content) VALUES
-- NeuralVision Pro related news
(
    'NeuralVision Pro Achieves Record Accuracy in Object Detection',
    'Latest benchmark results show unprecedented accuracy in real-time object detection and recognition',
    CURRENT_DATE - INTERVAL '2 days',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995',
    ARRAY['Computer Vision', 'AI', 'Enterprise'],
    'neuralvision-record-accuracy',
    'Full article content about NeuralVision Pro achievements...'
),
(
    'AI Dynamics Expands Computer Vision Solutions to Healthcare',
    'NeuralVision Pro technology being adopted by leading healthcare institutions',
    CURRENT_DATE - INTERVAL '5 days',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d',
    ARRAY['Computer Vision', 'AI', 'Healthcare'],
    'ai-dynamics-healthcare-expansion',
    'Article about healthcare expansion...'
),

-- LangChain Studio related news
(
    'LangChain Studio Introduces Advanced NLP Features',
    'New capabilities in language understanding and generation released',
    CURRENT_DATE - INTERVAL '3 days',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
    ARRAY['NLP', 'AI', 'Language'],
    'langchain-new-features',
    'Details about new LangChain features...'
),

-- DataSense Analytics related news
(
    'DataSense Analytics Revolutionizes Business Intelligence',
    'New AI-powered analytics features transform data visualization',
    CURRENT_DATE - INTERVAL '4 days',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    ARRAY['Analytics', 'BI', 'Data Science'],
    'datasense-analytics-revolution',
    'Article about DataSense Analytics innovations...'
);

-- Add related articles with matching tags
INSERT INTO articles (title, author, read_time, category, image, tags, slug, content, type) VALUES
-- NeuralVision Pro related articles
(
    'Getting Started with Computer Vision in Enterprise',
    'Dr. Sarah Chen',
    '15 min',
    'Computer Vision',
    'https://images.unsplash.com/photo-1561736778-92e52a7769ef',
    ARRAY['Computer Vision', 'AI', 'Enterprise'],
    'getting-started-computer-vision-enterprise',
    'Comprehensive guide to computer vision implementation...',
    'tutorial'
),
(
    'Computer Vision Best Practices for Healthcare',
    'Michael Roberts',
    '12 min',
    'Healthcare',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d',
    ARRAY['Computer Vision', 'AI', 'Healthcare'],
    'computer-vision-healthcare-practices',
    'Best practices for healthcare computer vision...',
    'article'
),

-- LangChain Studio related articles
(
    'Advanced NLP Techniques with LangChain',
    'Emma Davis',
    '20 min',
    'NLP',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
    ARRAY['NLP', 'AI', 'Language'],
    'advanced-nlp-techniques',
    'Tutorial on advanced NLP techniques...',
    'tutorial'
),

-- DataSense Analytics related articles
(
    'Data Visualization Strategies for Business Intelligence',
    'Alex Turner',
    '10 min',
    'Analytics',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    ARRAY['Analytics', 'BI', 'Data Science'],
    'data-visualization-strategies',
    'Guide to effective data visualization...',
    'tutorial'
);

-- Add related events with matching tags
INSERT INTO events (title, description, date, format, registration_status, tags) VALUES
-- Computer Vision events
(
    'Computer Vision Summit 2024',
    'Annual conference on enterprise computer vision applications',
    CURRENT_DATE + INTERVAL '30 days',
    'hybrid',
    'open',
    ARRAY['Computer Vision', 'AI', 'Enterprise']
),

-- NLP events
(
    'NLP Technologies Workshop',
    'Hands-on workshop for natural language processing',
    CURRENT_DATE + INTERVAL '15 days',
    'virtual',
    'open',
    ARRAY['NLP', 'AI', 'Language']
),

-- Analytics events
(
    'Business Intelligence & Analytics Conference',
    'Conference focusing on modern analytics and BI tools',
    CURRENT_DATE + INTERVAL '45 days',
    'in-person',
    'open',
    ARRAY['Analytics', 'BI', 'Data Science']
);