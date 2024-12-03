-- Core AI Concepts
SELECT upsert_glossary_term(
    'Artificial Intelligence (AI)',
    'Technology that allows machines to learn and perform tasks that typically require human intelligence.',
    'core',
    ARRAY['Machine Learning', 'Deep Learning', 'Neural Network']
);

SELECT upsert_glossary_term(
    'Machine Learning (ML)',
    'A part of AI where machines learn from data without being directly programmed.',
    'core',
    ARRAY['Deep Learning', 'Neural Network', 'Training Data']
);

SELECT upsert_glossary_term(
    'Deep Learning (DL)',
    'A type of ML that uses many layers of neural networks to learn complex patterns.',
    'core',
    ARRAY['Machine Learning', 'Neural Network', 'Training Data']
);

SELECT upsert_glossary_term(
    'Neural Network',
    'A computer system inspired by the human brain, used for learning and making decisions.',
    'core',
    ARRAY['Deep Learning', 'Machine Learning', 'Training Data']
);

SELECT upsert_glossary_term(
    'Algorithm',
    'A set of instructions for a computer to solve a specific problem.',
    'core',
    ARRAY['Machine Learning', 'Deep Learning']
);

SELECT upsert_glossary_term(
    'Training Data',
    'The information used to teach an AI model.',
    'core',
    ARRAY['Machine Learning', 'Deep Learning', 'Model']
);

SELECT upsert_glossary_term(
    'Model',
    'A mathematical way to represent patterns learned from data.',
    'core',
    ARRAY['Machine Learning', 'Deep Learning', 'Training Data']
);

SELECT upsert_glossary_term(
    'Bias',
    'Systematic errors in a model due to flawed training data.',
    'core',
    ARRAY['Training Data', 'Model', 'Machine Learning']
);

SELECT upsert_glossary_term(
    'Inference',
    'The process of an AI model using its learning to make predictions or decisions.',
    'core',
    ARRAY['Model', 'Machine Learning', 'Deep Learning']
);

-- AI Applications
SELECT upsert_glossary_term(
    'Natural Language Processing (NLP)',
    'AI that understands, interprets, and generates human language.',
    'applications',
    ARRAY['Machine Learning', 'Deep Learning', 'Large Language Model']
);

SELECT upsert_glossary_term(
    'Computer Vision (CV)',
    'AI that helps machines analyze and understand images and videos.',
    'applications',
    ARRAY['Deep Learning', 'Neural Network', 'Machine Learning']
);

SELECT upsert_glossary_term(
    'Generative AI',
    'AI that creates new content like images, text, or music.',
    'applications',
    ARRAY['Deep Learning', 'Neural Network', 'Large Language Model']
);

SELECT upsert_glossary_term(
    'Chatbot',
    'A computer program designed to simulate human conversation.',
    'applications',
    ARRAY['Natural Language Processing', 'Machine Learning', 'Large Language Model']
);

SELECT upsert_glossary_term(
    'Recommendation System',
    'AI that suggests products, content, or services based on user preferences.',
    'applications',
    ARRAY['Machine Learning', 'Deep Learning', 'Algorithm']
);

-- AI Models & Techniques
SELECT upsert_glossary_term(
    'Large Language Model (LLM)',
    'AI model trained on a massive text dataset and code, capable of generating human-like text, translating languages, and answering questions.',
    'models',
    ARRAY['Natural Language Processing', 'Deep Learning', 'Transformer']
);

SELECT upsert_glossary_term(
    'Transformer',
    'An architecture used in many LLMs that allows them to process information in parallel.',
    'models',
    ARRAY['Large Language Model', 'Deep Learning', 'Neural Network']
);

SELECT upsert_glossary_term(
    'Supervised Learning',
    'Training a model on labeled data with known outcomes.',
    'models',
    ARRAY['Machine Learning', 'Training Data', 'Model']
);

SELECT upsert_glossary_term(
    'Unsupervised Learning',
    'Training a model on unlabeled data to discover patterns.',
    'models',
    ARRAY['Machine Learning', 'Training Data', 'Model']
);

SELECT upsert_glossary_term(
    'Reinforcement Learning',
    'Training a model to make decisions based on rewards and penalties.',
    'models',
    ARRAY['Machine Learning', 'Deep Learning', 'Model']
);

-- AI Terminology
SELECT upsert_glossary_term(
    'Accuracy',
    'How often an AI model makes correct predictions.',
    'terminology',
    ARRAY['Model', 'Machine Learning', 'Training Data']
);

SELECT upsert_glossary_term(
    'Overfitting',
    'When a model performs well on training data but poorly on new data.',
    'terminology',
    ARRAY['Model', 'Training Data', 'Machine Learning']
);

SELECT upsert_glossary_term(
    'Underfitting',
    'When a model fails to capture the underlying patterns in the data.',
    'terminology',
    ARRAY['Model', 'Training Data', 'Machine Learning']
);

SELECT upsert_glossary_term(
    'Hyperparameter',
    'A setting that influences how a model learns.',
    'terminology',
    ARRAY['Model', 'Machine Learning', 'Training Data']
);

SELECT upsert_glossary_term(
    'Optimization',
    'The process of adjusting a model to improve its performance.',
    'terminology',
    ARRAY['Model', 'Machine Learning', 'Algorithm']
);

SELECT upsert_glossary_term(
    'Generalization',
    'The ability of a model to perform well on unseen data.',
    'terminology',
    ARRAY['Model', 'Machine Learning', 'Training Data']
);

SELECT upsert_glossary_term(
    'Explainable AI (XAI)',
    'Making AI decisions transparent and understandable.',
    'terminology',
    ARRAY['Machine Learning', 'Model', 'Algorithm']
);

SELECT upsert_glossary_term(
    'Artificial General Intelligence (AGI)',
    'Hypothetical AI with human-like intelligence across various tasks.',
    'terminology',
    ARRAY['Artificial Intelligence', 'Machine Learning', 'Deep Learning']
);

-- Additional Terms
SELECT upsert_glossary_term(
    'Cognitive Computing',
    'AI that mimics human thought processes.',
    'additional',
    ARRAY['Artificial Intelligence', 'Machine Learning', 'Neural Network']
);

SELECT upsert_glossary_term(
    'Data Mining',
    'Extracting knowledge from large datasets.',
    'additional',
    ARRAY['Machine Learning', 'Algorithm', 'Data Science']
);

SELECT upsert_glossary_term(
    'Data Science',
    'The field of extracting insights from data using various methods.',
    'additional',
    ARRAY['Machine Learning', 'Data Mining', 'Algorithm']
);

-- After inserting terms, update related terms and formatted definitions
SELECT extract_related_terms();

UPDATE glossary_terms 
SET formatted_definition = format_definition_with_terms(definition)
WHERE formatted_definition IS NULL OR formatted_definition = definition;