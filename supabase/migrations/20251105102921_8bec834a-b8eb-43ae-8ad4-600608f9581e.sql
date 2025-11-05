-- Create contact inquiries table
CREATE TABLE public.contact_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert contact inquiries (public form)
CREATE POLICY "Anyone can submit contact inquiries" 
ON public.contact_inquiries 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Only authenticated users can view inquiries (for future admin panel)
CREATE POLICY "Authenticated users can view contact inquiries" 
ON public.contact_inquiries 
FOR SELECT 
TO authenticated
USING (true);

-- Create index for better query performance
CREATE INDEX idx_contact_inquiries_created_at ON public.contact_inquiries(created_at DESC);