-- Create a view that combines tags from all content types
CREATE OR REPLACE VIEW content_tags AS
SELECT DISTINCT unnest(tags) as tag
FROM (
    SELECT tags FROM news
    UNION ALL
    SELECT tags FROM articles
    UNION ALL
    SELECT tags FROM tools
    UNION ALL
    SELECT tags FROM courses
) t
WHERE tags IS NOT NULL;

-- Create an index to improve tag-based queries
CREATE INDEX IF NOT EXISTS idx_news_tags ON news USING gin(tags);
CREATE INDEX IF NOT EXISTS idx_articles_tags ON articles USING gin(tags);
CREATE INDEX IF NOT EXISTS idx_tools_tags ON tools USING gin(tags);
CREATE INDEX IF NOT EXISTS idx_courses_tags ON courses USING gin(tags);