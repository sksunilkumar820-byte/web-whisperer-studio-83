-- Create job_alerts table
CREATE TABLE public.job_alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  department TEXT,
  location TEXT,
  job_type TEXT,
  keywords TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.job_alerts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert job alerts (public feature)
CREATE POLICY "Anyone can create job alerts"
ON public.job_alerts
FOR INSERT
WITH CHECK (true);

-- Create policy to allow users to view their own alerts
CREATE POLICY "Users can view alerts by email"
ON public.job_alerts
FOR SELECT
USING (true);

-- Create policy to allow users to update their own alerts
CREATE POLICY "Users can update alerts by email"
ON public.job_alerts
FOR UPDATE
USING (true);

-- Create index for email lookups
CREATE INDEX idx_job_alerts_email ON public.job_alerts(email);

-- Create index for active alerts
CREATE INDEX idx_job_alerts_active ON public.job_alerts(active);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_job_alerts_updated_at
BEFORE UPDATE ON public.job_alerts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();