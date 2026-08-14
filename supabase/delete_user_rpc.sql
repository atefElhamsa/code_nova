-- ----------------------------------------------------------------
-- RPC — admin_delete_user
-- ----------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.admin_delete_user(
  p_password TEXT,
  p_user_id UUID
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth
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

  -- Delete from auth.users (this will cascade to public.user_profiles)
  DELETE FROM auth.users WHERE id = p_user_id;

  RETURN FOUND;
END;
$$;

GRANT EXECUTE ON FUNCTION public.admin_delete_user(TEXT, UUID) TO anon, authenticated;
