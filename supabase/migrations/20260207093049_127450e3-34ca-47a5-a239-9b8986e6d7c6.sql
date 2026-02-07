-- Note: The INSERT policies with "WITH CHECK (true)" on job_applications, newsletter_subscribers, 
-- contact_inquiries, and job_alerts are INTENTIONAL for a public-facing website.
-- These forms need to accept submissions from anonymous visitors.
-- The security scanner flags them, but they are correct for this use case.

-- The job_alerts table currently uses email-based matching for RLS policies.
-- This is actually appropriate since job alerts are for anonymous visitors who provide their email.
-- Users don't need to be authenticated to create job alerts.
-- The email-based matching allows authenticated users to see their own alerts if they later sign up with the same email.

-- No database changes needed - the current RLS policies are appropriate for this public website.