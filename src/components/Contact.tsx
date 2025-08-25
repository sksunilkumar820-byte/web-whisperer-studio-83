import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const Contact = () => {
  return <section id="contact" className="py-32 gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 animate-slide-up">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-foreground">
            Ready to Transform Your Business?
          </h2>
          <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
            Get in touch with our experts and discover how Workwhirl can help you achieve exceptional results and unlock your organization's full potential.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          {/* Contact Form */}
          <Card className="gradient-card shadow-elegant border-0 animate-scale-in">
            <CardHeader className="pb-8">
              <CardTitle className="text-3xl text-center font-bold">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 px-8 pb-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input placeholder="First Name" className="transition-smooth text-lg py-6 shadow-card" />
                <Input placeholder="Last Name" className="transition-smooth text-lg py-6 shadow-card" />
              </div>
              <Input placeholder="Email Address" type="email" className="transition-smooth text-lg py-6 shadow-card" />
              <Input placeholder="Company Name" className="transition-smooth text-lg py-6 shadow-card" />
              <Textarea placeholder="Tell us about your project or requirements..." className="min-h-40 transition-smooth text-lg shadow-card resize-none" />
              <Button className="w-full shadow-elegant hover:shadow-hover text-xl py-8 transition-smooth hover:scale-105" size="lg">
                Send Message
              </Button>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8 animate-fade-in">
            <Card className="gradient-card shadow-card border-0 hover:shadow-hover transition-smooth">
              <CardContent className="p-8">
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center shadow-glow">
                    <span className="text-white text-2xl">📧</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-2xl mb-2">Email Us</h3>
                    <p className="text-muted-foreground text-lg">Admin@workwhirl.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card shadow-card border-0 hover:shadow-hover transition-smooth">
              <CardContent className="p-8">
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center shadow-glow">
                    <span className="text-white text-2xl">📞</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-2xl mb-2">Call Us</h3>
                    <p className="text-muted-foreground text-lg">+918006996317

                  </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card shadow-card border-0 hover:shadow-hover transition-smooth">
              <CardContent className="p-8">
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center shadow-glow">
                    <span className="text-white text-2xl">📍</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-2xl mb-2">Visit Us</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      123 Business District<br />
                      Suite 456, New York, NY 10001
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="gradient-primary rounded-3xl p-10 text-white shadow-elegant">
              <h3 className="text-3xl font-semibold mb-4">Ready to Start?</h3>
              <p className="mb-8 opacity-95 text-xl leading-relaxed">
                Schedule a free consultation with our experts today and discover how we can transform your business.
              </p>
              <Button variant="secondary" className="bg-white text-primary hover:bg-gray-100 text-xl px-10 py-6 shadow-glow transition-smooth hover:scale-105">
                Book Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Contact;