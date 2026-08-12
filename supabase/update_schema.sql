-- ================================================================
-- UPDATE V3: Admin Approval System (No Access Codes)
-- ================================================================

-- DROP old stuff (cleaning up)
DROP TABLE IF EXISTS public.user_sessions CASCADE;
DROP FUNCTION IF EXISTS public.register_session CASCADE;
DROP FUNCTION IF EXISTS public.check_session_status CASCADE;
DROP FUNCTION IF EXISTS public.admin_list_sessions CASCADE;
DROP FUNCTION IF EXISTS public.admin_set_block CASCADE;
DROP FUNCTION IF EXISTS public.link_access_code CASCADE;
DROP FUNCTION IF EXISTS public.check_access_status CASCADE;
DROP FUNCTION IF EXISTS public.admin_list_users CASCADE;
DROP FUNCTION IF EXISTS public.admin_set_user_block CASCADE;

-- We will drop the existing user_profiles and recreate it to ensure the schema is clean
DROP TABLE IF EXISTS public.user_profiles CASCADE;

-- ----------------------------------------------------------------
-- STEP 1: Create user_profiles table (linked to auth.users)
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email         TEXT,
  full_name     TEXT,
  avatar_url    TEXT,
  access_status TEXT DEFAULT 'none', -- 'none', 'pending', 'approved'
  is_blocked    BOOLEAN DEFAULT FALSE,
  user_agent    TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  last_seen_at  TIMESTAMPTZ DEFAULT NOW(),
  notes         TEXT
);

-- Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own profile
CREATE POLICY "Users can view own profile" 
ON public.user_profiles FOR SELECT 
USING ( auth.uid() = id );

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile" 
ON public.user_profiles FOR UPDATE 
USING ( auth.uid() = id );

-- ----------------------------------------------------------------
-- STEP 2: Trigger to create profile when user signs up
-- ----------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, avatar_url)
  VALUES (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ----------------------------------------------------------------
-- STEP 3: RPC — request_access (Users call this to ask for access)
-- ----------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.request_access(p_user_agent TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN FALSE;
  END IF;
  
  UPDATE public.user_profiles
  SET access_status = 'pending',
      user_agent = p_user_agent,
      last_seen_at = NOW()
  WHERE id = auth.uid() AND access_status = 'none';
  
  RETURN FOUND;
END;
$$;

-- ----------------------------------------------------------------
-- STEP 4: RPC — check_access_status (Polled by client)
-- ----------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.check_access_status()
RETURNS TABLE (
  status TEXT,
  is_blocked BOOLEAN
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_status TEXT;
  v_blocked BOOLEAN;
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN QUERY SELECT 'none'::TEXT, FALSE;
    RETURN;
  END IF;

  SELECT access_status, user_profiles.is_blocked 
  INTO v_status, v_blocked
  FROM public.user_profiles
  WHERE id = auth.uid();

  -- Update last seen
  UPDATE public.user_profiles
  SET last_seen_at = NOW()
  WHERE id = auth.uid();

  RETURN QUERY SELECT COALESCE(v_status, 'none'), COALESCE(v_blocked, FALSE);
END;
$$;

-- ----------------------------------------------------------------
-- STEP 5: RPC — admin_list_users
-- ----------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.admin_list_users(p_password TEXT)
RETURNS TABLE (
  id            UUID,
  status        TEXT,
  display_name  TEXT,
  email         TEXT,
  avatar_url    TEXT,
  user_agent    TEXT,
  is_blocked    BOOLEAN,
  created_at    TIMESTAMPTZ,
  last_seen_at  TIMESTAMPTZ,
  notes         TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_stored_password TEXT;
BEGIN
  SELECT value INTO v_stored_password
  FROM public.admin_settings
  WHERE key = 'admin_password';

  IF v_stored_password IS NULL OR p_password <> v_stored_password THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  RETURN QUERY
  SELECT u.id, u.access_status, u.full_name, u.email, u.avatar_url, u.user_agent,
         u.is_blocked, u.created_at, u.last_seen_at, u.notes
  FROM public.user_profiles u
  ORDER BY 
    CASE WHEN u.access_status = 'pending' THEN 1 ELSE 2 END,
    u.created_at DESC;
END;
$$;

-- ----------------------------------------------------------------
-- STEP 6: RPC — admin_update_user (Approve/Reject/Block)
-- ----------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.admin_update_user(
  p_password   TEXT,
  p_user_id    UUID,
  p_status     TEXT,
  p_blocked    BOOLEAN
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_stored_password TEXT;
BEGIN
  SELECT value INTO v_stored_password
  FROM public.admin_settings
  WHERE key = 'admin_password';

  IF v_stored_password IS NULL OR p_password <> v_stored_password THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  UPDATE public.user_profiles
  SET access_status = p_status,
      is_blocked = p_blocked,
      notes = COALESCE(notes, '') || ' | Updated at ' || NOW()::TEXT
  WHERE id = p_user_id;

  RETURN FOUND;
END;
$$;

-- ----------------------------------------------------------------
-- STEP 7: Grant execute to anon & authenticated
-- ----------------------------------------------------------------
GRANT EXECUTE ON FUNCTION public.request_access(TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.check_access_status() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.admin_list_users(TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.admin_update_user(TEXT, UUID, TEXT, BOOLEAN) TO anon, authenticated;
