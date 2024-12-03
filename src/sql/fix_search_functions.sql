-- Drop existing functions
DROP FUNCTION IF EXISTS search_content(text);
DROP FUNCTION IF EXISTS count_search_results(text);

-- Create function for search with proper type handling
CREATE OR REPLACE FUNCTION search_content(search_term text)
RETURNS TABLE (
    id bigint,
    title text,
    description text,
    content_type text,
    url text,
    relevance double precision,
    created_at timestamptz
) AS $$
BEGIN
    RETURN QUERY
    -- Search tools
    SELECT 
        t.id,
        t.name::text as title,
        t.description::text,
        'tool'::text as content_type,
        '/tools/' || t.slug as url,
        ts_rank_cd(
            to_tsvector('english',
                coalesce(t.name, '') || ' ' ||
                coalesce(t.description, '')
            ),
            plainto_tsquery('english', search_term)
        )::double precision as relevance,
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
        n.title::text,
        n.description::text,
        'news'::text as content_type,
        '/news/' || n.slug as url,
        ts_rank_cd(
            to_tsvector('english',
                coalesce(n.title, '') || ' ' ||
                coalesce(n.description, '')
            ),
            plainto_tsquery('english', search_term)
        )::double precision as relevance,
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
        a.title::text,
        a.description::text,
        'article'::text as content_type,
        '/articles/' || a.slug as url,
        ts_rank_cd(
            to_tsvector('english',
                coalesce(a.title, '') || ' ' ||
                coalesce(a.description, '')
            ),
            plainto_tsquery('english', search_term)
        )::double precision as relevance,
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
        e.title::text,
        e.description::text,
        'event'::text as content_type,
        '/events/' || e.slug as url,
        ts_rank_cd(
            to_tsvector('english',
                coalesce(e.title, '') || ' ' ||
                coalesce(e.description, '')
            ),
            plainto_tsquery('english', search_term)
        )::double precision as relevance,
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
        t.title::text,
        t.description::text,
        'tutorial'::text as content_type,
        '/learning/tutorial/' || t.id::text as url,
        ts_rank_cd(
            to_tsvector('english',
                coalesce(t.title, '') || ' ' ||
                coalesce(t.description, '')
            ),
            plainto_tsquery('english', search_term)
        )::double precision as relevance,
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

-- Create function to count search results
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

-- Grant permissions to anonymous users
GRANT EXECUTE ON FUNCTION search_content(text) TO anon;
GRANT EXECUTE ON FUNCTION count_search_results(text) TO anon;