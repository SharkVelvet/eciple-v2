import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Lock, Home, Lightbulb, Box, Trophy, DollarSign, MessageSquare, Phone, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ecipleLogo from "@assets/eciple-white.png";
import ecipleOrangeLogo from "@assets/eciple-orange.png";

export default function Header2() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

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

  const navItems = [
    { name: "Problem", href: "#problem", icon: <Lightbulb className="h-4 w-4" /> },
    { name: "Solution", href: "#solution", icon: <CheckCircle className="h-4 w-4" /> },
    { name: "Comparison", href: "#comparison", icon: <Trophy className="h-4 w-4" /> },
    { name: "Pricing", href: "#pricing", icon: <DollarSign className="h-4 w-4" /> },
    { name: "Contact Us", href: "#contact", icon: <MessageSquare className="h-4 w-4" /> }
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#223349] shadow-lg py-4 md:py-4' 
          : 'bg-transparent py-6 md:py-6'
      }`}
    >
      <div className="max-w-[1380px] mx-auto px-8 md:px-6">
        <div className="flex items-center justify-between" style={{ minHeight: '60px' }}>
          {/* Logo - Left aligned */}
          <div className="flex-none">
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="block"
            >
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="flex flex-col items-start">
                  <img 
                    src={ecipleLogo} 
                    alt="eciple logo" 
                    className="h-8 w-auto object-contain" 
                  />
                  <span className="text-white text-opacity-70 text-xs mt-1">
                    Igniting Spiritual Growth
                  </span>
                </div>
              </motion.div>
            </a>
          </div>

          {/* Desktop Navigation - Center (hidden on mobile) */}
          <nav className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
            {navItems.map((item) => (
              item.href.startsWith('#') ? (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector(item.href);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className="text-white hover:text-accent transition-colors duration-200 text-sm font-medium cursor-pointer"
                >
                  {item.name}
                </a>
              ) : (
                <Link key={item.name} href={item.href}>
                  <span className="text-white hover:text-accent transition-colors duration-200 text-sm font-medium cursor-pointer">
                    {item.name}
                  </span>
                </Link>
              )
            ))}
          </nav>

          {/* Right Side - Investor Portal */}
          <div className="flex items-center space-x-4">
            {/* Investor Portal Button - Desktop */}
            <div className="hidden lg:block">
              <Button 
                size="sm"
                className="bg-accent hover:bg-accent/90 text-white rounded-full px-4 flex items-center gap-2"
                asChild
              >
                <Link href="/auth">
                  <Lock className="h-4 w-4" />
                  Investor Portal
                </Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden text-white p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#223349] border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2 max-w-xs mx-auto">
              {navItems.map((item) => (
                item.href.startsWith('#') ? (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.querySelector(item.href);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                      closeMobileMenu();
                    }}
                    className="flex items-center space-x-3 text-white hover:text-accent transition-colors duration-200 py-3 px-4 rounded-lg hover:bg-white/5 cursor-pointer"
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </a>
                ) : (
                  <Link key={item.name} href={item.href}>
                    <div 
                      onClick={closeMobileMenu}
                      className="flex items-center space-x-3 text-white hover:text-accent transition-colors duration-200 py-3 px-4 rounded-lg hover:bg-white/5"
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </div>
                  </Link>
                )
              ))}
              
              {/* Investor Portal - Mobile */}
              <Link href="/auth">
                <div 
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-3 text-accent hover:text-white transition-colors duration-200 py-3 px-4 rounded-lg bg-accent/10 hover:bg-accent/20"
                >
                  <Lock className="h-4 w-4" />
                  <span>Investor Portal</span>
                </div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}