-- Insert sample tutorials
INSERT INTO tutorials (
    title,
    description,
    video_url,
    thumbnail_url,
    duration,
    difficulty_level,
    category,
    tags,
    content
) VALUES
(
    'Getting Started with ChatGPT: A Complete Guide',
    'Learn how to effectively use ChatGPT for various tasks, from basic interactions to advanced prompt engineering.',
    'https://www.youtube.com/watch?v=JTxsNm9IdYU',
    'https://img.youtube.com/vi/JTxsNm9IdYU/maxresdefault.jpg',
    45,
    'Beginner',
    'Natural Language Processing',
    ARRAY['ChatGPT', 'OpenAI', 'Prompt Engineering', 'AI Tools'],
    'Additional resources and links for ChatGPT learning'
),
(
    'Midjourney AI Art Tutorial: From Beginner to Pro',
    'Master Midjourney for AI art creation. Learn advanced prompting techniques and style manipulation.',
    'https://www.youtube.com/watch?v=VnXRp-rGUfY',
    'https://img.youtube.com/vi/VnXRp-rGUfY/maxresdefault.jpg',
    60,
    'Intermediate',
    'Computer Vision',
    ARRAY['Midjourney', 'AI Art', 'Image Generation', 'Prompt Design'],
    'Links to Midjourney documentation and community resources'
),
(
    'Stable Diffusion: Local Installation Guide',
    'Complete guide to installing and using Stable Diffusion on your local machine.',
    'https://www.youtube.com/watch?v=onmqbI5XPH8',
    'https://img.youtube.com/vi/onmqbI5XPH8/maxresdefault.jpg',
    75,
    'Advanced',
    'Computer Vision',
    ARRAY['Stable Diffusion', 'AI Art', 'Local AI', 'Model Training'],
    'Technical documentation and troubleshooting guides'
),
(
    'LangChain Framework Tutorial',
    'Learn how to use LangChain to build powerful AI applications.',
    'https://www.youtube.com/watch?v=aywZrzNaKjs',
    'https://img.youtube.com/vi/aywZrzNaKjs/maxresdefault.jpg',
    90,
    'Advanced',
    'Natural Language Processing',
    ARRAY['LangChain', 'AI Development', 'Python', 'LLMs'],
    'Code examples and documentation references'
),
(
    'AutoGPT: Autonomous AI Agent Development',
    'Comprehensive guide to using and customizing AutoGPT.',
    'https://www.youtube.com/watch?v=jn8n212l3PQ',
    'https://img.youtube.com/vi/jn8n212l3PQ/maxresdefault.jpg',
    55,
    'Intermediate',
    'Machine Learning',
    ARRAY['AutoGPT', 'AI Agents', 'Automation', 'GPT-4'],
    'Setup guides and configuration examples'
);

-- Update view and like counts with random data
UPDATE tutorials 
SET 
    views = FLOOR(RANDOM() * 10000 + 1000),
    likes = FLOOR(RANDOM() * 1000 + 100),
    completion_count = FLOOR(RANDOM() * 500 + 50)
WHERE video_url LIKE '%youtube%';