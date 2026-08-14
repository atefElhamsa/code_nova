-- ================================================================
-- UPDATE: Add Phone Number support and Email Auth support
-- ================================================================

-- 1. Add phone column to user_profiles if it doesn't exist
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS phone TEXT;

-- 2. Update the trigger to capture phone from metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, avatar_url, phone)
  VALUES (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'avatar_url',
    new.raw_user_meta_data->>'phone'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Update admin_list_users to return phone
DROP FUNCTION IF EXISTS public.admin_list_users(TEXT);

CREATE OR REPLACE FUNCTION public.admin_list_users(p_password TEXT)
RETURNS TABLE (
  id            UUID,
  status        TEXT,
  display_name  TEXT,
  email         TEXT,
  phone         TEXT,
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
  SELECT u.id, u.access_status, u.full_name, u.email, u.phone, u.avatar_url, u.user_agent,
         u.is_blocked, u.created_at, u.last_seen_at, u.notes
  FROM public.user_profiles u
  ORDER BY 
    CASE WHEN u.access_status = 'pending' THEN 1 ELSE 2 END,
    u.created_at DESC;
END;
$$;

GRANT EXECUTE ON FUNCTION public.admin_list_users(TEXT) TO anon, authenticated;
