-- ================================================================
-- UPDATE: Link Course Access to User Accounts
-- ================================================================

-- 1. Add user_id column to course_access_requests
ALTER TABLE public.course_access_requests 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

-- 2. Optional: Add an index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_course_access_requests_user_id ON public.course_access_requests(user_id);
