-- First, remove all existing tutorials
DELETE FROM tutorial_progress;
DELETE FROM tutorials;

-- Reset the sequence
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
    'Build Your First AI Application with Python',
    'Learn how to create a practical AI application using Python and popular machine learning libraries.',
    'https://www.youtube.com/watch?v=WFr2WgN9_xE',
    'https://img.youtube.com/vi/WFr2WgN9_xE/maxresdefault.jpg',
    45,
    'Beginner',
    'Machine Learning',
    ARRAY['Python', 'AI', 'Machine Learning', 'Practical AI'],
    ARRAY['Build a complete AI application', 'Understand ML workflows', 'Handle real-world data'],
    ARRAY['Basic Python knowledge', 'Understanding of programming concepts'],
    'Additional resources and code samples available on GitHub'
),
(
    'Deep Learning Fundamentals Explained',
    'Comprehensive introduction to deep learning concepts and neural networks.',
    'https://www.youtube.com/watch?v=aircAruvnKk',
    'https://img.youtube.com/vi/aircAruvnKk/maxresdefault.jpg',
    60,
    'Intermediate',
    'Deep Learning',
    ARRAY['Deep Learning', 'Neural Networks', 'AI Fundamentals'],
    ARRAY['Understand neural networks', 'Learn backpropagation', 'Master deep learning concepts'],
    ARRAY['Basic calculus', 'Linear algebra fundamentals'],
    'Interactive demonstrations and visualizations included'
),
(
    'Natural Language Processing with Transformers',
    'Master modern NLP techniques using transformer architectures.',
    'https://www.youtube.com/watch?v=4Bdc55j80l8',
    'https://img.youtube.com/vi/4Bdc55j80l8/maxresdefault.jpg',
    75,
    'Advanced',
    'Natural Language Processing',
    ARRAY['NLP', 'Transformers', 'BERT', 'Language Models'],
    ARRAY['Implement transformer models', 'Fine-tune BERT', 'Build NLP applications'],
    ARRAY['Python programming', 'Basic ML knowledge', 'PyTorch experience'],
    'Hands-on examples with real-world applications'
),
(
    'Computer Vision Projects with TensorFlow',
    'Build practical computer vision applications using TensorFlow.',
    'https://www.youtube.com/watch?v=tPYj3fFJGjk',
    'https://img.youtube.com/vi/tPYj3fFJGjk/maxresdefault.jpg',
    90,
    'Intermediate',
    'Computer Vision',
    ARRAY['Computer Vision', 'TensorFlow', 'Image Processing'],
    ARRAY['Build image classifiers', 'Implement object detection', 'Create real-time applications'],
    ARRAY['Python basics', 'TensorFlow fundamentals'],
    'Project files and datasets included'
),
(
    'Reinforcement Learning from Scratch',
    'Learn reinforcement learning concepts and implementations.',
    'https://www.youtube.com/watch?v=Mut_u40Sqz4',
    'https://img.youtube.com/vi/Mut_u40Sqz4/maxresdefault.jpg',
    120,
    'Advanced',
    'Reinforcement Learning',
    ARRAY['RL', 'Q-Learning', 'Deep RL', 'AI Agents'],
    ARRAY['Understand RL fundamentals', 'Implement Q-learning', 'Build RL environments'],
    ARRAY['Python programming', 'Basic ML knowledge'],
    'Complete source code and environments provided'
),
(
    'AI Ethics and Responsible Development',
    'Understanding ethical considerations in AI development.',
    'https://www.youtube.com/watch?v=PHWwRxhH0aM',
    'https://img.youtube.com/vi/PHWwRxhH0aM/maxresdefault.jpg',
    45,
    'Beginner',
    'AI Ethics',
    ARRAY['AI Ethics', 'Responsible AI', 'Bias in AI'],
    ARRAY['Understand AI ethics', 'Identify bias in models', 'Implement fair AI'],
    ARRAY['Basic AI knowledge'],
    'Case studies and practical guidelines included'
),
(
    'MLOps: Deploying AI Models at Scale',
    'Learn how to deploy and manage AI models in production.',
    'https://www.youtube.com/watch?v=9BgIDqAzfag',
    'https://img.youtube.com/vi/9BgIDqAzfag/maxresdefault.jpg',
    80,
    'Advanced',
    'Machine Learning',
    ARRAY['MLOps', 'DevOps', 'Model Deployment'],
    ARRAY['Deploy ML models', 'Monitor performance', 'Scale AI applications'],
    ARRAY['ML experience', 'Basic DevOps knowledge'],
    'Infrastructure templates and deployment scripts provided'
),
(
    'AI for Business Analytics',
    'Applying AI techniques to business problems.',
    'https://www.youtube.com/watch?v=5eBZxPW1Umc',
    'https://img.youtube.com/vi/5eBZxPW1Umc/maxresdefault.jpg',
    55,
    'Intermediate',
    'Business AI',
    ARRAY['Business Analytics', 'AI Applications', 'Data Science'],
    ARRAY['Apply AI to business', 'Analyze business data', 'Make data-driven decisions'],
    ARRAY['Basic statistics', 'Business understanding'],
    'Real business case studies and examples'
),
(
    'Edge AI Development',
    'Building AI applications for edge devices.',
    'https://www.youtube.com/watch?v=7kVhUVvHGBY',
    'https://img.youtube.com/vi/7kVhUVvHGBY/maxresdefault.jpg',
    70,
    'Advanced',
    'Edge Computing',
    ARRAY['Edge AI', 'IoT', 'TensorFlow Lite'],
    ARRAY['Deploy models on edge', 'Optimize for mobile', 'Build IoT applications'],
    ARRAY['ML knowledge', 'Mobile development basics'],
    'Sample projects for various edge devices'
),
(
    'AI Model Optimization Techniques',
    'Learn how to optimize AI models for better performance.',
    'https://www.youtube.com/watch?v=g_5HyqGC_Dw',
    'https://img.youtube.com/vi/g_5HyqGC_Dw/maxresdefault.jpg',
    65,
    'Advanced',
    'Model Optimization',
    ARRAY['Model Optimization', 'Performance Tuning', 'Efficiency'],
    ARRAY['Optimize model performance', 'Reduce resource usage', 'Improve inference speed'],
    ARRAY['ML experience', 'Performance analysis skills'],
    'Optimization tools and benchmarking code included'
);

-- Update view and like counts with realistic random data
UPDATE tutorials 
SET 
    views = FLOOR(RANDOM() * 10000 + 1000),
    likes = FLOOR(RANDOM() * 1000 + 100),
    completion_count = FLOOR(RANDOM() * 500 + 50)
WHERE video_url LIKE '%youtube%';

-- Extract and store YouTube IDs
UPDATE tutorials
SET youtube_id = (
    SELECT regexp_matches(video_url, '(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})')[1]
)
WHERE youtube_id IS NULL AND video_url ~ 'youtube';