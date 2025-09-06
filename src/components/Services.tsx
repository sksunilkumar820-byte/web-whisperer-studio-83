import { Users, Search, TrendingUp, Target, Shield, Building, Globe, Award, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "Executive Search",
    description: "Strategic recruitment for C-suite executives and senior leadership positions across all industries.",
    icon: Target,
    features: ["C-Suite Recruitment", "Board Placement", "Succession Planning"]
  },
  {
    title: "Direct Hire",
    description: "Permanent staffing solutions for professional and technical positions with guaranteed quality placement.",
    icon: Users,
    features: ["Professional Placement", "Technical Roles", "Quality Guarantee"]
  },
  {
    title: "Contract Staffing",
    description: "Flexible workforce solutions including contract, contract-to-hire, and project-based staffing.",
    icon: TrendingUp,
    features: ["Contract Workers", "Contract-to-Hire", "Project Teams"]
  },
  {
    title: "Talent Advisory",
    description: "Strategic workforce consulting including market intelligence and compensation benchmarking.",
    icon: Search,
    features: ["Market Intelligence", "Salary Benchmarking", "Talent Strategy"]
  },
  {
    title: "RPO Services",
    description: "Recruitment Process Outsourcing for organizations seeking scalable talent acquisition solutions.",
    icon: Building,
    features: ["Full RPO", "Project RPO", "Hybrid Solutions"]
  },
  {
    title: "Global Mobility",
    description: "International staffing and relocation services for multinational organizations and global expansion.",
    icon: Globe,
    features: ["International Placement", "Visa Support", "Relocation Services"]
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 gradient-section">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Comprehensive staffing solutions designed to meet your unique business needs 
            and drive sustainable growth across all industries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="card-elite p-8 hover:scale-105 animate-slide-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-6 shadow-soft group-hover:shadow-glow transition-smooth">
                <service.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-4">
                {service.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                {service.description}
              </p>
              
              <div className="space-y-3">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-fade-in">
          <div className="bg-background rounded-2xl p-8 shadow-card max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to Transform Your Workforce?
            </h3>
            <p className="text-muted-foreground mb-6">
              Let our experts help you find the perfect staffing solution for your organization.
            </p>
            <Button className="btn-primary px-8 py-3 font-semibold">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;