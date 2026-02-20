import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { checkRateLimit } from "@/lib/rateLimit";

const dropCVSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().min(10, "Phone must be at least 10 digits").max(20),
  message: z.string().trim().min(10, "Please tell us a bit about yourself (min 10 chars)").max(2000),
});

const DropCV = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validated = dropCVSchema.parse(formData);

      const rateLimitResult = await checkRateLimit("drop_cv", validated.email);
      if (!rateLimitResult.allowed) {
        toast({
          title: "Too many submissions",
          description: rateLimitResult.message,
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      const { error } = await supabase.from("contact_inquiries").insert([
        {
          name: validated.name,
          email: validated.email,
          phone: validated.phone,
          message: `[CV Drop] ${validated.message}`,
        },
      ]);

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "CV Submitted Successfully!",
        description: "We'll review your profile and reach out if there's a match.",
      });
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
          description: "Failed to submit. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="drop-cv" className="py-20 bg-muted/30">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <CheckCircle className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-foreground mb-4 text-elite">Thank You!</h2>
          <p className="text-lg text-muted-foreground text-luxury">
            Your profile has been submitted. Our team will review it and contact you when a suitable opportunity arises.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="drop-cv" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6 max-w-2xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Upload className="w-4 h-4" />
            <span className="text-sm font-semibold uppercase tracking-wider">Drop Your CV</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-elite">
            Not Finding the Right Role?
          </h2>
          <p className="text-lg text-muted-foreground text-luxury">
            Submit your details and we'll match you with the perfect opportunity when it comes up.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card-elite p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="cv-name">Full Name *</Label>
              <Input id="cv-name" name="name" value={formData.name} onChange={handleChange} required disabled={isSubmitting} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cv-email">Email *</Label>
              <Input id="cv-email" name="email" type="email" value={formData.email} onChange={handleChange} required disabled={isSubmitting} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cv-phone">Phone *</Label>
            <Input id="cv-phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required disabled={isSubmitting} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cv-message">Tell us about yourself & your experience *</Label>
            <Textarea
              id="cv-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your skills, experience, and the kind of role you're looking for..."
              className="min-h-[150px]"
              required
              disabled={isSubmitting}
            />
          </div>
          <Button type="submit" disabled={isSubmitting} className="btn-primary w-full py-6 text-lg">
            {isSubmitting ? "Submitting..." : "Submit Your Profile"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default DropCV;
