-- Create case studies table for detailed success stories
CREATE TABLE public.case_studies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id TEXT NOT NULL,
  title TEXT NOT NULL,
  client_name TEXT NOT NULL,
  client_company TEXT NOT NULL,
  client_industry TEXT,
  challenge TEXT NOT NULL,
  solution TEXT NOT NULL,
  outcome TEXT NOT NULL,
  metrics JSONB NOT NULL DEFAULT '[]'::jsonb,
  image_url TEXT,
  published_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to view case studies
CREATE POLICY "Anyone can view case studies"
  ON public.case_studies
  FOR SELECT
  USING (true);

-- Create policy for authenticated users to manage case studies
CREATE POLICY "Authenticated users can manage case studies"
  ON public.case_studies
  FOR ALL
  USING (false)
  WITH CHECK (false);

-- Create index for faster queries by service_id
CREATE INDEX idx_case_studies_service_id ON public.case_studies(service_id);

-- Create index for faster queries by published_date
CREATE INDEX idx_case_studies_published_date ON public.case_studies(published_date DESC);

COMMENT ON TABLE public.case_studies IS 'Stores detailed case studies and success stories for services';
COMMENT ON COLUMN public.case_studies.service_id IS 'Links to service slug (e.g., executive-search, direct-hire)';
COMMENT ON COLUMN public.case_studies.metrics IS 'JSON array of metrics with label and value, e.g., [{"label": "Time Saved", "value": "40%"}]';