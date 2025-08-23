import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b transition-smooth">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">W</span>
          </div>
          <span className="text-2xl font-bold text-foreground">Workwhirl</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#services" className="text-muted-foreground hover:text-primary transition-smooth">
            Services
          </a>
          <a href="#about" className="text-muted-foreground hover:text-primary transition-smooth">
            About
          </a>
          <a href="#contact" className="text-muted-foreground hover:text-primary transition-smooth">
            Contact
          </a>
        </nav>

        <Button variant="default" className="shadow-elegant">
          Get Started
        </Button>
      </div>
    </header>
  );
};

export default Header;