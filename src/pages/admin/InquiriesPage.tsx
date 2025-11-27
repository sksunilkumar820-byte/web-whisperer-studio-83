import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatDistance } from 'date-fns';
import { Mail, Phone, Building } from 'lucide-react';

interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string;
  created_at: string;
}

const InquiriesPage = () => {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInquiries = async () => {
      const { data, error } = await supabase
        .from('contact_inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setInquiries(data);
      }
      setLoading(false);
    };

    fetchInquiries();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading inquiries...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Contact Inquiries</h2>
        <p className="text-muted-foreground">Review and respond to customer inquiries</p>
      </div>

      <div className="grid gap-4">
        {inquiries.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">No inquiries yet</p>
            </CardContent>
          </Card>
        ) : (
          inquiries.map((inquiry) => (
            <Card key={inquiry.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{inquiry.name}</CardTitle>
                    <div className="text-xs text-muted-foreground mt-1">
                      {formatDistance(new Date(inquiry.created_at), new Date(), { addSuffix: true })}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href={`mailto:${inquiry.email}`}>
                      Reply via Email
                    </a>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="text-sm">{inquiry.email}</p>
                    </div>
                  </div>

                  {inquiry.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Phone</p>
                        <p className="text-sm">{inquiry.phone}</p>
                      </div>
                    </div>
                  )}

                  {inquiry.company && (
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Company</p>
                        <p className="text-sm">{inquiry.company}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Message</p>
                  <p className="text-sm text-muted-foreground">{inquiry.message}</p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default InquiriesPage;
