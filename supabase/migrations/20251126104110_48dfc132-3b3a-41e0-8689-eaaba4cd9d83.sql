-- Create testimonials table for service-specific success stories
CREATE TABLE public.service_testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id TEXT NOT NULL,
  client_name TEXT NOT NULL,
  client_position TEXT NOT NULL,
  client_company TEXT NOT NULL,
  testimonial_text TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.service_testimonials ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to view testimonials
CREATE POLICY "Anyone can view service testimonials"
  ON public.service_testimonials
  FOR SELECT
  USING (true);

-- Create policy for authenticated users to manage testimonials
CREATE POLICY "Authenticated users can manage testimonials"
  ON public.service_testimonials
  FOR ALL
  USING (false)
  WITH CHECK (false);

-- Create index for faster queries by service_id
CREATE INDEX idx_service_testimonials_service_id ON public.service_testimonials(service_id);

COMMENT ON TABLE public.service_testimonials IS 'Stores client testimonials for specific services';
COMMENT ON COLUMN public.service_testimonials.service_id IS 'Links to service slug (e.g., executive-search, direct-hire)';