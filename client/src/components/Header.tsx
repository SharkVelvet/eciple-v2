import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`bg-white fixed w-full z-50 transition-shadow duration-300 ${scrolled ? 'shadow-md' : ''}`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold font-sans text-primary">
            <span className="text-secondary">e</span>ciple
          </h1>
          <span className="ml-2 text-sm font-sans text-accent italic">Discipleship Reimagined</span>
        </div>
        
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li><a href="#problem" className="text-foreground hover:text-primary transition-colors font-medium">Problem</a></li>
            <li><a href="#solution" className="text-foreground hover:text-primary transition-colors font-medium">Solution</a></li>
            <li><a href="#product" className="text-foreground hover:text-primary transition-colors font-medium">Product</a></li>
            <li><a href="#competition" className="text-foreground hover:text-primary transition-colors font-medium">Competition</a></li>
            <li><a href="#market" className="text-foreground hover:text-primary transition-colors font-medium">Market</a></li>
            <li><a href="#pricing" className="text-foreground hover:text-primary transition-colors font-medium">Pricing</a></li>
            <li>
              <Button asChild variant="default" size="sm">
                <a href="#contact">Contact</a>
              </Button>
            </li>
          </ul>
        </nav>
        
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-foreground"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden bg-white w-full py-3 shadow-lg absolute transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <ul className="flex flex-col space-y-2 px-4">
          <li><a href="#problem" onClick={closeMobileMenu} className="block py-2 text-foreground hover:text-primary transition-colors font-medium">Problem</a></li>
          <li><a href="#solution" onClick={closeMobileMenu} className="block py-2 text-foreground hover:text-primary transition-colors font-medium">Solution</a></li>
          <li><a href="#product" onClick={closeMobileMenu} className="block py-2 text-foreground hover:text-primary transition-colors font-medium">Product</a></li>
          <li><a href="#competition" onClick={closeMobileMenu} className="block py-2 text-foreground hover:text-primary transition-colors font-medium">Competition</a></li>
          <li><a href="#market" onClick={closeMobileMenu} className="block py-2 text-foreground hover:text-primary transition-colors font-medium">Market</a></li>
          <li><a href="#pricing" onClick={closeMobileMenu} className="block py-2 text-foreground hover:text-primary transition-colors font-medium">Pricing</a></li>
          <li>
            <Button asChild className="w-full justify-center" onClick={closeMobileMenu}>
              <a href="#contact">Contact</a>
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
}
