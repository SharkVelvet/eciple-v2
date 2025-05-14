import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ecipleLogo from "@assets/eciple-logo-white.png";

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

  const navItems = [
    { name: "Problem", href: "#problem" },
    { name: "Solution", href: "#solution" },
    { name: "Product", href: "#product" },
    { name: "Competition", href: "#competition" },
    { name: "Market", href: "#market" },
    { name: "Pricing", href: "#pricing" }
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-lg py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center group">
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="flex flex-col">
              <img 
                src={ecipleLogo} 
                alt="eciple logo" 
                className={`h-8 w-auto object-contain ${scrolled ? 'opacity-90 brightness-0' : 'opacity-100'}`} 
              />
              <span className={`text-xs italic mt-1 ${scrolled ? 'text-[#FF7500]' : 'text-white'}`}>
                Discipleship Reimagined
              </span>
            </div>
          </motion.div>
        </Link>
        
        <nav className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 + 0.1 }}
              >
                <a 
                  href={item.href} 
                  className={`px-3 py-2 rounded-md font-medium text-sm transition-colors relative group ${
                    scrolled 
                      ? 'text-foreground hover:text-primary' 
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  <span className="absolute inset-0 rounded-md bg-white/0 group-hover:bg-white/10 transition-colors duration-200"></span>
                </a>
              </motion.li>
            ))}
            <motion.li
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Button 
                asChild 
                variant="default" 
                size="sm" 
                className={`ml-2 ${
                  scrolled ? 'bg-primary' : 'bg-accent'
                } rounded-full px-5 shadow-lg shadow-accent/20 group relative overflow-hidden`}
              >
                <a href="#contact" className="flex items-center gap-1">
                  Contact
                  <span className="absolute inset-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                </a>
              </Button>
            </motion.li>
          </ul>
        </nav>
        
        <div className="flex items-center gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="hidden md:block"
          >
            <Button 
              asChild 
              variant="outline" 
              size="sm" 
              className={`rounded-full ${
                scrolled 
                  ? 'border-primary/20 text-primary hover:bg-primary/5' 
                  : 'border-white/20 text-white hover:bg-white/10'
              }`}
            >
              <Link href="/auth" className="flex items-center gap-1.5">
                <span>Investor Portal</span>
                <ExternalLink className="h-3 w-3" />
              </Link>
            </Button>
          </motion.div>
          
          <Button
            variant="ghost"
            size="icon"
            className={`md:hidden ${scrolled ? 'text-foreground' : 'text-white'}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
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
            className="md:hidden bg-white w-full py-3 shadow-lg absolute overflow-hidden"
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
                    onClick={closeMobileMenu} 
                    className="block py-2.5 px-4 text-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors font-medium"
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
                  className="w-full justify-center rounded-full" 
                  onClick={closeMobileMenu}
                >
                  <a href="#contact">Contact</a>
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
                  variant="outline" 
                  className="w-full justify-center rounded-full" 
                  onClick={closeMobileMenu}
                >
                  <Link href="/auth">
                    <span>Investor Portal</span>
                    <ExternalLink className="ml-1.5 h-3 w-3" />
                  </Link>
                </Button>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
