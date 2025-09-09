import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin } from "lucide-react";
const Contact = () => {
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
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
                  <input type="text" className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:border-primary focus:outline-none transition-smooth" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
                  <input type="text" className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:border-primary focus:outline-none transition-smooth" placeholder="Doe" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input type="email" className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:border-primary focus:outline-none transition-smooth" placeholder="john.doe@company.com" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Company</label>
                <input type="text" className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:border-primary focus:outline-none transition-smooth" placeholder="Your Company" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                <textarea rows={5} className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:border-primary focus:outline-none transition-smooth resize-none" placeholder="Tell us about your staffing needs..." />
              </div>
              
              <Button className="btn-primary px-8 py-3 w-full font-semibold">
                Send Message
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
              <p className="text-lg font-semibold text-primary">+918006996317
+91798224448</p>
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
              <p className="text-lg font-semibold text-primary">Admin@workwhirl.com</p>
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