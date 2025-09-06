import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-consulting.jpg";
const Hero = () => {
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src={heroImage} alt="Professional staffing consultants in modern workspace" className="w-full h-full object-cover" />
        <div className="absolute inset-0 gradient-hero opacity-95"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        <div className="animate-fade-in max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Transform Your 
            <span className="block bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
              Workforce Strategy
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-white/90 leading-relaxed font-light">
            Partner with industry leaders in strategic staffing, executive search, 
            and comprehensive talent solutions that drive sustainable business growth.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <Button className="btn-primary text-lg px-8 py-4 font-semibold hover:scale-105 transition-smooth">
              Discover Our Solutions
            </Button>
            <Button variant="outline" className="border-2 border-white/50 hover:bg-white/20 backdrop-blur-sm text-lg px-8 py-4 transition-smooth hover:scale-105 text-slate-950">
              Schedule Consultation
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-white/70 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span>50+ Companies Served</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span>95% Client Satisfaction</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span>Industry Leaders Trust Us</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-white/40"></div>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>;
};
export default Hero;