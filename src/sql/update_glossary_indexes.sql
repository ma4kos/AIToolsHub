-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_glossary_terms_search 
ON glossary_terms USING gin(to_tsvector('english', term || ' ' || definition));

CREATE INDEX IF NOT EXISTS idx_glossary_terms_related 
ON glossary_terms USING gin(related_terms);

-- Add constraint for valid categories
ALTER TABLE glossary_terms 
ADD CONSTRAINT valid_category CHECK (
  category IN ('core', 'applications', 'models', 'terminology', 'additional')
);

-- Add constraint for unique terms
ALTER TABLE glossary_terms 
ADD CONSTRAINT unique_term UNIQUE (term);

-- Update statistics
ANALYZE glossary_terms;