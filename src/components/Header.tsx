import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const { isAdmin } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Services", href: "/#services" },
    { label: "Industries", href: "/#industries" },
    { label: "Case Studies", href: "/case-studies", isRoute: true },
    { label: "About", href: "/#about" },
    { label: "Careers", href: "/careers", isRoute: true },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/30 shadow-soft transition-smooth">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-11 h-11 gradient-primary rounded-xl flex items-center justify-center shadow-elegant group-hover:shadow-hover transition-smooth group-hover:scale-105">
            <span className="text-primary-foreground font-extrabold text-2xl tracking-tight">W</span>
          </div>
          <span className="text-2xl font-extrabold text-foreground tracking-tight">Workwhirl</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            item.isRoute ? (
              <Link 
                key={item.label}
                to={item.href} 
                className="text-muted-foreground hover:text-primary transition-smooth font-medium relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
              </Link>
            ) : (
              <a 
                key={item.label}
                href={item.href} 
                className="text-muted-foreground hover:text-primary transition-smooth font-medium relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
              </a>
            )
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {isAdmin && (
            <Link to="/admin">
              <Button variant="outline" className="px-4 py-2 text-sm hidden lg:inline-flex">
                Admin
              </Button>
            </Link>
          )}
          <Link to="/careers" className="hidden lg:block">
            <Button className="btn-accent px-6 py-2 font-semibold text-sm">
              Join Our Team
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="lg:hidden bg-background border-t border-border/30 py-4">
          <div className="container mx-auto px-6 space-y-4">
            {navItems.map((item) => (
              item.isRoute ? (
                <Link
                  key={item.label}
                  to={item.href}
                  className="block text-foreground hover:text-primary transition-smooth font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="block text-foreground hover:text-primary transition-smooth font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              )
            ))}
            <Link
              to="/careers"
              className="block"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Button className="btn-accent w-full font-semibold">
                Join Our Team
              </Button>
            </Link>
            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button variant="outline" className="w-full">
                  Admin Dashboard
                </Button>
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
