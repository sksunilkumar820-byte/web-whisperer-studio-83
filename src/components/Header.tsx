import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/98 backdrop-blur-md border-b shadow-card transition-smooth">
      <div className="container mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-glow">
            <span className="text-primary-foreground font-bold text-xl">W</span>
          </div>
          <span className="text-3xl font-bold text-foreground tracking-tight">Workwhirl</span>
        </div>
        
        <nav className="hidden lg:flex items-center space-x-10">
          <a href="#services" className="text-muted-foreground hover:text-primary transition-smooth font-medium text-lg relative group">
            Services
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
          </a>
          <a href="#about" className="text-muted-foreground hover:text-primary transition-smooth font-medium text-lg relative group">
            About
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
          </a>
          <a href="#contact" className="text-muted-foreground hover:text-primary transition-smooth font-medium text-lg relative group">
            Contact
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
          </a>
        </nav>

        <Button variant="default" className="shadow-elegant hover:shadow-hover text-lg px-8 py-3 transition-smooth">
          Get Started
        </Button>
      </div>
    </header>
  );
};

export default Header;