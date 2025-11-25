import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bell, Mail } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const JobAlerts = () => {
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [jobType, setJobType] = useState<string>("");
  const [keywords, setKeywords] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.from("job_alerts").insert([
        {
          email,
          department: department || null,
          location: location || null,
          job_type: jobType || null,
          keywords: keywords || null,
        },
      ]);

      if (error) {
        throw error;
      }

      toast({
        title: "Job alert created!",
        description: "You'll be notified when matching jobs are posted.",
      });

      // Reset form
      setEmail("");
      setDepartment("");
      setLocation("");
      setJobType("");
      setKeywords("");
    } catch (error) {
      console.error("Error creating job alert:", error);
      toast({
        title: "Error",
        description: "Failed to create job alert. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Bell className="h-5 w-5 text-primary" />
          <CardTitle className="text-2xl">Job Alerts</CardTitle>
        </div>
        <CardDescription>
          Get notified when new jobs matching your criteria are posted
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="alert-email">
              Email Address <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="alert-email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="alert-department">Department (Optional)</Label>
              <Select value={department} onValueChange={setDepartment} disabled={isLoading}>
                <SelectTrigger id="alert-department">
                  <SelectValue placeholder="Any department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="Human Resources">Human Resources</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="alert-location">Location (Optional)</Label>
              <Select value={location} onValueChange={setLocation} disabled={isLoading}>
                <SelectTrigger id="alert-location">
                  <SelectValue placeholder="Any location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                  <SelectItem value="New York, NY">New York, NY</SelectItem>
                  <SelectItem value="San Francisco, CA">San Francisco, CA</SelectItem>
                  <SelectItem value="London, UK">London, UK</SelectItem>
                  <SelectItem value="Tokyo, Japan">Tokyo, Japan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="alert-job-type">Job Type (Optional)</Label>
            <Select value={jobType} onValueChange={setJobType} disabled={isLoading}>
              <SelectTrigger id="alert-job-type">
                <SelectValue placeholder="Any type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="alert-keywords">Keywords (Optional)</Label>
            <Input
              id="alert-keywords"
              type="text"
              placeholder="e.g., React, Senior, Management"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              disabled={isLoading}
            />
            <p className="text-sm text-muted-foreground">
              Separate multiple keywords with commas
            </p>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Creating Alert..." : "Create Job Alert"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default JobAlerts;