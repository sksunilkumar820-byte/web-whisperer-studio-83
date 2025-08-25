import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <section id="about" className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="animate-slide-up">
            <h2 className="text-5xl md:text-6xl font-bold mb-10 text-foreground">
              Why Choose 
              <span className="text-primary block">Workwhirl?</span>
            </h2>
            
            <div className="space-y-10 mb-12">
              <div className="flex items-start space-x-6">
                <div className="w-8 h-8 gradient-primary rounded-full flex-shrink-0 mt-2 shadow-glow"></div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Industry Expertise</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Deep understanding of various industries with proven track record of successful implementations and strategic partnerships.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6">
                <div className="w-8 h-8 gradient-primary rounded-full flex-shrink-0 mt-2 shadow-glow"></div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Tailored Solutions</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Customized strategies that align perfectly with your business goals, organizational culture, and growth objectives.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6">
                <div className="w-8 h-8 gradient-primary rounded-full flex-shrink-0 mt-2 shadow-glow"></div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Proven Results</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Consistent delivery of measurable outcomes that drive sustainable business growth and operational excellence.
                  </p>
                </div>
              </div>
            </div>

            <Button size="lg" className="shadow-elegant hover:shadow-hover text-xl px-10 py-6 transition-smooth">
              Learn About Our Process
            </Button>
          </div>

          <div className="relative animate-scale-in">
            <div className="gradient-card rounded-3xl p-12 shadow-elegant">
              <div className="grid grid-cols-2 gap-8 text-center">
                <div className="p-8 bg-white rounded-2xl shadow-card hover:shadow-hover transition-smooth">
                  <div className="text-4xl font-bold text-primary mb-3">500+</div>
                  <div className="text-muted-foreground text-lg">Successful Projects</div>
                </div>
                <div className="p-8 bg-white rounded-2xl shadow-card hover:shadow-hover transition-smooth">
                  <div className="text-4xl font-bold text-primary mb-3">250+</div>
                  <div className="text-muted-foreground text-lg">Happy Clients</div>
                </div>
                <div className="p-8 bg-white rounded-2xl shadow-card hover:shadow-hover transition-smooth">
                  <div className="text-4xl font-bold text-primary mb-3">10+</div>
                  <div className="text-muted-foreground text-lg">Years Experience</div>
                </div>
                <div className="p-8 bg-white rounded-2xl shadow-card hover:shadow-hover transition-smooth">
                  <div className="text-4xl font-bold text-primary mb-3">24/7</div>
                  <div className="text-muted-foreground text-lg">Support Available</div>
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