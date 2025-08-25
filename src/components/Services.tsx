import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    title: "Strategic Staffing",
    description: "Find the right talent with our comprehensive staffing solutions designed to meet your specific business needs.",
    icon: "👥"
  },
  {
    title: "HR Outsourcing",
    description: "Complete HR management services to streamline your operations and focus on core business activities.",
    icon: "🎯"
  },
  {
    title: "Executive Search",
    description: "Connect with top-tier executives and leadership talent to drive your organization forward.",
    icon: "🔍"
  },
  {
    title: "Workforce Solutions",
    description: "Scalable workforce management from contractual hiring to remote team building and payroll management.",
    icon: "⚡"
  },
  {
    title: "Business Consulting",
    description: "Strategic guidance and consulting services to optimize your business processes and achieve growth.",
    icon: "📈"
  },
  {
    title: "Compliance Management",
    description: "Ensure your organization meets all regulatory requirements with our comprehensive compliance solutions.",
    icon: "✅"
  }
];

const Services = () => {
  return (
    <section id="services" className="py-32 gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 animate-slide-up">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-foreground">
            Our Expert Services
          </h2>
          <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
            Comprehensive consulting solutions designed to accelerate your business growth 
            and optimize your workforce potential with cutting-edge strategies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group gradient-card border-0 shadow-card hover:shadow-hover transition-smooth cursor-pointer hover:-translate-y-4 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="text-center pb-6 pt-10">
                <div className="text-6xl mb-6 group-hover:scale-125 transition-smooth duration-500">
                  {service.icon}
                </div>
                <CardTitle className="text-2xl font-bold text-foreground group-hover:text-primary transition-smooth mb-4">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-10">
                <CardDescription className="text-muted-foreground leading-relaxed text-center text-lg">
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