```sql
-- Check and fix article data
UPDATE articles
SET 
    content = COALESCE(content, description),
    description = COALESCE(description, LEFT(content, 200)),
    created_at = COALESCE(created_at, CURRENT_TIMESTAMP),
    updated_at = CURRENT_TIMESTAMP,
    author = COALESCE(author, 'AI Tools Hub'),
    read_time = COALESCE(read_time, '5 min'),
    category = COALESCE(category, 'Technology')
WHERE title = 'AI Tools Hub Personas'
RETURNING *;

-- Ensure slug exists and is unique
UPDATE articles
SET slug = CASE 
    WHEN slug IS NULL OR slug = '' 
    THEN LOWER(REGEXP_REPLACE(title, '[^a-zA-Z0-9]+', '-', 'g'))
    ELSE slug
END
WHERE title = 'AI Tools Hub Personas';
```