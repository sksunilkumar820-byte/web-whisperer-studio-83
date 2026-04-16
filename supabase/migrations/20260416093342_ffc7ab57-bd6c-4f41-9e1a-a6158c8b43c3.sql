
-- Create storage bucket for CV uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('cv-uploads', 'cv-uploads', false);

-- Allow anyone to upload CV files
CREATE POLICY "Anyone can upload CVs"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'cv-uploads');

-- Allow admins to view/download CV files
CREATE POLICY "Admins can view CVs"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'cv-uploads' AND public.has_role(auth.uid(), 'admin'::public.app_role));

-- Allow admins to delete CV files
CREATE POLICY "Admins can delete CVs"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'cv-uploads' AND public.has_role(auth.uid(), 'admin'::public.app_role));
