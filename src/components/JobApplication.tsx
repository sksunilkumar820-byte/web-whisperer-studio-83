import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Briefcase, DollarSign, Upload, FileText, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { checkRateLimit } from "@/lib/rateLimit";

const MAX_CV_SIZE = 5 * 1024 * 1024;
const CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

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
}

interface JobApplicationProps {
  job: JobListing;
  onBack: () => void;
}

const applicationSchema = z.object({
  full_name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().min(10, "Phone must be at least 10 digits").max(20),
  location: z.string().trim().max(200).optional(),
  linkedin_url: z.string().trim().url("Invalid URL").max(500).optional().or(z.literal("")),
  portfolio_url: z.string().trim().url("Invalid URL").max(500).optional().or(z.literal("")),
  cover_letter: z.string().trim().min(50, "Cover letter must be at least 50 characters").max(2000),
  years_of_experience: z.number().int().min(0).max(50).optional(),
});

const JobApplication = ({ job, onBack }: JobApplicationProps) => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    location: "",
    linkedin_url: "",
    portfolio_url: "",
    cover_letter: "",
    years_of_experience: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const cvInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    if (!CV_TYPES.includes(selected.type)) {
      toast({ title: "Invalid file type", description: "Please upload a PDF or Word document.", variant: "destructive" });
      return;
    }
    if (selected.size > MAX_CV_SIZE) {
      toast({ title: "File too large", description: "Maximum file size is 5 MB.", variant: "destructive" });
      return;
    }
    setCvFile(selected);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare data for validation
      const dataToValidate = {
        ...formData,
        location: formData.location || undefined,
        linkedin_url: formData.linkedin_url || undefined,
        portfolio_url: formData.portfolio_url || undefined,
        years_of_experience: formData.years_of_experience 
          ? parseInt(formData.years_of_experience) 
          : undefined,
      };

      const validatedData = applicationSchema.parse(dataToValidate);

      // Check rate limit
      const rateLimitResult = await checkRateLimit("job_application", validatedData.email);
      if (!rateLimitResult.allowed) {
        toast({
          title: "Too many submissions",
          description: rateLimitResult.message,
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }


      let resumePath: string | null = null;
      if (cvFile) {
        const ext = cvFile.name.split(".").pop();
        const path = `${crypto.randomUUID()}.${ext}`;
        const { error: uploadError } = await supabase.storage.from("cv-uploads").upload(path, cvFile);
        if (uploadError) throw uploadError;
        resumePath = path;
      }

      const { error } = await supabase.from("job_applications").insert([
        {
          job_id: job.id,
          full_name: validatedData.full_name,
          email: validatedData.email,
          phone: validatedData.phone,
          location: validatedData.location || null,
          linkedin_url: validatedData.linkedin_url || null,
          portfolio_url: validatedData.portfolio_url || null,
          cover_letter: validatedData.cover_letter,
          years_of_experience: validatedData.years_of_experience || null,
          resume_url: resumePath,
        },
      ]);

      if (error) throw error;

      toast({
        title: "Application Submitted!",
        description: "Thank you for applying. We'll review your application and get back to you soon.",
      });

      // Reset form and go back
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        location: "",
        linkedin_url: "",
        portfolio_url: "",
        cover_letter: "",
        years_of_experience: "",
      });
      setCvFile(null);
      if (cvInputRef.current) cvInputRef.current.value = "";
      setTimeout(onBack, 2000);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to submit application. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatJobType = (type: string) => {
    return type.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6 max-w-4xl">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-8 hover:translate-x-[-4px] transition-smooth"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Careers
        </Button>

        {/* Job Details */}
        <div className="card-elite p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 text-elite">
                {job.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  <span>{job.department}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{job.location}</span>
                </div>
                {job.salary_range && (
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    <span>{job.salary_range}</span>
                  </div>
                )}
              </div>
            </div>
            <Badge variant="secondary" className="text-sm">
              {formatJobType(job.job_type)}
            </Badge>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-3 text-elite">About the Role</h2>
              <p className="text-muted-foreground text-luxury whitespace-pre-line">{job.description}</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground mb-3 text-elite">Key Responsibilities</h2>
              <p className="text-muted-foreground text-luxury whitespace-pre-line">{job.responsibilities}</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground mb-3 text-elite">Requirements</h2>
              <p className="text-muted-foreground text-luxury whitespace-pre-line">{job.requirements}</p>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div className="card-elite p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-elite">Apply for this Position</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name *</Label>
                <Input
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Current Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="years_of_experience">Years of Experience</Label>
                <Input
                  id="years_of_experience"
                  name="years_of_experience"
                  type="number"
                  min="0"
                  value={formData.years_of_experience}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin_url">LinkedIn Profile</Label>
                <Input
                  id="linkedin_url"
                  name="linkedin_url"
                  type="url"
                  placeholder="https://linkedin.com/in/yourprofile"
                  value={formData.linkedin_url}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="portfolio_url">Portfolio/Website</Label>
              <Input
                id="portfolio_url"
                name="portfolio_url"
                type="url"
                placeholder="https://yourportfolio.com"
                value={formData.portfolio_url}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label>Upload CV / Resume (PDF or Word, max 5 MB)</Label>
              <input
                ref={cvInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleCvChange}
                className="hidden"
                disabled={isSubmitting}
              />
              {cvFile ? (
                <div className="flex items-center gap-3 p-3 rounded-lg border border-primary/30 bg-primary/5">
                  <FileText className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm text-foreground truncate flex-1">{cvFile.name}</span>
                  <button
                    type="button"
                    onClick={() => { setCvFile(null); if (cvInputRef.current) cvInputRef.current.value = ""; }}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                    aria-label="Remove file"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => cvInputRef.current?.click()}
                  disabled={isSubmitting}
                  className="w-full flex flex-col items-center gap-2 p-6 rounded-lg border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer"
                >
                  <Upload className="w-8 h-8 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Click to upload your CV</span>
                </button>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cover_letter">Cover Letter *</Label>
              <Textarea
                id="cover_letter"
                name="cover_letter"
                value={formData.cover_letter}
                onChange={handleChange}
                placeholder="Tell us why you're a great fit for this role..."
                className="min-h-[200px]"
                required
                disabled={isSubmitting}
              />
              <p className="text-xs text-muted-foreground">Minimum 50 characters</p>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full md:w-auto px-12 py-6 text-lg"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default JobApplication;
