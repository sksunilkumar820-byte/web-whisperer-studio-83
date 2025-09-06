import { Card, CardContent } from "@/components/ui/card";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Workwhirl transformed our entire operational framework. Their strategic insights helped us achieve 40% efficiency gains while reducing costs by $2M annually.",
      author: "Sarah Chen",
      title: "CEO, TechNova Industries",
      company: "Fortune 500 Technology Leader"
    },
    {
      quote: "The digital transformation roadmap they provided was exactly what we needed. Implementation was seamless and ROI exceeded expectations by 180%.",
      author: "Michael Rodriguez",
      title: "Chief Operating Officer",
      company: "Global Manufacturing Corp"
    },
    {
      quote: "Their executive search capabilities are unmatched. They found us the perfect C-suite talent that took our company to the next level of growth.",
      author: "Emily Johnson",
      title: "Board Chair",
      company: "Financial Services Group"
    },
    {
      quote: "Workwhirl's compliance expertise saved us from potential regulatory issues while streamlining our processes. Absolutely invaluable partnership.",
      author: "David Park",
      title: "Chief Risk Officer",
      company: "Healthcare Innovation Inc"
    }
  ];

  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 text-foreground text-elite">
            Client Success Stories
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-luxury">
            Hear from industry leaders who have transformed their organizations with our expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="card-elite p-8 hover:shadow-elegant transition-smooth animate-scale-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <CardContent className="p-0">
                <blockquote className="text-lg text-foreground mb-8 leading-relaxed text-luxury italic">
                  "{testimonial.quote}"
                </blockquote>
                <div className="border-t border-border pt-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground font-bold text-lg">
                        {testimonial.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-elite">
                        {testimonial.author}
                      </p>
                      <p className="text-sm text-primary font-medium">
                        {testimonial.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;