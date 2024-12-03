-- Modify tutorial_progress table to use text instead of UUID
ALTER TABLE tutorial_progress
ALTER COLUMN user_id TYPE TEXT;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_tutorial_progress_user_tutorial 
ON tutorial_progress(user_id, tutorial_id);

-- Update existing records if any
UPDATE tutorial_progress
SET user_id = REPLACE(user_id::text, '-', '')
WHERE user_id LIKE '%-%';