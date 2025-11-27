import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDistance } from 'date-fns';

interface CaseStudy {
  id: string;
  service_id: string;
  title: string;
  client_name: string;
  client_company: string;
  client_industry: string | null;
  challenge: string;
  solution: string;
  outcome: string;
  published_date: string;
  created_at: string;
}

const CaseStudiesManagePage = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setCaseStudies(data);
      }
      setLoading(false);
    };

    fetchCaseStudies();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading case studies...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Case Studies</h2>
          <p className="text-muted-foreground">Manage success stories and client outcomes</p>
        </div>
        <Button>Add New Case Study</Button>
      </div>

      <div className="grid gap-4">
        {caseStudies.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">No case studies yet</p>
            </CardContent>
          </Card>
        ) : (
          caseStudies.map((study) => (
            <Card key={study.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{study.title}</CardTitle>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline">{study.service_id}</Badge>
                      {study.client_industry && (
                        <Badge variant="secondary">{study.client_industry}</Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      Published {formatDistance(new Date(study.published_date), new Date(), { addSuffix: true })}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium">Client</p>
                  <p className="text-sm text-muted-foreground">
                    {study.client_name} - {study.client_company}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Challenge</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">{study.challenge}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Outcome</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">{study.outcome}</p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default CaseStudiesManagePage;
