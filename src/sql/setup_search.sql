-- Drop existing indexes
DROP INDEX IF EXISTS idx_tools_search;
DROP INDEX IF EXISTS idx_news_search;
DROP INDEX IF EXISTS idx_articles_search;
DROP INDEX IF EXISTS idx_events_search;
DROP INDEX IF EXISTS idx_tutorials_search;

-- Create GIN indexes with to_tsvector for full content search
CREATE INDEX idx_tools_search ON tools USING gin(
  to_tsvector('english',
    coalesce(name, '') || ' ' ||
    coalesce(description, '') || ' ' ||
    coalesce(content, '')
  )
);

CREATE INDEX idx_news_search ON news USING gin(
  to_tsvector('english',
    coalesce(title, '') || ' ' ||
    coalesce(description, '') || ' ' ||
    coalesce(content, '')
  )
);

CREATE INDEX idx_articles_search ON articles USING gin(
  to_tsvector('english',
    coalesce(title, '') || ' ' ||
    coalesce(description, '') || ' ' ||
    coalesce(content, '')
  )
);

CREATE INDEX idx_events_search ON events USING gin(
  to_tsvector('english',
    coalesce(title, '') || ' ' ||
    coalesce(description, '') || ' ' ||
    coalesce(content, '')
  )
);

CREATE INDEX idx_tutorials_search ON tutorials USING gin(
  to_tsvector('english',
    coalesce(title, '') || ' ' ||
    coalesce(description, '') || ' ' ||
    coalesce(content, '')
  )
);

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
DECLARE
    query_tokens text[];
    query_string text;
BEGIN
    -- Split search term into tokens
    query_tokens := regexp_split_to_array(lower(search_term), '\s+');
    
    -- Create a query string that matches partial words
    query_string := array_to_string(
        array_agg(token || ':*' ORDER BY token)
        FROM unnest(query_tokens) AS token
    , ' & ');

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
                coalesce(t.description, '') || ' ' ||
                coalesce(t.content, '')
            ),
            to_tsquery('english', query_string)
        ) as relevance,
        t.created_at
    FROM tools t
    WHERE to_tsvector('english',
        coalesce(t.name, '') || ' ' ||
        coalesce(t.description, '') || ' ' ||
        coalesce(t.content, '')
    ) @@ to_tsquery('english', query_string)
    
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
                coalesce(n.description, '') || ' ' ||
                coalesce(n.content, '')
            ),
            to_tsquery('english', query_string)
        ) as relevance,
        n.created_at
    FROM news n
    WHERE to_tsvector('english',
        coalesce(n.title, '') || ' ' ||
        coalesce(n.description, '') || ' ' ||
        coalesce(n.content, '')
    ) @@ to_tsquery('english', query_string)
    
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
                coalesce(a.description, '') || ' ' ||
                coalesce(a.content, '')
            ),
            to_tsquery('english', query_string)
        ) as relevance,
        a.created_at
    FROM articles a
    WHERE to_tsvector('english',
        coalesce(a.title, '') || ' ' ||
        coalesce(a.description, '') || ' ' ||
        coalesce(a.content, '')
    ) @@ to_tsquery('english', query_string)
    
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
                coalesce(e.description, '') || ' ' ||
                coalesce(e.content, '')
            ),
            to_tsquery('english', query_string)
        ) as relevance,
        e.created_at
    FROM events e
    WHERE to_tsvector('english',
        coalesce(e.title, '') || ' ' ||
        coalesce(e.description, '') || ' ' ||
        coalesce(e.content, '')
    ) @@ to_tsquery('english', query_string)
    
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
                coalesce(t.description, '') || ' ' ||
                coalesce(t.content, '')
            ),
            to_tsquery('english', query_string)
        ) as relevance,
        t.created_at
    FROM tutorials t
    WHERE to_tsvector('english',
        coalesce(t.title, '') || ' ' ||
        coalesce(t.description, '') || ' ' ||
        coalesce(t.content, '')
    ) @@ to_tsquery('english', query_string)
    
    ORDER BY relevance DESC, created_at DESC
    LIMIT 15;
END;
$$ LANGUAGE plpgsql;

-- Create function to get total search results count
CREATE OR REPLACE FUNCTION count_search_results(search_term text)
RETURNS bigint AS $$
DECLARE
    query_tokens text[];
    query_string text;
    total_count bigint;
BEGIN
    -- Split search term into tokens
    query_tokens := regexp_split_to_array(lower(search_term), '\s+');
    
    -- Create a query string that matches partial words
    query_string := array_to_string(
        array_agg(token || ':*' ORDER BY token)
        FROM unnest(query_tokens) AS token
    , ' & ');

    SELECT COUNT(*)::bigint INTO total_count
    FROM (
        SELECT id FROM tools
        WHERE to_tsvector('english',
            coalesce(name, '') || ' ' ||
            coalesce(description, '') || ' ' ||
            coalesce(content, '')
        ) @@ to_tsquery('english', query_string)
        UNION ALL
        SELECT id FROM news
        WHERE to_tsvector('english',
            coalesce(title, '') || ' ' ||
            coalesce(description, '') || ' ' ||
            coalesce(content, '')
        ) @@ to_tsquery('english', query_string)
        UNION ALL
        SELECT id FROM articles
        WHERE to_tsvector('english',
            coalesce(title, '') || ' ' ||
            coalesce(description, '') || ' ' ||
            coalesce(content, '')
        ) @@ to_tsquery('english', query_string)
        UNION ALL
        SELECT id FROM events
        WHERE to_tsvector('english',
            coalesce(title, '') || ' ' ||
            coalesce(description, '') || ' ' ||
            coalesce(content, '')
        ) @@ to_tsquery('english', query_string)
        UNION ALL
        SELECT id FROM tutorials
        WHERE to_tsvector('english',
            coalesce(title, '') || ' ' ||
            coalesce(description, '') || ' ' ||
            coalesce(content, '')
        ) @@ to_tsquery('english', query_string)
    ) results;

    RETURN total_count;
END;
$$ LANGUAGE plpgsql;