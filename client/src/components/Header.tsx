import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ecipleLogo from "@assets/eciple-white.png";
import ecipleOrangeLogo from "@assets/eciple-orange.png";

export default function Header() {
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
    { name: "Problem", href: "#problem" },
    { name: "Solution", href: "#solution" },
    { name: "Product", href: "#product" },
    { name: "Competition", href: "#competition" },
    { name: "Pricing", href: "#pricing" }
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#223349] shadow-lg py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-[1180px] mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo - Left aligned */}
          <div className="flex-none">
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center group"
            >
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="text-left"
              >
                <div className="flex flex-col items-start">
                  <img 
                    src={ecipleLogo} 
                    alt="eciple logo" 
                    className="h-8 w-auto object-contain" 
                  />
                  <span className="text-xs italic mt-0 text-left text-white">
                    Discipleship Reimagined
                  </span>
                </div>
              </motion.div>
            </a>
          </div>
          
          {/* Navigation - Center aligned */}
          <div className="hidden md:flex flex-1 justify-center">
            <nav>
              <ul className="flex items-center gap-6">
                {navItems.map((item, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 + 0.1 }}
                  >
                    <a 
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.querySelector(item.href);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="px-3 py-2 rounded-md font-medium text-sm transition-colors relative group text-white/90 hover:text-white"
                    >
                      <span className="relative z-10">{item.name}</span>
                      <span className="absolute inset-0 rounded-md bg-white/0 group-hover:bg-white/10 transition-colors duration-200"></span>
                    </a>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button 
                    asChild 
                    variant="default" 
                    size="sm" 
                    className="ml-2 rounded-full px-5 shadow-lg shadow-accent/20 group relative overflow-hidden"
                  >
                    <a 
                      href="#contact" 
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.querySelector('#contact');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="flex items-center gap-1"
                    >
                      Contact
                      <span className="absolute inset-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                    </a>
                  </Button>
                </motion.li>
              </ul>
            </nav>
          </div>
          
          {/* Right side - Mobile menu button or Investor Portal */}
          <div className="flex items-center">
            {/* Mobile menu button - only shows on mobile */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-white"
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
            
            {/* Investor Portal button - only shows on desktop */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="hidden md:block"
            >
              <Button 
                asChild 
                variant="default" 
                size="sm" 
                className="bg-[#6148FF] hover:bg-[#5540d4] rounded-full px-5 flex items-center shadow-lg"
              >
                <Link href="/auth" className="flex items-center gap-1.5 py-1">
                  <Lock className="h-4 w-4" />
                  Investor Portal
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#223349] w-full py-3 shadow-lg absolute overflow-hidden"
          >
            <motion.ul 
              className="flex flex-col space-y-1 px-4"
              initial="closed"
              animate="open"
              variants={{
                open: {
                  transition: { staggerChildren: 0.07, delayChildren: 0.1 }
                },
                closed: {
                  transition: { staggerChildren: 0.05, staggerDirection: -1 }
                }
              }}
            >
              {navItems.map((item, index) => (
                <motion.li 
                  key={index}
                  variants={{
                    open: {
                      y: 0,
                      opacity: 1,
                      transition: {
                        y: { stiffness: 1000, velocity: -100 }
                      }
                    },
                    closed: {
                      y: 20,
                      opacity: 0,
                      transition: {
                        y: { stiffness: 1000 }
                      }
                    }
                  }}
                >
                  <a 
                    href={item.href} 
                    onClick={(e) => {
                      e.preventDefault();
                      closeMobileMenu();
                      const element = document.querySelector(item.href);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }} 
                    className="block py-2.5 px-4 text-white hover:text-white/90 hover:bg-white/10 rounded-md transition-colors font-medium"
                  >
                    {item.name}
                  </a>
                </motion.li>
              ))}
              <motion.li 
                variants={{
                  open: {
                    y: 0,
                    opacity: 1,
                    transition: {
                      y: { stiffness: 1000, velocity: -100 }
                    }
                  },
                  closed: {
                    y: 20,
                    opacity: 0,
                    transition: {
                      y: { stiffness: 1000 }
                    }
                  }
                }}
                className="pt-2"
              >
                <Button 
                  asChild 
                  variant="default"
                  className="w-full justify-center rounded-full mb-2 bg-[#6148FF]" 
                  onClick={closeMobileMenu}
                >
                  <Link href="/auth" className="flex items-center justify-center gap-1.5">
                    <Lock className="h-4 w-4" />
                    Investor Portal
                  </Link>
                </Button>
              </motion.li>
              
              <motion.li 
                variants={{
                  open: {
                    y: 0,
                    opacity: 1,
                    transition: {
                      y: { stiffness: 1000, velocity: -100 }
                    }
                  },
                  closed: {
                    y: 20,
                    opacity: 0,
                    transition: {
                      y: { stiffness: 1000 }
                    }
                  }
                }}
                className="pt-2"
              >
                <Button 
                  asChild 
                  className="w-full justify-center rounded-full" 
                  onClick={closeMobileMenu}
                >
                  <a href="#contact">Contact</a>
                </Button>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}