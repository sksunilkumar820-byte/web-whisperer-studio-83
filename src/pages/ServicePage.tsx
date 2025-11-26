import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Users, Search, TrendingUp, Target, Building, Globe, Megaphone, UserCheck, Calculator } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const serviceData = {
  "executive-search": {
    title: "Executive Search",
    icon: Target,
    description: "Strategic recruitment for C-suite executives and senior leadership positions across all industries.",
    fullDescription: "Our Executive Search practice specializes in identifying and securing top-tier leadership talent for C-suite and senior executive positions. We understand that executive-level appointments are critical decisions that shape your organization's future.",
    features: ["C-Suite Recruitment", "Board Placement", "Succession Planning"],
    benefits: [
      "Access to passive candidates not actively job seeking",
      "Confidential and discreet search process",
      "Comprehensive candidate assessment and vetting",
      "Cultural fit evaluation and onboarding support"
    ],
    process: [
      "Consultation and requirement analysis",
      "Market mapping and candidate identification",
      "Rigorous screening and assessment",
      "Interview coordination and feedback",
      "Offer negotiation and onboarding support"
    ]
  },
  "direct-hire": {
    title: "Direct Hire",
    icon: Users,
    description: "Permanent staffing solutions for professional and technical positions with guaranteed quality placement.",
    fullDescription: "Our Direct Hire service delivers permanent staffing solutions that match exceptional talent with organizations seeking long-term employees. We guarantee quality placements through our rigorous screening and assessment process.",
    features: ["Professional Placement", "Technical Roles", "Quality Guarantee"],
    benefits: [
      "Reduced time-to-hire with pre-vetted candidates",
      "Quality guarantee on all placements",
      "Comprehensive background and reference checks",
      "Negotiation support and offer management"
    ],
    process: [
      "Job requirement consultation",
      "Targeted candidate sourcing",
      "Skills assessment and interviews",
      "Reference and background verification",
      "Offer presentation and acceptance"
    ]
  },
  "contract-staffing": {
    title: "Contract Staffing",
    icon: TrendingUp,
    description: "Flexible workforce solutions including contract, contract-to-hire, and project-based staffing.",
    fullDescription: "Contract Staffing provides flexible workforce solutions to help you scale quickly, manage seasonal demands, or complete specific projects. We offer contract, contract-to-hire, and project-based staffing options.",
    features: ["Contract Workers", "Contract-to-Hire", "Project Teams"],
    benefits: [
      "Rapid deployment of qualified professionals",
      "Flexibility to scale workforce up or down",
      "Try-before-you-hire with contract-to-hire options",
      "Reduced administrative burden and risk"
    ],
    process: [
      "Requirements and timeline assessment",
      "Rapid candidate sourcing and screening",
      "Skills verification and placement",
      "Ongoing performance monitoring",
      "Seamless conversion to permanent if desired"
    ]
  },
  "talent-advisory": {
    title: "Talent Advisory",
    icon: Search,
    description: "Strategic workforce consulting including market intelligence and compensation benchmarking.",
    fullDescription: "Our Talent Advisory services provide strategic insights and data-driven recommendations to optimize your talent acquisition and retention strategies. We deliver market intelligence and compensation analysis to keep you competitive.",
    features: ["Market Intelligence", "Salary Benchmarking", "Talent Strategy"],
    benefits: [
      "Data-driven insights on talent market trends",
      "Competitive compensation analysis",
      "Talent acquisition strategy development",
      "Employer branding consultation"
    ],
    process: [
      "Current state assessment",
      "Market research and analysis",
      "Strategy development and recommendations",
      "Implementation planning and support",
      "Ongoing advisory and optimization"
    ]
  },
  "rpo-services": {
    title: "RPO Services",
    icon: Building,
    description: "Recruitment Process Outsourcing for organizations seeking scalable talent acquisition solutions.",
    fullDescription: "Our RPO Services provide comprehensive recruitment process outsourcing to organizations seeking to scale their talent acquisition capabilities. We become an extension of your team, managing part or all of your recruitment function.",
    features: ["Full RPO", "Project RPO", "Hybrid Solutions"],
    benefits: [
      "Scalable recruitment capacity",
      "Cost reduction and improved efficiency",
      "Access to advanced recruitment technology",
      "Improved quality of hire and time-to-fill"
    ],
    process: [
      "Needs assessment and solution design",
      "Technology setup and integration",
      "Team deployment and training",
      "Process implementation and optimization",
      "Continuous improvement and reporting"
    ]
  },
  "global-mobility": {
    title: "Global Mobility",
    icon: Globe,
    description: "International staffing and relocation services for multinational organizations and global expansion.",
    fullDescription: "Global Mobility services support international talent acquisition and relocation for organizations expanding globally. We handle the complexities of cross-border hiring, visa processing, and relocation management.",
    features: ["International Placement", "Visa Support", "Relocation Services"],
    benefits: [
      "Expert guidance on international hiring regulations",
      "Visa sponsorship and immigration support",
      "Comprehensive relocation management",
      "Cultural integration and settling-in services"
    ],
    process: [
      "International hiring consultation",
      "Global candidate sourcing",
      "Immigration and visa coordination",
      "Relocation planning and execution",
      "Post-arrival support and integration"
    ]
  },
  "marketing-services": {
    title: "Marketing Services",
    icon: Megaphone,
    description: "Comprehensive digital marketing solutions including content creation, social media management, and brand development.",
    fullDescription: "Our Marketing Services deliver comprehensive digital marketing solutions to help you build your brand, engage your audience, and drive business growth. From content creation to social media management, we've got you covered.",
    features: ["Content Writing", "Social Media Marketing", "Brand Development"],
    benefits: [
      "Professional content that resonates with your audience",
      "Strategic social media presence and engagement",
      "Cohesive brand identity across all channels",
      "Data-driven marketing strategies and optimization"
    ],
    process: [
      "Marketing audit and strategy development",
      "Content calendar and campaign planning",
      "Content creation and publishing",
      "Social media management and engagement",
      "Performance tracking and optimization"
    ]
  },
  "hr-consulting": {
    title: "HR Consulting",
    icon: UserCheck,
    description: "Strategic human resources consulting including policy development, compliance, and organizational design.",
    fullDescription: "HR Consulting services provide strategic guidance to optimize your human resources function. We help develop policies, ensure compliance, and design organizational structures that support your business objectives.",
    features: ["Policy Development", "Compliance Management", "Organizational Design"],
    benefits: [
      "Compliant and effective HR policies",
      "Risk mitigation and legal compliance",
      "Optimized organizational structures",
      "Enhanced employee experience and retention"
    ],
    process: [
      "HR assessment and gap analysis",
      "Policy and procedure development",
      "Compliance review and updates",
      "Implementation and change management",
      "Ongoing support and optimization"
    ]
  },
  "payroll-management": {
    title: "Payroll Management",
    icon: Calculator,
    description: "Complete payroll processing services including tax compliance, benefits administration, and reporting.",
    fullDescription: "Payroll Management services ensure accurate and compliant payroll processing, allowing you to focus on your core business. We handle all aspects of payroll, from processing to tax compliance and reporting.",
    features: ["Payroll Processing", "Tax Compliance", "Benefits Administration"],
    benefits: [
      "Accurate and timely payroll processing",
      "Full tax compliance and filing",
      "Integrated benefits administration",
      "Comprehensive reporting and analytics"
    ],
    process: [
      "Payroll system setup and integration",
      "Data collection and validation",
      "Payroll processing and distribution",
      "Tax filing and compliance reporting",
      "Ongoing support and reconciliation"
    ]
  }
};

