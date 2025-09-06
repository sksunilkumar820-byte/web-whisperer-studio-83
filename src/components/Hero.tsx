import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-consulting.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Elite consulting professionals in modern workspace" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-hero opacity-90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-8 text-center text-white">
        <div className="animate-fade-in">
          <h1 className="text-7xl md:text-9xl font-bold mb-12 leading-tight text-elite">
            Elite Business 
            <span className="block bg-gradient-to-r from-accent to-accent-dark bg-clip-text text-transparent">
              Transformation
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl mb-16 max-w-5xl mx-auto text-gray-200 leading-relaxed text-luxury">
            Unlock unprecedented success through strategic consulting, executive recruitment, 
            and comprehensive workforce solutions tailored for industry leaders.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <Button className="btn-primary text-2xl px-16 py-8 text-elite hover:scale-105 transition-smooth">
              Start Your Transformation
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white/40 text-white hover:bg-white/10 backdrop-blur-sm text-2xl px-16 py-8 transition-smooth hover:scale-105"
            >
              Explore Services
            </Button>
          </div>
        </div>
      </div>

      {/* Elegant Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-white/80 animate-bounce">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/60"></div>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;