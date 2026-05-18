import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Upload, FileText, X } from "lucide-react";
import { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { checkRateLimit } from "@/lib/rateLimit";

const MAX_CV_SIZE = 5 * 1024 * 1024;
const CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().max(20, "Phone must be less than 20 characters").optional(),
  company: z.string().trim().max(100, "Company must be less than 100 characters").optional(),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
});
const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const cvInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
      // Combine first and last name
      const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim();
      
      // Validate the data
      const validatedData = contactSchema.parse({
        name: fullName,
        email: formData.email,
        phone: formData.phone || undefined,
        company: formData.company || undefined,
        message: formData.message,
      });

      // Check rate limit
      const rateLimitResult = await checkRateLimit("contact", validatedData.email);
      if (!rateLimitResult.allowed) {
        toast({
          title: "Too many submissions",
          description: rateLimitResult.message,
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      let resumePath = "";
      if (cvFile) {
        const ext = cvFile.name.split(".").pop();
        const path = `${crypto.randomUUID()}.${ext}`;
        const { error: uploadError } = await supabase.storage.from("cv-uploads").upload(path, cvFile);
        if (uploadError) throw uploadError;
        resumePath = path;
      }

      const finalMessage = resumePath
        ? `${validatedData.message}\n\n[Attached CV: ${resumePath}]`
        : validatedData.message;

      // Insert into database
      const { error } = await supabase
        .from("contact_inquiries")
        .insert([{
          name: validatedData.name,
          email: validatedData.email,
          phone: validatedData.phone || null,
          company: validatedData.company || null,
          message: finalMessage,
        }]);

      if (error) throw error;

      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you as soon as possible.",
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      });
      setCvFile(null);
      if (cvInputRef.current) cvInputRef.current.value = "";
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error sending message",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return <section id="contact" className="py-20 gradient-section">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Connect with our team of staffing experts and discover how we can help 
            transform your workforce strategy and drive business growth.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="card-elite p-8 animate-slide-up">
            <h3 className="text-2xl font-bold text-foreground mb-8">Get In Touch</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
                  <input 
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:border-primary focus:outline-none transition-smooth" 
                    placeholder="John" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
                  <input 
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:border-primary focus:outline-none transition-smooth" 
                    placeholder="Doe" 
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:border-primary focus:outline-none transition-smooth" 
                  placeholder="john.doe@company.com" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Phone (Optional)</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:border-primary focus:outline-none transition-smooth" 
                  placeholder="+1 (555) 000-0000" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Company (Optional)</label>
                <input 
                  type="text" 
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:border-primary focus:outline-none transition-smooth" 
                  placeholder="Your Company" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                <textarea 
                  rows={5} 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:border-primary focus:outline-none transition-smooth resize-none" 
                  placeholder="Tell us about your staffing needs..." 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Attach CV / Resume (Optional, PDF or Word, max 5 MB)</label>
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
                    className="w-full flex flex-col items-center gap-2 p-5 rounded-lg border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer"
                  >
                    <Upload className="w-6 h-6 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Click to upload your CV</span>
                  </button>
                )}
              </div>
              
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="btn-primary px-8 py-3 w-full font-semibold"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6 animate-fade-in">
            <div className="card-elite p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center shadow-soft">
                  <Phone className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Call Us</h3>
                  <p className="text-sm text-muted-foreground">Ready to discuss your needs</p>
                </div>
              </div>
              <p className="text-lg font-semibold text-primary">
                <a href="tel:+918006996317" className="hover:underline">+91 8006996317</a><br />
                <a href="tel:+917982234448" className="hover:underline">+91 7982234448</a>
              </p>
            </div>

            <div className="card-elite p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center shadow-soft">
                  <Mail className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Email Us</h3>
                  <p className="text-sm text-muted-foreground">Get a detailed response</p>
                </div>
              </div>
              <p className="text-lg font-semibold text-primary">contact@workwhirl.com</p>
            </div>

            <div className="card-elite p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center shadow-soft">
                  <MapPin className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Visit Us</h3>
                  <p className="text-sm text-muted-foreground">Our headquarters</p>
                </div>
              </div>
              <p className="text-lg font-semibold text-primary">
                House No. 95B Second Floor<br />
                Sector 18A Dwarka<br />
                New Delhi 110078
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Contact;