const ServicePage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  
  const service = serviceId ? serviceData[serviceId as keyof typeof serviceData] : null;

  if (!service) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Service Not Found</h1>
          <Button onClick={() => navigate("/")} className="btn-primary">
            Return Home
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-section py-20">
        <div className="container mx-auto px-6">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  onClick={() => navigate("/")}
                  className="cursor-pointer"
                >
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  onClick={() => navigate("/#services")}
                  className="cursor-pointer"
                >
                  Services
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{service.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="flex items-start gap-6 mb-8">
            <div className="w-20 h-20 gradient-primary rounded-2xl flex items-center justify-center shadow-glow">
              <Icon className="w-10 h-10 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {service.title}
              </h1>
              <p className="text-xl text-muted-foreground">
                {service.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6">Overview</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {service.fullDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Key Features & Benefits */}
      <section className="py-16 gradient-section">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Key Features</h2>
              <ul className="space-y-4">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Benefits</h2>
              <ul className="space-y-4">
                {service.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Our Process</h2>
            <div className="space-y-6">
              {service.process.map((step, index) => (
                <div key={index} className="card-elite p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-bold text-primary">{index + 1}</span>
                  </div>
                  <div className="flex-1 pt-2">
                    <p className="text-muted-foreground">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 gradient-section">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Contact us today to learn how our {service.title.toLowerCase()} can help your organization succeed.
            </p>
            <Button 
              className="btn-primary px-8 py-3 font-semibold"
              onClick={() => navigate("/#contact")}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicePage;
