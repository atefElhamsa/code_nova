-- ================================================================
-- STEP 1: Create access_codes table
-- ================================================================
CREATE TABLE IF NOT EXISTS public.access_codes (
  id         UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  code       TEXT        UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  is_active  BOOLEAN     DEFAULT TRUE,
  notes      TEXT
);

-- ================================================================
-- STEP 2: Create access_requests table (log all attempts)
-- ================================================================
CREATE TABLE IF NOT EXISTS public.access_requests (
  id              UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  requester_info  TEXT,
  user_agent      TEXT,
  requested_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================================
-- STEP 3: Enable Row Level Security
-- ================================================================
ALTER TABLE public.access_codes    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.access_requests ENABLE ROW LEVEL SECURITY;

-- access_requests: anyone can INSERT (to log their request)
CREATE POLICY "anon_can_insert_requests"
  ON public.access_requests
  FOR INSERT TO anon
  WITH CHECK (true);

-- access_codes: NO direct access for anon — only via RPC below
-- (no SELECT policy = nobody can read the table directly)

-- ================================================================
-- STEP 4: Secure RPC to validate a code (without exposing the table)
-- ================================================================
CREATE OR REPLACE FUNCTION public.validate_access_code(input_code TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.access_codes
    WHERE code       = UPPER(TRIM(input_code))
      AND is_active  = TRUE
      AND expires_at > NOW()
  );
END;
$$;

-- Allow anonymous users to call this function
GRANT EXECUTE ON FUNCTION public.validate_access_code(TEXT) TO anon;


-- ================================================================
-- ✅ Setup complete!
-- To add a new access code manually, run:
-- INSERT INTO public.access_codes (code, expires_at, notes)
-- VALUES ('YOUR-CODE', NOW() + INTERVAL '1 hour', 'اسم الزائر');
-- ================================================================

