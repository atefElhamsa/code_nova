-- ================================================================
-- SYSTEM: Auto-Generated Access Requests (Device Pairing)
-- ================================================================

-- 1. Create the course_access_requests table
CREATE TABLE course_access_requests (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  device_code text UNIQUE NOT NULL,
  is_approved boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Disable Row Level Security (RLS) so the frontend can insert and read easily
ALTER TABLE course_access_requests DISABLE ROW LEVEL SECURITY;
