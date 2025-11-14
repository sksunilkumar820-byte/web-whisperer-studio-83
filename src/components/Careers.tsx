import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Briefcase, Calendar, Search, Filter, X } from "lucide-react";
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
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [selectedJobType, setSelectedJobType] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);
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
  const locations = ["all", ...Array.from(new Set(jobs.map((job) => job.location)))];
  const jobTypes = ["all", "full-time", "part-time", "contract", "internship"];

  const filteredJobs = jobs.filter((job) => {
    // Department filter
    if (selectedDepartment !== "all" && job.department !== selectedDepartment) {
      return false;
    }

    // Location filter
    if (selectedLocation !== "all" && job.location !== selectedLocation) {
      return false;
    }

    // Job type filter
    if (selectedJobType !== "all" && job.job_type !== selectedJobType) {
      return false;
    }

    // Keyword search (searches in title, description, and department)
    if (searchKeyword.trim()) {
      const keyword = searchKeyword.toLowerCase();
      const matchesTitle = job.title.toLowerCase().includes(keyword);
      const matchesDescription = job.description.toLowerCase().includes(keyword);
      const matchesDepartment = job.department.toLowerCase().includes(keyword);
      const matchesRequirements = job.requirements.toLowerCase().includes(keyword);
      
      if (!matchesTitle && !matchesDescription && !matchesDepartment && !matchesRequirements) {
        return false;
      }
    }

    return true;
  });

  const clearAllFilters = () => {
    setSelectedDepartment("all");
    setSelectedLocation("all");
    setSelectedJobType("all");
    setSearchKeyword("");
  };

  const hasActiveFilters = 
    selectedDepartment !== "all" || 
    selectedLocation !== "all" || 
    selectedJobType !== "all" || 
    searchKeyword.trim() !== "";

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
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-elite">
            Join Our Team
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-luxury">
            Build your career with industry leaders. Explore opportunities to make an impact and grow professionally.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="max-w-4xl mx-auto mb-12 space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search by job title, keywords, or department..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="pl-12 pr-4 py-6 text-lg border-2 focus:border-primary"
            />
          </div>

          {/* Filter Toggle Button */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
              {hasActiveFilters && (
                <Badge variant="secondary" className="ml-1">
                  Active
                </Badge>
              )}
            </Button>
            
            {hasActiveFilters && (
              <Button
                variant="ghost"
                onClick={clearAllFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="card-elite p-6 space-y-4 animate-slide-up">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Department Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Department</label>
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept === "all" ? "All Departments" : dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Location Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Location</label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((loc) => (
                        <SelectItem key={loc} value={loc}>
                          {loc === "all" ? "All Locations" : loc}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Job Type Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Job Type</label>
                  <Select value={selectedJobType} onValueChange={setSelectedJobType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {jobTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type === "all" ? "All Types" : formatJobType(type)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2">
              {searchKeyword && (
                <Badge variant="secondary" className="px-3 py-1">
                  Keyword: {searchKeyword}
                  <X 
                    className="w-3 h-3 ml-2 cursor-pointer" 
                    onClick={() => setSearchKeyword("")}
                  />
                </Badge>
              )}
              {selectedDepartment !== "all" && (
                <Badge variant="secondary" className="px-3 py-1">
                  {selectedDepartment}
                  <X 
                    className="w-3 h-3 ml-2 cursor-pointer" 
                    onClick={() => setSelectedDepartment("all")}
                  />
                </Badge>
              )}
              {selectedLocation !== "all" && (
                <Badge variant="secondary" className="px-3 py-1">
                  {selectedLocation}
                  <X 
                    className="w-3 h-3 ml-2 cursor-pointer" 
                    onClick={() => setSelectedLocation("all")}
                  />
                </Badge>
              )}
              {selectedJobType !== "all" && (
                <Badge variant="secondary" className="px-3 py-1">
                  {formatJobType(selectedJobType)}
                  <X 
                    className="w-3 h-3 ml-2 cursor-pointer" 
                    onClick={() => setSelectedJobType("all")}
                  />
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="max-w-4xl mx-auto mb-6">
          <p className="text-muted-foreground">
            {isLoading ? "Loading..." : `${filteredJobs.length} ${filteredJobs.length === 1 ? "position" : "positions"} found`}
          </p>
        </div>

        {/* Job Listings */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading positions...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-12 card-elite p-12 max-w-2xl mx-auto">
            <p className="text-xl text-muted-foreground mb-4">No positions match your criteria</p>
            <p className="text-sm text-muted-foreground mb-6">Try adjusting your filters or search terms</p>
            {hasActiveFilters && (
              <Button onClick={clearAllFilters} variant="outline">
                Clear All Filters
              </Button>
            )}
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
