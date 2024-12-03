-- First ensure we have the update_updated_at_column function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing indexes if they exist
DROP INDEX IF EXISTS idx_tools_search;
DROP INDEX IF EXISTS idx_news_search;
DROP INDEX IF EXISTS idx_articles_search;
DROP INDEX IF EXISTS idx_events_search;
DROP INDEX IF EXISTS idx_tutorials_search;

-- Create GIN indexes for full content search
CREATE INDEX idx_tools_search ON tools USING gin(
  to_tsvector('english',
    coalesce(name, '') || ' ' ||
    coalesce(description, '')
  )
);

CREATE INDEX idx_news_search ON news USING gin(
  to_tsvector('english',
    coalesce(title, '') || ' ' ||
    coalesce(description, '')
  )
);

CREATE INDEX idx_articles_search ON articles USING gin(
  to_tsvector('english',
    coalesce(title, '') || ' ' ||
    coalesce(description, '')
  )
);

CREATE INDEX idx_events_search ON events USING gin(
  to_tsvector('english',
    coalesce(title, '') || ' ' ||
    coalesce(description, '')
  )
);

CREATE INDEX idx_tutorials_search ON tutorials USING gin(
  to_tsvector('english',
    coalesce(title, '') || ' ' ||
    coalesce(description, '')
  )
);

-- Drop existing search functions if they exist
DROP FUNCTION IF EXISTS search_content(text);
DROP FUNCTION IF EXISTS count_search_results(text);

-- Create function for partial text search
CREATE OR REPLACE FUNCTION search_content(search_term text)
RETURNS TABLE (
    id bigint,
    title text,
    description text,
    content_type text,
    url text,
    relevance float,
    created_at timestamptz
) AS $$
BEGIN
    RETURN QUERY
    -- Search tools
    SELECT 
        t.id,
        t.name as title,
        t.description,
        'tool'::text as content_type,
        '/tools/' || t.slug as url,
        ts_rank(
            to_tsvector('english',
                coalesce(t.name, '') || ' ' ||
                coalesce(t.description, '')
            ),
            plainto_tsquery('english', search_term)
        ) as relevance,
        t.created_at
    FROM tools t
    WHERE to_tsvector('english',
        coalesce(t.name, '') || ' ' ||
        coalesce(t.description, '')
    ) @@ plainto_tsquery('english', search_term)
    
    UNION ALL
    
    -- Search news
    SELECT 
        n.id,
        n.title,
        n.description,
        'news'::text as content_type,
        '/news/' || n.slug as url,
        ts_rank(
            to_tsvector('english',
                coalesce(n.title, '') || ' ' ||
                coalesce(n.description, '')
            ),
            plainto_tsquery('english', search_term)
        ) as relevance,
        n.created_at
    FROM news n
    WHERE to_tsvector('english',
        coalesce(n.title, '') || ' ' ||
        coalesce(n.description, '')
    ) @@ plainto_tsquery('english', search_term)
    
    UNION ALL
    
    -- Search articles
    SELECT 
        a.id,
        a.title,
        a.description,
        'article'::text as content_type,
        '/articles/' || a.slug as url,
        ts_rank(
            to_tsvector('english',
                coalesce(a.title, '') || ' ' ||
                coalesce(a.description, '')
            ),
            plainto_tsquery('english', search_term)
        ) as relevance,
        a.created_at
    FROM articles a
    WHERE to_tsvector('english',
        coalesce(a.title, '') || ' ' ||
        coalesce(a.description, '')
    ) @@ plainto_tsquery('english', search_term)
    
    UNION ALL
    
    -- Search events
    SELECT 
        e.id,
        e.title,
        e.description,
        'event'::text as content_type,
        '/events/' || e.slug as url,
        ts_rank(
            to_tsvector('english',
                coalesce(e.title, '') || ' ' ||
                coalesce(e.description, '')
            ),
            plainto_tsquery('english', search_term)
        ) as relevance,
        e.created_at
    FROM events e
    WHERE to_tsvector('english',
        coalesce(e.title, '') || ' ' ||
        coalesce(e.description, '')
    ) @@ plainto_tsquery('english', search_term)
    
    UNION ALL
    
    -- Search tutorials
    SELECT 
        t.id,
        t.title,
        t.description,
        'tutorial'::text as content_type,
        '/learning/tutorial/' || t.id::text as url,
        ts_rank(
            to_tsvector('english',
                coalesce(t.title, '') || ' ' ||
                coalesce(t.description, '')
            ),
            plainto_tsquery('english', search_term)
        ) as relevance,
        t.created_at
    FROM tutorials t
    WHERE to_tsvector('english',
        coalesce(t.title, '') || ' ' ||
        coalesce(t.description, '')
    ) @@ plainto_tsquery('english', search_term)
    
    ORDER BY relevance DESC, created_at DESC
    LIMIT 15;
END;
$$ LANGUAGE plpgsql;

-- Create function to get total search results count
CREATE OR REPLACE FUNCTION count_search_results(search_term text)
RETURNS bigint AS $$
DECLARE
    total_count bigint;
BEGIN
    SELECT COUNT(*)::bigint INTO total_count
    FROM (
        SELECT id FROM tools
        WHERE to_tsvector('english',
            coalesce(name, '') || ' ' ||
            coalesce(description, '')
        ) @@ plainto_tsquery('english', search_term)
        UNION ALL
        SELECT id FROM news
        WHERE to_tsvector('english',
            coalesce(title, '') || ' ' ||
            coalesce(description, '')
        ) @@ plainto_tsquery('english', search_term)
        UNION ALL
        SELECT id FROM articles
        WHERE to_tsvector('english',
            coalesce(title, '') || ' ' ||
            coalesce(description, '')
        ) @@ plainto_tsquery('english', search_term)
        UNION ALL
        SELECT id FROM events
        WHERE to_tsvector('english',
            coalesce(title, '') || ' ' ||
            coalesce(description, '')
        ) @@ plainto_tsquery('english', search_term)
        UNION ALL
        SELECT id FROM tutorials
        WHERE to_tsvector('english',
            coalesce(title, '') || ' ' ||
            coalesce(description, '')
        ) @@ plainto_tsquery('english', search_term)
    ) results;

    RETURN total_count;
END;
$$ LANGUAGE plpgsql;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION search_content(text) TO anon;
GRANT EXECUTE ON FUNCTION count_search_results(text) TO anon;