import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <section id="about" className="py-40 bg-background">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="animate-slide-up">
            <h2 className="text-6xl md:text-8xl font-bold mb-12 text-foreground text-elite">
              Why Elite Leaders Choose 
              <span className="text-accent block mt-4">Workwhirl</span>
            </h2>
            
            <div className="space-y-12 mb-16">
              <div className="flex items-start space-x-8">
                <div className="w-12 h-12 gradient-gold rounded-2xl flex-shrink-0 mt-2 shadow-gold flex items-center justify-center">
                  <span className="text-accent-foreground font-bold text-xl">01</span>
                </div>
                <div>
                  <h3 className="text-3xl font-semibold mb-6 text-elite">Unparalleled Expertise</h3>
                  <p className="text-muted-foreground text-xl leading-relaxed text-luxury">
                    Two decades of excellence serving Fortune 500 companies with strategic insights 
                    that drive measurable transformation and sustainable competitive advantages.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-8">
                <div className="w-12 h-12 gradient-gold rounded-2xl flex-shrink-0 mt-2 shadow-gold flex items-center justify-center">
                  <span className="text-accent-foreground font-bold text-xl">02</span>
                </div>
                <div>
                  <h3 className="text-3xl font-semibold mb-6 text-elite">Bespoke Solutions</h3>
                  <p className="text-muted-foreground text-xl leading-relaxed text-luxury">
                    Meticulously crafted strategies that align perfectly with your vision, 
                    organizational DNA, and ambitious growth objectives for maximum impact.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-8">
                <div className="w-12 h-12 gradient-gold rounded-2xl flex-shrink-0 mt-2 shadow-gold flex items-center justify-center">
                  <span className="text-accent-foreground font-bold text-xl">03</span>
                </div>
                <div>
                  <h3 className="text-3xl font-semibold mb-6 text-elite">Exceptional Results</h3>
                  <p className="text-muted-foreground text-xl leading-relaxed text-luxury">
                    Proven track record of delivering extraordinary outcomes that exceed expectations 
                    and establish new benchmarks for operational excellence and market leadership.
                  </p>
                </div>
              </div>
            </div>

            <Button className="btn-gold text-2xl px-12 py-8 text-elite hover:scale-105 transition-smooth">
              Discover Our Methodology
            </Button>
          </div>

          <div className="relative animate-scale-in">
            <div className="card-elite rounded-3xl p-16 shadow-elegant bg-gradient-to-br from-white to-secondary">
              <div className="grid grid-cols-2 gap-10 text-center">
                <div className="p-10 bg-white rounded-3xl shadow-card hover:shadow-hover transition-smooth card-elite">
                  <div className="text-5xl font-bold text-accent mb-4 text-elite">1000+</div>
                  <div className="text-muted-foreground text-xl text-luxury">Elite Projects</div>
                </div>
                <div className="p-10 bg-white rounded-3xl shadow-card hover:shadow-hover transition-smooth card-elite">
                  <div className="text-5xl font-bold text-accent mb-4 text-elite">500+</div>
                  <div className="text-muted-foreground text-xl text-luxury">Global Clients</div>
                </div>
                <div className="p-10 bg-white rounded-3xl shadow-card hover:shadow-hover transition-smooth card-elite">
                  <div className="text-5xl font-bold text-accent mb-4 text-elite">20+</div>
                  <div className="text-muted-foreground text-xl text-luxury">Years Excellence</div>
                </div>
                <div className="p-10 bg-white rounded-3xl shadow-card hover:shadow-hover transition-smooth card-elite">
                  <div className="text-5xl font-bold text-accent mb-4 text-elite">24/7</div>
                  <div className="text-muted-foreground text-xl text-luxury">Elite Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;