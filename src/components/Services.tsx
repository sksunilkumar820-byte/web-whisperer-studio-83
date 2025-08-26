import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    title: "Executive Search",
    description: "Connect with C-suite executives and senior leadership talent who drive transformational growth and strategic excellence.",
    icon: "👑",
    gradient: "from-accent/20 to-accent-dark/20"
  },
  {
    title: "Strategic Consulting",
    description: "Comprehensive business transformation strategies that optimize operations and accelerate sustainable growth.",
    icon: "🎯",
    gradient: "from-primary/20 to-primary-dark/20"
  },
  {
    title: "Workforce Excellence",
    description: "End-to-end talent acquisition and management solutions designed for high-performing organizations.",
    icon: "⚡",
    gradient: "from-accent/20 to-accent-light/20"
  },
  {
    title: "HR Transformation",
    description: "Complete human resources outsourcing and optimization to streamline operations and enhance productivity.",
    icon: "🏆",
    gradient: "from-primary/20 to-accent/20"
  },
  {
    title: "Digital Innovation",
    description: "Technology-driven solutions that modernize business processes and create competitive advantages.",
    icon: "💎",
    gradient: "from-accent-dark/20 to-primary/20"
  },
  {
    title: "Compliance Mastery",
    description: "Comprehensive regulatory compliance management ensuring seamless adherence to industry standards.",
    icon: "🛡️",
    gradient: "from-primary-dark/20 to-accent/20"
  }
];

const Services = () => {
  return (
    <section id="services" className="py-40 gradient-subtle">
      <div className="container mx-auto px-8">
        <div className="text-center mb-24 animate-slide-up">
          <h2 className="text-6xl md:text-8xl font-bold mb-12 text-foreground text-elite">
            Premium Services
          </h2>
          <p className="text-3xl text-muted-foreground max-w-5xl mx-auto leading-relaxed text-luxury">
            Bespoke consulting solutions crafted for visionary leaders who demand 
            excellence and transformational results in today's competitive landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className={`group card-elite bg-gradient-to-br ${service.gradient} border-0 hover:shadow-elegant cursor-pointer animate-scale-in overflow-hidden`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <CardHeader className="text-center pb-8 pt-12 relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-accent-dark transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                <div className="text-7xl mb-8 group-hover:scale-110 transition-smooth duration-700 filter drop-shadow-lg">
                  {service.icon}
                </div>
                <CardTitle className="text-3xl font-bold text-foreground group-hover:text-primary transition-smooth mb-6 text-elite">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-10 pb-12">
                <CardDescription className="text-muted-foreground leading-relaxed text-center text-xl text-luxury">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;