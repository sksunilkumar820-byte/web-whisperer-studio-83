DROP POLICY IF EXISTS "Anyone can upload CVs" ON storage.objects;

CREATE POLICY "Anyone can upload CVs"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (
  bucket_id = 'cv-uploads'
  AND name ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(pdf|doc|docx)$'
);