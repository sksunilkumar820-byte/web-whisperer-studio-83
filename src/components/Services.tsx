import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    title: "Management Consulting",
    description: "Strategic advisory services that drive organizational transformation, operational excellence, and sustainable growth for Fortune 500 companies.",
    icon: "🎯",
    gradient: "from-primary/20 to-primary-dark/20",
    features: ["Strategy Development", "Process Optimization", "Change Management"]
  },
  {
    title: "Digital Transformation",
    description: "End-to-end technology modernization including cloud migration, automation, AI integration, and digital process redesign.",
    icon: "💻",
    gradient: "from-accent/20 to-accent-dark/20",
    features: ["Cloud Solutions", "AI Implementation", "Process Automation"]
  },
  {
    title: "Financial Advisory",
    description: "Comprehensive financial planning, investment strategies, risk management, and corporate restructuring for optimal performance.",
    icon: "📊",
    gradient: "from-primary/20 to-accent/20",
    features: ["Investment Planning", "Risk Assessment", "Financial Modeling"]
  },
  {
    title: "Executive Search",
    description: "Premier talent acquisition for C-suite positions, board members, and senior leadership roles across all industries.",
    icon: "👑",
    gradient: "from-accent-dark/20 to-primary/20",
    features: ["Leadership Recruitment", "Board Placement", "Succession Planning"]
  },
  {
    title: "Business Intelligence",
    description: "Advanced analytics, data visualization, and strategic insights to drive informed decision-making and competitive advantage.",
    icon: "📈",
    gradient: "from-primary-dark/20 to-accent/20",
    features: ["Data Analytics", "Market Intelligence", "Performance Metrics"]
  },
  {
    title: "Regulatory Compliance",
    description: "Comprehensive compliance management, regulatory consulting, and audit preparation for highly regulated industries.",
    icon: "🛡️",
    gradient: "from-accent/20 to-primary-dark/20",
    features: ["Compliance Audits", "Risk Mitigation", "Regulatory Strategy"]
  },
  {
    title: "Operations Excellence",
    description: "Lean methodology implementation, supply chain optimization, and operational efficiency improvements for manufacturing and service industries.",
    icon: "⚙️",
    gradient: "from-primary/20 to-accent-dark/20",
    features: ["Lean Implementation", "Supply Chain", "Quality Management"]
  },
  {
    title: "Human Capital",
    description: "Workforce strategy, talent development, organizational design, and HR transformation to maximize human potential and performance.",
    icon: "👥",
    gradient: "from-accent-dark/20 to-primary-dark/20",
    features: ["Talent Strategy", "Organizational Design", "Performance Management"]
  },
  {
    title: "Cybersecurity",
    description: "Information security strategy, threat assessment, security architecture design, and cyber risk management for enterprise protection.",
    icon: "🔒",
    gradient: "from-primary-dark/20 to-accent-dark/20",
    features: ["Security Assessment", "Risk Management", "Incident Response"]
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className={`group card-elite bg-gradient-to-br ${service.gradient} border-0 hover:shadow-elegant cursor-pointer animate-scale-in overflow-hidden h-full`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="text-center pb-6 pt-8 relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                <div className="text-5xl mb-6 group-hover:scale-110 transition-smooth duration-700 filter drop-shadow-lg">
                  {service.icon}
                </div>
                <CardTitle className="text-2xl font-bold text-foreground group-hover:text-primary transition-smooth mb-4 text-elite">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-8">
                <CardDescription className="text-muted-foreground leading-relaxed text-center text-base text-luxury mb-6">
                  {service.description}
                </CardDescription>
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-primary text-center mb-3">Key Services:</h4>
                  <div className="flex flex-wrap justify-center gap-2">
                    {service.features.map((feature, idx) => (
                      <span 
                        key={idx}
                        className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20"
                      >
                        {feature}
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

export default Services;