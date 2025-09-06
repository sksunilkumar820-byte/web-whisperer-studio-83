import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Industries = () => {
  const industries = [
    {
      title: "Financial Services",
      description: "Banking, insurance, wealth management, and fintech solutions with regulatory expertise.",
      icon: "🏦",
      services: ["Risk Management", "Digital Banking", "Compliance", "Wealth Tech"]
    },
    {
      title: "Technology",
      description: "Software, hardware, SaaS, and emerging technology companies scaling globally.",
      icon: "💻",
      services: ["Product Strategy", "Scaling Operations", "Tech Leadership", "Innovation"]
    },
    {
      title: "Healthcare",
      description: "Pharmaceutical, biotechnology, medical devices, and healthcare services optimization.",
      icon: "🏥",
      services: ["Clinical Operations", "Regulatory Affairs", "Digital Health", "R&D Strategy"]
    },
    {
      title: "Manufacturing",
      description: "Industrial automation, supply chain optimization, and Industry 4.0 transformation.",
      icon: "🏭",
      services: ["Lean Operations", "Supply Chain", "Automation", "Quality Systems"]
    },
    {
      title: "Energy & Utilities",
      description: "Renewable energy, oil & gas, utilities, and sustainable infrastructure development.",
      icon: "⚡",
      services: ["Sustainability", "Grid Modernization", "Energy Storage", "ESG Strategy"]
    },
    {
      title: "Retail & Consumer",
      description: "E-commerce, brand management, consumer goods, and omnichannel experiences.",
      icon: "🛍️",
      services: ["Digital Commerce", "Brand Strategy", "Customer Experience", "Supply Chain"]
    }
  ];

  return (
    <section className="py-32 gradient-subtle">
      <div className="container mx-auto px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 text-foreground text-elite">
            Industry Expertise
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-luxury">
            Deep sector knowledge combined with cross-industry best practices to deliver 
            tailored solutions that address your specific challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => (
            <Card 
              key={index}
              className="card-elite hover:shadow-elegant transition-smooth animate-scale-in group cursor-pointer h-full"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="text-center pb-4">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-smooth duration-500">
                  {industry.icon}
                </div>
                <CardTitle className="text-2xl font-bold text-foreground group-hover:text-primary transition-smooth text-elite">
                  {industry.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <p className="text-muted-foreground leading-relaxed text-center mb-6 text-luxury">
                  {industry.description}
                </p>
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-primary text-center mb-3">Specializations:</h4>
                  <div className="flex flex-wrap justify-center gap-2">
                    {industry.services.map((service, idx) => (
                      <span 
                        key={idx}
                        className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full border border-accent/20"
                      >
                        {service}
                      </span>
                    ))}
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

export default Industries;