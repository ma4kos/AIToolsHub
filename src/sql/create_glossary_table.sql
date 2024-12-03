-- Create glossary terms table
CREATE TABLE IF NOT EXISTS glossary_terms (
    id BIGSERIAL PRIMARY KEY,
    term VARCHAR(255) NOT NULL,
    definition TEXT NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('core', 'applications', 'models', 'terminology', 'additional')),
    examples TEXT[] DEFAULT '{}',
    related_terms TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index for term search
CREATE INDEX IF NOT EXISTS idx_glossary_terms_term ON glossary_terms(term);
CREATE INDEX IF NOT EXISTS idx_glossary_terms_category ON glossary_terms(category);

-- Create trigger for updated_at
CREATE TRIGGER update_glossary_terms_updated_at
    BEFORE UPDATE ON glossary_terms
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample terms
INSERT INTO glossary_terms (term, definition, category, examples, related_terms) VALUES
('Artificial Intelligence (AI)', 'The simulation of human intelligence by machines, particularly computer systems. AI systems can perform tasks that typically require human intelligence such as visual perception, speech recognition, decision-making, and language translation.', 'core', ARRAY['Virtual assistants like Siri or Alexa', 'Self-driving cars', 'Chess-playing computers'], ARRAY['Machine Learning', 'Deep Learning', 'Neural Networks']),

('Machine Learning', 'A subset of AI that enables systems to learn and improve from experience without being explicitly programmed. It focuses on developing computer programs that can access and learn from data.', 'core', ARRAY['Email spam filters', 'Product recommendations', 'Image recognition systems'], ARRAY['Deep Learning', 'Neural Networks', 'Supervised Learning']),

('Neural Network', 'A computing system inspired by biological neural networks in human brains. It consists of interconnected nodes (neurons) that process and transmit information, enabling the system to learn and recognize patterns.', 'models', ARRAY['Image classification', 'Speech recognition', 'Language translation'], ARRAY['Deep Learning', 'Machine Learning', 'Artificial Intelligence']),

('Deep Learning', 'A subset of machine learning based on artificial neural networks with multiple layers. It enables systems to automatically learn representations from data through multiple levels of abstraction.', 'models', ARRAY['Facial recognition', 'Natural language processing', 'Autonomous vehicles'], ARRAY['Neural Networks', 'Machine Learning', 'Convolutional Neural Networks']),

('Natural Language Processing (NLP)', 'A branch of AI that helps computers understand, interpret, and manipulate human language. It enables machines to read text, hear speech, and interpret it in a way that is valuable.', 'applications', ARRAY['Chatbots', 'Translation services', 'Voice assistants'], ARRAY['Machine Learning', 'Deep Learning', 'Text Mining']),

('Computer Vision', 'A field of AI that enables computers to understand and process visual information from the world. It involves analyzing and extracting meaningful information from images and videos.', 'applications', ARRAY['Facial recognition systems', 'Medical image analysis', 'Autonomous vehicle navigation'], ARRAY['Deep Learning', 'Neural Networks', 'Image Processing']),

('Supervised Learning', 'A type of machine learning where the algorithm learns from labeled training data. The system is trained on a dataset where the desired output is known, and it learns to generate the correct output for new inputs.', 'terminology', ARRAY['Email spam detection', 'Image classification', 'Price prediction'], ARRAY['Machine Learning', 'Classification', 'Regression']),

('Unsupervised Learning', 'A type of machine learning where the algorithm learns patterns from unlabeled data. The system tries to find hidden structures or relationships in the data without being explicitly told what to look for.', 'terminology', ARRAY['Customer segmentation', 'Anomaly detection', 'Pattern recognition'], ARRAY['Machine Learning', 'Clustering', 'Dimensionality Reduction']),

('Reinforcement Learning', 'A type of machine learning where an agent learns to make decisions by interacting with an environment. The agent receives rewards or penalties for its actions and learns to maximize the cumulative reward.', 'terminology', ARRAY['Game playing AI', 'Robot navigation', 'Resource management'], ARRAY['Machine Learning', 'Deep Learning', 'Q-Learning']);