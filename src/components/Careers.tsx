import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import JobApplication from "./JobApplication";

interface JobListing {
  id: string;
  title: string;
  department: string;
  location: string;
  job_type: string;
  description: string;
  requirements: string;
  responsibilities: string;
  salary_range: string | null;
  posted_date: string;
}

const Careers = () => {
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const { toast } = useToast();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from("job_listings")
        .select("*")
        .eq("status", "open")
        .order("posted_date", { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load job listings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const departments = ["all", ...Array.from(new Set(jobs.map((job) => job.department)))];

  const filteredJobs = selectedDepartment === "all" 
    ? jobs 
    : jobs.filter((job) => job.department === selectedDepartment);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatJobType = (type: string) => {
    return type.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  };

  if (selectedJob) {
    return <JobApplication job={selectedJob} onBack={() => setSelectedJob(null)} />;
  }

  return (
    <section id="careers" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-elite">
            Join Our Team
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-luxury">
            Build your career with industry leaders. Explore opportunities to make an impact and grow professionally.
          </p>
        </div>

        {/* Department Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {departments.map((dept) => (
            <Button
              key={dept}
              variant={selectedDepartment === dept ? "default" : "outline"}
              onClick={() => setSelectedDepartment(dept)}
              className={selectedDepartment === dept ? "btn-primary" : ""}
            >
              {dept === "all" ? "All Positions" : dept}
            </Button>
          ))}
        </div>

        {/* Job Listings */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading positions...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No open positions at the moment. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
            {filteredJobs.map((job) => (
              <article
                key={job.id}
                className="card-elite p-8 group cursor-pointer"
                onClick={() => setSelectedJob(job)}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-smooth text-elite">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        <span>{job.department}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>Posted {formatDate(job.posted_date)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-2">
                    <Badge variant="secondary" className="text-sm">
                      {formatJobType(job.job_type)}
                    </Badge>
                    {job.salary_range && (
                      <span className="text-sm font-semibold text-primary">
                        {job.salary_range}
                      </span>
                    )}
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4 line-clamp-2 text-luxury">
                  {job.description}
                </p>
                
                <Button 
                  variant="ghost" 
                  className="text-primary hover:text-primary-dark p-0 group-hover:translate-x-1 transition-smooth"
                >
                  View Details & Apply →
                </Button>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Careers;
