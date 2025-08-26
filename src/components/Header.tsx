import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border/50 shadow-card transition-smooth">
      <div className="container mx-auto px-8 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center shadow-elegant">
            <span className="text-primary-foreground font-bold text-2xl text-elite">W</span>
          </div>
          <span className="text-4xl font-bold text-foreground tracking-tight text-elite">Workwhirl</span>
        </div>
        
        <nav className="hidden lg:flex items-center space-x-12">
          <a href="#services" className="text-muted-foreground hover:text-primary transition-smooth font-medium text-lg relative group">
            Services
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
          </a>
          <a href="#about" className="text-muted-foreground hover:text-primary transition-smooth font-medium text-lg relative group">
            About
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
          </a>
          <a href="#contact" className="text-muted-foreground hover:text-primary transition-smooth font-medium text-lg relative group">
            Contact
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
          </a>
        </nav>

        <Button className="btn-gold text-lg px-10 py-4 font-semibold">
          Get Started
        </Button>
      </div>
    </header>
  );
};

export default Header;