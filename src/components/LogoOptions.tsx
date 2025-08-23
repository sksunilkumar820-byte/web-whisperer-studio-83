import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import logo1 from "@/assets/logo-option-1.png";
import logo2 from "@/assets/logo-option-2.png";
import logo3 from "@/assets/logo-option-3.png";
import logo4 from "@/assets/logo-option-4.png";

const LogoOptions = () => {
  const logos = [
    {
      id: 1,
      src: logo1,
      title: "Modern Geometric W",
      description: "Clean, minimalist design with geometric W shape"
    },
    {
      id: 2,
      src: logo2,
      title: "Dynamic Swirl",
      description: "Circular design with movement representing growth"
    },
    {
      id: 3,
      src: logo3,
      title: "Hexagonal Network",
      description: "Interconnected elements showing collaboration"
    },
    {
      id: 4,
      src: logo4,
      title: "Typographic Brand",
      description: "Bold text-based logo with stylized W icon"
    }
  ];

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Choose Your Logo</h2>
          <p className="text-muted-foreground">Select the logo style that best represents Workwhirl</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {logos.map((logo) => (
            <Card key={logo.id} className="group hover:shadow-card transition-smooth cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="bg-gray-50 rounded-lg p-8 mb-4 group-hover:bg-gray-100 transition-smooth">
                  <img 
                    src={logo.src} 
                    alt={logo.title}
                    className="w-20 h-20 mx-auto object-contain"
                  />
                </div>
                <h3 className="font-semibold text-lg mb-2">{logo.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{logo.description}</p>
                <Button variant="outline" size="sm" className="w-full">
                  Choose This Logo
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-muted-foreground mb-4">
            Don't see what you're looking for? I can create a custom logo based on your preferences.
          </p>
          <Button variant="outline">
            Request Custom Logo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LogoOptions;