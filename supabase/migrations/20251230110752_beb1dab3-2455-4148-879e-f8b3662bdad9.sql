-- Drop the overly permissive policies
DROP POLICY IF EXISTS "Users can view alerts by email" ON public.job_alerts;
DROP POLICY IF EXISTS "Users can update alerts by email" ON public.job_alerts;

-- Create proper policies that restrict access to the user's own alerts
-- Users can only view alerts where their authenticated email matches
CREATE POLICY "Users can view their own alerts by email"
ON public.job_alerts
FOR SELECT
TO authenticated
USING (email = auth.email());

-- Users can only update alerts where their authenticated email matches
CREATE POLICY "Users can update their own alerts by email"
ON public.job_alerts
FOR UPDATE
TO authenticated
USING (email = auth.email())
WITH CHECK (email = auth.email());