import { Button } from "@/components/ui/button";
const About = () => {
  return <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
              Why Choose 
              <span className="block text-primary">Workwhirl</span>
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              Since our inception, Workwhirl has rapidly established itself 
              as a trusted partner for organizations seeking transformative staffing solutions. 
              Our commitment to excellence drives every client partnership.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Strategic Partnership Approach</h3>
                  <p className="text-muted-foreground">
                    We build lasting partnerships that drive sustained growth and business success.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Industry Expertise</h3>
                  <p className="text-muted-foreground">
                    Deep domain knowledge across multiple industries ensures precise talent matching.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Innovation-Driven Solutions</h3>
                  <p className="text-muted-foreground">
                    Cutting-edge methodologies and technology integration for superior outcomes.
                  </p>
                </div>
              </div>
            </div>

            <Button className="btn-primary px-8 py-3 font-semibold mt-8">
              Learn More About Us
            </Button>
          </div>

          <div className="animate-slide-up">
            <div className="relative">
              <div className="absolute inset-0 gradient-primary rounded-2xl transform rotate-2 shadow-soft"></div>
              <div className="relative bg-background rounded-2xl p-8 shadow-card">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-foreground mb-6">Our Impact</h3>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-3xl font-bold text-primary mb-1">50+</div>
                      <div className="text-sm text-muted-foreground">Companies Served</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary mb-1">94%</div>
                      <div className="text-sm text-muted-foreground">Success Rate</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary mb-1">2+</div>
                      <div className="text-sm text-muted-foreground">Years Experience</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary mb-1">15</div>
                      <div className="text-sm text-muted-foreground">Industries</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default About;