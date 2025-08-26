import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Contact = () => {
  return (
    <section id="contact" className="py-40 gradient-subtle">
      <div className="container mx-auto px-8">
        <div className="text-center mb-24 animate-slide-up">
          <h2 className="text-6xl md:text-8xl font-bold mb-12 text-foreground text-elite">
            Begin Your Transformation
          </h2>
          <p className="text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed text-luxury">
            Connect with our elite consultants to explore how we can elevate 
            your organization to unprecedented levels of success.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Form */}
          <Card className="card-elite p-12 animate-scale-in">
            <CardHeader className="text-center pb-12">
              <CardTitle className="text-4xl font-bold text-foreground text-elite mb-6">
                Let's Connect
              </CardTitle>
              <p className="text-xl text-muted-foreground text-luxury">
                Share your vision and challenges with us
              </p>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-lg font-semibold text-foreground mb-3 block text-elite">First Name</label>
                  <Input className="h-14 text-lg border-2 focus:border-accent transition-smooth" placeholder="John" />
                </div>
                <div>
                  <label className="text-lg font-semibold text-foreground mb-3 block text-elite">Last Name</label>
                  <Input className="h-14 text-lg border-2 focus:border-accent transition-smooth" placeholder="Smith" />
                </div>
              </div>
              <div>
                <label className="text-lg font-semibold text-foreground mb-3 block text-elite">Email Address</label>
                <Input className="h-14 text-lg border-2 focus:border-accent transition-smooth" placeholder="john@company.com" />
              </div>
              <div>
                <label className="text-lg font-semibold text-foreground mb-3 block text-elite">Company</label>
                <Input className="h-14 text-lg border-2 focus:border-accent transition-smooth" placeholder="Your Company" />
              </div>
              <div>
                <label className="text-lg font-semibold text-foreground mb-3 block text-elite">Project Details</label>
                <Textarea 
                  className="min-h-[120px] text-lg border-2 focus:border-accent transition-smooth resize-none" 
                  placeholder="Tell us about your transformation goals and challenges..."
                />
              </div>
              <Button className="btn-gold w-full text-2xl py-6 text-elite hover:scale-105 transition-smooth">
                Start the Conversation
              </Button>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-12 animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <Card className="card-elite p-12">
              <CardHeader className="pb-8">
                <CardTitle className="text-3xl font-bold text-foreground text-elite flex items-center">
                  <span className="w-12 h-12 gradient-gold rounded-2xl flex items-center justify-center mr-6 shadow-gold">
                    📧
                  </span>
                  Email Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl text-muted-foreground text-luxury">
                  admin@workwhirl.com
                </p>
                <p className="text-lg text-muted-foreground mt-2 text-luxury">
                  Response within 2 hours during business days
                </p>
              </CardContent>
            </Card>

            <Card className="card-elite p-12">
              <CardHeader className="pb-8">
                <CardTitle className="text-3xl font-bold text-foreground text-elite flex items-center">
                  <span className="w-12 h-12 gradient-gold rounded-2xl flex items-center justify-center mr-6 shadow-gold">
                    📞
                  </span>
                  Call Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl text-muted-foreground text-luxury">
                  +91 8006996317
                </p>
                <p className="text-lg text-muted-foreground mt-2 text-luxury">
                  Available Monday - Friday, 9 AM - 6 PM EST
                </p>
              </CardContent>
            </Card>

            <Card className="card-elite p-12">
              <CardHeader className="pb-8">
                <CardTitle className="text-3xl font-bold text-foreground text-elite flex items-center">
                  <span className="w-12 h-12 gradient-gold rounded-2xl flex items-center justify-center mr-6 shadow-gold">
                    🏢
                  </span>
                  Visit Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl text-muted-foreground text-luxury">
                  123 Elite Business Plaza<br />
                  Suite 4500, Manhattan<br />
                  New York, NY 10001
                </p>
                <p className="text-lg text-muted-foreground mt-4 text-luxury">
                  By appointment only
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;