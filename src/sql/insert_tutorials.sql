-- First clear existing tutorials
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
    content
) VALUES
(
    'Introduction to Artificial Intelligence',
    'A comprehensive introduction to AI concepts, applications, and future implications.',
    'https://www.youtube.com/watch?v=JMUxmLyrhSk',
    'https://img.youtube.com/vi/JMUxmLyrhSk/maxresdefault.jpg',
    45,
    'Beginner',
    'Machine Learning',
    ARRAY['AI', 'Machine Learning', 'Introduction'],
    ARRAY['Understand AI fundamentals', 'Learn key AI concepts', 'Explore AI applications'],
    ARRAY['Basic computer knowledge'],
    'Additional resources and reading materials available in the description'
),
(
    'Machine Learning Crash Course',
    'Quick introduction to machine learning concepts and practical applications.',
    'https://www.youtube.com/watch?v=GwIo3gDZCVQ',
    'https://img.youtube.com/vi/GwIo3gDZCVQ/maxresdefault.jpg',
    60,
    'Beginner',
    'Machine Learning',
    ARRAY['Machine Learning', 'AI', 'Data Science'],
    ARRAY['Understand ML basics', 'Learn about algorithms', 'Practice with examples'],
    ARRAY['Basic math knowledge', 'Programming basics'],
    'Code examples and datasets included'
),
(
    'Deep Learning Fundamentals',
    'Learn the core concepts of deep learning and neural networks.',
    'https://www.youtube.com/watch?v=BR9h47Jtqyw',
    'https://img.youtube.com/vi/BR9h47Jtqyw/maxresdefault.jpg',
    90,
    'Intermediate',
    'Deep Learning',
    ARRAY['Deep Learning', 'Neural Networks', 'AI'],
    ARRAY['Master neural networks', 'Understand deep learning', 'Build models'],
    ARRAY['Python programming', 'Basic ML knowledge'],
    'Practical examples and implementations'
),
(
    'Natural Language Processing with Python',
    'Comprehensive guide to NLP using Python and modern libraries.',
    'https://www.youtube.com/watch?v=X2vAabgKiuM',
    'https://img.youtube.com/vi/X2vAabgKiuM/maxresdefault.jpg',
    75,
    'Intermediate',
    'Natural Language Processing',
    ARRAY['NLP', 'Python', 'Text Processing'],
    ARRAY['Build NLP applications', 'Process text data', 'Create language models'],
    ARRAY['Python basics', 'ML fundamentals'],
    'Source code and documentation provided'
),
(
    'Computer Vision Tutorial',
    'Introduction to computer vision and image processing with AI.',
    'https://www.youtube.com/watch?v=hRYnWw_2hQk',
    'https://img.youtube.com/vi/hRYnWw_2hQk/maxresdefault.jpg',
    60,
    'Intermediate',
    'Computer Vision',
    ARRAY['Computer Vision', 'Image Processing', 'OpenCV'],
    ARRAY['Process images with AI', 'Build CV applications', 'Implement object detection'],
    ARRAY['Python programming', 'Basic ML concepts'],
    'Project files and resources included'
),
(
    'Reinforcement Learning Explained',
    'Understanding reinforcement learning concepts and applications.',
    'https://www.youtube.com/watch?v=Mut_u40Sqz4',
    'https://img.youtube.com/vi/Mut_u40Sqz4/maxresdefault.jpg',
    120,
    'Advanced',
    'Reinforcement Learning',
    ARRAY['RL', 'AI', 'Game AI'],
    ARRAY['Master RL concepts', 'Build RL agents', 'Train AI models'],
    ARRAY['Python', 'ML basics', 'Probability'],
    'Example projects and implementations'
),
(
    'AI Ethics and Bias',
    'Understanding ethical considerations in AI development.',
    'https://www.youtube.com/watch?v=tw1vJ8Jz8Uk',
    'https://img.youtube.com/vi/tw1vJ8Jz8Uk/maxresdefault.jpg',
    45,
    'Beginner',
    'AI Ethics',
    ARRAY['AI Ethics', 'Bias', 'Responsible AI'],
    ARRAY['Understand AI ethics', 'Identify bias', 'Implement fair AI'],
    ARRAY['Basic AI knowledge'],
    'Case studies and practical guidelines'
),
(
    'GPT Models and Large Language Models',
    'Deep dive into GPT and large language models.',
    'https://www.youtube.com/watch?v=zjkBMFhNj_g',
    'https://img.youtube.com/vi/zjkBMFhNj_g/maxresdefault.jpg',
    90,
    'Advanced',
    'Natural Language Processing',
    ARRAY['GPT', 'LLM', 'NLP'],
    ARRAY['Understand LLMs', 'Work with GPT', 'Build applications'],
    ARRAY['NLP basics', 'Python programming'],
    'Implementation examples and best practices'
),
(
    'AI for Beginners: Getting Started',
    'Complete beginner guide to artificial intelligence.',
    'https://www.youtube.com/watch?v=mJeNghZXtMo',
    'https://img.youtube.com/vi/mJeNghZXtMo/maxresdefault.jpg',
    30,
    'Beginner',
    'Machine Learning',
    ARRAY['AI Basics', 'Introduction', 'Getting Started'],
    ARRAY['Understand AI concepts', 'Learn terminology', 'Explore tools'],
    ARRAY['Basic computer skills'],
    'Resource links and next steps'
),
(
    'Advanced AI Applications',
    'Building real-world AI applications and systems.',
    'https://www.youtube.com/watch?v=WXuK6gekU1Y',
    'https://img.youtube.com/vi/WXuK6gekU1Y/maxresdefault.jpg',
    120,
    'Advanced',
    'Machine Learning',
    ARRAY['AI Applications', 'Implementation', 'Systems'],
    ARRAY['Build AI systems', 'Deploy models', 'Scale applications'],
    ARRAY['ML experience', 'Programming skills'],
    'Project examples and deployment guides'
);

-- Update view and like counts with realistic random data
UPDATE tutorials 
SET 
    views = floor(random() * 10000 + 1000)::integer,
    likes = floor(random() * 1000 + 100)::integer,
    completion_count = floor(random() * 500 + 50)::integer;

-- Extract and store YouTube IDs
UPDATE tutorials 
SET youtube_id = substring(video_url from 'v=([a-zA-Z0-9_-]{11})');