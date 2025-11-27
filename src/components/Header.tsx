import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const { isAdmin } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/30 shadow-soft transition-smooth">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-soft">
            <span className="text-primary-foreground font-bold text-xl">W</span>
          </div>
          <span className="text-2xl font-bold text-foreground tracking-tight">Workwhirl</span>
        </a>
        
        <nav className="hidden lg:flex items-center space-x-8">
          <a href="/#services" className="text-muted-foreground hover:text-primary transition-smooth font-medium relative group">
            Services
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
          </a>
          <a href="/#industries" className="text-muted-foreground hover:text-primary transition-smooth font-medium relative group">
            Industries
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
          </a>
          <a href="/case-studies" className="text-muted-foreground hover:text-primary transition-smooth font-medium relative group">
            Case Studies
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
          </a>
          <a href="/#about" className="text-muted-foreground hover:text-primary transition-smooth font-medium relative group">
            About
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
          </a>
          <a href="/careers" className="text-muted-foreground hover:text-primary transition-smooth font-medium relative group">
            Careers
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
          </a>
          <a href="/#contact" className="text-muted-foreground hover:text-primary transition-smooth font-medium relative group">
            Contact
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
          </a>
        </nav>

        <div className="flex items-center gap-3">
          {isAdmin && (
            <a href="/admin">
              <Button variant="outline" className="px-4 py-2 text-sm">
                Admin
              </Button>
            </a>
          )}
          <a href="/careers">
            <Button className="btn-accent px-6 py-2 font-semibold text-sm">
              Join Our Team
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;