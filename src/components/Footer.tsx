const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-lg">W</span>
              </div>
              <span className="text-2xl font-bold">Workwhirl</span>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              Transforming businesses through expert consulting and strategic workforce solutions.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-white transition-smooth">Strategic Staffing</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">HR Outsourcing</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">Executive Search</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">Business Consulting</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#about" className="hover:text-white transition-smooth">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">Case Studies</a></li>
              <li><a href="#contact" className="hover:text-white transition-smooth">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Get in Touch</h3>
            <div className="space-y-2 text-primary-foreground/80">
              <p>hello@workwhirl.com</p>
              <p>+1 (555) 123-4567</p>
              <p>123 Business District<br />Suite 456, New York, NY</p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-foreground/60">
            © 2024 Workwhirl. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-primary-foreground/60 hover:text-white transition-smooth">Privacy Policy</a>
            <a href="#" className="text-primary-foreground/60 hover:text-white transition-smooth">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;