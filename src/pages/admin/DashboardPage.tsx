import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Mail, FileText, Users, TrendingUp, Star } from 'lucide-react';

interface Stats {
  applications: number;
  inquiries: number;
  caseStudies: number;
  testimonials: number;
  newsletterSubscribers: number;
  blogPosts: number;
}

const DashboardPage = () => {
  const [stats, setStats] = useState<Stats>({
    applications: 0,
    inquiries: 0,
    caseStudies: 0,
    testimonials: 0,
    newsletterSubscribers: 0,
    blogPosts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          applicationsRes,
          inquiriesRes,
          caseStudiesRes,
          testimonialsRes,
          newsletterRes,
          blogPostsRes,
        ] = await Promise.all([
          supabase.from('job_applications').select('id', { count: 'exact', head: true }),
          supabase.from('contact_inquiries').select('id', { count: 'exact', head: true }),
          supabase.from('case_studies').select('id', { count: 'exact', head: true }),
          supabase.from('service_testimonials').select('id', { count: 'exact', head: true }),
          supabase.from('newsletter_subscribers').select('id', { count: 'exact', head: true }),
          supabase.from('blog_posts').select('id', { count: 'exact', head: true }),
        ]);

        setStats({
          applications: applicationsRes.count || 0,
          inquiries: inquiriesRes.count || 0,
          caseStudies: caseStudiesRes.count || 0,
          testimonials: testimonialsRes.count || 0,
          newsletterSubscribers: newsletterRes.count || 0,
          blogPosts: blogPostsRes.count || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: 'Job Applications', value: stats.applications, icon: Briefcase, color: 'text-blue-600' },
    { title: 'Contact Inquiries', value: stats.inquiries, icon: Mail, color: 'text-green-600' },
    { title: 'Case Studies', value: stats.caseStudies, icon: FileText, color: 'text-purple-600' },
    { title: 'Testimonials', value: stats.testimonials, icon: Star, color: 'text-yellow-600' },
    { title: 'Newsletter Subscribers', value: stats.newsletterSubscribers, icon: Users, color: 'text-pink-600' },
    { title: 'Blog Posts', value: stats.blogPosts, icon: TrendingUp, color: 'text-indigo-600' },
  ];

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Overview</h2>
        <p className="text-muted-foreground">Welcome to your admin dashboard</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Use the sidebar to navigate to different sections of your admin panel.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
