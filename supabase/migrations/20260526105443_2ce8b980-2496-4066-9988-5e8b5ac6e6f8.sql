CREATE TABLE IF NOT EXISTS public.rate_limit_cleanup_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  executed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  executed_by TEXT NOT NULL,
  invoking_role TEXT NOT NULL,
  deleted_count INTEGER NOT NULL DEFAULT 0,
  success BOOLEAN NOT NULL DEFAULT true,
  error_message TEXT
);

ALTER TABLE public.rate_limit_cleanup_log ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can view cleanup log" ON public.rate_limit_cleanup_log;
CREATE POLICY "Admins can view cleanup log"
  ON public.rate_limit_cleanup_log
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

DROP FUNCTION IF EXISTS public.cleanup_old_rate_limits();

CREATE FUNCTION public.cleanup_old_rate_limits()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_invoking_role TEXT := current_setting('request.jwt.claim.role', true);
  v_session_user TEXT := session_user;
  v_deleted INTEGER := 0;
  v_effective_role TEXT;
BEGIN
  v_effective_role := COALESCE(NULLIF(v_invoking_role, ''), v_session_user);

  IF v_effective_role NOT IN ('service_role', 'postgres', 'supabase_admin') THEN
    INSERT INTO public.rate_limit_cleanup_log
      (executed_by, invoking_role, deleted_count, success, error_message)
    VALUES
      (v_session_user, v_effective_role, 0, false,
       'Refused: cleanup_old_rate_limits requires service_role context');
    RAISE EXCEPTION 'cleanup_old_rate_limits can only be invoked with service_role context (got %)', v_effective_role
      USING ERRCODE = '42501';
  END IF;

  DELETE FROM public.rate_limits WHERE window_start < now() - INTERVAL '1 hour';
  GET DIAGNOSTICS v_deleted = ROW_COUNT;

  INSERT INTO public.rate_limit_cleanup_log
    (executed_by, invoking_role, deleted_count, success)
  VALUES
    (v_session_user, v_effective_role, v_deleted, true);

  RETURN v_deleted;
EXCEPTION WHEN OTHERS THEN
  BEGIN
    INSERT INTO public.rate_limit_cleanup_log
      (executed_by, invoking_role, deleted_count, success, error_message)
    VALUES
      (v_session_user, v_effective_role, 0, false, SQLERRM);
  EXCEPTION WHEN OTHERS THEN
    NULL;
  END;
  RAISE;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.cleanup_old_rate_limits() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.cleanup_old_rate_limits() TO service_role;