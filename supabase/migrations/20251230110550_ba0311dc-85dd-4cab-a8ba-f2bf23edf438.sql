-- Drop the overly permissive policy that allows any authenticated user to view contact inquiries
DROP POLICY IF EXISTS "Authenticated users can view contact inquiries" ON public.contact_inquiries;

-- The "Admins can view all contact inquiries" policy will remain active and correctly restrict access