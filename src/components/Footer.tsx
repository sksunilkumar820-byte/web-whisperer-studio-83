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
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-smooth cursor-pointer" aria-label="LinkedIn">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-smooth cursor-pointer" aria-label="Twitter">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-smooth cursor-pointer" aria-label="Facebook">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
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
                <p className="text-lg text-luxury">contact@workwhirl.com</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="w-8 h-8 gradient-gold rounded-xl flex items-center justify-center text-sm shadow-gold">📞</span>
                <p className="text-lg text-luxury">+91 8006996317</p>
              </div>
              <div className="flex items-start space-x-4">
                <span className="w-8 h-8 gradient-gold rounded-xl flex items-center justify-center text-sm shadow-gold mt-1">🏢</span>
                <p className="text-lg text-luxury">
                  House No. 95B Second Floor<br />
                  Sector 18A Dwarka<br />
                  New Delhi 110078
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