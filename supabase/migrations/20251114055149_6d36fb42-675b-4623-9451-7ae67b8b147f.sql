-- Drop existing types if they exist
DROP TYPE IF EXISTS public.application_status CASCADE;
DROP TYPE IF EXISTS public.job_status CASCADE;
DROP TYPE IF EXISTS public.job_type CASCADE;

-- Create enum for job types
CREATE TYPE public.job_type AS ENUM ('full-time', 'part-time', 'contract', 'internship');

-- Create enum for job status
CREATE TYPE public.job_status AS ENUM ('open', 'closed', 'draft');

-- Create enum for application status
CREATE TYPE public.application_status AS ENUM ('pending', 'reviewing', 'shortlisted', 'interviewed', 'rejected', 'hired');

-- Drop existing tables if they exist
DROP TABLE IF EXISTS public.job_applications CASCADE;
DROP TABLE IF EXISTS public.job_listings CASCADE;

-- Create job_listings table
CREATE TABLE public.job_listings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  location TEXT NOT NULL,
  job_type public.job_type NOT NULL DEFAULT 'full-time',
  status public.job_status NOT NULL DEFAULT 'open',
  description TEXT NOT NULL,
  requirements TEXT NOT NULL,
  responsibilities TEXT NOT NULL,
  salary_range TEXT,
  posted_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  closing_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create job_applications table
CREATE TABLE public.job_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID NOT NULL REFERENCES public.job_listings(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  location TEXT,
  linkedin_url TEXT,
  portfolio_url TEXT,
  resume_url TEXT,
  cover_letter TEXT NOT NULL,
  years_of_experience INTEGER,
  application_status public.application_status NOT NULL DEFAULT 'pending',
  applied_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.job_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for job_listings
CREATE POLICY "Anyone can view open job listings"
ON public.job_listings
FOR SELECT
USING (status = 'open');

CREATE POLICY "Authenticated users can manage job listings"
ON public.job_listings
FOR ALL
USING (false)
WITH CHECK (false);

-- RLS Policies for job_applications
CREATE POLICY "Anyone can submit job applications"
ON public.job_applications
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Authenticated users can view all applications"
ON public.job_applications
FOR SELECT
USING (false);

CREATE POLICY "Authenticated users can update application status"
ON public.job_applications
FOR UPDATE
USING (false);

-- Create indexes for better query performance
CREATE INDEX idx_job_listings_status ON public.job_listings(status);
CREATE INDEX idx_job_listings_department ON public.job_listings(department);
CREATE INDEX idx_job_applications_job_id ON public.job_applications(job_id);
CREATE INDEX idx_job_applications_status ON public.job_applications(application_status);
CREATE INDEX idx_job_applications_email ON public.job_applications(email);

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_job_listings_updated_at
BEFORE UPDATE ON public.job_listings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_job_applications_updated_at
BEFORE UPDATE ON public.job_applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample job listings
INSERT INTO public.job_listings (title, department, location, job_type, status, description, requirements, responsibilities, salary_range) VALUES
('Senior Consultant - Strategy', 'Strategy Consulting', 'New Delhi, India', 'full-time', 'open',
'We are seeking an experienced Senior Consultant to join our Strategy practice. You will work with leading organizations to solve complex business challenges and drive transformational change.',
'• 5+ years of management consulting experience
• MBA from a top-tier institution
• Strong analytical and problem-solving skills
• Excellent communication and presentation abilities
• Experience in strategy development and implementation',
'• Lead client engagements and manage project teams
• Conduct strategic analysis and develop recommendations
• Present findings to C-level executives
• Mentor junior consultants
• Contribute to business development activities',
'₹25-35 LPA'),

('HR Consultant', 'Human Resources', 'Mumbai, India', 'full-time', 'open',
'Join our HR practice to help organizations optimize their people strategies. You will design and implement HR solutions that drive organizational effectiveness.',
'• 3+ years of HR consulting or corporate HR experience
• Strong knowledge of HR best practices
• Experience with organizational design and change management
• Excellent stakeholder management skills
• SHRM or HRCI certification preferred',
'• Assess client HR needs and design solutions
• Implement HR transformation programs
• Develop talent management strategies
• Conduct workshops and training sessions
• Support business development initiatives',
'₹15-20 LPA'),

('Technology Consultant', 'Digital Transformation', 'Bangalore, India', 'full-time', 'open',
'We are looking for a Technology Consultant to help our clients navigate their digital transformation journey and implement cutting-edge solutions.',
'• 4+ years of technology consulting experience
• Strong technical background in cloud, analytics, or automation
• Experience with digital transformation projects
• Knowledge of agile methodologies
• Technical certifications (AWS, Azure, etc.) preferred',
'• Assess technology landscape and identify opportunities
• Design technology roadmaps and architectures
• Lead implementation of digital solutions
• Manage vendor relationships
• Provide technical guidance to project teams',
'₹18-25 LPA');
