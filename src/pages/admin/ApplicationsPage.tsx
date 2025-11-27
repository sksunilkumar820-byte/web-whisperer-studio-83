import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { formatDistance } from 'date-fns';

interface JobApplication {
  id: string;
  job_id: string;
  full_name: string;
  email: string;
  phone: string;
  location: string | null;
  years_of_experience: number | null;
  cover_letter: string;
  resume_url: string | null;
  linkedin_url: string | null;
  portfolio_url: string | null;
  application_status: string;
  applied_at: string;
  job_listings: {
    title: string;
    department: string;
  } | null;
}

const ApplicationsPage = () => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    const { data, error } = await supabase
      .from('job_applications')
      .select(`
        *,
        job_listings (
          title,
          department
        )
      `)
      .order('applied_at', { ascending: false });

    if (!error && data) {
      setApplications(data as JobApplication[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const updateStatus = async (id: string, status: 'pending' | 'reviewing' | 'shortlisted' | 'interviewed' | 'rejected' | 'hired') => {
    const { error } = await supabase
      .from('job_applications')
      .update({ application_status: status })
      .eq('id', id);

    if (error) {
      toast.error('Failed to update status');
    } else {
      toast.success('Status updated successfully');
      fetchApplications();
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-500',
      reviewing: 'bg-blue-500',
      shortlisted: 'bg-purple-500',
      interviewed: 'bg-indigo-500',
      rejected: 'bg-red-500',
      hired: 'bg-green-500',
    };
    return colors[status] || 'bg-gray-500';
  };

  if (loading) {
    return <div className="text-center py-10">Loading applications...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Job Applications</h2>
        <p className="text-muted-foreground">Manage and track all job applications</p>
      </div>

      <div className="grid gap-4">
        {applications.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">No applications yet</p>
            </CardContent>
          </Card>
        ) : (
          applications.map((app) => (
            <Card key={app.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle>{app.full_name}</CardTitle>
                    <div className="text-sm text-muted-foreground">
                      Applied for: {app.job_listings?.title || 'Unknown Position'}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatDistance(new Date(app.applied_at), new Date(), { addSuffix: true })}
                    </div>
                  </div>
                  <Badge className={getStatusColor(app.application_status)}>
                    {app.application_status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{app.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{app.phone}</p>
                  </div>
                  {app.location && (
                    <div>
                      <p className="text-sm font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">{app.location}</p>
                    </div>
                  )}
                  {app.years_of_experience && (
                    <div>
                      <p className="text-sm font-medium">Experience</p>
                      <p className="text-sm text-muted-foreground">{app.years_of_experience} years</p>
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Cover Letter</p>
                  <p className="text-sm text-muted-foreground line-clamp-3">{app.cover_letter}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {app.resume_url && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={app.resume_url} target="_blank" rel="noopener noreferrer">
                        View Resume
                      </a>
                    </Button>
                  )}
                  {app.linkedin_url && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={app.linkedin_url} target="_blank" rel="noopener noreferrer">
                        LinkedIn
                      </a>
                    </Button>
                  )}
                  {app.portfolio_url && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={app.portfolio_url} target="_blank" rel="noopener noreferrer">
                        Portfolio
                      </a>
                    </Button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Update Status:</span>
                  <Select
                    value={app.application_status}
                    onValueChange={(value) => updateStatus(app.id, value as 'pending' | 'reviewing' | 'shortlisted' | 'interviewed' | 'rejected' | 'hired')}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="reviewing">Reviewing</SelectItem>
                      <SelectItem value="shortlisted">Shortlisted</SelectItem>
                      <SelectItem value="interviewed">Interviewed</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="hired">Hired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ApplicationsPage;
