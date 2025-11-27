import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight } from "lucide-react";
import SocialShare from "@/components/SocialShare";

interface CaseStudy {
  id: string;
  service_id: string;
  title: string;
  client_name: string;
  client_company: string;
  client_industry: string;
  challenge: string;
  solution: string;
  outcome: string;
  metrics: Array<{ label: string; value: string }>;
  published_date: string;
}

const CaseStudiesPage = () => {
  const navigate = useNavigate();
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<string>("all");

  useEffect(() => {
    const fetchCaseStudies = async () => {
      setLoading(true);
      let query = supabase
        .from('case_studies')
        .select('*')
        .order('published_date', { ascending: false });

      if (selectedService !== "all") {
        query = query.eq('service_id', selectedService);
      }

      const { data, error } = await query;

      if (!error && data) {
        const parsedData = data.map(study => ({
          ...study,
          metrics: (Array.isArray(study.metrics) ? study.metrics : []) as Array<{ label: string; value: string }>
        }));
        setCaseStudies(parsedData);
      }
      setLoading(false);
    };

    fetchCaseStudies();
  }, [selectedService]);

  const serviceNames: Record<string, string> = {
    "all": "All Services",
    "executive-search": "Executive Search",
    "direct-hire": "Direct Hire",
    "contract-staffing": "Contract Staffing",
    "talent-advisory": "Talent Advisory",
    "rpo-services": "RPO Services",
    "global-mobility": "Global Mobility",
    "marketing-services": "Marketing Services",
    "hr-consulting": "HR Consulting",
    "payroll-management": "Payroll Management"
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-section py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Client Success Stories
            </h1>
            <p className="text-xl text-muted-foreground">
              Discover how we've helped organizations achieve remarkable results through our comprehensive staffing and HR solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {Object.entries(serviceNames).map(([key, label]) => (
              <Button
                key={key}
                variant={selectedService === key ? "default" : "outline"}
                onClick={() => setSelectedService(key)}
                className="btn-primary"
              >
                {label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Loading case studies...</p>
            </div>
          ) : caseStudies.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No case studies found for this service.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {caseStudies.map((study) => (
                <Card key={study.id} className="card-elite hover:shadow-glow transition-shadow">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <Badge variant="secondary" className="mb-2">
                        {serviceNames[study.service_id]}
                      </Badge>
                      {study.client_industry && (
                        <Badge variant="outline" className="ml-2">
                          {study.client_industry}
                        </Badge>
                      )}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-foreground mb-3">
                      {study.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-4">
                      {study.client_company}
                    </p>

                    <div className="space-y-4 mb-6">
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">The Challenge</h4>
                        <p className="text-muted-foreground text-sm line-clamp-3">
                          {study.challenge}
                        </p>
                      </div>
                    </div>

                    {/* Metrics Grid */}
                    {study.metrics && study.metrics.length > 0 && (
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {study.metrics.slice(0, 4).map((metric, idx) => (
                          <div key={idx} className="bg-muted/50 p-3 rounded-lg">
                            <div className="text-2xl font-bold text-primary mb-1">
                              {metric.value}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <Button
                      variant="ghost"
                      className="w-full justify-between group mb-4"
                      onClick={() => {
                        // Create a modal or detail view - for now navigate to service page
                        navigate(`/services/${study.service_id}`);
                      }}
                    >
                      View Full Case Study
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>

                    <SocialShare
                      title={study.title}
                      description={`${study.client_company}: ${study.challenge.substring(0, 100)}...`}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 gradient-section">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let's discuss how we can help you achieve similar results for your organization.
            </p>
            <Button 
              className="btn-primary px-8 py-3 font-semibold"
              onClick={() => navigate("/#contact")}
            >
              Contact Us Today
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudiesPage;
