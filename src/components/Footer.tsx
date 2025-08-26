const Footer = () => {
  return (
    <footer className="gradient-primary text-primary-foreground py-20">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-gold">
                <span className="text-primary font-bold text-2xl text-elite">W</span>
              </div>
              <span className="text-3xl font-bold text-elite">Workwhirl</span>
            </div>
            <p className="text-primary-foreground/90 leading-relaxed text-xl text-luxury">
              Elevating businesses through strategic excellence and transformational consulting solutions.
            </p>
            <div className="flex space-x-6">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-smooth cursor-pointer">
                <span className="text-xl">📧</span>
              </div>
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-smooth cursor-pointer">
                <span className="text-xl">📱</span>
              </div>
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-smooth cursor-pointer">
                <span className="text-xl">💼</span>
              </div>
            </div>
          </div>

          {/* Elite Services */}
          <div>
            <h3 className="font-bold text-2xl mb-8 text-elite">Elite Services</h3>
            <ul className="space-y-4 text-primary-foreground/80">
              <li><a href="#" className="hover:text-accent transition-smooth text-lg text-luxury">Executive Search</a></li>
              <li><a href="#" className="hover:text-accent transition-smooth text-lg text-luxury">Strategic Consulting</a></li>
              <li><a href="#" className="hover:text-accent transition-smooth text-lg text-luxury">Workforce Excellence</a></li>
              <li><a href="#" className="hover:text-accent transition-smooth text-lg text-luxury">HR Transformation</a></li>
              <li><a href="#" className="hover:text-accent transition-smooth text-lg text-luxury">Digital Innovation</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-2xl mb-8 text-elite">Company</h3>
            <ul className="space-y-4 text-primary-foreground/80">
              <li><a href="#about" className="hover:text-accent transition-smooth text-lg text-luxury">About Excellence</a></li>
              <li><a href="#" className="hover:text-accent transition-smooth text-lg text-luxury">Leadership Team</a></li>
              <li><a href="#" className="hover:text-accent transition-smooth text-lg text-luxury">Success Stories</a></li>
              <li><a href="#" className="hover:text-accent transition-smooth text-lg text-luxury">Elite Careers</a></li>
              <li><a href="#contact" className="hover:text-accent transition-smooth text-lg text-luxury">Connect</a></li>
            </ul>
          </div>

          {/* Elite Contact */}
          <div>
            <h3 className="font-bold text-2xl mb-8 text-elite">Elite Contact</h3>
            <div className="space-y-6 text-primary-foreground/80">
              <div className="flex items-center space-x-4">
                <span className="w-8 h-8 gradient-gold rounded-xl flex items-center justify-center text-sm shadow-gold">📧</span>
                <p className="text-lg text-luxury">admin@workwhirl.com</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="w-8 h-8 gradient-gold rounded-xl flex items-center justify-center text-sm shadow-gold">📞</span>
                <p className="text-lg text-luxury">+91 8006996317</p>
              </div>
              <div className="flex items-start space-x-4">
                <span className="w-8 h-8 gradient-gold rounded-xl flex items-center justify-center text-sm shadow-gold mt-1">🏢</span>
                <p className="text-lg text-luxury">
                  123 Elite Business Plaza<br />
                  Suite 4500, Manhattan<br />
                  New York, NY 10001
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-16 pt-12 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-foreground/70 text-lg text-luxury">
            © 2024 Workwhirl Elite Consulting. All rights reserved.
          </p>
          <div className="flex space-x-10 mt-6 md:mt-0">
            <a href="#" className="text-primary-foreground/70 hover:text-accent transition-smooth text-lg text-luxury">Privacy Excellence</a>
            <a href="#" className="text-primary-foreground/70 hover:text-accent transition-smooth text-lg text-luxury">Terms of Service</a>
            <a href="#" className="text-primary-foreground/70 hover:text-accent transition-smooth text-lg text-luxury">Elite Standards</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;