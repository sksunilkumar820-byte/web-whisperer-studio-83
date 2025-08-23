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
    <section id="services" className="py-20 gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Our Expert Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Comprehensive consulting solutions designed to accelerate your business growth 
            and optimize your workforce potential.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-card transition-smooth cursor-pointer border-0 shadow-lg hover:-translate-y-2"
            >
              <CardHeader className="text-center pb-4">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-smooth">
                  {service.icon}
                </div>
                <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-smooth">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed text-center">
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