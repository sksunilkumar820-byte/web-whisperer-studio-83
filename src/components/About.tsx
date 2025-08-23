import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Why Choose 
              <span className="text-primary block">Workwhirl?</span>
            </h2>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 gradient-primary rounded-full flex-shrink-0 mt-1"></div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Industry Expertise</h3>
                  <p className="text-muted-foreground">
                    Deep understanding of various industries with proven track record of successful implementations.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 gradient-primary rounded-full flex-shrink-0 mt-1"></div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Tailored Solutions</h3>
                  <p className="text-muted-foreground">
                    Customized strategies that align perfectly with your business goals and organizational culture.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 gradient-primary rounded-full flex-shrink-0 mt-1"></div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Proven Results</h3>
                  <p className="text-muted-foreground">
                    Consistent delivery of measurable outcomes that drive business growth and success.
                  </p>
                </div>
              </div>
            </div>

            <Button size="lg" className="shadow-elegant">
              Learn About Our Process
            </Button>
          </div>

          <div className="relative">
            <div className="gradient-subtle rounded-2xl p-8 shadow-card">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div className="p-6 bg-white rounded-xl shadow-sm">
                  <div className="text-3xl font-bold text-primary mb-2">500+</div>
                  <div className="text-muted-foreground">Successful Projects</div>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-sm">
                  <div className="text-3xl font-bold text-primary mb-2">250+</div>
                  <div className="text-muted-foreground">Happy Clients</div>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-sm">
                  <div className="text-3xl font-bold text-primary mb-2">10+</div>
                  <div className="text-muted-foreground">Years Experience</div>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-sm">
                  <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-muted-foreground">Support Available</div>
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