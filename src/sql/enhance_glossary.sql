-- Function to extract related terms from definitions
CREATE OR REPLACE FUNCTION extract_related_terms() 
RETURNS void AS $$
DECLARE
    term_record RECORD;
    term_list text[];
    found_term text;
BEGIN
    -- Get all existing terms
    FOR term_record IN SELECT id, term, definition FROM glossary_terms
    LOOP
        term_list := ARRAY[]::text[];
        
        -- Check each term against the definition
        FOR found_term IN 
            SELECT DISTINCT t.term 
            FROM glossary_terms t 
            WHERE t.term != term_record.term 
            AND term_record.definition ILIKE '%' || t.term || '%'
        LOOP
            term_list := array_append(term_list, found_term);
        END LOOP;
        
        -- Update related_terms array
        IF array_length(term_list, 1) > 0 THEN
            UPDATE glossary_terms 
            SET related_terms = term_list,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = term_record.id;
        END IF;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Create function to format definitions with term markup
CREATE OR REPLACE FUNCTION format_definition_with_terms(definition text) 
RETURNS text AS $$
DECLARE
    formatted_text text := definition;
    term_record RECORD;
BEGIN
    FOR term_record IN 
        SELECT term 
        FROM glossary_terms 
        ORDER BY length(term) DESC -- Process longer terms first
    LOOP
        formatted_text := regexp_replace(
            formatted_text,
            '\m' || term_record.term || '\M', -- Word boundaries
            '[[' || term_record.term || ']]',
            'gi'
        );
    END LOOP;
    RETURN formatted_text;
END;
$$ LANGUAGE plpgsql;

-- Add formatted_definition column
ALTER TABLE glossary_terms 
ADD COLUMN IF NOT EXISTS formatted_definition text;

-- Update formatted definitions
UPDATE glossary_terms 
SET formatted_definition = format_definition_with_terms(definition);

-- Create trigger to maintain formatted definitions
CREATE OR REPLACE FUNCTION update_formatted_definition()
RETURNS TRIGGER AS $$
BEGIN
    NEW.formatted_definition := format_definition_with_terms(NEW.definition);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER glossary_term_format_trigger
    BEFORE INSERT OR UPDATE OF definition
    ON glossary_terms
    FOR EACH ROW
    EXECUTE FUNCTION update_formatted_definition();

-- Initial population of related terms
SELECT extract_related_terms();